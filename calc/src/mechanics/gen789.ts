import type {Generation, AbilityName, StatID, Terrain} from '../data/interface';
import {toID} from '../util';
import {
  getBerryResistType,
  getFlingPower,
  getItemBoostType,
  getMultiAttack,
  getNaturalGift,
  getTechnoBlast,
  SEED_BOOSTED_STAT,
} from '../items';
import type {RawDesc} from '../desc';
import type {Field} from '../field';
import type {Move} from '../move';
import type {Pokemon} from '../pokemon';
import {Result} from '../result';
import {
  chainMods,
  checkAirLock,
  checkDauntlessShield,
  checkDownload,
  checkEmbody,
  checkForecast,
  checkInfiltrator,
  checkIntimidate,
  checkIntrepidSword,
  checkItem,
  checkMultihitBoost,
  checkSeedBoost,
  checkTeraformZero,
  checkWindRider,
  checkRawStatChanges,
  computeFinalStats,
  countBoosts,
  getBaseDamage,
  getStatDescriptionText,
  getFinalDamage,
  getModifiedStat,
  getQPBoostedStat,
  getThirdType,
  getMoveEffectiveness,
  getShellSideArmCategory,
  getWeight,
  handleFixedDamageMoves,
  isGrounded,
  OF16, OF32,
  addSpacedStr,
  pokeRound,
  isQPActive,
  getStabMod,
  getStellarStabMod,
} from './util';

export function calculateSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field
) {
  // #region Initial

  checkAirLock(attacker, field);
  checkAirLock(defender, field);
  checkTeraformZero(attacker, field);
  checkTeraformZero(defender, field);
  checkForecast(attacker, field.weather);
  checkForecast(defender, field.weather);
  checkItem(attacker, field.isMagicRoom);
  checkItem(defender, field.isMagicRoom);
  checkRawStatChanges(attacker, field.attackerSide.isPowerTrick, field.isWonderRoom);
  checkRawStatChanges(defender, field.defenderSide.isPowerTrick, field.isWonderRoom);
  checkSeedBoost(attacker, field);
  checkSeedBoost(defender, field);
  checkDauntlessShield(attacker, gen);
  checkDauntlessShield(defender, gen);
  checkEmbody(attacker, gen);
  checkEmbody(defender, gen);

  computeFinalStats(gen, attacker, defender, field, 'def', 'spd', 'spe');

  checkIntimidate(gen, attacker, defender);
  checkIntimidate(gen, defender, attacker);
  checkDownload(attacker, defender, field.isWonderRoom);
  checkDownload(defender, attacker, field.isWonderRoom);
  checkIntrepidSword(attacker, gen);
  checkIntrepidSword(defender, gen);

  checkWindRider(attacker, field.attackerSide);
  checkWindRider(defender, field.defenderSide);

  if (move.named('Meteor Beam', 'Electro Shot')) {
    attacker.boosts.spa +=
      attacker.hasAbility('Simple') ? 2
      : attacker.hasAbility('Contrary') ? -1
      : 1;
    // restrict to +- 6
    attacker.boosts.spa = Math.min(6, Math.max(-6, attacker.boosts.spa));
  }

  computeFinalStats(gen, attacker, defender, field, 'atk', 'spa');

  checkInfiltrator(attacker, field.defenderSide);
  checkInfiltrator(defender, field.attackerSide);

  const desc: RawDesc = {
    attackerName: attacker.name,
    moveName: move.name,
    defenderName: defender.name,
    isDefenderDynamaxed: defender.isDynamaxed,
    isWonderRoom: field.isWonderRoom,
  };

  // only display tera type if it applies
  if (attacker.teraType !== 'Stellar' || move.name === 'Tera Blast' || move.isStellarFirstUse) {
    // tera blast has special behavior with tera stellar
    desc.isStellarFirstUse = attacker.name !== 'Terapagos-Stellar' && move.name === 'Tera Blast' &&
      attacker.teraType === 'Stellar' && move.isStellarFirstUse;
    desc.attackerTera = attacker.teraType;
  }
  if (defender.teraType !== 'Stellar') desc.defenderTera = defender.teraType;

  if (move.named('Photon Geyser', 'Light That Burns the Sky', 
  /* Everything from here out in the function is new to ER */
  'Tri Attack', 'Blast Burn', 'Hydro Cannon', 'Frenzy Plant', 'Rock Wrecker', 'Attack Order',
  'Water Pledge', 'Fire Pledge', 'Grass Pledge', 'Relic Song', 'Prismatic Laser', 'Multi-Attack',
  'Pika Papow', 'Veevee Volley', 'Black Magic', 'Tachyon Cutter', 'Malignant Chain',
  'Bleakwind Storm', 'Wildbolt Storm', 'Sandsear Storm', 'Springtide Storm', 'Tera Starstorm',
  'Spectral Serenade', 'Mystical Power', 'Banished Power') ||
  (move.named('Tera Blast') && attacker.teraType) ||
  (move.named('Tera Starstorm') && attacker.teraType && attacker.named('Terapagos-Stellar'))) {
    move.category = attacker.stats.atk > attacker.stats.spa ? 'Physical' : 'Special';
  }

  const result = new Result(gen, attacker, defender, move, field, 0, desc);

  if (move.category === 'Status' && !move.named('Nature Power')) {
    return result;
  }

  if (move.flags.punch && attacker.hasItem('Punching Glove')) {
    desc.attackerItem = attacker.item;
    move.flags.contact = 0;
  }

  if (move.named('Shell Side Arm') &&
    getShellSideArmCategory(attacker, defender, field.isWonderRoom) === 'Physical') {
    move.category = 'Physical';
    move.flags.contact = 1;
  }

  const breaksProtect = move.breaksProtect || move.isZ || attacker.isDynamaxed ||
  (attacker.hasAbility('Unseen Fist', 'Piercing Drill') && move.flags.contact);

  if (field.defenderSide.isProtected && !breaksProtect) {
    desc.isProtected = true;
    return result;
  }

  if (move.name === 'Pain Split') {
    const average = Math.floor((attacker.curHP() + defender.curHP()) / 2);
    const damage = Math.max(0, defender.curHP() - average);
    result.damage = damage;
    return result;
  }

  const defenderAbilityIgnored = defender.hasAbility(
    'Armor Tail', 'Aroma Veil', 'Aura Break', 'Battle Armor',
    'Big Pecks', 'Bulletproof', 'Clear Body', 'Contrary',
    'Damp', 'Dazzling', 'Disguise', 'Dry Skin',
    'Earth Eater', 'Filter', 'Flash Fire', 'Flower Gift',
    'Flower Veil', 'Fluffy', 'Friend Guard', 'Fur Coat',
    'Good as Gold', 'Guard Dog', 'Heatproof',
    'Heavy Metal', 'Hyper Cutter', 'Ice Face', 'Ice Scales',
    'Illuminate', 'Immunity', 'Inner Focus', 'Insomnia',
    'Justified',
    'Keen Eye', 'Leaf Guard', 'Levitate', 'Light Metal',
    'Lightning Rod', 'Limber', 'Magic Bounce', 'Magma Armor',
    "Mind's Eye", 'Mirror Armor', 'Motor Drive',
    'Multiscale', 'Oblivious', 'Overcoat', 'Own Tempo',
    'Pastel Veil', 'Punk Rock', 'Purifying Salt', 'Queenly Majesty',
    'Sand Veil', 'Sap Sipper', 'Shell Armor', 'Shield Dust',
    'Simple', 'Snow Cloak', 'Solid Rock', 'Soundproof',
    'Sticky Hold', 'Storm Drain', 'Sturdy', 'Suction Cups',
    'Sweet Veil', 'Telepathy', 'Tera Shell',
    'Thermal Exchange', 'Thick Fat', 'Unaware', 'Vital Spirit',
    'Volt Absorb', 'Water Absorb', 'Water Bubble', 'Water Veil',
    'Well-Baked Body', 'White Smoke', 'Wind Rider', 'Wonder Guard',
    'Wonder Skin'
  );

  const attackerIgnoresAbility = attacker.hasAbility('Mold Breaker', 'Teravolt', 'Turboblaze');
  const moveIgnoresAbility = move.named(
    'G-Max Drum Solo',
    'G-Max Fire Ball',
    'G-Max Hydrosnipe',
    'Light That Burns the Sky',
    'Menacing Moonraze Maelstrom',
    'Moongeist Beam',
    'Photon Geyser',
    'Searing Sunraze Smash',
    'Sunsteel Strike'
  );

  if (defenderAbilityIgnored && (attackerIgnoresAbility || moveIgnoresAbility)) {
    if (attackerIgnoresAbility) desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    if (defender.hasItem('Ability Shield')) {
      desc.defenderItem = defender.item;
    } else {
      defender.ability = '' as AbilityName;
    }
  }

  const ignoresNeutralizingGas = [
    'As One (Glastrier)', 'As One (Spectrier)', 'Battle Bond', 'Comatose',
    'Disguise', 'Gulp Missile', 'Ice Face', 'Multitype', 'Neutralizing Gas',
    'Power Construct', 'RKS System', 'Schooling', 'Shields Down',
    'Stance Change', 'Tera Shift', 'Zen Mode', 'Zero to Hero',
  ];

  if (attacker.hasAbility('Neutralizing Gas') &&
    !ignoresNeutralizingGas.includes(defender.ability || '')) {
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    if (defender.hasItem('Ability Shield')) {
      desc.defenderItem = defender.item;
    } else {
      defender.ability = '' as AbilityName;
    }
  }

  if (defender.hasAbility('Neutralizing Gas') &&
    !ignoresNeutralizingGas.includes(attacker.ability || '')) {
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
    if (attacker.hasItem('Ability Shield')) {
      desc.attackerItem = attacker.item;
    } else {
      attacker.ability = '' as AbilityName;
    }
  }

  // Merciless does not ignore Shell Armor, damage dealt to a poisoned Pokemon with Shell Armor
  // will not be a critical hit (UltiMario)
  const isCritical = !defender.hasAbility('Battle Armor', 'Shell Armor') &&
    (move.isCrit || (attacker.hasAbility('Merciless') && defender.hasStatus('psn', 'tox'))) &&
    move.timesUsed === 1;

  let type = move.type;
  if (move.originalName === 'Weather Ball') {
    const holdingUmbrella = attacker.hasItem('Utility Umbrella');
    const isMegaSol = attacker.hasAbility('Mega Sol');
    type =
      (field.hasWeather('Sun', 'Harsh Sunshine') || isMegaSol) && !holdingUmbrella ? 'Fire'
      : field.hasWeather('Rain', 'Heavy Rain') && !holdingUmbrella ? 'Water'
      : field.hasWeather('Sand') ? 'Rock'
      : field.hasWeather('Hail', 'Snow') ? 'Ice'
      : field.hasWeather('Fog') ? 'Ghost'
      : 'Normal';
    isMegaSol ? desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a') : desc.weather = field.weather;
    desc.moveType = type;
  } else if (move.named('Judgment') && attacker.item && attacker.item.includes('Plate')) {
    type = getItemBoostType(attacker.item)!;
  } else if (move.originalName === 'Techno Blast' &&
    attacker.item && attacker.item.includes('Drive')) {
    type = getTechnoBlast(attacker.item)!;
    desc.moveType = type;
  } else if (move.originalName === 'Multi-Attack' &&
    attacker.item && attacker.item.includes('Memory')) {
    type = getMultiAttack(attacker.item)!;
    desc.moveType = type;
  } else if (move.named('Natural Gift') && attacker.item?.endsWith('Berry')) {
    const gift = getNaturalGift(gen, attacker.item)!;
    type = gift.t;
    desc.moveType = type;
    desc.attackerItem = attacker.item;
  } else if (
    move.named('Nature Power') ||
    (move.originalName === 'Terrain Pulse' && isGrounded(attacker, field))
  ) {
    type =
      field.hasTerrain('Electric') ? 'Electric'
      : field.hasTerrain('Grassy') ? 'Grass'
      : field.hasTerrain('Misty') ? 'Fairy'
      : field.hasTerrain('Psychic') ? 'Psychic'
      : field.hasTerrain('Toxic') ? 'Poison'
      : 'Normal';
    desc.terrain = field.terrain;

    if (move.isMax) {
      desc.moveType = type;
    }

    // If the Nature Power user has the ability Prankster, it cannot affect
    // Dark-types or grounded foes if Psychic Terrain is active
    if (!(move.named('Nature Power') && attacker.hasAbility('Prankster')) &&
      ((defender.types.includes('Dark') ||
      (field.hasTerrain('Psychic') && isGrounded(defender, field))))) {
      desc.moveType = type;
    }
  } else if (move.originalName === 'Revelation Dance') {
    if (attacker.teraType) {
      type = attacker.teraType;
    } else if (attacker.types[0] === '???' && attacker.types[1]) {
      type = attacker.types[1];
    } else {
      type = attacker.types[0];
    }
  } else if (move.named('Aura Wheel') && attacker.named('Morpeko-Hangry')) {
    type = 'Dark';
  } else if (move.named('Raging Bull')) {
    if (attacker.named('Tauros')) {
      type = 'Normal';
    } else if (attacker.named('Tauros-Paldea-Aqua')) {
      type = 'Water';
    } else if (attacker.named('Tauros-Paldea-Blaze')) {
      type = 'Fire';
    } else if (attacker.named('Tauros-Paldea-Combat')) {
      type = 'Fighting';
    }

    field.defenderSide.isReflect = false;
    field.defenderSide.isLightScreen = false;
    field.defenderSide.isAuroraVeil = false;
  } else if (move.named('Ivy Cudgel')) {
    if (attacker.named('Ogerpon') || attacker.name.includes('Ogerpon-Teal')) {
      type = 'Grass';
    } else if (attacker.name.includes('Ogerpon-Cornerstone')) {
      type = 'Rock';
    } else if (attacker.name.includes('Ogerpon-Hearthflame')) {
      type = 'Fire';
    } else if (attacker.name.includes('Ogerpon-Wellspring')) {
      type = 'Water';
    }
  } else if (
    move.named('Tera Starstorm') && attacker.name === 'Terapagos-Stellar'
  ) {
    move.target = 'allAdjacentFoes';
    type = 'Stellar';
  } else if (move.named('Brick Break', 'Psychic Fangs')) {
    field.defenderSide.isReflect = false;
    field.defenderSide.isLightScreen = false;
    field.defenderSide.isAuroraVeil = false;
  }

  let hasAteAbilityTypeChange = false;
  let isAerilate = false;
  let isPixilate = false;
  let isRefrigerate = false;
  let isGalvanize = false;
  let isLiquidVoice = false;
  let isNormalize = false;
  let isDragonize = false;
  const noTypeChange = move.named(
    'Revelation Dance',
    'Judgment',
    'Nature Power',
    'Techno Blast',
    'Multi-Attack',
    'Natural Gift',
    'Weather Ball',
    'Terrain Pulse',
    'Struggle',
  ) || (move.named('Tera Blast') && attacker.teraType);

  if (!move.isZ && !noTypeChange) {
    const normal = type === 'Normal';
    if ((isAerilate = attacker.hasAbility('Aerilate') && normal)) {
      type = 'Flying';
    } else if ((isGalvanize = attacker.hasAbility('Galvanize') && normal)) {
      type = 'Electric';
    } else if ((isLiquidVoice = attacker.hasAbility('Liquid Voice') && !!move.flags.sound)) {
      type = 'Water';
    } else if ((isPixilate = attacker.hasAbility('Pixilate') && normal)) {
      type = 'Fairy';
    } else if ((isRefrigerate = attacker.hasAbility('Refrigerate') && normal)) {
      type = 'Ice';
    } else if ((isNormalize = attacker.hasAbility('Normalize'))) { // Boosts any type
      type = 'Normal';
    } else if ((isDragonize = attacker.hasAbility('Dragonize')) && normal) {
      type = 'Dragon';
    }
    if (isGalvanize || isPixilate || isRefrigerate || isAerilate || isNormalize || isDragonize) {
      desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
      hasAteAbilityTypeChange = true;
    } else if (isLiquidVoice) {
      desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    }
  }

  if (move.named('Tera Blast') && attacker.teraType) {
    type = attacker.teraType;
  }

  move.type = type;

  const isGhostRevealed =
    attacker.hasAbility('Scrappy') || attacker.hasAbility('Mind\'s Eye') ||
      field.defenderSide.isForesight;
  const isRingTarget =
    defender.hasItem('Ring Target') && !defender.hasAbility('Klutz');

  const type1Effectiveness = getMoveEffectiveness(
    gen,
    move,
    defender.types[0],
    isGhostRevealed,
    field.isGravity,
    isRingTarget,
    isNormalize
  );
  const type2Effectiveness = defender.types[1]
    ? getMoveEffectiveness(
      gen,
      move,
      defender.types[1],
      isGhostRevealed,
      field.isGravity,
      isRingTarget,
      isNormalize
    )
    : 1;

  const type3Effectiveness = !['???', defender.types[0], defender.types[1]].includes(getThirdType(defender))
    ? getMoveEffectiveness(
      gen,
      move,
      getThirdType(defender),
      isGhostRevealed,
      field.isGravity,
      isRingTarget,
      isNormalize
    )
    : 1;

  let typeEffectiveness = type1Effectiveness * type2Effectiveness * type3Effectiveness;
  if (type3Effectiveness !== 1) { 
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (move.hasType(getThirdType(attacker)) && !['???', attacker.types[0], attacker.types[1]].includes(getThirdType(attacker))) { 
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  
  if (defender.teraType && defender.teraType !== 'Stellar') {
    typeEffectiveness = getMoveEffectiveness(
      gen,
      move,
      defender.teraType,
      isGhostRevealed,
      field.isGravity,
      isRingTarget,
      isNormalize
    );
  }

  if (typeEffectiveness === 0 && move.hasType('Ground') &&
    defender.hasItem('Iron Ball') && !defender.hasAbility('Klutz')) {
    typeEffectiveness = 1;
  }

  if (typeEffectiveness === 0 && move.named('Thousand Arrows')) {
    typeEffectiveness = 1;
  }

  if (typeEffectiveness === 0) {
    return result;
  }

  if ((move.named('Sky Drop') &&
        (defender.hasType('Flying') || defender.weightkg >= 200 || field.isGravity)) ||
      (move.named('Synchronoise') && !defender.hasType(attacker.types[0]) &&
        (!attacker.types[1] || !defender.hasType(attacker.types[1]))) ||
      (move.named('Dream Eater') &&
        (!(defender.hasStatus('slp') || defender.hasAbility('Comatose')))) ||
      (move.named('Steel Roller') && !field.terrain) ||
      (move.named('Poltergeist') &&
        (!defender.item || (isQPActive(defender, field) && defender.hasItem('Booster Energy'))))
  ) {
    return result;
  }

  if (
    (field.hasWeather('Harsh Sunshine') && move.hasType('Water')) ||
    (field.hasWeather('Heavy Rain') && move.hasType('Fire'))
  ) {
    desc.weather = field.weather;
    return result;
  }

  if (field.hasWeather('Strong Winds') && defender.hasType('Flying') &&
      gen.types.get(toID(move.type))!.effectiveness['Flying']! > 1) {
    typeEffectiveness /= 2;
    desc.weather = field.weather;
  }

  if (move.type === 'Stellar') {
    desc.defenderTera = defender.teraType; // always show in this case
    typeEffectiveness = !defender.teraType ? 1 : 2;
  }

  const turn2typeEffectiveness = typeEffectiveness;

  // Tera Shell works only at full HP, but for all hits of multi-hit moves
  if (defender.hasAbility('Tera Shell') &&
      defender.curHP() === defender.maxHP() &&
      (!field.defenderSide.isSR && (!field.defenderSide.spikes || defender.hasType('Flying')) ||
      defender.hasItem('Heavy-Duty Boots') || defender.hasAbility('Shield Dust'))
  ) {
    typeEffectiveness = 0.5;
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  /* Color Change is...weird. I hardcoded the types because I'm lazy. 
  I don't think this implementation is 100% correct, but for game sake I'll leave it at this.*/
  if (defender.hasAbility('Color Change')) {
    if (move.hasType('Dragon', 'Electric', 'Fighting', 'Ghost', 'Ground', 'Normal', 'Poison', 'Psychic')) {
      typeEffectiveness = 0;
    } else { typeEffectiveness = 0.5; }
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if ((defender.hasAbility('Wonder Guard') && typeEffectiveness <= 1) ||
      (move.hasType('Grass') && defender.hasAbility('Sap Sipper')) ||
      (move.hasType('Fire') && defender.hasAbility('Flash Fire', 'Well-Baked Body', 'Heat Sink')) ||
      (move.hasType('Water') && defender.hasAbility('Dry Skin', 'Storm Drain', 'Water Absorb')) ||
      (move.hasType('Electric') &&
        defender.hasAbility('Lightning Rod', 'Motor Drive', 'Volt Absorb')) ||
      (move.hasType('Ground') &&
        !field.isGravity && !move.named('Thousand Arrows') &&
        !defender.hasItem('Iron Ball') && defender.hasAbility('Levitate')) ||
      (move.flags.bullet && defender.hasAbility('Bulletproof')) ||
      /* Throat Spray now ignores sound immunities, pretty cool right? */
      (move.flags.sound && !move.named('Clangorous Soul') && defender.hasAbility('Soundproof') && !attacker.hasItem('Throat Spray')) ||
      (move.priority > 0 && defender.hasAbility('Queenly Majesty', 'Dazzling', 'Armor Tail')) ||
      (move.hasType('Ground') && defender.hasAbility('Earth Eater')) ||
      (move.flags.wind && defender.hasAbility('Wind Rider')) ||
      (move.hasType('Dark') && defender.hasAbility('Justified', 'Radiance'))
  ) {
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
    return result;
  }

  if (move.hasType('Ground') && !move.named('Thousand Arrows') &&
      !field.isGravity && defender.hasItem('Air Balloon')) {
    desc.defenderItem = defender.item;
    return result;
  }

  if (move.priority > 0 && field.hasTerrain('Psychic') && isGrounded(defender, field)) {
    desc.terrain = field.terrain;
    return result;
  }

  const weightBasedMove = move.named('Heat Crash', 'Heavy Slam', 'Low Kick', 'Grass Knot');
  if (defender.isDynamaxed && weightBasedMove) {
    return result;
  }

  desc.HPEVs = getStatDescriptionText(gen, defender, 'hp');

  const fixedDamage = handleFixedDamageMoves(attacker, move);
  if (fixedDamage) {
    if (attacker.hasAbility('Parental Bond')) {
      result.damage = [fixedDamage, fixedDamage / 4];
      desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    } else {
      result.damage = fixedDamage;
    }
    return result;
  }

  if (move.named('Final Gambit')) {
    result.damage = attacker.curHP();
    return result;
  }

  if (move.named('Guardian of Alola')) {
    let zLostHP = Math.floor((defender.curHP() * 3) / 4);
    if (field.defenderSide.isProtected && attacker.item && attacker.item.includes(' Z')) {
      zLostHP = Math.ceil(zLostHP / 4 - 0.5);
    }
    result.damage = zLostHP;
    return result;
  }

  if (move.named('Nature\'s Madness')) {
    const lostHP = field.defenderSide.isProtected ? 0 : Math.floor(defender.curHP() / 2);
    result.damage = lostHP;
    return result;
  }

  if (move.named('Spectral Thief')) {
    let stat: StatID;
    for (stat in defender.boosts) {
      if (defender.boosts[stat] > 0) {
        attacker.boosts[stat] +=
          attacker.hasAbility('Contrary') ? -defender.boosts[stat]! : defender.boosts[stat]!;
        if (attacker.boosts[stat] > 6) attacker.boosts[stat] = 6;
        if (attacker.boosts[stat] < -6) attacker.boosts[stat] = -6;
        attacker.stats[stat] = getModifiedStat(attacker.rawStats[stat]!, attacker.boosts[stat]!);
        defender.boosts[stat] = 0;
        defender.stats[stat] = defender.rawStats[stat];
      }
    }
  }

  if (move.hits > 1) {
    desc.hits = move.hits;
  }

  const turnOrder = attacker.stats.spe > defender.stats.spe ? 'first' : 'last';

  // #endregion
  // #region Base Power

  const basePower = calculateBasePowerSMSSSV(
    gen,
    attacker,
    defender,
    move,
    field,
    hasAteAbilityTypeChange,
    desc
  );
  if (basePower === 0) {
    return result;
  }

  // #endregion
  // #region (Special) Attack
  const attack = calculateAttackSMSSSV(gen, attacker, defender, move, field, desc, isCritical);
  // #endregion

  // #region (Special) Defense

  const defense = calculateDefenseSMSSSV(gen, attacker, defender, move, field, desc, isCritical);
  const hitsPhysical = move.overrideDefensiveStat === 'def' || move.category === 'Physical';
  const defenseStat = hitsPhysical ? 'def' : 'spd';

  // #endregion
  // #region Damage

  const baseDamage = calculateBaseDamageSMSSSV(
    gen,
    attacker,
    defender,
    basePower,
    attack,
    defense,
    move,
    field,
    desc,
    isCritical
  );

  if ((attacker.hasAbility('Triage') && move.flags.heal)) {
    move.priority += 3;
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  /* All of the type based priority moves */
  if (((attacker.hasAbility('Gale Wings') && move.hasType('Flying')) ||
       (attacker.hasAbility('Flaming Soul') && move.hasType('Fire'))) &&
       attacker.curHP() === attacker.maxHP()
  ) {
    move.priority = 1;
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (hasTerrainSeed(defender) &&
    field.hasTerrain(defender.item!.substring(0, defender.item!.indexOf(' ')) as Terrain) &&
    SEED_BOOSTED_STAT[defender.item!] === defenseStat) {
    // Last condition applies so the calc doesn't show a seed where it wouldn't affect the outcome
    // (like Grassy Seed when being hit by a special move)
    desc.defenderItem = defender.item;
  }

  // the random factor is applied between the crit mod and the stab mod, so don't apply anything
  // below this until we're inside the loop
  let preStellarStabMod = getStabMod(attacker, move, desc);
  let stabMod = getStellarStabMod(attacker, move, preStellarStabMod);

  const applyBurn =
    attacker.hasStatus('brn') &&
    move.category === 'Physical' &&
    !attacker.hasAbility('Guts') &&
    !move.named('Facade');
  desc.isBurned = applyBurn;
  const finalMods = calculateFinalModsSMSSSV(
    gen,
    attacker,
    defender,
    move,
    field,
    desc,
    isCritical,
    typeEffectiveness
  );

  let protect = false;
  if (field.defenderSide.isProtected &&
    (attacker.isDynamaxed ||
      attacker.hasAbility('Unseen Fist', 'Piercing Drill') ||
      (move.isZ && attacker.item && attacker.item.includes(' Z')))) {
    protect = true;
    desc.isProtected = true;
  }

  const finalMod = chainMods(finalMods, 41, 131072);

  const isSpread = field.gameType !== 'Singles' &&
     ['allAdjacent', 'allAdjacentFoes'].includes(move.target);

  let childDamage: number[] | undefined;
  if (attacker.hasAbility('Parental Bond') && move.hits === 1 && !isSpread) {
    const child = attacker.clone();
    
    /* Need to check which innate slot the ability is...or if it is the ability slot */
    if (child.innates) {
      var i;
      for (i = 0; i < 3; i++) {
        if (child.innates[i] === attacker.descAbility) { break; }
      }
      if (i < 3) { child.innates[i] = 'Parental Bond (Child)' as AbilityName; }
      else { child.ability = 'Parental Bond (Child)' as AbilityName; }
    } else { child.ability = 'Parental Bond (Child)' as AbilityName; }

    checkMultihitBoost(gen, child, defender, move, field, desc);
    childDamage = calculateSMSSSV(gen, child, defender, move, field).damage as number[];
    console.log(childDamage);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  const damage = [];
  for (let i = 0; i < 16; i++) {
    damage[i] =
      getFinalDamage(baseDamage, i, typeEffectiveness, applyBurn, stabMod, finalMod, protect);
  }
  result.damage = childDamage ? [damage, childDamage] : damage;

  if (move.timesUsed! > 1 || move.hits > 1) {
    // store boosts so intermediate boosts don't show.
    const origDefBoost = desc.defenseBoost;
    const origAtkBoost = desc.attackBoost;

    let numAttacks = 1;
    if (move.timesUsed! > 1) {
      desc.moveTurns = `over ${move.timesUsed} turns`;
      numAttacks = move.timesUsed!;
    } else {
      numAttacks = move.hits;
    }
    let usedItems = [false, false];
    const damageMatrix = [damage];
    for (let times = 1; times < numAttacks; times++) {
      usedItems = checkMultihitBoost(gen, attacker, defender, move,
        field, desc, usedItems[0], usedItems[1]);
      const newAttack = calculateAttackSMSSSV(gen, attacker, defender, move,
        field, desc, isCritical);
      const newDefense = calculateDefenseSMSSSV(gen, attacker, defender, move,
        field, desc, isCritical);
      // Check if lost -ate ability. Typing stays the same, only boost is lost
      // Cannot be regained during multihit move and no Normal moves with stat drawbacks
      hasAteAbilityTypeChange = hasAteAbilityTypeChange &&
        attacker.hasAbility(
          'Aerilate', 'Galvanize', 'Pixilate', 'Refrigerate', 'Normalize', 'Dragonize'
        );

      if (move.timesUsed! > 1) {
        // Adaptability does not change between hits of a multihit, only between turns
        preStellarStabMod = getStabMod(attacker, move, desc);
        // Hack to make Tera Shell with multihit moves, but not over multiple turns
        typeEffectiveness = turn2typeEffectiveness;
        // Stellar damage boost applies for 1 turn, but all hits of multihit.
        stabMod = getStellarStabMod(attacker, move, preStellarStabMod, times);
      }

      const newBasePower = calculateBasePowerSMSSSV(
        gen,
        attacker,
        defender,
        move,
        field,
        hasAteAbilityTypeChange,
        desc,
        times + 1
      );
      const newBaseDamage = calculateBaseDamageSMSSSV(
        gen,
        attacker,
        defender,
        newBasePower,
        newAttack,
        newDefense,
        move,
        field,
        desc,
        isCritical
      );
      const newFinalMods = calculateFinalModsSMSSSV(
        gen,
        attacker,
        defender,
        move,
        field,
        desc,
        isCritical,
        typeEffectiveness,
        times
      );
      const newFinalMod = chainMods(newFinalMods, 41, 131072);

      const damageArray = [];
      for (let i = 0; i < 16; i++) {
        const newFinalDamage = getFinalDamage(
          newBaseDamage,
          i,
          typeEffectiveness,
          applyBurn,
          stabMod,
          newFinalMod,
          protect
        );
        damageArray[i] = newFinalDamage;
      }
      damageMatrix[times] = damageArray;
    }
    result.damage = damageMatrix;
    desc.defenseBoost = origDefBoost;
    desc.attackBoost = origAtkBoost;
  }


  // #endregion

  return result;
}

export function calculateBasePowerSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field,
  hasAteAbilityTypeChange: boolean,
  desc: RawDesc,
  hit = 1,
) {
  const turnOrder = attacker.stats.spe > defender.stats.spe ? 'first' : 'last';

  let basePower: number;

  switch (move.name) {
  case 'Payback':
    basePower = move.bp * (turnOrder === 'last' ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Bolt Beak':
  case 'Fishious Rend':
    basePower = move.bp * (turnOrder !== 'last' ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Pursuit':
    const switching = field.defenderSide.isSwitching === 'out';
    basePower = move.bp * (switching ? 2 : 1);
    if (switching) desc.isSwitching = 'out';
    desc.moveBP = basePower;
    break;
  case 'Electro Ball':
    const r = Math.floor(attacker.stats.spe / defender.stats.spe);
    basePower = r >= 4 ? 150 : r >= 3 ? 120 : r >= 2 ? 80 : r >= 1 ? 60 : 40;
    if (defender.stats.spe === 0) basePower = 40;
    desc.moveBP = basePower;
    break;
  case 'Gyro Ball':
    basePower = Math.min(150, Math.floor((25 * defender.stats.spe) / attacker.stats.spe) + 1);
    if (attacker.stats.spe === 0) basePower = 1;
    desc.moveBP = basePower;
    break;
  case 'Punishment':
    basePower = Math.min(200, 60 + 20 * countBoosts(gen, defender.boosts));
    desc.moveBP = basePower;
    break;
  case 'Low Kick':
  case 'Grass Knot':
    const w = getWeight(defender, desc, 'defender');
    basePower = w >= 200 ? 120 : w >= 100 ? 100 : w >= 50 ? 80 : w >= 25 ? 60 : w >= 10 ? 40 : 20;
    desc.moveBP = basePower;
    break;
  case 'Hex':
  case 'Infernal Parade':
    // Hex deals double damage to Pokemon with Comatose (ih8ih8sn0w)
    basePower = move.bp * (defender.status || defender.hasAbility('Comatose') ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Barb Barrage':
    basePower = move.bp * (defender.hasStatus('psn', 'tox') ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Heavy Slam':
  case 'Heat Crash':
    const wr =
        getWeight(attacker, desc, 'attacker') /
        getWeight(defender, desc, 'defender');
    basePower = wr >= 5 ? 120 : wr >= 4 ? 100 : wr >= 3 ? 80 : wr >= 2 ? 60 : 40;
    desc.moveBP = basePower;
    break;
  case 'Stored Power':
  case 'Power Trip':
    basePower = 20 + 20 * countBoosts(gen, attacker.boosts);
    desc.moveBP = basePower;
    break;
  case 'Acrobatics':
    basePower = move.bp * (attacker.hasItem('Flying Gem') ||
        (!attacker.item ||
          (isQPActive(attacker, field) && attacker.hasItem('Booster Energy'))) ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Assurance':
    basePower = move.bp * (defender.hasAbility('Parental Bond (Child)') ? 2 : 1);
    // NOTE: desc.attackerAbility = 'Parental Bond' will already reflect this boost
    break;
  case 'Wake-Up Slap':
    // Wake-Up Slap deals double damage to Pokemon with Comatose (ih8ih8sn0w)
    basePower = move.bp * (defender.hasStatus('slp') || defender.hasAbility('Comatose') ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Smelling Salts':
    basePower = move.bp * (defender.hasStatus('par') ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Weather Ball':
    const isStrongWinds = field.hasWeather('Strong Winds');
    const isMegaSol = attacker.hasAbility('Mega Sol');
    basePower = move.bp * ((field.weather && !isStrongWinds) || isMegaSol ? 2 : 1);
    if (field.hasWeather('Sun', 'Harsh Sunshine', 'Rain', 'Heavy Rain') &&
      attacker.hasItem('Utility Umbrella') && !isMegaSol) basePower = move.bp;
    desc.moveBP = basePower;
    break;
  case 'Terrain Pulse':
    basePower = move.bp * (isGrounded(attacker, field) && field.terrain ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Rising Voltage':
    basePower = move.bp * ((isGrounded(defender, field) && field.hasTerrain('Electric')) ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Ominous Wind': /* Doubled BP in fog */
    basePower = move.bp * (field.hasWeather('Fog') ? 2 : 1);
    desc.moveBP = basePower;
    break;
  case 'Psyblade':
    basePower = move.bp * (field.hasTerrain('Electric') ? 1.5 : 1);
    if (field.hasTerrain('Electric')) {
      desc.moveBP = basePower;
      desc.terrain = field.terrain;
    }
    break;
  case 'Fling':
    basePower = getFlingPower(attacker.item, gen.num);
    desc.moveBP = basePower;
    desc.attackerItem = attacker.item;
    break;
  case 'Dragon Energy':
  case 'Eruption':
  case 'Water Spout':
    basePower = Math.max(1, Math.floor((150 * attacker.curHP()) / attacker.maxHP()));
    desc.moveBP = basePower;
    break;
  case 'Flail':
  case 'Reversal':
    const p = Math.floor((48 * attacker.curHP()) / attacker.maxHP());
    basePower = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
    desc.moveBP = basePower;
    break;
  case 'Natural Gift':
    if (attacker.item?.endsWith('Berry')) {
      const gift = getNaturalGift(gen, attacker.item)!;
      basePower = gift.p;
      desc.attackerItem = attacker.item;
      desc.moveBP = move.bp;
    } else {
      basePower = move.bp;
    }
    break;
  case 'Nature Power':
    move.category = 'Special';
    move.secondaries = true;

    // Nature Power cannot affect Dark-types if it is affected by Prankster
    if (attacker.hasAbility('Prankster') && defender.types.includes('Dark')) {
      basePower = 0;
      desc.moveName = 'Nature Power';
      desc.attackerAbility = addSpacedStr(desc.attackerAbility, 'Prankster', desc, 'a');
      break;
    }
    switch (field.terrain) {
    case 'Electric':
      basePower = 90;
      desc.moveName = 'Thunderbolt';
      break;
    case 'Grassy':
      basePower = 90;
      desc.moveName = 'Energy Ball';
      break;
    case 'Misty':
      basePower = 90; // Moonblast was nerfed to 90 BP
      desc.moveName = 'Moonblast';
      break;
    case 'Toxic':
      basePower = 90;
      desc.moveName = 'Sludge Bomb';
      break;
    case 'Psychic':
      // Nature Power does not affect grounded Pokemon if it is affected by
      // Prankster and there is Psychic Terrain active
      if (attacker.hasAbility('Prankster') && isGrounded(defender, field)) {
        basePower = 0;
        desc.attackerAbility = addSpacedStr(desc.attackerAbility, 'Prankster', desc, 'a');
      } else {
        basePower = 90;
        desc.moveName = 'Psychic';
      }
      break;
    default:
      basePower = 90; // Tri-Attack was buffed to 90 BP
      desc.moveName = 'Tri Attack';
    }
    break;
  case 'Water Shuriken':
    basePower = attacker.named('Greninja-Ash') && attacker.hasAbility('Battle Bond') ? 20 : 15;
    desc.moveBP = basePower;
    break;
  // Triple Axel's damage increases after each consecutive hit (20, 40, 60)
  case 'Triple Axel':
    basePower = hit * 20;
    desc.moveBP = move.hits === 2 ? 60 : move.hits === 3 ? 120 : 20;
    break;
  // Triple Kick's damage increases after each consecutive hit (10, 20, 30)
  case 'Triple Kick':
    basePower = hit * 10;
    desc.moveBP = move.hits === 2 ? 30 : move.hits === 3 ? 60 : 10;
    break;
  case 'Crush Grip':
  case 'Wring Out':
    basePower = 100 * Math.floor((defender.curHP() * 4096) / defender.maxHP());
    basePower = Math.floor(Math.floor((120 * basePower + 2048 - 1) / 4096) / 100) || 1;
    desc.moveBP = basePower;
    break;
  case 'Hard Press':
    basePower = 100 * Math.floor((defender.curHP() * 4096) / defender.maxHP());
    basePower = Math.floor(Math.floor((100 * basePower + 2048 - 1) / 4096) / 100) || 1;
    desc.moveBP = basePower;
    break;
  case 'Tera Blast':
    basePower = attacker.teraType === 'Stellar' ? 100 : 80;
    desc.moveBP = basePower;
    break;
  default:
    basePower = move.bp;
  }
  if (basePower === 0) {
    return 0;
  }
  if (move.named(
    'Breakneck Blitz', 'Bloom Doom', 'Inferno Overdrive', 'Hydro Vortex', 'Gigavolt Havoc',
    'Subzero Slammer', 'Supersonic Skystrike', 'Savage Spin-Out', 'Acid Downpour', 'Tectonic Rage',
    'Continental Crush', 'All-Out Pummeling', 'Shattered Psyche', 'Never-Ending Nightmare',
    'Devastating Drake', 'Black Hole Eclipse', 'Corkscrew Crash', 'Twinkle Tackle'
  ) || move.isMax) {
    // show z-move power in description
    desc.moveBP = move.bp;
  }
  const bpMods = calculateBPModsSMSSSV(
    gen,
    attacker,
    defender,
    move,
    field,
    desc,
    basePower,
    hasAteAbilityTypeChange,
    turnOrder,
    hit
  );
  basePower = OF16(Math.max(1, pokeRound((basePower * chainMods(bpMods, 41, 2097152)) / 4096)));
  if (
    attacker.teraType &&
    ((move.type === attacker.teraType && attacker.hasType(attacker.teraType)) ||
    (attacker.teraType === 'Stellar' && move.isStellarFirstUse)) &&
    move.hits === 1 && !move.multiaccuracy &&
    move.priority <= 0 && move.bp > 0 &&
    !move.named('Dragon Energy', 'Eruption', 'Water Spout') &&
    basePower < 60 && gen.num >= 9
  ) {
    basePower = 60;
    desc.moveBP = 60;
  }
  return basePower;
}

export function calculateBPModsSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field,
  desc: RawDesc,
  basePower: number,
  hasAteAbilityTypeChange: boolean,
  turnOrder: string,
  hit: number
) {
  const bpMods = [];

  // Move effects
  const defenderItem = (defender.item && defender.item !== '')
    ? defender.item : defender.disabledItem;
  let resistedKnockOffDamage =
    (!defenderItem || (isQPActive(defender, field) && defenderItem === 'Booster Energy')) ||
    (defender.named('Dialga-Origin') && defenderItem === 'Adamant Crystal') ||
    (defender.named('Palkia-Origin') && defenderItem === 'Lustrous Globe') ||
    // Griseous Core for gen 9, Griseous Orb otherwise
    (defender.name.includes('Giratina-Origin') && defenderItem.includes('Griseous')) ||
    (defender.name.includes('Arceus') && defenderItem.includes('Plate')) ||
    (defender.name.includes('Genesect') && defenderItem.includes('Drive')) ||
    (defender.named('Groudon', 'Groudon-Primal') && defenderItem === 'Red Orb') ||
    (defender.named('Kyogre', 'Kyogre-Primal') && defenderItem === 'Blue Orb') ||
    (defender.name.includes('Silvally') && defenderItem.includes('Memory')) ||
    defenderItem.includes(' Z') ||
    (defender.name.includes('Zacian') && defenderItem === 'Rusted Sword') ||
    (defender.name.includes('Zamazenta') && defenderItem === 'Rusted Shield') ||
    (defender.name.includes('Ogerpon-Cornerstone') && defenderItem === 'Cornerstone Mask') ||
    (defender.name.includes('Ogerpon-Hearthflame') && defenderItem === 'Hearthflame Mask') ||
    (defender.name.includes('Ogerpon-Wellspring') && defenderItem === 'Wellspring Mask') ||
    (defender.named('Venomicon-Epilogue') && defenderItem === 'Vile Vial');

  // The last case only applies when the Pokemon has the Mega Stone that matches its species
  // (or when it's already a Mega-Evolution)
  if (!resistedKnockOffDamage && defenderItem) {
    const item = gen.items.get(toID(defenderItem))!;
    resistedKnockOffDamage = !!(item.megaStone &&
      (item.megaStone[defender.name] || Object.values(item.megaStone).includes(defender.name)));
  }

  // Resist knock off damage if your item was already knocked off
  if (!resistedKnockOffDamage && hit > 1 && !defender.hasAbility('Sticky Hold')) {
    resistedKnockOffDamage = true;
  }

  if ((move.named('Facade') && attacker.hasStatus('brn', 'par', 'psn', 'tox')) ||
    (move.named('Brine') && defender.curHP() <= defender.maxHP() / 2) ||
    (move.named('Venoshock') && defender.hasStatus('psn', 'tox')) ||
    (move.named('Venoshock') && isGrounded(defender, field) && field.hasTerrain('Toxic')) || /* New Venoshock Condition */
    (move.named('Lash Out') && (countBoosts(gen, attacker.boosts) < 0))
  ) {
    bpMods.push(8192);
    desc.moveBP = basePower * 2;
  } else if (
    move.named('Expanding Force') && isGrounded(attacker, field) && field.hasTerrain('Psychic')
  ) {
    move.target = 'allAdjacentFoes';
    bpMods.push(6144);
    desc.moveBP = basePower * 1.5;
  } else if ((move.named('Knock Off') && !resistedKnockOffDamage) ||
    (move.named('Misty Explosion') && isGrounded(attacker, field) && field.hasTerrain('Misty')) ||
    (move.named('Grav Apple') && field.isGravity)
  ) {
    bpMods.push(6144);
    desc.moveBP = basePower * 1.5;
  } else if (move.named('Solar Beam', 'Solar Blade') &&
      field.hasWeather('Rain', 'Heavy Rain', 'Sand', 'Hail', 'Snow')) {
    bpMods.push(2048);
    desc.moveBP = basePower / 2;
    desc.weather = field.weather;
  } else if (move.named('Collision Course', 'Electro Drift')) {
    const isGhostRevealed =
      attacker.hasAbility('Scrappy') || attacker.hasAbility('Mind\'s Eye') ||
      field.defenderSide.isForesight;
    const isRingTarget =
      defender.hasItem('Ring Target') && !defender.hasAbility('Klutz');
    const isNormalize = attacker.hasAbility('Normalize');
    const types = defender.teraType && defender.teraType !== 'Stellar'
      ? [defender.teraType] : defender.types;
    const type1Effectiveness = getMoveEffectiveness(
      gen,
      move,
      types[0],
      isGhostRevealed,
      field.isGravity,
      isRingTarget,
      isNormalize
    );
    const type2Effectiveness = types[1] ? getMoveEffectiveness(
      gen,
      move,
      types[1],
      isGhostRevealed,
      field.isGravity,
      isRingTarget,
      isNormalize
    ) : 1;
    if (type1Effectiveness * type2Effectiveness >= 2) {
      bpMods.push(5461);
      desc.moveBP = basePower * (5461 / 4096);
    }
  }

  if (field.attackerSide.isHelpingHand) {
    bpMods.push(6144);
    desc.isHelpingHand = true;
  }

  // Field effects

  const terrainMultiplier = gen.num > 7 ? 5325 : 6144;
  if (isGrounded(attacker, field)) {
    if ((field.hasTerrain('Electric') && move.hasType('Electric')) ||
        (field.hasTerrain('Grassy') && move.hasType('Grass')) ||
        (field.hasTerrain('Psychic') && move.hasType('Psychic')) ||
        (field.hasTerrain('Misty') && move.hasType('Fairy')) ||
        (field.hasTerrain('Toxic') && move.hasType('Poison'))
    ) {
      bpMods.push(terrainMultiplier);
      desc.terrain = field.terrain;
    }
  }
  /* Misty Terrain and Grassy Terrain don't do this anymore
  if (isGrounded(defender, field)) {
    if ((field.hasTerrain('Misty') && move.hasType('Dragon')) ||
        (field.hasTerrain('Grassy') && move.named('Bulldoze', 'Earthquake'))
    ) {
      bpMods.push(2048);
      desc.terrain = field.terrain;
    }
  }
  */

  // Abilities

  // Use BasePower after moves with custom BP to determine if Technician should boost
  if ((attacker.hasAbility('Technician') && basePower <= 60)) {
    bpMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  if (attacker.hasAbility('Toxic Boost') && attacker.hasStatus('psn', 'tox') && move.category === 'Physical') {
    bpMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  /* Flare Boost now activates if Fog is up as well */
  if ((attacker.hasAbility('Flare Boost') &&
      (attacker.hasStatus('brn') || field.hasWeather('Fog'))) && move.category === 'Special') {
    bpMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  const aura = `${move.type} Aura`;
  const isAttackerAura = attacker.hasAbility(aura);
  const isDefenderAura = defender.hasAbility(aura);
  const isUserAuraBreak = attacker.hasAbility('Aura Break') || defender.hasAbility('Aura Break');
  const isFieldAuraBreak = field.isAuraBreak;
  const isFieldFairyAura = field.isFairyAura && move.type === 'Fairy';
  const isFieldDarkAura = field.isDarkAura && move.type === 'Dark';
  const auraActive = isAttackerAura || isDefenderAura || isFieldFairyAura || isFieldDarkAura;
  const auraBreak = isFieldAuraBreak || isUserAuraBreak;
  if (auraActive) {
    if (auraBreak) {
      bpMods.push(3072);
      desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
      desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
    } else {
      bpMods.push(5448);
      if (isAttackerAura) desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
      if (isDefenderAura) desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
      if (!isAttackerAura && !isDefenderAura) {
        if (isFieldFairyAura) { desc.attackerAbility = addSpacedStr(desc.attackerAbility, 'Fairy Aura', desc, 'a'); }
        if (isFieldDarkAura) { desc.attackerAbility = addSpacedStr(desc.attackerAbility, 'Dark Aura', desc, 'a'); }
      }
    }
  }

  // Sheer Force does not power up max moves or remove the effects (SadisticMystic)
  if ((attacker.hasAbility('Sheer Force') && (move.secondaries || move.named('Electro Shot', 'Order Up')) && !move.isMax)) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Analytic') && (turnOrder !== 'first' || field.defenderSide.isSwitching === 'out')) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Tough Claws') && move.flags.contact) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  if (attacker.hasAbility('Big Pecks') && move.flags.contact) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Mega Launcher') && move.flags.pulse) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Strong Jaw') && move.flags.bite) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Steely Spirit') && move.hasType('Steel')) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Keen Edge') && move.flags.slicing) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Illusion')) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, 'Flash Fire', desc, 'a');
  }

  if (attacker.hasAbility('Punk Rock') && move.flags.sound) {
    bpMods.push(5325);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (defender.hasAbility('Stall') && turnOrder === 'first') {
    bpMods.push(2867);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (field.attackerSide.isBattery && move.category === 'Special') {
    bpMods.push(5325);
    desc.isBattery = true;
  }

  if (field.attackerSide.isPowerSpot) {
    bpMods.push(5325);
    desc.isPowerSpot = true;
  }

  if (attacker.hasAbility('Rivalry') && ![attacker.gender, defender.gender].includes('N')) {
    if (attacker.gender === defender.gender) {
      bpMods.push(5120);
      desc.rivalry = 'buffed';
    } /* else {
      bpMods.push(3072);
      desc.rivalry = 'nerfed';
    } Rivalry doesn't suck balls anymore */
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  /* Instead, Rivalry's buff lets it act like a defensive ability. (See calc dfMods) */

  // The -ate abilities already changed move typing earlier, so most checks are done and desc is set
  // However, Max Moves also don't boost -ate Abilities
  /* if (!move.isMax && hasAteAbilityTypeChange) {
    bpMods.push(4915);
  } No more power boost on -ate moves...with the exception of Normalize */
  if (attacker.hasAbility('Normalize')) {
    bpMods.push(4506);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  /* Enraged also triggers this */
  if ((attacker.hasAbility('Reckless') && (move.recoil || move.hasCrashDamage || field.attackerSide.isEnraged))) {
    bpMods.push(4915);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if ((attacker.hasAbility('Iron Fist') && move.flags.punch)) {
    bpMods.push(5325); /* Iron Fist buffed from 1.2x to 1.3x */
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (defender.hasAbility('Dry Skin') && move.hasType('Fire')) {
    bpMods.push(5120);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (attacker.hasAbility('Supreme Overlord') && attacker.alliesFainted) {
    const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
    bpMods.push(powMod[Math.min(5, attacker.alliesFainted)]);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    desc.alliesFainted = attacker.alliesFainted;
  }

  // Items

  if (attacker.hasItem(`${move.type} Gem`)) {
    bpMods.push(5325);
    desc.attackerItem = attacker.item;
  } else if (
    (((attacker.hasItem('Adamant Crystal') && attacker.named('Dialga-Origin')) ||
      (attacker.hasItem('Adamant Orb') && attacker.named('Dialga'))) &&
     move.hasType('Steel', 'Dragon')) ||
    (((attacker.hasItem('Lustrous Orb') &&
     attacker.named('Palkia')) ||
      (attacker.hasItem('Lustrous Globe') && attacker.named('Palkia-Origin'))) &&
     move.hasType('Water', 'Dragon')) ||
    (((attacker.hasItem('Griseous Orb') || attacker.hasItem('Griseous Core')) &&
     (attacker.named('Giratina-Origin') || attacker.named('Giratina'))) &&
     move.hasType('Ghost', 'Dragon')) ||
    (attacker.hasItem('Vile Vial') &&
     attacker.named('Venomicon-Epilogue') &&
     move.hasType('Poison', 'Flying')) ||
     attacker.item && move.hasType(getItemBoostType(attacker.item)) ||
    (attacker.name.includes('Ogerpon-Cornerstone') && attacker.hasItem('Cornerstone Mask')) ||
    (attacker.name.includes('Ogerpon-Hearthflame') && attacker.hasItem('Hearthflame Mask')) ||
    (attacker.name.includes('Ogerpon-Wellspring') && attacker.hasItem('Wellspring Mask'))
  ) {
    bpMods.push(4915);
    desc.attackerItem = attacker.item;
  } else if (
    (attacker.hasItem('Muscle Band') && move.category === 'Physical') ||
    (attacker.hasItem('Wise Glasses') && move.category === 'Special')
  ) {
    bpMods.push(4710); /* Muscle Band and Wise Glasses were both buffed to 1.15x*/
    desc.attackerItem = attacker.item;
  } else if (attacker.hasItem('Punching Glove') && move.flags.punch) {
    bpMods.push(4506);
    desc.attackerItem = attacker.item;
  /* Soul Dew was buffed to pre gen-7 functionality */
  } else if (attacker.hasItem('Soul Dew') &&
    attacker.named('Latios', 'Latias', 'Latios-Mega', 'Latias-Mega') &&
    move.category === 'Special'
  ) {
    bpMods.push(6144);
    desc.attackerItem = attacker.item;
  }
  return bpMods;
}

export function calculateAttackSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field,
  desc: RawDesc,
  isCritical = false
) {
  let attack: number;
  const attackSource = move.named('Foul Play') ? defender : attacker;
  const attackStat =
    move.named('Body Press')
      ? (field.isWonderRoom ? 'spd' : 'def')
      : (move.category === 'Special' ? 'spa' : 'atk');
  // Body Press in Wonder Room uses normal Def, which checkRawStatChanges has moved to SpD
  desc.attackEVs =
    move.named('Foul Play')
      ? getStatDescriptionText(
        gen, attackSource, attackStat, field.defenderSide.isPowerTrick
      )
      : getStatDescriptionText(
        gen, attackSource, attackStat, field.attackerSide.isPowerTrick, field.isWonderRoom
      );
  if (field.attackerSide.isPowerTrick) {
    if ((move.category === 'Physical' && !move.named('Foul Play')) || move.named('Body Press')) {
      desc.isPowerTrickAttacker = true;
    }
  }
  const boosts = attackSource.boosts[attackStat];
  if (boosts === 0 || (isCritical && boosts < 0)) {
    attack = attackSource.rawStats[attackStat];
  } else if (defender.hasAbility('Unaware')) {
    attack = attackSource.rawStats[attackStat];
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  } else {
    attack = getModifiedStat(attackSource.rawStats[attackStat]!, boosts);
    desc.attackBoost = boosts;
  }

  // unlike all other attack modifiers, Hustle gets applied directly (interesting...)
  if (attacker.hasAbility('Hustle')/* && move.category === 'Physical' */) {
    /* Hustle boosts BOTH physical and special now, nerfed to 1.4x to compensate (also only gives -10% acc) */
    attack = pokeRound((attack * 7) / 5);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  const atMods = calculateAtModsSMSSSV(gen, attacker, defender, move, field, desc);
  attack = OF16(Math.max(1, pokeRound((attack * chainMods(atMods, 410, 131072)) / 4096)));
  return attack;
}

export function calculateAtModsSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field,
  desc: RawDesc
) {
  const atMods = [];
  /* These two variables are used for the starter abilities later... */
  var regModifier = 0;
  var megaModifier = 0;


  // Slow Start also halves damage with special Z-moves
  if ((attacker.hasAbility('Slow Start') && attacker.abilityOn &&
       (move.category === 'Physical' || (move.category === 'Special' && move.isZ))) ||
       /* Defeatist now requires <1/3 HP instead of <1/2 HP */
      (attacker.hasAbility('Defeatist') && attacker.curHP() <= attacker.maxHP() / 3)
  ) {
    atMods.push(2048);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  /* Since we're here, Sand Force does the same thing now. There's also Whiteout for Hail, Raging Storm for Rain, and Ectoplasm for Fog. */
  if ((((attacker.hasAbility('Solar Power') && field.hasWeather('Sun', 'Harsh Sunshine')) ||
        (attacker.hasAbility('Raging Storm') && field.hasWeather('Rain', 'Heavy Rain')) ||
        (attacker.hasAbility('Whiteout') && field.hasWeather('Hail')) ||
        (attacker.hasAbility('Sand Force') && field.hasWeather('Sand')) ||
        (attacker.hasAbility('Ectoplasm') && field.hasWeather('Fog'))) &&
     /* Solar Power now boosts highest offense instead of just special moves */
     ((move.category === 'Special' && attacker.stats.atk <= attacker.stats.spa) ||
      (move.category === 'Physical' && attacker.stats.atk >= attacker.stats.spa)))) {
    atMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    desc.weather = field.weather;
  }

  if ((attacker.named('Cherrim') &&
     attacker.hasAbility('Flower Gift') &&
     field.hasWeather('Sun', 'Harsh Sunshine') &&
     move.category === 'Physical')) {
    atMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    desc.weather = field.weather;
  }
  /* Sage Power is Special Gorilla Tactics. That's it. */
  if (((attacker.hasAbility('Gorilla Tactics') && move.category === 'Physical') ||
       (attacker.hasAbility('Sage Power') && move.category === 'Special')) &&
     !attacker.isDynamaxed) {
    atMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  if (attacker.status && ((attacker.hasAbility('Guts') && move.category === 'Physical') ||
     (attacker.hasAbility('Determination') && move.category === 'Special'))) {
    atMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  /* For all the starter adjacent abilities, since they're all using different types
  I'm pretty OK just leaving them in one (close enough) if statement*/
  if (attacker.curHP() <= attacker.maxHP() / 3) {
    regModifier = 6144 // 1.5x
    megaModifier = 7372 // 1.8x
  } else {
    regModifier = 4915 // 1.2x
    megaModifier = 5325 // 1.3x
  }
  /* New one for Ghost, Ground, Electric, Psychic, Flying, Fighting, Rock, and Dark */
  if ((attacker.hasAbility('Overgrow') && move.hasType('Grass')) ||
      (attacker.hasAbility('Blaze') && move.hasType('Fire')) ||
      (attacker.hasAbility('Torrent') && move.hasType('Water')) ||
      (attacker.hasAbility('Swarm') && move.hasType('Bug')) ||
      (attacker.hasAbility('Vengeance') && move.hasType('Ghost')) ||
      (attacker.hasAbility('Earthbound') && move.hasType('Ground')) ||
      (attacker.hasAbility('Short Circuit') && move.hasType('Electric')) ||
      (attacker.hasAbility('Psychic Mind') && move.hasType('Psychic')) ||
      (attacker.hasAbility('Flock') && move.hasType('Flying')) ||
      (attacker.hasAbility('Fighter') && move.hasType('Fighting')) ||
      (attacker.hasAbility('Rockhard Will') && move.hasType('Rock')) ||
      (attacker.hasAbility('Foul Energy') && move.hasType('Dark'))) {
        atMods.push(regModifier);
        desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  /* There are "mega" versions, which use megaModifier rather than regModifier */
  if ((attacker.hasAbility('Forest Rage') && move.hasType('Grass')) ||
      (attacker.hasAbility('Hellblaze') && move.hasType('Fire')) ||
      (attacker.hasAbility('Riptide') && move.hasType('Water')) ||
      (attacker.hasAbility('Purgatory') && move.hasType('Ghost')) ||
      (attacker.hasAbility('Overwhelming Mind') && move.hasType('Psychic')) ||
      (attacker.hasAbility('Gladiator') && move.hasType('Fighting')) ||
      (attacker.hasAbility('We Will Rock You') && move.hasType('Rock'))) {
        atMods.push(megaModifier);
        desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (move.category === 'Special' && attacker.abilityOn && attacker.hasAbility('Plus', 'Minus')) {
    atMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }
  if (attacker.hasAbility('Flash Fire') && attacker.abilityOn && move.hasType('Fire')) {
    atMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, 'Flash Fire', desc, 'a');
  }

  /* 1.25x type boosters */
  if (attacker.hasAbility('Levitate') && move.hasType('Flying')) {
    atMods.push(5120);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  /* The 1.5x type boosters */
  if ((attacker.hasAbility('Dragon\'s Maw') && move.hasType('Dragon')) ||
      (attacker.hasAbility('Transistor') && move.hasType('Electric')) ||
      (attacker.hasAbility('Rocky Payload') && move.hasType('Rock')) ||
      (attacker.hasAbility('Combustion') && move.hasType('Fire'))) {
        atMods.push(6144);
        desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (attacker.hasAbility('Stakeout') && attacker.abilityOn) {
    atMods.push(8192);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  /* The 2x type boosters*/
  if ((attacker.hasAbility('Water Bubble') && move.hasType('Water'))) {
    atMods.push(8192);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  /* Huge & Pure Power */
  if ((attacker.hasAbility('Huge Power') && move.category === 'Physical') ||
      (attacker.hasAbility('Pure Power') && move.category === 'Special')) {
    atMods.push(8192);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (
    field.attackerSide.isFlowerGift &&
    !attacker.hasAbility('Flower Gift') &&
    field.hasWeather('Sun', 'Harsh Sunshine') &&
    move.category === 'Physical') {
    atMods.push(6144);
    desc.weather = field.weather;
    desc.isFlowerGiftAttacker = true;
  }

  if (field.attackerSide.isSteelySpirit && move.hasType('Steel')) {
    atMods.push(5325); // Nerfed to 1.3x in ER
    desc.isSteelySpiritAttacker = true;
  }

  /* 7/10 damage from certain types of moves */
  if ((defender.hasAbility('Magma Armor') && move.hasType('Water', 'Ice'))) {
    atMods.push(2867);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  /* 1/2 damage from certain types of moves */
  if ((defender.hasAbility('Thick Fat') && move.hasType('Fire', 'Ice')) ||
      (defender.hasAbility('Purifying Salt') && move.hasType('Ghost')) ||
      (defender.hasAbility('Immunity') && move.hasType('Poison'))) {
        atMods.push(2048);
        desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  /* Water Bubble and Heatproof are seperate because the fire modifiers can stack */
  if (defender.hasAbility('Water Bubble') && move.hasType('Fire')) {
        atMods.push(2048);
        desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }
  if (defender.hasAbility('Heatproof') && move.hasType('Fire')) {
        atMods.push(2048);
        desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }
  // Pokemon with "-of Ruin" Ability are immune to the opposing "-of Ruin" ability
  const isTabletsOfRuinActive = (defender.hasAbility('Tablets of Ruin') || field.isTabletsOfRuin) &&
    !attacker.hasAbility('Tablets of Ruin');
  const isVesselOfRuinActive = (defender.hasAbility('Vessel of Ruin') || field.isVesselOfRuin) &&
    !attacker.hasAbility('Vessel of Ruin');
  if (
    (isTabletsOfRuinActive && move.category === 'Physical') ||
    (isVesselOfRuinActive && move.category === 'Special')
  ) {
    if (defender.hasAbility('Tablets of Ruin') || defender.hasAbility('Vessel of Ruin')) {
      desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
    } else {
      desc[move.category === 'Special' ? 'isVesselOfRuin' : 'isTabletsOfRuin'] = true;
    }
    atMods.push(3072);
  }

  if (isQPActive(attacker, field)) {
    if (
      (move.category === 'Physical' && getQPBoostedStat(attacker) === 'atk') ||
      (move.category === 'Special' && getQPBoostedStat(attacker) === 'spa')
    ) {
      atMods.push(5325);
      desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    }
  }

  if (
    (attacker.hasAbility('Hadron Engine') && move.category === 'Special' &&
      field.hasTerrain('Electric')) ||
    (attacker.hasAbility('Orichalcum Pulse') && move.category === 'Physical' &&
      field.hasWeather('Sun', 'Harsh Sunshine') && !attacker.hasItem('Utility Umbrella'))
  ) {
    atMods.push(5461);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if ((attacker.hasItem('Thick Club') &&
       attacker.named('Cubone', 'Marowak', 'Marowak-Alola', 'Marowak-Alola-Totem') &&
       move.category === 'Physical') ||
      (attacker.hasItem('Deep Sea Tooth') &&
       attacker.named('Clamperl') &&
       move.category === 'Special') ||
       /* Entire Pikachu line can use Light Ball */
      (attacker.hasItem('Light Ball') && (attacker.name.includes('Pikachu') || attacker.name.includes('Pichu') || attacker.name.includes('Raichu')) && !move.isZ)
  ) {
    atMods.push(8192);
    desc.attackerItem = attacker.item;
    // Choice Band/Scarf/Specs move lock and stat boosts are ignored during Dynamax (Anubis)
  } else if (!move.isZ && !move.isMax &&
    ((attacker.hasItem('Choice Band') && move.category === 'Physical') ||
      (attacker.hasItem('Choice Specs') && move.category === 'Special'))
  ) {
    atMods.push(6144);
    desc.attackerItem = attacker.item;
  }
  return atMods;
}

export function calculateDefenseSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field,
  desc: RawDesc,
  isCritical = false
) {
  let defense: number;
  const hitsPhysical = move.overrideDefensiveStat === 'def' || move.category === 'Physical';
  const defenseStat = hitsPhysical ? 'def'
  : (defender.hasAbility('Tangled Feet') && (field.defenderSide.isConfused || field.defenderSide.isEnraged)) ? 'spe'
  : 'spd';

  /* Even though we checked for the abils that change the def stat, we still need to apply them to the desc */
  if (defender.hasAbility('Tangled Feet') && (field.defenderSide.isConfused || field.defenderSide.isEnraged)) {
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  desc.defenseEVs = getStatDescriptionText(
    gen, defender, defenseStat, field.defenderSide.isPowerTrick, field.isWonderRoom
  );
  if (field.defenderSide.isPowerTrick && (field.isWonderRoom !== hitsPhysical)) {
    desc.isPowerTrickDefender = true;
  }

  const boosts = defender.boosts[defenseStat];
  if (boosts === 0 ||
//      (isCritical && boosts > 0) || [to reset crit defense break, un-comment this line]
      move.ignoreDefensive) {
    defense = defender.rawStats[defenseStat];
  } else if (attacker.hasAbility('Unaware') || move.name === 'Nihil Light') {
    defense = defender.rawStats[defenseStat];
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  } else {
    defense = getModifiedStat(defender.rawStats[defenseStat]!, boosts);
    desc.defenseBoost = boosts;
  }

  // unlike all other defense modifiers, Sandstorm SpD boost gets applied directly
  if (field.hasWeather('Sand') && defender.hasType('Rock') && !hitsPhysical) {
    defense = pokeRound((defense * 3) / 2);
    desc.weather = field.weather;
  }
  if (field.hasWeather('Hail') && defender.hasType('Ice') && hitsPhysical) { /* Changed from Snow to Hail */ 
    defense = pokeRound((defense * 3) / 2);
    desc.weather = field.weather;
  }
  if (field.hasWeather('Fog') && defender.hasType('Ghost')) { /* Fog Defense Boost */ 
    defense = pokeRound((defense * 6) / 5);
    desc.weather = field.weather;
  }

  const dfMods = calculateDfModsSMSSSV(
    gen,
    attacker,
    defender,
    move,
    field,
    desc,
    isCritical,
    hitsPhysical
  );

  return OF16(Math.max(1, pokeRound((defense * chainMods(dfMods, 410, 131072)) / 4096)));
}

export function calculateDfModsSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field,
  desc: RawDesc,
  isCritical = false,
  hitsPhysical = false
) {
  const dfMods = [];
  if (defender.hasAbility('Marvel Scale') && defender.status && hitsPhysical) {
    dfMods.push(6144);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }
  if (defender.named('Cherrim') &&
      defender.hasAbility('Flower Gift') &&
      field.hasWeather('Sun', 'Harsh Sunshine') &&
      !hitsPhysical) {
        dfMods.push(6144);
        desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
        desc.weather = field.weather;
  }
  if (field.defenderSide.isFlowerGift &&
      field.hasWeather('Sun', 'Harsh Sunshine') &&
      !hitsPhysical) {
        dfMods.push(6144);
        desc.weather = field.weather;
        desc.isFlowerGiftDefender = true;
  }
  if (defender.hasAbility('Grass Pelt') &&
      field.hasTerrain('Grassy') &&
      hitsPhysical) {
        dfMods.push(6144);
        desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }
  if (defender.hasAbility('Fur Coat') && hitsPhysical) {
        dfMods.push(8192);
        desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  // The defensive utility to rivalry
  if (defender.hasAbility('Rivalry') && ![defender.gender, attacker.gender].includes('N')) {
    if (defender.gender !== attacker.gender) {
      dfMods.push(5448);
      desc.rivalry = 'nerfed';
    } /* else {
      bpMods.push(3072);
      desc.rivalry = 'nerfed';
    } Rivalry doesn't suck balls anymore */
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  // Pokemon with "-of Ruin" Ability are immune to the opposing "-of Ruin" ability
  const isSwordOfRuinActive = (attacker.hasAbility('Sword of Ruin') || field.isSwordOfRuin) &&
    !defender.hasAbility('Sword of Ruin');
  const isBeadsOfRuinActive = (attacker.hasAbility('Beads of Ruin') || field.isBeadsOfRuin) &&
    !defender.hasAbility('Beads of Ruin');
  if (
    (isSwordOfRuinActive && hitsPhysical) ||
    (isBeadsOfRuinActive && !hitsPhysical)
  ) {
    if (attacker.hasAbility('Sword of Ruin') || attacker.hasAbility('Beads of Ruin')) {
      desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
    } else {
      desc[hitsPhysical ? 'isSwordOfRuin' : 'isBeadsOfRuin'] = true;
    }
    dfMods.push(3072);
  }

  if (isQPActive(defender, field)) {
    if (
      (hitsPhysical && getQPBoostedStat(defender) === 'def') ||
      (!hitsPhysical && getQPBoostedStat(defender) === 'spd')
    ) {
      desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
      dfMods.push(5324);
    }
  }

  if ((defender.hasItem('Eviolite') &&
      (defender.name === 'Dipplin' || gen.species.get(toID(defender.name))?.nfe)) ||
      (!hitsPhysical && defender.hasItem('Assault Vest'))) {
    dfMods.push(6144);
    desc.defenderItem = defender.item;
  } else if (
    (defender.hasItem('Metal Powder') && defender.named('Ditto') && hitsPhysical) ||
    (defender.hasItem('Deep Sea Scale') && defender.named('Clamperl') && !hitsPhysical)
  ) {
    dfMods.push(8192);
    desc.defenderItem = defender.item;
  }
  return dfMods;
}

function calculateBaseDamageSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  basePower: number,
  attack: number,
  defense: number,
  move: Move,
  field: Field,
  desc: RawDesc,
  isCritical = false,
) {
  let baseDamage = getBaseDamage(attacker.level, basePower, attack, defense);
  const isSpread = field.gameType !== 'Singles' &&
     ['allAdjacent', 'allAdjacentFoes'].includes(move.target);
  if (isSpread) {
    baseDamage = pokeRound(OF32(baseDamage * 3072) / 4096);
  }

  if (attacker.hasAbility('Parental Bond (Child)')) {
    baseDamage = pokeRound(OF32(baseDamage * 1024) / 4096);
  }

  const isMegaSol = attacker.hasAbility('Mega Sol');
  if (
    (field.hasWeather('Sun') || isMegaSol) &&
      move.named('Hydro Steam') &&
      !attacker.hasItem('Utility Umbrella')
  ) {
    baseDamage = pokeRound(OF32(baseDamage * 6144) / 4096);
    isMegaSol ? desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a') : desc.weather = field.weather;
  } else if (!defender.hasItem('Utility Umbrella')) {
    if (
      ((field.hasWeather('Sun', 'Harsh Sunshine') || isMegaSol) && move.hasType('Fire')) ||
      ((field.hasWeather('Rain', 'Heavy Rain') && !isMegaSol) && move.hasType('Water'))
    ) {
      baseDamage = pokeRound(OF32(baseDamage * 6144) / 4096);
      isMegaSol ? desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a') : desc.weather = field.weather;
    } else if (
      ((field.hasWeather('Sun') || isMegaSol) && move.hasType('Water')) ||
      (field.hasWeather('Rain') && move.hasType('Fire'))
    ) {
      baseDamage = pokeRound(OF32(baseDamage * 2048) / 4096);
      isMegaSol ? desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a') : desc.weather = field.weather;
    }
  }

  if (isCritical) {
    baseDamage = Math.floor(OF32(baseDamage * 1.5));
    desc.isCritical = isCritical;
  }

  return baseDamage;
}

export function calculateFinalModsSMSSSV(
  gen: Generation,
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  field: Field,
  desc: RawDesc,
  isCritical = false,
  typeEffectiveness: number,
  hitCount = 0
) {
  const finalMods = [];

  if (field.defenderSide.isReflect && move.category === 'Physical' &&
      !isCritical && !field.defenderSide.isAuroraVeil) {
    // doesn't stack with Aurora Veil
    finalMods.push(field.gameType !== 'Singles' ? 2732 : 2048);
    desc.isReflect = true;
  } else if (
    field.defenderSide.isLightScreen && move.category === 'Special' &&
    !isCritical && !field.defenderSide.isAuroraVeil
  ) {
    // doesn't stack with Aurora Veil
    finalMods.push(field.gameType !== 'Singles' ? 2732 : 2048);
    desc.isLightScreen = true;
  }
  if (field.defenderSide.isAuroraVeil && !isCritical) {
    finalMods.push(field.gameType !== 'Singles' ? 2732 : 2048);
    desc.isAuroraVeil = true;
  }

  if (attacker.hasAbility('Neuroforce') && typeEffectiveness > 1) {
    finalMods.push(5120);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  } else if (attacker.hasAbility('Sniper') && isCritical) {
    finalMods.push(6144);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  } else if (attacker.hasAbility('Tinted Lens') && typeEffectiveness < 1) {
    finalMods.push(8192);
    desc.attackerAbility = addSpacedStr(desc.attackerAbility, attacker.descAbility, desc, 'a');
  }

  if (defender.isDynamaxed && move.named('Dynamax Cannon', 'Behemoth Blade', 'Behemoth Bash')) {
    finalMods.push(8192);
  }

  if (defender.hasAbility('Multiscale', 'Shadow Shield') &&
      defender.curHP() === defender.maxHP() &&
      hitCount === 0 &&
      (!field.defenderSide.isSR && (!field.defenderSide.spikes || defender.hasType('Flying')) ||
      defender.hasItem('Heavy-Duty Boots') || defender.hasAbility('Shield Dust')) && !attacker.hasAbility('Parental Bond (Child)')
  ) {
    finalMods.push(2048);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (defender.hasAbility('Fluffy') && move.flags.contact && !attacker.hasAbility('Long Reach')) {
    finalMods.push(2048);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (defender.hasAbility('Punk Rock') && move.flags.sound) {
    finalMods.push(2048);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (defender.hasAbility('Ice Scales') && move.category === 'Special') {
    finalMods.push(2048);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (defender.hasAbility('Shell Armor')) {
    finalMods.push(3276);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  /* Overcoat reduces special damage by 20% */
  if (defender.hasAbility('Overcoat') && move.category === 'Special') {
    finalMods.push(3276);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (defender.hasAbility('Filter') && typeEffectiveness > 1) {
    finalMods.push(2662);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }
  if (defender.hasAbility('Solid Rock') && typeEffectiveness > 1) {
    finalMods.push(2662);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }
  if (defender.hasAbility('Prism Armor') && typeEffectiveness > 1) {
    finalMods.push(2662);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (field.defenderSide.isFriendGuard) {
    finalMods.push(2048); // Buffed to 50% in ER
    desc.isFriendGuard = true;
  }

  if (defender.hasAbility('Fluffy') && move.hasType('Fire')) {
    finalMods.push(8192);
    desc.defenderAbility = addSpacedStr(desc.defenderAbility, defender.descAbility, desc, 'd');
  }

  if (attacker.hasItem('Expert Belt') && typeEffectiveness > 1 && !move.isZ) {
    finalMods.push(4915);
    desc.attackerItem = attacker.item;
  } else if (attacker.hasItem('Life Orb')) {
    finalMods.push(5324);
    desc.attackerItem = attacker.item;
  } else if (attacker.hasItem('Metronome') && move.timesUsedWithMetronome! >= 1) {
    const timesUsedWithMetronome = Math.floor(move.timesUsedWithMetronome!);
    if (timesUsedWithMetronome <= 4) {
      finalMods.push(4096 + timesUsedWithMetronome * 819);
    } else {
      finalMods.push(8192);
    }
    desc.attackerItem = attacker.item;
  }

  if (move.hasType(getBerryResistType(defender.item)) &&
      (typeEffectiveness > 1 || move.hasType('Normal')) &&
      hitCount === 0 &&
      !attacker.hasAbility('Unnerve', 'As One (Glastrier)', 'As One (Spectrier)')) {
    if (defender.hasAbility('Ripen')) {
      finalMods.push(1024);
    } else {
      finalMods.push(2048);
    }
    desc.defenderItem = defender.item;
  }

  if (typeEffectiveness === 4 && field.defenderSide.isDWC === true && hitCount === 0) {
    finalMods.push(2048);
    desc.dwc = true;
  }

  return finalMods;
}

function hasTerrainSeed(pokemon: Pokemon) {
  return pokemon.hasItem('Electric Seed', 'Misty Seed', 'Grassy Seed', 'Psychic Seed', 'Toxic Seed');
}
