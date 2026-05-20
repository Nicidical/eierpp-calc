import type * as I from './interface';
import {type DeepPartial, toID, extend, assignWithout} from '../util';

export interface SpeciesData {
  readonly types: [I.TypeName] | [I.TypeName, I.TypeName];
  // TODO: replace with baseStats
  readonly bs: {
    hp: number;
    at: number;
    df: number;
    sa?: number;
    sd?: number;
    sl?: number;
    sp: number;
  };
  readonly weightkg: number;
  readonly gender?: I.GenderName;
  readonly nfe?: boolean;
  readonly abilities?: {0: string};
  readonly innates?: string[];
  readonly heads?: number;
  readonly otherFormes?: string[];
  readonly baseSpecies?: string;
}

function removeAttr(set: {[name: string]: SpeciesData}, pokemon: string, attr: keyof SpeciesData) {
  delete set[pokemon][attr];
}

const RBY: {[name: string]: SpeciesData} = {
  Abra: {
    types: ['Psychic'],
    bs: {hp: 25, at: 20, df: 15, sl: 105, sp: 90},
    weightkg: 19.5,
    nfe: true,
  },
  Aerodactyl: {
    types: ['Rock', 'Flying'],
    bs: {hp: 80, at: 105, df: 65, sl: 60, sp: 130},
    weightkg: 59,
  },
  Alakazam: {
    types: ['Psychic'],
    bs: {hp: 55, at: 50, df: 45, sl: 135, sp: 120},
    weightkg: 48,
  },
  Arbok: {
    types: ['Poison'],
    bs: {hp: 60, at: 85, df: 69, sl: 65, sp: 80},
    weightkg: 65,
  },
  Arcanine: {
    types: ['Fire'],
    bs: {hp: 90, at: 110, df: 80, sl: 80, sp: 95},
    weightkg: 155,
  },
  Articuno: {
    types: ['Ice', 'Flying'],
    bs: {hp: 90, at: 85, df: 100, sl: 125, sp: 85},
    weightkg: 55.4,
  },
  Beedrill: {
    types: ['Bug', 'Poison'],
    bs: {hp: 65, at: 80, df: 40, sl: 45, sp: 75},
    weightkg: 29.5,
  },
  Bellsprout: {
    types: ['Grass', 'Poison'],
    bs: {hp: 50, at: 75, df: 35, sl: 70, sp: 40},
    weightkg: 4,
    nfe: true,
  },
  Blastoise: {
    types: ['Water'],
    bs: {hp: 79, at: 83, df: 100, sl: 85, sp: 78},
    weightkg: 85.5,
  },
  Bulbasaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 45, at: 49, df: 49, sl: 65, sp: 45},
    weightkg: 6.9,
    nfe: true,
  },
  Butterfree: {
    types: ['Bug', 'Flying'],
    bs: {hp: 60, at: 45, df: 50, sl: 80, sp: 70},
    weightkg: 32,
  },
  Caterpie: {
    types: ['Bug'],
    bs: {hp: 45, at: 30, df: 35, sl: 20, sp: 45},
    weightkg: 2.9,
    nfe: true,
  },
  Chansey: {
    types: ['Normal'],
    bs: {hp: 250, at: 5, df: 5, sl: 105, sp: 50},
    weightkg: 34.6,
  },
  Charizard: {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 84, df: 78, sl: 85, sp: 100},
    weightkg: 90.5,
  },
  Charmander: {
    types: ['Fire'],
    bs: {hp: 39, at: 52, df: 43, sl: 50, sp: 65},
    weightkg: 8.5,
    nfe: true,
  },
  Charmeleon: {
    types: ['Fire'],
    bs: {hp: 58, at: 64, df: 58, sl: 65, sp: 80},
    weightkg: 19,
    nfe: true,
  },
  Clefable: {
    types: ['Normal'],
    bs: {hp: 95, at: 70, df: 73, sl: 85, sp: 60},
    weightkg: 40,
  },
  Clefairy: {
    types: ['Normal'],
    bs: {hp: 70, at: 45, df: 48, sl: 60, sp: 35},
    weightkg: 7.5,
    nfe: true,
  },
  Cloyster: {
    types: ['Water', 'Ice'],
    bs: {hp: 50, at: 95, df: 180, sl: 85, sp: 70},
    weightkg: 132.5,
  },
  Cubone: {
    types: ['Ground'],
    bs: {hp: 50, at: 50, df: 95, sl: 40, sp: 35},
    weightkg: 6.5,
    nfe: true,
  },
  Dewgong: {
    types: ['Water', 'Ice'],
    bs: {hp: 90, at: 70, df: 80, sl: 95, sp: 70},
    weightkg: 120,
  },
  Diglett: {
    types: ['Ground'],
    bs: {hp: 10, at: 55, df: 25, sl: 45, sp: 95},
    weightkg: 0.8,
    nfe: true,
  },
  Ditto: {
    types: ['Normal'],
    bs: {hp: 48, at: 48, df: 48, sl: 48, sp: 48},
    weightkg: 4,
  },
  Dodrio: {
    types: ['Normal', 'Flying'],
    bs: {hp: 60, at: 110, df: 70, sl: 60, sp: 100},
    weightkg: 85.2,
  },
  Doduo: {
    types: ['Normal', 'Flying'],
    bs: {hp: 35, at: 85, df: 45, sl: 35, sp: 75},
    weightkg: 39.2,
    nfe: true,
  },
  Dragonair: {
    types: ['Dragon'],
    bs: {hp: 61, at: 84, df: 65, sl: 70, sp: 70},
    weightkg: 16.5,
    nfe: true,
  },
  Dragonite: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 91, at: 134, df: 95, sl: 100, sp: 80},
    weightkg: 210,
  },
  Dratini: {
    types: ['Dragon'],
    bs: {hp: 41, at: 64, df: 45, sl: 50, sp: 50},
    weightkg: 3.3,
    nfe: true,
  },
  Drowzee: {
    types: ['Psychic'],
    bs: {hp: 60, at: 48, df: 45, sl: 90, sp: 42},
    weightkg: 32.4,
    nfe: true,
  },
  Dugtrio: {
    types: ['Ground'],
    bs: {hp: 35, at: 80, df: 50, sl: 70, sp: 120},
    weightkg: 33.3,
  },
  Eevee: {
    types: ['Normal'],
    bs: {hp: 55, at: 55, df: 50, sl: 65, sp: 55},
    weightkg: 6.5,
    nfe: true,
  },
  Ekans: {
    types: ['Poison'],
    bs: {hp: 35, at: 60, df: 44, sl: 40, sp: 55},
    weightkg: 6.9,
    nfe: true,
  },
  Electabuzz: {
    types: ['Electric'],
    bs: {hp: 65, at: 83, df: 57, sl: 85, sp: 105},
    weightkg: 30,
  },
  Electrode: {
    types: ['Electric'],
    bs: {hp: 60, at: 50, df: 70, sl: 80, sp: 140},
    weightkg: 66.6,
  },
  Exeggcute: {
    types: ['Grass', 'Psychic'],
    bs: {hp: 60, at: 40, df: 80, sl: 60, sp: 40},
    weightkg: 2.5,
    nfe: true,
  },
  Exeggutor: {
    types: ['Grass', 'Psychic'],
    bs: {hp: 95, at: 95, df: 85, sl: 125, sp: 55},
    weightkg: 120,
  },
  'Farfetch\u2019d': {
    types: ['Normal', 'Flying'],
    bs: {hp: 52, at: 65, df: 55, sl: 58, sp: 60},
    weightkg: 15,
  },
  Fearow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 65, at: 90, df: 65, sl: 61, sp: 100},
    weightkg: 38,
  },
  Flareon: {
    types: ['Fire'],
    bs: {hp: 65, at: 130, df: 60, sl: 110, sp: 65},
    weightkg: 25,
  },
  Gastly: {
    types: ['Ghost', 'Poison'],
    bs: {hp: 30, at: 35, df: 30, sl: 100, sp: 80},
    weightkg: 0.1,
    nfe: true,
  },
  Gengar: {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 60, sl: 130, sp: 110},
    weightkg: 40.5,
  },
  Geodude: {
    types: ['Rock', 'Ground'],
    bs: {hp: 40, at: 80, df: 100, sl: 30, sp: 20},
    weightkg: 20,
    nfe: true,
  },
  Gloom: {
    types: ['Grass', 'Poison'],
    bs: {hp: 60, at: 65, df: 70, sl: 85, sp: 40},
    weightkg: 8.6,
    nfe: true,
  },
  Golbat: {
    types: ['Poison', 'Flying'],
    bs: {hp: 75, at: 80, df: 70, sl: 75, sp: 90},
    weightkg: 55,
  },
  Goldeen: {
    types: ['Water'],
    bs: {hp: 45, at: 67, df: 60, sl: 50, sp: 63},
    weightkg: 15,
    nfe: true,
  },
  Golduck: {
    types: ['Water'],
    bs: {hp: 80, at: 82, df: 78, sl: 80, sp: 85},
    weightkg: 76.6,
  },
  Golem: {
    types: ['Rock', 'Ground'],
    bs: {hp: 80, at: 110, df: 130, sl: 55, sp: 45},
    weightkg: 300,
  },
  Graveler: {
    types: ['Rock', 'Ground'],
    bs: {hp: 55, at: 95, df: 115, sl: 45, sp: 35},
    weightkg: 105,
    nfe: true,
  },
  Grimer: {
    types: ['Poison'],
    bs: {hp: 80, at: 80, df: 50, sl: 40, sp: 25},
    weightkg: 30,
    nfe: true,
  },
  Growlithe: {
    types: ['Fire'],
    bs: {hp: 55, at: 70, df: 45, sl: 50, sp: 60},
    weightkg: 19,
    nfe: true,
  },
  Gyarados: {
    types: ['Water', 'Flying'],
    bs: {hp: 95, at: 125, df: 79, sl: 100, sp: 81},
    weightkg: 235,
  },
  Haunter: {
    types: ['Ghost', 'Poison'],
    bs: {hp: 45, at: 50, df: 45, sl: 115, sp: 95},
    weightkg: 0.1,
    nfe: true,
  },
  Hitmonchan: {
    types: ['Fighting'],
    bs: {hp: 50, at: 105, df: 79, sl: 35, sp: 76},
    weightkg: 50.2,
  },
  Hitmonlee: {
    types: ['Fighting'],
    bs: {hp: 50, at: 120, df: 53, sl: 35, sp: 87},
    weightkg: 49.8,
  },
  Horsea: {
    types: ['Water'],
    bs: {hp: 30, at: 40, df: 70, sl: 70, sp: 60},
    weightkg: 8,
    nfe: true,
  },
  Hypno: {
    types: ['Psychic'],
    bs: {hp: 85, at: 73, df: 70, sl: 115, sp: 67},
    weightkg: 75.6,
  },
  Ivysaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 60, at: 62, df: 63, sl: 80, sp: 60},
    weightkg: 13,
    nfe: true,
  },
  Jigglypuff: {
    types: ['Normal'],
    bs: {hp: 115, at: 45, df: 20, sl: 25, sp: 20},
    weightkg: 5.5,
    nfe: true,
  },
  Jolteon: {
    types: ['Electric'],
    bs: {hp: 65, at: 65, df: 60, sl: 110, sp: 130},
    weightkg: 24.5,
  },
  Jynx: {
    types: ['Ice', 'Psychic'],
    bs: {hp: 65, at: 50, df: 35, sl: 95, sp: 95},
    weightkg: 40.6,
  },
  Kabuto: {
    types: ['Rock', 'Water'],
    bs: {hp: 30, at: 80, df: 90, sl: 45, sp: 55},
    weightkg: 11.5,
    nfe: true,
  },
  Kabutops: {
    types: ['Rock', 'Water'],
    bs: {hp: 60, at: 115, df: 105, sl: 70, sp: 80},
    weightkg: 40.5,
  },
  Kadabra: {
    types: ['Psychic'],
    bs: {hp: 40, at: 35, df: 30, sl: 120, sp: 105},
    weightkg: 56.5,
    nfe: true,
  },
  Kakuna: {
    types: ['Bug', 'Poison'],
    bs: {hp: 45, at: 25, df: 50, sl: 25, sp: 35},
    weightkg: 10,
    nfe: true,
  },
  Kangaskhan: {
    types: ['Normal'],
    bs: {hp: 105, at: 95, df: 80, sl: 40, sp: 90},
    weightkg: 80,
  },
  Kingler: {
    types: ['Water'],
    bs: {hp: 55, at: 130, df: 115, sl: 50, sp: 75},
    weightkg: 60,
  },
  Koffing: {
    types: ['Poison'],
    bs: {hp: 40, at: 65, df: 95, sl: 60, sp: 35},
    weightkg: 1,
    nfe: true,
  },
  Krabby: {
    types: ['Water'],
    bs: {hp: 30, at: 105, df: 90, sl: 25, sp: 50},
    weightkg: 6.5,
    nfe: true,
  },
  Lapras: {
    types: ['Water', 'Ice'],
    bs: {hp: 130, at: 85, df: 80, sl: 95, sp: 60},
    weightkg: 220,
  },
  Lickitung: {
    types: ['Normal'],
    bs: {hp: 90, at: 55, df: 75, sl: 60, sp: 30},
    weightkg: 65.5,
  },
  Machamp: {
    types: ['Fighting'],
    bs: {hp: 90, at: 130, df: 80, sl: 65, sp: 55},
    weightkg: 130,
  },
  Machoke: {
    types: ['Fighting'],
    bs: {hp: 80, at: 100, df: 70, sl: 50, sp: 45},
    weightkg: 70.5,
    nfe: true,
  },
  Machop: {
    types: ['Fighting'],
    bs: {hp: 70, at: 80, df: 50, sl: 35, sp: 35},
    weightkg: 19.5,
    nfe: true,
  },
  Magikarp: {
    types: ['Water'],
    bs: {hp: 20, at: 10, df: 55, sl: 20, sp: 80},
    weightkg: 10,
    nfe: true,
  },
  Magmar: {
    types: ['Fire'],
    bs: {hp: 65, at: 95, df: 57, sl: 85, sp: 93},
    weightkg: 44.5,
  },
  Magnemite: {
    types: ['Electric'],
    bs: {hp: 25, at: 35, df: 70, sl: 95, sp: 45},
    weightkg: 6,
    nfe: true,
  },
  Magneton: {
    types: ['Electric'],
    bs: {hp: 50, at: 60, df: 95, sl: 120, sp: 70},
    weightkg: 60,
  },
  Mankey: {
    types: ['Fighting'],
    bs: {hp: 40, at: 80, df: 35, sl: 35, sp: 70},
    weightkg: 28,
    nfe: true,
  },
  Marowak: {
    types: ['Ground'],
    bs: {hp: 60, at: 80, df: 110, sl: 50, sp: 45},
    weightkg: 45,
  },
  Meowth: {
    types: ['Normal'],
    bs: {hp: 40, at: 45, df: 35, sl: 40, sp: 90},
    weightkg: 4.2,
    nfe: true,
  },
  Metapod: {
    types: ['Bug'],
    bs: {hp: 50, at: 20, df: 55, sl: 25, sp: 30},
    weightkg: 9.9,
    nfe: true,
  },
  Mew: {
    types: ['Psychic'],
    bs: {hp: 100, at: 100, df: 100, sl: 100, sp: 100},
    weightkg: 4,
  },
  Mewtwo: {
    types: ['Psychic'],
    bs: {hp: 106, at: 110, df: 90, sl: 154, sp: 130},
    weightkg: 122,
  },
  Moltres: {
    types: ['Fire', 'Flying'],
    bs: {hp: 90, at: 100, df: 90, sl: 125, sp: 90},
    weightkg: 60,
  },
  'Mr. Mime': {
    types: ['Psychic'],
    bs: {hp: 40, at: 45, df: 65, sl: 100, sp: 90},
    weightkg: 54.5,
  },
  Muk: {
    types: ['Poison'],
    bs: {hp: 105, at: 105, df: 75, sl: 65, sp: 50},
    weightkg: 30,
  },
  Nidoking: {
    types: ['Poison', 'Ground'],
    bs: {hp: 81, at: 92, df: 77, sl: 75, sp: 85},
    weightkg: 62,
  },
  Nidoqueen: {
    types: ['Poison', 'Ground'],
    bs: {hp: 90, at: 82, df: 87, sl: 75, sp: 76},
    weightkg: 60,
  },
  'Nidoran-F': {
    types: ['Poison'],
    bs: {hp: 55, at: 47, df: 52, sl: 40, sp: 41},
    weightkg: 7,
    nfe: true,
  },
  'Nidoran-M': {
    types: ['Poison'],
    bs: {hp: 46, at: 57, df: 40, sl: 40, sp: 50},
    weightkg: 9,
    nfe: true,
  },
  Nidorina: {
    types: ['Poison'],
    bs: {hp: 70, at: 62, df: 67, sl: 55, sp: 56},
    weightkg: 20,
    nfe: true,
  },
  Nidorino: {
    types: ['Poison'],
    bs: {hp: 61, at: 72, df: 57, sl: 55, sp: 65},
    weightkg: 19.5,
    nfe: true,
  },
  Ninetales: {
    types: ['Fire'],
    bs: {hp: 73, at: 76, df: 75, sl: 100, sp: 100},
    weightkg: 19.9,
  },
  Oddish: {
    types: ['Grass', 'Poison'],
    bs: {hp: 45, at: 50, df: 55, sl: 75, sp: 30},
    weightkg: 5.4,
    nfe: true,
  },
  Omanyte: {
    types: ['Rock', 'Water'],
    bs: {hp: 35, at: 40, df: 100, sl: 90, sp: 35},
    weightkg: 7.5,
    nfe: true,
  },
  Omastar: {
    types: ['Rock', 'Water'],
    bs: {hp: 70, at: 60, df: 125, sl: 115, sp: 55},
    weightkg: 35,
  },
  Onix: {
    types: ['Rock', 'Ground'],
    bs: {hp: 35, at: 45, df: 160, sl: 30, sp: 70},
    weightkg: 210,
  },
  Paras: {
    types: ['Bug', 'Grass'],
    bs: {hp: 35, at: 70, df: 55, sl: 55, sp: 25},
    weightkg: 5.4,
    nfe: true,
  },
  Parasect: {
    types: ['Bug', 'Grass'],
    bs: {hp: 60, at: 95, df: 80, sl: 80, sp: 30},
    weightkg: 29.5,
  },
  Persian: {
    types: ['Normal'],
    bs: {hp: 65, at: 70, df: 60, sl: 65, sp: 115},
    weightkg: 32,
  },
  Pidgeot: {
    types: ['Normal', 'Flying'],
    bs: {hp: 83, at: 80, df: 75, sl: 70, sp: 91},
    weightkg: 39.5,
  },
  Pidgeotto: {
    types: ['Normal', 'Flying'],
    bs: {hp: 63, at: 60, df: 55, sl: 50, sp: 71},
    weightkg: 30,
    nfe: true,
  },
  Pidgey: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 45, df: 40, sl: 35, sp: 56},
    weightkg: 1.8,
    nfe: true,
  },
  Pikachu: {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 30, sl: 50, sp: 90},
    weightkg: 6,
    nfe: true,
  },
  Pinsir: {
    types: ['Bug'],
    bs: {hp: 65, at: 125, df: 100, sl: 55, sp: 85},
    weightkg: 55,
  },
  Poliwag: {
    types: ['Water'],
    bs: {hp: 40, at: 50, df: 40, sl: 40, sp: 90},
    weightkg: 12.4,
    nfe: true,
  },
  Poliwhirl: {
    types: ['Water'],
    bs: {hp: 65, at: 65, df: 65, sl: 50, sp: 90},
    weightkg: 20,
    nfe: true,
  },
  Poliwrath: {
    types: ['Water', 'Fighting'],
    bs: {hp: 90, at: 85, df: 95, sl: 70, sp: 70},
    weightkg: 54,
  },
  Ponyta: {
    types: ['Fire'],
    bs: {hp: 50, at: 85, df: 55, sl: 65, sp: 90},
    weightkg: 30,
    nfe: true,
  },
  Porygon: {
    types: ['Normal'],
    bs: {hp: 65, at: 60, df: 70, sl: 75, sp: 40},
    weightkg: 36.5,
  },
  Primeape: {
    types: ['Fighting'],
    bs: {hp: 65, at: 105, df: 60, sl: 60, sp: 95},
    weightkg: 32,
  },
  Psyduck: {
    types: ['Water'],
    bs: {hp: 50, at: 52, df: 48, sl: 50, sp: 55},
    weightkg: 19.6,
    nfe: true,
  },
  Raichu: {
    types: ['Electric'],
    bs: {hp: 60, at: 90, df: 55, sl: 90, sp: 100},
    weightkg: 30,
  },
  Rapidash: {
    types: ['Fire'],
    bs: {hp: 65, at: 100, df: 70, sl: 80, sp: 105},
    weightkg: 95,
  },
  Raticate: {
    types: ['Normal'],
    bs: {hp: 55, at: 81, df: 60, sl: 50, sp: 97},
    weightkg: 18.5,
  },
  Rattata: {
    types: ['Normal'],
    bs: {hp: 30, at: 56, df: 35, sl: 25, sp: 72},
    weightkg: 3.5,
    nfe: true,
  },
  Rhydon: {
    types: ['Ground', 'Rock'],
    bs: {hp: 105, at: 130, df: 120, sl: 45, sp: 40},
    weightkg: 120,
  },
  Rhyhorn: {
    types: ['Ground', 'Rock'],
    bs: {hp: 80, at: 85, df: 95, sl: 30, sp: 25},
    weightkg: 115,
    nfe: true,
  },
  Sandshrew: {
    types: ['Ground'],
    bs: {hp: 50, at: 75, df: 85, sl: 30, sp: 40},
    weightkg: 12,
    nfe: true,
  },
  Sandslash: {
    types: ['Ground'],
    bs: {hp: 75, at: 100, df: 110, sl: 55, sp: 65},
    weightkg: 29.5,
  },
  Scyther: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 110, df: 80, sl: 55, sp: 105},
    weightkg: 56,
  },
  Seadra: {
    types: ['Water'],
    bs: {hp: 55, at: 65, df: 95, sl: 95, sp: 85},
    weightkg: 25,
  },
  Seaking: {
    types: ['Water'],
    bs: {hp: 80, at: 92, df: 65, sl: 80, sp: 68},
    weightkg: 39,
  },
  Seel: {
    types: ['Water'],
    bs: {hp: 65, at: 45, df: 55, sl: 70, sp: 45},
    weightkg: 90,
    nfe: true,
  },
  Shellder: {
    types: ['Water'],
    bs: {hp: 30, at: 65, df: 100, sl: 45, sp: 40},
    weightkg: 4,
    nfe: true,
  },
  Slowbro: {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 110, sl: 80, sp: 30},
    weightkg: 78.5,
  },
  Slowpoke: {
    types: ['Water', 'Psychic'],
    bs: {hp: 90, at: 65, df: 65, sl: 40, sp: 15},
    weightkg: 36,
    nfe: true,
  },
  Snorlax: {
    types: ['Normal'],
    bs: {hp: 160, at: 110, df: 65, sl: 65, sp: 30},
    weightkg: 460,
  },
  Spearow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 60, df: 30, sl: 31, sp: 70},
    weightkg: 2,
    nfe: true,
  },
  Squirtle: {
    types: ['Water'],
    bs: {hp: 44, at: 48, df: 65, sl: 50, sp: 43},
    weightkg: 9,
    nfe: true,
  },
  Starmie: {
    types: ['Water', 'Psychic'],
    bs: {hp: 60, at: 75, df: 85, sl: 100, sp: 115},
    weightkg: 80,
  },
  Staryu: {
    types: ['Water'],
    bs: {hp: 30, at: 45, df: 55, sl: 70, sp: 85},
    weightkg: 34.5,
    nfe: true,
  },
  Tangela: {
    types: ['Grass'],
    bs: {hp: 65, at: 55, df: 115, sl: 100, sp: 60},
    weightkg: 35,
  },
  Tauros: {
    types: ['Normal'],
    bs: {hp: 75, at: 100, df: 95, sl: 70, sp: 110},
    weightkg: 88.4,
  },
  Tentacool: {
    types: ['Water', 'Poison'],
    bs: {hp: 40, at: 40, df: 35, sl: 100, sp: 70},
    weightkg: 45.5,
    nfe: true,
  },
  Tentacruel: {
    types: ['Water', 'Poison'],
    bs: {hp: 80, at: 70, df: 65, sl: 120, sp: 100},
    weightkg: 55,
  },
  Vaporeon: {
    types: ['Water'],
    bs: {hp: 130, at: 65, df: 60, sl: 110, sp: 65},
    weightkg: 29,
  },
  Venomoth: {
    types: ['Bug', 'Poison'],
    bs: {hp: 70, at: 65, df: 60, sl: 90, sp: 90},
    weightkg: 12.5,
  },
  Venonat: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 55, df: 50, sl: 40, sp: 45},
    weightkg: 30,
    nfe: true,
  },
  Venusaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 82, df: 83, sl: 100, sp: 80},
    weightkg: 100,
  },
  Victreebel: {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 105, df: 65, sl: 100, sp: 70},
    weightkg: 15.5,
  },
  Vileplume: {
    types: ['Grass', 'Poison'],
    bs: {hp: 75, at: 80, df: 85, sl: 100, sp: 50},
    weightkg: 18.6,
  },
  Voltorb: {
    types: ['Electric'],
    bs: {hp: 40, at: 30, df: 50, sl: 55, sp: 100},
    weightkg: 10.4,
    nfe: true,
  },
  Vulpix: {
    types: ['Fire'],
    bs: {hp: 38, at: 41, df: 40, sl: 65, sp: 65},
    weightkg: 9.9,
    nfe: true,
  },
  Wartortle: {
    types: ['Water'],
    bs: {hp: 59, at: 63, df: 80, sl: 65, sp: 58},
    weightkg: 22.5,
    nfe: true,
  },
  Weedle: {
    types: ['Bug', 'Poison'],
    bs: {hp: 40, at: 35, df: 30, sl: 20, sp: 50},
    weightkg: 3.2,
    nfe: true,
  },
  Weepinbell: {
    types: ['Grass', 'Poison'],
    bs: {hp: 65, at: 90, df: 50, sl: 85, sp: 55},
    weightkg: 6.4,
    nfe: true,
  },
  Weezing: {
    types: ['Poison'],
    bs: {hp: 65, at: 90, df: 120, sl: 85, sp: 60},
    weightkg: 9.5,
  },
  Wigglytuff: {
    types: ['Normal'],
    bs: {hp: 140, at: 70, df: 45, sl: 50, sp: 45},
    weightkg: 12,
  },
  Zapdos: {
    types: ['Electric', 'Flying'],
    bs: {hp: 90, at: 90, df: 85, sl: 125, sp: 100},
    weightkg: 52.6,
  },
  Zubat: {
    types: ['Poison', 'Flying'],
    bs: {hp: 40, at: 45, df: 35, sl: 40, sp: 55},
    weightkg: 7.5,
    nfe: true,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Abra: {bs: {sa: 105, sd: 55}},
  Aerodactyl: {bs: {sa: 60, sd: 75}},
  Alakazam: {bs: {sa: 135, sd: 85}},
  Arbok: {bs: {sa: 65, sd: 79}},
  Arcanine: {bs: {sa: 100, sd: 80}},
  Articuno: {bs: {sa: 95, sd: 125}, gender: 'N'},
  Beedrill: {bs: {sa: 45, sd: 80}},
  Bellsprout: {bs: {sa: 70, sd: 30}},
  Blastoise: {bs: {sa: 85, sd: 105}},
  Bulbasaur: {bs: {sa: 65, sd: 65}},
  Butterfree: {bs: {sa: 80, sd: 80}},
  Caterpie: {bs: {sa: 20, sd: 20}},
  Chansey: {bs: {sa: 35, sd: 105}, gender: 'F', nfe: true},
  Charizard: {bs: {sa: 109, sd: 85}},
  Charmander: {bs: {sa: 60, sd: 50}},
  Charmeleon: {bs: {sa: 80, sd: 65}},
  Clefable: {bs: {sa: 85, sd: 90}},
  Clefairy: {bs: {sa: 60, sd: 65}},
  Cloyster: {bs: {sa: 85, sd: 45}},
  Cubone: {bs: {sa: 40, sd: 50}},
  Dewgong: {bs: {sa: 70, sd: 95}},
  Diglett: {bs: {sa: 35, sd: 45}},
  Ditto: {bs: {sa: 48, sd: 48}, gender: 'N'},
  Dodrio: {bs: {sa: 60, sd: 60}},
  Doduo: {bs: {sa: 35, sd: 35}},
  Dragonair: {bs: {sa: 70, sd: 70}},
  Dragonite: {bs: {sa: 100, sd: 100}},
  Dratini: {bs: {sa: 50, sd: 50}},
  Drowzee: {bs: {sa: 43, sd: 90}},
  Dugtrio: {bs: {sa: 50, sd: 70}},
  Eevee: {bs: {sa: 45, sd: 65}},
  Ekans: {bs: {sa: 40, sd: 54}},
  Electabuzz: {bs: {sa: 95, sd: 85}},
  Electrode: {bs: {sa: 80, sd: 80}, gender: 'N'},
  Exeggcute: {bs: {sa: 60, sd: 45}},
  Exeggutor: {bs: {sa: 125, sd: 65}},
  'Farfetch\u2019d': {bs: {sa: 58, sd: 62}},
  Fearow: {bs: {sa: 61, sd: 61}},
  Flareon: {bs: {sa: 95, sd: 110}},
  Gastly: {bs: {sa: 100, sd: 35}},
  Gengar: {bs: {sa: 130, sd: 75}},
  Geodude: {bs: {sa: 30, sd: 30}},
  Gloom: {bs: {sa: 85, sd: 75}},
  Golbat: {bs: {sa: 65, sd: 75}, nfe: true},
  Goldeen: {bs: {sa: 35, sd: 50}},
  Golduck: {bs: {sa: 95, sd: 80}},
  Golem: {bs: {sa: 55, sd: 65}},
  Graveler: {bs: {sa: 45, sd: 45}},
  Grimer: {bs: {sa: 40, sd: 50}},
  Growlithe: {bs: {sa: 70, sd: 50}},
  Gyarados: {bs: {sa: 60, sd: 100}},
  Haunter: {bs: {sa: 115, sd: 55}},
  Hitmonchan: {bs: {sa: 35, sd: 110}, gender: 'M'},
  Hitmonlee: {bs: {sa: 35, sd: 110}, gender: 'M'},
  Horsea: {bs: {sa: 70, sd: 25}},
  Hypno: {bs: {sa: 73, sd: 115}},
  Ivysaur: {bs: {sa: 80, sd: 80}},
  Jigglypuff: {bs: {sa: 45, sd: 25}},
  Jolteon: {bs: {sa: 110, sd: 95}},
  Jynx: {bs: {sa: 115, sd: 95}, gender: 'F'},
  Kabuto: {bs: {sa: 55, sd: 45}},
  Kabutops: {bs: {sa: 65, sd: 70}},
  Kadabra: {bs: {sa: 120, sd: 70}},
  Kakuna: {bs: {sa: 25, sd: 25}},
  Kangaskhan: {bs: {sa: 40, sd: 80}, gender: 'F'},
  Kingler: {bs: {sa: 50, sd: 50}},
  Koffing: {bs: {sa: 60, sd: 45}},
  Krabby: {bs: {sa: 25, sd: 25}},
  Lapras: {bs: {sa: 85, sd: 95}},
  Lickitung: {bs: {sa: 60, sd: 75}},
  Machamp: {bs: {sa: 65, sd: 85}},
  Machoke: {bs: {sa: 50, sd: 60}},
  Machop: {bs: {sa: 35, sd: 35}},
  Magikarp: {bs: {sa: 15, sd: 20}},
  Magmar: {bs: {sa: 100, sd: 85}},
  Magnemite: {types: ['Electric', 'Steel'], bs: {sa: 95, sd: 55}, gender: 'N'},
  Magneton: {types: ['Electric', 'Steel'], bs: {sa: 120, sd: 70}, gender: 'N'},
  Mankey: {bs: {sa: 35, sd: 45}},
  Marowak: {bs: {sa: 50, sd: 80}},
  Meowth: {bs: {sa: 40, sd: 40}},
  Metapod: {bs: {sa: 25, sd: 25}},
  Mew: {bs: {sa: 100, sd: 100}, gender: 'N'},
  Mewtwo: {bs: {sa: 154, sd: 90}, gender: 'N'},
  Moltres: {bs: {sa: 125, sd: 85}, gender: 'N'},
  'Mr. Mime': {bs: {sa: 100, sd: 120}},
  Muk: {bs: {sa: 65, sd: 100}},
  Nidoking: {bs: {sa: 85, sd: 75}, gender: 'M'},
  Nidoqueen: {bs: {sa: 75, sd: 85}, gender: 'F'},
  'Nidoran-F': {bs: {sa: 40, sd: 40}, gender: 'F'},
  'Nidoran-M': {bs: {sa: 40, sd: 40}, gender: 'M'},
  Nidorina: {bs: {sa: 55, sd: 55}, gender: 'F'},
  Nidorino: {bs: {sa: 55, sd: 55}, gender: 'M'},
  Ninetales: {bs: {sa: 81, sd: 100}},
  Oddish: {bs: {sa: 75, sd: 65}},
  Omanyte: {bs: {sa: 90, sd: 55}},
  Omastar: {bs: {sa: 115, sd: 70}},
  Onix: {bs: {sa: 30, sd: 45}, nfe: true},
  Paras: {bs: {sa: 45, sd: 55}},
  Parasect: {bs: {sa: 60, sd: 80}},
  Persian: {bs: {sa: 65, sd: 65}},
  Pidgeot: {bs: {sa: 70, sd: 70}},
  Pidgeotto: {bs: {sa: 50, sd: 50}},
  Pidgey: {bs: {sa: 35, sd: 35}},
  Pikachu: {bs: {sa: 50, sd: 40}},
  Pinsir: {bs: {sa: 55, sd: 70}},
  Poliwag: {bs: {sa: 40, sd: 40}},
  Poliwhirl: {bs: {sa: 50, sd: 50}},
  Poliwrath: {bs: {sa: 70, sd: 90}},
  Ponyta: {bs: {sa: 65, sd: 65}},
  Porygon: {bs: {sa: 85, sd: 75}, gender: 'N', nfe: true},
  Primeape: {bs: {sa: 60, sd: 70}},
  Psyduck: {bs: {sa: 65, sd: 50}},
  Raichu: {bs: {sa: 90, sd: 80}},
  Rapidash: {bs: {sa: 80, sd: 80}},
  Raticate: {bs: {sa: 50, sd: 70}},
  Rattata: {bs: {sa: 25, sd: 35}},
  Rhydon: {bs: {sa: 45, sd: 45}},
  Rhyhorn: {bs: {sa: 30, sd: 30}},
  Sandshrew: {bs: {sa: 20, sd: 30}},
  Sandslash: {bs: {sa: 45, sd: 55}},
  Scyther: {bs: {sa: 55, sd: 80}, nfe: true},
  Seadra: {bs: {sa: 95, sd: 45}, nfe: true},
  Seaking: {bs: {sa: 65, sd: 80}},
  Seel: {bs: {sa: 45, sd: 70}},
  Shellder: {bs: {sa: 45, sd: 25}},
  Slowbro: {bs: {sa: 100, sd: 80}},
  Slowpoke: {bs: {sa: 40, sd: 40}},
  Snorlax: {bs: {sa: 65, sd: 110}},
  Spearow: {bs: {sa: 31, sd: 31}},
  Squirtle: {bs: {sa: 50, sd: 64}},
  Starmie: {bs: {sa: 100, sd: 85}, gender: 'N'},
  Staryu: {bs: {sa: 70, sd: 55}, gender: 'N'},
  Tangela: {bs: {sa: 100, sd: 40}},
  Tauros: {bs: {sa: 40, sd: 70}, gender: 'M'},
  Tentacool: {bs: {sa: 50, sd: 100}},
  Tentacruel: {bs: {sa: 80, sd: 120}},
  Vaporeon: {bs: {sa: 110, sd: 95}},
  Venomoth: {bs: {sa: 90, sd: 75}},
  Venonat: {bs: {sa: 40, sd: 55}},
  Venusaur: {bs: {sa: 100, sd: 100}},
  Victreebel: {bs: {sa: 100, sd: 60}},
  Vileplume: {bs: {sa: 100, sd: 90}},
  Voltorb: {bs: {sa: 55, sd: 55}, gender: 'N'},
  Vulpix: {bs: {sa: 50, sd: 65}},
  Wartortle: {bs: {sa: 65, sd: 80}},
  Weedle: {bs: {sa: 20, sd: 20}},
  Weepinbell: {bs: {sa: 85, sd: 45}},
  Weezing: {bs: {sa: 85, sd: 70}},
  Wigglytuff: {bs: {sa: 75, sd: 50}},
  Zapdos: {bs: {sa: 125, sd: 90}, gender: 'N'},
  Zubat: {bs: {sa: 30, sd: 40}},
  // gen 2 pokemon
  Aipom: {
    types: ['Normal'],
    bs: {hp: 55, at: 70, df: 55, sa: 40, sd: 55, sp: 85},
    weightkg: 11.5,
  },
  Ampharos: {
    types: ['Electric'],
    bs: {hp: 90, at: 75, df: 75, sa: 115, sd: 90, sp: 55},
    weightkg: 61.5,
  },
  Ariados: {
    types: ['Bug', 'Poison'],
    bs: {hp: 70, at: 90, df: 70, sa: 60, sd: 60, sp: 40},
    weightkg: 33.5,
  },
  Azumarill: {
    types: ['Water'],
    bs: {hp: 100, at: 50, df: 80, sa: 50, sd: 80, sp: 50},
    weightkg: 28.5,
  },
  Bayleef: {
    types: ['Grass'],
    bs: {hp: 60, at: 62, df: 80, sa: 63, sd: 80, sp: 60},
    weightkg: 15.8,
    nfe: true,
  },
  Bellossom: {
    types: ['Grass'],
    bs: {hp: 75, at: 80, df: 85, sa: 90, sd: 100, sp: 50},
    weightkg: 5.8,
  },
  Blissey: {
    types: ['Normal'],
    bs: {hp: 255, at: 10, df: 10, sa: 75, sd: 135, sp: 55},
    weightkg: 46.8,
    gender: 'F',
  },
  Celebi: {
    types: ['Psychic', 'Grass'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 5,
    gender: 'N',
  },
  Chikorita: {
    types: ['Grass'],
    bs: {hp: 45, at: 49, df: 65, sa: 49, sd: 65, sp: 45},
    weightkg: 6.4,
    nfe: true,
  },
  Chinchou: {
    types: ['Water', 'Electric'],
    bs: {hp: 75, at: 38, df: 38, sa: 56, sd: 56, sp: 67},
    weightkg: 12,
    nfe: true,
  },
  Cleffa: {
    types: ['Normal'],
    bs: {hp: 50, at: 25, df: 28, sa: 45, sd: 55, sp: 15},
    weightkg: 3,
    nfe: true,
  },
  Corsola: {
    types: ['Water', 'Rock'],
    bs: {hp: 55, at: 55, df: 85, sa: 65, sd: 85, sp: 35},
    weightkg: 5,
  },
  Crobat: {
    types: ['Poison', 'Flying'],
    bs: {hp: 85, at: 90, df: 80, sa: 70, sd: 80, sp: 130},
    weightkg: 75,
  },
  Croconaw: {
    types: ['Water'],
    bs: {hp: 65, at: 80, df: 80, sa: 59, sd: 63, sp: 58},
    weightkg: 25,
    nfe: true,
  },
  Cyndaquil: {
    types: ['Fire'],
    bs: {hp: 39, at: 52, df: 43, sa: 60, sd: 50, sp: 65},
    weightkg: 7.9,
    nfe: true,
  },
  Delibird: {
    types: ['Ice', 'Flying'],
    bs: {hp: 45, at: 55, df: 45, sa: 65, sd: 45, sp: 75},
    weightkg: 16,
  },
  Donphan: {
    types: ['Ground'],
    bs: {hp: 90, at: 120, df: 120, sa: 60, sd: 60, sp: 50},
    weightkg: 120,
  },
  Dunsparce: {
    types: ['Normal'],
    bs: {hp: 100, at: 70, df: 70, sa: 65, sd: 65, sp: 45},
    weightkg: 14,
  },
  Elekid: {
    types: ['Electric'],
    bs: {hp: 45, at: 63, df: 37, sa: 65, sd: 55, sp: 95},
    weightkg: 23.5,
    nfe: true,
  },
  Entei: {
    types: ['Fire'],
    bs: {hp: 115, at: 115, df: 85, sa: 90, sd: 75, sp: 100},
    weightkg: 198,
    gender: 'N',
  },
  Espeon: {
    types: ['Psychic'],
    bs: {hp: 65, at: 65, df: 60, sa: 130, sd: 95, sp: 110},
    weightkg: 26.5,
  },
  Feraligatr: {
    types: ['Water'],
    bs: {hp: 85, at: 105, df: 100, sa: 79, sd: 83, sp: 78},
    weightkg: 88.8,
  },
  Flaaffy: {
    types: ['Electric'],
    bs: {hp: 70, at: 55, df: 55, sa: 80, sd: 60, sp: 45},
    weightkg: 13.3,
    nfe: true,
  },
  Forretress: {
    types: ['Bug', 'Steel'],
    bs: {hp: 75, at: 90, df: 140, sa: 60, sd: 60, sp: 40},
    weightkg: 125.8,
  },
  Furret: {
    types: ['Normal'],
    bs: {hp: 85, at: 76, df: 64, sa: 45, sd: 55, sp: 90},
    weightkg: 32.5,
  },
  Girafarig: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 70, at: 80, df: 65, sa: 90, sd: 65, sp: 85},
    weightkg: 41.5,
  },
  Gligar: {
    types: ['Ground', 'Flying'],
    bs: {hp: 65, at: 75, df: 105, sa: 35, sd: 65, sp: 85},
    weightkg: 64.8,
  },
  Granbull: {
    types: ['Normal'],
    bs: {hp: 90, at: 120, df: 75, sa: 60, sd: 60, sp: 45},
    weightkg: 48.7,
  },
  Heracross: {
    types: ['Bug', 'Fighting'],
    bs: {hp: 80, at: 125, df: 75, sa: 40, sd: 95, sp: 85},
    weightkg: 54,
  },
  Hitmontop: {
    types: ['Fighting'],
    bs: {hp: 50, at: 95, df: 95, sa: 35, sd: 110, sp: 70},
    weightkg: 48,
    gender: 'M',
  },
  'Ho-Oh': {
    types: ['Fire', 'Flying'],
    bs: {hp: 106, at: 130, df: 90, sa: 110, sd: 154, sp: 90},
    weightkg: 199,
    gender: 'N',
  },
  Hoothoot: {
    types: ['Normal', 'Flying'],
    bs: {hp: 60, at: 30, df: 30, sa: 36, sd: 56, sp: 50},
    weightkg: 21.2,
    nfe: true,
  },
  Hoppip: {
    types: ['Grass', 'Flying'],
    bs: {hp: 35, at: 35, df: 40, sa: 35, sd: 55, sp: 50},
    weightkg: 0.5,
    nfe: true,
  },
  Houndoom: {
    types: ['Dark', 'Fire'],
    bs: {hp: 75, at: 90, df: 50, sa: 110, sd: 80, sp: 95},
    weightkg: 35,
  },
  Houndour: {
    types: ['Dark', 'Fire'],
    bs: {hp: 45, at: 60, df: 30, sa: 80, sd: 50, sp: 65},
    weightkg: 10.8,
    nfe: true,
  },
  Igglybuff: {
    types: ['Normal'],
    bs: {hp: 90, at: 30, df: 15, sa: 40, sd: 20, sp: 15},
    weightkg: 1,
    nfe: true,
  },
  Jumpluff: {
    types: ['Grass', 'Flying'],
    bs: {hp: 75, at: 55, df: 70, sa: 55, sd: 85, sp: 110},
    weightkg: 3,
  },
  Kingdra: {
    types: ['Water', 'Dragon'],
    bs: {hp: 75, at: 95, df: 95, sa: 95, sd: 95, sp: 85},
    weightkg: 152,
  },
  Lanturn: {
    types: ['Water', 'Electric'],
    bs: {hp: 125, at: 58, df: 58, sa: 76, sd: 76, sp: 67},
    weightkg: 22.5,
  },
  Larvitar: {
    types: ['Rock', 'Ground'],
    bs: {hp: 50, at: 64, df: 50, sa: 45, sd: 50, sp: 41},
    weightkg: 72,
    nfe: true,
  },
  Ledian: {
    types: ['Bug', 'Flying'],
    bs: {hp: 55, at: 35, df: 50, sa: 55, sd: 110, sp: 85},
    weightkg: 35.6,
  },
  Ledyba: {
    types: ['Bug', 'Flying'],
    bs: {hp: 40, at: 20, df: 30, sa: 40, sd: 80, sp: 55},
    weightkg: 10.8,
    nfe: true,
  },
  Lugia: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 106, at: 90, df: 130, sa: 90, sd: 154, sp: 110},
    weightkg: 216,
    gender: 'N',
  },
  Magby: {
    types: ['Fire'],
    bs: {hp: 45, at: 75, df: 37, sa: 70, sd: 55, sp: 83},
    weightkg: 21.4,
    nfe: true,
  },
  Magcargo: {
    types: ['Fire', 'Rock'],
    bs: {hp: 50, at: 50, df: 120, sa: 80, sd: 80, sp: 30},
    weightkg: 55,
  },
  Mantine: {
    types: ['Water', 'Flying'],
    bs: {hp: 65, at: 40, df: 70, sa: 80, sd: 140, sp: 70},
    weightkg: 220,
  },
  Mareep: {
    types: ['Electric'],
    bs: {hp: 55, at: 40, df: 40, sa: 65, sd: 45, sp: 35},
    weightkg: 7.8,
    nfe: true,
  },
  Marill: {
    types: ['Water'],
    bs: {hp: 70, at: 20, df: 50, sa: 20, sd: 50, sp: 40},
    weightkg: 8.5,
    nfe: true,
  },
  Meganium: {
    types: ['Grass'],
    bs: {hp: 80, at: 82, df: 100, sa: 83, sd: 100, sp: 80},
    weightkg: 100.5,
  },
  Miltank: {
    types: ['Normal'],
    bs: {hp: 95, at: 80, df: 105, sa: 40, sd: 70, sp: 100},
    weightkg: 75.5,
    gender: 'F',
  },
  Misdreavus: {
    types: ['Ghost'],
    bs: {hp: 60, at: 60, df: 60, sa: 85, sd: 85, sp: 85},
    weightkg: 1,
  },
  Murkrow: {
    types: ['Dark', 'Flying'],
    bs: {hp: 60, at: 85, df: 42, sa: 85, sd: 42, sp: 91},
    weightkg: 2.1,
  },
  Natu: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 40, at: 50, df: 45, sa: 70, sd: 45, sp: 70},
    weightkg: 2,
    nfe: true,
  },
  Noctowl: {
    types: ['Normal', 'Flying'],
    bs: {hp: 100, at: 50, df: 50, sa: 76, sd: 96, sp: 70},
    weightkg: 40.8,
  },
  Octillery: {
    types: ['Water'],
    bs: {hp: 75, at: 105, df: 75, sa: 105, sd: 75, sp: 45},
    weightkg: 28.5,
  },
  Phanpy: {
    types: ['Ground'],
    bs: {hp: 90, at: 60, df: 60, sa: 40, sd: 40, sp: 40},
    weightkg: 33.5,
    nfe: true,
  },
  Pichu: {
    types: ['Electric'],
    bs: {hp: 20, at: 40, df: 15, sa: 35, sd: 35, sp: 60},
    weightkg: 2,
    nfe: true,
  },
  Piloswine: {
    types: ['Ice', 'Ground'],
    bs: {hp: 100, at: 100, df: 80, sa: 60, sd: 60, sp: 50},
    weightkg: 55.8,
  },
  Pineco: {
    types: ['Bug'],
    bs: {hp: 50, at: 65, df: 90, sa: 35, sd: 35, sp: 15},
    weightkg: 7.2,
    nfe: true,
  },
  Politoed: {
    types: ['Water'],
    bs: {hp: 90, at: 75, df: 75, sa: 90, sd: 100, sp: 70},
    weightkg: 33.9,
  },
  Porygon2: {
    types: ['Normal'],
    bs: {hp: 85, at: 80, df: 90, sa: 105, sd: 95, sp: 60},
    weightkg: 32.5,
    gender: 'N',
  },
  Pupitar: {
    types: ['Rock', 'Ground'],
    bs: {hp: 70, at: 84, df: 70, sa: 65, sd: 70, sp: 51},
    weightkg: 152,
    nfe: true,
  },
  Quagsire: {
    types: ['Water', 'Ground'],
    bs: {hp: 95, at: 85, df: 85, sa: 65, sd: 65, sp: 35},
    weightkg: 75,
  },
  Quilava: {
    types: ['Fire'],
    bs: {hp: 58, at: 64, df: 58, sa: 80, sd: 65, sp: 80},
    weightkg: 19,
    nfe: true,
  },
  Qwilfish: {
    types: ['Water', 'Poison'],
    bs: {hp: 65, at: 95, df: 75, sa: 55, sd: 55, sp: 85},
    weightkg: 3.9,
  },
  Raikou: {
    types: ['Electric'],
    bs: {hp: 90, at: 85, df: 75, sa: 115, sd: 100, sp: 115},
    weightkg: 178,
    gender: 'N',
  },
  Remoraid: {
    types: ['Water'],
    bs: {hp: 35, at: 65, df: 35, sa: 65, sd: 35, sp: 65},
    weightkg: 12,
    nfe: true,
  },
  Scizor: {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 130, df: 100, sa: 55, sd: 80, sp: 65},
    weightkg: 118,
  },
  Sentret: {
    types: ['Normal'],
    bs: {hp: 35, at: 46, df: 34, sa: 35, sd: 45, sp: 20},
    weightkg: 6,
    nfe: true,
  },
  Shuckle: {
    types: ['Bug', 'Rock'],
    bs: {hp: 20, at: 10, df: 230, sa: 10, sd: 230, sp: 5},
    weightkg: 20.5,
  },
  Skarmory: {
    types: ['Steel', 'Flying'],
    bs: {hp: 65, at: 80, df: 140, sa: 40, sd: 70, sp: 70},
    weightkg: 50.5,
  },
  Skiploom: {
    types: ['Grass', 'Flying'],
    bs: {hp: 55, at: 45, df: 50, sa: 45, sd: 65, sp: 80},
    weightkg: 1,
    nfe: true,
  },
  Slowking: {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 80, sa: 100, sd: 110, sp: 30},
    weightkg: 79.5,
  },
  Slugma: {
    types: ['Fire'],
    bs: {hp: 40, at: 40, df: 40, sa: 70, sd: 40, sp: 20},
    weightkg: 35,
    nfe: true,
  },
  Smeargle: {
    types: ['Normal'],
    bs: {hp: 55, at: 20, df: 35, sa: 20, sd: 45, sp: 75},
    weightkg: 58,
  },
  Smoochum: {
    types: ['Ice', 'Psychic'],
    bs: {hp: 45, at: 30, df: 15, sa: 85, sd: 65, sp: 65},
    weightkg: 6,
    gender: 'F',
    nfe: true,
  },
  Sneasel: {
    types: ['Dark', 'Ice'],
    bs: {hp: 55, at: 95, df: 55, sa: 35, sd: 75, sp: 115},
    weightkg: 28,
  },
  Snubbull: {
    types: ['Normal'],
    bs: {hp: 60, at: 80, df: 50, sa: 40, sd: 40, sp: 30},
    weightkg: 7.8,
    nfe: true,
  },
  Spinarak: {
    types: ['Bug', 'Poison'],
    bs: {hp: 40, at: 60, df: 40, sa: 40, sd: 40, sp: 30},
    weightkg: 8.5,
    nfe: true,
  },
  Stantler: {
    types: ['Normal'],
    bs: {hp: 73, at: 95, df: 62, sa: 85, sd: 65, sp: 85},
    weightkg: 71.2,
  },
  Steelix: {
    types: ['Steel', 'Ground'],
    bs: {hp: 75, at: 85, df: 200, sa: 55, sd: 65, sp: 30},
    weightkg: 400,
  },
  Sudowoodo: {
    types: ['Rock'],
    bs: {hp: 70, at: 100, df: 115, sa: 30, sd: 65, sp: 30},
    weightkg: 38,
  },
  Suicune: {
    types: ['Water'],
    bs: {hp: 100, at: 75, df: 115, sa: 90, sd: 115, sp: 85},
    weightkg: 187,
    gender: 'N',
  },
  Sunflora: {
    types: ['Grass'],
    bs: {hp: 75, at: 75, df: 55, sa: 105, sd: 85, sp: 30},
    weightkg: 8.5,
  },
  Sunkern: {
    types: ['Grass'],
    bs: {hp: 30, at: 30, df: 30, sa: 30, sd: 30, sp: 30},
    weightkg: 1.8,
    nfe: true,
  },
  Swinub: {
    types: ['Ice', 'Ground'],
    bs: {hp: 50, at: 50, df: 40, sa: 30, sd: 30, sp: 50},
    weightkg: 6.5,
    nfe: true,
  },
  Teddiursa: {
    types: ['Normal'],
    bs: {hp: 60, at: 80, df: 50, sa: 50, sd: 50, sp: 40},
    weightkg: 8.8,
    nfe: true,
  },
  Togepi: {
    types: ['Normal'],
    bs: {hp: 35, at: 20, df: 65, sa: 40, sd: 65, sp: 20},
    weightkg: 1.5,
    nfe: true,
  },
  Togetic: {
    types: ['Normal', 'Flying'],
    bs: {hp: 55, at: 40, df: 85, sa: 80, sd: 105, sp: 40},
    weightkg: 3.2,
  },
  Totodile: {
    types: ['Water'],
    bs: {hp: 50, at: 65, df: 64, sa: 44, sd: 48, sp: 43},
    weightkg: 9.5,
    nfe: true,
  },
  Typhlosion: {
    types: ['Fire'],
    bs: {hp: 78, at: 84, df: 78, sa: 109, sd: 85, sp: 100},
    weightkg: 79.5,
  },
  Tyranitar: {
    types: ['Rock', 'Dark'],
    bs: {hp: 100, at: 134, df: 110, sa: 95, sd: 100, sp: 61},
    weightkg: 202,
  },
  Tyrogue: {
    types: ['Fighting'],
    bs: {hp: 35, at: 35, df: 35, sa: 35, sd: 35, sp: 35},
    weightkg: 21,
    gender: 'M',
    nfe: true,
  },
  Umbreon: {
    types: ['Dark'],
    bs: {hp: 95, at: 65, df: 110, sa: 60, sd: 130, sp: 65},
    weightkg: 27,
  },
  Unown: {
    types: ['Psychic'],
    bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
    weightkg: 5,
    gender: 'N',
  },
  Ursaring: {
    types: ['Normal'],
    bs: {hp: 90, at: 130, df: 75, sa: 75, sd: 75, sp: 55},
    weightkg: 125.8,
  },
  Wobbuffet: {
    types: ['Psychic'],
    bs: {hp: 190, at: 33, df: 58, sa: 33, sd: 58, sp: 33},
    weightkg: 28.5,
  },
  Wooper: {
    types: ['Water', 'Ground'],
    bs: {hp: 55, at: 45, df: 45, sa: 25, sd: 25, sp: 15},
    weightkg: 8.5,
    nfe: true,
  },
  Xatu: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 65, at: 75, df: 70, sa: 95, sd: 70, sp: 95},
    weightkg: 15,
  },
  Yanma: {
    types: ['Bug', 'Flying'],
    bs: {hp: 65, at: 65, df: 45, sa: 75, sd: 45, sp: 95},
    weightkg: 38,
  },
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Abra: {abilities: {0: 'Synchronize'}},
  Aerodactyl: {abilities: {0: 'Rock Head'}},
  Alakazam: {abilities: {0: 'Synchronize'}},
  Arbok: {abilities: {0: 'Intimidate'}},
  Arcanine: {abilities: {0: 'Intimidate'}},
  Articuno: {abilities: {0: 'Pressure'}},
  Beedrill: {abilities: {0: 'Swarm'}},
  Bellsprout: {abilities: {0: 'Chlorophyll'}},
  Blastoise: {abilities: {0: 'Torrent'}},
  Bulbasaur: {abilities: {0: 'Overgrow'}},
  Butterfree: {abilities: {0: 'Compound Eyes'}},
  Caterpie: {abilities: {0: 'Shield Dust'}},
  Chansey: {abilities: {0: 'Natural Cure'}},
  Charizard: {abilities: {0: 'Blaze'}},
  Charmander: {abilities: {0: 'Blaze'}},
  Charmeleon: {abilities: {0: 'Blaze'}},
  Clefable: {abilities: {0: 'Cute Charm'}},
  Clefairy: {abilities: {0: 'Cute Charm'}},
  Cloyster: {abilities: {0: 'Shell Armor'}},
  Cubone: {abilities: {0: 'Rock Head'}},
  Dewgong: {abilities: {0: 'Thick Fat'}},
  Diglett: {abilities: {0: 'Sand Veil'}},
  Ditto: {abilities: {0: 'Limber'}},
  Dodrio: {abilities: {0: 'Run Away'}},
  Doduo: {abilities: {0: 'Run Away'}},
  Dragonair: {abilities: {0: 'Shed Skin'}},
  Dragonite: {abilities: {0: 'Inner Focus'}},
  Dratini: {abilities: {0: 'Shed Skin'}},
  Drowzee: {abilities: {0: 'Insomnia'}},
  Dugtrio: {abilities: {0: 'Sand Veil'}},
  Eevee: {abilities: {0: 'Run Away'}},
  Ekans: {abilities: {0: 'Intimidate'}},
  Electabuzz: {abilities: {0: 'Static'}},
  Electrode: {abilities: {0: 'Soundproof'}},
  Exeggcute: {abilities: {0: 'Chlorophyll'}},
  Exeggutor: {abilities: {0: 'Chlorophyll'}},
  'Farfetch\u2019d': {abilities: {0: 'Keen Eye'}},
  Fearow: {abilities: {0: 'Keen Eye'}},
  Flareon: {abilities: {0: 'Flash Fire'}},
  Gastly: {abilities: {0: 'Levitate'}},
  Gengar: {abilities: {0: 'Levitate'}},
  Geodude: {abilities: {0: 'Rock Head'}},
  Gloom: {abilities: {0: 'Chlorophyll'}},
  Golbat: {abilities: {0: 'Inner Focus'}},
  Goldeen: {abilities: {0: 'Swift Swim'}},
  Golduck: {abilities: {0: 'Damp'}},
  Golem: {abilities: {0: 'Rock Head'}},
  Graveler: {abilities: {0: 'Rock Head'}},
  Grimer: {abilities: {0: 'Stench'}},
  Growlithe: {abilities: {0: 'Intimidate'}},
  Gyarados: {abilities: {0: 'Intimidate'}},
  Haunter: {abilities: {0: 'Levitate'}},
  Hitmonchan: {abilities: {0: 'Keen Eye'}},
  Hitmonlee: {abilities: {0: 'Limber'}},
  Horsea: {abilities: {0: 'Swift Swim'}},
  Hypno: {abilities: {0: 'Insomnia'}},
  Ivysaur: {abilities: {0: 'Overgrow'}},
  Jigglypuff: {abilities: {0: 'Cute Charm'}},
  Jolteon: {abilities: {0: 'Volt Absorb'}},
  Jynx: {abilities: {0: 'Oblivious'}},
  Kabuto: {abilities: {0: 'Swift Swim'}},
  Kabutops: {abilities: {0: 'Swift Swim'}},
  Kadabra: {abilities: {0: 'Synchronize'}},
  Kakuna: {abilities: {0: 'Shed Skin'}},
  Kangaskhan: {abilities: {0: 'Early Bird'}},
  Kingler: {abilities: {0: 'Hyper Cutter'}},
  Koffing: {abilities: {0: 'Levitate'}},
  Krabby: {abilities: {0: 'Hyper Cutter'}},
  Lapras: {abilities: {0: 'Water Absorb'}},
  Lickitung: {abilities: {0: 'Own Tempo'}},
  Machamp: {abilities: {0: 'Guts'}},
  Machoke: {abilities: {0: 'Guts'}},
  Machop: {abilities: {0: 'Guts'}},
  Magikarp: {abilities: {0: 'Swift Swim'}},
  Magmar: {abilities: {0: 'Flame Body'}},
  Magnemite: {abilities: {0: 'Magnet Pull'}},
  Magneton: {abilities: {0: 'Magnet Pull'}},
  Mankey: {abilities: {0: 'Vital Spirit'}},
  Marowak: {abilities: {0: 'Rock Head'}},
  Meowth: {abilities: {0: 'Pickup'}},
  Metapod: {abilities: {0: 'Shed Skin'}},
  Mew: {abilities: {0: 'Synchronize'}},
  Mewtwo: {abilities: {0: 'Pressure'}},
  Moltres: {abilities: {0: 'Pressure'}},
  'Mr. Mime': {abilities: {0: 'Soundproof'}},
  Muk: {abilities: {0: 'Stench'}},
  Nidoking: {abilities: {0: 'Poison Point'}},
  Nidoqueen: {abilities: {0: 'Poison Point'}},
  'Nidoran-F': {abilities: {0: 'Poison Point'}},
  'Nidoran-M': {abilities: {0: 'Poison Point'}},
  Nidorina: {abilities: {0: 'Poison Point'}},
  Nidorino: {abilities: {0: 'Poison Point'}},
  Ninetales: {abilities: {0: 'Flash Fire'}},
  Oddish: {abilities: {0: 'Chlorophyll'}},
  Omanyte: {abilities: {0: 'Swift Swim'}},
  Omastar: {abilities: {0: 'Swift Swim'}},
  Onix: {abilities: {0: 'Rock Head'}},
  Paras: {abilities: {0: 'Effect Spore'}},
  Parasect: {abilities: {0: 'Effect Spore'}},
  Persian: {abilities: {0: 'Limber'}},
  Pidgeot: {abilities: {0: 'Keen Eye'}},
  Pidgeotto: {abilities: {0: 'Keen Eye'}},
  Pidgey: {abilities: {0: 'Keen Eye'}},
  Pikachu: {abilities: {0: 'Static'}},
  Pinsir: {abilities: {0: 'Hyper Cutter'}},
  Poliwag: {abilities: {0: 'Water Absorb'}},
  Poliwhirl: {abilities: {0: 'Water Absorb'}},
  Poliwrath: {abilities: {0: 'Water Absorb'}},
  Ponyta: {abilities: {0: 'Run Away'}},
  Porygon: {abilities: {0: 'Trace'}},
  Primeape: {abilities: {0: 'Vital Spirit'}},
  Psyduck: {abilities: {0: 'Damp'}},
  Raichu: {abilities: {0: 'Static'}},
  Rapidash: {abilities: {0: 'Run Away'}},
  Raticate: {abilities: {0: 'Run Away'}},
  Rattata: {abilities: {0: 'Run Away'}},
  Rhydon: {abilities: {0: 'Lightning Rod'}},
  Rhyhorn: {abilities: {0: 'Lightning Rod'}},
  Sandshrew: {abilities: {0: 'Sand Veil'}},
  Sandslash: {abilities: {0: 'Sand Veil'}},
  Scyther: {abilities: {0: 'Swarm'}},
  Seadra: {abilities: {0: 'Poison Point'}},
  Seaking: {abilities: {0: 'Swift Swim'}},
  Seel: {abilities: {0: 'Thick Fat'}},
  Shellder: {abilities: {0: 'Shell Armor'}},
  Slowbro: {abilities: {0: 'Oblivious'}},
  Slowpoke: {abilities: {0: 'Oblivious'}},
  Snorlax: {abilities: {0: 'Immunity'}},
  Spearow: {abilities: {0: 'Keen Eye'}},
  Squirtle: {abilities: {0: 'Torrent'}},
  Starmie: {abilities: {0: 'Illuminate'}},
  Staryu: {abilities: {0: 'Illuminate'}},
  Tangela: {abilities: {0: 'Chlorophyll'}},
  Tauros: {abilities: {0: 'Intimidate'}},
  Tentacool: {abilities: {0: 'Clear Body'}},
  Tentacruel: {abilities: {0: 'Clear Body'}},
  Vaporeon: {abilities: {0: 'Water Absorb'}},
  Venomoth: {abilities: {0: 'Shield Dust'}},
  Venonat: {abilities: {0: 'Compound Eyes'}},
  Venusaur: {abilities: {0: 'Overgrow'}},
  Victreebel: {abilities: {0: 'Chlorophyll'}},
  Vileplume: {abilities: {0: 'Chlorophyll'}},
  Voltorb: {abilities: {0: 'Soundproof'}},
  Vulpix: {abilities: {0: 'Flash Fire'}},
  Wartortle: {abilities: {0: 'Torrent'}},
  Weedle: {abilities: {0: 'Shield Dust'}},
  Weepinbell: {abilities: {0: 'Chlorophyll'}},
  Weezing: {abilities: {0: 'Levitate'}},
  Wigglytuff: {abilities: {0: 'Cute Charm'}},
  Zapdos: {abilities: {0: 'Pressure'}},
  Zubat: {abilities: {0: 'Inner Focus'}},
  // gen 2 pokemon changes
  Aipom: {abilities: {0: 'Run Away'}},
  Ampharos: {abilities: {0: 'Static'}},
  Ariados: {abilities: {0: 'Swarm'}},
  Azumarill: {abilities: {0: 'Thick Fat'}},
  Bayleef: {abilities: {0: 'Overgrow'}},
  Bellossom: {abilities: {0: 'Chlorophyll'}},
  Blissey: {abilities: {0: 'Natural Cure'}},
  Celebi: {abilities: {0: 'Natural Cure'}},
  Chikorita: {abilities: {0: 'Overgrow'}},
  Chinchou: {abilities: {0: 'Volt Absorb'}},
  Cleffa: {abilities: {0: 'Cute Charm'}},
  Corsola: {abilities: {0: 'Hustle'}},
  Crobat: {abilities: {0: 'Inner Focus'}},
  Croconaw: {abilities: {0: 'Torrent'}},
  Cyndaquil: {abilities: {0: 'Blaze'}},
  Delibird: {abilities: {0: 'Vital Spirit'}},
  Donphan: {abilities: {0: 'Sturdy'}},
  Dunsparce: {abilities: {0: 'Serene Grace'}},
  Elekid: {abilities: {0: 'Static'}},
  Entei: {abilities: {0: 'Pressure'}},
  Espeon: {abilities: {0: 'Synchronize'}},
  Feraligatr: {abilities: {0: 'Torrent'}},
  Flaaffy: {abilities: {0: 'Static'}},
  Forretress: {abilities: {0: 'Sturdy'}},
  Furret: {abilities: {0: 'Run Away'}},
  Girafarig: {abilities: {0: 'Inner Focus'}},
  Gligar: {abilities: {0: 'Hyper Cutter'}},
  Granbull: {abilities: {0: 'Intimidate'}},
  Heracross: {abilities: {0: 'Swarm'}},
  Hitmontop: {abilities: {0: 'Intimidate'}},
  'Ho-Oh': {abilities: {0: 'Pressure'}},
  Hoothoot: {abilities: {0: 'Insomnia'}},
  Hoppip: {abilities: {0: 'Chlorophyll'}},
  Houndoom: {abilities: {0: 'Early Bird'}},
  Houndour: {abilities: {0: 'Early Bird'}},
  Igglybuff: {abilities: {0: 'Cute Charm'}},
  Jumpluff: {abilities: {0: 'Chlorophyll'}},
  Kingdra: {abilities: {0: 'Swift Swim'}},
  Lanturn: {abilities: {0: 'Volt Absorb'}},
  Larvitar: {abilities: {0: 'Guts'}},
  Ledian: {abilities: {0: 'Swarm'}},
  Ledyba: {abilities: {0: 'Swarm'}},
  Lugia: {abilities: {0: 'Pressure'}},
  Magby: {abilities: {0: 'Flame Body'}},
  Magcargo: {abilities: {0: 'Magma Armor'}},
  Mantine: {abilities: {0: 'Swift Swim'}},
  Mareep: {abilities: {0: 'Static'}},
  Marill: {abilities: {0: 'Thick Fat'}},
  Meganium: {abilities: {0: 'Overgrow'}},
  Miltank: {abilities: {0: 'Thick Fat'}},
  Misdreavus: {abilities: {0: 'Levitate'}},
  Murkrow: {abilities: {0: 'Insomnia'}},
  Natu: {abilities: {0: 'Synchronize'}},
  Noctowl: {abilities: {0: 'Insomnia'}},
  Octillery: {abilities: {0: 'Suction Cups'}},
  Phanpy: {abilities: {0: 'Pickup'}},
  Pichu: {abilities: {0: 'Static'}},
  Piloswine: {abilities: {0: 'Oblivious'}},
  Pineco: {abilities: {0: 'Sturdy'}},
  Politoed: {abilities: {0: 'Water Absorb'}},
  Porygon2: {abilities: {0: 'Trace'}},
  Pupitar: {abilities: {0: 'Shed Skin'}},
  Quagsire: {abilities: {0: 'Damp'}},
  Quilava: {abilities: {0: 'Blaze'}},
  Qwilfish: {abilities: {0: 'Poison Point'}},
  Raikou: {abilities: {0: 'Pressure'}},
  Remoraid: {abilities: {0: 'Hustle'}},
  Scizor: {abilities: {0: 'Swarm'}},
  Sentret: {abilities: {0: 'Run Away'}},
  Shuckle: {abilities: {0: 'Sturdy'}},
  Skarmory: {abilities: {0: 'Keen Eye'}},
  Skiploom: {abilities: {0: 'Chlorophyll'}},
  Slowking: {abilities: {0: 'Oblivious'}},
  Slugma: {abilities: {0: 'Magma Armor'}},
  Smeargle: {abilities: {0: 'Own Tempo'}},
  Smoochum: {abilities: {0: 'Oblivious'}},
  Sneasel: {abilities: {0: 'Inner Focus'}},
  Snubbull: {abilities: {0: 'Intimidate'}},
  Spinarak: {abilities: {0: 'Swarm'}},
  Stantler: {abilities: {0: 'Intimidate'}},
  Steelix: {abilities: {0: 'Rock Head'}},
  Sudowoodo: {abilities: {0: 'Sturdy'}},
  Suicune: {abilities: {0: 'Pressure'}},
  Sunflora: {abilities: {0: 'Chlorophyll'}},
  Sunkern: {abilities: {0: 'Chlorophyll'}},
  Swinub: {abilities: {0: 'Oblivious'}},
  Teddiursa: {abilities: {0: 'Pickup'}},
  Togepi: {abilities: {0: 'Hustle'}},
  Togetic: {abilities: {0: 'Hustle'}},
  Totodile: {abilities: {0: 'Torrent'}},
  Typhlosion: {abilities: {0: 'Blaze'}},
  Tyranitar: {abilities: {0: 'Sand Stream'}},
  Tyrogue: {abilities: {0: 'Guts'}},
  Umbreon: {abilities: {0: 'Synchronize'}},
  Unown: {abilities: {0: 'Levitate'}},
  Ursaring: {abilities: {0: 'Guts'}},
  Wobbuffet: {abilities: {0: 'Shadow Tag'}},
  Wooper: {abilities: {0: 'Damp'}},
  Xatu: {abilities: {0: 'Synchronize'}},
  Yanma: {abilities: {0: 'Speed Boost'}},
  // gen 3 pokemon
  Absol: {
    types: ['Dark'],
    bs: {hp: 65, at: 130, df: 60, sa: 75, sd: 60, sp: 75},
    weightkg: 47,
    abilities: {0: 'Pressure'},
  },
  Aggron: {
    types: ['Steel', 'Rock'],
    bs: {hp: 70, at: 110, df: 180, sa: 60, sd: 60, sp: 50},
    weightkg: 360,
    abilities: {0: 'Sturdy'},
  },
  Altaria: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 75, at: 70, df: 90, sa: 70, sd: 105, sp: 80},
    weightkg: 20.6,
    abilities: {0: 'Natural Cure'},
  },
  Anorith: {
    types: ['Rock', 'Bug'],
    bs: {hp: 45, at: 95, df: 50, sa: 40, sd: 50, sp: 75},
    weightkg: 12.5,
    nfe: true,
    abilities: {0: 'Battle Armor'},
  },
  Armaldo: {
    types: ['Rock', 'Bug'],
    bs: {hp: 75, at: 125, df: 100, sa: 70, sd: 80, sp: 45},
    weightkg: 68.2,
    abilities: {0: 'Battle Armor'},
  },
  Aron: {
    types: ['Steel', 'Rock'],
    bs: {hp: 50, at: 70, df: 100, sa: 40, sd: 40, sp: 30},
    weightkg: 60,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Azurill: {
    types: ['Normal'],
    bs: {hp: 50, at: 20, df: 40, sa: 20, sd: 40, sp: 20},
    weightkg: 2,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Bagon: {
    types: ['Dragon'],
    bs: {hp: 45, at: 75, df: 60, sa: 40, sd: 30, sp: 50},
    weightkg: 42.1,
    nfe: true,
    abilities: {0: 'Rock Head'},
  },
  Baltoy: {
    types: ['Ground', 'Psychic'],
    bs: {hp: 40, at: 40, df: 55, sa: 40, sd: 70, sp: 55},
    weightkg: 21.5,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Banette: {
    types: ['Ghost'],
    bs: {hp: 64, at: 115, df: 65, sa: 83, sd: 63, sp: 65},
    weightkg: 12.5,
    abilities: {0: 'Insomnia'},
  },
  Barboach: {
    types: ['Water', 'Ground'],
    bs: {hp: 50, at: 48, df: 43, sa: 46, sd: 41, sp: 60},
    weightkg: 1.9,
    nfe: true,
    abilities: {0: 'Oblivious'},
  },
  Beautifly: {
    types: ['Bug', 'Flying'],
    bs: {hp: 60, at: 70, df: 50, sa: 90, sd: 50, sp: 65},
    weightkg: 28.4,
    abilities: {0: 'Swarm'},
  },
  Beldum: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 40, at: 55, df: 80, sa: 35, sd: 60, sp: 30},
    weightkg: 95.2,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Clear Body'},
  },
  Blaziken: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 80, at: 120, df: 70, sa: 110, sd: 70, sp: 80},
    weightkg: 52,
    abilities: {0: 'Blaze'},
  },
  Breloom: {
    types: ['Grass', 'Fighting'],
    bs: {hp: 60, at: 130, df: 80, sa: 60, sd: 60, sp: 70},
    weightkg: 39.2,
    abilities: {0: 'Effect Spore'},
  },
  Cacnea: {
    types: ['Grass'],
    bs: {hp: 50, at: 85, df: 40, sa: 85, sd: 40, sp: 35},
    weightkg: 51.3,
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  Cacturne: {
    types: ['Grass', 'Dark'],
    bs: {hp: 70, at: 115, df: 60, sa: 115, sd: 60, sp: 55},
    weightkg: 77.4,
    abilities: {0: 'Sand Veil'},
  },
  Camerupt: {
    types: ['Fire', 'Ground'],
    bs: {hp: 70, at: 100, df: 70, sa: 105, sd: 75, sp: 40},
    weightkg: 220,
    abilities: {0: 'Magma Armor'},
  },
  Carvanha: {
    types: ['Water', 'Dark'],
    bs: {hp: 45, at: 90, df: 20, sa: 65, sd: 20, sp: 65},
    weightkg: 20.8,
    nfe: true,
    abilities: {0: 'Rough Skin'},
  },
  Cascoon: {
    types: ['Bug'],
    bs: {hp: 50, at: 35, df: 55, sa: 25, sd: 25, sp: 15},
    weightkg: 11.5,
    abilities: {0: 'Shed Skin'},
    nfe: true,
  },
  Castform: {
    types: ['Normal'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    otherFormes: ['Castform-Rainy', 'Castform-Snowy', 'Castform-Sunny'],
  },
  'Castform-Rainy': {
    types: ['Water'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    baseSpecies: 'Castform',
  },
  'Castform-Snowy': {
    types: ['Ice'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    baseSpecies: 'Castform',
  },
  'Castform-Sunny': {
    types: ['Fire'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    baseSpecies: 'Castform',
  },
  Chimecho: {
    types: ['Psychic'],
    bs: {hp: 65, at: 50, df: 70, sa: 95, sd: 80, sp: 65},
    weightkg: 1,
    abilities: {0: 'Levitate'},
  },
  Clamperl: {
    types: ['Water'],
    bs: {hp: 35, at: 64, df: 85, sa: 74, sd: 55, sp: 32},
    weightkg: 52.5,
    nfe: true,
    abilities: {0: 'Shell Armor'},
  },
  Claydol: {
    types: ['Ground', 'Psychic'],
    bs: {hp: 60, at: 70, df: 105, sa: 70, sd: 120, sp: 75},
    weightkg: 108,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Combusken: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 60, at: 85, df: 60, sa: 85, sd: 60, sp: 55},
    weightkg: 19.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Corphish: {
    types: ['Water'],
    bs: {hp: 43, at: 80, df: 65, sa: 50, sd: 35, sp: 35},
    weightkg: 11.5,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Cradily: {
    types: ['Rock', 'Grass'],
    bs: {hp: 86, at: 81, df: 97, sa: 81, sd: 107, sp: 43},
    weightkg: 60.4,
    abilities: {0: 'Suction Cups'},
  },
  Crawdaunt: {
    types: ['Water', 'Dark'],
    bs: {hp: 63, at: 120, df: 85, sa: 90, sd: 55, sp: 55},
    weightkg: 32.8,
    abilities: {0: 'Hyper Cutter'},
  },
  Delcatty: {
    types: ['Normal'],
    bs: {hp: 70, at: 65, df: 65, sa: 55, sd: 55, sp: 70},
    weightkg: 32.6,
    abilities: {0: 'Cute Charm'},
  },
  Deoxys: {
    types: ['Psychic'],
    bs: {hp: 50, at: 150, df: 50, sa: 150, sd: 50, sp: 150},
    weightkg: 60.8,
    gender: 'N',
    abilities: {0: 'Pressure'},
    otherFormes: ['Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed'],
  },
  'Deoxys-Attack': {
    types: ['Psychic'],
    bs: {hp: 50, at: 180, df: 20, sa: 180, sd: 20, sp: 150},
    weightkg: 60.8,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Deoxys',
  },
  'Deoxys-Defense': {
    types: ['Psychic'],
    bs: {hp: 50, at: 70, df: 160, sa: 70, sd: 160, sp: 90},
    weightkg: 60.8,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Deoxys',
  },
  'Deoxys-Speed': {
    types: ['Psychic'],
    bs: {hp: 50, at: 95, df: 90, sa: 95, sd: 90, sp: 180},
    weightkg: 60.8,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Deoxys',
  },
  Dusclops: {
    types: ['Ghost'],
    bs: {hp: 40, at: 70, df: 130, sa: 60, sd: 130, sp: 25},
    weightkg: 30.6,
    abilities: {0: 'Pressure'},
  },
  Duskull: {
    types: ['Ghost'],
    bs: {hp: 20, at: 40, df: 90, sa: 30, sd: 90, sp: 25},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Dustox: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 50, df: 70, sa: 50, sd: 90, sp: 65},
    weightkg: 31.6,
    abilities: {0: 'Shield Dust'},
  },
  Electrike: {
    types: ['Electric'],
    bs: {hp: 40, at: 45, df: 40, sa: 65, sd: 40, sp: 65},
    weightkg: 15.2,
    nfe: true,
    abilities: {0: 'Static'},
  },
  Exploud: {
    types: ['Normal'],
    bs: {hp: 104, at: 91, df: 63, sa: 91, sd: 63, sp: 68},
    weightkg: 84,
    abilities: {0: 'Soundproof'},
  },
  Feebas: {
    types: ['Water'],
    bs: {hp: 20, at: 15, df: 20, sa: 10, sd: 55, sp: 80},
    weightkg: 7.4,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Flygon: {
    types: ['Ground', 'Dragon'],
    bs: {hp: 80, at: 100, df: 80, sa: 80, sd: 80, sp: 100},
    weightkg: 82,
    abilities: {0: 'Levitate'},
  },
  Gardevoir: {
    types: ['Psychic'],
    bs: {hp: 68, at: 65, df: 65, sa: 125, sd: 115, sp: 80},
    weightkg: 48.4,
    abilities: {0: 'Synchronize'},
  },
  Glalie: {
    types: ['Ice'],
    bs: {hp: 80, at: 80, df: 80, sa: 80, sd: 80, sp: 80},
    weightkg: 256.5,
    abilities: {0: 'Inner Focus'},
  },
  Gorebyss: {
    types: ['Water'],
    bs: {hp: 55, at: 84, df: 105, sa: 114, sd: 75, sp: 52},
    weightkg: 22.6,
    abilities: {0: 'Swift Swim'},
  },
  Groudon: {
    types: ['Ground'],
    bs: {hp: 100, at: 150, df: 140, sa: 100, sd: 90, sp: 90},
    weightkg: 950,
    gender: 'N',
    abilities: {0: 'Drought'},
  },
  Grovyle: {
    types: ['Grass'],
    bs: {hp: 50, at: 65, df: 45, sa: 85, sd: 65, sp: 95},
    weightkg: 21.6,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Grumpig: {
    types: ['Psychic'],
    bs: {hp: 80, at: 45, df: 65, sa: 90, sd: 110, sp: 80},
    weightkg: 71.5,
    abilities: {0: 'Thick Fat'},
  },
  Gulpin: {
    types: ['Poison'],
    bs: {hp: 70, at: 43, df: 53, sa: 43, sd: 53, sp: 40},
    weightkg: 10.3,
    nfe: true,
    abilities: {0: 'Liquid Ooze'},
  },
  Hariyama: {
    types: ['Fighting'],
    bs: {hp: 144, at: 120, df: 60, sa: 40, sd: 60, sp: 50},
    weightkg: 253.8,
    abilities: {0: 'Thick Fat'},
  },
  Huntail: {
    types: ['Water'],
    bs: {hp: 55, at: 104, df: 105, sa: 94, sd: 75, sp: 52},
    weightkg: 27,
    abilities: {0: 'Swift Swim'},
  },
  Illumise: {
    types: ['Bug'],
    bs: {hp: 65, at: 47, df: 55, sa: 73, sd: 75, sp: 85},
    weightkg: 17.7,
    gender: 'F',
    abilities: {0: 'Oblivious'},
  },
  Jirachi: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 1.1,
    gender: 'N',
    abilities: {0: 'Serene Grace'},
  },
  Kecleon: {
    types: ['Normal'],
    bs: {hp: 60, at: 90, df: 70, sa: 60, sd: 120, sp: 40},
    weightkg: 22,
    abilities: {0: 'Color Change'},
  },
  Kirlia: {
    types: ['Psychic'],
    bs: {hp: 38, at: 35, df: 35, sa: 65, sd: 55, sp: 50},
    weightkg: 20.2,
    nfe: true,
    abilities: {0: 'Synchronize'},
  },
  Kyogre: {
    types: ['Water'],
    bs: {hp: 100, at: 100, df: 90, sa: 150, sd: 140, sp: 90},
    weightkg: 352,
    gender: 'N',
    abilities: {0: 'Drizzle'},
  },
  Lairon: {
    types: ['Steel', 'Rock'],
    bs: {hp: 60, at: 90, df: 140, sa: 50, sd: 50, sp: 40},
    weightkg: 120,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Latias: {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 80, df: 90, sa: 110, sd: 130, sp: 110},
    weightkg: 40,
    gender: 'F',
    abilities: {0: 'Levitate'},
  },
  Latios: {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 90, df: 80, sa: 130, sd: 110, sp: 110},
    weightkg: 60,
    gender: 'M',
    abilities: {0: 'Levitate'},
  },
  Lileep: {
    types: ['Rock', 'Grass'],
    bs: {hp: 66, at: 41, df: 77, sa: 61, sd: 87, sp: 23},
    weightkg: 23.8,
    nfe: true,
    abilities: {0: 'Suction Cups'},
  },
  Linoone: {
    types: ['Normal'],
    bs: {hp: 78, at: 70, df: 61, sa: 50, sd: 61, sp: 100},
    weightkg: 32.5,
    abilities: {0: 'Pickup'},
  },
  Lombre: {
    types: ['Water', 'Grass'],
    bs: {hp: 60, at: 50, df: 50, sa: 60, sd: 70, sp: 50},
    weightkg: 32.5,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Lotad: {
    types: ['Water', 'Grass'],
    bs: {hp: 40, at: 30, df: 30, sa: 40, sd: 50, sp: 30},
    weightkg: 2.6,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Loudred: {
    types: ['Normal'],
    bs: {hp: 84, at: 71, df: 43, sa: 71, sd: 43, sp: 48},
    weightkg: 40.5,
    nfe: true,
    abilities: {0: 'Soundproof'},
  },
  Ludicolo: {
    types: ['Water', 'Grass'],
    bs: {hp: 80, at: 70, df: 70, sa: 90, sd: 100, sp: 70},
    weightkg: 55,
    abilities: {0: 'Swift Swim'},
  },
  Lunatone: {
    types: ['Rock', 'Psychic'],
    bs: {hp: 70, at: 55, df: 65, sa: 95, sd: 85, sp: 70},
    weightkg: 168,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Luvdisc: {
    types: ['Water'],
    bs: {hp: 43, at: 30, df: 55, sa: 40, sd: 65, sp: 97},
    weightkg: 8.7,
    abilities: {0: 'Swift Swim'},
  },
  Makuhita: {
    types: ['Fighting'],
    bs: {hp: 72, at: 60, df: 30, sa: 20, sd: 30, sp: 25},
    weightkg: 86.4,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Manectric: {
    types: ['Electric'],
    bs: {hp: 70, at: 75, df: 60, sa: 105, sd: 60, sp: 105},
    weightkg: 40.2,
    abilities: {0: 'Static'},
  },
  Marshtomp: {
    types: ['Water', 'Ground'],
    bs: {hp: 70, at: 85, df: 70, sa: 60, sd: 70, sp: 50},
    weightkg: 28,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Masquerain: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 60, df: 62, sa: 80, sd: 82, sp: 60},
    weightkg: 3.6,
    abilities: {0: 'Intimidate'},
  },
  Mawile: {
    types: ['Steel'],
    bs: {hp: 50, at: 85, df: 85, sa: 55, sd: 55, sp: 50},
    weightkg: 11.5,
    abilities: {0: 'Hyper Cutter'},
  },
  Medicham: {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 60, at: 60, df: 75, sa: 60, sd: 75, sp: 80},
    weightkg: 31.5,
    abilities: {0: 'Pure Power'},
  },
  Meditite: {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 30, at: 40, df: 55, sa: 40, sd: 55, sp: 60},
    weightkg: 11.2,
    nfe: true,
    abilities: {0: 'Pure Power'},
  },
  Metagross: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 80, at: 135, df: 130, sa: 95, sd: 90, sp: 70},
    weightkg: 550,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Metang: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 60, at: 75, df: 100, sa: 55, sd: 80, sp: 50},
    weightkg: 202.5,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Clear Body'},
  },
  Mightyena: {
    types: ['Dark'],
    bs: {hp: 70, at: 90, df: 70, sa: 60, sd: 60, sp: 70},
    weightkg: 37,
    abilities: {0: 'Intimidate'},
  },
  Milotic: {
    types: ['Water'],
    bs: {hp: 95, at: 60, df: 79, sa: 100, sd: 125, sp: 81},
    weightkg: 162,
    abilities: {0: 'Marvel Scale'},
  },
  Minun: {
    types: ['Electric'],
    bs: {hp: 60, at: 40, df: 50, sa: 75, sd: 85, sp: 95},
    weightkg: 4.2,
    abilities: {0: 'Minus'},
  },
  Mudkip: {
    types: ['Water'],
    bs: {hp: 50, at: 70, df: 50, sa: 50, sd: 50, sp: 40},
    weightkg: 7.6,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Nincada: {
    types: ['Bug', 'Ground'],
    bs: {hp: 31, at: 45, df: 90, sa: 30, sd: 30, sp: 40},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Compound Eyes'},
  },
  Ninjask: {
    types: ['Bug', 'Flying'],
    bs: {hp: 61, at: 90, df: 45, sa: 50, sd: 50, sp: 160},
    weightkg: 12,
    abilities: {0: 'Speed Boost'},
  },
  Nosepass: {
    types: ['Rock'],
    bs: {hp: 30, at: 45, df: 135, sa: 45, sd: 90, sp: 30},
    weightkg: 97,
    abilities: {0: 'Sturdy'},
  },
  Numel: {
    types: ['Fire', 'Ground'],
    bs: {hp: 60, at: 60, df: 40, sa: 65, sd: 45, sp: 35},
    weightkg: 24,
    nfe: true,
    abilities: {0: 'Oblivious'},
  },
  Nuzleaf: {
    types: ['Grass', 'Dark'],
    bs: {hp: 70, at: 70, df: 40, sa: 60, sd: 40, sp: 60},
    weightkg: 28,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Pelipper: {
    types: ['Water', 'Flying'],
    bs: {hp: 60, at: 50, df: 100, sa: 85, sd: 70, sp: 65},
    weightkg: 28,
    abilities: {0: 'Keen Eye'},
  },
  Plusle: {
    types: ['Electric'],
    bs: {hp: 60, at: 50, df: 40, sa: 85, sd: 75, sp: 95},
    weightkg: 4.2,
    abilities: {0: 'Plus'},
  },
  Poochyena: {
    types: ['Dark'],
    bs: {hp: 35, at: 55, df: 35, sa: 30, sd: 30, sp: 35},
    weightkg: 13.6,
    nfe: true,
    abilities: {0: 'Run Away'},
  },
  Ralts: {
    types: ['Psychic'],
    bs: {hp: 28, at: 25, df: 25, sa: 45, sd: 35, sp: 40},
    weightkg: 6.6,
    nfe: true,
    abilities: {0: 'Synchronize'},
  },
  Rayquaza: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 105, at: 150, df: 90, sa: 150, sd: 90, sp: 95},
    weightkg: 206.5,
    gender: 'N',
    abilities: {0: 'Air Lock'},
  },
  Regice: {
    types: ['Ice'],
    bs: {hp: 80, at: 50, df: 100, sa: 100, sd: 200, sp: 50},
    weightkg: 175,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Regirock: {
    types: ['Rock'],
    bs: {hp: 80, at: 100, df: 200, sa: 50, sd: 100, sp: 50},
    weightkg: 230,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Registeel: {
    types: ['Steel'],
    bs: {hp: 80, at: 75, df: 150, sa: 75, sd: 150, sp: 50},
    weightkg: 205,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Relicanth: {
    types: ['Water', 'Rock'],
    bs: {hp: 100, at: 90, df: 130, sa: 45, sd: 65, sp: 55},
    weightkg: 23.4,
    abilities: {0: 'Swift Swim'},
  },
  Roselia: {
    types: ['Grass', 'Poison'],
    bs: {hp: 50, at: 60, df: 45, sa: 100, sd: 80, sp: 65},
    weightkg: 2,
    abilities: {0: 'Natural Cure'},
  },
  Sableye: {
    types: ['Dark', 'Ghost'],
    bs: {hp: 50, at: 75, df: 75, sa: 65, sd: 65, sp: 50},
    weightkg: 11,
    abilities: {0: 'Keen Eye'},
  },
  Salamence: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 95, at: 135, df: 80, sa: 110, sd: 80, sp: 100},
    weightkg: 102.6,
    abilities: {0: 'Intimidate'},
  },
  Sceptile: {
    types: ['Grass'],
    bs: {hp: 70, at: 85, df: 65, sa: 105, sd: 85, sp: 120},
    weightkg: 52.2,
    abilities: {0: 'Overgrow'},
  },
  Sealeo: {
    types: ['Ice', 'Water'],
    bs: {hp: 90, at: 60, df: 70, sa: 75, sd: 70, sp: 45},
    weightkg: 87.6,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Seedot: {
    types: ['Grass'],
    bs: {hp: 40, at: 40, df: 50, sa: 30, sd: 30, sp: 30},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Seviper: {
    types: ['Poison'],
    bs: {hp: 73, at: 100, df: 60, sa: 100, sd: 60, sp: 65},
    weightkg: 52.5,
    abilities: {0: 'Shed Skin'},
  },
  Sharpedo: {
    types: ['Water', 'Dark'],
    bs: {hp: 70, at: 120, df: 40, sa: 95, sd: 40, sp: 95},
    weightkg: 88.8,
    abilities: {0: 'Rough Skin'},
  },
  Shedinja: {
    types: ['Bug', 'Ghost'],
    bs: {hp: 1, at: 90, df: 45, sa: 30, sd: 30, sp: 40},
    weightkg: 1.2,
    gender: 'N',
    abilities: {0: 'Wonder Guard'},
  },
  Shelgon: {
    types: ['Dragon'],
    bs: {hp: 65, at: 95, df: 100, sa: 60, sd: 50, sp: 50},
    weightkg: 110.5,
    nfe: true,
    abilities: {0: 'Rock Head'},
  },
  Shiftry: {
    types: ['Grass', 'Dark'],
    bs: {hp: 90, at: 100, df: 60, sa: 90, sd: 60, sp: 80},
    weightkg: 59.6,
    abilities: {0: 'Chlorophyll'},
  },
  Shroomish: {
    types: ['Grass'],
    bs: {hp: 60, at: 40, df: 60, sa: 40, sd: 60, sp: 35},
    weightkg: 4.5,
    nfe: true,
    abilities: {0: 'Effect Spore'},
  },
  Shuppet: {
    types: ['Ghost'],
    bs: {hp: 44, at: 75, df: 35, sa: 63, sd: 33, sp: 45},
    weightkg: 2.3,
    nfe: true,
    abilities: {0: 'Insomnia'},
  },
  Silcoon: {
    types: ['Bug'],
    bs: {hp: 50, at: 35, df: 55, sa: 25, sd: 25, sp: 15},
    weightkg: 10,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Skitty: {
    types: ['Normal'],
    bs: {hp: 50, at: 45, df: 45, sa: 35, sd: 35, sp: 50},
    weightkg: 11,
    nfe: true,
    abilities: {0: 'Cute Charm'},
  },
  Slaking: {
    types: ['Normal'],
    bs: {hp: 150, at: 160, df: 100, sa: 95, sd: 65, sp: 100},
    weightkg: 130.5,
    abilities: {0: 'Truant'},
  },
  Slakoth: {
    types: ['Normal'],
    bs: {hp: 60, at: 60, df: 60, sa: 35, sd: 35, sp: 30},
    weightkg: 24,
    nfe: true,
    abilities: {0: 'Truant'},
  },
  Snorunt: {
    types: ['Ice'],
    bs: {hp: 50, at: 50, df: 50, sa: 50, sd: 50, sp: 50},
    weightkg: 16.8,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
  Solrock: {
    types: ['Rock', 'Psychic'],
    bs: {hp: 70, at: 95, df: 85, sa: 55, sd: 65, sp: 70},
    weightkg: 154,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Spheal: {
    types: ['Ice', 'Water'],
    bs: {hp: 70, at: 40, df: 50, sa: 55, sd: 50, sp: 25},
    weightkg: 39.5,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Spinda: {
    types: ['Normal'],
    bs: {hp: 60, at: 60, df: 60, sa: 60, sd: 60, sp: 60},
    weightkg: 5,
    abilities: {0: 'Own Tempo'},
  },
  Spoink: {
    types: ['Psychic'],
    bs: {hp: 60, at: 25, df: 35, sa: 70, sd: 80, sp: 60},
    weightkg: 30.6,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Surskit: {
    types: ['Bug', 'Water'],
    bs: {hp: 40, at: 30, df: 32, sa: 50, sd: 52, sp: 65},
    weightkg: 1.7,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Swablu: {
    types: ['Normal', 'Flying'],
    bs: {hp: 45, at: 40, df: 60, sa: 40, sd: 75, sp: 50},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  Swalot: {
    types: ['Poison'],
    bs: {hp: 100, at: 73, df: 83, sa: 73, sd: 83, sp: 55},
    weightkg: 80,
    abilities: {0: 'Liquid Ooze'},
  },
  Swampert: {
    types: ['Water', 'Ground'],
    bs: {hp: 100, at: 110, df: 90, sa: 85, sd: 90, sp: 60},
    weightkg: 81.9,
    abilities: {0: 'Torrent'},
  },
  Swellow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 60, at: 85, df: 60, sa: 50, sd: 50, sp: 125},
    weightkg: 19.8,
    abilities: {0: 'Guts'},
  },
  Taillow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 55, df: 30, sa: 30, sd: 30, sp: 85},
    weightkg: 2.3,
    nfe: true,
    abilities: {0: 'Guts'},
  },
  Torchic: {
    types: ['Fire'],
    bs: {hp: 45, at: 60, df: 40, sa: 70, sd: 50, sp: 45},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Torkoal: {
    types: ['Fire'],
    bs: {hp: 70, at: 85, df: 140, sa: 85, sd: 70, sp: 20},
    weightkg: 80.4,
    abilities: {0: 'White Smoke'},
  },
  Trapinch: {
    types: ['Ground'],
    bs: {hp: 45, at: 100, df: 45, sa: 45, sd: 45, sp: 10},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Treecko: {
    types: ['Grass'],
    bs: {hp: 40, at: 45, df: 35, sa: 65, sd: 55, sp: 70},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Tropius: {
    types: ['Grass', 'Flying'],
    bs: {hp: 99, at: 68, df: 83, sa: 72, sd: 87, sp: 51},
    weightkg: 100,
    abilities: {0: 'Chlorophyll'},
  },
  Vibrava: {
    types: ['Ground', 'Dragon'],
    bs: {hp: 50, at: 70, df: 50, sa: 50, sd: 50, sp: 70},
    weightkg: 15.3,
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Vigoroth: {
    types: ['Normal'],
    bs: {hp: 80, at: 80, df: 80, sa: 55, sd: 55, sp: 90},
    weightkg: 46.5,
    nfe: true,
    abilities: {0: 'Vital Spirit'},
  },
  Volbeat: {
    types: ['Bug'],
    bs: {hp: 65, at: 73, df: 55, sa: 47, sd: 75, sp: 85},
    weightkg: 17.7,
    gender: 'M',
    abilities: {0: 'Illuminate'},
  },
  Wailmer: {
    types: ['Water'],
    bs: {hp: 130, at: 70, df: 35, sa: 70, sd: 35, sp: 60},
    weightkg: 130,
    nfe: true,
    abilities: {0: 'Water Veil'},
  },
  Wailord: {
    types: ['Water'],
    bs: {hp: 170, at: 90, df: 45, sa: 90, sd: 45, sp: 60},
    weightkg: 398,
    abilities: {0: 'Water Veil'},
  },
  Walrein: {
    types: ['Ice', 'Water'],
    bs: {hp: 110, at: 80, df: 90, sa: 95, sd: 90, sp: 65},
    weightkg: 150.6,
    abilities: {0: 'Thick Fat'},
  },
  Whiscash: {
    types: ['Water', 'Ground'],
    bs: {hp: 110, at: 78, df: 73, sa: 76, sd: 71, sp: 60},
    weightkg: 23.6,
    abilities: {0: 'Oblivious'},
  },
  Whismur: {
    types: ['Normal'],
    bs: {hp: 64, at: 51, df: 23, sa: 51, sd: 23, sp: 28},
    weightkg: 16.3,
    nfe: true,
    abilities: {0: 'Soundproof'},
  },
  Wingull: {
    types: ['Water', 'Flying'],
    bs: {hp: 40, at: 30, df: 30, sa: 55, sd: 30, sp: 85},
    weightkg: 9.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Wurmple: {
    types: ['Bug'],
    bs: {hp: 45, at: 45, df: 35, sa: 20, sd: 30, sp: 20},
    weightkg: 3.6,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Wynaut: {
    types: ['Psychic'],
    bs: {hp: 95, at: 23, df: 48, sa: 23, sd: 48, sp: 23},
    weightkg: 14,
    nfe: true,
    abilities: {0: 'Shadow Tag'},
  },
  Zangoose: {
    types: ['Normal'],
    bs: {hp: 73, at: 115, df: 60, sa: 60, sd: 60, sp: 90},
    weightkg: 40.3,
    abilities: {0: 'Immunity'},
  },
  Zigzagoon: {
    types: ['Normal'],
    bs: {hp: 38, at: 30, df: 41, sa: 30, sd: 41, sp: 60},
    weightkg: 17.5,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
};

const ADV: {[name: string]: SpeciesData} = extend(true, {}, GSC, ADV_PATCH);

const DPP_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Aipom: {nfe: true},
  Dusclops: {nfe: true},
  Electabuzz: {nfe: true},
  Gligar: {nfe: true},
  Lickitung: {nfe: true},
  Magmar: {nfe: true},
  Magneton: {nfe: true},
  Misdreavus: {nfe: true},
  Murkrow: {nfe: true},
  Nosepass: {nfe: true},
  Piloswine: {nfe: true},
  Pichu: {otherFormes: ['Pichu-Spiky-eared']},
  Porygon2: {nfe: true},
  Rhydon: {nfe: true},
  Roselia: {nfe: true},
  Sneasel: {nfe: true},
  Tangela: {nfe: true},
  Togetic: {nfe: true},
  Yanma: {nfe: true},
  Abomasnow: {
    types: ['Grass', 'Ice'],
    bs: {hp: 90, at: 92, df: 75, sa: 92, sd: 85, sp: 60},
    weightkg: 135.5,
    abilities: {0: 'Snow Warning'},
  },
  Ambipom: {
    types: ['Normal'],
    bs: {hp: 75, at: 100, df: 66, sa: 60, sd: 66, sp: 115},
    weightkg: 20.3,
    abilities: {0: 'Technician'},
  },
  Arceus: {
    types: ['Normal'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    otherFormes: [
      'Arceus-Bug',
      'Arceus-Dark',
      'Arceus-Dragon',
      'Arceus-Electric',
      'Arceus-Fighting',
      'Arceus-Fire',
      'Arceus-Flying',
      'Arceus-Ghost',
      'Arceus-Grass',
      'Arceus-Ground',
      'Arceus-Ice',
      'Arceus-Poison',
      'Arceus-Psychic',
      'Arceus-Rock',
      'Arceus-Steel',
      'Arceus-Water',
    ],
  },
  'Arceus-Bug': {
    types: ['Bug'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Dark': {
    types: ['Dark'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Dragon': {
    types: ['Dragon'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Electric': {
    types: ['Electric'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Fighting': {
    types: ['Fighting'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Fire': {
    types: ['Fire'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Flying': {
    types: ['Flying'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Ghost': {
    types: ['Ghost'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Grass': {
    types: ['Grass'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Ground': {
    types: ['Ground'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Ice': {
    types: ['Ice'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Poison': {
    types: ['Poison'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Psychic': {
    types: ['Psychic'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Rock': {
    types: ['Rock'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Steel': {
    types: ['Steel'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  'Arceus-Water': {
    types: ['Water'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  Arghonaut: {
    types: ['Water', 'Fighting'],
    bs: {hp: 105, at: 110, df: 95, sa: 70, sd: 100, sp: 75},
    weightkg: 151,
    abilities: {0: 'Unaware'},
  },
  Azelf: {
    types: ['Psychic'],
    bs: {hp: 75, at: 125, df: 70, sa: 125, sd: 70, sp: 115},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Bastiodon: {
    types: ['Rock', 'Steel'],
    bs: {hp: 60, at: 52, df: 168, sa: 47, sd: 138, sp: 30},
    weightkg: 149.5,
    abilities: {0: 'Sturdy'},
  },
  Bibarel: {
    types: ['Normal', 'Water'],
    bs: {hp: 79, at: 85, df: 60, sa: 55, sd: 60, sp: 71},
    weightkg: 31.5,
    abilities: {0: 'Simple'},
  },
  Bidoof: {
    types: ['Normal'],
    bs: {hp: 59, at: 45, df: 40, sa: 35, sd: 40, sp: 31},
    weightkg: 20,
    nfe: true,
    abilities: {0: 'Simple'},
  },
  Bonsly: {
    types: ['Rock'],
    bs: {hp: 50, at: 80, df: 95, sa: 10, sd: 45, sp: 10},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Breezi: {
    types: ['Poison', 'Flying'],
    bs: {hp: 50, at: 46, df: 69, sa: 60, sd: 50, sp: 75},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Unburden'},
  },
  Bronzong: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 67, at: 89, df: 116, sa: 79, sd: 116, sp: 33},
    weightkg: 187,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Bronzor: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 57, at: 24, df: 86, sa: 24, sd: 86, sp: 23},
    weightkg: 60.5,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Budew: {
    types: ['Grass', 'Poison'],
    bs: {hp: 40, at: 30, df: 35, sa: 50, sd: 70, sp: 55},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  Buizel: {
    types: ['Water'],
    bs: {hp: 55, at: 65, df: 35, sa: 60, sd: 30, sp: 85},
    weightkg: 29.5,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Buneary: {
    types: ['Normal'],
    bs: {hp: 55, at: 66, df: 44, sa: 44, sd: 56, sp: 85},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Run Away'},
  },
  Burmy: {
    types: ['Bug'],
    bs: {hp: 40, at: 29, df: 45, sa: 29, sd: 45, sp: 36},
    weightkg: 3.4,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Carnivine: {
    types: ['Grass'],
    bs: {hp: 74, at: 100, df: 72, sa: 90, sd: 72, sp: 46},
    weightkg: 27,
    abilities: {0: 'Levitate'},
  },
  Chatot: {
    types: ['Normal', 'Flying'],
    bs: {hp: 76, at: 65, df: 45, sa: 92, sd: 42, sp: 91},
    weightkg: 1.9,
    abilities: {0: 'Keen Eye'},
  },
  Cherrim: {
    types: ['Grass'],
    bs: {hp: 70, at: 60, df: 70, sa: 87, sd: 78, sp: 85},
    weightkg: 9.3,
    abilities: {0: 'Flower Gift'},
    otherFormes: ['Cherrim-Sunshine'],
  },
  'Cherrim-Sunshine': {
    types: ['Grass'],
    bs: {hp: 70, at: 60, df: 70, sa: 87, sd: 78, sp: 85},
    weightkg: 9.3,
    abilities: {0: 'Flower Gift'},
    baseSpecies: 'Cherrim',
  },
  Cherubi: {
    types: ['Grass'],
    bs: {hp: 45, at: 35, df: 45, sa: 62, sd: 53, sp: 35},
    weightkg: 3.3,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Chimchar: {
    types: ['Fire'],
    bs: {hp: 44, at: 58, df: 44, sa: 58, sd: 44, sp: 61},
    weightkg: 6.2,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Chingling: {
    types: ['Psychic'],
    bs: {hp: 45, at: 30, df: 50, sa: 65, sd: 50, sp: 45},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Colossoil: {
    types: ['Ground', 'Dark'],
    bs: {hp: 133, at: 122, df: 72, sa: 71, sd: 72, sp: 95},
    weightkg: 683.6,
    abilities: {0: 'Rebound'},
  },
  Combee: {
    types: ['Bug', 'Flying'],
    bs: {hp: 30, at: 30, df: 42, sa: 30, sd: 42, sp: 70},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Honey Gather'},
  },
  Cranidos: {
    types: ['Rock'],
    bs: {hp: 67, at: 125, df: 40, sa: 30, sd: 30, sp: 58},
    weightkg: 31.5,
    nfe: true,
    abilities: {0: 'Mold Breaker'},
  },
  Cresselia: {
    types: ['Psychic'],
    bs: {hp: 120, at: 70, df: 120, sa: 75, sd: 130, sp: 85},
    weightkg: 85.6,
    gender: 'F',
    abilities: {0: 'Levitate'},
  },
  Croagunk: {
    types: ['Poison', 'Fighting'],
    bs: {hp: 48, at: 61, df: 40, sa: 61, sd: 40, sp: 50},
    weightkg: 23,
    nfe: true,
    abilities: {0: 'Anticipation'},
  },
  Cyclohm: {
    types: ['Electric', 'Dragon'],
    bs: {hp: 108, at: 60, df: 118, sa: 112, sd: 70, sp: 80},
    weightkg: 59,
    abilities: {0: 'Shield Dust'},
  },
  Darkrai: {
    types: ['Dark'],
    bs: {hp: 70, at: 90, df: 90, sa: 135, sd: 90, sp: 125},
    weightkg: 50.5,
    gender: 'N',
    abilities: {0: 'Bad Dreams'},
  },
  Dialga: {
    types: ['Steel', 'Dragon'],
    bs: {hp: 100, at: 120, df: 120, sa: 150, sd: 100, sp: 90},
    weightkg: 683,
    gender: 'N',
    abilities: {0: 'Pressure'},
  },
  Dorsoil: {
    types: ['Ground'],
    bs: {hp: 103, at: 72, df: 52, sa: 61, sd: 52, sp: 65},
    weightkg: 145,
    nfe: true,
    abilities: {0: 'Oblivious'},
  },
  Drapion: {
    types: ['Poison', 'Dark'],
    bs: {hp: 70, at: 90, df: 110, sa: 60, sd: 75, sp: 95},
    weightkg: 61.5,
    abilities: {0: 'Battle Armor'},
  },
  Drifblim: {
    types: ['Ghost', 'Flying'],
    bs: {hp: 150, at: 80, df: 44, sa: 90, sd: 54, sp: 80},
    weightkg: 15,
    abilities: {0: 'Aftermath'},
  },
  Drifloon: {
    types: ['Ghost', 'Flying'],
    bs: {hp: 90, at: 50, df: 34, sa: 60, sd: 44, sp: 70},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Aftermath'},
  },
  Duohm: {
    types: ['Electric', 'Dragon'],
    bs: {hp: 88, at: 40, df: 103, sa: 77, sd: 60, sp: 60},
    weightkg: 19.2,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Dusknoir: {
    types: ['Ghost'],
    bs: {hp: 45, at: 100, df: 135, sa: 65, sd: 135, sp: 45},
    weightkg: 106.6,
    abilities: {0: 'Pressure'},
  },
  Electivire: {
    types: ['Electric'],
    bs: {hp: 75, at: 123, df: 67, sa: 95, sd: 85, sp: 95},
    weightkg: 138.6,
    abilities: {0: 'Motor Drive'},
  },
  Embirch: {
    types: ['Fire', 'Grass'],
    bs: {hp: 60, at: 40, df: 55, sa: 65, sd: 40, sp: 60},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Reckless'},
  },
  Empoleon: {
    types: ['Water', 'Steel'],
    bs: {hp: 84, at: 86, df: 88, sa: 111, sd: 101, sp: 60},
    weightkg: 84.5,
    abilities: {0: 'Torrent'},
  },
  Fidgit: {
    types: ['Poison', 'Ground'],
    bs: {hp: 95, at: 76, df: 109, sa: 90, sd: 80, sp: 105},
    weightkg: 53,
    abilities: {0: 'Persistent'},
  },
  Finneon: {
    types: ['Water'],
    bs: {hp: 49, at: 49, df: 56, sa: 49, sd: 61, sp: 66},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Flarelm: {
    types: ['Fire', 'Grass'],
    bs: {hp: 90, at: 50, df: 95, sa: 75, sd: 70, sp: 40},
    weightkg: 73,
    nfe: true,
    abilities: {0: 'Rock Head'},
  },
  Floatzel: {
    types: ['Water'],
    bs: {hp: 85, at: 105, df: 55, sa: 85, sd: 50, sp: 115},
    weightkg: 33.5,
    abilities: {0: 'Swift Swim'},
  },
  Froslass: {
    types: ['Ice', 'Ghost'],
    bs: {hp: 70, at: 80, df: 70, sa: 80, sd: 70, sp: 110},
    weightkg: 26.6,
    gender: 'F',
    abilities: {0: 'Snow Cloak'},
  },
  Gabite: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 68, at: 90, df: 65, sa: 50, sd: 55, sp: 82},
    weightkg: 56,
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  Gallade: {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 68, at: 125, df: 65, sa: 65, sd: 115, sp: 80},
    weightkg: 52,
    gender: 'M',
    abilities: {0: 'Steadfast'},
  },
  Garchomp: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 130, df: 95, sa: 80, sd: 85, sp: 102},
    weightkg: 95,
    abilities: {0: 'Sand Veil'},
  },
  Gastrodon: {
    types: ['Water', 'Ground'],
    bs: {hp: 111, at: 83, df: 68, sa: 92, sd: 82, sp: 39},
    weightkg: 29.9,
    abilities: {0: 'Sticky Hold'},
  },
  Gible: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 58, at: 70, df: 45, sa: 40, sd: 45, sp: 42},
    weightkg: 20.5,
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  Giratina: {
    types: ['Ghost', 'Dragon'],
    bs: {hp: 150, at: 100, df: 120, sa: 100, sd: 120, sp: 90},
    weightkg: 750,
    gender: 'N',
    abilities: {0: 'Pressure'},
    otherFormes: ['Giratina-Origin'],
  },
  'Giratina-Origin': {
    types: ['Ghost', 'Dragon'],
    bs: {hp: 150, at: 120, df: 100, sa: 120, sd: 100, sp: 90},
    weightkg: 650,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Giratina',
  },
  Glaceon: {
    types: ['Ice'],
    bs: {hp: 65, at: 60, df: 110, sa: 130, sd: 95, sp: 65},
    weightkg: 25.9,
    abilities: {0: 'Snow Cloak'},
  },
  Glameow: {
    types: ['Normal'],
    bs: {hp: 49, at: 55, df: 42, sa: 42, sd: 37, sp: 85},
    weightkg: 3.9,
    nfe: true,
    abilities: {0: 'Limber'},
  },
  Gliscor: {
    types: ['Ground', 'Flying'],
    bs: {hp: 75, at: 95, df: 125, sa: 45, sd: 75, sp: 95},
    weightkg: 42.5,
    abilities: {0: 'Hyper Cutter'},
  },
  Grotle: {
    types: ['Grass'],
    bs: {hp: 75, at: 89, df: 85, sa: 55, sd: 65, sp: 36},
    weightkg: 97,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Happiny: {
    types: ['Normal'],
    bs: {hp: 100, at: 5, df: 5, sa: 15, sd: 65, sp: 30},
    weightkg: 24.4,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  Heatran: {
    types: ['Fire', 'Steel'],
    bs: {hp: 91, at: 90, df: 106, sa: 130, sd: 106, sp: 77},
    weightkg: 430,
    abilities: {0: 'Flash Fire'},
  },
  Hippopotas: {
    types: ['Ground'],
    bs: {hp: 68, at: 72, df: 78, sa: 38, sd: 42, sp: 32},
    weightkg: 49.5,
    nfe: true,
    abilities: {0: 'Sand Stream'},
  },
  Hippowdon: {
    types: ['Ground'],
    bs: {hp: 108, at: 112, df: 118, sa: 68, sd: 72, sp: 47},
    weightkg: 300,
    abilities: {0: 'Sand Stream'},
  },
  Honchkrow: {
    types: ['Dark', 'Flying'],
    bs: {hp: 100, at: 125, df: 52, sa: 105, sd: 52, sp: 71},
    weightkg: 27.3,
    abilities: {0: 'Insomnia'},
  },
  Infernape: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 76, at: 104, df: 71, sa: 104, sd: 71, sp: 108},
    weightkg: 55,
    abilities: {0: 'Blaze'},
  },
  Kitsunoh: {
    types: ['Ghost', 'Steel'],
    bs: {hp: 80, at: 103, df: 85, sa: 55, sd: 80, sp: 110},
    weightkg: 51,
    abilities: {0: 'Frisk'},
  },
  Kricketot: {
    types: ['Bug'],
    bs: {hp: 37, at: 25, df: 41, sa: 25, sd: 41, sp: 25},
    weightkg: 2.2,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Kricketune: {
    types: ['Bug'],
    bs: {hp: 77, at: 85, df: 51, sa: 55, sd: 51, sp: 65},
    weightkg: 25.5,
    abilities: {0: 'Swarm'},
  },
  Krilowatt: {
    types: ['Electric', 'Water'],
    bs: {hp: 151, at: 84, df: 73, sa: 83, sd: 74, sp: 105},
    weightkg: 10.6,
    abilities: {0: 'Trace'},
  },
  Leafeon: {
    types: ['Grass'],
    bs: {hp: 65, at: 110, df: 130, sa: 60, sd: 65, sp: 95},
    weightkg: 25.5,
    abilities: {0: 'Leaf Guard'},
  },
  Lickilicky: {
    types: ['Normal'],
    bs: {hp: 110, at: 85, df: 95, sa: 80, sd: 95, sp: 50},
    weightkg: 140,
    abilities: {0: 'Own Tempo'},
  },
  Lopunny: {
    types: ['Normal'],
    bs: {hp: 65, at: 76, df: 84, sa: 54, sd: 96, sp: 105},
    weightkg: 33.3,
    abilities: {0: 'Cute Charm'},
  },
  Lucario: {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 110, df: 70, sa: 115, sd: 70, sp: 90},
    weightkg: 54,
    abilities: {0: 'Steadfast'},
  },
  Lumineon: {
    types: ['Water'],
    bs: {hp: 69, at: 69, df: 76, sa: 69, sd: 86, sp: 91},
    weightkg: 24,
    abilities: {0: 'Swift Swim'},
  },
  Luxio: {
    types: ['Electric'],
    bs: {hp: 60, at: 85, df: 49, sa: 60, sd: 49, sp: 60},
    weightkg: 30.5,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Luxray: {
    types: ['Electric'],
    bs: {hp: 80, at: 120, df: 79, sa: 95, sd: 79, sp: 70},
    weightkg: 42,
    abilities: {0: 'Rivalry'},
  },
  Magmortar: {
    types: ['Fire'],
    bs: {hp: 75, at: 95, df: 67, sa: 125, sd: 95, sp: 83},
    weightkg: 68,
    abilities: {0: 'Flame Body'},
  },
  Magnezone: {
    types: ['Electric', 'Steel'],
    bs: {hp: 70, at: 70, df: 115, sa: 130, sd: 90, sp: 60},
    weightkg: 180,
    gender: 'N',
    abilities: {0: 'Magnet Pull'},
  },
  Mamoswine: {
    types: ['Ice', 'Ground'],
    bs: {hp: 110, at: 130, df: 80, sa: 70, sd: 60, sp: 80},
    weightkg: 291,
    abilities: {0: 'Oblivious'},
  },
  Manaphy: {
    types: ['Water'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 1.4,
    gender: 'N',
    abilities: {0: 'Hydration'},
  },
  Mantyke: {
    types: ['Water', 'Flying'],
    bs: {hp: 45, at: 20, df: 50, sa: 60, sd: 120, sp: 50},
    weightkg: 65,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Mesprit: {
    types: ['Psychic'],
    bs: {hp: 80, at: 105, df: 105, sa: 105, sd: 105, sp: 80},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  'Mime Jr.': {
    types: ['Psychic'],
    bs: {hp: 20, at: 25, df: 45, sa: 70, sd: 90, sp: 60},
    weightkg: 13,
    nfe: true,
    abilities: {0: 'Soundproof'},
  },
  Mismagius: {
    types: ['Ghost'],
    bs: {hp: 60, at: 60, df: 60, sa: 105, sd: 105, sp: 105},
    weightkg: 4.4,
    abilities: {0: 'Levitate'},
  },
  Monferno: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 64, at: 78, df: 52, sa: 78, sd: 52, sp: 81},
    weightkg: 22,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Monohm: {
    types: ['Electric'],
    bs: {hp: 53, at: 40, df: 58, sa: 67, sd: 55, sp: 55},
    weightkg: 4.1,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Mothim: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 94, df: 50, sa: 94, sd: 50, sp: 66},
    weightkg: 23.3,
    gender: 'M',
    abilities: {0: 'Swarm'},
  },
  Munchlax: {
    types: ['Normal'],
    bs: {hp: 135, at: 85, df: 40, sa: 40, sd: 85, sp: 5},
    weightkg: 105,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
  Nohface: {
    types: ['Ghost'],
    bs: {hp: 50, at: 73, df: 50, sa: 30, sd: 50, sp: 80},
    weightkg: 5.9,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Pachirisu: {
    types: ['Electric'],
    bs: {hp: 60, at: 45, df: 70, sa: 45, sd: 90, sp: 95},
    weightkg: 3.9,
    abilities: {0: 'Run Away'},
  },
  Palkia: {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 120, df: 100, sa: 150, sd: 120, sp: 100},
    weightkg: 336,
    gender: 'N',
    abilities: {0: 'Pressure'},
  },
  Phione: {
    types: ['Water'],
    bs: {hp: 80, at: 80, df: 80, sa: 80, sd: 80, sp: 80},
    weightkg: 3.1,
    gender: 'N',
    abilities: {0: 'Hydration'},
  },
  'Pichu-Spiky-eared': {
    types: ['Electric'],
    bs: {hp: 20, at: 40, df: 15, sa: 35, sd: 35, sp: 60},
    weightkg: 2,
    abilities: {0: 'Static'},
    baseSpecies: 'Pichu',
  },
  Piplup: {
    types: ['Water'],
    bs: {hp: 53, at: 51, df: 53, sa: 61, sd: 56, sp: 40},
    weightkg: 5.2,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  'Porygon-Z': {
    types: ['Normal'],
    bs: {hp: 85, at: 80, df: 70, sa: 135, sd: 75, sp: 90},
    weightkg: 34,
    gender: 'N',
    abilities: {0: 'Adaptability'},
  },
  Prinplup: {
    types: ['Water'],
    bs: {hp: 64, at: 66, df: 68, sa: 81, sd: 76, sp: 50},
    weightkg: 23,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Privatyke: {
    types: ['Water', 'Fighting'],
    bs: {hp: 65, at: 75, df: 65, sa: 40, sd: 60, sp: 45},
    weightkg: 35,
    nfe: true,
    abilities: {0: 'Unaware'},
  },
  Probopass: {
    types: ['Rock', 'Steel'],
    bs: {hp: 60, at: 55, df: 145, sa: 75, sd: 150, sp: 40},
    weightkg: 340,
    abilities: {0: 'Sturdy'},
  },
  Protowatt: {
    types: ['Electric', 'Water'],
    bs: {hp: 51, at: 44, df: 33, sa: 43, sd: 34, sp: 65},
    weightkg: 0.1,
    nfe: true,
    abilities: {0: 'Trace'},
  },
  Purugly: {
    types: ['Normal'],
    bs: {hp: 71, at: 82, df: 64, sa: 64, sd: 59, sp: 112},
    weightkg: 43.8,
    abilities: {0: 'Thick Fat'},
  },
  Pyroak: {
    types: ['Fire', 'Grass'],
    bs: {hp: 120, at: 70, df: 105, sa: 95, sd: 90, sp: 60},
    weightkg: 168,
    abilities: {0: 'Rock Head'},
  },
  Rampardos: {
    types: ['Rock'],
    bs: {hp: 97, at: 165, df: 60, sa: 65, sd: 50, sp: 58},
    weightkg: 102.5,
    abilities: {0: 'Mold Breaker'},
  },
  Rebble: {
    types: ['Rock'],
    bs: {hp: 45, at: 25, df: 65, sa: 75, sd: 55, sp: 80},
    weightkg: 7,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Regigigas: {
    types: ['Normal'],
    bs: {hp: 110, at: 160, df: 110, sa: 80, sd: 110, sp: 100},
    weightkg: 420,
    gender: 'N',
    abilities: {0: 'Slow Start'},
  },
  Revenankh: {
    types: ['Ghost', 'Fighting'],
    bs: {hp: 90, at: 105, df: 90, sa: 65, sd: 110, sp: 65},
    weightkg: 44,
    abilities: {0: 'Air Lock'},
  },
  Rhyperior: {
    types: ['Ground', 'Rock'],
    bs: {hp: 115, at: 140, df: 130, sa: 55, sd: 55, sp: 40},
    weightkg: 282.8,
    abilities: {0: 'Lightning Rod'},
  },
  Riolu: {
    types: ['Fighting'],
    bs: {hp: 40, at: 70, df: 40, sa: 35, sd: 40, sp: 60},
    weightkg: 20.2,
    nfe: true,
    abilities: {0: 'Steadfast'},
  },
  Roserade: {
    types: ['Grass', 'Poison'],
    bs: {hp: 60, at: 70, df: 55, sa: 125, sd: 105, sp: 90},
    weightkg: 14.5,
    abilities: {0: 'Natural Cure'},
  },
  Rotom: {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 50, df: 77, sa: 95, sd: 77, sp: 91},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
    otherFormes: ['Rotom-Fan', 'Rotom-Frost', 'Rotom-Heat', 'Rotom-Mow', 'Rotom-Wash'],
  },
  'Rotom-Mow': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Rotom',
  },
  'Rotom-Frost': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Rotom',
  },
  'Rotom-Heat': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Rotom',
  },
  'Rotom-Fan': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Rotom',
  },
  'Rotom-Wash': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Rotom',
  },
  Shaymin: {
    types: ['Grass'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 2.1,
    gender: 'N',
    abilities: {0: 'Natural Cure'},
    otherFormes: ['Shaymin-Sky'],
  },
  'Shaymin-Sky': {
    types: ['Grass', 'Flying'],
    bs: {hp: 100, at: 103, df: 75, sa: 120, sd: 75, sp: 127},
    weightkg: 5.2,
    gender: 'N',
    abilities: {0: 'Serene Grace'},
    baseSpecies: 'Shaymin',
  },
  Shellos: {
    types: ['Water'],
    bs: {hp: 76, at: 48, df: 48, sa: 57, sd: 62, sp: 34},
    weightkg: 6.3,
    nfe: true,
    abilities: {0: 'Sticky Hold'},
  },
  Shieldon: {
    types: ['Rock', 'Steel'],
    bs: {hp: 30, at: 42, df: 118, sa: 42, sd: 88, sp: 30},
    weightkg: 57,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Shinx: {
    types: ['Electric'],
    bs: {hp: 45, at: 65, df: 34, sa: 40, sd: 34, sp: 45},
    weightkg: 9.5,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Skorupi: {
    types: ['Poison', 'Bug'],
    bs: {hp: 40, at: 50, df: 90, sa: 30, sd: 55, sp: 65},
    weightkg: 12,
    nfe: true,
    abilities: {0: 'Battle Armor'},
  },
  Skuntank: {
    types: ['Poison', 'Dark'],
    bs: {hp: 103, at: 93, df: 67, sa: 71, sd: 61, sp: 84},
    weightkg: 38,
    abilities: {0: 'Stench'},
  },
  Snover: {
    types: ['Grass', 'Ice'],
    bs: {hp: 60, at: 62, df: 50, sa: 62, sd: 60, sp: 40},
    weightkg: 50.5,
    nfe: true,
    abilities: {0: 'Snow Warning'},
  },
  Spiritomb: {
    types: ['Ghost', 'Dark'],
    bs: {hp: 50, at: 92, df: 108, sa: 92, sd: 108, sp: 35},
    weightkg: 108,
    abilities: {0: 'Pressure'},
  },
  Staraptor: {
    types: ['Normal', 'Flying'],
    bs: {hp: 85, at: 120, df: 70, sa: 50, sd: 50, sp: 100},
    weightkg: 24.9,
    abilities: {0: 'Intimidate'},
  },
  Staravia: {
    types: ['Normal', 'Flying'],
    bs: {hp: 55, at: 75, df: 50, sa: 40, sd: 40, sp: 80},
    weightkg: 15.5,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Starly: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 55, df: 30, sa: 30, sd: 30, sp: 60},
    weightkg: 2,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Stratagem: {
    types: ['Rock'],
    bs: {hp: 90, at: 60, df: 65, sa: 120, sd: 70, sp: 130},
    weightkg: 45,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Stunky: {
    types: ['Poison', 'Dark'],
    bs: {hp: 63, at: 63, df: 47, sa: 41, sd: 41, sp: 74},
    weightkg: 19.2,
    nfe: true,
    abilities: {0: 'Stench'},
  },
  Syclant: {
    types: ['Ice', 'Bug'],
    bs: {hp: 70, at: 116, df: 70, sa: 114, sd: 64, sp: 121},
    weightkg: 52,
    abilities: {0: 'Compound Eyes'},
  },
  Syclar: {
    types: ['Ice', 'Bug'],
    bs: {hp: 40, at: 76, df: 45, sa: 74, sd: 39, sp: 91},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Compound Eyes'},
  },
  Tactite: {
    types: ['Rock'],
    bs: {hp: 70, at: 40, df: 65, sa: 100, sd: 65, sp: 95},
    weightkg: 16,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Tangrowth: {
    types: ['Grass'],
    bs: {hp: 100, at: 100, df: 125, sa: 110, sd: 50, sp: 50},
    weightkg: 128.6,
    abilities: {0: 'Chlorophyll'},
  },
  Togekiss: {
    types: ['Normal', 'Flying'],
    bs: {hp: 85, at: 50, df: 95, sa: 120, sd: 115, sp: 80},
    weightkg: 38,
    abilities: {0: 'Hustle'},
  },
  Torterra: {
    types: ['Grass', 'Ground'],
    bs: {hp: 95, at: 109, df: 105, sa: 75, sd: 85, sp: 56},
    weightkg: 310,
    abilities: {0: 'Overgrow'},
  },
  Toxicroak: {
    types: ['Poison', 'Fighting'],
    bs: {hp: 83, at: 106, df: 65, sa: 86, sd: 65, sp: 85},
    weightkg: 44.4,
    abilities: {0: 'Anticipation'},
  },
  Turtwig: {
    types: ['Grass'],
    bs: {hp: 55, at: 68, df: 64, sa: 45, sd: 55, sp: 31},
    weightkg: 10.2,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Uxie: {
    types: ['Psychic'],
    bs: {hp: 75, at: 75, df: 130, sa: 75, sd: 130, sp: 95},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Vespiquen: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 80, df: 102, sa: 80, sd: 102, sp: 40},
    weightkg: 38.5,
    gender: 'F',
    abilities: {0: 'Pressure'},
  },
  Voodoll: {
    types: ['Normal', 'Dark'],
    bs: {hp: 55, at: 40, df: 55, sa: 75, sd: 50, sp: 70},
    weightkg: 25,
    nfe: true,
    abilities: {0: 'Volt Absorb'},
  },
  Voodoom: {
    types: ['Fighting', 'Dark'],
    bs: {hp: 90, at: 85, df: 80, sa: 105, sd: 80, sp: 110},
    weightkg: 75.5,
    abilities: {0: 'Volt Absorb'},
  },
  Weavile: {
    types: ['Dark', 'Ice'],
    bs: {hp: 70, at: 120, df: 65, sa: 45, sd: 85, sp: 125},
    weightkg: 34,
    abilities: {0: 'Pressure'},
  },
  Wormadam: {
    types: ['Bug', 'Grass'],
    bs: {hp: 60, at: 59, df: 85, sa: 79, sd: 105, sp: 36},
    weightkg: 6.5,
    gender: 'F',
    abilities: {0: 'Anticipation'},
    otherFormes: ['Wormadam-Sandy', 'Wormadam-Trash'],
  },
  'Wormadam-Sandy': {
    types: ['Bug', 'Ground'],
    bs: {hp: 60, at: 79, df: 105, sa: 59, sd: 85, sp: 36},
    weightkg: 6.5,
    gender: 'F',
    abilities: {0: 'Anticipation'},
    baseSpecies: 'Wormadam',
  },
  'Wormadam-Trash': {
    types: ['Bug', 'Steel'],
    bs: {hp: 60, at: 69, df: 95, sa: 69, sd: 95, sp: 36},
    weightkg: 6.5,
    gender: 'F',
    abilities: {0: 'Anticipation'},
    baseSpecies: 'Wormadam',
  },
  Yanmega: {
    types: ['Bug', 'Flying'],
    bs: {hp: 86, at: 76, df: 86, sa: 116, sd: 56, sp: 95},
    weightkg: 51.5,
    abilities: {0: 'Speed Boost'},
  },
};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Rotom-Fan': {types: ['Electric', 'Flying']},
  'Rotom-Frost': {types: ['Electric', 'Ice']},
  'Rotom-Heat': {types: ['Electric', 'Fire']},
  'Rotom-Mow': {types: ['Electric', 'Grass']},
  'Rotom-Wash': {types: ['Electric', 'Water']},
  Accelgor: {
    types: ['Bug'],
    bs: {hp: 80, at: 70, df: 40, sa: 100, sd: 60, sp: 145},
    weightkg: 25.3,
    abilities: {0: 'Hydration'},
  },
  Alomomola: {
    types: ['Water'],
    bs: {hp: 165, at: 75, df: 80, sa: 40, sd: 45, sp: 65},
    weightkg: 31.6,
    abilities: {0: 'Healer'},
  },
  Amoonguss: {
    types: ['Grass', 'Poison'],
    bs: {hp: 114, at: 85, df: 70, sa: 85, sd: 80, sp: 30},
    weightkg: 10.5,
    abilities: {0: 'Effect Spore'},
  },
  Archen: {
    types: ['Rock', 'Flying'],
    bs: {hp: 55, at: 112, df: 45, sa: 74, sd: 45, sp: 70},
    weightkg: 9.5,
    nfe: true,
    abilities: {0: 'Defeatist'},
  },
  Archeops: {
    types: ['Rock', 'Flying'],
    bs: {hp: 75, at: 140, df: 65, sa: 112, sd: 65, sp: 110},
    weightkg: 32,
    abilities: {0: 'Defeatist'},
  },
  Argalis: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 60, at: 90, df: 89, sa: 87, sd: 40, sp: 54},
    weightkg: 341.4,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Audino: {
    types: ['Normal'],
    bs: {hp: 103, at: 60, df: 86, sa: 60, sd: 86, sp: 50},
    weightkg: 31,
    abilities: {0: 'Healer'},
  },
  Aurumoth: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 110, at: 120, df: 99, sa: 117, sd: 60, sp: 94},
    weightkg: 193,
    abilities: {0: 'Weak Armor'},
  },
  Axew: {
    types: ['Dragon'],
    bs: {hp: 46, at: 87, df: 60, sa: 30, sd: 40, sp: 57},
    weightkg: 18,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Basculin: {
    types: ['Water'],
    bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 98},
    weightkg: 18,
    abilities: {0: 'Reckless'},
    otherFormes: ['Basculin-Blue-Striped'],
  },
  'Basculin-Blue-Striped': {
    types: ['Water'],
    bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 98},
    weightkg: 18,
    abilities: {0: 'Rock Head'},
    baseSpecies: 'Basculin',
  },
  Beartic: {
    types: ['Ice'],
    bs: {hp: 95, at: 110, df: 80, sa: 70, sd: 80, sp: 50},
    weightkg: 260,
    abilities: {0: 'Snow Cloak'},
  },
  Beheeyem: {
    types: ['Psychic'],
    bs: {hp: 75, at: 75, df: 75, sa: 125, sd: 95, sp: 40},
    weightkg: 34.5,
    abilities: {0: 'Telepathy'},
  },
  Bisharp: {
    types: ['Dark', 'Steel'],
    bs: {hp: 65, at: 125, df: 100, sa: 60, sd: 70, sp: 70},
    weightkg: 70,
    abilities: {0: 'Defiant'},
  },
  Blitzle: {
    types: ['Electric'],
    bs: {hp: 45, at: 60, df: 32, sa: 50, sd: 32, sp: 76},
    weightkg: 29.8,
    nfe: true,
    abilities: {0: 'Lightning Rod'},
  },
  Boldore: {
    types: ['Rock'],
    bs: {hp: 70, at: 105, df: 105, sa: 50, sd: 40, sp: 20},
    weightkg: 102,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Bouffalant: {
    types: ['Normal'],
    bs: {hp: 95, at: 110, df: 95, sa: 40, sd: 95, sp: 55},
    weightkg: 94.6,
    abilities: {0: 'Reckless'},
  },
  Brattler: {
    types: ['Dark', 'Grass'],
    bs: {hp: 80, at: 70, df: 40, sa: 20, sd: 90, sp: 30},
    weightkg: 11.5,
    nfe: true,
    abilities: {0: 'Harvest'},
  },
  Braviary: {
    types: ['Normal', 'Flying'],
    bs: {hp: 100, at: 123, df: 75, sa: 57, sd: 75, sp: 80},
    weightkg: 41,
    gender: 'M',
    abilities: {0: 'Keen Eye'},
  },
  Carracosta: {
    types: ['Water', 'Rock'],
    bs: {hp: 74, at: 108, df: 133, sa: 83, sd: 65, sp: 32},
    weightkg: 81,
    abilities: {0: 'Solid Rock'},
  },
  Cawdet: {
    types: ['Steel', 'Flying'],
    bs: {hp: 35, at: 72, df: 85, sa: 40, sd: 55, sp: 88},
    weightkg: 25,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Cawmodore: {
    types: ['Steel', 'Flying'],
    bs: {hp: 50, at: 92, df: 130, sa: 65, sd: 75, sp: 118},
    weightkg: 37,
    abilities: {0: 'Intimidate'},
  },
  Chandelure: {
    types: ['Ghost', 'Fire'],
    bs: {hp: 60, at: 55, df: 90, sa: 145, sd: 90, sp: 80},
    weightkg: 34.3,
    abilities: {0: 'Flash Fire'},
  },
  Cinccino: {
    types: ['Normal'],
    bs: {hp: 75, at: 95, df: 60, sa: 65, sd: 60, sp: 115},
    weightkg: 7.5,
    abilities: {0: 'Cute Charm'},
  },
  Cobalion: {
    types: ['Steel', 'Fighting'],
    bs: {hp: 91, at: 90, df: 129, sa: 90, sd: 72, sp: 108},
    weightkg: 250,
    gender: 'N',
    abilities: {0: 'Justified'},
  },
  Cofagrigus: {
    types: ['Ghost'],
    bs: {hp: 58, at: 50, df: 145, sa: 95, sd: 105, sp: 30},
    weightkg: 76.5,
    abilities: {0: 'Mummy'},
  },
  Conkeldurr: {
    types: ['Fighting'],
    bs: {hp: 105, at: 140, df: 95, sa: 55, sd: 65, sp: 45},
    weightkg: 87,
    abilities: {0: 'Guts'},
  },
  Cottonee: {
    types: ['Grass'],
    bs: {hp: 40, at: 27, df: 60, sa: 37, sd: 50, sp: 66},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Prankster'},
  },
  Crustle: {
    types: ['Bug', 'Rock'],
    bs: {hp: 70, at: 95, df: 125, sa: 65, sd: 75, sp: 45},
    weightkg: 200,
    abilities: {0: 'Sturdy'},
  },
  Cryogonal: {
    types: ['Ice'],
    bs: {hp: 70, at: 50, df: 30, sa: 95, sd: 135, sp: 105},
    weightkg: 148,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Cubchoo: {
    types: ['Ice'],
    bs: {hp: 55, at: 70, df: 40, sa: 60, sd: 40, sp: 40},
    weightkg: 8.5,
    nfe: true,
    abilities: {0: 'Snow Cloak'},
  },
  Cupra: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 50, at: 60, df: 49, sa: 67, sd: 30, sp: 44},
    weightkg: 4.8,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Darmanitan: {
    types: ['Fire'],
    bs: {hp: 105, at: 140, df: 55, sa: 30, sd: 55, sp: 95},
    weightkg: 92.9,
    abilities: {0: 'Sheer Force'},
    otherFormes: ['Darmanitan-Zen'],
  },
  'Darmanitan-Zen': {
    types: ['Fire', 'Psychic'],
    bs: {hp: 105, at: 30, df: 105, sa: 140, sd: 105, sp: 55},
    weightkg: 92.9,
    baseSpecies: 'Darmanitan',
    abilities: {0: 'Zen Mode'},
  },
  Darumaka: {
    types: ['Fire'],
    bs: {hp: 70, at: 90, df: 45, sa: 15, sd: 45, sp: 50},
    weightkg: 37.5,
    nfe: true,
    abilities: {0: 'Hustle'},
  },
  Deerling: {
    types: ['Normal', 'Grass'],
    bs: {hp: 60, at: 60, df: 50, sa: 40, sd: 50, sp: 75},
    weightkg: 19.5,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Deino: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 52, at: 65, df: 50, sa: 45, sd: 50, sp: 38},
    weightkg: 17.3,
    nfe: true,
    abilities: {0: 'Hustle'},
  },
  Dewott: {
    types: ['Water'],
    bs: {hp: 75, at: 75, df: 60, sa: 83, sd: 60, sp: 60},
    weightkg: 24.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Drilbur: {
    types: ['Ground'],
    bs: {hp: 60, at: 85, df: 40, sa: 30, sd: 45, sp: 68},
    weightkg: 8.5,
    nfe: true,
    abilities: {0: 'Sand Rush'},
  },
  Druddigon: {
    types: ['Dragon'],
    bs: {hp: 77, at: 120, df: 90, sa: 60, sd: 90, sp: 48},
    weightkg: 139,
    abilities: {0: 'Rough Skin'},
  },
  Ducklett: {
    types: ['Water', 'Flying'],
    bs: {hp: 62, at: 44, df: 50, sa: 44, sd: 50, sp: 55},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Duosion: {
    types: ['Psychic'],
    bs: {hp: 65, at: 40, df: 50, sa: 125, sd: 60, sp: 30},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Overcoat'},
  },
  Durant: {
    types: ['Bug', 'Steel'],
    bs: {hp: 58, at: 109, df: 112, sa: 48, sd: 48, sp: 109},
    weightkg: 33,
    abilities: {0: 'Swarm'},
  },
  Dwebble: {
    types: ['Bug', 'Rock'],
    bs: {hp: 50, at: 65, df: 85, sa: 35, sd: 35, sp: 55},
    weightkg: 14.5,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Eelektrik: {
    types: ['Electric'],
    bs: {hp: 65, at: 85, df: 70, sa: 75, sd: 70, sp: 40},
    weightkg: 22,
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Eelektross: {
    types: ['Electric'],
    bs: {hp: 85, at: 115, df: 80, sa: 105, sd: 80, sp: 50},
    weightkg: 80.5,
    abilities: {0: 'Levitate'},
  },
  Elgyem: {
    types: ['Psychic'],
    bs: {hp: 55, at: 55, df: 55, sa: 85, sd: 55, sp: 30},
    weightkg: 9,
    nfe: true,
    abilities: {0: 'Telepathy'},
  },
  Emboar: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 110, at: 123, df: 65, sa: 100, sd: 65, sp: 65},
    weightkg: 150,
    abilities: {0: 'Blaze'},
  },
  Emolga: {
    types: ['Electric', 'Flying'],
    bs: {hp: 55, at: 75, df: 60, sa: 75, sd: 60, sp: 103},
    weightkg: 5,
    abilities: {0: 'Static'},
  },
  Escavalier: {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 135, df: 105, sa: 60, sd: 105, sp: 20},
    weightkg: 33,
    abilities: {0: 'Swarm'},
  },
  Excadrill: {
    types: ['Ground', 'Steel'],
    bs: {hp: 110, at: 135, df: 60, sa: 50, sd: 65, sp: 88},
    weightkg: 40.4,
    abilities: {0: 'Sand Rush'},
  },
  Ferroseed: {
    types: ['Grass', 'Steel'],
    bs: {hp: 44, at: 50, df: 91, sa: 24, sd: 86, sp: 10},
    weightkg: 18.8,
    nfe: true,
    abilities: {0: 'Iron Barbs'},
  },
  Ferrothorn: {
    types: ['Grass', 'Steel'],
    bs: {hp: 74, at: 94, df: 131, sa: 54, sd: 116, sp: 20},
    weightkg: 110,
    abilities: {0: 'Iron Barbs'},
  },
  Foongus: {
    types: ['Grass', 'Poison'],
    bs: {hp: 69, at: 55, df: 45, sa: 55, sd: 55, sp: 15},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Effect Spore'},
  },
  Fraxure: {
    types: ['Dragon'],
    bs: {hp: 66, at: 117, df: 70, sa: 40, sd: 50, sp: 67},
    weightkg: 36,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Frillish: {
    types: ['Water', 'Ghost'],
    bs: {hp: 55, at: 40, df: 50, sa: 65, sd: 85, sp: 40},
    weightkg: 33,
    nfe: true,
    abilities: {0: 'Water Absorb'},
  },
  Galvantula: {
    types: ['Bug', 'Electric'],
    bs: {hp: 70, at: 77, df: 60, sa: 97, sd: 60, sp: 108},
    weightkg: 14.3,
    abilities: {0: 'Compound Eyes'},
  },
  Garbodor: {
    types: ['Poison'],
    bs: {hp: 80, at: 95, df: 82, sa: 60, sd: 82, sp: 75},
    weightkg: 107.3,
    abilities: {0: 'Stench'},
  },
  Genesect: {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    gender: 'N',
    abilities: {0: 'Download'},
    otherFormes: ['Genesect-Burn', 'Genesect-Chill', 'Genesect-Douse', 'Genesect-Shock'],
  },
  'Genesect-Burn': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    gender: 'N',
    abilities: {0: 'Download'},
    baseSpecies: 'Genesect',
  },
  'Genesect-Chill': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    gender: 'N',
    abilities: {0: 'Download'},
    baseSpecies: 'Genesect',
  },
  'Genesect-Douse': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    gender: 'N',
    abilities: {0: 'Download'},
    baseSpecies: 'Genesect',
  },
  'Genesect-Shock': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    gender: 'N',
    abilities: {0: 'Download'},
    baseSpecies: 'Genesect',
  },
  Gigalith: {
    types: ['Rock'],
    bs: {hp: 85, at: 135, df: 130, sa: 60, sd: 70, sp: 25},
    weightkg: 260,
    abilities: {0: 'Sturdy'},
  },
  Golett: {
    types: ['Ground', 'Ghost'],
    bs: {hp: 59, at: 74, df: 50, sa: 35, sd: 50, sp: 35},
    weightkg: 92,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Iron Fist'},
  },
  Golurk: {
    types: ['Ground', 'Ghost'],
    bs: {hp: 89, at: 124, df: 80, sa: 55, sd: 80, sp: 55},
    weightkg: 330,
    gender: 'N',
    abilities: {0: 'Iron Fist'},
  },
  Gothita: {
    types: ['Psychic'],
    bs: {hp: 45, at: 30, df: 50, sa: 55, sd: 65, sp: 45},
    weightkg: 5.8,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Gothitelle: {
    types: ['Psychic'],
    bs: {hp: 70, at: 55, df: 95, sa: 95, sd: 110, sp: 65},
    weightkg: 44,
    abilities: {0: 'Frisk'},
  },
  Gothorita: {
    types: ['Psychic'],
    bs: {hp: 60, at: 45, df: 70, sa: 75, sd: 85, sp: 55},
    weightkg: 18,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Gurdurr: {
    types: ['Fighting'],
    bs: {hp: 85, at: 105, df: 85, sa: 40, sd: 50, sp: 40},
    weightkg: 40,
    nfe: true,
    abilities: {0: 'Guts'},
  },
  Haxorus: {
    types: ['Dragon'],
    bs: {hp: 76, at: 147, df: 90, sa: 60, sd: 70, sp: 97},
    weightkg: 105.5,
    abilities: {0: 'Rivalry'},
  },
  Heatmor: {
    types: ['Fire'],
    bs: {hp: 85, at: 97, df: 66, sa: 105, sd: 66, sp: 65},
    weightkg: 58,
    abilities: {0: 'Gluttony'},
  },
  Herdier: {
    types: ['Normal'],
    bs: {hp: 65, at: 80, df: 65, sa: 35, sd: 65, sp: 60},
    weightkg: 14.7,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Hydreigon: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 92, at: 105, df: 90, sa: 125, sd: 90, sp: 98},
    weightkg: 160,
    abilities: {0: 'Levitate'},
  },
  Jellicent: {
    types: ['Water', 'Ghost'],
    bs: {hp: 100, at: 60, df: 70, sa: 85, sd: 105, sp: 60},
    weightkg: 135,
    abilities: {0: 'Water Absorb'},
  },
  Joltik: {
    types: ['Bug', 'Electric'],
    bs: {hp: 50, at: 47, df: 50, sa: 57, sd: 50, sp: 65},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Compound Eyes'},
  },
  Karrablast: {
    types: ['Bug'],
    bs: {hp: 50, at: 75, df: 45, sa: 40, sd: 45, sp: 60},
    weightkg: 5.9,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Keldeo: {
    types: ['Water', 'Fighting'],
    bs: {hp: 91, at: 72, df: 90, sa: 129, sd: 90, sp: 108},
    weightkg: 48.5,
    gender: 'N',
    abilities: {0: 'Justified'},
    otherFormes: ['Keldeo-Resolute'],
  },
  'Keldeo-Resolute': {
    types: ['Water', 'Fighting'],
    bs: {hp: 91, at: 72, df: 90, sa: 129, sd: 90, sp: 108},
    weightkg: 48.5,
    gender: 'N',
    abilities: {0: 'Justified'},
    baseSpecies: 'Keldeo',
  },
  Klang: {
    types: ['Steel'],
    bs: {hp: 60, at: 80, df: 95, sa: 70, sd: 85, sp: 50},
    weightkg: 51,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Plus'},
  },
  Klink: {
    types: ['Steel'],
    bs: {hp: 40, at: 55, df: 70, sa: 45, sd: 60, sp: 30},
    weightkg: 21,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Plus'},
  },
  Klinklang: {
    types: ['Steel'],
    bs: {hp: 60, at: 100, df: 115, sa: 70, sd: 85, sp: 90},
    weightkg: 81,
    gender: 'N',
    abilities: {0: 'Plus'},
  },
  Krokorok: {
    types: ['Ground', 'Dark'],
    bs: {hp: 60, at: 82, df: 45, sa: 45, sd: 45, sp: 74},
    weightkg: 33.4,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Krookodile: {
    types: ['Ground', 'Dark'],
    bs: {hp: 95, at: 117, df: 70, sa: 65, sd: 70, sp: 92},
    weightkg: 96.3,
    abilities: {0: 'Intimidate'},
  },
  Kyurem: {
    types: ['Dragon', 'Ice'],
    bs: {hp: 125, at: 130, df: 90, sa: 130, sd: 90, sp: 95},
    weightkg: 325,
    gender: 'N',
    abilities: {0: 'Pressure'},
    otherFormes: ['Kyurem-Black', 'Kyurem-White'],
  },
  'Kyurem-Black': {
    types: ['Dragon', 'Ice'],
    bs: {hp: 125, at: 170, df: 100, sa: 120, sd: 90, sp: 95},
    weightkg: 325,
    gender: 'N',
    abilities: {0: 'Teravolt'},
    baseSpecies: 'Kyurem',
  },
  'Kyurem-White': {
    types: ['Dragon', 'Ice'],
    bs: {hp: 125, at: 120, df: 90, sa: 170, sd: 100, sp: 95},
    weightkg: 325,
    gender: 'N',
    abilities: {0: 'Turboblaze'},
    baseSpecies: 'Kyurem',
  },
  Lampent: {
    types: ['Ghost', 'Fire'],
    bs: {hp: 60, at: 40, df: 60, sa: 95, sd: 60, sp: 55},
    weightkg: 13,
    nfe: true,
    abilities: {0: 'Flash Fire'},
  },
  Landorus: {
    types: ['Ground', 'Flying'],
    bs: {hp: 89, at: 125, df: 90, sa: 115, sd: 80, sp: 101},
    weightkg: 68,
    gender: 'M',
    abilities: {0: 'Sand Force'},
    otherFormes: ['Landorus-Therian'],
  },
  'Landorus-Therian': {
    types: ['Ground', 'Flying'],
    bs: {hp: 89, at: 145, df: 90, sa: 105, sd: 80, sp: 91},
    weightkg: 68,
    gender: 'M',
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Landorus',
  },
  Larvesta: {
    types: ['Bug', 'Fire'],
    bs: {hp: 55, at: 85, df: 55, sa: 50, sd: 55, sp: 60},
    weightkg: 28.8,
    nfe: true,
    abilities: {0: 'Flame Body'},
  },
  Leavanny: {
    types: ['Bug', 'Grass'],
    bs: {hp: 75, at: 103, df: 80, sa: 70, sd: 70, sp: 92},
    weightkg: 20.5,
    abilities: {0: 'Swarm'},
  },
  Liepard: {
    types: ['Dark'],
    bs: {hp: 64, at: 88, df: 50, sa: 88, sd: 50, sp: 106},
    weightkg: 37.5,
    abilities: {0: 'Limber'},
  },
  Lilligant: {
    types: ['Grass'],
    bs: {hp: 70, at: 60, df: 75, sa: 110, sd: 75, sp: 90},
    weightkg: 16.3,
    gender: 'F',
    abilities: {0: 'Chlorophyll'},
  },
  Lillipup: {
    types: ['Normal'],
    bs: {hp: 45, at: 60, df: 45, sa: 25, sd: 45, sp: 55},
    weightkg: 4.1,
    nfe: true,
    abilities: {0: 'Vital Spirit'},
  },
  Litwick: {
    types: ['Ghost', 'Fire'],
    bs: {hp: 50, at: 30, df: 55, sa: 65, sd: 55, sp: 20},
    weightkg: 3.1,
    nfe: true,
    abilities: {0: 'Flash Fire'},
  },
  Malaconda: {
    types: ['Dark', 'Grass'],
    bs: {hp: 115, at: 100, df: 60, sa: 40, sd: 130, sp: 55},
    weightkg: 108.8,
    abilities: {0: 'Harvest'},
  },
  Mandibuzz: {
    types: ['Dark', 'Flying'],
    bs: {hp: 110, at: 65, df: 105, sa: 55, sd: 95, sp: 80},
    weightkg: 39.5,
    gender: 'F',
    abilities: {0: 'Big Pecks'},
  },
  Maractus: {
    types: ['Grass'],
    bs: {hp: 75, at: 86, df: 67, sa: 106, sd: 67, sp: 60},
    weightkg: 28,
    abilities: {0: 'Water Absorb'},
  },
  Meloetta: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 100, at: 77, df: 77, sa: 128, sd: 128, sp: 90},
    weightkg: 6.5,
    gender: 'N',
    abilities: {0: 'Serene Grace'},
    otherFormes: ['Meloetta-Pirouette'],
  },
  'Meloetta-Pirouette': {
    types: ['Normal', 'Fighting'],
    bs: {hp: 100, at: 128, df: 90, sa: 77, sd: 77, sp: 128},
    weightkg: 6.5,
    gender: 'N',
    abilities: {0: 'Serene Grace'},
    baseSpecies: 'Meloetta',
  },
  Mienfoo: {
    types: ['Fighting'],
    bs: {hp: 45, at: 85, df: 50, sa: 55, sd: 50, sp: 65},
    weightkg: 20,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
  Mienshao: {
    types: ['Fighting'],
    bs: {hp: 65, at: 125, df: 60, sa: 95, sd: 60, sp: 105},
    weightkg: 35.5,
    abilities: {0: 'Inner Focus'},
  },
  Minccino: {
    types: ['Normal'],
    bs: {hp: 55, at: 50, df: 40, sa: 40, sd: 40, sp: 75},
    weightkg: 5.8,
    nfe: true,
    abilities: {0: 'Cute Charm'},
  },
  Mollux: {
    types: ['Fire', 'Poison'],
    bs: {hp: 95, at: 45, df: 83, sa: 131, sd: 105, sp: 76},
    weightkg: 41,
    abilities: {0: 'Dry Skin'},
  },
  Munna: {
    types: ['Psychic'],
    bs: {hp: 76, at: 25, df: 45, sa: 67, sd: 55, sp: 24},
    weightkg: 23.3,
    nfe: true,
    abilities: {0: 'Forewarn'},
  },
  Musharna: {
    types: ['Psychic'],
    bs: {hp: 116, at: 55, df: 85, sa: 107, sd: 95, sp: 29},
    weightkg: 60.5,
    abilities: {0: 'Forewarn'},
  },
  Necturine: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 49, at: 55, df: 60, sa: 50, sd: 75, sp: 51},
    weightkg: 1.8,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Anticipation'},
  },
  Necturna: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 64, at: 120, df: 100, sa: 85, sd: 120, sp: 81},
    weightkg: 49.6,
    gender: 'F',
    abilities: {0: 'Forewarn'},
  },
  Oshawott: {
    types: ['Water'],
    bs: {hp: 55, at: 55, df: 45, sa: 63, sd: 45, sp: 45},
    weightkg: 5.9,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Palpitoad: {
    types: ['Water', 'Ground'],
    bs: {hp: 75, at: 65, df: 55, sa: 65, sd: 55, sp: 69},
    weightkg: 17,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Panpour: {
    types: ['Water'],
    bs: {hp: 50, at: 53, df: 48, sa: 53, sd: 48, sp: 64},
    weightkg: 13.5,
    nfe: true,
    abilities: {0: 'Gluttony'},
  },
  Pansage: {
    types: ['Grass'],
    bs: {hp: 50, at: 53, df: 48, sa: 53, sd: 48, sp: 64},
    weightkg: 10.5,
    nfe: true,
    abilities: {0: 'Gluttony'},
  },
  Pansear: {
    types: ['Fire'],
    bs: {hp: 50, at: 53, df: 48, sa: 53, sd: 48, sp: 64},
    weightkg: 11,
    nfe: true,
    abilities: {0: 'Gluttony'},
  },
  Patrat: {
    types: ['Normal'],
    bs: {hp: 45, at: 55, df: 39, sa: 35, sd: 39, sp: 42},
    weightkg: 11.6,
    nfe: true,
    abilities: {0: 'Run Away'},
  },
  Pawniard: {
    types: ['Dark', 'Steel'],
    bs: {hp: 45, at: 85, df: 70, sa: 40, sd: 40, sp: 60},
    weightkg: 10.2,
    nfe: true,
    abilities: {0: 'Defiant'},
  },
  Petilil: {
    types: ['Grass'],
    bs: {hp: 45, at: 35, df: 50, sa: 70, sd: 50, sp: 30},
    weightkg: 6.6,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Pidove: {
    types: ['Normal', 'Flying'],
    bs: {hp: 50, at: 55, df: 50, sa: 36, sd: 30, sp: 43},
    weightkg: 2.1,
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Pignite: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 90, at: 93, df: 55, sa: 70, sd: 55, sp: 55},
    weightkg: 55.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Purrloin: {
    types: ['Dark'],
    bs: {hp: 41, at: 50, df: 37, sa: 50, sd: 37, sp: 66},
    weightkg: 10.1,
    nfe: true,
    abilities: {0: 'Limber'},
  },
  Reshiram: {
    types: ['Dragon', 'Fire'],
    bs: {hp: 100, at: 120, df: 100, sa: 150, sd: 120, sp: 90},
    weightkg: 330,
    gender: 'N',
    abilities: {0: 'Turboblaze'},
  },
  Reuniclus: {
    types: ['Psychic'],
    bs: {hp: 110, at: 65, df: 75, sa: 125, sd: 85, sp: 30},
    weightkg: 20.1,
    abilities: {0: 'Overcoat'},
  },
  Roggenrola: {
    types: ['Rock'],
    bs: {hp: 55, at: 75, df: 85, sa: 25, sd: 25, sp: 15},
    weightkg: 18,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Rufflet: {
    types: ['Normal', 'Flying'],
    bs: {hp: 70, at: 83, df: 50, sa: 37, sd: 50, sp: 60},
    weightkg: 10.5,
    gender: 'M',
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Samurott: {
    types: ['Water'],
    bs: {hp: 95, at: 100, df: 85, sa: 108, sd: 70, sp: 70},
    weightkg: 94.6,
    abilities: {0: 'Torrent'},
  },
  Sandile: {
    types: ['Ground', 'Dark'],
    bs: {hp: 50, at: 72, df: 35, sa: 35, sd: 35, sp: 65},
    weightkg: 15.2,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Sawk: {
    types: ['Fighting'],
    bs: {hp: 75, at: 125, df: 75, sa: 30, sd: 75, sp: 85},
    weightkg: 51,
    gender: 'M',
    abilities: {0: 'Sturdy'},
  },
  Sawsbuck: {
    types: ['Normal', 'Grass'],
    bs: {hp: 80, at: 100, df: 70, sa: 60, sd: 70, sp: 95},
    weightkg: 92.5,
    abilities: {0: 'Chlorophyll'},
  },
  Scolipede: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 90, df: 89, sa: 55, sd: 69, sp: 112},
    weightkg: 200.5,
    abilities: {0: 'Poison Point'},
  },
  Scrafty: {
    types: ['Dark', 'Fighting'],
    bs: {hp: 65, at: 90, df: 115, sa: 45, sd: 115, sp: 58},
    weightkg: 30,
    abilities: {0: 'Shed Skin'},
  },
  Scraggy: {
    types: ['Dark', 'Fighting'],
    bs: {hp: 50, at: 75, df: 70, sa: 35, sd: 70, sp: 48},
    weightkg: 11.8,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Scratchet: {
    types: ['Normal', 'Fighting'],
    bs: {hp: 55, at: 85, df: 80, sa: 20, sd: 70, sp: 40},
    weightkg: 20,
    nfe: true,
    abilities: {0: 'Scrappy'},
  },
  Seismitoad: {
    types: ['Water', 'Ground'],
    bs: {hp: 105, at: 85, df: 75, sa: 85, sd: 75, sp: 74},
    weightkg: 62,
    abilities: {0: 'Swift Swim'},
  },
  Serperior: {
    types: ['Grass'],
    bs: {hp: 75, at: 75, df: 95, sa: 75, sd: 95, sp: 113},
    weightkg: 63,
    abilities: {0: 'Overgrow'},
  },
  Servine: {
    types: ['Grass'],
    bs: {hp: 60, at: 60, df: 75, sa: 60, sd: 75, sp: 83},
    weightkg: 16,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Sewaddle: {
    types: ['Bug', 'Grass'],
    bs: {hp: 45, at: 53, df: 70, sa: 40, sd: 60, sp: 42},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Shelmet: {
    types: ['Bug'],
    bs: {hp: 50, at: 40, df: 85, sa: 40, sd: 65, sp: 25},
    weightkg: 7.7,
    nfe: true,
    abilities: {0: 'Hydration'},
  },
  Sigilyph: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 72, at: 58, df: 80, sa: 103, sd: 80, sp: 97},
    weightkg: 14,
    abilities: {0: 'Wonder Skin'},
  },
  Simipour: {
    types: ['Water'],
    bs: {hp: 75, at: 98, df: 63, sa: 98, sd: 63, sp: 101},
    weightkg: 29,
    abilities: {0: 'Gluttony'},
  },
  Simisage: {
    types: ['Grass'],
    bs: {hp: 75, at: 98, df: 63, sa: 98, sd: 63, sp: 101},
    weightkg: 30.5,
    abilities: {0: 'Gluttony'},
  },
  Simisear: {
    types: ['Fire'],
    bs: {hp: 75, at: 98, df: 63, sa: 98, sd: 63, sp: 101},
    weightkg: 28,
    abilities: {0: 'Gluttony'},
  },
  Snivy: {
    types: ['Grass'],
    bs: {hp: 45, at: 45, df: 55, sa: 45, sd: 55, sp: 63},
    weightkg: 8.1,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Solosis: {
    types: ['Psychic'],
    bs: {hp: 45, at: 30, df: 40, sa: 105, sd: 50, sp: 20},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Overcoat'},
  },
  Stoutland: {
    types: ['Normal'],
    bs: {hp: 85, at: 100, df: 90, sa: 45, sd: 90, sp: 80},
    weightkg: 61,
    abilities: {0: 'Intimidate'},
  },
  Stunfisk: {
    types: ['Ground', 'Electric'],
    bs: {hp: 109, at: 66, df: 84, sa: 81, sd: 99, sp: 32},
    weightkg: 11,
    abilities: {0: 'Static'},
  },
  Swadloon: {
    types: ['Bug', 'Grass'],
    bs: {hp: 55, at: 63, df: 90, sa: 50, sd: 80, sp: 42},
    weightkg: 7.3,
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  Swanna: {
    types: ['Water', 'Flying'],
    bs: {hp: 75, at: 87, df: 63, sa: 87, sd: 63, sp: 98},
    weightkg: 24.2,
    abilities: {0: 'Keen Eye'},
  },
  Swoobat: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 67, at: 57, df: 55, sa: 77, sd: 55, sp: 114},
    weightkg: 10.5,
    abilities: {0: 'Unaware'},
  },
  Tepig: {
    types: ['Fire'],
    bs: {hp: 65, at: 63, df: 45, sa: 45, sd: 45, sp: 45},
    weightkg: 9.9,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Terrakion: {
    types: ['Rock', 'Fighting'],
    bs: {hp: 91, at: 129, df: 90, sa: 72, sd: 90, sp: 108},
    weightkg: 260,
    gender: 'N',
    abilities: {0: 'Justified'},
  },
  Throh: {
    types: ['Fighting'],
    bs: {hp: 120, at: 100, df: 85, sa: 30, sd: 85, sp: 45},
    weightkg: 55.5,
    gender: 'M',
    abilities: {0: 'Guts'},
  },
  Thundurus: {
    types: ['Electric', 'Flying'],
    bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
    weightkg: 61,
    gender: 'M',
    abilities: {0: 'Prankster'},
    otherFormes: ['Thundurus-Therian'],
  },
  'Thundurus-Therian': {
    types: ['Electric', 'Flying'],
    bs: {hp: 79, at: 105, df: 70, sa: 145, sd: 80, sp: 101},
    weightkg: 61,
    gender: 'M',
    abilities: {0: 'Volt Absorb'},
    baseSpecies: 'Thundurus',
  },
  Timburr: {
    types: ['Fighting'],
    bs: {hp: 75, at: 80, df: 55, sa: 25, sd: 35, sp: 35},
    weightkg: 12.5,
    nfe: true,
    abilities: {0: 'Guts'},
  },
  Tirtouga: {
    types: ['Water', 'Rock'],
    bs: {hp: 54, at: 78, df: 103, sa: 53, sd: 45, sp: 22},
    weightkg: 16.5,
    nfe: true,
    abilities: {0: 'Solid Rock'},
  },
  Tomohawk: {
    types: ['Flying', 'Fighting'],
    bs: {hp: 105, at: 60, df: 90, sa: 115, sd: 80, sp: 85},
    weightkg: 37.2,
    abilities: {0: 'Intimidate'},
  },
  Tornadus: {
    types: ['Flying'],
    bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
    weightkg: 63,
    gender: 'M',
    abilities: {0: 'Prankster'},
    otherFormes: ['Tornadus-Therian'],
  },
  'Tornadus-Therian': {
    types: ['Flying'],
    bs: {hp: 79, at: 100, df: 80, sa: 110, sd: 90, sp: 121},
    weightkg: 63,
    gender: 'M',
    abilities: {0: 'Regenerator'},
    baseSpecies: 'Tornadus',
  },
  Tranquill: {
    types: ['Normal', 'Flying'],
    bs: {hp: 62, at: 77, df: 62, sa: 50, sd: 42, sp: 65},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Trubbish: {
    types: ['Poison'],
    bs: {hp: 50, at: 50, df: 62, sa: 40, sd: 62, sp: 65},
    weightkg: 31,
    nfe: true,
    abilities: {0: 'Stench'},
  },
  Tympole: {
    types: ['Water'],
    bs: {hp: 50, at: 50, df: 40, sa: 50, sd: 40, sp: 64},
    weightkg: 4.5,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Tynamo: {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 45, sd: 40, sp: 60},
    weightkg: 0.3,
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Unfezant: {
    types: ['Normal', 'Flying'],
    bs: {hp: 80, at: 105, df: 80, sa: 65, sd: 55, sp: 93},
    weightkg: 29,
    abilities: {0: 'Big Pecks'},
  },
  Vanillish: {
    types: ['Ice'],
    bs: {hp: 51, at: 65, df: 65, sa: 80, sd: 75, sp: 59},
    weightkg: 41,
    nfe: true,
    abilities: {0: 'Ice Body'},
  },
  Vanillite: {
    types: ['Ice'],
    bs: {hp: 36, at: 50, df: 50, sa: 65, sd: 60, sp: 44},
    weightkg: 5.7,
    nfe: true,
    abilities: {0: 'Ice Body'},
  },
  Vanilluxe: {
    types: ['Ice'],
    bs: {hp: 71, at: 95, df: 85, sa: 110, sd: 95, sp: 79},
    weightkg: 57.5,
    abilities: {0: 'Ice Body'},
  },
  Venipede: {
    types: ['Bug', 'Poison'],
    bs: {hp: 30, at: 45, df: 59, sa: 30, sd: 39, sp: 57},
    weightkg: 5.3,
    nfe: true,
    abilities: {0: 'Poison Point'},
  },
  Victini: {
    types: ['Psychic', 'Fire'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 4,
    gender: 'N',
    abilities: {0: 'Victory Star'},
  },
  Virizion: {
    types: ['Grass', 'Fighting'],
    bs: {hp: 91, at: 90, df: 72, sa: 90, sd: 129, sp: 108},
    weightkg: 200,
    gender: 'N',
    abilities: {0: 'Justified'},
  },
  Volcarona: {
    types: ['Bug', 'Fire'],
    bs: {hp: 85, at: 60, df: 65, sa: 135, sd: 105, sp: 100},
    weightkg: 46,
    abilities: {0: 'Flame Body'},
  },
  Vullaby: {
    types: ['Dark', 'Flying'],
    bs: {hp: 70, at: 55, df: 75, sa: 45, sd: 65, sp: 60},
    weightkg: 9,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Watchog: {
    types: ['Normal'],
    bs: {hp: 60, at: 85, df: 69, sa: 60, sd: 69, sp: 77},
    weightkg: 27,
    abilities: {0: 'Illuminate'},
  },
  Whimsicott: {
    types: ['Grass'],
    bs: {hp: 60, at: 67, df: 85, sa: 77, sd: 75, sp: 116},
    weightkg: 6.6,
    abilities: {0: 'Prankster'},
  },
  Whirlipede: {
    types: ['Bug', 'Poison'],
    bs: {hp: 40, at: 55, df: 99, sa: 40, sd: 79, sp: 47},
    weightkg: 58.5,
    nfe: true,
    abilities: {0: 'Poison Point'},
  },
  Woobat: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 55, at: 45, df: 43, sa: 55, sd: 43, sp: 72},
    weightkg: 2.1,
    nfe: true,
    abilities: {0: 'Unaware'},
  },
  Yamask: {
    types: ['Ghost'],
    bs: {hp: 38, at: 30, df: 85, sa: 55, sd: 65, sp: 30},
    weightkg: 1.5,
    abilities: {0: 'Mummy'},
    nfe: true,
  },
  Zebstrika: {
    types: ['Electric'],
    bs: {hp: 75, at: 100, df: 63, sa: 80, sd: 63, sp: 116},
    weightkg: 79.5,
    abilities: {0: 'Lightning Rod'},
  },
  Zekrom: {
    types: ['Dragon', 'Electric'],
    bs: {hp: 100, at: 150, df: 120, sa: 120, sd: 100, sp: 90},
    weightkg: 345,
    gender: 'N',
    abilities: {0: 'Teravolt'},
  },
  Zoroark: {
    types: ['Dark'],
    bs: {hp: 60, at: 105, df: 60, sa: 120, sd: 60, sp: 105},
    weightkg: 81.1,
    abilities: {0: 'Illusion'},
  },
  Zorua: {
    types: ['Dark'],
    bs: {hp: 40, at: 65, df: 40, sa: 80, sd: 40, sp: 65},
    weightkg: 12.5,
    nfe: true,
    abilities: {0: 'Illusion'},
  },
  Zweilous: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 72, at: 85, df: 70, sa: 65, sd: 70, sp: 58},
    weightkg: 50,
    nfe: true,
    abilities: {0: 'Hustle'},
  },
};

const BW: {[name: string]: SpeciesData} = extend(true, {}, DPP, BW_PATCH);

removeAttr(BW, 'Pichu', 'otherFormes');
delete BW['Pichu-Spiky-eared'];

const XY_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Abomasnow: {otherFormes: ['Abomasnow-Mega']},
  Absol: {otherFormes: ['Absol-Mega']},
  Aerodactyl: {otherFormes: ['Aerodactyl-Mega']},
  Aggron: {otherFormes: ['Aggron-Mega']},
  Alakazam: {bs: {sd: 95}, otherFormes: ['Alakazam-Mega']},
  Altaria: {otherFormes: ['Altaria-Mega']},
  Ampharos: {bs: {df: 85}, otherFormes: ['Ampharos-Mega']},
  Arceus: {otherFormes: [
    'Arceus-Bug',
    'Arceus-Dark',
    'Arceus-Dragon',
    'Arceus-Electric',
    'Arceus-Fairy',
    'Arceus-Fighting',
    'Arceus-Fire',
    'Arceus-Flying',
    'Arceus-Ghost',
    'Arceus-Grass',
    'Arceus-Ground',
    'Arceus-Ice',
    'Arceus-Poison',
    'Arceus-Psychic',
    'Arceus-Rock',
    'Arceus-Steel',
    'Arceus-Water',
  ]},
  Audino: {otherFormes: ['Audino-Mega']},
  Azumarill: {types: ['Water', 'Fairy'], bs: {sa: 60}},
  Azurill: {types: ['Normal', 'Fairy']},
  Banette: {otherFormes: ['Banette-Mega']},
  Beautifly: {bs: {sa: 100}},
  Beedrill: {bs: {at: 90}, otherFormes: ['Beedrill-Mega']},
  Bellossom: {bs: {df: 95}},
  Blastoise: {otherFormes: ['Blastoise-Mega']},
  Blaziken: {otherFormes: ['Blaziken-Mega']},
  Butterfree: {bs: {sa: 90}},
  Camerupt: {otherFormes: ['Camerupt-Mega']},
  Charizard: {otherFormes: ['Charizard-Mega-X', 'Charizard-Mega-Y']},
  Clefable: {types: ['Fairy'], bs: {sa: 95}},
  Clefairy: {types: ['Fairy']},
  Cleffa: {types: ['Fairy']},
  Cottonee: {types: ['Grass', 'Fairy']},
  Exploud: {bs: {sd: 73}},
  Gallade: {otherFormes: ['Gallade-Mega']},
  Garchomp: {otherFormes: ['Garchomp-Mega']},
  Gardevoir: {types: ['Psychic', 'Fairy'], otherFormes: ['Gardevoir-Mega']},
  Gengar: {otherFormes: ['Gengar-Mega']},
  Gigalith: {bs: {sd: 80}},
  Glalie: {otherFormes: ['Glalie-Mega']},
  Golem: {bs: {at: 120}},
  Granbull: {types: ['Fairy']},
  Groudon: {otherFormes: ['Groudon-Primal']},
  Gyarados: {otherFormes: ['Gyarados-Mega']},
  Heracross: {otherFormes: ['Heracross-Mega']},
  Houndoom: {otherFormes: ['Houndoom-Mega']},
  Igglybuff: {types: ['Normal', 'Fairy']},
  Jigglypuff: {types: ['Normal', 'Fairy']},
  Jumpluff: {bs: {sd: 95}},
  Kangaskhan: {otherFormes: ['Kangaskhan-Mega']},
  Kirlia: {types: ['Psychic', 'Fairy']},
  Krookodile: {bs: {df: 80}},
  Kyogre: {otherFormes: ['Kyogre-Primal']},
  Latias: {otherFormes: ['Latias-Mega']},
  Latios: {otherFormes: ['Latios-Mega']},
  Leavanny: {bs: {sd: 80}},
  Lopunny: {otherFormes: ['Lopunny-Mega']},
  Lucario: {otherFormes: ['Lucario-Mega']},
  Manectric: {otherFormes: ['Manectric-Mega']},
  Marill: {types: ['Water', 'Fairy']},
  Mawile: {types: ['Steel', 'Fairy'], otherFormes: ['Mawile-Mega']},
  Medicham: {otherFormes: ['Medicham-Mega']},
  Metagross: {otherFormes: ['Metagross-Mega']},
  Mewtwo: {otherFormes: ['Mewtwo-Mega-X', 'Mewtwo-Mega-Y']},
  'Mime Jr.': {types: ['Psychic', 'Fairy']},
  'Mr. Mime': {types: ['Psychic', 'Fairy']},
  Nidoking: {bs: {at: 102}},
  Nidoqueen: {bs: {at: 92}},
  Pidgeot: {bs: {sp: 101}, otherFormes: ['Pidgeot-Mega']},
  Pikachu: {
    bs: {df: 40, sd: 50},
    otherFormes: [
      'Pikachu-Belle',
      'Pikachu-Cosplay',
      'Pikachu-Libre',
      'Pikachu-PhD',
      'Pikachu-Pop-Star',
      'Pikachu-Rock-Star',
    ],
  },
  Pinsir: {otherFormes: ['Pinsir-Mega']},
  Poliwrath: {bs: {at: 95}},
  Raichu: {bs: {sp: 110}},
  Ralts: {types: ['Psychic', 'Fairy']},
  Rayquaza: {otherFormes: ['Rayquaza-Mega']},
  Roserade: {bs: {df: 65}},
  Sableye: {otherFormes: ['Sableye-Mega']},
  Salamence: {otherFormes: ['Salamence-Mega']},
  Sceptile: {otherFormes: ['Sceptile-Mega']},
  Scizor: {otherFormes: ['Scizor-Mega']},
  Scolipede: {bs: {at: 100}},
  Seismitoad: {bs: {at: 95}},
  Sharpedo: {otherFormes: ['Sharpedo-Mega']},
  Slowbro: {otherFormes: ['Slowbro-Mega']},
  Snubbull: {types: ['Fairy']},
  Staraptor: {bs: {sd: 60}},
  Steelix: {otherFormes: ['Steelix-Mega']},
  Stoutland: {bs: {at: 110}},
  Swampert: {otherFormes: ['Swampert-Mega']},
  Togekiss: {types: ['Fairy', 'Flying']},
  Togepi: {types: ['Fairy']},
  Togetic: {types: ['Fairy', 'Flying']},
  Tyranitar: {otherFormes: ['Tyranitar-Mega']},
  Unfezant: {bs: {at: 115}},
  Venusaur: {otherFormes: ['Venusaur-Mega']},
  Victreebel: {bs: {sd: 70}},
  Vileplume: {bs: {sa: 110}},
  Whimsicott: {types: ['Grass', 'Fairy']},
  Wigglytuff: {types: ['Normal', 'Fairy'], bs: {sa: 85}},
  // gen 6 pokemon
  'Aegislash-Blade': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 150, df: 50, sa: 150, sd: 50, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    otherFormes: ['Aegislash-Shield', 'Aegislash-Both'],
  },
  'Aegislash-Shield': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 50, df: 150, sa: 50, sd: 150, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    baseSpecies: 'Aegislash-Blade',
  },
  'Aegislash-Both': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 150, df: 150, sa: 150, sd: 150, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    baseSpecies: 'Aegislash-Blade',
  },
  Amaura: {
    types: ['Rock', 'Ice'],
    bs: {hp: 77, at: 59, df: 50, sa: 67, sd: 63, sp: 46},
    weightkg: 25.2,
    nfe: true,
    abilities: {0: 'Refrigerate'},
  },
  'Arceus-Fairy': {
    types: ['Fairy'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
  },
  Aromatisse: {
    types: ['Fairy'],
    bs: {hp: 101, at: 72, df: 72, sa: 99, sd: 89, sp: 29},
    weightkg: 15.5,
    abilities: {0: 'Healer'},
  },
  Aurorus: {
    types: ['Rock', 'Ice'],
    bs: {hp: 123, at: 77, df: 72, sa: 99, sd: 92, sp: 58},
    weightkg: 225,
    abilities: {0: 'Refrigerate'},
  },
  Avalugg: {
    types: ['Ice'],
    bs: {hp: 95, at: 117, df: 184, sa: 44, sd: 46, sp: 28},
    weightkg: 505,
    abilities: {0: 'Own Tempo'},
  },
  Barbaracle: {
    types: ['Rock', 'Water'],
    bs: {hp: 72, at: 105, df: 115, sa: 54, sd: 86, sp: 68},
    weightkg: 96,
    abilities: {0: 'Tough Claws'},
  },
  Bergmite: {
    types: ['Ice'],
    bs: {hp: 55, at: 69, df: 85, sa: 32, sd: 35, sp: 28},
    weightkg: 99.5,
    nfe: true,
    abilities: {0: 'Own Tempo'},
  },
  Binacle: {
    types: ['Rock', 'Water'],
    bs: {hp: 42, at: 52, df: 67, sa: 39, sd: 56, sp: 50},
    weightkg: 31,
    nfe: true,
    abilities: {0: 'Tough Claws'},
  },
  Braixen: {
    types: ['Fire'],
    bs: {hp: 59, at: 59, df: 58, sa: 90, sd: 70, sp: 73},
    weightkg: 14.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Bunnelby: {
    types: ['Normal'],
    bs: {hp: 38, at: 36, df: 38, sa: 32, sd: 36, sp: 57},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
  Caimanoe: {
    types: ['Water', 'Steel'],
    bs: {hp: 73, at: 85, df: 65, sa: 80, sd: 40, sp: 87},
    weightkg: 72.5,
    nfe: true,
    abilities: {0: 'Water Veil'},
  },
  Carbink: {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 50, df: 150, sa: 50, sd: 150, sp: 50},
    weightkg: 5.7,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Chesnaught: {
    types: ['Grass', 'Fighting'],
    bs: {hp: 88, at: 107, df: 122, sa: 74, sd: 75, sp: 64},
    weightkg: 90,
    abilities: {0: 'Overgrow'},
  },
  Chespin: {
    types: ['Grass'],
    bs: {hp: 56, at: 61, df: 65, sa: 48, sd: 45, sp: 38},
    weightkg: 9,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Clauncher: {
    types: ['Water'],
    bs: {hp: 50, at: 53, df: 62, sa: 58, sd: 63, sp: 44},
    weightkg: 8.3,
    nfe: true,
    abilities: {0: 'Mega Launcher'},
  },
  Clawitzer: {
    types: ['Water'],
    bs: {hp: 71, at: 73, df: 88, sa: 120, sd: 89, sp: 59},
    weightkg: 35.3,
    abilities: {0: 'Mega Launcher'},
  },
  Crucibelle: {
    types: ['Rock', 'Poison'],
    bs: {hp: 106, at: 105, df: 65, sa: 75, sd: 85, sp: 104},
    weightkg: 23.6,
    abilities: {0: 'Regenerator'},
    otherFormes: ['Crucibelle-Mega'],
  },
  Dedenne: {
    types: ['Electric', 'Fairy'],
    bs: {hp: 67, at: 58, df: 57, sa: 81, sd: 67, sp: 101},
    weightkg: 2.2,
    abilities: {0: 'Cheek Pouch'},
  },
  Delphox: {
    types: ['Fire', 'Psychic'],
    bs: {hp: 75, at: 69, df: 72, sa: 114, sd: 100, sp: 104},
    weightkg: 39,
    abilities: {0: 'Blaze'},
  },
  Diancie: {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 100, df: 150, sa: 100, sd: 150, sp: 50},
    weightkg: 8.8,
    gender: 'N',
    abilities: {0: 'Clear Body'},
    otherFormes: ['Diancie-Mega'],
  },
  Diggersby: {
    types: ['Normal', 'Ground'],
    bs: {hp: 85, at: 56, df: 77, sa: 50, sd: 77, sp: 78},
    weightkg: 42.4,
    abilities: {0: 'Pickup'},
  },
  Doublade: {
    types: ['Steel', 'Ghost'],
    bs: {hp: 59, at: 110, df: 150, sa: 45, sd: 49, sp: 35},
    weightkg: 4.5,
    nfe: true,
    abilities: {0: 'No Guard'},
  },
  Dragalge: {
    types: ['Poison', 'Dragon'],
    bs: {hp: 65, at: 75, df: 90, sa: 97, sd: 123, sp: 44},
    weightkg: 81.5,
    abilities: {0: 'Poison Point'},
  },
  Espurr: {
    types: ['Psychic'],
    bs: {hp: 62, at: 48, df: 54, sa: 63, sd: 60, sp: 68},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Fennekin: {
    types: ['Fire'],
    bs: {hp: 40, at: 45, df: 40, sa: 62, sd: 60, sp: 60},
    weightkg: 9.4,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Flabébé: {
    types: ['Fairy'],
    bs: {hp: 44, at: 38, df: 39, sa: 61, sd: 79, sp: 42},
    weightkg: 0.1,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Flower Veil'},
  },
  Fletchinder: {
    types: ['Fire', 'Flying'],
    bs: {hp: 62, at: 73, df: 55, sa: 56, sd: 52, sp: 84},
    weightkg: 16,
    nfe: true,
    abilities: {0: 'Flame Body'},
  },
  Fletchling: {
    types: ['Normal', 'Flying'],
    bs: {hp: 45, at: 50, df: 43, sa: 40, sd: 38, sp: 62},
    weightkg: 1.7,
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Floatoy: {
    types: ['Water'],
    bs: {hp: 48, at: 70, df: 40, sa: 70, sd: 30, sp: 77},
    weightkg: 1.9,
    nfe: true,
    abilities: {0: 'Water Veil'},
  },
  Floette: {
    types: ['Fairy'],
    bs: {hp: 54, at: 45, df: 47, sa: 75, sd: 98, sp: 52},
    weightkg: 0.9,
    gender: 'F',
    nfe: true,
    otherFormes: ['Floette-Eternal'],
    abilities: {0: 'Flower Veil'},
  },
  'Floette-Eternal': {
    types: ['Fairy'],
    bs: {hp: 74, at: 65, df: 67, sa: 125, sd: 128, sp: 92},
    weightkg: 0.9,
    gender: 'F',
    abilities: {0: 'Flower Veil'},
    baseSpecies: 'Floette',
  },
  Florges: {
    types: ['Fairy'],
    bs: {hp: 78, at: 65, df: 68, sa: 112, sd: 154, sp: 75},
    weightkg: 10,
    gender: 'F',
    abilities: {0: 'Flower Veil'},
  },
  Froakie: {
    types: ['Water'],
    bs: {hp: 41, at: 56, df: 40, sa: 62, sd: 44, sp: 71},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Frogadier: {
    types: ['Water'],
    bs: {hp: 54, at: 63, df: 52, sa: 83, sd: 56, sp: 97},
    weightkg: 10.9,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Furfrou: {
    types: ['Normal'],
    bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
    weightkg: 28,
    abilities: {0: 'Fur Coat'},
  },
  Gogoat: {
    types: ['Grass'],
    bs: {hp: 123, at: 100, df: 62, sa: 97, sd: 81, sp: 68},
    weightkg: 91,
    abilities: {0: 'Sap Sipper'},
  },
  Goodra: {
    types: ['Dragon'],
    bs: {hp: 90, at: 100, df: 70, sa: 110, sd: 150, sp: 80},
    weightkg: 150.5,
    abilities: {0: 'Sap Sipper'},
  },
  Goomy: {
    types: ['Dragon'],
    bs: {hp: 45, at: 50, df: 35, sa: 55, sd: 75, sp: 40},
    weightkg: 2.8,
    nfe: true,
    abilities: {0: 'Sap Sipper'},
  },
  Gourgeist: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 65, at: 90, df: 122, sa: 58, sd: 75, sp: 84},
    weightkg: 12.5,
    abilities: {0: 'Pickup'},
    otherFormes: ['Gourgeist-Large', 'Gourgeist-Small', 'Gourgeist-Super'],
  },
  'Gourgeist-Large': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 75, at: 95, df: 122, sa: 58, sd: 75, sp: 69},
    weightkg: 14,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Gourgeist',
  },
  'Gourgeist-Small': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 55, at: 85, df: 122, sa: 58, sd: 75, sp: 99},
    weightkg: 9.5,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Gourgeist',
  },
  'Gourgeist-Super': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 85, at: 100, df: 122, sa: 58, sd: 75, sp: 54},
    weightkg: 39,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Gourgeist',
  },
  Greninja: {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 95, df: 67, sa: 103, sd: 71, sp: 122},
    weightkg: 40,
    abilities: {0: 'Torrent'},
  },
  'Groudon-Primal': {
    types: ['Ground', 'Fire'],
    bs: {hp: 100, at: 180, df: 160, sa: 150, sd: 90, sp: 90},
    weightkg: 999.7,
    gender: 'N',
    abilities: {0: 'Desolate Land'},
    baseSpecies: 'Groudon',
  },
  Hawlucha: {
    types: ['Fighting', 'Flying'],
    bs: {hp: 78, at: 92, df: 75, sa: 74, sd: 63, sp: 118},
    weightkg: 21.5,
    abilities: {0: 'Limber'},
  },
  Heliolisk: {
    types: ['Electric', 'Normal'],
    bs: {hp: 62, at: 55, df: 52, sa: 109, sd: 94, sp: 109},
    weightkg: 21,
    abilities: {0: 'Dry Skin'},
  },
  Helioptile: {
    types: ['Electric', 'Normal'],
    bs: {hp: 44, at: 38, df: 33, sa: 61, sd: 43, sp: 70},
    weightkg: 6,
    nfe: true,
    abilities: {0: 'Dry Skin'},
  },
  Honedge: {
    types: ['Steel', 'Ghost'],
    bs: {hp: 45, at: 80, df: 100, sa: 35, sd: 37, sp: 28},
    weightkg: 2,
    nfe: true,
    abilities: {0: 'No Guard'},
  },
  Hoopa: {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 80, at: 110, df: 60, sa: 150, sd: 130, sp: 70},
    weightkg: 9,
    gender: 'N',
    abilities: {0: 'Magician'},
    otherFormes: ['Hoopa-Unbound'],
  },
  'Hoopa-Unbound': {
    types: ['Psychic', 'Dark'],
    bs: {hp: 80, at: 160, df: 60, sa: 170, sd: 130, sp: 80},
    weightkg: 490,
    gender: 'N',
    abilities: {0: 'Magician'},
    baseSpecies: 'Hoopa',
  },
  Inkay: {
    types: ['Dark', 'Psychic'],
    bs: {hp: 53, at: 54, df: 53, sa: 37, sd: 46, sp: 45},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Contrary'},
  },
  Kerfluffle: {
    types: ['Fairy', 'Fighting'],
    bs: {hp: 84, at: 78, df: 86, sa: 115, sd: 88, sp: 119},
    weightkg: 24.2,
    abilities: {0: 'Natural Cure'},
  },
  Klefki: {
    types: ['Steel', 'Fairy'],
    bs: {hp: 57, at: 80, df: 91, sa: 80, sd: 87, sp: 75},
    weightkg: 3,
    abilities: {0: 'Prankster'},
  },
  'Kyogre-Primal': {
    types: ['Water'],
    bs: {hp: 100, at: 150, df: 90, sa: 180, sd: 160, sp: 90},
    weightkg: 430,
    gender: 'N',
    abilities: {0: 'Primordial Sea'},
    baseSpecies: 'Kyogre',
  },
  Litleo: {
    types: ['Fire', 'Normal'],
    bs: {hp: 62, at: 50, df: 58, sa: 73, sd: 54, sp: 72},
    weightkg: 13.5,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Malamar: {
    types: ['Dark', 'Psychic'],
    bs: {hp: 86, at: 92, df: 88, sa: 68, sd: 75, sp: 73},
    weightkg: 47,
    abilities: {0: 'Contrary'},
  },
  Meowstic: {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 83, sd: 81, sp: 104},
    weightkg: 8.5,
    gender: 'M',
    abilities: {0: 'Keen Eye'},
    otherFormes: ['Meowstic-F'],
  },
  'Meowstic-F': {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 83, sd: 81, sp: 104},
    weightkg: 8.5,
    gender: 'F',
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Meowstic',
  },
  Naviathan: {
    types: ['Water', 'Steel'],
    bs: {hp: 103, at: 110, df: 90, sa: 95, sd: 65, sp: 97},
    weightkg: 510,
    abilities: {0: 'Water Veil'},
  },
  Noibat: {
    types: ['Flying', 'Dragon'],
    bs: {hp: 40, at: 30, df: 35, sa: 45, sd: 40, sp: 55},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Noivern: {
    types: ['Flying', 'Dragon'],
    bs: {hp: 85, at: 70, df: 80, sa: 97, sd: 80, sp: 123},
    weightkg: 85,
    abilities: {0: 'Frisk'},
  },
  Pancham: {
    types: ['Fighting'],
    bs: {hp: 67, at: 82, df: 62, sa: 46, sd: 48, sp: 43},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Iron Fist'},
  },
  Pangoro: {
    types: ['Fighting', 'Dark'],
    bs: {hp: 95, at: 124, df: 78, sa: 69, sd: 71, sp: 58},
    weightkg: 136,
    abilities: {0: 'Iron Fist'},
  },
  Phantump: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 43, at: 70, df: 48, sa: 50, sd: 60, sp: 38},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  'Pikachu-Belle': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'F',
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Cosplay': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'F',
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Libre': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'F',
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-PhD': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'F',
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Pop-Star': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'F',
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Rock-Star': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'F',
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  Plasmanta: {
    types: ['Electric', 'Poison'],
    bs: {hp: 60, at: 57, df: 119, sa: 131, sd: 98, sp: 100},
    weightkg: 460,
    abilities: {0: 'Storm Drain'},
  },
  Pluffle: {
    types: ['Fairy'],
    bs: {hp: 74, at: 38, df: 51, sa: 65, sd: 78, sp: 49},
    weightkg: 1.8,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  Pumpkaboo: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 49, at: 66, df: 70, sa: 44, sd: 55, sp: 51},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Pickup'},
    otherFormes: ['Pumpkaboo-Large', 'Pumpkaboo-Small', 'Pumpkaboo-Super'],
  },
  'Pumpkaboo-Large': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 54, at: 66, df: 70, sa: 44, sd: 55, sp: 46},
    weightkg: 7.5,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Pumpkaboo',
  },
  'Pumpkaboo-Small': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 44, at: 66, df: 70, sa: 44, sd: 55, sp: 56},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Pumpkaboo',
  },
  'Pumpkaboo-Super': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 59, at: 66, df: 70, sa: 44, sd: 55, sp: 41},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Pumpkaboo',
  },
  Pyroar: {
    types: ['Fire', 'Normal'],
    bs: {hp: 86, at: 68, df: 72, sa: 109, sd: 66, sp: 106},
    weightkg: 81.5,
    abilities: {0: 'Rivalry'},
  },
  Quilladin: {
    types: ['Grass'],
    bs: {hp: 61, at: 78, df: 95, sa: 56, sd: 58, sp: 57},
    weightkg: 29,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Scatterbug: {
    types: ['Bug'],
    bs: {hp: 38, at: 35, df: 40, sa: 27, sd: 25, sp: 35},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Skiddo: {
    types: ['Grass'],
    bs: {hp: 66, at: 65, df: 48, sa: 62, sd: 57, sp: 52},
    weightkg: 31,
    nfe: true,
    abilities: {0: 'Sap Sipper'},
  },
  Skrelp: {
    types: ['Poison', 'Water'],
    bs: {hp: 50, at: 60, df: 60, sa: 60, sd: 60, sp: 30},
    weightkg: 7.3,
    nfe: true,
    abilities: {0: 'Poison Point'},
  },
  Sliggoo: {
    types: ['Dragon'],
    bs: {hp: 68, at: 75, df: 53, sa: 83, sd: 113, sp: 60},
    weightkg: 17.5,
    nfe: true,
    abilities: {0: 'Sap Sipper'},
  },
  Slurpuff: {
    types: ['Fairy'],
    bs: {hp: 82, at: 80, df: 86, sa: 85, sd: 75, sp: 72},
    weightkg: 5,
    abilities: {0: 'Sweet Veil'},
  },
  Snugglow: {
    types: ['Electric', 'Poison'],
    bs: {hp: 40, at: 37, df: 79, sa: 91, sd: 68, sp: 70},
    weightkg: 6,
    nfe: true,
    abilities: {0: 'Storm Drain'},
  },
  Spewpa: {
    types: ['Bug'],
    bs: {hp: 45, at: 22, df: 60, sa: 27, sd: 30, sp: 29},
    weightkg: 8.4,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Spritzee: {
    types: ['Fairy'],
    bs: {hp: 78, at: 52, df: 60, sa: 63, sd: 65, sp: 23},
    weightkg: 0.5,
    nfe: true,
    abilities: {0: 'Healer'},
  },
  Swirlix: {
    types: ['Fairy'],
    bs: {hp: 62, at: 48, df: 66, sa: 59, sd: 57, sp: 49},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Sweet Veil'},
  },
  Sylveon: {
    types: ['Fairy'],
    bs: {hp: 95, at: 65, df: 65, sa: 110, sd: 130, sp: 60},
    weightkg: 23.5,
    abilities: {0: 'Cute Charm'},
  },
  Talonflame: {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 81, df: 71, sa: 74, sd: 69, sp: 126},
    weightkg: 24.5,
    abilities: {0: 'Flame Body'},
  },
  Trevenant: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 85, at: 110, df: 76, sa: 65, sd: 82, sp: 56},
    weightkg: 71,
    abilities: {0: 'Natural Cure'},
  },
  Tyrantrum: {
    types: ['Rock', 'Dragon'],
    bs: {hp: 82, at: 121, df: 119, sa: 69, sd: 59, sp: 71},
    weightkg: 270,
    abilities: {0: 'Strong Jaw'},
  },
  Tyrunt: {
    types: ['Rock', 'Dragon'],
    bs: {hp: 58, at: 89, df: 77, sa: 45, sd: 45, sp: 48},
    weightkg: 26,
    nfe: true,
    abilities: {0: 'Strong Jaw'},
  },
  Vivillon: {
    types: ['Bug', 'Flying'],
    bs: {hp: 80, at: 52, df: 50, sa: 90, sd: 50, sp: 89},
    weightkg: 17,
    abilities: {0: 'Shield Dust'},
    otherFormes: ['Vivillon-Fancy', 'Vivillon-Pokeball'],
  },
  'Vivillon-Fancy': {
    types: ['Bug', 'Flying'],
    bs: {hp: 80, at: 52, df: 50, sa: 90, sd: 50, sp: 89},
    weightkg: 17,
    abilities: {0: 'Shield Dust'},
    baseSpecies: 'Vivillon',
  },
  'Vivillon-Pokeball': {
    types: ['Bug', 'Flying'],
    bs: {hp: 80, at: 52, df: 50, sa: 90, sd: 50, sp: 89},
    weightkg: 17,
    abilities: {0: 'Shield Dust'},
    baseSpecies: 'Vivillon',
  },
  Volcanion: {
    types: ['Fire', 'Water'],
    bs: {hp: 80, at: 110, df: 120, sa: 130, sd: 90, sp: 70},
    weightkg: 195,
    gender: 'N',
    abilities: {0: 'Water Absorb'},
  },
  Volkraken: {
    types: ['Water', 'Fire'],
    bs: {hp: 100, at: 45, df: 80, sa: 135, sd: 100, sp: 95},
    weightkg: 44.5,
    abilities: {0: 'Analytic'},
  },
  Volkritter: {
    types: ['Water', 'Fire'],
    bs: {hp: 60, at: 30, df: 50, sa: 80, sd: 60, sp: 70},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Anticipation'},
  },
  Xerneas: {
    types: ['Fairy'],
    bs: {hp: 126, at: 131, df: 95, sa: 131, sd: 98, sp: 99},
    weightkg: 215,
    gender: 'N',
    abilities: {0: 'Fairy Aura'},
  },
  Yveltal: {
    types: ['Dark', 'Flying'],
    bs: {hp: 126, at: 131, df: 95, sa: 131, sd: 98, sp: 99},
    weightkg: 203,
    gender: 'N',
    abilities: {0: 'Dark Aura'},
  },
  Zygarde: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 100, df: 121, sa: 81, sd: 95, sp: 95},
    weightkg: 305,
    gender: 'N',
    abilities: {0: 'Aura Break'},
  },
  // mega evolutions
  'Abomasnow-Mega': {
    types: ['Grass', 'Ice'],
    bs: {hp: 90, at: 132, df: 105, sa: 132, sd: 105, sp: 30},
    weightkg: 185,
    abilities: {0: 'Snow Warning'},
    baseSpecies: 'Abomasnow',
  },
  'Absol-Mega': {
    types: ['Dark'],
    bs: {hp: 65, at: 150, df: 60, sa: 115, sd: 60, sp: 115},
    weightkg: 49,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Absol',
  },
  'Aerodactyl-Mega': {
    types: ['Rock', 'Flying'],
    bs: {hp: 80, at: 135, df: 85, sa: 70, sd: 95, sp: 150},
    weightkg: 79,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Aerodactyl',
  },
  'Aggron-Mega': {
    types: ['Steel'],
    bs: {hp: 70, at: 140, df: 230, sa: 60, sd: 80, sp: 50},
    weightkg: 395,
    abilities: {0: 'Filter'},
    baseSpecies: 'Aggron',
  },
  'Alakazam-Mega': {
    types: ['Psychic'],
    bs: {hp: 55, at: 50, df: 65, sa: 175, sd: 95, sp: 150},
    weightkg: 48,
    abilities: {0: 'Trace'},
    baseSpecies: 'Alakazam',
  },
  'Altaria-Mega': {
    types: ['Dragon', 'Fairy'],
    bs: {hp: 75, at: 110, df: 110, sa: 110, sd: 105, sp: 80},
    weightkg: 20.6,
    abilities: {0: 'Pixilate'},
    baseSpecies: 'Altaria',
  },
  'Ampharos-Mega': {
    types: ['Electric', 'Dragon'],
    bs: {hp: 90, at: 95, df: 105, sa: 165, sd: 110, sp: 45},
    weightkg: 61.5,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Ampharos',
  },
  'Audino-Mega': {
    types: ['Normal', 'Fairy'],
    bs: {hp: 103, at: 60, df: 126, sa: 80, sd: 126, sp: 50},
    weightkg: 32,
    abilities: {0: 'Healer'},
    baseSpecies: 'Audino',
  },
  'Banette-Mega': {
    types: ['Ghost'],
    bs: {hp: 64, at: 165, df: 75, sa: 93, sd: 83, sp: 75},
    weightkg: 13,
    abilities: {0: 'Prankster'},
    baseSpecies: 'Banette',
  },
  'Beedrill-Mega': {
    types: ['Bug', 'Poison'],
    bs: {hp: 65, at: 150, df: 40, sa: 15, sd: 80, sp: 145},
    weightkg: 40.5,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Beedrill',
  },
  'Blastoise-Mega': {
    types: ['Water'],
    bs: {hp: 79, at: 103, df: 120, sa: 135, sd: 115, sp: 78},
    weightkg: 101.1,
    abilities: {0: 'Mega Launcher'},
    baseSpecies: 'Blastoise',
  },
  'Blaziken-Mega': {
    types: ['Fire', 'Fighting'],
    bs: {hp: 80, at: 160, df: 80, sa: 130, sd: 80, sp: 100},
    weightkg: 52,
    abilities: {0: 'Speed Boost'},
    baseSpecies: 'Blaziken',
  },
  'Camerupt-Mega': {
    types: ['Fire', 'Ground'],
    bs: {hp: 70, at: 120, df: 100, sa: 145, sd: 105, sp: 20},
    weightkg: 320.5,
    abilities: {0: 'Sheer Force'},
    baseSpecies: 'Camerupt',
  },
  'Charizard-Mega-X': {
    types: ['Fire', 'Dragon'],
    bs: {hp: 78, at: 130, df: 111, sa: 130, sd: 85, sp: 100},
    weightkg: 110.5,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Charizard',
  },
  'Charizard-Mega-Y': {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 104, df: 78, sa: 159, sd: 115, sp: 100},
    weightkg: 100.5,
    abilities: {0: 'Drought'},
    baseSpecies: 'Charizard',
  },
  'Crucibelle-Mega': {
    types: ['Rock', 'Poison'],
    bs: {hp: 106, at: 135, df: 75, sa: 85, sd: 125, sp: 114},
    weightkg: 22.5,
    abilities: {0: 'Magic Guard'},
    baseSpecies: 'Crucibelle',
  },
  'Diancie-Mega': {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 160, df: 110, sa: 160, sd: 110, sp: 110},
    weightkg: 27.8,
    gender: 'N',
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Diancie',
  },
  'Gallade-Mega': {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 68, at: 165, df: 95, sa: 65, sd: 115, sp: 110},
    weightkg: 56.4,
    gender: 'M',
    abilities: {0: 'Inner Focus'},
    baseSpecies: 'Gallade',
  },
  'Garchomp-Mega': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 170, df: 115, sa: 120, sd: 95, sp: 92},
    weightkg: 95,
    abilities: {0: 'Sand Force'},
    baseSpecies: 'Garchomp',
  },
  'Gardevoir-Mega': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 68, at: 85, df: 65, sa: 165, sd: 135, sp: 100},
    weightkg: 48.4,
    abilities: {0: 'Pixilate'},
    baseSpecies: 'Gardevoir',
  },
  'Gengar-Mega': {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 80, sa: 170, sd: 95, sp: 130},
    weightkg: 40.5,
    abilities: {0: 'Shadow Tag'},
    baseSpecies: 'Gengar',
  },
  'Glalie-Mega': {
    types: ['Ice'],
    bs: {hp: 80, at: 120, df: 80, sa: 120, sd: 80, sp: 100},
    weightkg: 350.2,
    abilities: {0: 'Refrigerate'},
    baseSpecies: 'Glalie',
  },
  'Gyarados-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 95, at: 155, df: 109, sa: 70, sd: 130, sp: 81},
    weightkg: 305,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Gyarados',
  },
  'Heracross-Mega': {
    types: ['Bug', 'Fighting'],
    bs: {hp: 80, at: 185, df: 115, sa: 40, sd: 105, sp: 75},
    weightkg: 62.5,
    abilities: {0: 'Skill Link'},
    baseSpecies: 'Heracross',
  },
  'Houndoom-Mega': {
    types: ['Dark', 'Fire'],
    bs: {hp: 75, at: 90, df: 90, sa: 140, sd: 90, sp: 115},
    weightkg: 49.5,
    abilities: {0: 'Solar Power'},
    baseSpecies: 'Houndoom',
  },
  'Kangaskhan-Mega': {
    types: ['Normal'],
    bs: {hp: 105, at: 125, df: 100, sa: 60, sd: 100, sp: 100},
    weightkg: 100,
    gender: 'F',
    abilities: {0: 'Parental Bond'},
    baseSpecies: 'Kangaskhan',
  },
  'Latias-Mega': {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 100, df: 120, sa: 140, sd: 150, sp: 110},
    weightkg: 52,
    gender: 'F',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Latias',
  },
  'Latios-Mega': {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 130, df: 100, sa: 160, sd: 120, sp: 110},
    weightkg: 70,
    gender: 'M',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Latios',
  },
  'Lopunny-Mega': {
    types: ['Normal', 'Fighting'],
    bs: {hp: 65, at: 136, df: 94, sa: 54, sd: 96, sp: 135},
    weightkg: 28.3,
    abilities: {0: 'Scrappy'},
    baseSpecies: 'Lopunny',
  },
  'Lucario-Mega': {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 145, df: 88, sa: 140, sd: 70, sp: 112},
    weightkg: 57.5,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Lucario',
  },
  'Manectric-Mega': {
    types: ['Electric'],
    bs: {hp: 70, at: 75, df: 80, sa: 135, sd: 80, sp: 135},
    weightkg: 44,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Manectric',
  },
  'Mawile-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 50, at: 105, df: 125, sa: 55, sd: 95, sp: 50},
    weightkg: 23.5,
    abilities: {0: 'Huge Power'},
    baseSpecies: 'Mawile',
  },
  'Medicham-Mega': {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 60, at: 100, df: 85, sa: 80, sd: 85, sp: 100},
    weightkg: 31.5,
    abilities: {0: 'Pure Power'},
    baseSpecies: 'Medicham',
  },
  'Metagross-Mega': {
    types: ['Steel', 'Psychic'],
    bs: {hp: 80, at: 145, df: 150, sa: 105, sd: 110, sp: 110},
    weightkg: 942.9,
    gender: 'N',
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Metagross',
  },
  'Mewtwo-Mega-X': {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 106, at: 190, df: 100, sa: 154, sd: 100, sp: 130},
    weightkg: 127,
    gender: 'N',
    abilities: {0: 'Steadfast'},
    baseSpecies: 'Mewtwo',
  },
  'Mewtwo-Mega-Y': {
    types: ['Psychic'],
    bs: {hp: 106, at: 150, df: 70, sa: 194, sd: 120, sp: 140},
    weightkg: 33,
    gender: 'N',
    abilities: {0: 'Insomnia'},
    baseSpecies: 'Mewtwo',
  },
  'Pidgeot-Mega': {
    types: ['Normal', 'Flying'],
    bs: {hp: 83, at: 80, df: 80, sa: 135, sd: 80, sp: 121},
    weightkg: 50.5,
    abilities: {0: 'No Guard'},
    baseSpecies: 'Pidgeot',
  },
  'Pinsir-Mega': {
    types: ['Bug', 'Flying'],
    bs: {hp: 65, at: 155, df: 120, sa: 65, sd: 90, sp: 105},
    weightkg: 59,
    abilities: {0: 'Aerilate'},
    baseSpecies: 'Pinsir',
  },
  'Rayquaza-Mega': {
    types: ['Dragon', 'Flying'],
    bs: {hp: 105, at: 180, df: 100, sa: 180, sd: 100, sp: 115},
    weightkg: 392,
    gender: 'N',
    abilities: {0: 'Delta Stream'},
    baseSpecies: 'Rayquaza',
  },
  'Sableye-Mega': {
    types: ['Dark', 'Ghost'],
    bs: {hp: 50, at: 85, df: 125, sa: 85, sd: 115, sp: 20},
    weightkg: 161,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Sableye',
  },
  'Salamence-Mega': {
    types: ['Dragon', 'Flying'],
    bs: {hp: 95, at: 145, df: 130, sa: 120, sd: 90, sp: 120},
    weightkg: 112.6,
    abilities: {0: 'Aerilate'},
    baseSpecies: 'Salamence',
  },
  'Sceptile-Mega': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 70, at: 110, df: 75, sa: 145, sd: 85, sp: 145},
    weightkg: 55.2,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Sceptile',
  },
  'Scizor-Mega': {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 150, df: 140, sa: 65, sd: 100, sp: 75},
    weightkg: 125,
    abilities: {0: 'Technician'},
    baseSpecies: 'Scizor',
  },
  'Sharpedo-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 70, at: 140, df: 70, sa: 110, sd: 65, sp: 105},
    weightkg: 130.3,
    abilities: {0: 'Strong Jaw'},
    baseSpecies: 'Sharpedo',
  },
  'Slowbro-Mega': {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 180, sa: 130, sd: 80, sp: 30},
    weightkg: 120,
    abilities: {0: 'Shell Armor'},
    baseSpecies: 'Slowbro',
  },
  'Steelix-Mega': {
    types: ['Steel', 'Ground'],
    bs: {hp: 75, at: 125, df: 230, sa: 55, sd: 95, sp: 30},
    weightkg: 740,
    abilities: {0: 'Sand Force'},
    baseSpecies: 'Steelix',
  },
  'Swampert-Mega': {
    types: ['Water', 'Ground'],
    bs: {hp: 100, at: 150, df: 110, sa: 95, sd: 110, sp: 70},
    weightkg: 102,
    abilities: {0: 'Swift Swim'},
    baseSpecies: 'Swampert',
  },
  'Tyranitar-Mega': {
    types: ['Rock', 'Dark'],
    bs: {hp: 100, at: 164, df: 150, sa: 95, sd: 120, sp: 71},
    weightkg: 255,
    abilities: {0: 'Sand Stream'},
    baseSpecies: 'Tyranitar',
  },
  'Venusaur-Mega': {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 100, df: 123, sa: 122, sd: 120, sp: 80},
    weightkg: 155.5,
    abilities: {0: 'Thick Fat'},
    baseSpecies: 'Venusaur',
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);

const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Alakazam-Mega': {bs: {sd: 105}},
  Arbok: {bs: {at: 95}},
  Ariados: {bs: {sd: 70}},
  Beartic: {bs: {at: 130}},
  Chimecho: {bs: {hp: 75, df: 80, sd: 90}},
  Corsola: {bs: {hp: 65, df: 95, sd: 95}},
  'Crucibelle-Mega': {bs: {sa: 91, sp: 108}},
  Crustle: {bs: {at: 105}},
  Cryogonal: {bs: {hp: 80, df: 50}},
  Delcatty: {bs: {sp: 90}},
  Diglett: {otherFormes: ['Diglett-Alola']},
  Dodrio: {bs: {sp: 110}},
  Dugtrio: {bs: {at: 100}, otherFormes: ['Dugtrio-Alola']},
  Eevee: {otherFormes: ['Eevee-Starter']},
  Electrode: {bs: {sp: 150}},
  Exeggutor: {bs: {sd: 75}, otherFormes: ['Exeggutor-Alola']},
  'Farfetch\u2019d': {bs: {at: 90}},
  Gengar: {abilities: {0: 'Cursed Body'}},
  Geodude: {otherFormes: ['Geodude-Alola']},
  Golem: {otherFormes: ['Golem-Alola']},
  Graveler: {otherFormes: ['Graveler-Alola']},
  Greninja: {otherFormes: ['Greninja-Ash', 'Greninja-Bond']},
  Grimer: {otherFormes: ['Grimer-Alola']},
  Illumise: {bs: {df: 75, sd: 85}},
  Lunatone: {bs: {hp: 90}},
  Magcargo: {bs: {hp: 60, sa: 90}},
  Mantine: {bs: {hp: 85}},
  Marowak: {otherFormes: ['Marowak-Alola', 'Marowak-Alola-Totem']},
  Masquerain: {bs: {sa: 100, sp: 80}},
  Meowth: {otherFormes: ['Meowth-Alola']},
  Muk: {otherFormes: ['Muk-Alola']},
  Necturna: {bs: {sp: 58}},
  Ninetales: {otherFormes: ['Ninetales-Alola']},
  Naviathan: {abilities: {0: 'Guts'}},
  Noctowl: {bs: {sa: 86}},
  Pelipper: {bs: {sa: 95}},
  Persian: {otherFormes: ['Persian-Alola']},
  Pikachu: {
    otherFormes: [
      'Pikachu-Alola',
      'Pikachu-Hoenn',
      'Pikachu-Kalos',
      'Pikachu-Original',
      'Pikachu-Partner',
      'Pikachu-Sinnoh',
      'Pikachu-Starter',
      'Pikachu-Unova',
    ],
  },
  Qwilfish: {bs: {df: 85}},
  Raichu: {otherFormes: ['Raichu-Alola']},
  Raticate: {otherFormes: ['Raticate-Alola', 'Raticate-Alola-Totem']},
  Rattata: {otherFormes: ['Rattata-Alola']},
  Sandshrew: {otherFormes: ['Sandshrew-Alola']},
  Sandslash: {otherFormes: ['Sandslash-Alola']},
  Solrock: {bs: {hp: 90}},
  Swellow: {bs: {sa: 75}},
  Volbeat: {bs: {df: 75, sd: 85}},
  Vulpix: {otherFormes: ['Vulpix-Alola']},
  Woobat: {bs: {hp: 65}},
  Zygarde: {otherFormes: ['Zygarde-10%', 'Zygarde-Complete']},
  Araquanid: {
    types: ['Water', 'Bug'],
    bs: {hp: 68, at: 70, df: 92, sa: 50, sd: 132, sp: 42},
    weightkg: 82,
    abilities: {0: 'Water Bubble'},
    otherFormes: ['Araquanid-Totem'],
  },
  'Araquanid-Totem': {
    types: ['Water', 'Bug'],
    bs: {hp: 68, at: 70, df: 92, sa: 50, sd: 132, sp: 42},
    weightkg: 217.5,
    abilities: {0: 'Water Bubble'},
    baseSpecies: 'Araquanid',
  },
  Bewear: {
    types: ['Normal', 'Fighting'],
    bs: {hp: 120, at: 125, df: 80, sa: 55, sd: 60, sp: 60},
    weightkg: 135,
    abilities: {0: 'Fluffy'},
  },
  Blacephalon: {
    types: ['Fire', 'Ghost'],
    bs: {hp: 53, at: 127, df: 53, sa: 151, sd: 79, sp: 107},
    weightkg: 13,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  Bounsweet: {
    types: ['Grass'],
    bs: {hp: 42, at: 30, df: 38, sa: 30, sd: 38, sp: 32},
    weightkg: 3.2,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  Brionne: {
    types: ['Water'],
    bs: {hp: 60, at: 69, df: 69, sa: 91, sd: 81, sp: 50},
    weightkg: 17.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Bruxish: {
    types: ['Water', 'Psychic'],
    bs: {hp: 68, at: 105, df: 70, sa: 70, sd: 70, sp: 92},
    weightkg: 19,
    abilities: {0: 'Dazzling'},
  },
  Buzzwole: {
    types: ['Bug', 'Fighting'],
    bs: {hp: 107, at: 139, df: 139, sa: 53, sd: 53, sp: 79},
    weightkg: 333.6,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  Caribolt: {
    types: ['Grass', 'Electric'],
    bs: {hp: 84, at: 106, df: 82, sa: 77, sd: 80, sp: 106},
    weightkg: 140,
    abilities: {0: 'Overgrow'},
  },
  Celesteela: {
    types: ['Steel', 'Flying'],
    bs: {hp: 97, at: 101, df: 103, sa: 107, sd: 101, sp: 61},
    weightkg: 999.9,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  Charjabug: {
    types: ['Bug', 'Electric'],
    bs: {hp: 57, at: 82, df: 95, sa: 55, sd: 75, sp: 36},
    weightkg: 10.5,
    nfe: true,
    abilities: {0: 'Battery'},
  },
  Comfey: {
    types: ['Fairy'],
    bs: {hp: 51, at: 52, df: 90, sa: 82, sd: 110, sp: 100},
    weightkg: 0.3,
    abilities: {0: 'Flower Veil'},
  },
  Cosmoem: {
    types: ['Psychic'],
    bs: {hp: 43, at: 29, df: 131, sa: 29, sd: 131, sp: 37},
    weightkg: 999.9,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Coribalis: {
    types: ['Water', 'Bug'],
    bs: {hp: 76, at: 69, df: 90, sa: 65, sd: 77, sp: 43},
    weightkg: 24.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Cosmog: {
    types: ['Psychic'],
    bs: {hp: 43, at: 29, df: 31, sa: 29, sd: 31, sp: 37},
    weightkg: 0.1,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Unaware'},
  },
  Crabominable: {
    types: ['Fighting', 'Ice'],
    bs: {hp: 97, at: 132, df: 77, sa: 62, sd: 67, sp: 43},
    weightkg: 180,
    abilities: {0: 'Hyper Cutter'},
  },
  Crabrawler: {
    types: ['Fighting'],
    bs: {hp: 47, at: 82, df: 57, sa: 42, sd: 47, sp: 63},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Cutiefly: {
    types: ['Bug', 'Fairy'],
    bs: {hp: 40, at: 45, df: 40, sa: 55, sd: 40, sp: 84},
    weightkg: 0.2,
    nfe: true,
    abilities: {0: 'Honey Gather'},
  },
  Dartrix: {
    types: ['Grass', 'Flying'],
    bs: {hp: 78, at: 75, df: 75, sa: 70, sd: 70, sp: 52},
    weightkg: 16,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Decidueye: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 78, at: 107, df: 75, sa: 100, sd: 100, sp: 70},
    weightkg: 36.6,
    abilities: {0: 'Overgrow'},
  },
  Dewpider: {
    types: ['Water', 'Bug'],
    bs: {hp: 38, at: 40, df: 52, sa: 40, sd: 72, sp: 27},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Water Bubble'},
  },
  Dhelmise: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 70, at: 131, df: 100, sa: 86, sd: 90, sp: 40},
    weightkg: 210,
    gender: 'N',
    abilities: {0: 'Steelworker'},
  },
  Drampa: {
    types: ['Normal', 'Dragon'],
    bs: {hp: 78, at: 60, df: 85, sa: 135, sd: 91, sp: 36},
    weightkg: 185,
    abilities: {0: 'Berserk'},
  },
  'Diglett-Alola': {
    types: ['Ground', 'Steel'],
    bs: {hp: 10, at: 55, df: 30, sa: 35, sd: 45, sp: 90},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Sand Veil'},
    baseSpecies: 'Diglett',
  },
  'Dugtrio-Alola': {
    types: ['Ground', 'Steel'],
    bs: {hp: 35, at: 100, df: 60, sa: 50, sd: 70, sp: 110},
    weightkg: 66.6,
    abilities: {0: 'Sand Veil'},
    baseSpecies: 'Dugtrio',
  },
  'Eevee-Starter': {
    types: ['Normal'],
    bs: {hp: 65, at: 75, df: 70, sa: 65, sd: 85, sp: 75},
    weightkg: 6.5,
    abilities: {0: 'Run Away'},
    baseSpecies: 'Eevee',
  },
  Electrelk: {
    types: ['Grass', 'Electric'],
    bs: {hp: 59, at: 81, df: 67, sa: 57, sd: 55, sp: 101},
    weightkg: 41.5,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Equilibra: {
    types: ['Steel', 'Ground'],
    bs: {hp: 102, at: 50, df: 96, sa: 133, sd: 118, sp: 60},
    weightkg: 51.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  'Exeggutor-Alola': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 95, at: 105, df: 85, sa: 125, sd: 75, sp: 45},
    weightkg: 415.6,
    abilities: {0: 'Frisk'},
    baseSpecies: 'Exeggutor',
  },
  Fawnifer: {
    types: ['Grass'],
    bs: {hp: 49, at: 61, df: 42, sa: 52, sd: 40, sp: 76},
    weightkg: 6.9,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Fomantis: {
    types: ['Grass'],
    bs: {hp: 40, at: 55, df: 35, sa: 50, sd: 35, sp: 35},
    weightkg: 1.5,
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  'Geodude-Alola': {
    types: ['Rock', 'Electric'],
    bs: {hp: 40, at: 80, df: 100, sa: 30, sd: 30, sp: 20},
    weightkg: 20.3,
    nfe: true,
    abilities: {0: 'Magnet Pull'},
    baseSpecies: 'Geodude',
  },
  'Golem-Alola': {
    types: ['Rock', 'Electric'],
    bs: {hp: 80, at: 120, df: 130, sa: 55, sd: 65, sp: 45},
    weightkg: 316,
    abilities: {0: 'Magnet Pull'},
    baseSpecies: 'Golem',
  },
  Golisopod: {
    types: ['Bug', 'Water'],
    bs: {hp: 75, at: 125, df: 140, sa: 60, sd: 90, sp: 40},
    weightkg: 108,
    abilities: {0: 'Emergency Exit'},
  },
  'Graveler-Alola': {
    types: ['Rock', 'Electric'],
    bs: {hp: 55, at: 95, df: 115, sa: 45, sd: 45, sp: 35},
    weightkg: 110,
    nfe: true,
    abilities: {0: 'Magnet Pull'},
    baseSpecies: 'Graveler',
  },
  'Grimer-Alola': {
    types: ['Poison', 'Dark'],
    bs: {hp: 80, at: 80, df: 50, sa: 40, sd: 50, sp: 25},
    weightkg: 42,
    nfe: true,
    abilities: {0: 'Poison Touch'},
    baseSpecies: 'Grimer',
  },
  'Greninja-Ash': {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 145, df: 67, sa: 153, sd: 71, sp: 132},
    weightkg: 40,
    gender: 'M',
    abilities: {0: 'Battle Bond'},
    baseSpecies: 'Greninja',
  },
  'Greninja-Bond': {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 95, df: 67, sa: 103, sd: 71, sp: 122},
    weightkg: 40,
    gender: 'M',
    abilities: {0: 'Battle Bond'},
    baseSpecies: 'Greninja',
  },
  Grubbin: {
    types: ['Bug'],
    bs: {hp: 47, at: 62, df: 45, sa: 55, sd: 45, sp: 46},
    weightkg: 4.4,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Gumshoos: {
    types: ['Normal'],
    bs: {hp: 88, at: 110, df: 60, sa: 55, sd: 60, sp: 45},
    weightkg: 14.2,
    abilities: {0: 'Stakeout'},
    otherFormes: ['Gumshoos-Totem'],
  },
  'Gumshoos-Totem': {
    types: ['Normal'],
    bs: {hp: 88, at: 110, df: 60, sa: 55, sd: 60, sp: 45},
    weightkg: 60,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Gumshoos',
  },
  Guzzlord: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 223, at: 101, df: 53, sa: 97, sd: 53, sp: 43},
    weightkg: 888,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  'Hakamo-o': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 55, at: 75, df: 90, sa: 65, sd: 70, sp: 65},
    weightkg: 47,
    nfe: true,
    abilities: {0: 'Bulletproof'},
  },
  Incineroar: {
    types: ['Fire', 'Dark'],
    bs: {hp: 95, at: 115, df: 90, sa: 80, sd: 90, sp: 60},
    weightkg: 83,
    abilities: {0: 'Blaze'},
  },
  'Jangmo-o': {
    types: ['Dragon'],
    bs: {hp: 45, at: 55, df: 65, sa: 45, sd: 45, sp: 45},
    weightkg: 29.7,
    nfe: true,
    abilities: {0: 'Bulletproof'},
  },
  Justyke: {
    types: ['Steel', 'Ground'],
    bs: {hp: 72, at: 70, df: 56, sa: 83, sd: 68, sp: 30},
    weightkg: 36.5,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Jumbao: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 92, at: 63, df: 97, sa: 124, sd: 104, sp: 96},
    weightkg: 200,
    abilities: {0: 'Trace'},
  },
  Kartana: {
    types: ['Grass', 'Steel'],
    bs: {hp: 59, at: 181, df: 131, sa: 59, sd: 31, sp: 109},
    weightkg: 0.1,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  Komala: {
    types: ['Normal'],
    bs: {hp: 65, at: 115, df: 65, sa: 75, sd: 95, sp: 65},
    weightkg: 19.9,
    abilities: {0: 'Comatose'},
  },
  'Kommo-o': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 75, at: 110, df: 125, sa: 100, sd: 105, sp: 85},
    weightkg: 78.2,
    abilities: {0: 'Bulletproof'},
    otherFormes: ['Kommo-o-Totem'],
  },
  'Kommo-o-Totem': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 75, at: 110, df: 125, sa: 100, sd: 105, sp: 85},
    weightkg: 207.5,
    abilities: {0: 'Overcoat'},
    baseSpecies: 'Kommo-o',
  },
  Litten: {
    types: ['Fire'],
    bs: {hp: 45, at: 65, df: 40, sa: 60, sd: 40, sp: 70},
    weightkg: 4.3,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Lunala: {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 137, at: 113, df: 89, sa: 137, sd: 107, sp: 97},
    weightkg: 120,
    gender: 'N',
    abilities: {0: 'Shadow Shield'},
  },
  Lurantis: {
    types: ['Grass'],
    bs: {hp: 70, at: 105, df: 90, sa: 80, sd: 90, sp: 45},
    weightkg: 18.5,
    abilities: {0: 'Leaf Guard'},
    otherFormes: ['Lurantis-Totem'],
  },
  'Lurantis-Totem': {
    types: ['Grass'],
    bs: {hp: 70, at: 105, df: 90, sa: 80, sd: 90, sp: 45},
    weightkg: 58,
    abilities: {0: 'Leaf Guard'},
    baseSpecies: 'Lurantis',
  },
  Lycanroc: {
    types: ['Rock'],
    bs: {hp: 75, at: 115, df: 65, sa: 55, sd: 65, sp: 112},
    weightkg: 25,
    abilities: {0: 'Keen Eye'},
    otherFormes: ['Lycanroc-Dusk', 'Lycanroc-Midnight'],
  },
  'Lycanroc-Dusk': {
    types: ['Rock'],
    bs: {hp: 75, at: 117, df: 65, sa: 55, sd: 65, sp: 110},
    weightkg: 25,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Lycanroc',
  },
  'Lycanroc-Midnight': {
    types: ['Rock'],
    bs: {hp: 85, at: 115, df: 75, sa: 55, sd: 75, sp: 82},
    weightkg: 25,
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Lycanroc',
  },
  Magearna: {
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 95, df: 115, sa: 130, sd: 115, sp: 65},
    weightkg: 80.5,
    gender: 'N',
    abilities: {0: 'Soul-Heart'},
  },
  Mareanie: {
    types: ['Poison', 'Water'],
    bs: {hp: 50, at: 53, df: 62, sa: 43, sd: 52, sp: 45},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Merciless'},
  },
  'Marowak-Alola': {
    types: ['Fire', 'Ghost'],
    bs: {hp: 60, at: 80, df: 110, sa: 50, sd: 80, sp: 45},
    weightkg: 34,
    abilities: {0: 'Cursed Body'},
    baseSpecies: 'Marowak',
  },
  'Marowak-Alola-Totem': {
    types: ['Fire', 'Ghost'],
    bs: {hp: 60, at: 80, df: 110, sa: 50, sd: 80, sp: 45},
    weightkg: 98,
    abilities: {0: 'Rock Head'},
    baseSpecies: 'Marowak',
  },
  Marshadow: {
    types: ['Fighting', 'Ghost'],
    bs: {hp: 90, at: 125, df: 80, sa: 90, sd: 90, sp: 125},
    weightkg: 22.2,
    gender: 'N',
    abilities: {0: 'Technician'},
  },
  Melmetal: {
    types: ['Steel'],
    bs: {hp: 135, at: 143, df: 143, sa: 80, sd: 65, sp: 34},
    weightkg: 800,
    gender: 'N',
    abilities: {0: 'Iron Fist'},
  },
  // Meltan does NOT benefit from Eviolite and should not have nfe: true (credit: Anubis)
  // https://smogon.com/forums/threads/sword-shield-battle-mechanics-research.3655528/post-8295399
  Meltan: {
    types: ['Steel'],
    bs: {hp: 46, at: 65, df: 65, sa: 55, sd: 35, sp: 34},
    weightkg: 8,
    gender: 'N',
    abilities: {0: 'Magnet Pull'},
  },
  'Meowth-Alola': {
    types: ['Dark'],
    bs: {hp: 40, at: 35, df: 35, sa: 50, sd: 40, sp: 90},
    weightkg: 4.2,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Meowth',
  },
  Mimikyu: {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 0.7,
    abilities: {0: 'Disguise'},
    otherFormes: ['Mimikyu-Busted', 'Mimikyu-Busted-Totem', 'Mimikyu-Totem'],
  },
  'Mimikyu-Busted': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 0.7,
    abilities: {0: 'Disguise'},
    baseSpecies: 'Mimikyu',
  },
  'Mimikyu-Busted-Totem': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 2.8,
    abilities: {0: 'Disguise'},
    baseSpecies: 'Mimikyu',
  },
  'Mimikyu-Totem': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 2.8,
    abilities: {0: 'Disguise'},
    baseSpecies: 'Mimikyu',
  },
  Minior: {
    types: ['Rock', 'Flying'],
    bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Shields Down'},
    otherFormes: ['Minior-Meteor'],
  },
  'Minior-Meteor': {
    types: ['Rock', 'Flying'],
    bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
    weightkg: 40,
    gender: 'N',
    abilities: {0: 'Shields Down'},
    baseSpecies: 'Minior',
  },
  Morelull: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 40, at: 35, df: 55, sa: 65, sd: 75, sp: 15},
    weightkg: 1.5,
    nfe: true,
    abilities: {0: 'Illuminate'},
  },
  Mudbray: {
    types: ['Ground'],
    bs: {hp: 70, at: 100, df: 70, sa: 45, sd: 55, sp: 45},
    weightkg: 110,
    nfe: true,
    abilities: {0: 'Own Tempo'},
  },
  Mudsdale: {
    types: ['Ground'],
    bs: {hp: 100, at: 125, df: 100, sa: 55, sd: 85, sp: 35},
    weightkg: 920,
    abilities: {0: 'Own Tempo'},
  },
  'Muk-Alola': {
    types: ['Poison', 'Dark'],
    bs: {hp: 105, at: 105, df: 75, sa: 65, sd: 100, sp: 50},
    weightkg: 52,
    abilities: {0: 'Poison Touch'},
    baseSpecies: 'Muk',
  },
  Mumbao: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 55, at: 30, df: 64, sa: 87, sd: 73, sp: 66},
    weightkg: 83,
    nfe: true,
    abilities: {0: 'Trace'},
  },
  Naganadel: {
    types: ['Poison', 'Dragon'],
    bs: {hp: 73, at: 73, df: 73, sa: 127, sd: 73, sp: 121},
    weightkg: 150,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  Necrozma: {
    types: ['Psychic'],
    bs: {hp: 97, at: 107, df: 101, sa: 127, sd: 89, sp: 79},
    weightkg: 230,
    gender: 'N',
    abilities: {0: 'Prism Armor'},
    otherFormes: ['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra'],
  },
  'Necrozma-Dawn-Wings': {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 97, at: 113, df: 109, sa: 157, sd: 127, sp: 77},
    weightkg: 350,
    gender: 'N',
    abilities: {0: 'Prism Armor'},
    baseSpecies: 'Necrozma',
  },
  'Necrozma-Dusk-Mane': {
    types: ['Psychic', 'Steel'],
    bs: {hp: 97, at: 157, df: 127, sa: 113, sd: 109, sp: 77},
    weightkg: 460,
    gender: 'N',
    abilities: {0: 'Prism Armor'},
    baseSpecies: 'Necrozma',
  },
  'Necrozma-Ultra': {
    types: ['Psychic', 'Dragon'],
    bs: {hp: 97, at: 167, df: 97, sa: 167, sd: 97, sp: 129},
    weightkg: 230,
    gender: 'N',
    abilities: {0: 'Neuroforce'},
    baseSpecies: 'Necrozma',
  },
  Nihilego: {
    types: ['Rock', 'Poison'],
    bs: {hp: 109, at: 53, df: 47, sa: 127, sd: 131, sp: 103},
    weightkg: 55.5,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  'Ninetales-Alola': {
    types: ['Ice', 'Fairy'],
    bs: {hp: 73, at: 67, df: 75, sa: 81, sd: 100, sp: 109},
    weightkg: 19.9,
    abilities: {0: 'Snow Cloak'},
    baseSpecies: 'Ninetales',
  },
  Oranguru: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 90, at: 60, df: 80, sa: 90, sd: 110, sp: 60},
    weightkg: 76,
    abilities: {0: 'Inner Focus'},
  },
  Oricorio: {
    types: ['Fire', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    otherFormes: ['Oricorio-Pa\'u', 'Oricorio-Pom-Pom', 'Oricorio-Sensu'],
  },
  'Oricorio-Pa\'u': {
    types: ['Psychic', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    baseSpecies: 'Oricorio',
  },
  'Oricorio-Pom-Pom': {
    types: ['Electric', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    baseSpecies: 'Oricorio',
  },
  'Oricorio-Sensu': {
    types: ['Ghost', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    baseSpecies: 'Oricorio',
  },
  Pajantom: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 84, at: 133, df: 71, sa: 51, sd: 111, sp: 101},
    weightkg: 3.1,
    abilities: {0: 'Comatose'},
  },
  Palossand: {
    types: ['Ghost', 'Ground'],
    bs: {hp: 85, at: 75, df: 110, sa: 100, sd: 75, sp: 35},
    weightkg: 250,
    abilities: {0: 'Water Compaction'},
  },
  Passimian: {
    types: ['Fighting'],
    bs: {hp: 100, at: 120, df: 90, sa: 40, sd: 60, sp: 80},
    weightkg: 82.8,
    abilities: {0: 'Receiver'},
  },
  'Persian-Alola': {
    types: ['Dark'],
    bs: {hp: 65, at: 60, df: 60, sa: 75, sd: 65, sp: 115},
    weightkg: 33,
    abilities: {0: 'Fur Coat'},
    baseSpecies: 'Persian',
  },
  Pheromosa: {
    types: ['Bug', 'Fighting'],
    bs: {hp: 71, at: 137, df: 37, sa: 137, sd: 37, sp: 151},
    weightkg: 25,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  'Pikachu-Alola': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Hoenn': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Kalos': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Original': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Partner': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Sinnoh': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Starter': {
    types: ['Electric'],
    bs: {hp: 45, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Unova': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  Pikipek: {
    types: ['Normal', 'Flying'],
    bs: {hp: 35, at: 75, df: 30, sa: 30, sd: 30, sp: 65},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Poipole: {
    types: ['Poison'],
    bs: {hp: 67, at: 73, df: 67, sa: 73, sd: 67, sp: 73},
    weightkg: 1.8,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Beast Boost'},
  },
  Popplio: {
    types: ['Water'],
    bs: {hp: 50, at: 54, df: 54, sa: 66, sd: 56, sp: 40},
    weightkg: 7.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Primarina: {
    types: ['Water', 'Fairy'],
    bs: {hp: 80, at: 74, df: 74, sa: 126, sd: 116, sp: 60},
    weightkg: 44,
    abilities: {0: 'Torrent'},
  },
  Pyukumuku: {
    types: ['Water'],
    bs: {hp: 55, at: 60, df: 130, sa: 30, sd: 130, sp: 5},
    weightkg: 1.2,
    abilities: {0: 'Innards Out'},
  },
  'Raichu-Alola': {
    types: ['Electric', 'Psychic'],
    bs: {hp: 60, at: 85, df: 50, sa: 95, sd: 85, sp: 110},
    weightkg: 21,
    abilities: {0: 'Surge Surfer'},
    baseSpecies: 'Raichu',
  },
  'Raticate-Alola': {
    types: ['Dark', 'Normal'],
    bs: {hp: 75, at: 71, df: 70, sa: 40, sd: 80, sp: 77},
    weightkg: 25.5,
    abilities: {0: 'Gluttony'},
    baseSpecies: 'Raticate',
  },
  'Raticate-Alola-Totem': {
    types: ['Dark', 'Normal'],
    bs: {hp: 75, at: 71, df: 70, sa: 40, sd: 80, sp: 77},
    weightkg: 105,
    abilities: {0: 'Thick Fat'},
    baseSpecies: 'Raticate',
  },
  'Rattata-Alola': {
    types: ['Dark', 'Normal'],
    bs: {hp: 30, at: 56, df: 35, sa: 25, sd: 35, sp: 72},
    weightkg: 3.8,
    nfe: true,
    abilities: {0: 'Gluttony'},
    baseSpecies: 'Rattata',
  },
  Ribombee: {
    types: ['Bug', 'Fairy'],
    bs: {hp: 60, at: 55, df: 60, sa: 95, sd: 70, sp: 124},
    weightkg: 0.5,
    abilities: {0: 'Honey Gather'},
    otherFormes: ['Ribombee-Totem'],
  },
  'Ribombee-Totem': {
    types: ['Bug', 'Fairy'],
    bs: {hp: 60, at: 55, df: 60, sa: 95, sd: 70, sp: 124},
    weightkg: 2,
    abilities: {0: 'Sweet Veil'},
    baseSpecies: 'Ribombee',
  },
  Rockruff: {
    types: ['Rock'],
    bs: {hp: 45, at: 65, df: 40, sa: 30, sd: 40, sp: 60},
    weightkg: 9.2,
    nfe: true,
    abilities: {0: 'Keen Eye'},
    otherFormes: ['Rockruff-Dusk'],
  },
  'Rockruff-Dusk': {
    types: ['Rock'],
    bs: {hp: 45, at: 65, df: 40, sa: 30, sd: 40, sp: 60},
    weightkg: 9.2,
    nfe: true,
    abilities: {0: 'Own Tempo'},
    baseSpecies: 'Rockruff',
  },
  Rowlet: {
    types: ['Grass', 'Flying'],
    bs: {hp: 68, at: 55, df: 55, sa: 50, sd: 50, sp: 42},
    weightkg: 1.5,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Salandit: {
    types: ['Poison', 'Fire'],
    bs: {hp: 48, at: 44, df: 40, sa: 71, sd: 40, sp: 77},
    weightkg: 4.8,
    nfe: true,
    abilities: {0: 'Corrosion'},
  },
  Salazzle: {
    types: ['Poison', 'Fire'],
    bs: {hp: 68, at: 64, df: 60, sa: 111, sd: 60, sp: 117},
    weightkg: 22.2,
    gender: 'F',
    abilities: {0: 'Corrosion'},
    otherFormes: ['Salazzle-Totem'],
  },
  'Salazzle-Totem': {
    types: ['Poison', 'Fire'],
    bs: {hp: 68, at: 64, df: 60, sa: 111, sd: 60, sp: 117},
    weightkg: 81,
    gender: 'F',
    abilities: {0: 'Corrosion'},
    baseSpecies: 'Salazzle',
  },
  'Sandshrew-Alola': {
    types: ['Ice', 'Steel'],
    bs: {hp: 50, at: 75, df: 90, sa: 10, sd: 35, sp: 40},
    weightkg: 40,
    nfe: true,
    abilities: {0: 'Snow Cloak'},
    baseSpecies: 'Sandshrew',
  },
  'Sandslash-Alola': {
    types: ['Ice', 'Steel'],
    bs: {hp: 75, at: 100, df: 120, sa: 25, sd: 65, sp: 65},
    weightkg: 55,
    abilities: {0: 'Snow Cloak'},
    baseSpecies: 'Sandslash',
  },
  Sandygast: {
    types: ['Ghost', 'Ground'],
    bs: {hp: 55, at: 55, df: 80, sa: 70, sd: 45, sp: 15},
    weightkg: 70,
    nfe: true,
    abilities: {0: 'Water Compaction'},
  },
  Shiinotic: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 60, at: 45, df: 80, sa: 90, sd: 100, sp: 30},
    weightkg: 11.5,
    abilities: {0: 'Illuminate'},
  },
  Silvally: {
    types: ['Normal'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    otherFormes: [
      'Silvally-Bug',
      'Silvally-Dark',
      'Silvally-Dragon',
      'Silvally-Electric',
      'Silvally-Fairy',
      'Silvally-Fighting',
      'Silvally-Fire',
      'Silvally-Flying',
      'Silvally-Ghost',
      'Silvally-Grass',
      'Silvally-Ground',
      'Silvally-Ice',
      'Silvally-Poison',
      'Silvally-Psychic',
      'Silvally-Rock',
      'Silvally-Steel',
      'Silvally-Water',
    ],
  },
  'Silvally-Bug': {
    types: ['Bug'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Dark': {
    types: ['Dark'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Dragon': {
    types: ['Dragon'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Electric': {
    types: ['Electric'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Fairy': {
    types: ['Fairy'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Fighting': {
    types: ['Fighting'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Fire': {
    types: ['Fire'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Flying': {
    types: ['Flying'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Ghost': {
    types: ['Ghost'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Grass': {
    types: ['Grass'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Ground': {
    types: ['Ground'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Ice': {
    types: ['Ice'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Poison': {
    types: ['Poison'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Psychic': {
    types: ['Psychic'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Rock': {
    types: ['Rock'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Steel': {
    types: ['Steel'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  'Silvally-Water': {
    types: ['Water'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    gender: 'N',
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
  },
  Smogecko: {
    types: ['Fire'],
    bs: {hp: 48, at: 66, df: 43, sa: 58, sd: 48, sp: 56},
    weightkg: 8.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Smoguana: {
    types: ['Fire', 'Ground'],
    bs: {hp: 68, at: 86, df: 53, sa: 68, sd: 68, sp: 76},
    weightkg: 22.2,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Smokomodo: {
    types: ['Fire', 'Ground'],
    bs: {hp: 88, at: 116, df: 67, sa: 88, sd: 78, sp: 97},
    weightkg: 205,
    abilities: {0: 'Blaze'},
  },
  Snaelstrom: {
    types: ['Water', 'Bug'],
    bs: {hp: 91, at: 94, df: 110, sa: 80, sd: 97, sp: 63},
    weightkg: 120,
    abilities: {0: 'Torrent'},
  },
  Solgaleo: {
    types: ['Psychic', 'Steel'],
    bs: {hp: 137, at: 137, df: 107, sa: 113, sd: 89, sp: 97},
    weightkg: 230,
    gender: 'N',
    abilities: {0: 'Full Metal Body'},
  },
  Stakataka: {
    types: ['Rock', 'Steel'],
    bs: {hp: 61, at: 131, df: 211, sa: 53, sd: 101, sp: 13},
    weightkg: 820,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  Steenee: {
    types: ['Grass'],
    bs: {hp: 52, at: 40, df: 48, sa: 40, sd: 48, sp: 62},
    weightkg: 8.2,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  Stufful: {
    types: ['Normal', 'Fighting'],
    bs: {hp: 70, at: 75, df: 50, sa: 45, sd: 50, sp: 50},
    weightkg: 6.8,
    nfe: true,
    abilities: {0: 'Fluffy'},
  },
  Swirlpool: {
    types: ['Water'],
    bs: {hp: 61, at: 49, df: 70, sa: 50, sd: 62, sp: 28},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  'Tapu Bulu': {
    types: ['Grass', 'Fairy'],
    bs: {hp: 70, at: 130, df: 115, sa: 85, sd: 95, sp: 75},
    weightkg: 45.5,
    gender: 'N',
    abilities: {0: 'Grassy Surge'},
  },
  'Tapu Fini': {
    types: ['Water', 'Fairy'],
    bs: {hp: 70, at: 75, df: 115, sa: 95, sd: 130, sp: 85},
    weightkg: 21.2,
    gender: 'N',
    abilities: {0: 'Misty Surge'},
  },
  'Tapu Koko': {
    types: ['Electric', 'Fairy'],
    bs: {hp: 70, at: 115, df: 85, sa: 95, sd: 75, sp: 130},
    weightkg: 20.5,
    gender: 'N',
    abilities: {0: 'Electric Surge'},
  },
  'Tapu Lele': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 70, at: 85, df: 75, sa: 130, sd: 115, sp: 95},
    weightkg: 18.6,
    gender: 'N',
    abilities: {0: 'Psychic Surge'},
  },
  Togedemaru: {
    types: ['Electric', 'Steel'],
    bs: {hp: 65, at: 98, df: 63, sa: 40, sd: 73, sp: 96},
    weightkg: 3.3,
    abilities: {0: 'Iron Barbs'},
    otherFormes: ['Togedemaru-Totem'],
  },
  'Togedemaru-Totem': {
    types: ['Electric', 'Steel'],
    bs: {hp: 65, at: 98, df: 63, sa: 40, sd: 73, sp: 96},
    weightkg: 13,
    abilities: {0: 'Sturdy'},
    baseSpecies: 'Togedemaru',
  },
  Torracat: {
    types: ['Fire'],
    bs: {hp: 65, at: 85, df: 50, sa: 80, sd: 50, sp: 90},
    weightkg: 25,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Toucannon: {
    types: ['Normal', 'Flying'],
    bs: {hp: 80, at: 120, df: 75, sa: 75, sd: 75, sp: 60},
    weightkg: 26,
    abilities: {0: 'Keen Eye'},
  },
  Toxapex: {
    types: ['Poison', 'Water'],
    bs: {hp: 50, at: 63, df: 152, sa: 53, sd: 142, sp: 35},
    weightkg: 14.5,
    abilities: {0: 'Merciless'},
  },
  Trumbeak: {
    types: ['Normal', 'Flying'],
    bs: {hp: 55, at: 85, df: 50, sa: 40, sd: 50, sp: 75},
    weightkg: 14.8,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Tsareena: {
    types: ['Grass'],
    bs: {hp: 72, at: 120, df: 98, sa: 50, sd: 98, sp: 72},
    weightkg: 21.4,
    gender: 'F',
    abilities: {0: 'Leaf Guard'},
  },
  Turtonator: {
    types: ['Fire', 'Dragon'],
    bs: {hp: 60, at: 78, df: 135, sa: 91, sd: 85, sp: 36},
    weightkg: 212,
    abilities: {0: 'Shell Armor'},
  },
  'Type: Null': {
    types: ['Normal'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 59},
    weightkg: 120.5,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Battle Armor'},
  },
  Vikavolt: {
    types: ['Bug', 'Electric'],
    bs: {hp: 77, at: 70, df: 90, sa: 145, sd: 75, sp: 43},
    weightkg: 45,
    abilities: {0: 'Levitate'},
    otherFormes: ['Vikavolt-Totem'],
  },
  'Vikavolt-Totem': {
    types: ['Bug', 'Electric'],
    bs: {hp: 77, at: 70, df: 90, sa: 145, sd: 75, sp: 43},
    weightkg: 147.5,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Vikavolt',
  },
  'Vulpix-Alola': {
    types: ['Ice'],
    bs: {hp: 38, at: 41, df: 40, sa: 50, sd: 65, sp: 65},
    weightkg: 9.9,
    nfe: true,
    abilities: {0: 'Snow Cloak'},
    baseSpecies: 'Vulpix',
  },
  Wimpod: {
    types: ['Bug', 'Water'],
    bs: {hp: 25, at: 35, df: 40, sa: 20, sd: 30, sp: 80},
    weightkg: 12,
    nfe: true,
    abilities: {0: 'Wimp Out'},
  },
  Wishiwashi: {
    types: ['Water'],
    bs: {hp: 45, at: 20, df: 20, sa: 25, sd: 25, sp: 40},
    weightkg: 0.3,
    abilities: {0: 'Schooling'},
    otherFormes: ['Wishiwashi-School'],
  },
  'Wishiwashi-School': {
    types: ['Water'],
    bs: {hp: 45, at: 140, df: 130, sa: 140, sd: 135, sp: 30},
    weightkg: 78.6,
    abilities: {0: 'Schooling'},
    baseSpecies: 'Wishiwashi',
  },
  Xurkitree: {
    types: ['Electric'],
    bs: {hp: 83, at: 89, df: 71, sa: 173, sd: 71, sp: 83},
    weightkg: 100,
    gender: 'N',
    abilities: {0: 'Beast Boost'},
  },
  Yungoos: {
    types: ['Normal'],
    bs: {hp: 48, at: 70, df: 30, sa: 30, sd: 30, sp: 45},
    weightkg: 6,
    nfe: true,
    abilities: {0: 'Stakeout'},
  },
  Zeraora: {
    types: ['Electric'],
    bs: {hp: 88, at: 112, df: 75, sa: 102, sd: 80, sp: 143},
    weightkg: 44.5,
    gender: 'N',
    abilities: {0: 'Volt Absorb'},
  },
  'Zygarde-10%': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 54, at: 100, df: 71, sa: 61, sd: 85, sp: 115},
    weightkg: 33.5,
    gender: 'N',
    abilities: {0: 'Aura Break'},
    baseSpecies: 'Zygarde',
  },
  'Zygarde-Complete': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 216, at: 100, df: 121, sa: 91, sd: 95, sp: 85},
    weightkg: 610,
    gender: 'N',
    abilities: {0: 'Power Construct'},
    baseSpecies: 'Zygarde',
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);

delete SM['Pikachu-Cosplay'];
delete SM['Pikachu-Belle'];
delete SM['Pikachu-Libre'];
delete SM['Pikachu-PhD'];
delete SM['Pikachu-Pop-Star'];
delete SM['Pikachu-Rock-Star'];

const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Aegislash-Blade': {bs: {at: 140, sa: 140}},
  'Aegislash-Both': {bs: {at: 140, df: 140, sa: 140, sd: 140}},
  'Aegislash-Shield': {bs: {df: 140, sd: 140}},
  Articuno: {otherFormes: ['Articuno-Galar']},
  Blastoise: {otherFormes: ['Blastoise-Gmax', 'Blastoise-Mega']},
  Butterfree: {otherFormes: ['Butterfree-Gmax']},
  Charizard: {otherFormes: ['Charizard-Gmax', 'Charizard-Mega-X', 'Charizard-Mega-Y']},
  Corsola: {otherFormes: ['Corsola-Galar']},
  Darmanitan: {
    otherFormes: ['Darmanitan-Galar', 'Darmanitan-Galar-Zen', 'Darmanitan-Zen'],
  },
  Darumaka: {otherFormes: ['Darumaka-Galar']},
  Eevee: {otherFormes: ['Eevee-Gmax']},
  Equilibra: {bs: {sa: 133}},
  'Farfetch\u2019d': {otherFormes: ['Farfetch\u2019d-Galar']},
  Garbodor: {otherFormes: ['Garbodor-Gmax']},
  Gengar: {otherFormes: ['Gengar-Gmax', 'Gengar-Mega']},
  Kingler: {otherFormes: ['Kingler-Gmax']},
  Lapras: {otherFormes: ['Lapras-Gmax']},
  Linoone: {otherFormes: ['Linoone-Galar']},
  Machamp: {otherFormes: ['Machamp-Gmax']},
  Magearna: {otherFormes: ['Magearna-Original']},
  Melmetal: {otherFormes: ['Melmetal-Gmax']},
  Meowth: {otherFormes: ['Meowth-Alola', 'Meowth-Galar', 'Meowth-Gmax']},
  Moltres: {otherFormes: ['Moltres-Galar']},
  'Mr. Mime': {otherFormes: ['Mr. Mime-Galar']},
  Pikachu: {
    otherFormes: [
      'Pikachu-Alola',
      'Pikachu-Gmax',
      'Pikachu-Hoenn',
      'Pikachu-Kalos',
      'Pikachu-Original',
      'Pikachu-Partner',
      'Pikachu-Sinnoh',
      'Pikachu-Unova',
      'Pikachu-World',
    ],
  },
  Ponyta: {otherFormes: ['Ponyta-Galar']},
  Pyroak: {bs: {sa: 70, sd: 65}},
  Rapidash: {otherFormes: ['Rapidash-Galar']},
  Slowbro: {otherFormes: ['Slowbro-Galar', 'Slowbro-Mega']},
  Slowking: {otherFormes: ['Slowking-Galar']},
  Slowpoke: {otherFormes: ['Slowpoke-Galar']},
  Snorlax: {otherFormes: ['Snorlax-Gmax']},
  Stunfisk: {otherFormes: ['Stunfisk-Galar']},
  Venusaur: {otherFormes: ['Venusaur-Gmax', 'Venusaur-Mega']},
  Voodoom: {bs: {sa: 130}},
  Weezing: {otherFormes: ['Weezing-Galar']},
  Yamask: {otherFormes: ['Yamask-Galar']},
  Zapdos: {otherFormes: ['Zapdos-Galar']},
  Zigzagoon: {otherFormes: ['Zigzagoon-Galar']},
  Alcremie: {
    types: ['Fairy'],
    bs: {hp: 65, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
    weightkg: 0.5,
    gender: 'F',
    abilities: {0: 'Sweet Veil'},
    otherFormes: ['Alcremie-Gmax'],
  },
  Appletun: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 110, at: 85, df: 80, sa: 100, sd: 80, sp: 30},
    weightkg: 13,
    abilities: {0: 'Ripen'},
    otherFormes: ['Appletun-Gmax'],
  },
  Applin: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 40, at: 40, df: 80, sa: 40, sd: 40, sp: 20},
    weightkg: 0.5,
    nfe: true,
    abilities: {0: 'Ripen'},
  },
  Arctovish: {
    types: ['Water', 'Ice'],
    bs: {hp: 90, at: 90, df: 100, sa: 80, sd: 90, sp: 55},
    weightkg: 175,
    gender: 'N',
    abilities: {0: 'Water Absorb'},
  },
  Arctozolt: {
    types: ['Electric', 'Ice'],
    bs: {hp: 90, at: 100, df: 90, sa: 90, sd: 80, sp: 55},
    weightkg: 150,
    gender: 'N',
    abilities: {0: 'Volt Absorb'},
  },
  Arrokuda: {
    types: ['Water'],
    bs: {hp: 41, at: 63, df: 40, sa: 40, sd: 30, sp: 66},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  'Articuno-Galar': {
    types: ['Psychic', 'Flying'],
    bs: {hp: 90, at: 85, df: 85, sa: 125, sd: 100, sp: 95},
    weightkg: 50.9,
    gender: 'N',
    abilities: {0: 'Competitive'},
    baseSpecies: 'Articuno',
  },
  Astrolotl: {
    types: ['Fire', 'Dragon'],
    bs: {hp: 108, at: 108, df: 74, sa: 92, sd: 64, sp: 114},
    weightkg: 50,
    abilities: {0: 'Regenerator'},
  },
  Barraskewda: {
    types: ['Water'],
    bs: {hp: 61, at: 123, df: 60, sa: 60, sd: 50, sp: 136},
    weightkg: 30,
    abilities: {0: 'Swift Swim'},
  },
  Blipbug: {
    types: ['Bug'],
    bs: {hp: 25, at: 20, df: 20, sa: 25, sd: 45, sp: 45},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Boltund: {
    types: ['Electric'],
    bs: {hp: 69, at: 90, df: 60, sa: 90, sd: 60, sp: 121},
    weightkg: 34,
    abilities: {0: 'Strong Jaw'},
  },
  Calyrex: {
    types: ['Psychic', 'Grass'],
    bs: {hp: 100, at: 80, df: 80, sa: 80, sd: 80, sp: 80},
    weightkg: 7.7,
    gender: 'N',
    abilities: {0: 'Unnerve'},
    otherFormes: ['Calyrex-Ice', 'Calyrex-Shadow'],
  },
  'Calyrex-Ice': {
    types: ['Psychic', 'Ice'],
    bs: {hp: 100, at: 165, df: 150, sa: 85, sd: 130, sp: 50},
    weightkg: 809.1,
    gender: 'N',
    abilities: {0: 'As One (Glastrier)'},
    baseSpecies: 'Calyrex',
  },
  'Calyrex-Shadow': {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 100, at: 85, df: 80, sa: 165, sd: 100, sp: 150},
    weightkg: 53.6,
    gender: 'N',
    abilities: {0: 'As One (Spectrier)'},
    baseSpecies: 'Calyrex',
  },
  Carkol: {
    types: ['Rock', 'Fire'],
    bs: {hp: 80, at: 60, df: 90, sa: 60, sd: 70, sp: 50},
    weightkg: 78,
    nfe: true,
    abilities: {0: 'Steam Engine'},
  },
  Centiskorch: {
    types: ['Fire', 'Bug'],
    bs: {hp: 100, at: 115, df: 65, sa: 90, sd: 90, sp: 65},
    weightkg: 120,
    abilities: {0: 'Flash Fire'},
    otherFormes: ['Centiskorch-Gmax'],
  },
  Chewtle: {
    types: ['Water'],
    bs: {hp: 50, at: 64, df: 50, sa: 38, sd: 38, sp: 44},
    weightkg: 8.5,
    nfe: true,
    abilities: {0: 'Strong Jaw'},
  },
  Chromera: {
    types: ['Dark', 'Normal'],
    bs: {hp: 85, at: 85, df: 115, sa: 115, sd: 100, sp: 100},
    weightkg: 215,
    gender: 'N',
    abilities: {0: 'Color Change'},
  },
  Cinderace: {
    types: ['Fire'],
    bs: {hp: 80, at: 116, df: 75, sa: 65, sd: 75, sp: 119},
    weightkg: 33,
    abilities: {0: 'Blaze'},
    otherFormes: ['Cinderace-Gmax'],
  },
  Clobbopus: {
    types: ['Fighting'],
    bs: {hp: 50, at: 68, df: 60, sa: 50, sd: 50, sp: 32},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Limber'},
  },
  Coalossal: {
    types: ['Rock', 'Fire'],
    bs: {hp: 110, at: 80, df: 120, sa: 80, sd: 90, sp: 30},
    weightkg: 310.5,
    abilities: {0: 'Steam Engine'},
    otherFormes: ['Coalossal-Gmax'],
  },
  Copperajah: {
    types: ['Steel'],
    bs: {hp: 122, at: 130, df: 69, sa: 80, sd: 69, sp: 30},
    weightkg: 650,
    abilities: {0: 'Sheer Force'},
    otherFormes: ['Copperajah-Gmax'],
  },
  'Corsola-Galar': {
    types: ['Ghost'],
    bs: {hp: 60, at: 55, df: 100, sa: 65, sd: 100, sp: 30},
    weightkg: 0.5,
    nfe: true,
    abilities: {0: 'Weak Armor'},
    baseSpecies: 'Corsola',
  },
  Corviknight: {
    types: ['Flying', 'Steel'],
    bs: {hp: 98, at: 87, df: 105, sa: 53, sd: 85, sp: 67},
    weightkg: 75,
    abilities: {0: 'Pressure'},
    otherFormes: ['Corviknight-Gmax'],
  },
  Corvisquire: {
    types: ['Flying'],
    bs: {hp: 68, at: 67, df: 55, sa: 43, sd: 55, sp: 77},
    weightkg: 16,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Cramorant: {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    otherFormes: ['Cramorant-Gorging', 'Cramorant-Gulping'],
  },
  'Cramorant-Gorging': {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    baseSpecies: 'Cramorant',
  },
  'Cramorant-Gulping': {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    baseSpecies: 'Cramorant',
  },
  Cufant: {
    types: ['Steel'],
    bs: {hp: 72, at: 80, df: 49, sa: 40, sd: 49, sp: 40},
    weightkg: 100,
    nfe: true,
    abilities: {0: 'Sheer Force'},
  },
  Cursola: {
    types: ['Ghost'],
    bs: {hp: 60, at: 95, df: 50, sa: 145, sd: 130, sp: 30},
    weightkg: 0.4,
    abilities: {0: 'Weak Armor'},
  },
  'Darmanitan-Galar': {
    types: ['Ice'],
    bs: {hp: 105, at: 140, df: 55, sa: 30, sd: 55, sp: 95},
    weightkg: 120,
    abilities: {0: 'Gorilla Tactics'},
    baseSpecies: 'Darmanitan',
  },
  'Darmanitan-Galar-Zen': {
    types: ['Ice', 'Fire'],
    bs: {hp: 105, at: 160, df: 55, sa: 30, sd: 55, sp: 135},
    weightkg: 120,
    abilities: {0: 'Zen Mode'},
    baseSpecies: 'Darmanitan',
  },
  'Darumaka-Galar': {
    types: ['Ice'],
    bs: {hp: 70, at: 90, df: 45, sa: 15, sd: 45, sp: 50},
    weightkg: 40,
    nfe: true,
    abilities: {0: 'Hustle'},
    baseSpecies: 'Darumaka',
  },
  Dottler: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 50, at: 35, df: 80, sa: 50, sd: 90, sp: 30},
    weightkg: 19.5,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Dracovish: {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 90, df: 100, sa: 70, sd: 80, sp: 75},
    weightkg: 215,
    gender: 'N',
    abilities: {0: 'Water Absorb'},
  },
  Dracozolt: {
    types: ['Electric', 'Dragon'],
    bs: {hp: 90, at: 100, df: 90, sa: 80, sd: 70, sp: 75},
    weightkg: 190,
    gender: 'N',
    abilities: {0: 'Volt Absorb'},
  },
  Dragapult: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 88, at: 120, df: 75, sa: 100, sd: 75, sp: 142},
    weightkg: 50,
    abilities: {0: 'Clear Body'},
  },
  Drakloak: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 68, at: 80, df: 50, sa: 60, sd: 50, sp: 102},
    weightkg: 11,
    nfe: true,
    abilities: {0: 'Clear Body'},
  },
  Drednaw: {
    types: ['Water', 'Rock'],
    bs: {hp: 90, at: 115, df: 90, sa: 48, sd: 68, sp: 74},
    weightkg: 115.5,
    abilities: {0: 'Strong Jaw'},
    otherFormes: ['Drednaw-Gmax'],
  },
  Dreepy: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 28, at: 60, df: 30, sa: 40, sd: 30, sp: 82},
    weightkg: 2,
    nfe: true,
    abilities: {0: 'Clear Body'},
  },
  Drizzile: {
    types: ['Water'],
    bs: {hp: 65, at: 60, df: 55, sa: 95, sd: 55, sp: 90},
    weightkg: 11.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Dubwool: {
    types: ['Normal'],
    bs: {hp: 72, at: 80, df: 100, sa: 60, sd: 90, sp: 88},
    weightkg: 43,
    abilities: {0: 'Fluffy'},
  },
  Duraludon: {
    types: ['Steel', 'Dragon'],
    bs: {hp: 70, at: 95, df: 115, sa: 120, sd: 50, sp: 85},
    weightkg: 40,
    abilities: {0: 'Light Metal'},
    otherFormes: ['Duraludon-Gmax'],
  },
  Eiscue: {
    types: ['Ice'],
    bs: {hp: 75, at: 80, df: 110, sa: 65, sd: 90, sp: 50},
    weightkg: 89,
    abilities: {0: 'Ice Face'},
    otherFormes: ['Eiscue-Noice'],
  },
  'Eiscue-Noice': {
    types: ['Ice'],
    bs: {hp: 75, at: 80, df: 70, sa: 65, sd: 50, sp: 130},
    weightkg: 89,
    abilities: {0: 'Ice Face'},
    baseSpecies: 'Eiscue',
  },
  Eldegoss: {
    types: ['Grass'],
    bs: {hp: 60, at: 50, df: 90, sa: 80, sd: 120, sp: 60},
    weightkg: 2.5,
    abilities: {0: 'Cotton Down'},
  },
  Eternatus: {
    types: ['Poison', 'Dragon'],
    bs: {hp: 140, at: 85, df: 95, sa: 145, sd: 95, sp: 130},
    weightkg: 950,
    gender: 'N',
    abilities: {0: 'Pressure'},
    otherFormes: ['Eternatus-Eternamax'],
  },
  'Eternatus-Eternamax': {
    types: ['Poison', 'Dragon'],
    bs: {hp: 255, at: 115, df: 250, sa: 125, sd: 250, sp: 130},
    weightkg: 0,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Eternatus',
  },
  Falinks: {
    types: ['Fighting'],
    bs: {hp: 65, at: 100, df: 100, sa: 70, sd: 60, sp: 75},
    weightkg: 62,
    gender: 'N',
    abilities: {0: 'Battle Armor'},
  },
  'Farfetch\u2019d-Galar': {
    types: ['Fighting'],
    bs: {hp: 52, at: 95, df: 55, sa: 58, sd: 62, sp: 55},
    weightkg: 42,
    nfe: true,
    abilities: {0: 'Steadfast'},
    baseSpecies: 'Farfetch\u2019d',
  },
  Flapple: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 70, at: 110, df: 80, sa: 95, sd: 60, sp: 70},
    weightkg: 1,
    abilities: {0: 'Ripen'},
    otherFormes: ['Flapple-Gmax'],
  },
  Frosmoth: {
    types: ['Ice', 'Bug'],
    bs: {hp: 70, at: 65, df: 60, sa: 125, sd: 90, sp: 65},
    weightkg: 42,
    abilities: {0: 'Shield Dust'},
  },
  Glastrier: {
    types: ['Ice'],
    bs: {hp: 100, at: 145, df: 130, sa: 65, sd: 110, sp: 30},
    weightkg: 800,
    gender: 'N',
    abilities: {0: 'Chilling Neigh'},
  },
  Gossifleur: {
    types: ['Grass'],
    bs: {hp: 40, at: 40, df: 60, sa: 40, sd: 60, sp: 10},
    weightkg: 2.2,
    nfe: true,
    abilities: {0: 'Cotton Down'},
  },
  Grapploct: {
    types: ['Fighting'],
    bs: {hp: 80, at: 118, df: 90, sa: 70, sd: 80, sp: 42},
    weightkg: 39,
    abilities: {0: 'Limber'},
  },
  Greedent: {
    types: ['Normal'],
    bs: {hp: 120, at: 95, df: 95, sa: 55, sd: 75, sp: 20},
    weightkg: 6,
    abilities: {0: 'Cheek Pouch'},
  },
  Grimmsnarl: {
    types: ['Dark', 'Fairy'],
    bs: {hp: 95, at: 120, df: 65, sa: 95, sd: 75, sp: 60},
    weightkg: 61,
    gender: 'M',
    abilities: {0: 'Prankster'},
    otherFormes: ['Grimmsnarl-Gmax'],
  },
  Grookey: {
    types: ['Grass'],
    bs: {hp: 50, at: 65, df: 50, sa: 40, sd: 40, sp: 65},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Hatenna: {
    types: ['Psychic'],
    bs: {hp: 42, at: 30, df: 45, sa: 56, sd: 53, sp: 39},
    weightkg: 3.4,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Healer'},
  },
  Hatterene: {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 57, at: 90, df: 95, sa: 136, sd: 103, sp: 29},
    weightkg: 5.1,
    gender: 'F',
    abilities: {0: 'Healer'},
    otherFormes: ['Hatterene-Gmax'],
  },
  Hattrem: {
    types: ['Psychic'],
    bs: {hp: 57, at: 40, df: 65, sa: 86, sd: 73, sp: 49},
    weightkg: 4.8,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Healer'},
  },
  Impidimp: {
    types: ['Dark', 'Fairy'],
    bs: {hp: 45, at: 45, df: 30, sa: 55, sd: 40, sp: 50},
    weightkg: 5.5,
    gender: 'M',
    nfe: true,
    abilities: {0: 'Prankster'},
  },
  Indeedee: {
    types: ['Psychic', 'Normal'],
    bs: {hp: 60, at: 65, df: 55, sa: 105, sd: 95, sp: 95},
    weightkg: 28,
    gender: 'M',
    abilities: {0: 'Inner Focus'},
    otherFormes: ['Indeedee-F'],
  },
  'Indeedee-F': {
    types: ['Psychic', 'Normal'],
    bs: {hp: 70, at: 55, df: 65, sa: 95, sd: 105, sp: 85},
    weightkg: 28,
    gender: 'F',
    abilities: {0: 'Own Tempo'},
    baseSpecies: 'Indeedee',
  },
  Inteleon: {
    types: ['Water'],
    bs: {hp: 70, at: 85, df: 65, sa: 125, sd: 65, sp: 120},
    weightkg: 45.2,
    abilities: {0: 'Torrent'},
    otherFormes: ['Inteleon-Gmax'],
  },
  'Kubfu': {
    types: ['Fighting'],
    bs: {hp: 60, at: 90, df: 60, sa: 53, sd: 50, sp: 72},
    weightkg: 12,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
  'Linoone-Galar': {
    types: ['Dark', 'Normal'],
    bs: {hp: 78, at: 70, df: 61, sa: 50, sd: 61, sp: 100},
    weightkg: 32.5,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Linoone',
  },
  'Magearna-Original': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 95, df: 115, sa: 130, sd: 115, sp: 65},
    weightkg: 80.5,
    gender: 'N',
    abilities: {0: 'Soul-Heart'},
    baseSpecies: 'Magearna',
  },
  'Meowth-Galar': {
    types: ['Steel'],
    bs: {hp: 50, at: 65, df: 55, sa: 40, sd: 40, sp: 40},
    weightkg: 7.5,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Meowth',
  },
  Miasmaw: {
    types: ['Bug', 'Dragon'],
    bs: {hp: 85, at: 135, df: 60, sa: 88, sd: 105, sp: 99},
    weightkg: 57,
    abilities: {0: 'Neutralizing Gas'},
  },
  Miasmite: {
    types: ['Bug', 'Dragon'],
    bs: {hp: 40, at: 85, df: 60, sa: 52, sd: 52, sp: 44},
    weightkg: 10.1,
    nfe: true,
    abilities: {0: 'Neutralizing Gas'},
  },
  Milcery: {
    types: ['Fairy'],
    bs: {hp: 45, at: 40, df: 40, sa: 50, sd: 61, sp: 34},
    weightkg: 0.3,
    gender: 'F',
    nfe: true,
    abilities: {0: 'Sweet Veil'},
  },
  'Moltres-Galar': {
    types: ['Dark', 'Flying'],
    bs: {hp: 90, at: 85, df: 90, sa: 100, sd: 125, sp: 90},
    weightkg: 66,
    gender: 'N',
    abilities: {0: 'Berserk'},
    baseSpecies: 'Moltres',
  },
  Morgrem: {
    types: ['Dark', 'Fairy'],
    bs: {hp: 65, at: 60, df: 45, sa: 75, sd: 55, sp: 70},
    weightkg: 12.5,
    gender: 'M',
    nfe: true,
    abilities: {0: 'Prankster'},
  },
  Morpeko: {
    types: ['Electric', 'Dark'],
    bs: {hp: 58, at: 95, df: 58, sa: 70, sd: 58, sp: 97},
    weightkg: 3,
    abilities: {0: 'Hunger Switch'},
    otherFormes: ['Morpeko-Hangry'],
  },
  'Morpeko-Hangry': {
    types: ['Electric', 'Dark'],
    bs: {hp: 58, at: 95, df: 58, sa: 70, sd: 58, sp: 97},
    weightkg: 3,
    abilities: {0: 'Hunger Switch'},
    baseSpecies: 'Morpeko',
  },
  'Mr. Mime-Galar': {
    types: ['Ice', 'Psychic'],
    bs: {hp: 50, at: 65, df: 65, sa: 90, sd: 90, sp: 100},
    weightkg: 56.8,
    nfe: true,
    abilities: {0: 'Vital Spirit'},
    baseSpecies: 'Mr. Mime',
  },
  'Mr. Rime': {
    types: ['Ice', 'Psychic'],
    bs: {hp: 80, at: 85, df: 75, sa: 110, sd: 100, sp: 70},
    weightkg: 58.2,
    abilities: {0: 'Tangled Feet'},
  },
  Nickit: {
    types: ['Dark'],
    bs: {hp: 40, at: 28, df: 28, sa: 47, sd: 52, sp: 50},
    weightkg: 8.9,
    nfe: true,
    abilities: {0: 'Run Away'},
  },
  Obstagoon: {
    types: ['Dark', 'Normal'],
    bs: {hp: 93, at: 90, df: 101, sa: 60, sd: 81, sp: 95},
    weightkg: 46,
    abilities: {0: 'Reckless'},
  },
  Orbeetle: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 60, at: 45, df: 110, sa: 80, sd: 120, sp: 90},
    weightkg: 40.8,
    abilities: {0: 'Swarm'},
    otherFormes: ['Orbeetle-Gmax'],
  },
  Perrserker: {
    types: ['Steel'],
    bs: {hp: 70, at: 110, df: 100, sa: 50, sd: 60, sp: 50},
    weightkg: 28,
    abilities: {0: 'Battle Armor'},
  },
  'Pikachu-World': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    gender: 'M',
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  Pincurchin: {
    types: ['Electric'],
    bs: {hp: 48, at: 101, df: 95, sa: 91, sd: 85, sp: 15},
    weightkg: 1,
    abilities: {0: 'Lightning Rod'},
  },
  Polteageist: {
    types: ['Ghost'],
    bs: {hp: 60, at: 65, df: 65, sa: 134, sd: 114, sp: 70},
    weightkg: 0.4,
    gender: 'N',
    abilities: {0: 'Weak Armor'},
    otherFormes: ['Polteageist-Antique'],
  },
  'Polteageist-Antique': {
    types: ['Ghost'],
    bs: {hp: 60, at: 65, df: 65, sa: 134, sd: 114, sp: 70},
    weightkg: 0.4,
    gender: 'N',
    abilities: {0: 'Weak Armor'},
    baseSpecies: 'Polteageist',
  },
  'Ponyta-Galar': {
    types: ['Psychic'],
    bs: {hp: 50, at: 85, df: 55, sa: 65, sd: 65, sp: 90},
    weightkg: 24,
    nfe: true,
    abilities: {0: 'Run Away'},
    baseSpecies: 'Ponyta',
  },
  Raboot: {
    types: ['Fire'],
    bs: {hp: 65, at: 86, df: 60, sa: 55, sd: 60, sp: 94},
    weightkg: 9,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  'Rapidash-Galar': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 65, at: 100, df: 70, sa: 80, sd: 80, sp: 105},
    weightkg: 80,
    abilities: {0: 'Run Away'},
    baseSpecies: 'Rapidash',
  },
  Regidrago: {
    types: ['Dragon'],
    bs: {hp: 200, at: 100, df: 50, sa: 100, sd: 50, sp: 80},
    weightkg: 200,
    gender: 'N',
    abilities: {0: 'Dragon\'s Maw'},
  },
  Regieleki: {
    types: ['Electric'],
    bs: {hp: 80, at: 100, df: 50, sa: 100, sd: 50, sp: 200},
    weightkg: 145,
    gender: 'N',
    abilities: {0: 'Transistor'},
  },
  Rillaboom: {
    types: ['Grass'],
    bs: {hp: 100, at: 125, df: 90, sa: 60, sd: 70, sp: 85},
    weightkg: 90,
    abilities: {0: 'Overgrow'},
    otherFormes: ['Rillaboom-Gmax'],
  },
  Rolycoly: {
    types: ['Rock'],
    bs: {hp: 30, at: 40, df: 50, sa: 40, sd: 50, sp: 30},
    weightkg: 12,
    nfe: true,
    abilities: {0: 'Steam Engine'},
  },
  Rookidee: {
    types: ['Flying'],
    bs: {hp: 38, at: 47, df: 35, sa: 33, sd: 35, sp: 57},
    weightkg: 1.8,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Runerigus: {
    types: ['Ground', 'Ghost'],
    bs: {hp: 58, at: 95, df: 145, sa: 50, sd: 105, sp: 30},
    weightkg: 66.6,
    abilities: {0: 'Wandering Spirit'},
  },
  Saharaja: {
    types: ['Ground'],
    bs: {hp: 70, at: 112, df: 105, sa: 65, sd: 123, sp: 78},
    weightkg: 303.9,
    abilities: {0: 'Water Absorb'},
  },
  Saharascal: {
    types: ['Ground'],
    bs: {hp: 50, at: 80, df: 65, sa: 45, sd: 90, sp: 70},
    weightkg: 48,
    nfe: true,
    abilities: {0: 'Water Absorb'},
  },
  Sandaconda: {
    types: ['Ground'],
    bs: {hp: 72, at: 107, df: 125, sa: 65, sd: 70, sp: 71},
    weightkg: 65.5,
    abilities: {0: 'Sand Spit'},
    otherFormes: ['Sandaconda-Gmax'],
  },
  Scorbunny: {
    types: ['Fire'],
    bs: {hp: 50, at: 71, df: 40, sa: 40, sd: 40, sp: 69},
    weightkg: 4.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Silicobra: {
    types: ['Ground'],
    bs: {hp: 52, at: 57, df: 75, sa: 35, sd: 50, sp: 46},
    weightkg: 7.6,
    nfe: true,
    abilities: {0: 'Sand Spit'},
  },
  Sinistea: {
    types: ['Ghost'],
    bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
    weightkg: 0.2,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Weak Armor'},
    otherFormes: ['Sinistea-Antique'],
  },
  'Sinistea-Antique': {
    types: ['Ghost'],
    bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
    weightkg: 0.2,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Weak Armor'},
    baseSpecies: 'Sinistea',
  },
  'Sirfetch\u2019d': {
    types: ['Fighting'],
    bs: {hp: 62, at: 135, df: 95, sa: 68, sd: 82, sp: 65},
    weightkg: 117,
    abilities: {0: 'Steadfast'},
  },
  Sizzlipede: {
    types: ['Fire', 'Bug'],
    bs: {hp: 50, at: 65, df: 45, sa: 50, sd: 50, sp: 45},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Flash Fire'},
  },
  Skwovet: {
    types: ['Normal'],
    bs: {hp: 70, at: 55, df: 55, sa: 35, sd: 35, sp: 25},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Cheek Pouch'},
  },
  'Slowbro-Galar': {
    types: ['Poison', 'Psychic'],
    bs: {hp: 95, at: 100, df: 95, sa: 100, sd: 70, sp: 30},
    weightkg: 70.5,
    abilities: {0: 'Quick Draw'},
    baseSpecies: 'Slowbro',
  },
  'Slowking-Galar': {
    types: ['Poison', 'Psychic'],
    bs: {hp: 95, at: 65, df: 80, sa: 110, sd: 110, sp: 30},
    weightkg: 79.5,
    abilities: {0: 'Curious Medicine'},
    baseSpecies: 'Slowking',
  },
  'Slowpoke-Galar': {
    types: ['Psychic'],
    bs: {hp: 90, at: 65, df: 65, sa: 40, sd: 40, sp: 15},
    weightkg: 36,
    nfe: true,
    abilities: {0: 'Gluttony'},
    baseSpecies: 'Slowpoke',
  },
  Solotl: {
    types: ['Fire', 'Dragon'],
    bs: {hp: 68, at: 48, df: 34, sa: 72, sd: 24, sp: 84},
    weightkg: 11.8,
    nfe: true,
    abilities: {0: 'Regenerator'},
  },
  Snom: {
    types: ['Ice', 'Bug'],
    bs: {hp: 30, at: 25, df: 35, sa: 45, sd: 30, sp: 20},
    weightkg: 3.8,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Sobble: {
    types: ['Water'],
    bs: {hp: 50, at: 40, df: 40, sa: 70, sd: 40, sp: 70},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Spectrier: {
    types: ['Ghost'],
    bs: {hp: 100, at: 65, df: 60, sa: 145, sd: 80, sp: 130},
    weightkg: 44.5,
    gender: 'N',
    abilities: {0: 'Grim Neigh'},
  },
  Stonjourner: {
    types: ['Rock'],
    bs: {hp: 100, at: 125, df: 135, sa: 20, sd: 20, sp: 70},
    weightkg: 520,
    abilities: {0: 'Power Spot'},
  },
  'Stunfisk-Galar': {
    types: ['Ground', 'Steel'],
    bs: {hp: 109, at: 81, df: 99, sa: 66, sd: 84, sp: 32},
    weightkg: 20.5,
    abilities: {0: 'Mimicry'},
    baseSpecies: 'Stunfisk',
  },
  Thievul: {
    types: ['Dark'],
    bs: {hp: 70, at: 58, df: 58, sa: 87, sd: 92, sp: 90},
    weightkg: 19.9,
    abilities: {0: 'Run Away'},
  },
  Thwackey: {
    types: ['Grass'],
    bs: {hp: 70, at: 85, df: 70, sa: 55, sd: 60, sp: 80},
    weightkg: 14,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Toxel: {
    types: ['Electric', 'Poison'],
    bs: {hp: 40, at: 38, df: 35, sa: 54, sd: 35, sp: 40},
    weightkg: 11,
    nfe: true,
    abilities: {0: 'Rattled'},
  },
  Toxtricity: {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 40,
    abilities: {0: 'Punk Rock'},
    otherFormes: ['Toxtricity-Gmax', 'Toxtricity-Low-Key', 'Toxtricity-Low-Key-Gmax'],
  },
  'Toxtricity-Low-Key': {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 40,
    abilities: {0: 'Punk Rock'},
    baseSpecies: 'Toxtricity',
  },
  Urshifu: {
    types: ['Fighting', 'Dark'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 105,
    abilities: {0: 'Unseen Fist'},
    otherFormes: ['Urshifu-Gmax', 'Urshifu-Rapid-Strike', 'Urshifu-Rapid-Strike-Gmax'],
  },
  'Urshifu-Rapid-Strike': {
    types: ['Fighting', 'Water'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 105,
    abilities: {0: 'Unseen Fist'},
    baseSpecies: 'Urshifu',
  },
  Venomicon: {
    types: ['Poison', 'Flying'],
    bs: {hp: 85, at: 50, df: 113, sa: 118, sd: 90, sp: 64},
    weightkg: 11.5,
    gender: 'N',
    abilities: {0: 'Stamina'},
    otherFormes: ['Venomicon-Epilogue'],
  },
  'Venomicon-Epilogue': {
    types: ['Poison', 'Flying'],
    bs: {hp: 85, at: 102, df: 85, sa: 62, sd: 85, sp: 101},
    weightkg: 12.4,
    gender: 'N',
    abilities: {0: 'Tinted Lens'},
    baseSpecies: 'Venomicon',
  },
  'Weezing-Galar': {
    types: ['Poison', 'Fairy'],
    bs: {hp: 65, at: 90, df: 120, sa: 85, sd: 70, sp: 60},
    weightkg: 16,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Weezing',
  },
  Wooloo: {
    types: ['Normal'],
    bs: {hp: 42, at: 40, df: 55, sa: 40, sd: 45, sp: 48},
    weightkg: 6,
    nfe: true,
    abilities: {0: 'Fluffy'},
  },
  'Yamask-Galar': {
    types: ['Ground', 'Ghost'],
    bs: {hp: 38, at: 55, df: 85, sa: 30, sd: 65, sp: 30},
    weightkg: 1.5,
    nfe: true,
    abilities: {0: 'Wandering Spirit'},
    baseSpecies: 'Yamask',
  },
  Yamper: {
    types: ['Electric'],
    bs: {hp: 59, at: 45, df: 50, sa: 40, sd: 50, sp: 26},
    weightkg: 13.5,
    nfe: true,
    abilities: {0: 'Ball Fetch'},
  },
  Zacian: {
    types: ['Fairy'],
    bs: {hp: 92, at: 130, df: 115, sa: 80, sd: 115, sp: 138},
    weightkg: 110,
    gender: 'N',
    abilities: {0: 'Intrepid Sword'},
    otherFormes: ['Zacian-Crowned'],
  },
  'Zacian-Crowned': {
    types: ['Fairy', 'Steel'],
    bs: {hp: 92, at: 170, df: 115, sa: 80, sd: 115, sp: 148},
    weightkg: 355,
    gender: 'N',
    abilities: {0: 'Intrepid Sword'},
    baseSpecies: 'Zacian',
  },
  Zamazenta: {
    types: ['Fighting'],
    bs: {hp: 92, at: 130, df: 115, sa: 80, sd: 115, sp: 138},
    weightkg: 210,
    gender: 'N',
    abilities: {0: 'Dauntless Shield'},
    otherFormes: ['Zamazenta-Crowned'],
  },
  'Zamazenta-Crowned': {
    types: ['Fighting', 'Steel'],
    bs: {hp: 92, at: 130, df: 145, sa: 80, sd: 145, sp: 128},
    weightkg: 785,
    gender: 'N',
    abilities: {0: 'Dauntless Shield'},
    baseSpecies: 'Zamazenta',
  },
  'Zapdos-Galar': {
    types: ['Fighting', 'Flying'],
    bs: {hp: 90, at: 125, df: 90, sa: 85, sd: 90, sp: 100},
    weightkg: 58.2,
    gender: 'N',
    abilities: {0: 'Defiant'},
    baseSpecies: 'Zapdos',
  },
  Zarude: {
    types: ['Dark', 'Grass'],
    bs: {hp: 105, at: 120, df: 105, sa: 70, sd: 95, sp: 105},
    weightkg: 70,
    gender: 'N',
    abilities: {0: 'Leaf Guard'},
    otherFormes: ['Zarude-Dada'],
  },
  'Zarude-Dada': {
    types: ['Dark', 'Grass'],
    bs: {hp: 105, at: 120, df: 105, sa: 70, sd: 95, sp: 105},
    weightkg: 70,
    gender: 'N',
    abilities: {0: 'Leaf Guard'},
    baseSpecies: 'Zarude',
  },
  'Zigzagoon-Galar': {
    types: ['Dark', 'Normal'],
    bs: {hp: 38, at: 30, df: 41, sa: 30, sd: 41, sp: 60},
    weightkg: 17.5,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Zigzagoon',
  },
  // gmax formes
  'Alcremie-Gmax': {
    types: ['Fairy'],
    bs: {hp: 65, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
    weightkg: 0,
    gender: 'F',
    abilities: {0: 'Sweet Veil'},
    baseSpecies: 'Alcremie',
  },
  'Appletun-Gmax': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 110, at: 85, df: 80, sa: 100, sd: 80, sp: 30},
    weightkg: 0,
    abilities: {0: 'Ripen'},
    baseSpecies: 'Appletun',
  },
  'Blastoise-Gmax': {
    types: ['Water'],
    bs: {hp: 79, at: 83, df: 100, sa: 85, sd: 105, sp: 78},
    weightkg: 0,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Blastoise',
  },
  'Butterfree-Gmax': {
    types: ['Bug', 'Flying'],
    bs: {hp: 60, at: 45, df: 50, sa: 90, sd: 80, sp: 70},
    weightkg: 0,
    abilities: {0: 'Compound Eyes'},
    baseSpecies: 'Butterfree',
  },
  'Centiskorch-Gmax': {
    types: ['Fire', 'Bug'],
    bs: {hp: 100, at: 115, df: 65, sa: 90, sd: 90, sp: 65},
    weightkg: 0,
    abilities: {0: 'Flash Fire'},
    baseSpecies: 'Centiskorch',
  },
  'Charizard-Gmax': {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 84, df: 78, sa: 109, sd: 85, sp: 100},
    weightkg: 0,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Charizard',
  },
  'Cinderace-Gmax': {
    types: ['Fire'],
    bs: {hp: 80, at: 116, df: 75, sa: 65, sd: 75, sp: 119},
    weightkg: 0,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Cinderace',
  },
  'Coalossal-Gmax': {
    types: ['Rock', 'Fire'],
    bs: {hp: 110, at: 80, df: 120, sa: 80, sd: 90, sp: 30},
    weightkg: 0,
    abilities: {0: 'Steam Engine'},
    baseSpecies: 'Coalossal',
  },
  'Copperajah-Gmax': {
    types: ['Steel'],
    bs: {hp: 122, at: 130, df: 69, sa: 80, sd: 69, sp: 30},
    weightkg: 0,
    abilities: {0: 'Sheer Force'},
    baseSpecies: 'Copperajah',
  },
  'Corviknight-Gmax': {
    types: ['Flying', 'Steel'],
    bs: {hp: 98, at: 87, df: 105, sa: 53, sd: 85, sp: 67},
    weightkg: 0,
    abilities: {0: 'Pressure'},
    baseSpecies: 'Corviknight',
  },
  'Drednaw-Gmax': {
    types: ['Water', 'Rock'],
    bs: {hp: 90, at: 115, df: 90, sa: 48, sd: 68, sp: 74},
    weightkg: 0,
    abilities: {0: 'Strong Jaw'},
    baseSpecies: 'Drednaw',
  },
  'Duraludon-Gmax': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 70, at: 95, df: 115, sa: 120, sd: 50, sp: 85},
    weightkg: 0,
    abilities: {0: 'Light Metal'},
    baseSpecies: 'Duraludon',
  },
  'Eevee-Gmax': {
    types: ['Normal'],
    bs: {hp: 55, at: 55, df: 50, sa: 45, sd: 65, sp: 55},
    weightkg: 0,
    abilities: {0: 'Run Away'},
    baseSpecies: 'Eevee',
  },
  'Flapple-Gmax': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 70, at: 110, df: 80, sa: 95, sd: 60, sp: 70},
    weightkg: 0,
    abilities: {0: 'Ripen'},
    baseSpecies: 'Flapple',
  },
  'Garbodor-Gmax': {
    types: ['Poison'],
    bs: {hp: 80, at: 95, df: 82, sa: 60, sd: 82, sp: 75},
    weightkg: 0,
    abilities: {0: 'Stench'},
    baseSpecies: 'Garbodor',
  },
  'Gengar-Gmax': {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 60, sa: 130, sd: 75, sp: 110},
    weightkg: 0,
    abilities: {0: 'Cursed Body'},
    baseSpecies: 'Gengar',
  },
  'Grimmsnarl-Gmax': {
    types: ['Dark', 'Fairy'],
    bs: {hp: 95, at: 120, df: 65, sa: 95, sd: 75, sp: 60},
    weightkg: 0,
    gender: 'M',
    abilities: {0: 'Prankster'},
    baseSpecies: 'Grimmsnarl',
  },
  'Hatterene-Gmax': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 57, at: 90, df: 95, sa: 136, sd: 103, sp: 29},
    weightkg: 0,
    gender: 'F',
    abilities: {0: 'Healer'},
    baseSpecies: 'Hatterene',
  },
  'Inteleon-Gmax': {
    types: ['Water'],
    bs: {hp: 70, at: 85, df: 65, sa: 125, sd: 65, sp: 120},
    weightkg: 0,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Inteleon',
  },
  'Kingler-Gmax': {
    types: ['Water'],
    bs: {hp: 55, at: 130, df: 115, sa: 50, sd: 50, sp: 75},
    weightkg: 0,
    abilities: {0: 'Hyper Cutter'},
    baseSpecies: 'Kingler',
  },
  'Lapras-Gmax': {
    types: ['Water', 'Ice'],
    bs: {hp: 130, at: 85, df: 80, sa: 85, sd: 95, sp: 60},
    weightkg: 0,
    abilities: {0: 'Water Absorb'},
    baseSpecies: 'Lapras',
  },
  'Machamp-Gmax': {
    types: ['Fighting'],
    bs: {hp: 90, at: 130, df: 80, sa: 65, sd: 85, sp: 55},
    weightkg: 0,
    abilities: {0: 'Guts'},
    baseSpecies: 'Machamp',
  },
  'Melmetal-Gmax': {
    types: ['Steel'],
    bs: {hp: 135, at: 143, df: 143, sa: 80, sd: 65, sp: 34},
    weightkg: 0,
    gender: 'N',
    abilities: {0: 'Iron Fist'},
    baseSpecies: 'Melmetal',
  },
  'Meowth-Gmax': {
    types: ['Normal'],
    bs: {hp: 40, at: 45, df: 35, sa: 40, sd: 40, sp: 90},
    weightkg: 0,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Meowth',
  },
  'Orbeetle-Gmax': {
    types: ['Bug', 'Psychic'],
    bs: {hp: 60, at: 45, df: 110, sa: 80, sd: 120, sp: 90},
    weightkg: 0,
    abilities: {0: 'Swarm'},
    baseSpecies: 'Orbeetle',
  },
  'Pikachu-Gmax': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 0,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Rillaboom-Gmax': {
    types: ['Grass'],
    bs: {hp: 100, at: 125, df: 90, sa: 60, sd: 70, sp: 85},
    weightkg: 0,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Rillaboom',
  },
  'Sandaconda-Gmax': {
    types: ['Ground'],
    bs: {hp: 72, at: 107, df: 125, sa: 65, sd: 70, sp: 71},
    weightkg: 0,
    abilities: {0: 'Sand Spit'},
    baseSpecies: 'Sandaconda',
  },
  'Snorlax-Gmax': {
    types: ['Normal'],
    bs: {hp: 160, at: 110, df: 65, sa: 65, sd: 110, sp: 30},
    weightkg: 0,
    abilities: {0: 'Immunity'},
    baseSpecies: 'Snorlax',
  },
  'Toxtricity-Gmax': {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 0,
    abilities: {0: 'Punk Rock'},
    baseSpecies: 'Toxtricity',
  },
  'Toxtricity-Low-Key-Gmax': {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 0,
    abilities: {0: 'Punk Rock'},
    baseSpecies: 'Toxtricity',
  },
  'Urshifu-Gmax': {
    types: ['Fighting', 'Dark'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 0,
    abilities: {0: 'Unseen Fist'},
    baseSpecies: 'Urshifu',
  },
  'Urshifu-Rapid-Strike-Gmax': {
    types: ['Fighting', 'Water'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 0,
    abilities: {0: 'Unseen Fist'},
    baseSpecies: 'Urshifu',
  },
  'Venusaur-Gmax': {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 82, df: 83, sa: 100, sd: 100, sp: 80},
    weightkg: 0,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Venusaur',
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);

delete SS['Pikachu-Starter'];
delete SS['Eevee-Starter'];

const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Arcanine: {otherFormes: ['Arcanine-Hisui']},
  Avalugg: {otherFormes: ['Avalugg-Hisui']},
  Basculin: {otherFormes: ['Basculin-Blue-Striped', 'Basculin-White-Striped']},
  Braviary: {otherFormes: ['Braviary-Hisui']},
  Decidueye: {otherFormes: ['Decidueye-Hisui']},
  Dialga: {otherFormes: ['Dialga-Origin']},
  Electrode: {otherFormes: ['Electrode-Hisui']},
  Goodra: {otherFormes: ['Goodra-Hisui']},
  Growlithe: {otherFormes: ['Growlithe-Hisui']},
  Lilligant: {otherFormes: ['Lilligant-Hisui']},
  Palkia: {otherFormes: ['Palkia-Origin']},
  Qwilfish: {otherFormes: ['Qwilfish-Hisui']},
  Samurott: {otherFormes: ['Samurott-Hisui']},
  Sliggoo: {otherFormes: ['Sliggoo-Hisui']},
  Sneasel: {otherFormes: ['Sneasel-Hisui']},
  Stantler: {nfe: true},
  Typhlosion: {otherFormes: ['Typhlosion-Hisui']},
  Ursaring: {nfe: true},
  Voltorb: {otherFormes: ['Voltorb-Hisui']},
  Zoroark: {otherFormes: ['Zoroark-Hisui']},
  Zorua: {otherFormes: ['Zorua-Hisui']},
  'Arcanine-Hisui': {
    types: ['Fire', 'Rock'],
    bs: {hp: 95, at: 115, df: 80, sa: 95, sd: 80, sp: 90},
    weightkg: 168,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Arcanine',
  },
  'Avalugg-Hisui': {
    types: ['Ice', 'Rock'],
    bs: {hp: 95, at: 127, df: 184, sa: 34, sd: 36, sp: 38},
    weightkg: 262.4,
    abilities: {0: 'Strong Jaw'},
    baseSpecies: 'Avalugg',
  },
  Basculegion: {
    types: ['Water', 'Ghost'],
    bs: {hp: 120, at: 112, df: 65, sa: 80, sd: 75, sp: 78},
    weightkg: 110,
    gender: 'M',
    abilities: {0: 'Swift Swim'},
    otherFormes: ['Basculegion-F'],
  },
  'Basculegion-F': {
    types: ['Water', 'Ghost'],
    bs: {hp: 120, at: 92, df: 65, sa: 100, sd: 75, sp: 78},
    weightkg: 110,
    gender: 'F',
    abilities: {0: 'Swift Swim'},
    baseSpecies: 'Basculegion',
  },
  'Basculin-White-Striped': {
    types: ['Water'],
    bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 98},
    weightkg: 18,
    nfe: true,
    abilities: {0: 'Rattled'},
    baseSpecies: 'Basculin',
  },
  'Braviary-Hisui': {
    types: ['Psychic', 'Flying'],
    bs: {hp: 110, at: 83, df: 70, sa: 112, sd: 70, sp: 65},
    weightkg: 43.4,
    gender: 'M',
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Braviary',
  },
  'Decidueye-Hisui': {
    types: ['Grass', 'Fighting'],
    bs: {hp: 88, at: 112, df: 80, sa: 95, sd: 95, sp: 60},
    weightkg: 37,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Decidueye',
  },
  'Dialga-Origin': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 100, at: 100, df: 120, sa: 150, sd: 120, sp: 90},
    weightkg: 850,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Dialga',
  },
  'Electrode-Hisui': {
    types: ['Electric', 'Grass'],
    bs: {hp: 60, at: 50, df: 70, sa: 80, sd: 80, sp: 150},
    weightkg: 71,
    gender: 'N',
    abilities: {0: 'Soundproof'},
    baseSpecies: 'Electrode',
  },
  Enamorus: {
    types: ['Fairy', 'Flying'],
    bs: {hp: 74, at: 115, df: 70, sa: 135, sd: 80, sp: 106},
    weightkg: 48,
    gender: 'F',
    abilities: {0: 'Cute Charm'},
    otherFormes: ['Enamorus-Therian'],
  },
  'Enamorus-Therian': {
    types: ['Fairy', 'Flying'],
    bs: {hp: 74, at: 115, df: 110, sa: 135, sd: 100, sp: 46},
    weightkg: 48,
    gender: 'F',
    abilities: {0: 'Overcoat'},
    baseSpecies: 'Enamorus',
  },
  'Goodra-Hisui': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 80, at: 100, df: 100, sa: 110, sd: 150, sp: 60},
    weightkg: 334.1,
    abilities: {0: 'Sap Sipper'},
    baseSpecies: 'Goodra',
  },
  'Growlithe-Hisui': {
    types: ['Fire', 'Rock'],
    bs: {hp: 60, at: 75, df: 45, sa: 65, sd: 50, sp: 55},
    weightkg: 22.7,
    nfe: true,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Growlithe',
  },
  Kleavor: {
    types: ['Bug', 'Rock'],
    bs: {hp: 70, at: 135, df: 95, sa: 45, sd: 70, sp: 85},
    weightkg: 89,
    abilities: {0: 'Swarm'},
  },
  'Lilligant-Hisui': {
    types: ['Grass', 'Fighting'],
    bs: {hp: 70, at: 105, df: 75, sa: 50, sd: 75, sp: 105},
    weightkg: 19.2,
    gender: 'F',
    abilities: {0: 'Chlorophyll'},
    baseSpecies: 'Lilligant',
  },
  Overqwil: {
    types: ['Dark', 'Poison'],
    bs: {hp: 85, at: 115, df: 95, sa: 65, sd: 65, sp: 85},
    weightkg: 60.5,
    abilities: {0: 'Poison Point'},
  },
  'Palkia-Origin': {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 100, df: 100, sa: 150, sd: 120, sp: 120},
    weightkg: 660,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Palkia',
  },
  'Qwilfish-Hisui': {
    types: ['Dark', 'Poison'],
    bs: {hp: 65, at: 95, df: 85, sa: 55, sd: 55, sp: 85},
    weightkg: 3.9,
    nfe: true,
    abilities: {0: 'Poison Point'},
    baseSpecies: 'Qwilfish',
  },
  'Samurott-Hisui': {
    types: ['Water', 'Dark'],
    bs: {hp: 90, at: 108, df: 80, sa: 100, sd: 65, sp: 85},
    weightkg: 58.2,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Samurott',
  },
  'Sliggoo-Hisui': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 58, at: 75, df: 83, sa: 83, sd: 113, sp: 40},
    weightkg: 68.5,
    nfe: true,
    abilities: {0: 'Sap Sipper'},
    baseSpecies: 'Sliggoo',
  },
  'Sneasel-Hisui': {
    types: ['Fighting', 'Poison'],
    bs: {hp: 55, at: 95, df: 55, sa: 35, sd: 75, sp: 115},
    weightkg: 27,
    nfe: true,
    abilities: {0: 'Inner Focus'},
    baseSpecies: 'Sneasel',
  },
  Sneasler: {
    types: ['Fighting', 'Poison'],
    bs: {hp: 80, at: 130, df: 60, sa: 40, sd: 80, sp: 120},
    weightkg: 43,
    abilities: {0: 'Pressure'},
  },
  'Typhlosion-Hisui': {
    types: ['Fire', 'Ghost'],
    bs: {hp: 73, at: 84, df: 78, sa: 119, sd: 85, sp: 95},
    weightkg: 69.8,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Typhlosion',
  },
  Ursaluna: {
    types: ['Ground', 'Normal'],
    bs: {hp: 130, at: 140, df: 105, sa: 45, sd: 80, sp: 50},
    weightkg: 290,
    abilities: {0: 'Guts'},
  },
  'Voltorb-Hisui': {
    types: ['Electric', 'Grass'],
    bs: {hp: 40, at: 30, df: 50, sa: 55, sd: 55, sp: 100},
    weightkg: 13,
    gender: 'N',
    nfe: true,
    abilities: {0: 'Soundproof'},
    baseSpecies: 'Voltorb',
  },
  Wyrdeer: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 103, at: 105, df: 72, sa: 105, sd: 75, sp: 65},
    weightkg: 95.1,
    abilities: {0: 'Intimidate'},
  },
  'Zoroark-Hisui': {
    types: ['Normal', 'Ghost'],
    bs: {hp: 55, at: 100, df: 60, sa: 125, sd: 60, sp: 110},
    weightkg: 73,
    abilities: {0: 'Illusion'},
    baseSpecies: 'Zoroark',
  },
  'Zorua-Hisui': {
    types: ['Normal', 'Ghost'],
    bs: {hp: 35, at: 60, df: 40, sa: 85, sd: 40, sp: 70},
    weightkg: 12.5,
    nfe: true,
    abilities: {0: 'Illusion'},
    baseSpecies: 'Zorua',
  },
};

const SV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  	Bulbasaur: {
		types: ['Grass', 'Poison'],
		bs: {hp: 47, at: 49, df: 49, sa: 65, sd: 65, sp: 45},
		weightkg: 6.9,
		abilities: {0: 'Chloroplast'},
		innates: ['Overgrow', 'Thick Fat', 'Poison Absorb']
	},
	Ivysaur: {
		types: ['Grass', 'Poison'],
		bs: {hp: 65, at: 62, df: 68, sa: 80, sd: 80, sp: 65},
		weightkg: 13.0,
		abilities: {0: 'Chloroplast'},
		innates: ['Overgrow', 'Thick Fat', 'Poison Absorb']
	},
	Venusaur: {
		types: ['Grass', 'Poison'],
		bs: {hp: 90, at: 82, df: 83, sa: 100, sd: 100, sp: 80},
		weightkg: 100.0,
		abilities: {0: 'Chloroplast'},
		innates: ['Overgrow', 'Thick Fat', 'Poison Absorb']
	},
	Charmander: {
		types: ['Fire'],
		bs: {hp: 44, at: 52, df: 43, sa: 65, sd: 46, sp: 70},
		weightkg: 8.5,
		abilities: {0: 'Flame Body'},
		innates: ['Blaze', 'Flash Fire', 'Solar Power']
	},
	Charmeleon: {
		types: ['Fire'],
		bs: {hp: 63, at: 64, df: 58, sa: 85, sd: 65, sp: 85},
		weightkg: 19.0,
		abilities: {0: 'Flame Body'},
		innates: ['Blaze', 'Flash Fire', 'Solar Power']
	},
	Charizard: {
		types: ['Fire', 'Flying'],
		bs: {hp: 79, at: 84, df: 78, sa: 109, sd: 85, sp: 100},
		weightkg: 90.5,
		abilities: {0: 'Molten Down'},
		innates: ['Blaze', 'Draconize', 'Egoist']
	},
	Squirtle: {
		types: ['Water'],
		bs: {hp: 50, at: 48, df: 65, sa: 50, sd: 64, sp: 43},
		weightkg: 9.0,
		abilities: {0: 'Stamina'},
		innates: ['Torrent', 'Shell Armor', 'Water Veil']
	},
	Wartortle: {
		types: ['Water'],
		bs: {hp: 64, at: 63, df: 80, sa: 70, sd: 85, sp: 58},
		weightkg: 22.5,
		abilities: {0: 'Stamina'},
		innates: ['Torrent', 'Shell Armor', 'Water Veil']
	},
	Blastoise: {
		types: ['Water'],
		bs: {hp: 84, at: 83, df: 100, sa: 85, sd: 105, sp: 78},
		weightkg: 85.5,
		abilities: {0: 'Stamina'},
		innates: ['Torrent', 'Shell Armor', 'Mega Launcher']
	},
	Caterpie: {
		types: ['Bug'],
		bs: {hp: 45, at: 30, df: 35, sa: 20, sd: 20, sp: 45},
		weightkg: 2.9,
		abilities: {0: 'Anticipation'},
		innates: ['Swarm', 'Shield Dust', 'Coward']
	},
	Metapod: {
		types: ['Bug'],
		bs: {hp: 50, at: 20, df: 55, sa: 25, sd: 25, sp: 30},
		weightkg: 9.9,
		abilities: {0: 'Shed Skin'},
		innates: ['Swarm', 'Shield Dust', 'Overcoat']
	},
	Butterfree: {
		types: ['Bug', 'Psychic'],
		bs: {hp: 75, at: 55, df: 50, sa: 110, sd: 95, sp: 90},
		weightkg: 32.0,
		abilities: {0: 'Tinted Lens'},
		innates: ['Majestic Moth', 'Compound Eyes', 'Levitate']
	},
	Weedle: {
		types: ['Bug', 'Poison'],
		bs: {hp: 40, at: 35, df: 30, sa: 20, sd: 20, sp: 50},
		weightkg: 3.2,
		abilities: {0: 'Infiltrator'},
		innates: ['Swarm', 'Shield Dust', 'Poison Point']
	},
	Kakuna: {
		types: ['Bug', 'Poison'],
		bs: {hp: 45, at: 25, df: 50, sa: 25, sd: 25, sp: 35},
		weightkg: 10.0,
		abilities: {0: 'Shed Skin'},
		innates: ['Swarm', 'Shield Dust', 'Overcoat']
	},
	Beedrill: {
		types: ['Bug', 'Poison'],
		bs: {hp: 65, at: 110, df: 40, sa: 45, sd: 80, sp: 135},
		weightkg: 29.5,
		abilities: {0: 'Poison Touch'},
		innates: ['Hyper Aggressive', 'Merciless', 'Levitate']
	},
	Pidgey: {
		types: ['Normal', 'Flying'],
		bs: {hp: 40, at: 35, df: 40, sa: 45, sd: 35, sp: 56},
		weightkg: 1.8,
		abilities: {0: 'No Guard'},
		innates: ['Flock', 'Keen Eye', 'Dust Cloud']
	},
	Pidgeotto: {
		types: ['Normal', 'Flying'],
		bs: {hp: 63, at: 70, df: 55, sa: 65, sd: 50, sp: 91},
		weightkg: 30.0,
		abilities: {0: 'Majestic Bird'},
		innates: ['Flock', 'Keen Eye', 'Giant Wings']
	},
	Pidgeot: {
		types: ['Normal', 'Flying'],
		bs: {hp: 83, at: 80, df: 75, sa: 85, sd: 70, sp: 101},
		weightkg: 39.5,
		abilities: {0: 'Majestic Bird'},
		innates: ['Flock', 'Keen Eye', 'Giant Wings']
	},
	Rattata: {
		types: ['Normal'],
		bs: {hp: 30, at: 56, df: 35, sa: 25, sd: 35, sp: 72},
		weightkg: 3.5,
		abilities: {0: 'Hustle'},
		innates: ['Guts', 'Quick Feet', 'Run Away']
	},
	Raticate: {
		types: ['Normal'],
		bs: {hp: 55, at: 81, df: 60, sa: 50, sd: 70, sp: 97},
		weightkg: 18.5,
		abilities: {0: 'Hustle'},
		innates: ['Guts', 'Quick Feet', 'Growing Tooth']
	},
	Spearow: {
		types: ['Normal', 'Flying'],
		bs: {hp: 40, at: 60, df: 30, sa: 31, sd: 31, sp: 70},
		weightkg: 2.0,
		abilities: {0: 'Accelerate'},
		innates: ['Frisk', 'Ambush', 'Big Pecks']
	},
	Fearow: {
		types: ['Normal', 'Flying'],
		bs: {hp: 65, at: 110, df: 75, sa: 61, sd: 71, sp: 100},
		weightkg: 38.0,
		abilities: {0: 'Sniper'},
		innates: ['Intimidate', 'Ambush', 'Big Pecks']
	},
	Ekans: {
		types: ['Poison'],
		bs: {hp: 55, at: 60, df: 49, sa: 40, sd: 59, sp: 55},
		weightkg: 6.9,
		abilities: {0: 'Merciless'},
		innates: ['Solenoglyphs', 'Shed Skin', 'Coil Up']
	},
	Arbok: {
		types: ['Poison', 'Dark'],
		bs: {hp: 90, at: 105, df: 84, sa: 65, sd: 84, sp: 80},
		weightkg: 65.0,
		abilities: {0: 'Merciless'},
		innates: ['Solenoglyphs', 'Shed Skin', 'Coil Up']
	},
	Pikachu: {
		types: ['Electric'],
		bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 95},
		weightkg: 6.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Short Circuit', 'Static', 'Ground Shock']
	},
	Raichu: {
		types: ['Electric', 'Ground'],
		bs: {hp: 60, at: 90, df: 55, sa: 90, sd: 80, sp: 115},
		weightkg: 30.0,
		abilities: {0: 'Earthbound'},
		innates: ['Short Circuit', 'Static', 'Ground Shock']
	},
	Sandshrew: {
		types: ['Ground'],
		bs: {hp: 70, at: 75, df: 85, sa: 20, sd: 30, sp: 40},
		weightkg: 12.0,
		abilities: {0: 'Sand Veil'},
		innates: ['Earthbound', 'Sand Rush', 'Battle Armor']
	},
	Sandslash: {
		types: ['Ground'],
		bs: {hp: 95, at: 100, df: 110, sa: 45, sd: 55, sp: 65},
		weightkg: 29.5,
		abilities: {0: 'Battle Armor'},
		innates: ['Let\'s Roll', 'Loose Quills', 'Tough Claws']
	},
	'Nidoran-F': {
		types: ['Poison'],
		bs: {hp: 55, at: 47, df: 52, sa: 40, sd: 40, sp: 41},
		weightkg: 7.0,
		abilities: {0: 'Growing Tooth'},
		innates: ['Poison Point', 'Rivalry', 'Run Away']
	},
	Nidorina: {
		types: ['Poison'],
		bs: {hp: 70, at: 62, df: 67, sa: 55, sd: 55, sp: 56},
		weightkg: 20.0,
		abilities: {0: 'Friend Guard'},
		innates: ['Poison Point', 'Rivalry', 'Anticipation']
	},
	Nidoqueen: {
		types: ['Poison', 'Ground'],
		bs: {hp: 90, at: 75, df: 87, sa: 85, sd: 76, sp: 92},
		weightkg: 60.0,
		abilities: {0: 'Queenly Majesty'},
		innates: ['Poison Point', 'Parental Bond', 'Battle Armor']
	},
	'Nidoran-M': {
		types: ['Poison'],
		bs: {hp: 46, at: 57, df: 40, sa: 40, sd: 40, sp: 50},
		weightkg: 9.0,
		abilities: {0: 'Growing Tooth'},
		innates: ['Poison Point', 'Rivalry', 'Run Away']
	},
	Nidorino: {
		types: ['Poison'],
		bs: {hp: 61, at: 72, df: 57, sa: 55, sd: 55, sp: 65},
		weightkg: 19.5,
		abilities: {0: 'Violent Rush'},
		innates: ['Poison Point', 'Rivalry', 'Mighty Horn']
	},
	Nidoking: {
		types: ['Poison', 'Ground'],
		bs: {hp: 81, at: 102, df: 77, sa: 85, sd: 75, sp: 85},
		weightkg: 62.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Poison Point', 'Mighty Horn', 'Intoxicate']
	},
	Clefairy: {
		types: ['Fairy'],
		bs: {hp: 70, at: 45, df: 48, sa: 60, sd: 65, sp: 35},
		weightkg: 7.5,
		abilities: {0: 'Fairy Aura'},
		innates: ['Wonder Skin', 'Overcoat', 'Moon Spirit']
	},
	Clefable: {
		types: ['Fairy'],
		bs: {hp: 100, at: 50, df: 95, sa: 95, sd: 113, sp: 55},
		weightkg: 40.0,
		abilities: {0: 'Fairy Aura'},
		innates: ['Wonder Skin', 'Overcoat', 'Moon Spirit']
	},
	Vulpix: {
		types: ['Fire'],
		bs: {hp: 38, at: 41, df: 40, sa: 60, sd: 65, sp: 65},
		weightkg: 9.9,
		abilities: {0: 'Flash Fire'},
		innates: ['Quick Feet', 'Immolate', 'Flaming Soul']
	},
	Ninetales: {
		types: ['Fire', 'Ghost'],
		bs: {hp: 73, at: 76, df: 75, sa: 91, sd: 100, sp: 100},
		weightkg: 19.9,
		abilities: {0: 'Flaming Soul'},
		innates: ['Pyromancy', 'Flash Fire', 'Queenly Majesty']
	},
	Jigglypuff: {
		types: ['Normal', 'Fairy'],
		bs: {hp: 105, at: 45, df: 30, sa: 80, sd: 43, sp: 20},
		weightkg: 5.5,
		abilities: {0: 'Lullaby'},
		innates: ['Cute Charm', 'Inflatable', 'Let\'s Roll']
	},
	Wigglytuff: {
		types: ['Normal', 'Fairy'],
		bs: {hp: 120, at: 70, df: 45, sa: 113, sd: 80, sp: 45},
		weightkg: 12.0,
		abilities: {0: 'Lullaby'},
		innates: ['Cute Charm', 'Inflatable', 'Fur Coat']
	},
	Zubat: {
		types: ['Poison', 'Flying'],
		bs: {hp: 40, at: 45, df: 35, sa: 40, sd: 40, sp: 55},
		weightkg: 7.5,
		abilities: {0: 'Inner Focus'},
		innates: ['Sniper', 'Nocturnal', 'Mountaineer']
	},
	Golbat: {
		types: ['Poison', 'Flying'],
		bs: {hp: 75, at: 80, df: 70, sa: 75, sd: 75, sp: 90},
		weightkg: 55.0,
		abilities: {0: 'Mountaineer'},
		innates: ['Sniper', 'Nocturnal', 'Infiltrator']
	},
	Oddish: {
		types: ['Grass', 'Poison'],
		bs: {hp: 45, at: 50, df: 55, sa: 85, sd: 75, sp: 30},
		weightkg: 5.4,
		abilities: {0: 'Poison Absorb'},
		innates: ['Regenerator', 'Grass Pelt', 'Natural Cure']
	},
	Gloom: {
		types: ['Grass', 'Poison'],
		bs: {hp: 60, at: 65, df: 70, sa: 95, sd: 85, sp: 40},
		weightkg: 8.6,
		abilities: {0: 'Poison Absorb'},
		innates: ['Regenerator', 'Grass Pelt', 'Natural Cure']
	},
	Vileplume: {
		types: ['Grass', 'Poison'],
		bs: {hp: 90, at: 75, df: 95, sa: 120, sd: 100, sp: 50},
		weightkg: 18.6,
		abilities: {0: 'Poison Absorb'},
		innates: ['Natural Recovery', 'Biofilm', 'Toxic Surge']
	},
	Paras: {
		types: ['Bug', 'Grass'],
		bs: {hp: 45, at: 75, df: 65, sa: 50, sd: 90, sp: 25},
		weightkg: 5.4,
		abilities: {0: 'Fungal Infection'},
		innates: ['Effect Spore', 'Overcoat', 'Dry Skin']
	},
	Parasect: {
		types: ['Bug', 'Grass'],
		bs: {hp: 80, at: 100, df: 95, sa: 70, sd: 140, sp: 30},
		weightkg: 29.5,
		abilities: {0: 'Self Sufficient'},
		innates: ['Parasitic Spores', 'Phantom', 'Opportunist']
	},
	Venonat: {
		types: ['Bug', 'Poison'],
		bs: {hp: 60, at: 55, df: 50, sa: 55, sd: 55, sp: 55},
		weightkg: 30.0,
		abilities: {0: 'Tinted Lens'},
		innates: ['Compound Eyes', 'Nocturnal', 'Magical Dust']
	},
	Venomoth: {
		types: ['Bug', 'Poison'],
		bs: {hp: 70, at: 65, df: 60, sa: 85, sd: 75, sp: 100},
		weightkg: 12.5,
		abilities: {0: 'Tinted Lens'},
		innates: ['Compound Eyes', 'Wonder Skin', 'Majestic Moth']
	},
	Diglett: {
		types: ['Ground'],
		bs: {hp: 10, at: 55, df: 25, sa: 35, sd: 45, sp: 95},
		weightkg: 0.8,
		abilities: {0: 'Sand Rush'},
		innates: ['Field Explorer', 'Earthbound', 'Speed Force']
	},
	Dugtrio: {
		types: ['Ground'],
		bs: {hp: 35, at: 100, df: 50, sa: 50, sd: 70, sp: 120},
		weightkg: 33.3,
		abilities: {0: 'Sand Rush'},
		innates: ['Multi-Headed', 'Sand Force', 'Speed Force']
	},
	Meowth: {
		types: ['Normal'],
		bs: {hp: 40, at: 55, df: 35, sa: 65, sd: 40, sp: 90},
		weightkg: 4.2,
		abilities: {0: 'Sniper'},
		innates: ['Perfectionist', 'Technician', 'Opportunist']
	},
	Persian: {
		types: ['Normal'],
		bs: {hp: 65, at: 85, df: 60, sa: 105, sd: 65, sp: 115},
		weightkg: 32.0,
		abilities: {0: 'Perfectionist'},
		innates: ['Sniper', 'Technician', 'Opportunist']
	},
	Psyduck: {
		types: ['Water'],
		bs: {hp: 50, at: 52, df: 48, sa: 75, sd: 50, sp: 55},
		weightkg: 19.6,
		abilities: {0: 'Cloud Nine'},
		innates: ['Weather Control', 'Psychic Mind', 'Insomnia']
	},
	Golduck: {
		types: ['Water', 'Psychic'],
		bs: {hp: 80, at: 82, df: 78, sa: 115, sd: 80, sp: 85},
		weightkg: 76.6,
		abilities: {0: 'Cloud Nine'},
		innates: ['Weather Control', 'Psychic Mind', 'Swift Swim']
	},
	Mankey: {
		types: ['Fighting'],
		bs: {hp: 40, at: 80, df: 35, sa: 35, sd: 45, sp: 70},
		weightkg: 28.0,
		abilities: {0: 'Moxie'},
		innates: ['Fighter', 'Anger Point', 'Hyper Aggressive']
	},
	Primeape: {
		types: ['Fighting'],
		bs: {hp: 65, at: 105, df: 60, sa: 60, sd: 70, sp: 95},
		weightkg: 32.0,
		abilities: {0: 'Moxie'},
		innates: ['Violent Rush', 'Anger Point', 'Hyper Aggressive']
	},
	Growlithe: {
		types: ['Fire'],
		bs: {hp: 55, at: 70, df: 50, sa: 70, sd: 45, sp: 60},
		weightkg: 19.0,
		abilities: {0: 'Intimidate'},
		innates: ['Guard Dog', 'Justified', 'Fluffy']
	},
	Arcanine: {
		types: ['Fire'],
		bs: {hp: 90, at: 125, df: 80, sa: 115, sd: 80, sp: 110},
		weightkg: 155.0,
		abilities: {0: 'Intimidate'},
		innates: ['Guard Dog', 'Justified', 'Predator']
	},
	Poliwag: {
		types: ['Water'],
		bs: {hp: 50, at: 60, df: 40, sa: 50, sd: 40, sp: 90},
		weightkg: 12.4,
		abilities: {0: 'Hydrate'},
		innates: ['Hypnotist', 'Swift Swim', 'Hydration']
	},
	Poliwhirl: {
		types: ['Water'],
		bs: {hp: 75, at: 75, df: 65, sa: 60, sd: 50, sp: 90},
		weightkg: 20.0,
		abilities: {0: 'Hydration'},
		innates: ['Hypnotist', 'Hydrate', 'Water Absorb']
	},
	Poliwrath: {
		types: ['Water', 'Fighting'],
		bs: {hp: 90, at: 115, df: 95, sa: 75, sd: 90, sp: 70},
		weightkg: 54.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Raging Storm', 'Precise Fist', 'Water Absorb']
	},
	Abra: {
		types: ['Psychic'],
		bs: {hp: 25, at: 20, df: 15, sa: 105, sd: 55, sp: 90},
		weightkg: 19.5,
		abilities: {0: 'Mystic Power'},
		innates: ['Psychic Mind', 'Inner Focus', 'Magic Guard']
	},
	Kadabra: {
		types: ['Psychic'],
		bs: {hp: 40, at: 35, df: 30, sa: 120, sd: 70, sp: 105},
		weightkg: 56.5,
		abilities: {0: 'Mystic Power'},
		innates: ['Psychic Mind', 'Inner Focus', 'Magic Guard']
	},
	Alakazam: {
		types: ['Psychic'],
		bs: {hp: 55, at: 50, df: 45, sa: 135, sd: 95, sp: 120},
		weightkg: 48.0,
		abilities: {0: 'Mystic Power'},
		innates: ['Psychic Mind', 'Inner Focus', 'Magic Guard']
	},
	Machop: {
		types: ['Fighting'],
		bs: {hp: 70, at: 80, df: 50, sa: 35, sd: 35, sp: 35},
		weightkg: 19.5,
		abilities: {0: 'Iron Fist'},
		innates: ['No Guard', 'Quick Feet', 'Fighter']
	},
	Machoke: {
		types: ['Fighting'],
		bs: {hp: 80, at: 100, df: 70, sa: 50, sd: 60, sp: 45},
		weightkg: 70.5,
		abilities: {0: 'Iron Fist'},
		innates: ['No Guard', 'Steadfast', 'Guts']
	},
	Machamp: {
		types: ['Fighting'],
		bs: {hp: 90, at: 130, df: 80, sa: 65, sd: 85, sp: 55},
		weightkg: 130.0,
		abilities: {0: 'Guts'},
		innates: ['No Guard', 'Iron Fist', 'Precise Fist']
	},
	Bellsprout: {
		types: ['Grass', 'Poison'],
		bs: {hp: 70, at: 75, df: 35, sa: 70, sd: 30, sp: 40},
		weightkg: 4.0,
		abilities: {0: 'Chloroplast'},
		innates: ['Chlorophyll', 'Gluttony', 'Harvest']
	},
	Weepinbell: {
		types: ['Grass', 'Poison'],
		bs: {hp: 85, at: 90, df: 50, sa: 85, sd: 45, sp: 55},
		weightkg: 6.4,
		abilities: {0: 'Chloroplast'},
		innates: ['Chlorophyll', 'Gluttony', 'Corrosion']
	},
	Victreebel: {
		types: ['Grass', 'Poison'],
		bs: {hp: 100, at: 110, df: 70, sa: 110, sd: 70, sp: 70},
		weightkg: 15.5,
		abilities: {0: 'Rite Of Spring'},
		innates: ['Ambush', 'Opportunist', 'Predator']
	},
	Tentacool: {
		types: ['Water', 'Poison'],
		bs: {hp: 40, at: 40, df: 35, sa: 50, sd: 100, sp: 70},
		weightkg: 45.5,
		abilities: {0: 'Liquid Ooze'},
		innates: ['Clear Body', 'Poison Touch', 'Water Absorb']
	},
	Tentacruel: {
		types: ['Water', 'Poison'],
		bs: {hp: 80, at: 70, df: 65, sa: 80, sd: 120, sp: 100},
		weightkg: 55.0,
		abilities: {0: 'Poison Touch'},
		innates: ['Clear Body', 'Merciless', 'Water Absorb']
	},
	Geodude: {
		types: ['Rock', 'Ground'],
		bs: {hp: 40, at: 80, df: 100, sa: 30, sd: 30, sp: 20},
		weightkg: 20.0,
		abilities: {0: 'Rock Head'},
		innates: ['Let\'s Roll', 'Sturdy', 'Solid Rock']
	},
	Graveler: {
		types: ['Rock', 'Ground'],
		bs: {hp: 55, at: 95, df: 115, sa: 45, sd: 45, sp: 35},
		weightkg: 105.0,
		abilities: {0: 'Rock Head'},
		innates: ['Let\'s Roll', 'Sturdy', 'Solid Rock']
	},
	Golem: {
		types: ['Rock', 'Ground'],
		bs: {hp: 90, at: 135, df: 130, sa: 55, sd: 65, sp: 45},
		weightkg: 300.0,
		abilities: {0: 'Rock Head'},
		innates: ['Let\'s Roll', 'Sturdy', 'Mineralize']
	},
	Ponyta: {
		types: ['Fire'],
		bs: {hp: 50, at: 85, df: 55, sa: 65, sd: 65, sp: 90},
		weightkg: 30.0,
		abilities: {0: 'Reckless'},
		innates: ['Flame Body', 'Run Away', 'Speed Force']
	},
	Rapidash: {
		types: ['Fire'],
		bs: {hp: 85, at: 110, df: 70, sa: 75, sd: 80, sp: 120},
		weightkg: 95.0,
		abilities: {0: 'Reckless'},
		innates: ['Flame Body', 'Flash Fire', 'Speed Force']
	},
	Slowpoke: {
		types: ['Water', 'Psychic'],
		bs: {hp: 90, at: 65, df: 65, sa: 65, sd: 40, sp: 15},
		weightkg: 36.0,
		abilities: {0: 'Regenerator'},
		innates: ['Oblivious', 'Own Tempo', 'Unaware']
	},
	Slowbro: {
		types: ['Water', 'Psychic'],
		bs: {hp: 95, at: 75, df: 110, sa: 100, sd: 80, sp: 30},
		weightkg: 78.5,
		abilities: {0: 'Regenerator'},
		innates: ['Oblivious', 'Natural Cure', 'Shell Armor']
	},
	Magnemite: {
		types: ['Electric', 'Steel'],
		bs: {hp: 25, at: 35, df: 70, sa: 95, sd: 55, sp: 45},
		weightkg: 6.0,
		abilities: {0: 'Analytic'},
		innates: ['Filter', 'Sturdy', 'Magnet Pull']
	},
	Magneton: {
		types: ['Electric', 'Steel'],
		bs: {hp: 50, at: 60, df: 95, sa: 120, sd: 70, sp: 70},
		weightkg: 60.0,
		abilities: {0: 'Analytic'},
		innates: ['Filter', 'Multi-Headed', 'Magnet Pull']
	},
	Farfetchd: {
		types: ['Normal', 'Flying'],
		bs: {hp: 52, at: 90, df: 55, sa: 58, sd: 62, sp: 100},
		weightkg: 15.0,
		abilities: {0: 'Super Luck'},
		innates: ['Hyper Cutter', 'Field Explorer', 'Keen Edge']
	},
	Doduo: {
		types: ['Normal', 'Flying'],
		bs: {hp: 65, at: 85, df: 45, sa: 35, sd: 35, sp: 85},
		weightkg: 39.2,
		abilities: {0: 'Speed Force'},
		innates: ['Multi-Headed', 'Grounded', 'Moxie']
	},
	Dodrio: {
		types: ['Normal', 'Flying'],
		bs: {hp: 90, at: 110, df: 70, sa: 60, sd: 60, sp: 120},
		weightkg: 85.2,
		abilities: {0: 'Vital Spirit'},
		innates: ['Multi-Headed', 'Grounded', 'Moxie']
	},
	Seel: {
		types: ['Water'],
		bs: {hp: 75, at: 45, df: 55, sa: 60, sd: 75, sp: 65},
		weightkg: 90.0,
		abilities: {0: 'Fur Coat'},
		innates: ['Thick Fat', 'Water Veil', 'Oblivious']
	},
	Dewgong: {
		types: ['Water', 'Ice'],
		bs: {hp: 90, at: 100, df: 70, sa: 100, sd: 95, sp: 90},
		weightkg: 120.0,
		abilities: {0: 'Fur Coat'},
		innates: ['Thick Fat', 'Water Veil', 'North Wind']
	},
	Grimer: {
		types: ['Poison'],
		bs: {hp: 90, at: 90, df: 50, sa: 40, sd: 50, sp: 25},
		weightkg: 30.0,
		abilities: {0: 'Poison Touch'},
		innates: ['Liquified', 'Stench', 'Sticky Hold']
	},
	Muk: {
		types: ['Poison'],
		bs: {hp: 105, at: 125, df: 75, sa: 65, sd: 100, sp: 50},
		weightkg: 30.0,
		abilities: {0: 'Poison Touch'},
		innates: ['Liquified', 'Corrosion', 'Sticky Hold']
	},
	Shellder: {
		types: ['Water'],
		bs: {hp: 30, at: 65, df: 100, sa: 45, sd: 25, sp: 40},
		weightkg: 4.0,
		abilities: {0: 'Impenetrable'},
		innates: ['Shell Armor', 'Skill Link', 'Sturdy']
	},
	Cloyster: {
		types: ['Water', 'Ice'],
		bs: {hp: 50, at: 95, df: 180, sa: 85, sd: 45, sp: 70},
		weightkg: 132.5,
		abilities: {0: 'Impenetrable'},
		innates: ['Shell Armor', 'Skill Link', 'Sturdy']
	},
	Gastly: {
		types: ['Ghost', 'Poison'],
		bs: {hp: 30, at: 35, df: 30, sa: 100, sd: 35, sp: 80},
		weightkg: 0.1,
		abilities: {0: 'Hypnotist'},
		innates: ['Levitate', 'Haunted Spirit', 'Vengeance']
	},
	Haunter: {
		types: ['Ghost', 'Poison'],
		bs: {hp: 45, at: 75, df: 45, sa: 115, sd: 55, sp: 95},
		weightkg: 0.1,
		abilities: {0: 'Prankster'},
		innates: ['Levitate', 'Scare', 'Shallow Grave']
	},
	Gengar: {
		types: ['Ghost', 'Poison'],
		bs: {hp: 65, at: 65, df: 60, sa: 130, sd: 75, sp: 110},
		weightkg: 40.5,
		abilities: {0: 'Vengeance'},
		innates: ['Levitate', 'Ectoplasm', 'Shallow Grave']
	},
	Onix: {
		types: ['Rock', 'Ground'],
		bs: {hp: 65, at: 70, df: 160, sa: 30, sd: 55, sp: 70},
		weightkg: 210.0,
		abilities: {0: 'Rock Head'},
		innates: ['Sturdy', 'Rough Skin', 'Solid Rock']
	},
	Drowzee: {
		types: ['Psychic'],
		bs: {hp: 70, at: 48, df: 45, sa: 73, sd: 90, sp: 42},
		weightkg: 32.4,
		abilities: {0: 'Magic Bounce'},
		innates: ['Hypnotist', 'Dreamcatcher', 'Insomnia']
	},
	Hypno: {
		types: ['Psychic'],
		bs: {hp: 95, at: 73, df: 70, sa: 115, sd: 115, sp: 67},
		weightkg: 75.6,
		abilities: {0: 'Magic Bounce'},
		innates: ['Hypnotist', 'Dreamcatcher', 'Insomnia']
	},
	Krabby: {
		types: ['Water'],
		bs: {hp: 55, at: 105, df: 90, sa: 25, sd: 25, sp: 50},
		weightkg: 6.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Shell Armor', 'Hyper Cutter', 'Grip Pincer']
	},
	Kingler: {
		types: ['Water'],
		bs: {hp: 80, at: 130, df: 115, sa: 50, sd: 50, sp: 75},
		weightkg: 60.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Shell Armor', 'Hyper Cutter', 'Technician']
	},
	Voltorb: {
		types: ['Electric'],
		bs: {hp: 40, at: 30, df: 50, sa: 55, sd: 55, sp: 100},
		weightkg: 10.4,
		abilities: {0: 'Soundproof'},
		innates: ['Aftermath', 'Short Circuit', 'Volt Absorb']
	},
	Electrode: {
		types: ['Electric'],
		bs: {hp: 60, at: 50, df: 70, sa: 100, sd: 80, sp: 150},
		weightkg: 66.6,
		abilities: {0: 'Volt Absorb'},
		innates: ['Aftermath', 'Electro Surge', 'Soundproof']
	},
	Exeggcute: {
		types: ['Grass', 'Psychic'],
		bs: {hp: 60, at: 40, df: 80, sa: 60, sd: 45, sp: 40},
		weightkg: 2.5,
		abilities: {0: 'Magic Bounce'},
		innates: ['Solar Power', 'Chlorophyll', 'Multi-Headed']
	},
	Exeggutor: {
		types: ['Grass', 'Psychic'],
		bs: {hp: 95, at: 95, df: 85, sa: 125, sd: 75, sp: 55},
		weightkg: 120.0,
		abilities: {0: 'Magic Bounce'},
		innates: ['Harvest', 'Chloroplast', 'Multi-Headed']
	},
	Cubone: {
		types: ['Ground'],
		bs: {hp: 50, at: 50, df: 95, sa: 40, sd: 50, sp: 35},
		weightkg: 6.5,
		abilities: {0: 'Technician'},
		innates: ['Bone Zone', 'Battle Armor', 'Rock Head']
	},
	Marowak: {
		types: ['Ground'],
		bs: {hp: 75, at: 80, df: 110, sa: 50, sd: 80, sp: 60},
		weightkg: 45.0,
		abilities: {0: 'Technician'},
		innates: ['Bone Zone', 'Battle Armor', 'Rock Head']
	},
	Hitmonlee: {
		types: ['Fighting'],
		bs: {hp: 80, at: 120, df: 53, sa: 35, sd: 110, sp: 87},
		weightkg: 49.8,
		abilities: {0: 'Unburden'},
		innates: ['Limber', 'Reckless', 'Striker']
	},
	Hitmonchan: {
		types: ['Fighting'],
		bs: {hp: 80, at: 105, df: 79, sa: 35, sd: 110, sp: 76},
		weightkg: 50.2,
		abilities: {0: 'Fighting Spirit'},
		innates: ['Inner Focus', 'Fatal Precision', 'Precise Fist']
	},
	Lickitung: {
		types: ['Normal'],
		bs: {hp: 90, at: 65, df: 75, sa: 70, sd: 75, sp: 30},
		weightkg: 65.5,
		abilities: {0: 'Simple'},
		innates: ['Gluttony', 'Thick Fat', 'Own Tempo']
	},
	Koffing: {
		types: ['Poison'],
		bs: {hp: 40, at: 65, df: 95, sa: 70, sd: 45, sp: 35},
		weightkg: 1.0,
		abilities: {0: 'Poison Absorb'},
		innates: ['Levitate', 'Aftermath', 'Inflatable']
	},
	Weezing: {
		types: ['Poison'],
		bs: {hp: 85, at: 90, df: 120, sa: 95, sd: 70, sp: 60},
		weightkg: 9.5,
		abilities: {0: 'Flare Boost'},
		innates: ['Levitate', 'Multi-Headed', 'Inflatable']
	},
	Rhyhorn: {
		types: ['Ground', 'Rock'],
		bs: {hp: 80, at: 85, df: 95, sa: 30, sd: 30, sp: 65},
		weightkg: 115.0,
		abilities: {0: 'Lightning Rod'},
		innates: ['Solid Rock', 'Rockhard Will', 'Rough Skin']
	},
	Rhydon: {
		types: ['Ground', 'Rock'],
		bs: {hp: 105, at: 130, df: 120, sa: 45, sd: 45, sp: 40},
		weightkg: 120.0,
		abilities: {0: 'Lightning Rod'},
		innates: ['Solid Rock', 'Rockhard Will', 'Rough Skin']
	},
	Chansey: {
		types: ['Normal'],
		bs: {hp: 250, at: 5, df: 5, sa: 35, sd: 105, sp: 50},
		weightkg: 34.6,
		abilities: {0: 'Healer'},
		innates: ['Sweet Veil', 'Serene Grace', 'Natural Cure']
	},
	Tangela: {
		types: ['Grass'],
		bs: {hp: 65, at: 55, df: 115, sa: 100, sd: 40, sp: 60},
		weightkg: 35.0,
		abilities: {0: 'Chlorophyll'},
		innates: ['Regenerator', 'Seaweed', 'Tangling Hair']
	},
	Kangaskhan: {
		types: ['Normal'],
		bs: {hp: 105, at: 95, df: 80, sa: 40, sd: 80, sp: 90},
		weightkg: 80.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Parental Bond', 'Scrappy', 'Avenger']
	},
	Horsea: {
		types: ['Water'],
		bs: {hp: 30, at: 40, df: 70, sa: 70, sd: 25, sp: 60},
		weightkg: 8.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Poison Point', 'Immunity', 'Sniper']
	},
	Seadra: {
		types: ['Water'],
		bs: {hp: 65, at: 75, df: 95, sa: 95, sd: 55, sp: 85},
		weightkg: 25.0,
		abilities: {0: 'Damp'},
		innates: ['Poison Point', 'Parental Bond', 'Poison Absorb']
	},
	Goldeen: {
		types: ['Water'],
		bs: {hp: 45, at: 82, df: 60, sa: 35, sd: 50, sp: 83},
		weightkg: 15.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Lightning Rod', 'Multiscale', 'Field Explorer']
	},
	Seaking: {
		types: ['Water'],
		bs: {hp: 80, at: 92, df: 65, sa: 65, sd: 80, sp: 68},
		weightkg: 39.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Lightning Rod', 'Multiscale', 'Field Explorer']
	},
	Staryu: {
		types: ['Water'],
		bs: {hp: 30, at: 45, df: 55, sa: 70, sd: 55, sp: 85},
		weightkg: 34.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Natural Cure', 'Regenerator', 'Mystic Power']
	},
	Starmie: {
		types: ['Water', 'Psychic'],
		bs: {hp: 60, at: 75, df: 85, sa: 105, sd: 85, sp: 115},
		weightkg: 80.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Natural Cure', 'Victory Star', 'Mystic Power']
	},
	'Mr. Mime': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 40, at: 45, df: 65, sa: 120, sd: 120, sp: 90},
		weightkg: 54.5,
		abilities: {0: 'Filter'},
		innates: ['Soundproof', 'Magic Bounce', 'Trickster']
	},
	Scyther: {
		types: ['Bug', 'Flying'],
		bs: {hp: 70, at: 110, df: 80, sa: 55, sd: 80, sp: 105},
		weightkg: 56.0,
		abilities: {0: 'Perfectionist'},
		innates: ['Keen Edge', 'Swarm', 'Aerilate']
	},
	Jynx: {
		types: ['Ice', 'Psychic'],
		bs: {hp: 65, at: 50, df: 35, sa: 115, sd: 95, sp: 95},
		weightkg: 40.6,
		abilities: {0: 'Psychic Mind'},
		innates: ['Dry Skin', 'Refrigerate', 'Amplifier']
	},
	Electabuzz: {
		types: ['Electric'],
		bs: {hp: 60, at: 100, df: 57, sa: 83, sd: 85, sp: 105},
		weightkg: 30.0,
		abilities: {0: 'Power Fists'},
		innates: ['Hyper Aggressive', 'Vital Spirit', 'Static']
	},
	Magmar: {
		types: ['Fire'],
		bs: {hp: 65, at: 95, df: 57, sa: 100, sd: 85, sp: 93},
		weightkg: 44.5,
		abilities: {0: 'Pyromancy'},
		innates: ['Molten Down', 'Flame Body', 'Flash Fire']
	},
	Pinsir: {
		types: ['Bug'],
		bs: {hp: 65, at: 125, df: 100, sa: 55, sd: 70, sp: 85},
		weightkg: 55.0,
		abilities: {0: 'Anger Point'},
		innates: ['Swarm', 'Hyper Cutter', 'Grip Pincer']
	},
	Tauros: {
		types: ['Normal'],
		bs: {hp: 95, at: 120, df: 95, sa: 40, sd: 70, sp: 110},
		weightkg: 88.4,
		abilities: {0: 'Violent Rush'},
		innates: ['Hyper Aggressive', 'Anger Point', 'Scrappy']
	},
	Magikarp: {
		types: ['Water'],
		bs: {hp: 20, at: 15, df: 55, sa: 15, sd: 20, sp: 80},
		weightkg: 10.0,
		abilities: {0: 'Marvel Scale'},
		innates: ['Multiscale', 'Adaptability', 'Limber']
	},
	Gyarados: {
		types: ['Water', 'Flying'],
		bs: {hp: 95, at: 125, df: 79, sa: 60, sd: 100, sp: 81},
		weightkg: 235.0,
		abilities: {0: 'Moxie'},
		innates: ['Intimidate', 'Draconize', 'Overwhelm']
	},
	Lapras: {
		types: ['Water', 'Ice'],
		bs: {hp: 130, at: 85, df: 80, sa: 95, sd: 95, sp: 60},
		weightkg: 220.0,
		abilities: {0: 'Adaptability'},
		innates: ['Serene Grace', 'Shell Armor', 'Self Sufficient']
	},
	Ditto: {
		types: ['Normal'],
		bs: {hp: 96, at: 48, df: 48, sa: 48, sd: 48, sp: 48},
		weightkg: 4.0,
		abilities: {0: 'Prankster'},
		innates: ['Liquified', 'Coward', 'Limber']
	},
	Eevee: {
		types: ['Normal'],
		bs: {hp: 55, at: 55, df: 50, sa: 45, sd: 65, sp: 55},
		weightkg: 6.5,
		abilities: {0: 'Prankster'},
		innates: ['Fluffy', 'Cute Charm', 'Protean']
	},
	Vaporeon: {
		types: ['Water'],
		bs: {hp: 130, at: 65, df: 60, sa: 110, sd: 95, sp: 65},
		weightkg: 29.0,
		abilities: {0: 'Rain Dish'},
		innates: ['Water Veil', 'Water Absorb', 'Hydration']
	},
	Jolteon: {
		types: ['Electric'],
		bs: {hp: 65, at: 65, df: 60, sa: 110, sd: 95, sp: 130},
		weightkg: 24.5,
		abilities: {0: 'Speed Boost'},
		innates: ['Short Circuit', 'Lightning Rod', 'Illuminate']
	},
	Flareon: {
		types: ['Fire'],
		bs: {hp: 95, at: 130, df: 60, sa: 65, sd: 65, sp: 110},
		weightkg: 25.0,
		abilities: {0: 'Reckless'},
		innates: ['Flash Fire', 'Guts', 'Fluffy']
	},
	Porygon: {
		types: ['Normal'],
		bs: {hp: 65, at: 60, df: 70, sa: 85, sd: 75, sp: 40},
		weightkg: 36.5,
		abilities: {0: 'Self Repair'},
		innates: ['Levitate', 'Analytic', 'Download']
	},
	Omanyte: {
		types: ['Rock', 'Water'],
		bs: {hp: 35, at: 40, df: 100, sa: 90, sd: 55, sp: 35},
		weightkg: 7.5,
		abilities: {0: 'Weak Armor'},
		innates: ['Fossilized', 'Shell Armor', 'Accelerate']
	},
	Omastar: {
		types: ['Rock', 'Water'],
		bs: {hp: 70, at: 60, df: 125, sa: 115, sd: 70, sp: 55},
		weightkg: 35.0,
		abilities: {0: 'Weak Armor'},
		innates: ['Fossilized', 'Shell Armor', 'Accelerate']
	},
	Kabuto: {
		types: ['Rock', 'Water'],
		bs: {hp: 30, at: 80, df: 90, sa: 55, sd: 45, sp: 55},
		weightkg: 11.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Fossilized', 'Battle Armor', 'Ambush']
	},
	Kabutops: {
		types: ['Rock', 'Water'],
		bs: {hp: 60, at: 115, df: 105, sa: 65, sd: 70, sp: 80},
		weightkg: 40.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Fossilized', 'Battle Armor', 'Dual Wield']
	},
	Aerodactyl: {
		types: ['Rock', 'Flying'],
		bs: {hp: 80, at: 105, df: 65, sa: 60, sd: 75, sp: 130},
		weightkg: 59.0,
		abilities: {0: 'Speed Force'},
		innates: ['Fossilized', 'Rock Head', 'Pressure']
	},
	Snorlax: {
		types: ['Normal'],
		bs: {hp: 160, at: 110, df: 65, sa: 65, sd: 110, sp: 30},
		weightkg: 460.0,
		abilities: {0: 'Let\'s Roll'},
		innates: ['Self Sufficient', 'Thick Fat', 'Gluttony']
	},
	Articuno: {
		types: ['Ice', 'Flying'],
		bs: {hp: 90, at: 85, df: 100, sa: 95, sd: 125, sp: 85},
		weightkg: 55.4,
		abilities: {0: 'North Wind'},
		innates: ['Antarctic Bird', 'Majestic Bird', 'Permafrost']
	},
	Zapdos: {
		types: ['Electric', 'Flying'],
		bs: {hp: 90, at: 90, df: 85, sa: 125, sd: 90, sp: 100},
		weightkg: 52.6,
		abilities: {0: 'Raging Storm'},
		innates: ['Volt Absorb', 'Overcharge', 'Static']
	},
	Moltres: {
		types: ['Fire', 'Flying'],
		bs: {hp: 90, at: 100, df: 90, sa: 125, sd: 85, sp: 90},
		weightkg: 60.0,
		abilities: {0: 'Air Blower'},
		innates: ['Flash Fire', 'Molten Down', 'Pyromancy']
	},
	Dratini: {
		types: ['Dragon'],
		bs: {hp: 41, at: 64, df: 45, sa: 50, sd: 50, sp: 50},
		weightkg: 3.3,
		abilities: {0: 'Regenerator'},
		innates: ['Multiscale', 'Marvel Scale', 'Shed Skin']
	},
	Dragonair: {
		types: ['Dragon'],
		bs: {hp: 61, at: 84, df: 65, sa: 70, sd: 70, sp: 70},
		weightkg: 16.5,
		abilities: {0: 'Regenerator'},
		innates: ['Multiscale', 'Marvel Scale', 'Shed Skin']
	},
	Dragonite: {
		types: ['Dragon', 'Flying'],
		bs: {hp: 91, at: 134, df: 95, sa: 100, sd: 100, sp: 80},
		weightkg: 210.0,
		abilities: {0: 'Dragon\'s Maw'},
		innates: ['Multiscale', 'Overwhelm', 'Aerilate']
	},
	Mewtwo: {
		types: ['Psychic'],
		bs: {hp: 106, at: 110, df: 90, sa: 154, sd: 90, sp: 130},
		weightkg: 122.0,
		abilities: {0: 'Mystic Power'},
		innates: ['Psychic Mind', 'Pressure', 'Fatal Precision']
	},
	Mew: {
		types: ['Psychic'],
		bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
		weightkg: 4.0,
		abilities: {0: 'Magic Guard'},
		innates: ['Psychic Mind', 'Unaware', 'Prankster']
	},
	Chikorita: {
		types: ['Grass'],
		bs: {hp: 47, at: 49, df: 65, sa: 49, sd: 65, sp: 45},
		weightkg: 6.4,
		abilities: {0: 'Regenerator'},
		innates: ['Overgrow', 'Grass Pelt', 'Natural Cure']
	},
	Bayleef: {
		types: ['Grass'],
		bs: {hp: 70, at: 62, df: 80, sa: 68, sd: 80, sp: 60},
		weightkg: 15.8,
		abilities: {0: 'Regenerator'},
		innates: ['Overgrow', 'Grass Pelt', 'Natural Cure']
	},
	Meganium: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 80, at: 82, df: 100, sa: 93, sd: 100, sp: 80},
		weightkg: 100.5,
		abilities: {0: 'Regenerator'},
		innates: ['Overgrow', 'Sun\'s Bounty', 'Aroma Veil']
	},
	Cyndaquil: {
		types: ['Fire'],
		bs: {hp: 44, at: 48, df: 43, sa: 65, sd: 50, sp: 70},
		weightkg: 7.9,
		abilities: {0: 'Flame Body'},
		innates: ['Blaze', 'Let\'s Roll', 'Coward']
	},
	Quilava: {
		types: ['Fire', 'Ground'],
		bs: {hp: 63, at: 64, df: 58, sa: 85, sd: 65, sp: 85},
		weightkg: 19.0,
		abilities: {0: 'Earthbound'},
		innates: ['Blaze', 'Berserk', 'Flash Fire']
	},
	Typhlosion: {
		types: ['Fire', 'Ground'],
		bs: {hp: 78, at: 84, df: 78, sa: 110, sd: 85, sp: 100},
		weightkg: 79.5,
		abilities: {0: 'Earthbound'},
		innates: ['Blaze', 'Berserk', 'Flaming Soul']
	},
	Totodile: {
		types: ['Water'],
		bs: {hp: 50, at: 65, df: 64, sa: 44, sd: 48, sp: 49},
		weightkg: 9.5,
		abilities: {0: 'Intimidate'},
		innates: ['Torrent', 'Strong Jaw', 'Rough Skin']
	},
	Croconaw: {
		types: ['Water'],
		bs: {hp: 70, at: 80, df: 80, sa: 59, sd: 63, sp: 68},
		weightkg: 25.0,
		abilities: {0: 'Intimidate'},
		innates: ['Torrent', 'Strong Jaw', 'Rough Skin']
	},
	Feraligatr: {
		types: ['Water'],
		bs: {hp: 85, at: 125, df: 100, sa: 49, sd: 88, sp: 88},
		weightkg: 88.8,
		abilities: {0: 'Intimidate'},
		innates: ['Torrent', 'Strong Jaw', 'Rough Skin']
	},
	Sentret: {
		types: ['Normal'],
		bs: {hp: 35, at: 56, df: 34, sa: 35, sd: 60, sp: 70},
		weightkg: 6.0,
		abilities: {0: 'Run Away'},
		innates: ['Frisk', 'Field Explorer', 'Fur Coat']
	},
	Furret: {
		types: ['Normal'],
		bs: {hp: 85, at: 86, df: 64, sa: 40, sd: 70, sp: 115},
		weightkg: 32.5,
		abilities: {0: 'Momentum'},
		innates: ['Scrappy', 'Field Explorer', 'Fur Coat']
	},
	Hoothoot: {
		types: ['Psychic', 'Flying'],
		bs: {hp: 60, at: 30, df: 30, sa: 36, sd: 56, sp: 50},
		weightkg: 21.2,
		abilities: {0: 'Tinted Lens'},
		innates: ['Flock', 'Nocturnal', 'Frisk']
	},
	Noctowl: {
		types: ['Psychic', 'Flying'],
		bs: {hp: 100, at: 50, df: 50, sa: 86, sd: 96, sp: 70},
		weightkg: 40.8,
		abilities: {0: 'Tinted Lens'},
		innates: ['Insomnia', 'Nocturnal', 'Majestic Bird']
	},
	Ledyba: {
		types: ['Bug', 'Flying'],
		bs: {hp: 40, at: 50, df: 30, sa: 20, sd: 80, sp: 65},
		weightkg: 10.8,
		abilities: {0: 'Run Away'},
		innates: ['Pollinate', 'Swarm', 'Shell Armor']
	},
	Ledian: {
		types: ['Bug', 'Fighting'],
		bs: {hp: 55, at: 95, df: 70, sa: 55, sd: 110, sp: 105},
		weightkg: 35.6,
		abilities: {0: 'Justified'},
		innates: ['Raging Boxer', 'Iron Fist', 'Aerilate']
	},
	Spinarak: {
		types: ['Bug', 'Poison'],
		bs: {hp: 40, at: 60, df: 50, sa: 40, sd: 50, sp: 45},
		weightkg: 8.5,
		abilities: {0: 'Spider Lair'},
		innates: ['Poison Touch', 'Merciless', 'Infiltrator']
	},
	Ariados: {
		types: ['Bug', 'Poison'],
		bs: {hp: 70, at: 90, df: 70, sa: 60, sd: 70, sp: 40},
		weightkg: 33.5,
		abilities: {0: 'Spider Lair'},
		innates: ['Poison Touch', 'Merciless', 'Opportunist']
	},
	Crobat: {
		types: ['Poison', 'Flying'],
		bs: {hp: 85, at: 90, df: 80, sa: 80, sd: 80, sp: 130},
		weightkg: 75.0,
		abilities: {0: 'Mountaineer'},
		innates: ['Scare', 'Nocturnal', 'Infiltrator']
	},
	Chinchou: {
		types: ['Water', 'Electric'],
		bs: {hp: 75, at: 38, df: 38, sa: 66, sd: 66, sp: 67},
		weightkg: 12.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Illuminate', 'Water Absorb', 'Volt Absorb']
	},
	Lanturn: {
		types: ['Water', 'Electric'],
		bs: {hp: 125, at: 58, df: 58, sa: 86, sd: 86, sp: 67},
		weightkg: 22.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Illuminate', 'Water Absorb', 'Volt Absorb']
	},
	Pichu: {
		types: ['Electric'],
		bs: {hp: 20, at: 40, df: 15, sa: 35, sd: 35, sp: 60},
		weightkg: 2.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Short Circuit', 'Plus', 'Ground Shock']
	},
	Cleffa: {
		types: ['Fairy'],
		bs: {hp: 50, at: 25, df: 28, sa: 45, sd: 55, sp: 15},
		weightkg: 3.0,
		abilities: {0: 'Fairy Aura'},
		innates: ['Wonder Skin', 'Overcoat', 'Moon Spirit']
	},
	Igglybuff: {
		types: ['Normal', 'Fairy'],
		bs: {hp: 90, at: 30, df: 15, sa: 48, sd: 20, sp: 15},
		weightkg: 1.0,
		abilities: {0: 'Lullaby'},
		innates: ['Cute Charm', 'Inflatable', 'Let\'s Roll']
	},
	Togepi: {
		types: ['Fairy'],
		bs: {hp: 35, at: 20, df: 65, sa: 40, sd: 65, sp: 20},
		weightkg: 1.5,
		abilities: {0: 'Prankster'},
		innates: ['Super Luck', 'Shell Armor', 'Serene Grace']
	},
	Togetic: {
		types: ['Fairy', 'Flying'],
		bs: {hp: 70, at: 40, df: 85, sa: 65, sd: 105, sp: 40},
		weightkg: 3.2,
		abilities: {0: 'Sweet Veil'},
		innates: ['Shield Dust', 'Self Sufficient', 'Aerodynamics']
	},
	Natu: {
		types: ['Psychic', 'Flying'],
		bs: {hp: 40, at: 50, df: 45, sa: 90, sd: 45, sp: 80},
		weightkg: 2.0,
		abilities: {0: 'Dreamcatcher'},
		innates: ['Keen Eye', 'Forewarn', 'Magic Bounce']
	},
	Xatu: {
		types: ['Psychic', 'Flying'],
		bs: {hp: 82, at: 80, df: 80, sa: 115, sd: 80, sp: 106},
		weightkg: 15.0,
		abilities: {0: 'Unnerve'},
		innates: ['Keen Eye', 'Forewarn', 'Magic Bounce']
	},
	Mareep: {
		types: ['Electric'],
		bs: {hp: 70, at: 40, df: 40, sa: 65, sd: 45, sp: 35},
		weightkg: 7.8,
		abilities: {0: 'Short Circuit'},
		innates: ['Static', 'Fluffy', 'Cotton Down']
	},
	Flaaffy: {
		types: ['Electric'],
		bs: {hp: 85, at: 55, df: 55, sa: 80, sd: 60, sp: 45},
		weightkg: 13.3,
		abilities: {0: 'Short Circuit'},
		innates: ['Static', 'Fluffy', 'Cotton Down']
	},
	Ampharos: {
		types: ['Electric'],
		bs: {hp: 110, at: 75, df: 85, sa: 115, sd: 90, sp: 55},
		weightkg: 61.5,
		abilities: {0: 'Static'},
		innates: ['Dazzling', 'Short Circuit', 'Ground Shock']
	},
	Bellossom: {
		types: ['Grass'],
		bs: {hp: 80, at: 60, df: 110, sa: 100, sd: 80, sp: 100},
		weightkg: 5.8,
		abilities: {0: 'Energy Tap'},
		innates: ['Flower Veil', 'Poison Absorb', 'Triage']
	},
	Marill: {
		types: ['Water', 'Fairy'],
		bs: {hp: 70, at: 35, df: 60, sa: 70, sd: 60, sp: 40},
		weightkg: 8.5,
		abilities: {0: 'Sap Sipper'},
		innates: ['Thick Fat', 'Huge Power', 'Hydration']
	},
	Azumarill: {
		types: ['Water', 'Fairy'],
		bs: {hp: 100, at: 65, df: 90, sa: 110, sd: 90, sp: 60},
		weightkg: 28.5,
		abilities: {0: 'Sap Sipper'},
		innates: ['Thick Fat', 'Huge Power', 'Water Veil']
	},
	Sudowoodo: {
		types: ['Rock'],
		bs: {hp: 70, at: 100, df: 115, sa: 30, sd: 65, sp: 30},
		weightkg: 38.0,
		abilities: {0: 'Juggernaut'},
		innates: ['Raw Wood', 'Sturdy', 'Lumberjack']
	},
	Politoed: {
		types: ['Water'],
		bs: {hp: 110, at: 75, df: 80, sa: 100, sd: 100, sp: 70},
		weightkg: 33.9,
		abilities: {0: 'Storm Drain'},
		innates: ['Damp', 'Hydration', 'Drizzle']
	},
	Hoppip: {
		types: ['Grass', 'Flying'],
		bs: {hp: 35, at: 45, df: 40, sa: 45, sd: 55, sp: 70},
		weightkg: 0.5,
		abilities: {0: 'Leaf Guard'},
		innates: ['Chloroplast', 'Aerodynamics', 'Wind Rider']
	},
	Skiploom: {
		types: ['Grass', 'Flying'],
		bs: {hp: 55, at: 55, df: 50, sa: 55, sd: 65, sp: 100},
		weightkg: 1.0,
		abilities: {0: 'Leaf Guard'},
		innates: ['Chloroplast', 'Aerodynamics', 'Wind Rider']
	},
	Jumpluff: {
		types: ['Grass', 'Flying'],
		bs: {hp: 75, at: 85, df: 70, sa: 85, sd: 90, sp: 130},
		weightkg: 3.0,
		abilities: {0: 'Friend Guard'},
		innates: ['Fluffy', 'Aerodynamics', 'Cotton Down']
	},
	Aipom: {
		types: ['Normal'],
		bs: {hp: 55, at: 70, df: 55, sa: 40, sd: 55, sp: 90},
		weightkg: 11.5,
		abilities: {0: 'Super Luck'},
		innates: ['Pickup', 'Technician', 'Skill Link']
	},
	Sunkern: {
		types: ['Grass'],
		bs: {hp: 55, at: 55, df: 55, sa: 55, sd: 55, sp: 30},
		weightkg: 1.8,
		abilities: {0: 'Overcoat'},
		innates: ['Guilt Trip', 'Coward', 'Anticipation']
	},
	Sunflora: {
		types: ['Grass', 'Fire'],
		bs: {hp: 95, at: 75, df: 55, sa: 105, sd: 85, sp: 55},
		weightkg: 8.5,
		abilities: {0: 'Flower Veil'},
		innates: ['Drought', 'Solar Power', 'Grass Pelt']
	},
	Yanma: {
		types: ['Bug', 'Flying'],
		bs: {hp: 65, at: 65, df: 45, sa: 75, sd: 45, sp: 95},
		weightkg: 38.0,
		abilities: {0: 'Aerodynamics'},
		innates: ['Speed Boost', 'Compound Eyes', 'Swarm']
	},
	Wooper: {
		types: ['Water', 'Ground'],
		bs: {hp: 60, at: 60, df: 60, sa: 60, sd: 60, sp: 15},
		weightkg: 8.5,
		abilities: {0: 'Unaware'},
		innates: ['Oblivious', 'Water Absorb', 'Cute Charm']
	},
	Quagsire: {
		types: ['Water', 'Ground'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 35},
		weightkg: 75.0,
		abilities: {0: 'Unaware'},
		innates: ['Oblivious', 'Water Absorb', 'Water Veil']
	},
	Espeon: {
		types: ['Psychic'],
		bs: {hp: 65, at: 65, df: 60, sa: 130, sd: 95, sp: 110},
		weightkg: 26.5,
		abilities: {0: 'Soul-Heart'},
		innates: ['Magic Bounce', 'Avenger', 'Psychic Mind']
	},
	Umbreon: {
		types: ['Dark'],
		bs: {hp: 95, at: 65, df: 110, sa: 60, sd: 130, sp: 65},
		weightkg: 27.0,
		abilities: {0: 'Poison Touch'},
		innates: ['Self Sufficient', 'Bad Luck', 'Wonder Skin']
	},
	Murkrow: {
		types: ['Dark', 'Flying'],
		bs: {hp: 60, at: 85, df: 52, sa: 85, sd: 52, sp: 101},
		weightkg: 2.1,
		abilities: {0: 'Moody'},
		innates: ['Keen Eye', 'Nocturnal', 'Super Luck']
	},
	Slowking: {
		types: ['Water', 'Psychic'],
		bs: {hp: 95, at: 75, df: 80, sa: 100, sd: 110, sp: 30},
		weightkg: 79.5,
		abilities: {0: 'Regenerator'},
		innates: ['Oblivious', 'Analytic', 'Shell Armor']
	},
	Misdreavus: {
		types: ['Ghost'],
		bs: {hp: 60, at: 60, df: 60, sa: 85, sd: 85, sp: 85},
		weightkg: 1.0,
		abilities: {0: 'Trickster'},
		innates: ['Levitate', 'Shadow Tag', 'Perish Body']
	},
	Unown: {
		types: ['Psychic'],
		bs: {hp: 58, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Revelation', 'Levitate', 'Regenerator']
	},
	Wobbuffet: {
		types: ['Psychic'],
		bs: {hp: 190, at: 33, df: 58, sa: 33, sd: 58, sp: 33},
		weightkg: 28.5,
		abilities: {0: 'Magic Guard'},
		innates: ['Sticky Hold', 'Innards Out', 'Shadow Tag']
	},
	Girafarig: {
		types: ['Normal', 'Psychic'],
		bs: {hp: 70, at: 80, df: 65, sa: 90, sd: 65, sp: 85},
		weightkg: 41.5,
		abilities: {0: 'Strong Jaw'},
		innates: ['Multi-Headed', 'Nocturnal', 'Sap Sipper']
	},
	Pineco: {
		types: ['Bug'],
		bs: {hp: 50, at: 75, df: 90, sa: 35, sd: 35, sp: 15},
		weightkg: 7.2,
		abilities: {0: 'Sturdy'},
		innates: ['Overcoat', 'Battle Armor', 'Aftermath']
	},
	Forretress: {
		types: ['Bug', 'Steel'],
		bs: {hp: 75, at: 100, df: 140, sa: 60, sd: 80, sp: 20},
		weightkg: 125.8,
		abilities: {0: 'Aftermath'},
		innates: ['Overcoat', 'Lead Coat', 'Heatproof']
	},
	Dunsparce: {
		types: ['Normal'],
		bs: {hp: 100, at: 70, df: 70, sa: 65, sd: 65, sp: 45},
		weightkg: 14.0,
		abilities: {0: 'Serene Grace'},
		innates: ['Super Luck', 'Run Away', 'Coward']
	},
	Gligar: {
		types: ['Ground', 'Flying'],
		bs: {hp: 65, at: 75, df: 105, sa: 35, sd: 65, sp: 85},
		weightkg: 64.8,
		abilities: {0: 'Hyper Cutter'},
		innates: ['Grip Pincer', 'Rough Skin', 'Battle Armor']
	},
	Steelix: {
		types: ['Steel', 'Ground'],
		bs: {hp: 75, at: 105, df: 200, sa: 55, sd: 75, sp: 20},
		weightkg: 400.0,
		abilities: {0: 'Aftershock'},
		innates: ['Lead Coat', 'Self Sufficient', 'Strong Jaw']
	},
	Snubbull: {
		types: ['Fairy', 'Ground'],
		bs: {hp: 60, at: 90, df: 50, sa: 40, sd: 40, sp: 50},
		weightkg: 7.8,
		abilities: {0: 'Cute Charm'},
		innates: ['Intimidate', 'Strong Jaw', 'Opportunist']
	},
	Granbull: {
		types: ['Fairy', 'Ground'],
		bs: {hp: 90, at: 130, df: 80, sa: 60, sd: 60, sp: 75},
		weightkg: 48.7,
		abilities: {0: 'Coward'},
		innates: ['Intimidate', 'Strong Jaw', 'Guts']
	},
	Qwilfish: {
		types: ['Water', 'Poison'],
		bs: {hp: 65, at: 95, df: 115, sa: 55, sd: 55, sp: 85},
		weightkg: 3.9,
		abilities: {0: 'Innards Out'},
		innates: ['Loose Quills', 'Inflatable', 'Poison Point']
	},
	Scizor: {
		types: ['Bug', 'Steel'],
		bs: {hp: 70, at: 130, df: 100, sa: 55, sd: 80, sp: 65},
		weightkg: 118.0,
		abilities: {0: 'Light Metal'},
		innates: ['Pollinate', 'Hyper Cutter', 'Technician']
	},
	Shuckle: {
		types: ['Bug', 'Rock'],
		bs: {hp: 50, at: 10, df: 230, sa: 10, sd: 230, sp: 5},
		weightkg: 20.5,
		abilities: {0: 'Coward'},
		innates: ['Shell Armor', 'Oblivious', 'Solid Rock']
	},
	Heracross: {
		types: ['Bug', 'Fighting'],
		bs: {hp: 80, at: 125, df: 75, sa: 40, sd: 95, sp: 85},
		weightkg: 54.0,
		abilities: {0: 'Skill Link'},
		innates: ['Swarm', 'Battle Armor', 'Guts']
	},
	Sneasel: {
		types: ['Dark', 'Ice'],
		bs: {hp: 60, at: 90, df: 55, sa: 35, sd: 75, sp: 115},
		weightkg: 28.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Freezing Point', 'Infiltrator', 'Tough Claws']
	},
	Teddiursa: {
		types: ['Normal'],
		bs: {hp: 60, at: 80, df: 50, sa: 50, sd: 50, sp: 60},
		weightkg: 8.8,
		abilities: {0: 'Scrappy'},
		innates: ['Guts', 'Quick Feet', 'Fur Coat']
	},
	Ursaring: {
		types: ['Normal'],
		bs: {hp: 90, at: 130, df: 75, sa: 75, sd: 75, sp: 55},
		weightkg: 125.8,
		abilities: {0: 'Intimidate'},
		innates: ['Guts', 'Quick Feet', 'Fur Coat']
	},
	Slugma: {
		types: ['Fire'],
		bs: {hp: 40, at: 40, df: 40, sa: 70, sd: 40, sp: 20},
		weightkg: 35.0,
		abilities: {0: 'Simple'},
		innates: ['Molten Down', 'Super Hot Goo', 'Blaze']
	},
	Magcargo: {
		types: ['Fire', 'Rock'],
		bs: {hp: 60, at: 50, df: 120, sa: 90, sd: 80, sp: 30},
		weightkg: 55.0,
		abilities: {0: 'Simple'},
		innates: ['Molten Down', 'Flash Fire', 'Magma Armor']
	},
	Swinub: {
		types: ['Ice', 'Ground'],
		bs: {hp: 50, at: 50, df: 40, sa: 30, sd: 30, sp: 50},
		weightkg: 6.5,
		abilities: {0: 'Oblivious'},
		innates: ['Thick Fat', 'Slush Rush', 'Fluffy']
	},
	Piloswine: {
		types: ['Ice', 'Ground'],
		bs: {hp: 100, at: 100, df: 80, sa: 60, sd: 60, sp: 50},
		weightkg: 55.8,
		abilities: {0: 'Oblivious'},
		innates: ['Thick Fat', 'Fur Coat', 'Growing Tooth']
	},
	Corsola: {
		types: ['Water', 'Rock'],
		bs: {hp: 85, at: 55, df: 95, sa: 85, sd: 95, sp: 35},
		weightkg: 5.0,
		abilities: {0: 'Sturdy'},
		innates: ['Natural Recovery', 'Solid Rock', 'Water Veil']
	},
	Remoraid: {
		types: ['Water'],
		bs: {hp: 35, at: 65, df: 35, sa: 65, sd: 35, sp: 65},
		weightkg: 12.0,
		abilities: {0: 'Artillery'},
		innates: ['Torrent', 'Swift Swim', 'Sniper']
	},
	Octillery: {
		types: ['Water'],
		bs: {hp: 75, at: 65, df: 95, sa: 125, sd: 95, sp: 55},
		weightkg: 28.5,
		abilities: {0: 'Ambush'},
		innates: ['Quick Draw', 'Breakwater', 'Predator']
	},
	Delibird: {
		types: ['Ice', 'Flying'],
		bs: {hp: 45, at: 55, df: 45, sa: 65, sd: 45, sp: 75},
		weightkg: 16.0,
		abilities: {0: 'Adaptability'},
		innates: ['Thick Fat', 'Magic Bounce', 'Aerilate']
	},
	Mantine: {
		types: ['Water', 'Flying'],
		bs: {hp: 85, at: 40, df: 70, sa: 90, sd: 140, sp: 70},
		weightkg: 220.0,
		abilities: {0: 'Regenerator'},
		innates: ['Rain Dish', 'Water Absorb', 'Water Veil']
	},
	Skarmory: {
		types: ['Steel', 'Flying'],
		bs: {hp: 75, at: 80, df: 140, sa: 40, sd: 70, sp: 90},
		weightkg: 50.5,
		abilities: {0: 'Mirror Armor'},
		innates: ['Razor Sharp', 'Lead Coat', 'Battle Armor']
	},
	Houndour: {
		types: ['Dark', 'Fire'],
		bs: {hp: 45, at: 70, df: 30, sa: 80, sd: 50, sp: 75},
		weightkg: 10.8,
		abilities: {0: 'Flame Body'},
		innates: ['Nocturnal', 'Fae Hunter', 'Equinox']
	},
	Houndoom: {
		types: ['Dark', 'Fire'],
		bs: {hp: 75, at: 110, df: 50, sa: 110, sd: 80, sp: 105},
		weightkg: 35.0,
		abilities: {0: 'Strong Jaw'},
		innates: ['Nocturnal', 'Fae Hunter', 'Equinox']
	},
	Kingdra: {
		types: ['Water', 'Dragon'],
		bs: {hp: 75, at: 95, df: 95, sa: 95, sd: 95, sp: 85},
		weightkg: 152.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Prism Scales', 'Mega Launcher', 'Multiscale']
	},
	Phanpy: {
		types: ['Ground'],
		bs: {hp: 90, at: 70, df: 70, sa: 40, sd: 40, sp: 40},
		weightkg: 33.5,
		abilities: {0: 'Readied Action'},
		innates: ['Let\'s Roll', 'Unaware', 'Battle Armor']
	},
	Donphan: {
		types: ['Ground'],
		bs: {hp: 90, at: 130, df: 130, sa: 60, sd: 60, sp: 50},
		weightkg: 120.0,
		abilities: {0: 'Speed Boost'},
		innates: ['Let\'s Roll', 'Thick Fat', 'Battle Armor']
	},
	Porygon2: {
		types: ['Normal'],
		bs: {hp: 85, at: 80, df: 90, sa: 105, sd: 95, sp: 60},
		weightkg: 32.5,
		abilities: {0: 'Frisk'},
		innates: ['Levitate', 'Analytic', 'Self Repair']
	},
	Stantler: {
		types: ['Normal'],
		bs: {hp: 73, at: 95, df: 62, sa: 85, sd: 65, sp: 85},
		weightkg: 71.2,
		abilities: {0: 'Intimidate'},
		innates: ['Scare', 'Violent Rush', 'Elude']
	},
	Smeargle: {
		types: ['Normal'],
		bs: {hp: 55, at: 20, df: 35, sa: 20, sd: 45, sp: 75},
		weightkg: 58.0,
		abilities: {0: 'Prankster'},
		innates: ['Own Tempo', 'Technician', 'Skill Link']
	},
	Tyrogue: {
		types: ['Fighting'],
		bs: {hp: 55, at: 55, df: 35, sa: 35, sd: 55, sp: 55},
		weightkg: 21.0,
		abilities: {0: 'Steadfast'},
		innates: ['Guts', 'Vital Spirit', 'Quick Feet']
	},
	Hitmontop: {
		types: ['Fighting'],
		bs: {hp: 80, at: 95, df: 95, sa: 35, sd: 110, sp: 70},
		weightkg: 48.0,
		abilities: {0: 'Steadfast'},
		innates: ['Technician', 'Intimidate', 'Scrappy']
	},
	Smoochum: {
		types: ['Ice', 'Psychic'],
		bs: {hp: 45, at: 30, df: 15, sa: 85, sd: 65, sp: 65},
		weightkg: 6.0,
		abilities: {0: 'Oblivious'},
		innates: ['Dry Skin', 'Refrigerate', 'Psychic Mind']
	},
	Elekid: {
		types: ['Electric'],
		bs: {hp: 45, at: 63, df: 37, sa: 65, sd: 55, sp: 95},
		weightkg: 23.5,
		abilities: {0: 'Power Fists'},
		innates: ['Fighter', 'Vital Spirit', 'Static']
	},
	Magby: {
		types: ['Fire'],
		bs: {hp: 45, at: 75, df: 37, sa: 70, sd: 55, sp: 83},
		weightkg: 21.4,
		abilities: {0: 'Flame Body'},
		innates: ['Molten Down', 'Vital Spirit', 'Blaze']
	},
	Miltank: {
		types: ['Normal'],
		bs: {hp: 95, at: 95, df: 105, sa: 55, sd: 70, sp: 110},
		weightkg: 75.5,
		abilities: {0: 'Cud Chew'},
		innates: ['Thick Fat', 'Let\'s Roll', 'Juggernaut']
	},
	Blissey: {
		types: ['Normal'],
		bs: {hp: 255, at: 10, df: 20, sa: 75, sd: 135, sp: 55},
		weightkg: 46.8,
		abilities: {0: 'Cute Charm'},
		innates: ['Overcoat', 'Pastel Veil', 'Self Sufficient']
	},
	Raikou: {
		types: ['Electric'],
		bs: {hp: 90, at: 85, df: 75, sa: 115, sd: 100, sp: 115},
		weightkg: 178.0,
		abilities: {0: 'Transistor'},
		innates: ['Overcharge', 'Beast Boost', 'Electro Surge']
	},
	Entei: {
		types: ['Fire'],
		bs: {hp: 115, at: 115, df: 85, sa: 90, sd: 75, sp: 100},
		weightkg: 198.0,
		abilities: {0: 'Strong Jaw'},
		innates: ['Volcano Rage', 'Beast Boost', 'Molten Down']
	},
	Suicune: {
		types: ['Water'],
		bs: {hp: 100, at: 75, df: 115, sa: 90, sd: 115, sp: 85},
		weightkg: 187.0,
		abilities: {0: 'North Wind'},
		innates: ['Aurora Borealis', 'Water Veil', 'Sea Guardian']
	},
	Larvitar: {
		types: ['Rock', 'Ground'],
		bs: {hp: 50, at: 64, df: 50, sa: 45, sd: 50, sp: 41},
		weightkg: 72.0,
		abilities: {0: 'Guts'},
		innates: ['Solid Rock', 'Mountaineer', 'Rough Skin']
	},
	Pupitar: {
		types: ['Rock', 'Ground'],
		bs: {hp: 70, at: 84, df: 70, sa: 65, sd: 70, sp: 51},
		weightkg: 152.0,
		abilities: {0: 'Shed Skin'},
		innates: ['Solid Rock', 'Mountaineer', 'Rough Skin']
	},
	Tyranitar: {
		types: ['Rock', 'Dark'],
		bs: {hp: 100, at: 134, df: 110, sa: 95, sd: 100, sp: 61},
		weightkg: 202.0,
		abilities: {0: 'Predator'},
		innates: ['Impenetrable', 'Juggernaut', 'Sand Stream']
	},
	Lugia: {
		types: ['Water', 'Psychic'],
		bs: {hp: 106, at: 90, df: 130, sa: 90, sd: 154, sp: 110},
		weightkg: 216.0,
		abilities: {0: 'Wonder Skin'},
		innates: ['Imposing Wings', 'Multiscale', 'Poseidon\'s Dominion']
	},
	'Ho-Oh': {
		types: ['Fire', 'Fairy'],
		bs: {hp: 106, at: 130, df: 90, sa: 110, sd: 154, sp: 90},
		weightkg: 199.0,
		abilities: {0: 'Regenerator'},
		innates: ['Imposing Wings', 'Majestic Bird', 'Prism Scales']
	},
	Celebi: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
		weightkg: 5.0,
		abilities: {0: 'Self Sufficient'},
		innates: ['Forewarn', 'Natural Recovery', 'Grassy Surge']
	},
	Treecko: {
		types: ['Grass'],
		bs: {hp: 40, at: 65, df: 45, sa: 45, sd: 55, sp: 70},
		weightkg: 5.0,
		abilities: {0: 'Symbiosis'},
		innates: ['Overgrow', 'Inner Focus', 'Frisk']
	},
	Grovyle: {
		types: ['Grass'],
		bs: {hp: 50, at: 85, df: 60, sa: 65, sd: 65, sp: 95},
		weightkg: 21.6,
		abilities: {0: 'Keen Edge'},
		innates: ['Overgrow', 'Hyper Cutter', 'Speed Force']
	},
	Sceptile: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 70, at: 105, df: 70, sa: 85, sd: 85, sp: 120},
		weightkg: 52.2,
		abilities: {0: 'Protean'},
		innates: ['Overgrow', 'Blur', 'Keen Edge']
	},
	Torchic: {
		types: ['Fire'],
		bs: {hp: 45, at: 70, df: 40, sa: 70, sd: 50, sp: 45},
		weightkg: 2.5,
		abilities: {0: 'Flock'},
		innates: ['Blaze', 'Flame Body', 'Avenger']
	},
	Combusken: {
		types: ['Fire', 'Fighting'],
		bs: {hp: 65, at: 85, df: 60, sa: 85, sd: 60, sp: 65},
		weightkg: 19.5,
		abilities: {0: 'Iron Fist'},
		innates: ['Blaze', 'Flame Body', 'Striker']
	},
	Blaziken: {
		types: ['Fire', 'Fighting'],
		bs: {hp: 85, at: 120, df: 70, sa: 110, sd: 70, sp: 80},
		weightkg: 52.0,
		abilities: {0: 'Mixed Martial Arts'},
		innates: ['Blaze', 'Flame Body', 'Striker']
	},
	Mudkip: {
		types: ['Water'],
		bs: {hp: 55, at: 75, df: 50, sa: 50, sd: 50, sp: 40},
		weightkg: 7.6,
		abilities: {0: 'Swift Swim'},
		innates: ['Torrent', 'Field Explorer', 'Water Veil']
	},
	Marshtomp: {
		types: ['Water', 'Ground'],
		bs: {hp: 80, at: 90, df: 70, sa: 60, sd: 70, sp: 50},
		weightkg: 28.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Torrent', 'Dry Skin', 'Battle Armor']
	},
	Swampert: {
		types: ['Water', 'Ground'],
		bs: {hp: 100, at: 110, df: 100, sa: 65, sd: 100, sp: 60},
		weightkg: 81.9,
		abilities: {0: 'Swift Swim'},
		innates: ['Torrent', 'Dry Skin', 'Regenerator']
	},
	Poochyena: {
		types: ['Dark'],
		bs: {hp: 35, at: 80, df: 35, sa: 30, sd: 50, sp: 80},
		weightkg: 13.6,
		abilities: {0: 'Moxie'},
		innates: ['Nocturnal', 'Guard Dog', 'Stakeout']
	},
	Mightyena: {
		types: ['Dark'],
		bs: {hp: 70, at: 90, df: 70, sa: 60, sd: 60, sp: 70},
		weightkg: 37.0,
		abilities: {0: 'Moxie'},
		innates: ['Nocturnal', 'Guard Dog', 'Stakeout']
	},
	Zigzagoon: {
		types: ['Normal'],
		bs: {hp: 38, at: 60, df: 41, sa: 30, sd: 41, sp: 70},
		weightkg: 17.5,
		abilities: {0: 'Momentum'},
		innates: ['Pickup', 'Speed Force', 'Limber']
	},
	Linoone: {
		types: ['Normal'],
		bs: {hp: 78, at: 100, df: 61, sa: 50, sd: 61, sp: 110},
		weightkg: 32.5,
		abilities: {0: 'Elude'},
		innates: ['Field Explorer', 'Violent Rush', 'Quick Feet']
	},
	Wurmple: {
		types: ['Bug'],
		bs: {hp: 45, at: 45, df: 35, sa: 20, sd: 30, sp: 20},
		weightkg: 3.6,
		abilities: {0: 'Shield Dust'},
		innates: ['Swarm', 'Run Away', 'Sap Sipper']
	},
	Silcoon: {
		types: ['Bug'],
		bs: {hp: 50, at: 35, df: 55, sa: 25, sd: 25, sp: 15},
		weightkg: 10.0,
		abilities: {0: 'Sap Sipper'},
		innates: ['Poison Point', 'Battle Armor', 'Shed Skin']
	},
	Beautifly: {
		types: ['Bug', 'Fairy'],
		bs: {hp: 65, at: 50, df: 60, sa: 95, sd: 95, sp: 85},
		weightkg: 28.4,
		abilities: {0: 'Shield Dust'},
		innates: ['Majestic Moth', 'Dazzling', 'Levitate']
	},
	Cascoon: {
		types: ['Bug'],
		bs: {hp: 50, at: 35, df: 25, sa: 25, sd: 55, sp: 15},
		weightkg: 11.5,
		abilities: {0: 'Sap Sipper'},
		innates: ['Poison Point', 'Battle Armor', 'Shed Skin']
	},
	Dustox: {
		types: ['Bug', 'Poison'],
		bs: {hp: 85, at: 30, df: 100, sa: 70, sd: 100, sp: 65},
		weightkg: 31.6,
		abilities: {0: 'Poison Touch'},
		innates: ['Majestic Moth', 'Shield Dust', 'Levitate']
	},
	Lotad: {
		types: ['Water', 'Grass'],
		bs: {hp: 40, at: 30, df: 30, sa: 50, sd: 50, sp: 40},
		weightkg: 2.6,
		abilities: {0: 'Swift Swim'},
		innates: ['Seaweed', 'Rain Dish', 'Hydration']
	},
	Lombre: {
		types: ['Water', 'Grass'],
		bs: {hp: 60, at: 50, df: 50, sa: 70, sd: 70, sp: 60},
		weightkg: 32.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Seaweed', 'Rain Dish', 'Hydration']
	},
	Ludicolo: {
		types: ['Water', 'Grass'],
		bs: {hp: 80, at: 70, df: 70, sa: 100, sd: 100, sp: 80},
		weightkg: 55.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Seaweed', 'Rain Dish', 'Hydration']
	},
	Seedot: {
		types: ['Grass'],
		bs: {hp: 40, at: 50, df: 50, sa: 40, sd: 30, sp: 30},
		weightkg: 4.0,
		abilities: {0: 'Aftermath'},
		innates: ['Overgrow', 'Chlorophyll', 'Overcoat']
	},
	Nuzleaf: {
		types: ['Grass', 'Dark'],
		bs: {hp: 70, at: 80, df: 40, sa: 70, sd: 40, sp: 60},
		weightkg: 28.0,
		abilities: {0: 'Early Bird'},
		innates: ['Overgrow', 'Grass Flute', 'Nocturnal']
	},
	Shiftry: {
		types: ['Grass', 'Dark'],
		bs: {hp: 90, at: 110, df: 60, sa: 100, sd: 60, sp: 80},
		weightkg: 59.6,
		abilities: {0: 'Chlorophyll'},
		innates: ['Overgrow', 'Wind Rider', 'Nocturnal']
	},
	Taillow: {
		types: ['Normal', 'Flying'],
		bs: {hp: 40, at: 55, df: 30, sa: 55, sd: 30, sp: 85},
		weightkg: 2.3,
		abilities: {0: 'Guts'},
		innates: ['Flock', 'Keen Eye', 'Scrappy']
	},
	Swellow: {
		types: ['Normal', 'Flying'],
		bs: {hp: 60, at: 85, df: 60, sa: 85, sd: 50, sp: 125},
		weightkg: 19.8,
		abilities: {0: 'Guts'},
		innates: ['Flock', 'Keen Eye', 'Scrappy']
	},
	Wingull: {
		types: ['Water', 'Flying'],
		bs: {hp: 40, at: 30, df: 30, sa: 55, sd: 30, sp: 85},
		weightkg: 9.5,
		abilities: {0: 'Drizzle'},
		innates: ['Keen Eye', 'Rain Dish', 'Flock']
	},
	Pelipper: {
		types: ['Water', 'Flying'],
		bs: {hp: 60, at: 50, df: 100, sa: 95, sd: 70, sp: 65},
		weightkg: 28.0,
		abilities: {0: 'Drizzle'},
		innates: ['Keen Eye', 'Rain Dish', 'Flock']
	},
	Ralts: {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 33, at: 25, df: 30, sa: 50, sd: 45, sp: 50},
		weightkg: 6.6,
		abilities: {0: 'Telepathy'},
		innates: ['Anticipation', 'Magic Guard', 'Inner Focus']
	},
	Kirlia: {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 48, at: 53, df: 40, sa: 75, sd: 55, sp: 60},
		weightkg: 20.2,
		abilities: {0: 'Telepathy'},
		innates: ['Anticipation', 'Magic Guard', 'Inner Focus']
	},
	Gardevoir: {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 68, at: 60, df: 65, sa: 125, sd: 115, sp: 100},
		weightkg: 48.4,
		abilities: {0: 'Queenly Majesty'},
		innates: ['Serene Grace', 'Magic Guard', 'Dreamcatcher']
	},
	Surskit: {
		types: ['Bug', 'Water'],
		bs: {hp: 40, at: 30, df: 42, sa: 50, sd: 52, sp: 65},
		weightkg: 1.7,
		abilities: {0: 'Swift Swim'},
		innates: ['Torrent', 'Unnerve', 'Water Bubble']
	},
	Masquerain: {
		types: ['Bug', 'Water'],
		bs: {hp: 70, at: 60, df: 72, sa: 100, sd: 83, sp: 100},
		weightkg: 3.6,
		abilities: {0: 'Intimidate'},
		innates: ['Compound Eyes', 'Majestic Moth', 'Aerialist']
	},
	Shroomish: {
		types: ['Grass'],
		bs: {hp: 60, at: 40, df: 60, sa: 40, sd: 60, sp: 35},
		weightkg: 4.5,
		abilities: {0: 'Poison Heal'},
		innates: ['Effect Spore', 'Toxic Boost', 'Quick Feet']
	},
	Breloom: {
		types: ['Grass', 'Fighting'],
		bs: {hp: 60, at: 130, df: 80, sa: 60, sd: 60, sp: 70},
		weightkg: 39.2,
		abilities: {0: 'Poison Heal'},
		innates: ['Effect Spore', 'Toxic Boost', 'Technician']
	},
	Slakoth: {
		types: ['Normal'],
		bs: {hp: 60, at: 60, df: 60, sa: 35, sd: 35, sp: 50},
		weightkg: 24.0,
		abilities: {0: 'Oblivious'},
		innates: ['Comatose', 'Unaware', 'Tough Claws']
	},
	Vigoroth: {
		types: ['Normal'],
		bs: {hp: 80, at: 80, df: 80, sa: 55, sd: 55, sp: 90},
		weightkg: 46.5,
		abilities: {0: 'Sheer Force'},
		innates: ['Anger Point', 'Hyper Aggressive', 'Vital Spirit']
	},
	Slaking: {
		types: ['Normal'],
		bs: {hp: 130, at: 160, df: 110, sa: 75, sd: 75, sp: 100},
		weightkg: 130.5,
		abilities: {0: 'Stall'},
		innates: ['Truant', 'Mold Breaker', 'Unaware']
	},
	Nincada: {
		types: ['Bug', 'Ground'],
		bs: {hp: 31, at: 55, df: 90, sa: 30, sd: 30, sp: 50},
		weightkg: 5.5,
		abilities: {0: 'Anticipation'},
		innates: ['Shed Skin', 'Shell Armor', 'Earthbound']
	},
	Ninjask: {
		types: ['Bug', 'Flying'],
		bs: {hp: 61, at: 100, df: 45, sa: 50, sd: 50, sp: 160},
		weightkg: 12.0,
		abilities: {0: 'Aerodynamics'},
		innates: ['Compound Eyes', 'Infiltrator', 'Speed Boost']
	},
	Shedinja: {
		types: ['Bug', 'Ghost'],
		bs: {hp: 1, at: 90, df: 45, sa: 90, sd: 30, sp: 80},
		weightkg: 1.2,
		abilities: {0: 'Overcoat'},
		innates: ['Wonder Guard', 'Haunted Spirit', 'Adaptability']
	},
	Whismur: {
		types: ['Normal'],
		bs: {hp: 74, at: 51, df: 33, sa: 71, sd: 33, sp: 38},
		weightkg: 16.3,
		abilities: {0: 'Loud Bang'},
		innates: ['Soundproof', 'Competitive', 'Amplifier']
	},
	Loudred: {
		types: ['Normal'],
		bs: {hp: 94, at: 71, df: 53, sa: 91, sd: 53, sp: 58},
		weightkg: 40.5,
		abilities: {0: 'Loud Bang'},
		innates: ['Soundproof', 'Competitive', 'Amplifier']
	},
	Exploud: {
		types: ['Normal'],
		bs: {hp: 134, at: 101, df: 73, sa: 131, sd: 73, sp: 88},
		weightkg: 84.0,
		abilities: {0: 'Punk Rock'},
		innates: ['Limber', 'Loud Bang', 'Amplifier']
	},
	Makuhita: {
		types: ['Fighting'],
		bs: {hp: 72, at: 70, df: 40, sa: 20, sd: 40, sp: 25},
		weightkg: 86.4,
		abilities: {0: 'Vital Spirit'},
		innates: ['Thick Fat', 'Iron Fist', 'Rivalry']
	},
	Hariyama: {
		types: ['Fighting'],
		bs: {hp: 144, at: 130, df: 70, sa: 40, sd: 70, sp: 50},
		weightkg: 253.8,
		abilities: {0: 'Guts'},
		innates: ['Thick Fat', 'Stalwart', 'Stamina']
	},
	Azurill: {
		types: ['Water', 'Fairy'],
		bs: {hp: 50, at: 20, df: 40, sa: 20, sd: 40, sp: 20},
		weightkg: 2.0,
		abilities: {0: 'Friend Guard'},
		innates: ['Thick Fat', 'Water Veil', 'Run Away']
	},
	Nosepass: {
		types: ['Rock'],
		bs: {hp: 30, at: 45, df: 135, sa: 65, sd: 90, sp: 30},
		weightkg: 97.0,
		abilities: {0: 'Power Spot'},
		innates: ['Sturdy', 'Solid Rock', 'Juggernaut']
	},
	Skitty: {
		types: ['Normal'],
		bs: {hp: 55, at: 50, df: 50, sa: 65, sd: 45, sp: 60},
		weightkg: 11.0,
		abilities: {0: 'Normalize'},
		innates: ['Cute Charm', 'Own Tempo', 'Nocturnal']
	},
	Delcatty: {
		types: ['Normal'],
		bs: {hp: 65, at: 110, df: 65, sa: 110, sd: 55, sp: 115},
		weightkg: 32.6,
		abilities: {0: 'Pretty Princess'},
		innates: ['Prim and Proper', 'Dazzling', 'Nocturnal']
	},
	Sableye: {
		types: ['Dark', 'Ghost'],
		bs: {hp: 70, at: 75, df: 80, sa: 65, sd: 70, sp: 50},
		weightkg: 11.0,
		abilities: {0: 'Prankster'},
		innates: ['Analytic', 'Magic Guard', 'Nocturnal']
	},
	Mawile: {
		types: ['Steel', 'Fairy'],
		bs: {hp: 70, at: 45, df: 115, sa: 55, sd: 75, sp: 50},
		weightkg: 11.5,
		abilities: {0: 'Adaptability'},
		innates: ['Multi-Headed', 'Huge Power', 'Jaws of Carnage']
	},
	Aron: {
		types: ['Steel', 'Rock'],
		bs: {hp: 50, at: 70, df: 100, sa: 40, sd: 40, sp: 30},
		weightkg: 60.0,
		abilities: {0: 'Scrapyard'},
		innates: ['Sturdy', 'Battle Armor', 'Lead Coat']
	},
	Lairon: {
		types: ['Steel', 'Rock'],
		bs: {hp: 60, at: 90, df: 140, sa: 50, sd: 50, sp: 40},
		weightkg: 120.0,
		abilities: {0: 'Sturdy'},
		innates: ['Lead Coat', 'Juggernaut', 'Impenetrable']
	},
	Aggron: {
		types: ['Steel', 'Rock'],
		bs: {hp: 70, at: 110, df: 180, sa: 60, sd: 60, sp: 50},
		weightkg: 360.0,
		abilities: {0: 'Juggernaut'},
		innates: ['Lead Coat', 'Filter', 'Impenetrable']
	},
	Meditite: {
		types: ['Fighting', 'Psychic'],
		bs: {hp: 30, at: 75, df: 55, sa: 40, sd: 55, sp: 60},
		weightkg: 11.2,
		abilities: {0: 'Vital Spirit'},
		innates: ['Inner Focus', 'Technician', 'Striker']
	},
	Medicham: {
		types: ['Fighting', 'Psychic'],
		bs: {hp: 60, at: 100, df: 75, sa: 60, sd: 75, sp: 80},
		weightkg: 31.5,
		abilities: {0: 'Fatal Precision'},
		innates: ['Technician', 'Combat Specialist', 'Limber']
	},
	Electrike: {
		types: ['Electric'],
		bs: {hp: 40, at: 70, df: 40, sa: 80, sd: 40, sp: 65},
		weightkg: 15.2,
		abilities: {0: 'Generator'},
		innates: ['Static', 'Lightning Rod', 'Overcharge']
	},
	Manectric: {
		types: ['Electric'],
		bs: {hp: 70, at: 110, df: 60, sa: 125, sd: 60, sp: 105},
		weightkg: 40.2,
		abilities: {0: 'Generator'},
		innates: ['Static', 'Lightning Rod', 'Overcharge']
	},
	Plusle: {
		types: ['Electric', 'Fairy'],
		bs: {hp: 60, at: 50, df: 50, sa: 105, sd: 75, sp: 105},
		weightkg: 4.2,
		abilities: {0: 'Transistor'},
		innates: ['Plus', 'Competitive', 'Speed Boost']
	},
	Minun: {
		types: ['Electric', 'Fairy'],
		bs: {hp: 60, at: 105, df: 50, sa: 50, sd: 75, sp: 105},
		weightkg: 4.2,
		abilities: {0: 'Transistor'},
		innates: ['Minus', 'Defiant', 'Speed Boost']
	},
	Volbeat: {
		types: ['Bug', 'Electric'],
		bs: {hp: 78, at: 90, df: 85, sa: 47, sd: 85, sp: 115},
		weightkg: 17.7,
		abilities: {0: 'Pollinate'},
		innates: ['Swarm', 'Reckless', 'Electrocytes']
	},
	Illumise: {
		types: ['Bug', 'Fairy'],
		bs: {hp: 80, at: 47, df: 85, sa: 93, sd: 90, sp: 105},
		weightkg: 17.7,
		abilities: {0: 'Swarm'},
		innates: ['Prankster', 'Aroma Veil', 'Cute Charm']
	},
	Roselia: {
		types: ['Grass', 'Poison'],
		bs: {hp: 50, at: 90, df: 45, sa: 90, sd: 45, sp: 80},
		weightkg: 2.0,
		abilities: {0: 'Overgrow'},
		innates: ['Natural Cure', 'Merciless', 'Poison Point']
	},
	Gulpin: {
		types: ['Poison'],
		bs: {hp: 70, at: 53, df: 63, sa: 53, sd: 63, sp: 40},
		weightkg: 10.3,
		abilities: {0: 'Liquid Ooze'},
		innates: ['Sticky Hold', 'Liquified', 'Gluttony']
	},
	Swalot: {
		types: ['Poison'],
		bs: {hp: 100, at: 83, df: 93, sa: 83, sd: 93, sp: 55},
		weightkg: 80.0,
		abilities: {0: 'Toxic Surge'},
		innates: ['Sticky Hold', 'Liquified', 'Regenerator']
	},
	Carvanha: {
		types: ['Water', 'Dark'],
		bs: {hp: 45, at: 90, df: 20, sa: 65, sd: 20, sp: 65},
		weightkg: 20.8,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Strong Jaw', 'Rough Skin', 'Predator']
	},
	Sharpedo: {
		types: ['Water', 'Dark'],
		bs: {hp: 70, at: 120, df: 45, sa: 115, sd: 45, sp: 105},
		weightkg: 88.8,
		abilities: {0: 'Speed Force'},
		innates: ['Strong Jaw', 'Hyper Aggressive', 'Jaws of Carnage']
	},
	Wailmer: {
		types: ['Water'],
		bs: {hp: 130, at: 70, df: 35, sa: 70, sd: 35, sp: 60},
		weightkg: 130.0,
		abilities: {0: 'Liquid Voice'},
		innates: ['Thick Fat', 'Water Veil', 'Let\'s Roll']
	},
	Wailord: {
		types: ['Water'],
		bs: {hp: 160, at: 110, df: 64, sa: 110, sd: 110, sp: 1},
		weightkg: 398.0,
		abilities: {0: 'Analytic'},
		innates: ['Liquid Voice', 'Pressure', 'Atlas']
	},
	Numel: {
		types: ['Fire', 'Ground'],
		bs: {hp: 80, at: 60, df: 50, sa: 65, sd: 55, sp: 35},
		weightkg: 24.0,
		abilities: {0: 'Stamina'},
		innates: ['Oblivious', 'Magma Armor', 'Flame Body']
	},
	Camerupt: {
		types: ['Fire', 'Ground'],
		bs: {hp: 90, at: 100, df: 80, sa: 105, sd: 85, sp: 40},
		weightkg: 220.0,
		abilities: {0: 'Stamina'},
		innates: ['Magma Armor', 'Solid Rock', 'Thick Fat']
	},
	Torkoal: {
		types: ['Fire'],
		bs: {hp: 70, at: 85, df: 140, sa: 85, sd: 70, sp: 20},
		weightkg: 80.4,
		abilities: {0: 'Oblivious'},
		innates: ['Shell Armor', 'White Smoke', 'Drought']
	},
	Spoink: {
		types: ['Psychic'],
		bs: {hp: 60, at: 25, df: 35, sa: 75, sd: 80, sp: 80},
		weightkg: 30.6,
		abilities: {0: 'Psychic Mind'},
		innates: ['Thick Fat', 'Own Tempo', 'Magic Bounce']
	},
	Grumpig: {
		types: ['Psychic'],
		bs: {hp: 80, at: 45, df: 65, sa: 90, sd: 110, sp: 80},
		weightkg: 71.5,
		abilities: {0: 'Magical Fists'},
		innates: ['Forewarn', 'Thick Fat', 'Magic Bounce']
	},
	Spinda: {
		types: ['Normal'],
		bs: {hp: 60, at: 60, df: 60, sa: 60, sd: 60, sp: 60},
		weightkg: 5.0,
		abilities: {0: 'Defiant'},
		innates: ['Unaware', 'Simple', 'Dancer']
	},
	Trapinch: {
		types: ['Ground', 'Bug'],
		bs: {hp: 45, at: 100, df: 45, sa: 45, sd: 45, sp: 10},
		weightkg: 15.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Hyper Cutter', 'Strong Jaw', 'Ambush']
	},
	Vibrava: {
		types: ['Ground', 'Bug'],
		bs: {hp: 50, at: 70, df: 50, sa: 70, sd: 50, sp: 70},
		weightkg: 15.3,
		abilities: {0: 'Amplifier'},
		innates: ['Dragonfly', 'Tinted Lens', 'Loud Bang']
	},
	Flygon: {
		types: ['Ground', 'Bug'],
		bs: {hp: 80, at: 100, df: 80, sa: 100, sd: 80, sp: 100},
		weightkg: 82.0,
		abilities: {0: 'Amplifier'},
		innates: ['Dragonfly', 'Sand Song', 'Tinted Lens']
	},
	Cacnea: {
		types: ['Grass'],
		bs: {hp: 50, at: 85, df: 40, sa: 85, sd: 40, sp: 65},
		weightkg: 51.3,
		abilities: {0: 'Sand Rush'},
		innates: ['Rough Skin', 'Nocturnal', 'Water Absorb']
	},
	Cacturne: {
		types: ['Grass', 'Dark'],
		bs: {hp: 70, at: 115, df: 60, sa: 115, sd: 60, sp: 85},
		weightkg: 77.4,
		abilities: {0: 'Sand Rush'},
		innates: ['Nocturnal', 'Rough Skin', 'Soul Eater']
	},
	Swablu: {
		types: ['Normal', 'Flying'],
		bs: {hp: 45, at: 55, df: 60, sa: 55, sd: 75, sp: 50},
		weightkg: 1.2,
		abilities: {0: 'Cotton Down'},
		innates: ['Fluffy', 'Cute Charm', 'Natural Cure']
	},
	Altaria: {
		types: ['Dragon', 'Flying'],
		bs: {hp: 75, at: 90, df: 90, sa: 70, sd: 105, sp: 80},
		weightkg: 20.6,
		abilities: {0: 'Cotton Down'},
		innates: ['Natural Cure', 'Fluffy', 'Sweet Dreams']
	},
	Zangoose: {
		types: ['Normal'],
		bs: {hp: 73, at: 115, df: 70, sa: 60, sd: 70, sp: 105},
		weightkg: 40.3,
		abilities: {0: 'Toxic Boost'},
		innates: ['Tough Claws', 'On the Prowl', 'Poison Absorb']
	},
	Seviper: {
		types: ['Poison', 'Dark'],
		bs: {hp: 73, at: 100, df: 60, sa: 100, sd: 60, sp: 100},
		weightkg: 52.5,
		abilities: {0: 'Tipping Point'},
		innates: ['Keen Edge', 'Deep Cuts', 'Hyper Aggressive']
	},
	Lunatone: {
		types: ['Rock', 'Psychic'],
		bs: {hp: 90, at: 55, df: 65, sa: 125, sd: 115, sp: 70},
		weightkg: 168.0,
		abilities: {0: 'Scare'},
		innates: ['Levitate', 'Sturdy', 'Lunar Eclipse']
	},
	Solrock: {
		types: ['Rock', 'Psychic'],
		bs: {hp: 90, at: 125, df: 115, sa: 55, sd: 65, sp: 70},
		weightkg: 154.0,
		abilities: {0: 'Victory Star'},
		innates: ['Levitate', 'Sturdy', 'Solar Flare']
	},
	Barboach: {
		types: ['Water', 'Ground'],
		bs: {hp: 50, at: 68, df: 73, sa: 68, sd: 41, sp: 60},
		weightkg: 1.9,
		abilities: {0: 'Unaware'},
		innates: ['Electrocytes', 'Oblivious', 'Earth Eater']
	},
	Whiscash: {
		types: ['Water', 'Ground'],
		bs: {hp: 110, at: 98, df: 103, sa: 98, sd: 71, sp: 60},
		weightkg: 23.6,
		abilities: {0: 'Unaware'},
		innates: ['Transistor', 'Aftershock', 'Earth Eater']
	},
	Corphish: {
		types: ['Water'],
		bs: {hp: 43, at: 80, df: 65, sa: 50, sd: 35, sp: 35},
		weightkg: 11.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Hyper Cutter', 'Shell Armor', 'Adaptability']
	},
	Crawdaunt: {
		types: ['Water', 'Dark'],
		bs: {hp: 63, at: 120, df: 85, sa: 90, sd: 55, sp: 55},
		weightkg: 32.8,
		abilities: {0: 'Swift Swim'},
		innates: ['Hyper Cutter', 'Shell Armor', 'Grip Pincer']
	},
	Baltoy: {
		types: ['Ground', 'Psychic'],
		bs: {hp: 50, at: 40, df: 55, sa: 60, sd: 70, sp: 55},
		weightkg: 21.5,
		abilities: {0: 'Ancient Idol'},
		innates: ['Levitate', 'Mystic Power', 'Sand Guard']
	},
	Claydol: {
		types: ['Ground', 'Psychic'],
		bs: {hp: 70, at: 70, df: 105, sa: 90, sd: 120, sp: 75},
		weightkg: 108.0,
		abilities: {0: 'Ancient Idol'},
		innates: ['Levitate', 'Mystic Power', 'Fort Knox']
	},
	Lileep: {
		types: ['Rock', 'Grass'],
		bs: {hp: 76, at: 41, df: 77, sa: 71, sd: 87, sp: 23},
		weightkg: 23.8,
		abilities: {0: 'Battle Armor'},
		innates: ['Fossilized', 'Hydrate', 'Seaweed']
	},
	Cradily: {
		types: ['Rock', 'Grass'],
		bs: {hp: 96, at: 81, df: 97, sa: 91, sd: 107, sp: 43},
		weightkg: 60.4,
		abilities: {0: 'Absorbant'},
		innates: ['Battle Armor', 'Hydrate', 'Seaweed']
	},
	Anorith: {
		types: ['Rock', 'Bug'],
		bs: {hp: 45, at: 95, df: 65, sa: 40, sd: 50, sp: 75},
		weightkg: 12.5,
		abilities: {0: 'Hyper Cutter'},
		innates: ['Fossilized', 'Hydrate', 'Battle Armor']
	},
	Armaldo: {
		types: ['Rock', 'Bug'],
		bs: {hp: 75, at: 125, df: 120, sa: 70, sd: 80, sp: 45},
		weightkg: 68.2,
		abilities: {0: 'Battle Armor'},
		innates: ['Fossilized', 'Hydrate', 'Hyper Cutter']
	},
	Feebas: {
		types: ['Water'],
		bs: {hp: 20, at: 15, df: 20, sa: 15, sd: 55, sp: 80},
		weightkg: 7.4,
		abilities: {0: 'Swift Swim'},
		innates: ['Multiscale', 'Marvel Scale', 'Run Away']
	},
	Milotic: {
		types: ['Water', 'Fairy'],
		bs: {hp: 95, at: 60, df: 79, sa: 100, sd: 125, sp: 81},
		weightkg: 162.0,
		abilities: {0: 'Sea Guardian'},
		innates: ['Prism Scales', 'Adaptability', 'Self Sufficient']
	},
	Castform: {
		types: ['Normal'],
		bs: {hp: 75, at: 75, df: 75, sa: 105, sd: 75, sp: 110},
		weightkg: 0.8,
		abilities: {0: 'Guilt Trip'},
		innates: ['Forecast', 'Weather Control', 'Aerialist']
	},
	Kecleon: {
		types: ['Normal'],
		bs: {hp: 60, at: 90, df: 70, sa: 60, sd: 120, sp: 40},
		weightkg: 22.0,
		abilities: {0: 'Defeatist'},
		innates: ['Color Change', 'Protean', 'Cheap Tactics']
	},
	Shuppet: {
		types: ['Ghost', 'Normal'],
		bs: {hp: 44, at: 85, df: 45, sa: 63, sd: 43, sp: 75},
		weightkg: 2.3,
		abilities: {0: 'Surprise!'},
		innates: ['Vengeance', 'Haunted Spirit', 'Levitate']
	},
	Banette: {
		types: ['Ghost', 'Normal'],
		bs: {hp: 84, at: 125, df: 85, sa: 65, sd: 83, sp: 98},
		weightkg: 12.5,
		abilities: {0: 'Surprise!'},
		innates: ['Scare', 'Haunted Spirit', 'Soul Eater']
	},
	Duskull: {
		types: ['Ghost'],
		bs: {hp: 20, at: 60, df: 90, sa: 25, sd: 90, sp: 25},
		weightkg: 15.0,
		abilities: {0: 'Twist. Dimension'},
		innates: ['Low Visibility', 'Levitate', 'Infiltrator']
	},
	Dusclops: {
		types: ['Ghost'],
		bs: {hp: 40, at: 90, df: 130, sa: 55, sd: 130, sp: 25},
		weightkg: 30.6,
		abilities: {0: 'Soul Linker'},
		innates: ['Cursed Body', 'Stall', 'Soul Eater']
	},
	Tropius: {
		types: ['Grass', 'Flying'],
		bs: {hp: 99, at: 68, df: 83, sa: 72, sd: 87, sp: 51},
		weightkg: 100.0,
		abilities: {0: 'Harvest'},
		innates: ['Giant Wings', 'Immunity', 'Draconize']
	},
	Chimecho: {
		types: ['Psychic'],
		bs: {hp: 85, at: 50, df: 90, sa: 95, sd: 100, sp: 65},
		weightkg: 1.0,
		abilities: {0: 'Magic Guard'},
		innates: ['Levitate', 'Soundproof', 'Stalwart']
	},
	Absol: {
		types: ['Dark', 'Fairy'],
		bs: {hp: 65, at: 130, df: 65, sa: 75, sd: 65, sp: 100},
		weightkg: 47.0,
		abilities: {0: 'Avenger'},
		innates: ['Super Luck', 'Mountaineer', 'Keen Edge']
	},
	Wynaut: {
		types: ['Psychic'],
		bs: {hp: 95, at: 23, df: 48, sa: 23, sd: 48, sp: 23},
		weightkg: 14.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Sticky Hold', 'Innards Out', 'Shadow Tag']
	},
	Snorunt: {
		types: ['Ice'],
		bs: {hp: 60, at: 60, df: 60, sa: 60, sd: 60, sp: 70},
		weightkg: 16.8,
		abilities: {0: 'Refrigerate'},
		innates: ['Sturdy', 'Freezing Point', 'Cryomancy']
	},
	Glalie: {
		types: ['Ice'],
		bs: {hp: 80, at: 100, df: 70, sa: 80, sd: 70, sp: 100},
		weightkg: 256.5,
		abilities: {0: 'Moody'},
		innates: ['Sturdy', 'Freezing Point', 'Impenetrable']
	},
	Spheal: {
		types: ['Ice', 'Water'],
		bs: {hp: 70, at: 40, df: 50, sa: 55, sd: 50, sp: 25},
		weightkg: 39.5,
		abilities: {0: 'Sheer Force'},
		innates: ['Thick Fat', 'Let\'s Roll', 'Oblivious']
	},
	Sealeo: {
		types: ['Ice', 'Water'],
		bs: {hp: 90, at: 60, df: 70, sa: 75, sd: 70, sp: 45},
		weightkg: 87.6,
		abilities: {0: 'Sheer Force'},
		innates: ['Thick Fat', 'Let\'s Roll', 'Oblivious']
	},
	Walrein: {
		types: ['Ice', 'Water'],
		bs: {hp: 110, at: 100, df: 90, sa: 95, sd: 90, sp: 45},
		weightkg: 150.6,
		abilities: {0: 'Sheer Force'},
		innates: ['Thick Fat', 'Arctic Fur', 'Growing Tooth']
	},
	Clamperl: {
		types: ['Water'],
		bs: {hp: 35, at: 64, df: 85, sa: 74, sd: 55, sp: 32},
		weightkg: 52.5,
		abilities: {0: 'Grip Pincer'},
		innates: ['Shell Armor', 'Sticky Hold', 'Filter']
	},
	Huntail: {
		types: ['Water'],
		bs: {hp: 55, at: 114, df: 105, sa: 94, sd: 75, sp: 72},
		weightkg: 27.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Sturdy', 'Strong Jaw', 'Predator']
	},
	Gorebyss: {
		types: ['Water'],
		bs: {hp: 65, at: 84, df: 105, sa: 114, sd: 75, sp: 72},
		weightkg: 22.6,
		abilities: {0: 'Water Veil'},
		innates: ['Dazzling', 'Adaptability', 'Predator']
	},
	Relicanth: {
		types: ['Water', 'Rock'],
		bs: {hp: 100, at: 110, df: 130, sa: 45, sd: 65, sp: 55},
		weightkg: 23.4,
		abilities: {0: 'Sturdy'},
		innates: ['Fossilized', 'Impenetrable', 'Primal Armor']
	},
	Luvdisc: {
		types: ['Water', 'Fairy'],
		bs: {hp: 53, at: 30, df: 55, sa: 90, sd: 65, sp: 107},
		weightkg: 8.7,
		abilities: {0: 'Hydration'},
		innates: ['Soul-Heart', 'Multiscale', 'Pure Love']
	},
	Bagon: {
		types: ['Dragon'],
		bs: {hp: 45, at: 75, df: 60, sa: 40, sd: 30, sp: 50},
		weightkg: 42.1,
		abilities: {0: 'Intimidate'},
		innates: ['Rock Head', 'Anger Point', 'Reckless']
	},
	Shelgon: {
		types: ['Dragon'],
		bs: {hp: 65, at: 95, df: 100, sa: 60, sd: 50, sp: 50},
		weightkg: 110.5,
		abilities: {0: 'Intimidate'},
		innates: ['Shell Armor', 'Overcoat', 'Impenetrable']
	},
	Salamence: {
		types: ['Dragon', 'Flying'],
		bs: {hp: 95, at: 135, df: 80, sa: 110, sd: 80, sp: 100},
		weightkg: 102.6,
		abilities: {0: 'Anger Point'},
		innates: ['Intimidate', 'Predator', 'Reckless']
	},
	Beldum: {
		types: ['Steel', 'Psychic'],
		bs: {hp: 40, at: 55, df: 80, sa: 35, sd: 60, sp: 30},
		weightkg: 95.2,
		abilities: {0: 'Steelworker'},
		innates: ['Levitate', 'Reckless', 'Full Metal Body']
	},
	Metang: {
		types: ['Steel', 'Psychic'],
		bs: {hp: 60, at: 75, df: 100, sa: 55, sd: 80, sp: 50},
		weightkg: 202.5,
		abilities: {0: 'Fatal Precision'},
		innates: ['Levitate', 'Download', 'Full Metal Body']
	},
	Metagross: {
		types: ['Steel', 'Psychic'],
		bs: {hp: 80, at: 135, df: 130, sa: 95, sd: 90, sp: 70},
		weightkg: 550.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Prism Armor', 'Download', 'Full Metal Body']
	},
	Regirock: {
		types: ['Rock'],
		bs: {hp: 80, at: 100, df: 200, sa: 50, sd: 100, sp: 50},
		weightkg: 230.0,
		abilities: {0: 'Power Core'},
		innates: ['Stamina', 'Impenetrable', 'Self Repair']
	},
	Regice: {
		types: ['Ice'],
		bs: {hp: 80, at: 50, df: 100, sa: 100, sd: 200, sp: 50},
		weightkg: 175.0,
		abilities: {0: 'Power Core'},
		innates: ['Fortitude', 'Impenetrable', 'Self Repair']
	},
	Registeel: {
		types: ['Steel'],
		bs: {hp: 80, at: 75, df: 150, sa: 75, sd: 150, sp: 50},
		weightkg: 205.0,
		abilities: {0: 'Chrome Coat'},
		innates: ['Stalwart', 'Impenetrable', 'Self Repair']
	},
	Latias: {
		types: ['Dragon', 'Psychic'],
		bs: {hp: 80, at: 80, df: 90, sa: 110, sd: 130, sp: 110},
		weightkg: 40.0,
		abilities: {0: 'Mirror Armor'},
		innates: ['Levitate', 'Prism Armor', 'Mystic Power']
	},
	Latios: {
		types: ['Dragon', 'Psychic'],
		bs: {hp: 80, at: 90, df: 80, sa: 130, sd: 110, sp: 110},
		weightkg: 60.0,
		abilities: {0: 'Avenger'},
		innates: ['Levitate', 'Rapid Response', 'Mystic Power']
	},
	Kyogre: {
		types: ['Water'],
		bs: {hp: 100, at: 100, df: 90, sa: 150, sd: 140, sp: 90},
		weightkg: 352.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Drizzle', 'Self Sufficient', 'Sea Guardian']
	},
	Groudon: {
		types: ['Ground', 'Fire'],
		bs: {hp: 100, at: 150, df: 140, sa: 100, sd: 90, sp: 90},
		weightkg: 950.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Drought', 'Self Sufficient', 'Sun Worship']
	},
	Rayquaza: {
		types: ['Dragon', 'Flying'],
		bs: {hp: 105, at: 150, df: 90, sa: 150, sd: 90, sp: 95},
		weightkg: 206.5,
		abilities: {0: 'Dragon\'s Maw'},
		innates: ['Air Lock', 'Weather Control', 'Aerodynamics']
	},
	Jirachi: {
		types: ['Steel', 'Psychic'],
		bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
		weightkg: 1.1,
		abilities: {0: 'Doombringer'},
		innates: ['Steely Spirit', 'Serene Grace', 'Levitate']
	},
	Deoxys: {
		types: ['Psychic'],
		bs: {hp: 50, at: 150, df: 50, sa: 150, sd: 50, sp: 150},
		weightkg: 60.8,
		abilities: {0: 'Tinted Lens'},
		innates: ['Mystic Power', 'Clear Body', 'Neuroforce']
	},
	Turtwig: {
		types: ['Grass'],
		bs: {hp: 57, at: 68, df: 64, sa: 45, sd: 55, sp: 31},
		weightkg: 10.2,
		abilities: {0: 'Grounded'},
		innates: ['Overgrow', 'Shell Armor', 'Earthbound']
	},
	Grotle: {
		types: ['Grass'],
		bs: {hp: 80, at: 89, df: 90, sa: 55, sd: 65, sp: 41},
		weightkg: 97.0,
		abilities: {0: 'Grounded'},
		innates: ['Overgrow', 'Shell Armor', 'Harvest']
	},
	Torterra: {
		types: ['Grass', 'Ground'],
		bs: {hp: 95, at: 119, df: 134, sa: 55, sd: 75, sp: 57},
		weightkg: 310.0,
		abilities: {0: 'Rough Skin'},
		innates: ['Overgrow', 'Impenetrable', 'Chloroplast']
	},
	Chimchar: {
		types: ['Fire'],
		bs: {hp: 44, at: 62, df: 44, sa: 62, sd: 44, sp: 64},
		weightkg: 6.2,
		abilities: {0: 'Iron Fist'},
		innates: ['Blaze', 'Prankster', 'Defiant']
	},
	Monferno: {
		types: ['Fire', 'Fighting'],
		bs: {hp: 64, at: 83, df: 52, sa: 83, sd: 52, sp: 86},
		weightkg: 22.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Blaze', 'Prankster', 'Defiant']
	},
	Infernape: {
		types: ['Fire', 'Fighting'],
		bs: {hp: 76, at: 105, df: 71, sa: 104, sd: 71, sp: 108},
		weightkg: 55.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Blaze', 'Discipline', 'Egoist']
	},
	Piplup: {
		types: ['Water'],
		bs: {hp: 53, at: 51, df: 53, sa: 67, sd: 56, sp: 40},
		weightkg: 5.2,
		abilities: {0: 'Competitive'},
		innates: ['Torrent', 'Thick Fat', 'Swift Swim']
	},
	Prinplup: {
		types: ['Water'],
		bs: {hp: 69, at: 66, df: 68, sa: 86, sd: 81, sp: 50},
		weightkg: 23.0,
		abilities: {0: 'Competitive'},
		innates: ['Torrent', 'Antarctic Bird', 'Swift Swim']
	},
	Empoleon: {
		types: ['Water', 'Steel'],
		bs: {hp: 84, at: 86, df: 88, sa: 116, sd: 101, sp: 60},
		weightkg: 84.5,
		abilities: {0: 'Competitive'},
		innates: ['Torrent', 'Antarctic Bird', 'Impenetrable']
	},
	Starly: {
		types: ['Normal', 'Flying'],
		bs: {hp: 40, at: 55, df: 30, sa: 30, sd: 30, sp: 60},
		weightkg: 2.0,
		abilities: {0: 'Intimidate'},
		innates: ['Flock', 'Keen Eye', 'Run Away']
	},
	Staravia: {
		types: ['Normal', 'Flying'],
		bs: {hp: 55, at: 75, df: 50, sa: 40, sd: 40, sp: 80},
		weightkg: 15.5,
		abilities: {0: 'Intimidate'},
		innates: ['Flock', 'Keen Eye', 'Frisk']
	},
	Staraptor: {
		types: ['Normal', 'Flying'],
		bs: {hp: 85, at: 120, df: 70, sa: 50, sd: 60, sp: 100},
		weightkg: 24.9,
		abilities: {0: 'Fatal Precision'},
		innates: ['Intimidate', 'Blur', 'Violent Rush']
	},
	Bidoof: {
		types: ['Normal'],
		bs: {hp: 69, at: 45, df: 60, sa: 35, sd: 40, sp: 31},
		weightkg: 20.0,
		abilities: {0: 'Simple'},
		innates: ['Unaware', 'Growing Tooth', 'Field Explorer']
	},
	Bibarel: {
		types: ['Normal', 'Water'],
		bs: {hp: 89, at: 85, df: 80, sa: 55, sd: 60, sp: 71},
		weightkg: 31.5,
		abilities: {0: 'Simple'},
		innates: ['Unaware', 'Growing Tooth', 'Field Explorer']
	},
	Kricketot: {
		types: ['Bug', 'Normal'],
		bs: {hp: 37, at: 25, df: 41, sa: 25, sd: 41, sp: 25},
		weightkg: 2.2,
		abilities: {0: 'Technician'},
		innates: ['Swarm', 'Shed Skin', 'Soundproof']
	},
	Kricketune: {
		types: ['Bug', 'Normal'],
		bs: {hp: 77, at: 85, df: 51, sa: 85, sd: 51, sp: 85},
		weightkg: 25.5,
		abilities: {0: 'Hydrate'},
		innates: ['Mountaineer', 'Technician', 'Soundproof']
	},
	Shinx: {
		types: ['Electric'],
		bs: {hp: 55, at: 65, df: 34, sa: 30, sd: 34, sp: 65},
		weightkg: 9.5,
		abilities: {0: 'Intimidate'},
		innates: ['Short Circuit', 'Illuminate', 'Guts']
	},
	Luxio: {
		types: ['Electric'],
		bs: {hp: 60, at: 85, df: 49, sa: 60, sd: 49, sp: 60},
		weightkg: 30.5,
		abilities: {0: 'Intimidate'},
		innates: ['Short Circuit', 'Illuminate', 'Guts']
	},
	Luxray: {
		types: ['Electric'],
		bs: {hp: 90, at: 120, df: 79, sa: 75, sd: 79, sp: 90},
		weightkg: 42.0,
		abilities: {0: 'Frisk'},
		innates: ['Short Circuit', 'Intimidate', 'Predator']
	},
	Budew: {
		types: ['Grass', 'Poison'],
		bs: {hp: 40, at: 30, df: 35, sa: 50, sd: 70, sp: 55},
		weightkg: 1.2,
		abilities: {0: 'Pastel Veil'},
		innates: ['Poison Point', 'Cute Charm', 'Natural Cure']
	},
	Roserade: {
		types: ['Grass', 'Poison'],
		bs: {hp: 60, at: 125, df: 65, sa: 125, sd: 70, sp: 90},
		weightkg: 14.5,
		abilities: {0: 'Technician'},
		innates: ['Natural Cure', 'Merciless', 'Aroma Veil']
	},
	Cranidos: {
		types: ['Rock'],
		bs: {hp: 67, at: 125, df: 40, sa: 30, sd: 30, sp: 58},
		weightkg: 31.5,
		abilities: {0: 'Sheer Force'},
		innates: ['Rock Head', 'Mineralize', 'Fossilized']
	},
	Rampardos: {
		types: ['Rock'],
		bs: {hp: 97, at: 165, df: 70, sa: 55, sd: 50, sp: 78},
		weightkg: 102.5,
		abilities: {0: 'Sturdy'},
		innates: ['Fossilized', 'Reckless', 'Rock Head']
	},
	Shieldon: {
		types: ['Rock', 'Steel'],
		bs: {hp: 30, at: 42, df: 118, sa: 42, sd: 88, sp: 30},
		weightkg: 57.0,
		abilities: {0: 'Sturdy'},
		innates: ['Fossilized', 'Impenetrable', 'Stall']
	},
	Bastiodon: {
		types: ['Rock', 'Steel'],
		bs: {hp: 80, at: 52, df: 168, sa: 47, sd: 138, sp: 30},
		weightkg: 149.5,
		abilities: {0: 'Battle Armor'},
		innates: ['Dauntless Shield', 'Impenetrable', 'Primal Armor']
	},
	Burmy: {
		types: ['Bug'],
		bs: {hp: 55, at: 29, df: 60, sa: 59, sd: 60, sp: 36},
		weightkg: 3.4,
		abilities: {0: 'Anticipation'},
		innates: ['Swarm', 'Shed Skin', 'Overcoat']
	},
	Wormadam: {
		types: ['Bug', 'Grass'],
		bs: {hp: 84, at: 59, df: 85, sa: 99, sd: 105, sp: 36},
		weightkg: 6.5,
		abilities: {0: 'Anticipation'},
		innates: ['Adaptability', 'Battle Armor', 'Coward']
	},
	Mothim: {
		types: ['Bug', 'Flying'],
		bs: {hp: 65, at: 100, df: 65, sa: 100, sd: 65, sp: 90},
		weightkg: 23.3,
		abilities: {0: 'Looter'},
		innates: ['Tinted Lens', 'Majestic Moth', 'Compound Eyes']
	},
	Combee: {
		types: ['Bug', 'Flying'],
		bs: {hp: 40, at: 60, df: 42, sa: 60, sd: 42, sp: 80},
		weightkg: 5.5,
		abilities: {0: 'Regenerator'},
		innates: ['Swarm', 'Pollinate', 'Multi-Headed']
	},
	Vespiquen: {
		types: ['Bug', 'Flying'],
		bs: {hp: 70, at: 80, df: 112, sa: 80, sd: 112, sp: 40},
		weightkg: 38.5,
		abilities: {0: 'Regenerator'},
		innates: ['Queen\'s Mourning', 'Queenly Majesty', 'Self Sufficient']
	},
	Pachirisu: {
		types: ['Electric'],
		bs: {hp: 60, at: 45, df: 70, sa: 75, sd: 110, sp: 95},
		weightkg: 3.9,
		abilities: {0: 'Gluttony'},
		innates: ['Fur Coat', 'Regenerator', 'Volt Absorb']
	},
	Buizel: {
		types: ['Water'],
		bs: {hp: 55, at: 65, df: 35, sa: 60, sd: 30, sp: 85},
		weightkg: 29.5,
		abilities: {0: 'Tidal Rush'},
		innates: ['Field Explorer', 'Inflatable', 'Pickup']
	},
	Floatzel: {
		types: ['Water'],
		bs: {hp: 85, at: 105, df: 55, sa: 85, sd: 50, sp: 115},
		weightkg: 33.5,
		abilities: {0: 'Water Veil'},
		innates: ['Tidal Rush', 'Technician', 'Inflatable']
	},
	Cherubi: {
		types: ['Grass'],
		bs: {hp: 45, at: 62, df: 45, sa: 62, sd: 53, sp: 63},
		weightkg: 3.3,
		abilities: {0: 'Pastel Veil'},
		innates: ['Overgrow', 'Chlorophyll', 'Chloroplast']
	},
	Cherrim: {
		types: ['Grass'],
		bs: {hp: 70, at: 100, df: 70, sa: 100, sd: 78, sp: 85},
		weightkg: 9.3,
		abilities: {0: 'Aroma Veil'},
		innates: ['Flower Gift', 'Ripen', 'Solar Flare']
	},
	Shellos: {
		types: ['Water'],
		bs: {hp: 76, at: 48, df: 48, sa: 57, sd: 62, sp: 34},
		weightkg: 6.3,
		abilities: {0: 'Shell Armor'},
		innates: ['Sticky Hold', 'Self Sufficient', 'Limber']
	},
	Gastrodon: {
		types: ['Water', 'Ground'],
		bs: {hp: 111, at: 83, df: 68, sa: 92, sd: 82, sp: 39},
		weightkg: 29.9,
		abilities: {0: 'Sand Guard'},
		innates: ['Sticky Hold', 'Self Sufficient', 'Shell Armor']
	},
	Ambipom: {
		types: ['Normal'],
		bs: {hp: 75, at: 100, df: 66, sa: 60, sd: 66, sp: 125},
		weightkg: 20.3,
		abilities: {0: 'Monkey Business'},
		innates: ['Long Reach', 'Technician', 'Skill Link']
	},
	Drifloon: {
		types: ['Ghost', 'Flying'],
		bs: {hp: 95, at: 50, df: 39, sa: 60, sd: 54, sp: 70},
		weightkg: 1.2,
		abilities: {0: 'Flare Boost'},
		innates: ['Inflatable', 'Aftermath', 'Soul Eater']
	},
	Drifblim: {
		types: ['Ghost', 'Flying'],
		bs: {hp: 150, at: 80, df: 54, sa: 90, sd: 74, sp: 80},
		weightkg: 15.0,
		abilities: {0: 'Flare Boost'},
		innates: ['Inflatable', 'Aftermath', 'Soul Eater']
	},
	Buneary: {
		types: ['Normal'],
		bs: {hp: 55, at: 66, df: 44, sa: 44, sd: 56, sp: 85},
		weightkg: 5.5,
		abilities: {0: 'Normalize'},
		innates: ['Fur Coat', 'Limber', 'Striker']
	},
	Lopunny: {
		types: ['Normal', 'Fighting'],
		bs: {hp: 65, at: 76, df: 64, sa: 54, sd: 96, sp: 115},
		weightkg: 33.3,
		abilities: {0: 'Normalize'},
		innates: ['Limber', 'Fur Coat', 'Striker']
	},
	Mismagius: {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 60, at: 60, df: 60, sa: 110, sd: 110, sp: 110},
		weightkg: 4.4,
		abilities: {0: 'Ectoplasm'},
		innates: ['Levitate', 'Shadow Tag', 'Emanate']
	},
	Honchkrow: {
		types: ['Dark', 'Flying'],
		bs: {hp: 100, at: 120, df: 52, sa: 52, sd: 81, sp: 105},
		weightkg: 27.3,
		abilities: {0: 'Super Luck'},
		innates: ['Big Pecks', 'Overcoat', 'Looter']
	},
	Glameow: {
		types: ['Normal'],
		bs: {hp: 49, at: 65, df: 42, sa: 42, sd: 37, sp: 85},
		weightkg: 3.9,
		abilities: {0: 'Pure Power'},
		innates: ['Hypnotist', 'Limber', 'Defiant']
	},
	Purugly: {
		types: ['Normal'],
		bs: {hp: 88, at: 102, df: 64, sa: 64, sd: 69, sp: 112},
		weightkg: 43.8,
		abilities: {0: 'Intimidate'},
		innates: ['Hyper Aggressive', 'Thick Fat', 'Fur Coat']
	},
	Chingling: {
		types: ['Psychic'],
		bs: {hp: 45, at: 30, df: 50, sa: 65, sd: 50, sp: 45},
		weightkg: 0.6,
		abilities: {0: 'Mystic Power'},
		innates: ['Levitate', 'Magic Guard', 'Metallic']
	},
	Stunky: {
		types: ['Poison', 'Dark'],
		bs: {hp: 63, at: 41, df: 47, sa: 77, sd: 41, sp: 74},
		weightkg: 19.2,
		abilities: {0: 'Poison Point'},
		innates: ['Aftermath', 'Stench', 'Lingering Aroma']
	},
	Skuntank: {
		types: ['Poison', 'Dark'],
		bs: {hp: 103, at: 51, df: 77, sa: 113, sd: 71, sp: 84},
		weightkg: 38.0,
		abilities: {0: 'Aftermath'},
		innates: ['Corrosion', 'Stench', 'Gluttony']
	},
	Bronzor: {
		types: ['Steel', 'Psychic'],
		bs: {hp: 57, at: 24, df: 86, sa: 24, sd: 86, sp: 23},
		weightkg: 60.5,
		abilities: {0: 'Battle Armor'},
		innates: ['Levitate', 'Mirror Armor', 'Forewarn']
	},
	Bronzong: {
		types: ['Steel', 'Psychic'],
		bs: {hp: 67, at: 89, df: 116, sa: 79, sd: 116, sp: 33},
		weightkg: 187.0,
		abilities: {0: 'Drizzle'},
		innates: ['Steely Spirit', 'Heatproof', 'Battle Armor']
	},
	Bonsly: {
		types: ['Rock'],
		bs: {hp: 50, at: 80, df: 95, sa: 10, sd: 45, sp: 10},
		weightkg: 15.0,
		abilities: {0: 'Sturdy'},
		innates: ['Raw Wood', 'Cute Charm', 'Rock Head']
	},
	'Mime Jr.': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 20, at: 25, df: 45, sa: 70, sd: 90, sp: 60},
		weightkg: 13.0,
		abilities: {0: 'Filter'},
		innates: ['Soundproof', 'Cute Charm', 'Magic Bounce']
	},
	Happiny: {
		types: ['Normal'],
		bs: {hp: 100, at: 5, df: 5, sa: 15, sd: 65, sp: 30},
		weightkg: 24.4,
		abilities: {0: 'Regenerator'},
		innates: ['Cute Charm', 'Healer', 'Natural Cure']
	},
	Chatot: {
		types: ['Normal', 'Flying'],
		bs: {hp: 76, at: 65, df: 45, sa: 92, sd: 42, sp: 91},
		weightkg: 1.9,
		abilities: {0: 'Opportunist'},
		innates: ['Adaptability', 'Amplifier', 'Parroting']
	},
	Spiritomb: {
		types: ['Ghost', 'Dark'],
		bs: {hp: 50, at: 108, df: 108, sa: 108, sd: 108, sp: 35},
		weightkg: 108.0,
		abilities: {0: 'Hypnotist'},
		innates: ['Soul Eater', 'Bad Dreams', 'Shadow Shield']
	},
	Gible: {
		types: ['Dragon', 'Ground'],
		bs: {hp: 58, at: 70, df: 45, sa: 40, sd: 45, sp: 42},
		weightkg: 20.5,
		abilities: {0: 'Strong Jaw'},
		innates: ['Hyper Aggressive', 'Sand Veil', 'Rough Skin']
	},
	Gabite: {
		types: ['Dragon', 'Ground'],
		bs: {hp: 68, at: 90, df: 65, sa: 50, sd: 55, sp: 82},
		weightkg: 56.0,
		abilities: {0: 'Opportunist'},
		innates: ['Hyper Aggressive', 'Looter', 'Rough Skin']
	},
	Garchomp: {
		types: ['Dragon', 'Ground'],
		bs: {hp: 108, at: 130, df: 95, sa: 80, sd: 85, sp: 102},
		weightkg: 95.0,
		abilities: {0: 'Overwhelm'},
		innates: ['Hyper Aggressive', 'Speed Force', 'Rough Skin']
	},
	Munchlax: {
		types: ['Normal'],
		bs: {hp: 135, at: 85, df: 40, sa: 40, sd: 85, sp: 5},
		weightkg: 105.0,
		abilities: {0: 'Comatose'},
		innates: ['Thick Fat', 'Let\'s Roll', 'Looter']
	},
	Riolu: {
		types: ['Fighting'],
		bs: {hp: 40, at: 70, df: 40, sa: 35, sd: 40, sp: 60},
		weightkg: 20.2,
		abilities: {0: 'Prankster'},
		innates: ['Fighter', 'Inner Focus', 'Cute Charm']
	},
	Lucario: {
		types: ['Fighting', 'Steel'],
		bs: {hp: 70, at: 110, df: 70, sa: 115, sd: 70, sp: 90},
		weightkg: 54.0,
		abilities: {0: 'Fighting Spirit'},
		innates: ['Inner Focus', 'Fatal Precision', 'Vital Spirit']
	},
	Hippopotas: {
		types: ['Ground'],
		bs: {hp: 68, at: 72, df: 78, sa: 38, sd: 42, sp: 32},
		weightkg: 49.5,
		abilities: {0: 'Sand Veil'},
		innates: ['Sand Spit', 'Sand Guard', 'Oblivious']
	},
	Hippowdon: {
		types: ['Ground'],
		bs: {hp: 108, at: 112, df: 118, sa: 68, sd: 72, sp: 47},
		weightkg: 300.0,
		abilities: {0: 'Sand Stream'},
		innates: ['Sand Guard', 'Predator', 'Strong Jaw']
	},
	Skorupi: {
		types: ['Poison', 'Bug'],
		bs: {hp: 60, at: 70, df: 100, sa: 45, sd: 60, sp: 70},
		weightkg: 12.0,
		abilities: {0: 'Grounded'},
		innates: ['Looter', 'Shell Armor', 'Poison Touch']
	},
	Drapion: {
		types: ['Poison', 'Dark'],
		bs: {hp: 70, at: 100, df: 120, sa: 60, sd: 75, sp: 95},
		weightkg: 61.5,
		abilities: {0: 'Fatal Precision'},
		innates: ['Sniper', 'Shell Armor', 'Pretentious']
	},
	Croagunk: {
		types: ['Poison', 'Fighting'],
		bs: {hp: 48, at: 67, df: 40, sa: 67, sd: 40, sp: 67},
		weightkg: 23.0,
		abilities: {0: 'Merciless'},
		innates: ['Dry Skin', 'Amphibious', 'Poison Touch']
	},
	Toxicroak: {
		types: ['Poison', 'Fighting'],
		bs: {hp: 83, at: 106, df: 65, sa: 106, sd: 65, sp: 105},
		weightkg: 44.4,
		abilities: {0: 'Technician'},
		innates: ['Dry Skin', 'Poison Touch', 'Merciless']
	},
	Carnivine: {
		types: ['Grass'],
		bs: {hp: 90, at: 116, df: 92, sa: 80, sd: 92, sp: 50},
		weightkg: 27.0,
		abilities: {0: 'Opportunist'},
		innates: ['Energy Tap', 'Stall', 'Jaws of Carnage']
	},
	Finneon: {
		types: ['Water'],
		bs: {hp: 49, at: 49, df: 56, sa: 55, sd: 61, sp: 70},
		weightkg: 7.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Water Veil', 'Storm Drain', 'Illuminate']
	},
	Lumineon: {
		types: ['Water'],
		bs: {hp: 69, at: 69, df: 76, sa: 69, sd: 86, sp: 91},
		weightkg: 24.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Storm Drain', 'Giant Wings', 'Illuminate']
	},
	Mantyke: {
		types: ['Water', 'Flying'],
		bs: {hp: 45, at: 20, df: 50, sa: 60, sd: 120, sp: 50},
		weightkg: 65.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Water Veil', 'Water Absorb', 'Hydration']
	},
	Snover: {
		types: ['Grass', 'Ice'],
		bs: {hp: 60, at: 72, df: 50, sa: 72, sd: 60, sp: 40},
		weightkg: 50.5,
		abilities: {0: 'Ice Body'},
		innates: ['Mountaineer', 'Permafrost', 'Snow Warning']
	},
	Abomasnow: {
		types: ['Grass', 'Ice'],
		bs: {hp: 90, at: 102, df: 75, sa: 102, sd: 85, sp: 60},
		weightkg: 135.5,
		abilities: {0: 'Snow Warning'},
		innates: ['Ice Body', 'Cryomancy', 'Permafrost']
	},
	Weavile: {
		types: ['Dark', 'Ice'],
		bs: {hp: 70, at: 120, df: 65, sa: 45, sd: 85, sp: 125},
		weightkg: 34.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Freezing Point', 'Predator', 'Tough Claws']
	},
	Magnezone: {
		types: ['Electric', 'Steel'],
		bs: {hp: 70, at: 70, df: 115, sa: 130, sd: 90, sp: 60},
		weightkg: 180.0,
		abilities: {0: 'Sighting System'},
		innates: ['Filter', 'Multi-Headed', 'Magnet Pull']
	},
	Lickilicky: {
		types: ['Normal'],
		bs: {hp: 150, at: 95, df: 75, sa: 95, sd: 70, sp: 50},
		weightkg: 140.0,
		abilities: {0: 'Unaware'},
		innates: ['Regenerator', 'Thick Fat', 'Cloud Nine']
	},
	Rhyperior: {
		types: ['Ground', 'Rock'],
		bs: {hp: 115, at: 140, df: 130, sa: 55, sd: 55, sp: 40},
		weightkg: 282.8,
		abilities: {0: 'Lightning Rod'},
		innates: ['Solid Rock', 'Stamina', 'Mega Launcher']
	},
	Tangrowth: {
		types: ['Grass'],
		bs: {hp: 100, at: 100, df: 125, sa: 110, sd: 50, sp: 50},
		weightkg: 128.6,
		abilities: {0: 'Tangling Hair'},
		innates: ['Regenerator', 'Seaweed', 'Self Sufficient']
	},
	Electivire: {
		types: ['Electric'],
		bs: {hp: 95, at: 123, df: 87, sa: 69, sd: 65, sp: 101},
		weightkg: 138.6,
		abilities: {0: 'Whiplash'},
		innates: ['Motor Drive', 'Hyper Aggressive', 'Overcoat']
	},
	Magmortar: {
		types: ['Fire'],
		bs: {hp: 75, at: 95, df: 67, sa: 125, sd: 85, sp: 93},
		weightkg: 68.0,
		abilities: {0: 'Nocturnal'},
		innates: ['Molten Down', 'Dual Wield', 'Flash Fire']
	},
	Togekiss: {
		types: ['Fairy', 'Flying'],
		bs: {hp: 85, at: 50, df: 95, sa: 120, sd: 115, sp: 80},
		weightkg: 38.0,
		abilities: {0: 'Pixilate'},
		innates: ['Super Luck', 'Serene Grace', 'Giant Wings']
	},
	Yanmega: {
		types: ['Bug', 'Flying'],
		bs: {hp: 86, at: 76, df: 86, sa: 126, sd: 56, sp: 95},
		weightkg: 51.5,
		abilities: {0: 'Giant Wings'},
		innates: ['Speed Boost', 'Hyper Aggressive', 'Predator']
	},
	Leafeon: {
		types: ['Grass'],
		bs: {hp: 65, at: 110, df: 130, sa: 60, sd: 65, sp: 95},
		weightkg: 25.5,
		abilities: {0: 'Grass Pelt'},
		innates: ['Keen Edge', 'Deep Cuts', 'Justified']
	},
	Glaceon: {
		types: ['Ice'],
		bs: {hp: 65, at: 60, df: 110, sa: 130, sd: 95, sp: 65},
		weightkg: 25.9,
		abilities: {0: 'Ice Scales'},
		innates: ['Ice Body', 'Cryomancy', 'Frozen Soul']
	},
	Gliscor: {
		types: ['Ground', 'Flying'],
		bs: {hp: 75, at: 95, df: 125, sa: 45, sd: 75, sp: 95},
		weightkg: 42.5,
		abilities: {0: 'Tectonize'},
		innates: ['Hyper Cutter', 'Rough Skin', 'Poison Heal']
	},
	Mamoswine: {
		types: ['Ice', 'Ground'],
		bs: {hp: 110, at: 130, df: 80, sa: 70, sd: 60, sp: 80},
		weightkg: 291.0,
		abilities: {0: 'Permafrost'},
		innates: ['Thick Fat', 'Slush Rush', 'Growing Tooth']
	},
	'Porygon-Z': {
		types: ['Normal', 'Electric'],
		bs: {hp: 85, at: 80, df: 70, sa: 135, sd: 75, sp: 90},
		weightkg: 34.0,
		abilities: {0: 'Download'},
		innates: ['Levitate', 'Adaptability', 'Deadeye']
	},
	Gallade: {
		types: ['Psychic', 'Fighting'],
		bs: {hp: 68, at: 125, df: 65, sa: 60, sd: 115, sp: 100},
		weightkg: 52.0,
		abilities: {0: 'Speed Force'},
		innates: ['Dual Wield', 'Fatal Precision', 'Avenger']
	},
	Probopass: {
		types: ['Rock', 'Steel'],
		bs: {hp: 60, at: 55, df: 145, sa: 95, sd: 150, sp: 40},
		weightkg: 340.0,
		abilities: {0: 'Impenetrable'},
		innates: ['Multi-Headed', 'Levitate', 'Solid Rock']
	},
	Dusknoir: {
		types: ['Ghost'],
		bs: {hp: 45, at: 120, df: 135, sa: 60, sd: 135, sp: 45},
		weightkg: 106.6,
		abilities: {0: 'Twist. Dimension'},
		innates: ['Opportunist', 'Shadow Shield', 'Soul Eater']
	},
	Froslass: {
		types: ['Ice', 'Ghost'],
		bs: {hp: 70, at: 70, df: 70, sa: 110, sd: 70, sp: 110},
		weightkg: 26.6,
		abilities: {0: 'Chilling Presence'},
		innates: ['Cryomancy', 'Bad Luck', 'Glacial Ghost']
	},
	Rotom: {
		types: ['Electric', 'Ghost'],
		bs: {hp: 50, at: 88, df: 79, sa: 88, sd: 79, sp: 146},
		weightkg: 0.3,
		abilities: {0: 'Suppress'},
		innates: ['Levitate', 'Speed Boost', 'Transistor']
	},
	Uxie: {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 75, at: 75, df: 130, sa: 75, sd: 130, sp: 95},
		weightkg: 0.3,
		abilities: {0: 'Enlightened'},
		innates: ['Levitate', 'Magic Guard', 'North Wind']
	},
	Mesprit: {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 80, at: 105, df: 105, sa: 105, sd: 105, sp: 80},
		weightkg: 0.3,
		abilities: {0: 'Moody'},
		innates: ['Levitate', 'Magic Guard', 'Pressure']
	},
	Azelf: {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 75, at: 125, df: 70, sa: 125, sd: 70, sp: 115},
		weightkg: 0.3,
		abilities: {0: 'Determination'},
		innates: ['Levitate', 'Magic Guard', 'Mystic Power']
	},
	Dialga: {
		types: ['Steel', 'Dragon'],
		bs: {hp: 100, at: 120, df: 120, sa: 150, sd: 100, sp: 90},
		weightkg: 683.0,
		abilities: {0: 'Temporal Rupture'},
		innates: ['Primal Armor', 'Impenetrable', 'Power Core']
	},
	Palkia: {
		types: ['Water', 'Dragon'],
		bs: {hp: 90, at: 120, df: 100, sa: 150, sd: 100, sp: 120},
		weightkg: 336.0,
		abilities: {0: 'Heaven Asunder'},
		innates: ['Primal Armor', 'Overwhelm', 'Power Core']
	},
	Heatran: {
		types: ['Fire', 'Steel'],
		bs: {hp: 91, at: 90, df: 106, sa: 130, sd: 106, sp: 77},
		weightkg: 430.0,
		abilities: {0: 'Steelworker'},
		innates: ['Magma Armor', 'Mountaineer', 'Flash Fire']
	},
	Regigigas: {
		types: ['Normal'],
		bs: {hp: 140, at: 160, df: 120, sa: 70, sd: 120, sp: 60},
		weightkg: 420.0,
		abilities: {0: 'Adaptability'},
		innates: ['Power Core', 'Impenetrable', 'Juggernaut']
	},
	Giratina: {
		types: ['Ghost', 'Dragon'],
		bs: {hp: 150, at: 100, df: 120, sa: 100, sd: 120, sp: 90},
		weightkg: 750.0,
		abilities: {0: 'Fearmonger'},
		innates: ['Shadow Shield', 'Shadow Tag', 'Soul Eater']
	},
	Cresselia: {
		types: ['Psychic'],
		bs: {hp: 120, at: 70, df: 120, sa: 75, sd: 130, sp: 85},
		weightkg: 85.6,
		abilities: {0: 'Mystic Power'},
		innates: ['Levitate', 'Moon Spirit', 'Self Sufficient']
	},
	Phione: {
		types: ['Water'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 3.1,
		abilities: {0: 'Sea Guardian'},
		innates: ['Purifying Waters', 'Field Explorer', 'High Tide']
	},
	Manaphy: {
		types: ['Water'],
		bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
		weightkg: 1.4,
		abilities: {0: 'Seaborne'},
		innates: ['Change of Heart', 'Parental Bond', 'High Tide']
	},
	Darkrai: {
		types: ['Dark'],
		bs: {hp: 70, at: 90, df: 90, sa: 135, sd: 90, sp: 125},
		weightkg: 50.5,
		abilities: {0: 'Soul Eater'},
		innates: ['Levitate', 'Bad Dreams', 'Dreamcatcher']
	},
	Shaymin: {
		types: ['Grass'],
		bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
		weightkg: 2.1,
		abilities: {0: 'Magic Bounce'},
		innates: ['Natural Recovery', 'Poison Absorb', 'Grassy Surge']
	},
	Arceus: {
		types: ['Normal'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Mystic Power']
	},
	Victini: {
		types: ['Psychic', 'Fire'],
		bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
		weightkg: 4.0,
		abilities: {0: 'Turboblaze'},
		innates: ['Victory Star', 'Magic Guard', 'Psychic Mind']
	},
	Snivy: {
		types: ['Grass'],
		bs: {hp: 47, at: 45, df: 60, sa: 45, sd: 60, sp: 63},
		weightkg: 8.1,
		abilities: {0: 'Chloroplast'},
		innates: ['Overgrow', 'Shed Skin', 'Opportunist']
	},
	Servine: {
		types: ['Grass'],
		bs: {hp: 67, at: 60, df: 75, sa: 60, sd: 75, sp: 83},
		weightkg: 16.0,
		abilities: {0: 'Chloroplast'},
		innates: ['Overgrow', 'Shed Skin', 'Opportunist']
	},
	Serperior: {
		types: ['Grass'],
		bs: {hp: 83, at: 74, df: 95, sa: 75, sd: 95, sp: 113},
		weightkg: 63.0,
		abilities: {0: 'Intimidate'},
		innates: ['Overgrow', 'Shed Skin', 'Chloroplast']
	},
	Tepig: {
		types: ['Fire'],
		bs: {hp: 71, at: 69, df: 45, sa: 45, sd: 45, sp: 45},
		weightkg: 9.9,
		abilities: {0: 'Let\'s Roll'},
		innates: ['Blaze', 'Thick Fat', 'Gluttony']
	},
	Pignite: {
		types: ['Fire', 'Fighting'],
		bs: {hp: 92, at: 93, df: 55, sa: 70, sd: 55, sp: 55},
		weightkg: 55.5,
		abilities: {0: 'Let\'s Roll'},
		innates: ['Blaze', 'Thick Fat', 'Gluttony']
	},
	Emboar: {
		types: ['Fire', 'Fighting'],
		bs: {hp: 110, at: 123, df: 87, sa: 70, sd: 80, sp: 65},
		weightkg: 150.0,
		abilities: {0: 'Gluttony'},
		innates: ['Blaze', 'Reckless', 'Limber']
	},
	Oshawott: {
		types: ['Water'],
		bs: {hp: 59, at: 63, df: 45, sa: 63, sd: 45, sp: 45},
		weightkg: 5.9,
		abilities: {0: 'Swift Swim'},
		innates: ['Torrent', 'Shell Armor', 'Keen Edge']
	},
	Dewott: {
		types: ['Water', 'Fighting'],
		bs: {hp: 75, at: 82, df: 60, sa: 83, sd: 60, sp: 60},
		weightkg: 24.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Torrent', 'Shell Armor', 'Keen Edge']
	},
	Samurott: {
		types: ['Water', 'Fighting'],
		bs: {hp: 95, at: 108, df: 85, sa: 107, sd: 70, sp: 70},
		weightkg: 94.6,
		abilities: {0: 'Mystic Blades'},
		innates: ['Torrent', 'Shell Armor', 'Cutthroat']
	},
	Patrat: {
		types: ['Normal'],
		bs: {hp: 45, at: 65, df: 39, sa: 35, sd: 39, sp: 72},
		weightkg: 11.6,
		abilities: {0: 'Run Away'},
		innates: ['Analytic', 'Keen Eye', 'Anticipation']
	},
	Watchog: {
		types: ['Normal'],
		bs: {hp: 75, at: 85, df: 69, sa: 60, sd: 69, sp: 77},
		weightkg: 27.0,
		abilities: {0: 'Stakeout'},
		innates: ['Analytic', 'Tinted Lens', 'Field Explorer']
	},
	Lillipup: {
		types: ['Normal'],
		bs: {hp: 45, at: 70, df: 45, sa: 25, sd: 45, sp: 65},
		weightkg: 4.1,
		abilities: {0: 'Vital Spirit'},
		innates: ['Fluffy', 'Overcoat', 'Guard Dog']
	},
	Herdier: {
		types: ['Normal'],
		bs: {hp: 65, at: 90, df: 65, sa: 35, sd: 65, sp: 70},
		weightkg: 14.7,
		abilities: {0: 'Intimidate'},
		innates: ['Overcoat', 'Fur Coat', 'Filter']
	},
	Stoutland: {
		types: ['Normal'],
		bs: {hp: 85, at: 120, df: 80, sa: 45, sd: 90, sp: 90},
		weightkg: 61.0,
		abilities: {0: 'Intimidate'},
		innates: ['Overcoat', 'Fur Coat', 'Filter']
	},
	Purrloin: {
		types: ['Dark'],
		bs: {hp: 41, at: 75, df: 37, sa: 50, sd: 37, sp: 71},
		weightkg: 10.1,
		abilities: {0: 'Unburden'},
		innates: ['Prankster', 'Limber', 'Ambush']
	},
	Liepard: {
		types: ['Dark'],
		bs: {hp: 64, at: 118, df: 50, sa: 78, sd: 50, sp: 106},
		weightkg: 37.5,
		abilities: {0: 'On the Prowl'},
		innates: ['Super Luck', 'Sniper', 'Opportunist']
	},
	Pansage: {
		types: ['Grass'],
		bs: {hp: 50, at: 57, df: 48, sa: 57, sd: 48, sp: 62},
		weightkg: 10.5,
		abilities: {0: 'Hustle'},
		innates: ['Overgrow', 'Sap Sipper', 'Chloroplast']
	},
	Simisage: {
		types: ['Grass'],
		bs: {hp: 75, at: 105, df: 65, sa: 105, sd: 65, sp: 105},
		weightkg: 30.5,
		abilities: {0: 'Hustle'},
		innates: ['Overgrow', 'Sap Sipper', 'Chloroplast']
	},
	Pansear: {
		types: ['Fire'],
		bs: {hp: 50, at: 74, df: 48, sa: 43, sd: 43, sp: 64},
		weightkg: 11.0,
		abilities: {0: 'Gluttony'},
		innates: ['Blaze', 'Prankster', 'Flash Fire']
	},
	Simisear: {
		types: ['Fire'],
		bs: {hp: 75, at: 113, df: 81, sa: 80, sd: 70, sp: 101},
		weightkg: 28.0,
		abilities: {0: 'Gluttony'},
		innates: ['Blaze', 'Prankster', 'Flash Fire']
	},
	Panpour: {
		types: ['Water'],
		bs: {hp: 71, at: 43, df: 43, sa: 53, sd: 48, sp: 64},
		weightkg: 13.5,
		abilities: {0: 'Prankster'},
		innates: ['Torrent', 'Storm Drain', 'Healer']
	},
	Simipour: {
		types: ['Water'],
		bs: {hp: 110, at: 72, df: 70, sa: 93, sd: 74, sp: 101},
		weightkg: 29.0,
		abilities: {0: 'Prankster'},
		innates: ['Torrent', 'Storm Drain', 'Healer']
	},
	Munna: {
		types: ['Psychic'],
		bs: {hp: 76, at: 25, df: 45, sa: 77, sd: 55, sp: 24},
		weightkg: 23.3,
		abilities: {0: 'Dreamcatcher'},
		innates: ['Levitate', 'Sweet Dreams', 'Hypnotist']
	},
	Musharna: {
		types: ['Psychic'],
		bs: {hp: 116, at: 55, df: 85, sa: 117, sd: 95, sp: 29},
		weightkg: 60.5,
		abilities: {0: 'Neutralizing Gas'},
		innates: ['Levitate', 'Wonder Skin', 'Dreamscape']
	},
	Pidove: {
		types: ['Normal', 'Flying'],
		bs: {hp: 70, at: 55, df: 50, sa: 36, sd: 30, sp: 43},
		weightkg: 2.1,
		abilities: {0: 'Super Luck'},
		innates: ['Keen Eye', 'Big Pecks', 'Cute Charm']
	},
	Tranquill: {
		types: ['Normal', 'Flying'],
		bs: {hp: 82, at: 77, df: 62, sa: 50, sd: 42, sp: 65},
		weightkg: 15.0,
		abilities: {0: 'Super Luck'},
		innates: ['Keen Eye', 'Big Pecks', 'Stamina']
	},
	Unfezant: {
		types: ['Normal', 'Flying'],
		bs: {hp: 100, at: 115, df: 80, sa: 65, sd: 55, sp: 93},
		weightkg: 29.0,
		abilities: {0: 'Accelerate'},
		innates: ['Pretentious', 'Super Luck', 'Speed Force']
	},
	Blitzle: {
		types: ['Electric'],
		bs: {hp: 55, at: 70, df: 32, sa: 50, sd: 32, sp: 76},
		weightkg: 29.8,
		abilities: {0: 'Terminal Velocity'},
		innates: ['Run Away', 'Adrenaline Rush', 'Motor Drive']
	},
	Zebstrika: {
		types: ['Electric'],
		bs: {hp: 85, at: 110, df: 63, sa: 80, sd: 63, sp: 116},
		weightkg: 79.5,
		abilities: {0: 'Adrenaline Rush'},
		innates: ['Reckless', 'Speed Force', 'Motor Drive']
	},
	Roggenrola: {
		types: ['Rock'],
		bs: {hp: 55, at: 25, df: 85, sa: 75, sd: 25, sp: 15},
		weightkg: 18.0,
		abilities: {0: 'Sturdy'},
		innates: ['Power Core', 'Impenetrable', 'Loose Rocks']
	},
	Boldore: {
		types: ['Rock'],
		bs: {hp: 70, at: 50, df: 105, sa: 105, sd: 40, sp: 20},
		weightkg: 102.0,
		abilities: {0: 'Sturdy'},
		innates: ['Power Core', 'Impenetrable', 'Loose Rocks']
	},
	Gigalith: {
		types: ['Rock'],
		bs: {hp: 85, at: 60, df: 130, sa: 135, sd: 80, sp: 25},
		weightkg: 260.0,
		abilities: {0: 'Loose Rocks'},
		innates: ['Power Core', 'Sturdy', 'Sand Force']
	},
	Woobat: {
		types: ['Psychic', 'Flying'],
		bs: {hp: 65, at: 45, df: 43, sa: 75, sd: 43, sp: 72},
		weightkg: 2.1,
		abilities: {0: 'Emanate'},
		innates: ['Unaware', 'Aerodynamics', 'Soundproof']
	},
	Swoobat: {
		types: ['Psychic', 'Flying'],
		bs: {hp: 67, at: 57, df: 55, sa: 97, sd: 55, sp: 114},
		weightkg: 10.5,
		abilities: {0: 'Echolocation'},
		innates: ['Emanate', 'Aerodynamics', 'Loud Bang']
	},
	Drilbur: {
		types: ['Ground'],
		bs: {hp: 60, at: 85, df: 40, sa: 30, sd: 45, sp: 68},
		weightkg: 8.5,
		abilities: {0: 'Mold Breaker'},
		innates: ['Sand Rush', 'Sand Force', 'Earthbound']
	},
	Excadrill: {
		types: ['Ground', 'Steel'],
		bs: {hp: 110, at: 135, df: 60, sa: 50, sd: 65, sp: 88},
		weightkg: 40.4,
		abilities: {0: 'Mold Breaker'},
		innates: ['Sand Rush', 'Steelworker', 'Earthbound']
	},
	Audino: {
		types: ['Normal'],
		bs: {hp: 103, at: 60, df: 96, sa: 80, sd: 96, sp: 50},
		weightkg: 31.0,
		abilities: {0: 'Emergency Exit'},
		innates: ['Tender Affection', 'Regenerator', 'Triage']
	},
	Timburr: {
		types: ['Fighting'],
		bs: {hp: 75, at: 80, df: 55, sa: 25, sd: 35, sp: 35},
		weightkg: 12.5,
		abilities: {0: 'Sheer Force'},
		innates: ['Long Reach', 'Fertilize', 'Vital Spirit']
	},
	Gurdurr: {
		types: ['Fighting'],
		bs: {hp: 85, at: 105, df: 85, sa: 40, sd: 50, sp: 40},
		weightkg: 40.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Long Reach', 'Steelworker', 'Impenetrable']
	},
	Conkeldurr: {
		types: ['Fighting'],
		bs: {hp: 105, at: 140, df: 95, sa: 55, sd: 65, sp: 45},
		weightkg: 87.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Long Reach', 'Mineralize', 'Juggernaut']
	},
	Tympole: {
		types: ['Water'],
		bs: {hp: 50, at: 70, df: 40, sa: 70, sd: 40, sp: 64},
		weightkg: 4.5,
		abilities: {0: 'Hydration'},
		innates: ['Water Absorb', 'Damp', 'Guilt Trip']
	},
	Palpitoad: {
		types: ['Water', 'Ground'],
		bs: {hp: 75, at: 85, df: 55, sa: 85, sd: 55, sp: 69},
		weightkg: 17.0,
		abilities: {0: 'Damp'},
		innates: ['Water Absorb', 'Resonance', 'Loud Bang']
	},
	Seismitoad: {
		types: ['Water', 'Ground'],
		bs: {hp: 105, at: 105, df: 75, sa: 105, sd: 75, sp: 74},
		weightkg: 62.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Water Absorb', 'Poison Touch', 'Aftershock']
	},
	Throh: {
		types: ['Fighting'],
		bs: {hp: 120, at: 100, df: 85, sa: 30, sd: 85, sp: 45},
		weightkg: 55.5,
		abilities: {0: 'Guts'},
		innates: ['Juggernaut', 'Analytic', 'Chuckster']
	},
	Sawk: {
		types: ['Fighting'],
		bs: {hp: 75, at: 125, df: 75, sa: 30, sd: 75, sp: 85},
		weightkg: 51.0,
		abilities: {0: 'Sturdy'},
		innates: ['Fighter', 'Iron Fist', 'Fatal Precision']
	},
	Sewaddle: {
		types: ['Bug', 'Grass'],
		bs: {hp: 45, at: 53, df: 70, sa: 40, sd: 60, sp: 42},
		weightkg: 2.5,
		abilities: {0: 'Web Spinner'},
		innates: ['Swarm', 'Chloroplast', 'Overcoat']
	},
	Swadloon: {
		types: ['Bug', 'Grass'],
		bs: {hp: 55, at: 63, df: 90, sa: 50, sd: 80, sp: 42},
		weightkg: 7.3,
		abilities: {0: 'Flourish'},
		innates: ['Grassy Surge', 'Chloroplast', 'Overcoat']
	},
	Leavanny: {
		types: ['Bug', 'Grass'],
		bs: {hp: 75, at: 110, df: 80, sa: 55, sd: 80, sp: 110},
		weightkg: 20.5,
		abilities: {0: 'Friend Guard'},
		innates: ['Keen Edge', 'Super Luck', 'Overcoat']
	},
	Venipede: {
		types: ['Bug', 'Poison'],
		bs: {hp: 30, at: 45, df: 59, sa: 30, sd: 39, sp: 57},
		weightkg: 5.3,
		abilities: {0: 'Unnerve'},
		innates: ['Poison Point', 'Shed Skin', 'Hyper Aggressive']
	},
	Whirlipede: {
		types: ['Bug', 'Poison'],
		bs: {hp: 65, at: 55, df: 99, sa: 55, sd: 89, sp: 57},
		weightkg: 58.5,
		abilities: {0: 'Grip Pincer'},
		innates: ['Curlipede', 'Neurotoxin', 'Shell Armor']
	},
	Scolipede: {
		types: ['Bug', 'Poison'],
		bs: {hp: 90, at: 100, df: 96, sa: 55, sd: 69, sp: 115},
		weightkg: 200.5,
		abilities: {0: 'Grip Pincer'},
		innates: ['Hemotoxin', 'Poison Point', 'Hyper Aggressive']
	},
	Cottonee: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 40, at: 27, df: 60, sa: 37, sd: 50, sp: 66},
		weightkg: 0.6,
		abilities: {0: 'Prankster'},
		innates: ['Infiltrator', 'Cotton Down', 'Fluffy']
	},
	Whimsicott: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 80, at: 57, df: 85, sa: 77, sd: 85, sp: 116},
		weightkg: 6.6,
		abilities: {0: 'Prankster'},
		innates: ['Infiltrator', 'Cotton Down', 'Fluffy']
	},
	Petilil: {
		types: ['Grass'],
		bs: {hp: 45, at: 35, df: 50, sa: 70, sd: 50, sp: 30},
		weightkg: 6.6,
		abilities: {0: 'Hospitality'},
		innates: ['Natural Cure', 'Chlorophyll', 'Overgrow']
	},
	Lilligant: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 80, at: 60, df: 80, sa: 110, sd: 80, sp: 90},
		weightkg: 16.3,
		abilities: {0: 'Solar Power'},
		innates: ['Chlorophyll', 'Natural Cure', 'Overgrow']
	},
	Basculin: {
		types: ['Water'],
		bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 118},
		weightkg: 18.0,
		abilities: {0: 'Mold Breaker'},
		innates: ['Torrent', 'Adaptability', 'Hyper Aggressive']
	},
	Sandile: {
		types: ['Ground', 'Dark'],
		bs: {hp: 50, at: 72, df: 35, sa: 35, sd: 35, sp: 65},
		weightkg: 15.2,
		abilities: {0: 'Intimidate'},
		innates: ['Sand Rush', 'Scavenger', 'Strong Jaw']
	},
	Krokorok: {
		types: ['Ground', 'Dark'],
		bs: {hp: 60, at: 82, df: 45, sa: 45, sd: 45, sp: 74},
		weightkg: 33.4,
		abilities: {0: 'Intimidate'},
		innates: ['Sand Rush', 'Scavenger', 'Strong Jaw']
	},
	Krookodile: {
		types: ['Ground', 'Dark'],
		bs: {hp: 95, at: 117, df: 80, sa: 65, sd: 70, sp: 92},
		weightkg: 96.3,
		abilities: {0: 'Intimidate'},
		innates: ['Hyper Aggressive', 'Predator', 'Strong Jaw']
	},
	Darumaka: {
		types: ['Fire'],
		bs: {hp: 70, at: 90, df: 45, sa: 15, sd: 45, sp: 50},
		weightkg: 37.5,
		abilities: {0: 'Hustle'},
		innates: ['Flame Body', 'Super Luck', 'Turboblaze']
	},
	Darmanitan: {
		types: ['Fire'],
		bs: {hp: 105, at: 140, df: 65, sa: 50, sd: 65, sp: 95},
		weightkg: 92.9,
		abilities: {0: 'Gorilla Tactics'},
		innates: ['Flame Body', 'Iron Fist', 'Turboblaze']
	},
	Maractus: {
		types: ['Grass'],
		bs: {hp: 75, at: 86, df: 67, sa: 106, sd: 67, sp: 60},
		weightkg: 28.0,
		abilities: {0: 'Water Absorb'},
		innates: ['Rough Skin', 'Chlorophyll', 'Overcoat']
	},
	Dwebble: {
		types: ['Bug', 'Rock'],
		bs: {hp: 50, at: 75, df: 95, sa: 35, sd: 35, sp: 55},
		weightkg: 14.5,
		abilities: {0: 'Sturdy'},
		innates: ['Rockhard Will', 'Shell Armor', 'Grip Pincer']
	},
	Crustle: {
		types: ['Bug', 'Rock'],
		bs: {hp: 70, at: 115, df: 135, sa: 65, sd: 75, sp: 45},
		weightkg: 200.0,
		abilities: {0: 'Sturdy'},
		innates: ['Rockhard Will', 'Shell Armor', 'Grip Pincer']
	},
	Scraggy: {
		types: ['Dark', 'Fighting'],
		bs: {hp: 50, at: 75, df: 70, sa: 35, sd: 70, sp: 48},
		weightkg: 11.8,
		abilities: {0: 'Rivalry'},
		innates: ['Shed Skin', 'Rock Head', 'Reckless']
	},
	Scrafty: {
		types: ['Dark', 'Fighting'],
		bs: {hp: 65, at: 90, df: 115, sa: 45, sd: 115, sp: 58},
		weightkg: 30.0,
		abilities: {0: 'Striker'},
		innates: ['Shed Skin', 'Rock Head', 'Reckless']
	},
	Sigilyph: {
		types: ['Psychic', 'Flying'],
		bs: {hp: 72, at: 58, df: 90, sa: 108, sd: 90, sp: 102},
		weightkg: 14.0,
		abilities: {0: 'Low Visibility'},
		innates: ['Flock', 'Tinted Lens', 'Wonder Skin']
	},
	Yamask: {
		types: ['Ghost'],
		bs: {hp: 38, at: 30, df: 85, sa: 55, sd: 65, sp: 30},
		weightkg: 1.5,
		abilities: {0: 'Mummy'},
		innates: ['Vengeance', 'Cursed Body', 'Rest in Peace']
	},
	Cofagrigus: {
		types: ['Ghost', 'Steel'],
		bs: {hp: 75, at: 50, df: 145, sa: 78, sd: 105, sp: 30},
		weightkg: 76.5,
		abilities: {0: 'Mummy'},
		innates: ['Clear Body', 'Steelworker', 'Cursed Body']
	},
	Tirtouga: {
		types: ['Water', 'Rock'],
		bs: {hp: 54, at: 93, df: 103, sa: 53, sd: 45, sp: 22},
		weightkg: 16.5,
		abilities: {0: 'Opportunist'},
		innates: ['Fossilized', 'Shell Armor', 'Solid Rock']
	},
	Carracosta: {
		types: ['Water', 'Rock'],
		bs: {hp: 74, at: 128, df: 133, sa: 83, sd: 65, sp: 32},
		weightkg: 81.0,
		abilities: {0: 'Fort Knox'},
		innates: ['Shell Armor', 'Solid Rock', 'Predator']
	},
	Archen: {
		types: ['Rock', 'Flying'],
		bs: {hp: 55, at: 112, df: 45, sa: 74, sd: 45, sp: 70},
		weightkg: 9.5,
		abilities: {0: 'Opportunist'},
		innates: ['Defeatist', 'Grounded', 'Fossilized']
	},
	Archeops: {
		types: ['Rock', 'Flying'],
		bs: {hp: 75, at: 140, df: 65, sa: 112, sd: 65, sp: 110},
		weightkg: 32.0,
		abilities: {0: 'Opportunist'},
		innates: ['Defeatist', 'Fossilized', 'Rock Head']
	},
	Trubbish: {
		types: ['Poison'],
		bs: {hp: 50, at: 50, df: 77, sa: 40, sd: 62, sp: 65},
		weightkg: 31.0,
		abilities: {0: 'Poison Touch'},
		innates: ['Stench', 'Aftermath', 'Poison Absorb']
	},
	Garbodor: {
		types: ['Poison', 'Steel'],
		bs: {hp: 80, at: 95, df: 102, sa: 60, sd: 82, sp: 75},
		weightkg: 107.3,
		abilities: {0: 'Poison Touch'},
		innates: ['Stench', 'Scavenger', 'Toxic Spill']
	},
	Zorua: {
		types: ['Dark'],
		bs: {hp: 40, at: 80, df: 40, sa: 65, sd: 40, sp: 65},
		weightkg: 12.5,
		abilities: {0: 'Ill Will'},
		innates: ['Illusion', 'Exploit Weakness', 'Ambush']
	},
	Zoroark: {
		types: ['Dark'],
		bs: {hp: 60, at: 120, df: 60, sa: 105, sd: 60, sp: 105},
		weightkg: 81.1,
		abilities: {0: 'Ill Will'},
		innates: ['Illusion', 'Exploit Weakness', 'Ambush']
	},
	Minccino: {
		types: ['Normal'],
		bs: {hp: 55, at: 50, df: 40, sa: 40, sd: 40, sp: 75},
		weightkg: 5.8,
		abilities: {0: 'Perfectionist'},
		innates: ['Technician', 'Cute Charm', 'Limber']
	},
	Cinccino: {
		types: ['Normal'],
		bs: {hp: 75, at: 95, df: 60, sa: 65, sd: 60, sp: 115},
		weightkg: 7.5,
		abilities: {0: 'Perfectionist'},
		innates: ['Technician', 'Cute Charm', 'Overcoat']
	},
	Gothita: {
		types: ['Psychic'],
		bs: {hp: 50, at: 30, df: 50, sa: 65, sd: 70, sp: 45},
		weightkg: 5.8,
		abilities: {0: 'Frisk'},
		innates: ['Nocturnal', 'Psychic Mind', 'Magic Bounce']
	},
	Gothorita: {
		types: ['Psychic'],
		bs: {hp: 65, at: 45, df: 70, sa: 85, sd: 90, sp: 55},
		weightkg: 18.0,
		abilities: {0: 'Frisk'},
		innates: ['Nocturnal', 'Psychic Mind', 'Magic Bounce']
	},
	Gothitelle: {
		types: ['Psychic'],
		bs: {hp: 80, at: 55, df: 95, sa: 115, sd: 130, sp: 65},
		weightkg: 44.0,
		abilities: {0: 'Frisk'},
		innates: ['Nocturnal', 'Psychic Mind', 'Magic Bounce']
	},
	Solosis: {
		types: ['Psychic'],
		bs: {hp: 45, at: 30, df: 40, sa: 105, sd: 50, sp: 20},
		weightkg: 1.0,
		abilities: {0: 'Overcoat'},
		innates: ['Regenerator', 'Liquified', 'Magic Guard']
	},
	Duosion: {
		types: ['Psychic'],
		bs: {hp: 65, at: 40, df: 50, sa: 125, sd: 60, sp: 30},
		weightkg: 8.0,
		abilities: {0: 'Overcoat'},
		innates: ['Regenerator', 'Liquified', 'Magic Guard']
	},
	Reuniclus: {
		types: ['Psychic'],
		bs: {hp: 110, at: 115, df: 75, sa: 125, sd: 85, sp: 30},
		weightkg: 20.1,
		abilities: {0: 'Overcoat'},
		innates: ['Regenerator', 'Liquified', 'Magic Guard']
	},
	Ducklett: {
		types: ['Water', 'Flying'],
		bs: {hp: 62, at: 64, df: 50, sa: 64, sd: 50, sp: 65},
		weightkg: 5.5,
		abilities: {0: 'Damp'},
		innates: ['Flock', 'Keen Eye', 'Big Pecks']
	},
	Swanna: {
		types: ['Water', 'Flying'],
		bs: {hp: 90, at: 97, df: 75, sa: 75, sd: 103, sp: 87},
		weightkg: 24.2,
		abilities: {0: 'Dancer'},
		innates: ['Flock', 'Keen Eye', 'Majestic Bird']
	},
	Vanillite: {
		types: ['Ice'],
		bs: {hp: 36, at: 50, df: 50, sa: 65, sd: 60, sp: 60},
		weightkg: 5.7,
		abilities: {0: 'Refrigerate'},
		innates: ['Permafrost', 'Ice Body', 'Slush Rush']
	},
	Vanillish: {
		types: ['Ice'],
		bs: {hp: 51, at: 65, df: 65, sa: 80, sd: 75, sp: 75},
		weightkg: 41.0,
		abilities: {0: 'Refrigerate'},
		innates: ['Permafrost', 'Ice Body', 'Slush Rush']
	},
	Vanilluxe: {
		types: ['Ice'],
		bs: {hp: 71, at: 95, df: 85, sa: 110, sd: 95, sp: 95},
		weightkg: 57.5,
		abilities: {0: 'Snow Cloak'},
		innates: ['Multi-Headed', 'Ice Body', 'Slush Rush']
	},
	Deerling: {
		types: ['Normal', 'Grass'],
		bs: {hp: 60, at: 60, df: 50, sa: 40, sd: 50, sp: 75},
		weightkg: 19.5,
		abilities: {0: 'Chlorophyll'},
		innates: ['Overgrow', 'Violent Rush', 'Sap Sipper']
	},
	Sawsbuck: {
		types: ['Normal', 'Grass'],
		bs: {hp: 80, at: 100, df: 70, sa: 60, sd: 70, sp: 95},
		weightkg: 92.5,
		abilities: {0: 'Adaptability'},
		innates: ['Mighty Horn', 'Violent Rush', 'Elude']
	},
	Emolga: {
		types: ['Electric', 'Flying'],
		bs: {hp: 65, at: 40, df: 60, sa: 110, sd: 75, sp: 125},
		weightkg: 5.0,
		abilities: {0: 'Generator'},
		innates: ['Static', 'Motor Drive', 'Aerodynamics']
	},
	Karrablast: {
		types: ['Bug'],
		bs: {hp: 50, at: 75, df: 45, sa: 40, sd: 45, sp: 60},
		weightkg: 5.9,
		abilities: {0: 'No Guard'},
		innates: ['Swarm', 'Shed Skin', 'Sticky Hold']
	},
	Escavalier: {
		types: ['Bug', 'Steel'],
		bs: {hp: 70, at: 135, df: 105, sa: 60, sd: 105, sp: 60},
		weightkg: 33.0,
		abilities: {0: 'No Guard'},
		innates: ['Swarm', 'Shell Armor', 'Speed Boost']
	},
	Foongus: {
		types: ['Grass', 'Poison'],
		bs: {hp: 69, at: 60, df: 60, sa: 60, sd: 70, sp: 15},
		weightkg: 1.0,
		abilities: {0: 'Infiltrator'},
		innates: ['Regenerator', 'Effect Spore', 'Dry Skin']
	},
	Amoonguss: {
		types: ['Grass', 'Poison'],
		bs: {hp: 114, at: 85, df: 85, sa: 85, sd: 95, sp: 30},
		weightkg: 10.5,
		abilities: {0: 'Rain Dish'},
		innates: ['Regenerator', 'Effect Spore', 'Dry Skin']
	},
	Frillish: {
		types: ['Water', 'Ghost'],
		bs: {hp: 75, at: 40, df: 50, sa: 65, sd: 85, sp: 40},
		weightkg: 33.0,
		abilities: {0: 'Low Visibility'},
		innates: ['Water Absorb', 'Cursed Body', 'Poison Touch']
	},
	Jellicent: {
		types: ['Water', 'Ghost'],
		bs: {hp: 120, at: 60, df: 70, sa: 85, sd: 105, sp: 60},
		weightkg: 135.0,
		abilities: {0: 'Low Visibility'},
		innates: ['Water Bubble', 'Soul Eater', 'Poison Touch']
	},
	Alomomola: {
		types: ['Water'],
		bs: {hp: 165, at: 75, df: 80, sa: 60, sd: 45, sp: 65},
		weightkg: 31.6,
		abilities: {0: 'Healer'},
		innates: ['Wonder Skin', 'Regenerator', 'Self Sufficient']
	},
	Joltik: {
		types: ['Bug', 'Electric'],
		bs: {hp: 50, at: 47, df: 50, sa: 64, sd: 50, sp: 65},
		weightkg: 0.6,
		abilities: {0: 'Predator'},
		innates: ['Opportunist', 'Swarm', 'Compound Eyes']
	},
	Galvantula: {
		types: ['Bug', 'Electric'],
		bs: {hp: 70, at: 77, df: 60, sa: 107, sd: 60, sp: 108},
		weightkg: 14.3,
		abilities: {0: 'Short Circuit'},
		innates: ['Merciless', 'Technician', 'Compound Eyes']
	},
	Ferroseed: {
		types: ['Grass', 'Steel'],
		bs: {hp: 44, at: 50, df: 91, sa: 24, sd: 86, sp: 10},
		weightkg: 18.8,
		abilities: {0: 'Impenetrable'},
		innates: ['Iron Barbs', 'Let\'s Roll', 'Battle Armor']
	},
	Ferrothorn: {
		types: ['Grass', 'Steel'],
		bs: {hp: 74, at: 94, df: 131, sa: 54, sd: 116, sp: 20},
		weightkg: 110.0,
		abilities: {0: 'Impenetrable'},
		innates: ['Iron Barbs', 'Let\'s Roll', 'Battle Armor']
	},
	Klink: {
		types: ['Steel'],
		bs: {hp: 40, at: 55, df: 70, sa: 55, sd: 60, sp: 50},
		weightkg: 21.0,
		abilities: {0: 'Steelworker'},
		innates: ['Multi-Headed', 'Sturdy', 'Full Metal Body']
	},
	Klang: {
		types: ['Steel'],
		bs: {hp: 60, at: 80, df: 95, sa: 80, sd: 85, sp: 70},
		weightkg: 51.0,
		abilities: {0: 'Steelworker'},
		innates: ['Multi-Headed', 'Sturdy', 'Full Metal Body']
	},
	Klinklang: {
		types: ['Steel'],
		bs: {hp: 60, at: 100, df: 115, sa: 100, sd: 85, sp: 90},
		weightkg: 81.0,
		abilities: {0: 'Technician'},
		innates: ['Multi-Headed', 'Sturdy', 'Steelworker']
	},
	Tynamo: {
		types: ['Electric'],
		bs: {hp: 35, at: 65, df: 50, sa: 55, sd: 50, sp: 60},
		weightkg: 0.3,
		abilities: {0: 'Volt Absorb'},
		innates: ['Levitate', 'Generator', 'Water Veil']
	},
	Eelektrik: {
		types: ['Electric'],
		bs: {hp: 65, at: 85, df: 70, sa: 75, sd: 70, sp: 40},
		weightkg: 22.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Levitate', 'Shocking Jaws', 'Coil Up']
	},
	Eelektross: {
		types: ['Electric'],
		bs: {hp: 85, at: 115, df: 90, sa: 105, sd: 90, sp: 50},
		weightkg: 80.5,
		abilities: {0: 'Artillery'},
		innates: ['Levitate', 'Electrocytes', 'Hydrate']
	},
	Elgyem: {
		types: ['Psychic'],
		bs: {hp: 65, at: 55, df: 63, sa: 93, sd: 55, sp: 20},
		weightkg: 9.0,
		abilities: {0: 'Neuroforce'},
		innates: ['Stall', 'Psychic Mind', 'Levitate']
	},
	Beheeyem: {
		types: ['Psychic'],
		bs: {hp: 75, at: 95, df: 105, sa: 141, sd: 105, sp: 30},
		weightkg: 34.5,
		abilities: {0: 'Tinted Lens'},
		innates: ['Calculative', 'Pressure', 'Telekinetic']
	},
	Litwick: {
		types: ['Ghost', 'Fire'],
		bs: {hp: 50, at: 30, df: 55, sa: 75, sd: 55, sp: 40},
		weightkg: 3.1,
		abilities: {0: 'Flame Body'},
		innates: ['Flash Fire', 'Soul Eater', 'Illuminate']
	},
	Lampent: {
		types: ['Ghost', 'Fire'],
		bs: {hp: 60, at: 40, df: 60, sa: 95, sd: 60, sp: 55},
		weightkg: 13.0,
		abilities: {0: 'Flash Fire'},
		innates: ['Levitate', 'Soul Eater', 'Illuminate']
	},
	Chandelure: {
		types: ['Ghost', 'Fire'],
		bs: {hp: 80, at: 55, df: 90, sa: 145, sd: 90, sp: 80},
		weightkg: 34.3,
		abilities: {0: 'Flash Fire'},
		innates: ['Levitate', 'Pyromancy', 'Illuminate']
	},
	Axew: {
		types: ['Dragon'],
		bs: {hp: 46, at: 87, df: 60, sa: 30, sd: 40, sp: 57},
		weightkg: 18.0,
		abilities: {0: 'Overwhelm'},
		innates: ['Intimidate', 'Hyper Cutter', 'Predator']
	},
	Fraxure: {
		types: ['Dragon'],
		bs: {hp: 66, at: 117, df: 70, sa: 40, sd: 50, sp: 67},
		weightkg: 36.0,
		abilities: {0: 'Intimidate'},
		innates: ['Rivalry', 'Hyper Cutter', 'Battle Armor']
	},
	Haxorus: {
		types: ['Dragon'],
		bs: {hp: 76, at: 147, df: 90, sa: 60, sd: 70, sp: 97},
		weightkg: 105.5,
		abilities: {0: 'Discipline'},
		innates: ['Beast Boost', 'Predator', 'Intimidate']
	},
	Cubchoo: {
		types: ['Ice'],
		bs: {hp: 55, at: 80, df: 40, sa: 50, sd: 40, sp: 50},
		weightkg: 8.5,
		abilities: {0: 'Snow Cloak'},
		innates: ['Guts', 'Quick Feet', 'Fur Coat']
	},
	Beartic: {
		types: ['Ice'],
		bs: {hp: 95, at: 130, df: 80, sa: 70, sd: 80, sp: 50},
		weightkg: 260.0,
		abilities: {0: 'Snow Cloak'},
		innates: ['Tough Claws', 'Immunity', 'Mountaineer']
	},
	Cryogonal: {
		types: ['Ice'],
		bs: {hp: 80, at: 50, df: 50, sa: 95, sd: 135, sp: 105},
		weightkg: 148.0,
		abilities: {0: 'North Wind'},
		innates: ['Frozen Soul', 'Ice Body', 'Permafrost']
	},
	Shelmet: {
		types: ['Bug', 'Steel'],
		bs: {hp: 50, at: 50, df: 85, sa: 65, sd: 65, sp: 25},
		weightkg: 7.7,
		abilities: {0: 'Damp'},
		innates: ['Shell Armor', 'Swarm', 'Overcoat']
	},
	Accelgor: {
		types: ['Bug', 'Dark'],
		bs: {hp: 80, at: 105, df: 40, sa: 105, sd: 60, sp: 145},
		weightkg: 25.3,
		abilities: {0: 'Momentum'},
		innates: ['Swarm', 'Perfectionist', 'Protean']
	},
	Stunfisk: {
		types: ['Ground', 'Electric'],
		bs: {hp: 109, at: 66, df: 84, sa: 81, sd: 99, sp: 32},
		weightkg: 11.0,
		abilities: {0: 'Arena Trap'},
		innates: ['Unaware', 'Static', 'Dry Skin']
	},
	Mienfoo: {
		types: ['Fighting'],
		bs: {hp: 45, at: 85, df: 50, sa: 55, sd: 50, sp: 65},
		weightkg: 20.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Inner Focus', 'Reckless', 'Speed Force']
	},
	Mienshao: {
		types: ['Fighting'],
		bs: {hp: 65, at: 125, df: 60, sa: 95, sd: 60, sp: 105},
		weightkg: 35.5,
		abilities: {0: 'Scrappy'},
		innates: ['Combat Specialist', 'Regenerator', 'Cheap Tactics']
	},
	Druddigon: {
		types: ['Dragon'],
		bs: {hp: 97, at: 120, df: 90, sa: 60, sd: 90, sp: 48},
		weightkg: 139.0,
		abilities: {0: 'Impenetrable'},
		innates: ['Tough Claws', 'Solid Rock', 'Mold Breaker']
	},
	Golett: {
		types: ['Ground', 'Ghost'],
		bs: {hp: 59, at: 84, df: 60, sa: 35, sd: 60, sp: 35},
		weightkg: 92.0,
		abilities: {0: 'Power Fists'},
		innates: ['Vengeance', 'Power Core', 'Self Repair']
	},
	Golurk: {
		types: ['Ground', 'Ghost'],
		bs: {hp: 89, at: 134, df: 90, sa: 55, sd: 90, sp: 55},
		weightkg: 330.0,
		abilities: {0: 'Power Fists'},
		innates: ['Power Core', 'Shadow Shield', 'Self Repair']
	},
	Pawniard: {
		types: ['Dark', 'Steel'],
		bs: {hp: 45, at: 85, df: 70, sa: 40, sd: 40, sp: 60},
		weightkg: 10.2,
		abilities: {0: 'Pressure'},
		innates: ['Keen Edge', 'Hyper Cutter', 'Battle Armor']
	},
	Bisharp: {
		types: ['Dark', 'Steel'],
		bs: {hp: 65, at: 125, df: 100, sa: 60, sd: 70, sp: 70},
		weightkg: 70.0,
		abilities: {0: 'Pressure'},
		innates: ['Keen Edge', 'Hyper Cutter', 'Battle Armor']
	},
	Bouffalant: {
		types: ['Normal'],
		bs: {hp: 95, at: 110, df: 105, sa: 60, sd: 105, sp: 55},
		weightkg: 94.6,
		abilities: {0: 'Soundproof'},
		innates: ['Rock Head', 'Anger Point', 'Fur Coat']
	},
	Rufflet: {
		types: ['Normal', 'Flying'],
		bs: {hp: 70, at: 83, df: 50, sa: 37, sd: 50, sp: 60},
		weightkg: 10.5,
		abilities: {0: 'Sheer Force'},
		innates: ['Flock', 'Keen Eye', 'Opportunist']
	},
	Braviary: {
		types: ['Normal', 'Flying'],
		bs: {hp: 100, at: 123, df: 75, sa: 57, sd: 75, sp: 80},
		weightkg: 41.0,
		abilities: {0: 'Justified'},
		innates: ['Flock', 'Defiant', 'Big Pecks']
	},
	Vullaby: {
		types: ['Dark', 'Flying'],
		bs: {hp: 70, at: 55, df: 75, sa: 45, sd: 65, sp: 60},
		weightkg: 9.0,
		abilities: {0: 'Big Pecks'},
		innates: ['Flock', 'Keen Eye', 'Scavenger']
	},
	Mandibuzz: {
		types: ['Dark', 'Flying'],
		bs: {hp: 110, at: 65, df: 105, sa: 55, sd: 95, sp: 80},
		weightkg: 39.5,
		abilities: {0: 'Big Pecks'},
		innates: ['Overcoat', 'Stamina', 'Scavenger']
	},
	Heatmor: {
		types: ['Fire', 'Steel'],
		bs: {hp: 85, at: 97, df: 96, sa: 96, sd: 96, sp: 65},
		weightkg: 58.0,
		abilities: {0: 'Deadly Precision'},
		innates: ['Steelworker', 'Gluttony', 'Fatal Precision']
	},
	Durant: {
		types: ['Bug', 'Steel'],
		bs: {hp: 68, at: 109, df: 112, sa: 48, sd: 78, sp: 109},
		weightkg: 33.0,
		abilities: {0: 'Hustle'},
		innates: ['Swarm', 'Strong Jaw', 'Compound Eyes']
	},
	Deino: {
		types: ['Dark', 'Dragon'],
		bs: {hp: 52, at: 45, df: 50, sa: 65, sd: 50, sp: 38},
		weightkg: 17.3,
		abilities: {0: 'Hustle'},
		innates: ['Hyper Aggressive', 'Predator', 'Scare']
	},
	Zweilous: {
		types: ['Dark', 'Dragon'],
		bs: {hp: 72, at: 65, df: 70, sa: 85, sd: 70, sp: 58},
		weightkg: 50.0,
		abilities: {0: 'Hustle'},
		innates: ['Multi-Headed', 'Gluttony', 'Predator']
	},
	Hydreigon: {
		types: ['Dark', 'Dragon'],
		bs: {hp: 92, at: 105, df: 90, sa: 125, sd: 90, sp: 98},
		weightkg: 160.0,
		abilities: {0: 'Scare'},
		innates: ['Multi-Headed', 'Levitate', 'Predator']
	},
	Larvesta: {
		types: ['Bug', 'Fire'],
		bs: {hp: 55, at: 50, df: 55, sa: 85, sd: 55, sp: 60},
		weightkg: 28.8,
		abilities: {0: 'Powder Burst'},
		innates: ['Swarm', 'Shield Dust', 'Blaze']
	},
	Volcarona: {
		types: ['Bug', 'Fire'],
		bs: {hp: 85, at: 60, df: 65, sa: 135, sd: 105, sp: 100},
		weightkg: 46.0,
		abilities: {0: 'Compound Eyes'},
		innates: ['Swarm', 'Majestic Moth', 'Levitate']
	},
	Cobalion: {
		types: ['Steel', 'Fighting'],
		bs: {hp: 91, at: 90, df: 129, sa: 90, sd: 72, sp: 108},
		weightkg: 250.0,
		abilities: {0: 'Justified'},
		innates: ['Keen Edge', 'Sweeping Edge', 'Mirror Armor']
	},
	Terrakion: {
		types: ['Rock', 'Fighting'],
		bs: {hp: 91, at: 129, df: 90, sa: 72, sd: 90, sp: 108},
		weightkg: 260.0,
		abilities: {0: 'Justified'},
		innates: ['Keen Edge', 'Mold Breaker', 'Solid Rock']
	},
	Virizion: {
		types: ['Grass', 'Fighting'],
		bs: {hp: 91, at: 90, df: 72, sa: 90, sd: 129, sp: 108},
		weightkg: 200.0,
		abilities: {0: 'Justified'},
		innates: ['Mighty Horn', 'Absorbant', 'Keen Edge']
	},
	Tornadus: {
		types: ['Flying'],
		bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
		weightkg: 63.0,
		abilities: {0: 'Airborne'},
		innates: ['Prankster', 'Weather Control', 'Keen Eye']
	},
	Thundurus: {
		types: ['Electric', 'Flying'],
		bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
		weightkg: 61.0,
		abilities: {0: 'Transistor'},
		innates: ['Teravolt', 'Weather Control', 'Volt Absorb']
	},
	Reshiram: {
		types: ['Dragon', 'Fire'],
		bs: {hp: 100, at: 120, df: 100, sa: 150, sd: 120, sp: 90},
		weightkg: 330.0,
		abilities: {0: 'Beast Boost'},
		innates: ['Turboblaze', 'Combustion', 'White Smoke']
	},
	Zekrom: {
		types: ['Dragon', 'Electric'],
		bs: {hp: 100, at: 150, df: 120, sa: 120, sd: 100, sp: 90},
		weightkg: 345.0,
		abilities: {0: 'Beast Boost'},
		innates: ['Teravolt', 'Transistor', 'Overwhelm']
	},
	Landorus: {
		types: ['Ground', 'Flying'],
		bs: {hp: 89, at: 125, df: 90, sa: 115, sd: 80, sp: 101},
		weightkg: 68.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Sand Stream', 'Weather Control', 'Intimidate']
	},
	Kyurem: {
		types: ['Dragon', 'Ice'],
		bs: {hp: 125, at: 130, df: 90, sa: 130, sd: 90, sp: 95},
		weightkg: 325.0,
		abilities: {0: 'Beast Boost'},
		innates: ['Ice Scales', 'Permafrost', 'Whiteout']
	},
	Keldeo: {
		types: ['Water', 'Fighting'],
		bs: {hp: 91, at: 62, df: 95, sa: 129, sd: 95, sp: 108},
		weightkg: 48.5,
		abilities: {0: 'Justified'},
		innates: ['Steadfast', 'Field Explorer', 'Overcoat']
	},
	Meloetta: {
		types: ['Normal', 'Psychic'],
		bs: {hp: 100, at: 77, df: 77, sa: 128, sd: 128, sp: 90},
		weightkg: 6.5,
		abilities: {0: 'Queenly Majesty'},
		innates: ['Serene Grace', 'Amplifier', 'Prankster']
	},
	Genesect: {
		types: ['Bug', 'Steel'],
		bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
		weightkg: 82.5,
		abilities: {0: 'Download'},
		innates: ['Mega Launcher', 'Predator', 'Full Metal Body']
	},
	Chespin: {
		types: ['Grass'],
		bs: {hp: 56, at: 68, df: 65, sa: 48, sd: 45, sp: 38},
		weightkg: 9.0,
		abilities: {0: 'Let\'s Roll'},
		innates: ['Overgrow', 'Shell Armor', 'Bulletproof']
	},
	Quilladin: {
		types: ['Grass'],
		bs: {hp: 66, at: 83, df: 95, sa: 56, sd: 63, sp: 57},
		weightkg: 29.0,
		abilities: {0: 'Let\'s Roll'},
		innates: ['Overgrow', 'Shell Armor', 'Bulletproof']
	},
	Chesnaught: {
		types: ['Grass', 'Fighting'],
		bs: {hp: 88, at: 107, df: 122, sa: 74, sd: 80, sp: 64},
		weightkg: 90.0,
		abilities: {0: 'Let\'s Roll'},
		innates: ['Overgrow', 'Shell Armor', 'Loose Quills']
	},
	Fennekin: {
		types: ['Fire'],
		bs: {hp: 40, at: 45, df: 40, sa: 68, sd: 60, sp: 67},
		weightkg: 9.4,
		abilities: {0: 'Immolate'},
		innates: ['Blaze', 'Pyromancy', 'Psychic Mind']
	},
	Braixen: {
		types: ['Fire'],
		bs: {hp: 59, at: 59, df: 58, sa: 91, sd: 70, sp: 83},
		weightkg: 14.5,
		abilities: {0: 'Immolate'},
		innates: ['Blaze', 'Pyromancy', 'Psychic Mind']
	},
	Delphox: {
		types: ['Fire', 'Psychic'],
		bs: {hp: 75, at: 69, df: 72, sa: 114, sd: 100, sp: 105},
		weightkg: 39.0,
		abilities: {0: 'Emanate'},
		innates: ['Blaze', 'Telekinetic', 'Magic Guard']
	},
	Froakie: {
		types: ['Water'],
		bs: {hp: 41, at: 62, df: 40, sa: 62, sd: 44, sp: 71},
		weightkg: 7.0,
		abilities: {0: 'Dust Cloud'},
		innates: ['Torrent', 'Skill Link', 'Long Reach']
	},
	Frogadier: {
		types: ['Water'],
		bs: {hp: 54, at: 78, df: 52, sa: 83, sd: 56, sp: 97},
		weightkg: 10.9,
		abilities: {0: 'Fatal Precision'},
		innates: ['Torrent', 'Skill Link', 'Long Reach']
	},
	Greninja: {
		types: ['Water', 'Dark'],
		bs: {hp: 72, at: 100, df: 67, sa: 103, sd: 71, sp: 122},
		weightkg: 40.0,
		abilities: {0: 'Fatal Precision'},
		innates: ['Torrent', 'Skill Link', 'Long Reach']
	},
	Bunnelby: {
		types: ['Normal', 'Ground'],
		bs: {hp: 38, at: 36, df: 38, sa: 32, sd: 36, sp: 57},
		weightkg: 5.0,
		abilities: {0: 'Pickup'},
		innates: ['Huge Power', 'Growing Tooth', 'Quick Feet']
	},
	Diggersby: {
		types: ['Normal', 'Ground'],
		bs: {hp: 85, at: 56, df: 77, sa: 50, sd: 77, sp: 78},
		weightkg: 42.4,
		abilities: {0: 'Sheer Force'},
		innates: ['Huge Power', 'Growing Tooth', 'Pickup']
	},
	Fletchling: {
		types: ['Normal', 'Flying'],
		bs: {hp: 45, at: 50, df: 43, sa: 40, sd: 38, sp: 62},
		weightkg: 1.7,
		abilities: {0: 'Rivalry'},
		innates: ['Flock', 'Keen Eye', 'Speed Force']
	},
	Fletchinder: {
		types: ['Fire', 'Flying'],
		bs: {hp: 62, at: 73, df: 55, sa: 56, sd: 52, sp: 84},
		weightkg: 16.0,
		abilities: {0: 'Flame Body'},
		innates: ['Flock', 'Keen Eye', 'Speed Force']
	},
	Talonflame: {
		types: ['Fire', 'Flying'],
		bs: {hp: 78, at: 81, df: 71, sa: 74, sd: 69, sp: 126},
		weightkg: 24.5,
		abilities: {0: 'Predator'},
		innates: ['Flock', 'Violent Rush', 'Gale Wings']
	},
	Scatterbug: {
		types: ['Bug'],
		bs: {hp: 38, at: 35, df: 40, sa: 27, sd: 25, sp: 35},
		weightkg: 2.5,
		abilities: {0: 'Friend Guard'},
		innates: ['Shield Dust', 'Compound Eyes', 'Overcoat']
	},
	Spewpa: {
		types: ['Bug'],
		bs: {hp: 45, at: 22, df: 60, sa: 27, sd: 30, sp: 29},
		weightkg: 8.4,
		abilities: {0: 'Battle Armor'},
		innates: ['Shield Dust', 'Compound Eyes', 'Shed Skin']
	},
	Vivillon: {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	Litleo: {
		types: ['Fire', 'Normal'],
		bs: {hp: 62, at: 50, df: 58, sa: 80, sd: 54, sp: 72},
		weightkg: 13.5,
		abilities: {0: 'Unnerve'},
		innates: ['Pretentious', 'Run Away', 'Rivalry']
	},
	Pyroar: {
		types: ['Normal', 'Fire'],
		bs: {hp: 86, at: 68, df: 72, sa: 119, sd: 66, sp: 106},
		weightkg: 81.5,
		abilities: {0: 'Intimidate'},
		innates: ['Competitive', 'Opportunist', 'Predator']
	},
	Flabébé: {
		types: ['Fairy'],
		bs: {hp: 54, at: 38, df: 59, sa: 61, sd: 79, sp: 32},
		weightkg: 0.1,
		abilities: {0: 'Flower Veil'},
		innates: ['Natural Cure', 'Aroma Veil', 'Flower Gift']
	},
	Floette: {
		types: ['Fairy'],
		bs: {hp: 64, at: 45, df: 67, sa: 75, sd: 98, sp: 42},
		weightkg: 0.9,
		abilities: {0: 'Flower Veil'},
		innates: ['Pastel Veil', 'Regenerator', 'Water Veil']
	},
	Florges: {
		types: ['Fairy'],
		bs: {hp: 88, at: 55, df: 88, sa: 112, sd: 154, sp: 55},
		weightkg: 10.0,
		abilities: {0: 'Harvest'},
		innates: ['Natural Cure', 'Regenerator', 'Self Sufficient']
	},
	Skiddo: {
		types: ['Grass'],
		bs: {hp: 66, at: 65, df: 48, sa: 47, sd: 57, sp: 67},
		weightkg: 31.0,
		abilities: {0: 'Grass Pelt'},
		innates: ['Sap Sipper', 'Mountaineer', 'Fur Coat']
	},
	Gogoat: {
		types: ['Grass'],
		bs: {hp: 123, at: 100, df: 62, sa: 79, sd: 81, sp: 95},
		weightkg: 91.0,
		abilities: {0: 'Grass Pelt'},
		innates: ['Sap Sipper', 'Mountaineer', 'Fur Coat']
	},
	Pancham: {
		types: ['Fighting'],
		bs: {hp: 67, at: 82, df: 62, sa: 46, sd: 48, sp: 43},
		weightkg: 8.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Scrappy', 'Anger Point', 'Hyper Aggressive']
	},
	Pangoro: {
		types: ['Fighting', 'Dark'],
		bs: {hp: 95, at: 124, df: 78, sa: 69, sd: 71, sp: 58},
		weightkg: 136.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Scrappy', 'Anger Point', 'Hyper Aggressive']
	},
	Furfrou: {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Cute Charm'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	Espurr: {
		types: ['Psychic'],
		bs: {hp: 77, at: 48, df: 54, sa: 73, sd: 60, sp: 68},
		weightkg: 3.5,
		abilities: {0: 'Infiltrator'},
		innates: ['Keen Eye', 'Fur Coat', 'Psychic Mind']
	},
	Meowstic: {
		types: ['Psychic'],
		bs: {hp: 84, at: 48, df: 86, sa: 93, sd: 81, sp: 104},
		weightkg: 8.5,
		abilities: {0: 'Prankster'},
		innates: ['Psychic Mind', 'Infiltrator', 'Soul-Heart']
	},
	Honedge: {
		types: ['Steel', 'Ghost'],
		bs: {hp: 45, at: 80, df: 100, sa: 35, sd: 37, sp: 28},
		weightkg: 2.0,
		abilities: {0: 'No Guard'},
		innates: ['Levitate', 'Keen Edge', 'Soul Eater']
	},
	Doublade: {
		types: ['Steel', 'Ghost'],
		bs: {hp: 59, at: 110, df: 150, sa: 45, sd: 49, sp: 35},
		weightkg: 4.5,
		abilities: {0: 'No Guard'},
		innates: ['Levitate', 'Dual Wield', 'Soul Eater']
	},
	Aegislash: {
		types: ['Steel', 'Ghost'],
		bs: {hp: 60, at: 50, df: 140, sa: 50, sd: 140, sp: 60},
		weightkg: 53.0,
		abilities: {0: 'Shadow Shield'},
		innates: ['Levitate', 'Keen Edge', 'Stance Change']
	},
	Spritzee: {
		types: ['Fairy'],
		bs: {hp: 78, at: 52, df: 67, sa: 63, sd: 76, sp: 23},
		weightkg: 0.5,
		abilities: {0: 'Aroma Veil'},
		innates: ['Levitate', 'Healer', 'Soothing Aroma']
	},
	Aromatisse: {
		types: ['Fairy'],
		bs: {hp: 101, at: 72, df: 72, sa: 99, sd: 89, sp: 29},
		weightkg: 15.5,
		abilities: {0: 'Aroma Veil'},
		innates: ['Healer', 'Pixilate', 'Soothing Aroma']
	},
	Swirlix: {
		types: ['Fairy'],
		bs: {hp: 67, at: 55, df: 66, sa: 59, sd: 57, sp: 55},
		weightkg: 3.5,
		abilities: {0: 'Sticky Hold'},
		innates: ['Cotton Down', 'Fluffy', 'Self Sufficient']
	},
	Slurpuff: {
		types: ['Fairy'],
		bs: {hp: 82, at: 80, df: 86, sa: 85, sd: 75, sp: 72},
		weightkg: 5.0,
		abilities: {0: 'Sweet Veil'},
		innates: ['Gooey', 'Pixilate', 'Sticky Hold']
	},
	Inkay: {
		types: ['Dark', 'Psychic'],
		bs: {hp: 53, at: 54, df: 53, sa: 37, sd: 46, sp: 45},
		weightkg: 3.5,
		abilities: {0: 'Inversion'},
		innates: ['Hypnotist', 'Contrary', 'Suction Cups']
	},
	Malamar: {
		types: ['Dark', 'Psychic'],
		bs: {hp: 86, at: 92, df: 88, sa: 85, sd: 75, sp: 73},
		weightkg: 47.0,
		abilities: {0: 'Inversion'},
		innates: ['Hypnotist', 'Contrary', 'Big Pecks']
	},
	Binacle: {
		types: ['Rock', 'Water'],
		bs: {hp: 42, at: 52, df: 67, sa: 39, sd: 56, sp: 50},
		weightkg: 31.0,
		abilities: {0: 'Pickpocket'},
		innates: ['Multi-Headed', 'Tough Claws', 'Sniper']
	},
	Barbaracle: {
		types: ['Rock', 'Water'],
		bs: {hp: 72, at: 105, df: 115, sa: 54, sd: 86, sp: 68},
		weightkg: 96.0,
		abilities: {0: 'Pickpocket'},
		innates: ['Multi-Headed', 'Tough Claws', 'Sniper']
	},
	Skrelp: {
		types: ['Poison', 'Water'],
		bs: {hp: 65, at: 70, df: 60, sa: 70, sd: 60, sp: 30},
		weightkg: 7.3,
		abilities: {0: 'Half Drake'},
		innates: ['Adaptability', 'Poison Touch', 'Ambush']
	},
	Dragalge: {
		types: ['Poison', 'Dragon'],
		bs: {hp: 85, at: 97, df: 90, sa: 97, sd: 123, sp: 44},
		weightkg: 81.5,
		abilities: {0: 'Protean'},
		innates: ['Aquatic', 'Corrosion', 'Adaptability']
	},
	Clauncher: {
		types: ['Water'],
		bs: {hp: 71, at: 53, df: 69, sa: 88, sd: 70, sp: 44},
		weightkg: 8.3,
		abilities: {0: 'Scavenger'},
		innates: ['Multiscale', 'Shell Armor', 'Mega Launcher']
	},
	Clawitzer: {
		types: ['Water'],
		bs: {hp: 96, at: 73, df: 98, sa: 130, sd: 89, sp: 50},
		weightkg: 35.3,
		abilities: {0: 'Multiscale'},
		innates: ['Hydrate', 'Shell Armor', 'Mega Launcher']
	},
	Helioptile: {
		types: ['Electric', 'Normal'],
		bs: {hp: 44, at: 38, df: 33, sa: 71, sd: 43, sp: 70},
		weightkg: 6.0,
		abilities: {0: 'Sand Rush'},
		innates: ['Short Circuit', 'Dry Skin', 'Lightning Rod']
	},
	Heliolisk: {
		types: ['Electric', 'Normal'],
		bs: {hp: 62, at: 55, df: 52, sa: 109, sd: 94, sp: 109},
		weightkg: 21.0,
		abilities: {0: 'Sand Rush'},
		innates: ['Short Circuit', 'Dry Skin', 'Lightning Rod']
	},
	Tyrunt: {
		types: ['Rock', 'Dragon'],
		bs: {hp: 58, at: 89, df: 77, sa: 45, sd: 55, sp: 58},
		weightkg: 26.0,
		abilities: {0: 'Predator'},
		innates: ['Fossilized', 'Strong Jaw', 'Hyper Aggressive']
	},
	Tyrantrum: {
		types: ['Rock', 'Dragon'],
		bs: {hp: 82, at: 121, df: 119, sa: 69, sd: 69, sp: 81},
		weightkg: 270.0,
		abilities: {0: 'Rock Head'},
		innates: ['Predator', 'Juggernaut', 'Hyper Aggressive']
	},
	Amaura: {
		types: ['Rock', 'Ice'],
		bs: {hp: 77, at: 59, df: 50, sa: 87, sd: 63, sp: 46},
		weightkg: 25.2,
		abilities: {0: 'Refrigerate'},
		innates: ['Fossilized', 'Primal Armor', 'Permafrost']
	},
	Aurorus: {
		types: ['Rock', 'Ice'],
		bs: {hp: 123, at: 77, df: 72, sa: 119, sd: 92, sp: 58},
		weightkg: 225.0,
		abilities: {0: 'Aurora Borealis'},
		innates: ['Primal Armor', 'Ice Body', 'Permafrost']
	},
	Sylveon: {
		types: ['Fairy'],
		bs: {hp: 95, at: 65, df: 65, sa: 110, sd: 130, sp: 60},
		weightkg: 23.5,
		abilities: {0: 'Fairy Aura'},
		innates: ['Pixilate', 'Dragonslayer', 'Opportunist']
	},
	Hawlucha: {
		types: ['Fighting', 'Flying'],
		bs: {hp: 78, at: 92, df: 75, sa: 74, sd: 63, sp: 118},
		weightkg: 21.5,
		abilities: {0: 'Unburden'},
		innates: ['Limber', 'Vital Spirit', 'Aerodynamics']
	},
	Dedenne: {
		types: ['Electric', 'Fairy'],
		bs: {hp: 67, at: 58, df: 57, sa: 81, sd: 67, sp: 101},
		weightkg: 2.2,
		abilities: {0: 'Power Spot'},
		innates: ['Retriever', 'Electrocytes', 'Gluttony']
	},
	Carbink: {
		types: ['Rock', 'Fairy'],
		bs: {hp: 50, at: 50, df: 150, sa: 50, sd: 150, sp: 50},
		weightkg: 5.7,
		abilities: {0: 'Sturdy'},
		innates: ['Clear Body', 'Impenetrable', 'Stall']
	},
	Goomy: {
		types: ['Dragon'],
		bs: {hp: 45, at: 50, df: 35, sa: 55, sd: 75, sp: 40},
		weightkg: 2.8,
		abilities: {0: 'Poison Heal'},
		innates: ['Amphibious', 'Gooey', 'Liquified']
	},
	Sliggoo: {
		types: ['Dragon'],
		bs: {hp: 68, at: 75, df: 68, sa: 83, sd: 98, sp: 60},
		weightkg: 17.5,
		abilities: {0: 'Poison Heal'},
		innates: ['Adaptability', 'Sap Sipper', 'Sticky Hold']
	},
	Goodra: {
		types: ['Dragon'],
		bs: {hp: 90, at: 100, df: 85, sa: 110, sd: 135, sp: 80},
		weightkg: 150.5,
		abilities: {0: 'Poison Heal'},
		innates: ['Adaptability', 'Sap Sipper', 'Hydrate']
	},
	Klefki: {
		types: ['Steel', 'Fairy'],
		bs: {hp: 87, at: 80, df: 91, sa: 80, sd: 87, sp: 75},
		weightkg: 3.0,
		abilities: {0: 'Magic Guard'},
		innates: ['Prankster', 'Steelworker', 'Iron Barbs']
	},
	Phantump: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 43, at: 70, df: 48, sa: 50, sd: 60, sp: 38},
		weightkg: 7.0,
		abilities: {0: 'Vengeance'},
		innates: ['Natural Cure', 'Harvest', 'Cursed Body']
	},
	Trevenant: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 85, at: 110, df: 76, sa: 65, sd: 82, sp: 56},
		weightkg: 71.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Vengeance', 'Harvest', 'Cursed Body']
	},
	Pumpkaboo: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 49, at: 44, df: 70, sa: 66, sd: 55, sp: 51},
		weightkg: 5.0,
		abilities: {0: 'Flare Boost'},
		innates: ['Scare', 'Frisk', 'Insomnia']
	},
	Gourgeist: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 65, at: 58, df: 122, sa: 90, sd: 75, sp: 84},
		weightkg: 12.5,
		abilities: {0: 'Flare Boost'},
		innates: ['Scare', 'Pickup', 'Monster Mash']
	},
	Bergmite: {
		types: ['Ice'],
		bs: {hp: 55, at: 69, df: 85, sa: 32, sd: 55, sp: 28},
		weightkg: 99.5,
		abilities: {0: 'Sturdy'},
		innates: ['Permafrost', 'Impenetrable', 'Self Sufficient']
	},
	Avalugg: {
		types: ['Ice'],
		bs: {hp: 95, at: 117, df: 184, sa: 44, sd: 86, sp: 28},
		weightkg: 505.0,
		abilities: {0: 'Sturdy'},
		innates: ['Permafrost', 'Impenetrable', 'Self Sufficient']
	},
	Noibat: {
		types: ['Flying', 'Dragon'],
		bs: {hp: 50, at: 30, df: 45, sa: 75, sd: 50, sp: 95},
		weightkg: 8.0,
		abilities: {0: 'Frisk'},
		innates: ['Ambush', 'Mountaineer', 'Nocturnal']
	},
	Noivern: {
		types: ['Flying', 'Dragon'],
		bs: {hp: 85, at: 70, df: 80, sa: 97, sd: 80, sp: 123},
		weightkg: 85.0,
		abilities: {0: 'Echolocation'},
		innates: ['Ambush', 'Mountaineer', 'Hyper Aggressive']
	},
	Xerneas: {
		types: ['Fairy'],
		bs: {hp: 126, at: 131, df: 95, sa: 131, sd: 98, sp: 99},
		weightkg: 215.0,
		abilities: {0: 'Pixilate'},
		innates: ['Fairy Aura', 'Illuminate', 'Soul-Heart']
	},
	Yveltal: {
		types: ['Dark', 'Flying'],
		bs: {hp: 126, at: 131, df: 95, sa: 131, sd: 98, sp: 99},
		weightkg: 203.0,
		abilities: {0: 'Opportunist'},
		innates: ['Dark Aura', 'Air Blower', 'Giant Wings']
	},
	Zygarde: {
		types: ['Dragon', 'Ground'],
		bs: {hp: 108, at: 100, df: 121, sa: 81, sd: 95, sp: 95},
		weightkg: 305.0,
		abilities: {0: 'Aura Break'},
		innates: ['Primal Armor', 'Earthbound', 'Power Core']
	},
	Diancie: {
		types: ['Rock', 'Fairy'],
		bs: {hp: 50, at: 100, df: 150, sa: 100, sd: 150, sp: 50},
		weightkg: 8.8,
		abilities: {0: 'Pixilate'},
		innates: ['Solid Rock', 'Levitate', 'Mountaineer']
	},
	Hoopa: {
		types: ['Psychic', 'Ghost'],
		bs: {hp: 80, at: 110, df: 60, sa: 150, sd: 130, sp: 70},
		weightkg: 9.0,
		abilities: {0: 'Mystic Power'},
		innates: ['Prankster', 'Vengeance', 'Hypnotist']
	},
	Volcanion: {
		types: ['Fire', 'Water'],
		bs: {hp: 80, at: 110, df: 120, sa: 130, sd: 90, sp: 70},
		weightkg: 195.0,
		abilities: {0: 'Drizzle'},
		innates: ['Artillery', 'Storm Drain', 'Flash Fire']
	},
	Rowlet: {
		types: ['Grass', 'Flying'],
		bs: {hp: 68, at: 55, df: 55, sa: 40, sd: 40, sp: 62},
		weightkg: 1.5,
		abilities: {0: 'Sniper'},
		innates: ['Overgrow', 'Nocturnal', 'Chlorophyll']
	},
	Dartrix: {
		types: ['Grass', 'Flying'],
		bs: {hp: 78, at: 75, df: 75, sa: 50, sd: 60, sp: 82},
		weightkg: 16.0,
		abilities: {0: 'Deadeye'},
		innates: ['Overgrow', 'Sniper', 'Pretentious']
	},
	Decidueye: {
		types: ['Grass', 'Ghost'],
		bs: {hp: 78, at: 107, df: 75, sa: 70, sd: 90, sp: 115},
		weightkg: 36.6,
		abilities: {0: 'Deadeye'},
		innates: ['Overgrow', 'Sniper', 'Archer']
	},
	Litten: {
		types: ['Fire'],
		bs: {hp: 45, at: 65, df: 40, sa: 60, sd: 40, sp: 70},
		weightkg: 4.3,
		abilities: {0: 'Scare'},
		innates: ['Blaze', 'Flame Body', 'Bad Luck']
	},
	Torracat: {
		types: ['Fire'],
		bs: {hp: 65, at: 85, df: 50, sa: 80, sd: 50, sp: 90},
		weightkg: 25.0,
		abilities: {0: 'Bad Luck'},
		innates: ['Blaze', 'Flame Body', 'Striker']
	},
	Incineroar: {
		types: ['Fire', 'Dark'],
		bs: {hp: 100, at: 115, df: 90, sa: 80, sd: 90, sp: 60},
		weightkg: 83.0,
		abilities: {0: 'Stall'},
		innates: ['Blaze', 'Combat Specialist', 'Anger Point']
	},
	Popplio: {
		types: ['Water'],
		bs: {hp: 50, at: 54, df: 54, sa: 66, sd: 56, sp: 40},
		weightkg: 7.5,
		abilities: {0: 'Cute Charm'},
		innates: ['Torrent', 'Serene Grace', 'Dancer']
	},
	Brionne: {
		types: ['Water', 'Fairy'],
		bs: {hp: 60, at: 69, df: 69, sa: 91, sd: 81, sp: 50},
		weightkg: 17.5,
		abilities: {0: 'Competitive'},
		innates: ['Torrent', 'Liquid Voice', 'Dancer']
	},
	Primarina: {
		types: ['Water', 'Fairy'],
		bs: {hp: 80, at: 74, df: 79, sa: 126, sd: 116, sp: 60},
		weightkg: 44.0,
		abilities: {0: 'Competitive'},
		innates: ['Torrent', 'Liquid Voice', 'Serene Grace']
	},
	Pikipek: {
		types: ['Normal', 'Flying'],
		bs: {hp: 35, at: 75, df: 30, sa: 30, sd: 30, sp: 65},
		weightkg: 1.2,
		abilities: {0: 'Pickup'},
		innates: ['Flock', 'Keen Eye', 'Skill Link']
	},
	Trumbeak: {
		types: ['Normal', 'Flying'],
		bs: {hp: 55, at: 85, df: 50, sa: 40, sd: 50, sp: 75},
		weightkg: 14.8,
		abilities: {0: 'Pickup'},
		innates: ['Flock', 'Keen Eye', 'Skill Link']
	},
	Toucannon: {
		types: ['Normal', 'Flying'],
		bs: {hp: 80, at: 120, df: 95, sa: 75, sd: 95, sp: 60},
		weightkg: 26.0,
		abilities: {0: 'Combustion'},
		innates: ['Flock', 'Keen Eye', 'Skill Link']
	},
	Yungoos: {
		types: ['Normal'],
		bs: {hp: 48, at: 70, df: 30, sa: 30, sd: 30, sp: 45},
		weightkg: 6.0,
		abilities: {0: 'Ambush'},
		innates: ['Stakeout', 'Strong Jaw', 'Predator']
	},
	Gumshoos: {
		types: ['Normal'],
		bs: {hp: 88, at: 110, df: 60, sa: 55, sd: 60, sp: 45},
		weightkg: 14.2,
		abilities: {0: 'Ambush'},
		innates: ['Stakeout', 'Strong Jaw', 'Predator']
	},
	Grubbin: {
		types: ['Bug', 'Ground'],
		bs: {hp: 47, at: 55, df: 45, sa: 62, sd: 45, sp: 46},
		weightkg: 4.4,
		abilities: {0: 'Electrocytes'},
		innates: ['Swarm', 'Earthbound', 'Grip Pincer']
	},
	Charjabug: {
		types: ['Bug', 'Electric'],
		bs: {hp: 57, at: 55, df: 95, sa: 102, sd: 75, sp: 36},
		weightkg: 10.5,
		abilities: {0: 'Generator'},
		innates: ['Swarm', 'Shell Armor', 'Volt Absorb']
	},
	Vikavolt: {
		types: ['Bug', 'Electric'],
		bs: {hp: 77, at: 95, df: 99, sa: 145, sd: 75, sp: 109},
		weightkg: 45.0,
		abilities: {0: 'Speed Boost'},
		innates: ['Swarm', 'Levitate', 'Electrocytes']
	},
	Crabrawler: {
		types: ['Fighting'],
		bs: {hp: 62, at: 82, df: 57, sa: 42, sd: 47, sp: 63},
		weightkg: 7.0,
		abilities: {0: 'Anger Point'},
		innates: ['Grip Pincer', 'Hyper Cutter', 'Moxie']
	},
	Crabominable: {
		types: ['Fighting', 'Ice'],
		bs: {hp: 97, at: 132, df: 97, sa: 62, sd: 87, sp: 43},
		weightkg: 180.0,
		abilities: {0: 'Pretentious'},
		innates: ['Super Slammer', 'Anger Point', 'Permafrost']
	},
	Oricorio: {
		types: ['Fire', 'Flying'],
		bs: {hp: 75, at: 70, df: 70, sa: 108, sd: 70, sp: 103},
		weightkg: 3.4,
		abilities: {0: 'Dancer'},
		innates: ['Serene Grace', 'Flash Fire', 'Flock']
	},
	Cutiefly: {
		types: ['Bug', 'Fairy'],
		bs: {hp: 40, at: 45, df: 40, sa: 55, sd: 40, sp: 84},
		weightkg: 0.2,
		abilities: {0: 'Run Away'},
		innates: ['Levitate', 'Shield Dust', 'Effect Spore']
	},
	Ribombee: {
		types: ['Bug', 'Fairy'],
		bs: {hp: 60, at: 55, df: 60, sa: 95, sd: 70, sp: 124},
		weightkg: 0.5,
		abilities: {0: 'Compound Eyes'},
		innates: ['Levitate', 'Shield Dust', 'Pastel Veil']
	},
	Rockruff: {
		types: ['Rock'],
		bs: {hp: 45, at: 65, df: 40, sa: 30, sd: 40, sp: 60},
		weightkg: 9.2,
		abilities: {0: 'Steadfast'},
		innates: ['Keen Eye', 'Opportunist', 'Rock Head']
	},
	Lycanroc: {
		types: ['Rock', 'Ground'],
		bs: {hp: 75, at: 115, df: 65, sa: 55, sd: 65, sp: 112},
		weightkg: 25.0,
		abilities: {0: 'Speed Force'},
		innates: ['Sand Veil', 'Sand Rush', 'Rock Head']
	},
	Wishiwashi: {
		types: ['Water'],
		bs: {hp: 45, at: 20, df: 20, sa: 25, sd: 25, sp: 40},
		weightkg: 0.3,
		abilities: {0: 'Water Veil'},
		innates: ['Schooling', 'Regenerator', 'Multiscale']
	},
	Mareanie: {
		types: ['Poison', 'Water'],
		bs: {hp: 60, at: 53, df: 62, sa: 43, sd: 52, sp: 45},
		weightkg: 8.0,
		abilities: {0: 'Stall'},
		innates: ['Poison Point', 'Regenerator', 'Limber']
	},
	Toxapex: {
		types: ['Poison', 'Water'],
		bs: {hp: 75, at: 63, df: 152, sa: 53, sd: 142, sp: 35},
		weightkg: 14.5,
		abilities: {0: 'Battle Armor'},
		innates: ['Poison Touch', 'Regenerator', 'Rough Skin']
	},
	Mudbray: {
		types: ['Ground'],
		bs: {hp: 70, at: 100, df: 70, sa: 45, sd: 55, sp: 45},
		weightkg: 110.0,
		abilities: {0: 'Stamina'},
		innates: ['Own Tempo', 'Striker', 'Overcoat']
	},
	Mudsdale: {
		types: ['Ground'],
		bs: {hp: 100, at: 125, df: 100, sa: 55, sd: 85, sp: 35},
		weightkg: 920.0,
		abilities: {0: 'Own Tempo'},
		innates: ['Stamina', 'Battle Armor', 'Water Compaction']
	},
	Dewpider: {
		types: ['Water', 'Bug'],
		bs: {hp: 38, at: 60, df: 52, sa: 40, sd: 72, sp: 27},
		weightkg: 4.0,
		abilities: {0: 'Spider Lair'},
		innates: ['Water Bubble', 'Water Absorb', 'Overcoat']
	},
	Araquanid: {
		types: ['Water', 'Bug'],
		bs: {hp: 68, at: 70, df: 92, sa: 50, sd: 132, sp: 42},
		weightkg: 82.0,
		abilities: {0: 'Water Veil'},
		innates: ['Water Bubble', 'Water Absorb', 'Predator']
	},
	Fomantis: {
		types: ['Grass'],
		bs: {hp: 40, at: 55, df: 35, sa: 50, sd: 35, sp: 35},
		weightkg: 1.5,
		abilities: {0: 'Ambush'},
		innates: ['Soothing Aroma', 'Opportunist', 'Hyper Cutter']
	},
	Lurantis: {
		types: ['Grass'],
		bs: {hp: 90, at: 100, df: 95, sa: 59, sd: 90, sp: 96},
		weightkg: 18.5,
		abilities: {0: 'Tinted Lens'},
		innates: ['Predator', 'Chloroplast', 'Hyper Cutter']
	},
	Morelull: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 40, at: 35, df: 55, sa: 65, sd: 75, sp: 15},
		weightkg: 1.5,
		abilities: {0: 'Rain Dish'},
		innates: ['Illuminate', 'Dry Skin', 'Poison Absorb']
	},
	Shiinotic: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 60, at: 45, df: 80, sa: 90, sd: 100, sp: 30},
		weightkg: 11.5,
		abilities: {0: 'Dreamcatcher'},
		innates: ['Poison Absorb', 'Fairy Aura', 'Bad Dreams']
	},
	Salandit: {
		types: ['Poison', 'Fire'],
		bs: {hp: 48, at: 71, df: 40, sa: 71, sd: 40, sp: 77},
		weightkg: 4.8,
		abilities: {0: 'Half Drake'},
		innates: ['Poison Absorb', 'Poison Touch', 'Corrosion']
	},
	Salazzle: {
		types: ['Poison', 'Fire'],
		bs: {hp: 68, at: 64, df: 60, sa: 111, sd: 60, sp: 117},
		weightkg: 22.2,
		abilities: {0: 'Merciless'},
		innates: ['Corrosion', 'Queenly Majesty', 'Half Drake']
	},
	Stufful: {
		types: ['Normal', 'Fighting'],
		bs: {hp: 70, at: 75, df: 50, sa: 45, sd: 50, sp: 50},
		weightkg: 6.8,
		abilities: {0: 'Scrappy'},
		innates: ['Fluffy', 'Cute Charm', 'Unaware']
	},
	Bewear: {
		types: ['Normal', 'Fighting'],
		bs: {hp: 120, at: 125, df: 80, sa: 55, sd: 60, sp: 60},
		weightkg: 135.0,
		abilities: {0: 'Guts'},
		innates: ['Fluffy', 'Unaware', 'Lumberjack']
	},
	Bounsweet: {
		types: ['Grass'],
		bs: {hp: 42, at: 50, df: 30, sa: 30, sd: 30, sp: 52},
		weightkg: 3.2,
		abilities: {0: 'Oblivious'},
		innates: ['Guilt Trip', 'Leaf Guard', 'Sweet Veil']
	},
	Steenee: {
		types: ['Grass'],
		bs: {hp: 52, at: 70, df: 40, sa: 40, sd: 40, sp: 82},
		weightkg: 8.2,
		abilities: {0: 'Chlorophyll'},
		innates: ['Striker', 'Oblivious', 'Shell Armor']
	},
	Tsareena: {
		types: ['Grass', 'Fighting'],
		bs: {hp: 72, at: 120, df: 90, sa: 50, sd: 90, sp: 108},
		weightkg: 21.4,
		abilities: {0: 'Oblivious'},
		innates: ['Looter', 'Striker', 'Queenly Majesty']
	},
	Comfey: {
		types: ['Fairy'],
		bs: {hp: 76, at: 52, df: 90, sa: 82, sd: 110, sp: 100},
		weightkg: 0.3,
		abilities: {0: 'Flower Veil'},
		innates: ['Natural Cure', 'Wonder Skin', 'Regenerator']
	},
	Oranguru: {
		types: ['Normal', 'Psychic'],
		bs: {hp: 90, at: 60, df: 80, sa: 90, sd: 110, sp: 60},
		weightkg: 76.0,
		abilities: {0: 'Friend Guard'},
		innates: ['Gifted Mind', 'Self Sufficient', 'Healer']
	},
	Passimian: {
		types: ['Fighting'],
		bs: {hp: 90, at: 120, df: 90, sa: 40, sd: 60, sp: 90},
		weightkg: 82.8,
		abilities: {0: 'Receiver'},
		innates: ['Harvest', 'Avenger', 'Long Reach']
	},
	Wimpod: {
		types: ['Bug', 'Water'],
		bs: {hp: 25, at: 65, df: 70, sa: 20, sd: 30, sp: 80},
		weightkg: 12.0,
		abilities: {0: 'Wimp Out'},
		innates: ['Shell Armor', 'Coward', 'Looter']
	},
	Golisopod: {
		types: ['Bug', 'Water'],
		bs: {hp: 75, at: 125, df: 140, sa: 60, sd: 90, sp: 40},
		weightkg: 108.0,
		abilities: {0: 'Emergency Exit'},
		innates: ['Shell Armor', 'Pretentious', 'Hyper Cutter']
	},
	Sandygast: {
		types: ['Ghost', 'Ground'],
		bs: {hp: 55, at: 55, df: 90, sa: 70, sd: 55, sp: 15},
		weightkg: 70.0,
		abilities: {0: 'Fort Knox'},
		innates: ['Water Compaction', 'Self Sufficient', 'Sand Veil']
	},
	Palossand: {
		types: ['Ghost', 'Ground'],
		bs: {hp: 85, at: 75, df: 110, sa: 100, sd: 75, sp: 35},
		weightkg: 250.0,
		abilities: {0: 'Fort Knox'},
		innates: ['Water Compaction', 'Ill Will', 'Natural Cure']
	},
	Pyukumuku: {
		types: ['Water'],
		bs: {hp: 105, at: 60, df: 200, sa: 30, sd: 200, sp: 5},
		weightkg: 1.2,
		abilities: {0: 'Corrosion'},
		innates: ['Unaware', 'Pressure', 'Innards Out']
	},
	'Type: Null': {
		types: ['Normal'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 59},
		weightkg: 120.5,
		abilities: {0: 'Adaptability'},
		innates: ['Battle Armor', 'Spike Armor', 'Protean']
	},
	Silvally: {
		types: ['Normal'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Normalize'},
		innates: ['RKS System', 'Primal Armor', 'Scrappy']
	},
	Minior: {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
		weightkg: 40.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shields Down', 'Shell Armor', 'Overcoat']
	},
	Komala: {
		types: ['Normal'],
		bs: {hp: 65, at: 115, df: 95, sa: 55, sd: 95, sp: 65},
		weightkg: 19.9,
		abilities: {0: 'Sweet Dreams'},
		innates: ['Comatose', 'Poison Absorb', 'Sap Sipper']
	},
	Turtonator: {
		types: ['Fire', 'Dragon'],
		bs: {hp: 60, at: 78, df: 135, sa: 111, sd: 85, sp: 36},
		weightkg: 212.0,
		abilities: {0: 'Flame Body'},
		innates: ['Shell Armor', 'Iron Barbs', 'Dauntless Shield']
	},
	Togedemaru: {
		types: ['Electric', 'Steel'],
		bs: {hp: 65, at: 108, df: 83, sa: 40, sd: 73, sp: 106},
		weightkg: 3.3,
		abilities: {0: 'Sturdy'},
		innates: ['Iron Barbs', 'Lightning Rod', 'Loose Quills']
	},
	Mimikyu: {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
		weightkg: 0.7,
		abilities: {0: 'Ethereal Rush'},
		innates: ['Disguise', 'Rattled', 'Phantom Pain']
	},
	Bruxish: {
		types: ['Water', 'Psychic'],
		bs: {hp: 68, at: 105, df: 70, sa: 105, sd: 70, sp: 92},
		weightkg: 19.0,
		abilities: {0: 'Strong Jaw'},
		innates: ['Psychic Mind', 'Mold Breaker', 'On the Prowl']
	},
	Drampa: {
		types: ['Normal', 'Dragon'],
		bs: {hp: 78, at: 60, df: 90, sa: 135, sd: 106, sp: 36},
		weightkg: 185.0,
		abilities: {0: 'Berserk'},
		innates: ['Avenger', 'Rampage', 'Fluffy']
	},
	Dhelmise: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 70, at: 131, df: 100, sa: 86, sd: 90, sp: 40},
		weightkg: 210.0,
		abilities: {0: 'Water Absorb'},
		innates: ['Metallic', 'Seaweed', 'Steely Spirit']
	},
	'Jangmo-o': {
		types: ['Dragon'],
		bs: {hp: 45, at: 55, df: 65, sa: 45, sd: 45, sp: 45},
		weightkg: 29.7,
		abilities: {0: 'Bulletproof'},
		innates: ['Overcoat', 'Battle Armor', 'Mountaineer']
	},
	'Hakamo-o': {
		types: ['Dragon', 'Fighting'],
		bs: {hp: 55, at: 75, df: 90, sa: 65, sd: 70, sp: 65},
		weightkg: 47.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Overcoat', 'Battle Armor', 'Mountaineer']
	},
	'Kommo-o': {
		types: ['Dragon', 'Fighting'],
		bs: {hp: 75, at: 110, df: 125, sa: 100, sd: 105, sp: 85},
		weightkg: 78.2,
		abilities: {0: 'Bulletproof'},
		innates: ['Prism Scales', 'Battle Armor', 'Prism Armor']
	},
	'Tapu Koko': {
		types: ['Electric', 'Fairy'],
		bs: {hp: 70, at: 115, df: 75, sa: 115, sd: 65, sp: 130},
		weightkg: 20.5,
		abilities: {0: 'Speed Boost'},
		innates: ['Levitate', 'Electro Surge', 'Drizzle']
	},
	'Tapu Lele': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 70, at: 85, df: 75, sa: 130, sd: 115, sp: 95},
		weightkg: 18.6,
		abilities: {0: 'Prism Scales'},
		innates: ['Berserk', 'Psychic Surge', 'Multiscale']
	},
	'Tapu Bulu': {
		types: ['Grass', 'Fairy'],
		bs: {hp: 70, at: 130, df: 115, sa: 85, sd: 95, sp: 75},
		weightkg: 45.5,
		abilities: {0: 'Grass Pelt'},
		innates: ['Tough Claws', 'Grassy Surge', 'Regenerator']
	},
	'Tapu Fini': {
		types: ['Water', 'Fairy'],
		bs: {hp: 70, at: 75, df: 115, sa: 95, sd: 130, sp: 85},
		weightkg: 21.2,
		abilities: {0: 'Water Veil'},
		innates: ['Breakwater', 'Misty Surge', 'Shell Armor']
	},
	Cosmog: {
		types: ['Psychic'],
		bs: {hp: 43, at: 29, df: 31, sa: 29, sd: 31, sp: 137},
		weightkg: 0.1,
		abilities: {0: 'Unaware'},
		innates: ['Levitate', 'Cute Charm', 'Dust Cloud']
	},
	Cosmoem: {
		types: ['Psychic'],
		bs: {hp: 43, at: 29, df: 131, sa: 29, sd: 131, sp: 37},
		weightkg: 999.9,
		abilities: {0: 'Sturdy'},
		innates: ['Levitate', 'Power Core', 'Shell Armor']
	},
	Solgaleo: {
		types: ['Psychic', 'Steel'],
		bs: {hp: 137, at: 137, df: 107, sa: 113, sd: 89, sp: 97},
		weightkg: 230.0,
		abilities: {0: 'Illuminate'},
		innates: ['Solar Flare', 'Full Metal Body', 'Prism Armor']
	},
	Lunala: {
		types: ['Psychic', 'Ghost'],
		bs: {hp: 137, at: 113, df: 89, sa: 137, sd: 107, sp: 97},
		weightkg: 120.0,
		abilities: {0: 'Nocturnal'},
		innates: ['Lunar Eclipse', 'Shadow Shield', 'Dreamcatcher']
	},
	Nihilego: {
		types: ['Rock', 'Poison'],
		bs: {hp: 109, at: 53, df: 47, sa: 127, sd: 131, sp: 103},
		weightkg: 55.5,
		abilities: {0: 'Clear Body'},
		innates: ['Beast Boost', 'Levitate', 'Hyper Aggressive']
	},
	Buzzwole: {
		types: ['Bug', 'Fighting'],
		bs: {hp: 107, at: 139, df: 139, sa: 53, sd: 53, sp: 79},
		weightkg: 333.6,
		abilities: {0: 'Big Pecks'},
		innates: ['Beast Boost', 'Iron Fist', 'Raging Boxer']
	},
	Pheromosa: {
		types: ['Bug', 'Fighting'],
		bs: {hp: 71, at: 137, df: 37, sa: 137, sd: 37, sp: 151},
		weightkg: 25.0,
		abilities: {0: 'Limber'},
		innates: ['Beast Boost', 'Speed Boost', 'Striker']
	},
	Xurkitree: {
		types: ['Electric'],
		bs: {hp: 83, at: 89, df: 71, sa: 173, sd: 71, sp: 83},
		weightkg: 100.0,
		abilities: {0: 'Transistor'},
		innates: ['Beast Boost', 'Volt Rush', 'Infiltrator']
	},
	Celesteela: {
		types: ['Steel', 'Flying'],
		bs: {hp: 97, at: 101, df: 103, sa: 107, sd: 101, sp: 61},
		weightkg: 999.9,
		abilities: {0: 'Fortitude'},
		innates: ['Beast Boost', 'Battle Armor', 'Lead Coat']
	},
	Kartana: {
		types: ['Grass', 'Steel'],
		bs: {hp: 59, at: 181, df: 131, sa: 59, sd: 31, sp: 109},
		weightkg: 0.1,
		abilities: {0: 'Sweeping Edge'},
		innates: ['Beast Boost', 'Hyper Cutter', 'Keen Edge']
	},
	Guzzlord: {
		types: ['Dark', 'Dragon'],
		bs: {hp: 223, at: 101, df: 53, sa: 97, sd: 53, sp: 43},
		weightkg: 888.0,
		abilities: {0: 'Fearmonger'},
		innates: ['Beast Boost', 'Thick Fat', 'Jaws of Carnage']
	},
	Necrozma: {
		types: ['Psychic'],
		bs: {hp: 97, at: 107, df: 101, sa: 127, sd: 89, sp: 79},
		weightkg: 230.0,
		abilities: {0: 'Neuroforce'},
		innates: ['Prism Armor', 'Metallic', 'Filter']
	},
	Magearna: {
		types: ['Steel', 'Fairy'],
		bs: {hp: 80, at: 95, df: 115, sa: 130, sd: 115, sp: 65},
		weightkg: 80.5,
		abilities: {0: 'Steelworker'},
		innates: ['Mirror Armor', 'Soul-Heart', 'Power Core']
	},
	Marshadow: {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 90, at: 125, df: 80, sa: 90, sd: 90, sp: 125},
		weightkg: 22.2,
		abilities: {0: 'Technician'},
		innates: ['Combat Specialist', 'Phantom Thief', 'Unseen Fist']
	},
	Poipole: {
		types: ['Poison'],
		bs: {hp: 67, at: 73, df: 67, sa: 73, sd: 67, sp: 73},
		weightkg: 1.8,
		abilities: {0: 'Corrosion'},
		innates: ['Beast Boost', 'Poison Touch', 'Levitate']
	},
	Naganadel: {
		types: ['Poison', 'Dragon'],
		bs: {hp: 79, at: 79, df: 71, sa: 139, sd: 71, sp: 131},
		weightkg: 150.0,
		abilities: {0: 'Corrosion'},
		innates: ['Beast Boost', 'Levitate', 'Merciless']
	},
	Stakataka: {
		types: ['Rock', 'Steel'],
		bs: {hp: 59, at: 139, df: 211, sa: 53, sd: 101, sp: 7},
		weightkg: 820.0,
		abilities: {0: 'Solid Rock'},
		innates: ['Beast Boost', 'Lead Coat', 'Fort Knox']
	},
	Blacephalon: {
		types: ['Fire', 'Ghost'],
		bs: {hp: 53, at: 107, df: 53, sa: 151, sd: 79, sp: 127},
		weightkg: 13.0,
		abilities: {0: 'Magic Guard'},
		innates: ['Beast Boost', 'Reckless', 'Pyromancy']
	},
	Zeraora: {
		types: ['Electric'],
		bs: {hp: 88, at: 112, df: 75, sa: 102, sd: 80, sp: 143},
		weightkg: 44.5,
		abilities: {0: 'Iron Fist'},
		innates: ['Speed Force', 'Volt Absorb', 'Tough Claws']
	},
	Meltan: {
		types: ['Steel'],
		bs: {hp: 81, at: 81, df: 81, sa: 63, sd: 35, sp: 34},
		weightkg: 8.0,
		abilities: {0: 'Full Metal Body'},
		innates: ['Magnet Pull', 'Sturdy', 'Transistor']
	},
	Melmetal: {
		types: ['Steel'],
		bs: {hp: 135, at: 143, df: 143, sa: 80, sd: 65, sp: 34},
		weightkg: 80.0,
		abilities: {0: 'Full Metal Body'},
		innates: ['Magnet Pull', 'Iron Fist', 'Transistor']
	},
	Grookey: {
		types: ['Grass'],
		bs: {hp: 55, at: 70, df: 50, sa: 40, sd: 40, sp: 65},
		weightkg: 5.0,
		abilities: {0: 'Grassy Surge'},
		innates: ['Overgrow', 'Soundproof', 'Violent Rush']
	},
	Thwackey: {
		types: ['Grass'],
		bs: {hp: 70, at: 85, df: 70, sa: 55, sd: 60, sp: 80},
		weightkg: 14.0,
		abilities: {0: 'Grassy Surge'},
		innates: ['Overgrow', 'Soundproof', 'Violent Rush']
	},
	Rillaboom: {
		types: ['Grass'],
		bs: {hp: 100, at: 125, df: 90, sa: 60, sd: 75, sp: 85},
		weightkg: 90.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Overgrow', 'Soundproof', 'Grassy Surge']
	},
	Scorbunny: {
		types: ['Fire'],
		bs: {hp: 50, at: 76, df: 40, sa: 40, sd: 40, sp: 74},
		weightkg: 4.5,
		abilities: {0: 'Keen Eye'},
		innates: ['Blaze', 'Striker', 'Limber']
	},
	Raboot: {
		types: ['Fire'],
		bs: {hp: 65, at: 86, df: 60, sa: 55, sd: 60, sp: 94},
		weightkg: 9.0,
		abilities: {0: 'Keen Eye'},
		innates: ['Blaze', 'Striker', 'Limber']
	},
	Cinderace: {
		types: ['Fire'],
		bs: {hp: 80, at: 120, df: 75, sa: 65, sd: 75, sp: 120},
		weightkg: 33.0,
		abilities: {0: 'Keen Eye'},
		innates: ['Blaze', 'Striker', 'Libero']
	},
	Sobble: {
		types: ['Water'],
		bs: {hp: 50, at: 40, df: 40, sa: 75, sd: 40, sp: 75},
		weightkg: 4.0,
		abilities: {0: 'Coward'},
		innates: ['Torrent', 'Immunity', 'Run Away']
	},
	Drizzile: {
		types: ['Water'],
		bs: {hp: 65, at: 60, df: 55, sa: 95, sd: 55, sp: 90},
		weightkg: 11.5,
		abilities: {0: 'Sniper'},
		innates: ['Torrent', 'Immunity', 'Deadeye']
	},
	Inteleon: {
		types: ['Water'],
		bs: {hp: 75, at: 85, df: 65, sa: 125, sd: 65, sp: 120},
		weightkg: 45.2,
		abilities: {0: 'Deadeye'},
		innates: ['Torrent', 'Opportunist', 'Sniper']
	},
	Skwovet: {
		types: ['Normal'],
		bs: {hp: 70, at: 55, df: 55, sa: 35, sd: 35, sp: 25},
		weightkg: 2.5,
		abilities: {0: 'Cheap Tactics'},
		innates: ['Gluttony', 'Pickup', 'Run Away']
	},
	Greedent: {
		types: ['Normal'],
		bs: {hp: 120, at: 95, df: 95, sa: 55, sd: 75, sp: 20},
		weightkg: 6.0,
		abilities: {0: 'Thick Fat'},
		innates: ['Gluttony', 'Ripen', 'Oblivious']
	},
	Rookidee: {
		types: ['Flying'],
		bs: {hp: 38, at: 33, df: 35, sa: 47, sd: 35, sp: 57},
		weightkg: 1.8,
		abilities: {0: 'Scare'},
		innates: ['Flock', 'Keen Eye', 'Rapid Response']
	},
	Corvisquir: {
		types: ['Flying'],
		bs: {hp: 68, at: 43, df: 55, sa: 67, sd: 55, sp: 77},
		weightkg: 16.0,
		abilities: {0: 'Scare'},
		innates: ['Flock', 'Keen Eye', 'Technician']
	},
	Corviknight: {
		types: ['Flying', 'Steel'],
		bs: {hp: 98, at: 53, df: 85, sa: 87, sd: 105, sp: 67},
		weightkg: 75.0,
		abilities: {0: 'Intimidate'},
		innates: ['Pressure', 'Giant Wings', 'Mirror Armor']
	},
	Blipbug: {
		types: ['Bug'],
		bs: {hp: 25, at: 20, df: 20, sa: 25, sd: 45, sp: 45},
		weightkg: 8.0,
		abilities: {0: 'Anticipation'},
		innates: ['Simple', 'Swarm', 'Magic Bounce']
	},
	Dottler: {
		types: ['Bug', 'Psychic'],
		bs: {hp: 50, at: 35, df: 85, sa: 60, sd: 90, sp: 30},
		weightkg: 19.5,
		abilities: {0: 'Telepathy'},
		innates: ['Compound Eyes', 'Shell Armor', 'Magic Bounce']
	},
	Orbeetle: {
		types: ['Bug', 'Psychic'],
		bs: {hp: 60, at: 45, df: 110, sa: 90, sd: 130, sp: 90},
		weightkg: 40.8,
		abilities: {0: 'Power Spot'},
		innates: ['Analytic', 'Gravity Well', 'Magic Bounce']
	},
	Nickit: {
		types: ['Dark'],
		bs: {hp: 40, at: 58, df: 28, sa: 60, sd: 52, sp: 67},
		weightkg: 8.9,
		abilities: {0: 'Technician'},
		innates: ['Pickpocket', 'Pickup', 'Run Away']
	},
	Thievul: {
		types: ['Dark'],
		bs: {hp: 70, at: 88, df: 58, sa: 100, sd: 92, sp: 107},
		weightkg: 19.9,
		abilities: {0: 'Technician'},
		innates: ['Pickpocket', 'Low Blow', 'On the Prowl']
	},
	Gossifleur: {
		types: ['Grass'],
		bs: {hp: 40, at: 40, df: 60, sa: 40, sd: 85, sp: 10},
		weightkg: 2.2,
		abilities: {0: 'Cotton Down'},
		innates: ['Effect Spore', 'Regenerator', 'Sun Worship']
	},
	Eldegoss: {
		types: ['Grass'],
		bs: {hp: 60, at: 50, df: 90, sa: 80, sd: 145, sp: 60},
		weightkg: 2.5,
		abilities: {0: 'Cotton Down'},
		innates: ['Fluffy', 'Regenerator', 'Effect Spore']
	},
	Wooloo: {
		types: ['Normal'],
		bs: {hp: 42, at: 55, df: 55, sa: 55, sd: 45, sp: 58},
		weightkg: 6.0,
		abilities: {0: 'Sap Sipper'},
		innates: ['Let\'s Roll', 'Fluffy', 'Cotton Down']
	},
	Dubwool: {
		types: ['Normal'],
		bs: {hp: 72, at: 80, df: 100, sa: 60, sd: 90, sp: 88},
		weightkg: 43.0,
		abilities: {0: 'Sap Sipper'},
		innates: ['Let\'s Roll', 'Fluffy', 'Rock Head']
	},
	Chewtle: {
		types: ['Water'],
		bs: {hp: 50, at: 64, df: 50, sa: 38, sd: 38, sp: 44},
		weightkg: 8.5,
		abilities: {0: 'Looter'},
		innates: ['Strong Jaw', 'Shell Armor', 'Growing Tooth']
	},
	Drednaw: {
		types: ['Water', 'Rock'],
		bs: {hp: 90, at: 115, df: 90, sa: 48, sd: 68, sp: 74},
		weightkg: 115.5,
		abilities: {0: 'Shell Armor'},
		innates: ['Long Reach', 'Predator', 'Strong Jaw']
	},
	Yamper: {
		types: ['Electric'],
		bs: {hp: 59, at: 65, df: 50, sa: 65, sd: 50, sp: 76},
		weightkg: 13.5,
		abilities: {0: 'Rattled'},
		innates: ['Short Circuit', 'Run Away', 'Electrocytes']
	},
	Boltund: {
		types: ['Electric'],
		bs: {hp: 69, at: 110, df: 60, sa: 110, sd: 60, sp: 121},
		weightkg: 34.0,
		abilities: {0: 'Megabite'},
		innates: ['Ground Shock', 'Speed Boost', 'Short Circuit']
	},
	Rolycoly: {
		types: ['Rock', 'Fire'],
		bs: {hp: 30, at: 40, df: 50, sa: 40, sd: 50, sp: 30},
		weightkg: 12.0,
		abilities: {0: 'Hot Coals'},
		innates: ['Steam Engine', 'Power Core', 'Magma Armor']
	},
	Carkol: {
		types: ['Rock', 'Fire'],
		bs: {hp: 80, at: 60, df: 90, sa: 60, sd: 70, sp: 50},
		weightkg: 78.0,
		abilities: {0: 'Hot Coals'},
		innates: ['Steam Engine', 'Power Core', 'Magma Armor']
	},
	Coalossal: {
		types: ['Rock', 'Fire'],
		bs: {hp: 110, at: 90, df: 90, sa: 90, sd: 120, sp: 30},
		weightkg: 310.5,
		abilities: {0: 'Hot Coals'},
		innates: ['Steam Engine', 'Power Core', 'Magma Armor']
	},
	Applin: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 55, at: 55, df: 80, sa: 55, sd: 55, sp: 35},
		weightkg: 0.5,
		abilities: {0: 'Thick Fat'},
		innates: ['Overgrow', 'Shell Armor', 'Shed Skin']
	},
	Flapple: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 70, at: 110, df: 80, sa: 95, sd: 60, sp: 70},
		weightkg: 1.0,
		abilities: {0: 'Hustle'},
		innates: ['Levitate', 'Fatal Precision', 'Corrosion']
	},
	Appletun: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 110, at: 85, df: 80, sa: 100, sd: 80, sp: 30},
		weightkg: 13.0,
		abilities: {0: 'Soothing Aroma'},
		innates: ['Ripen', 'Harvest', 'Thick Fat']
	},
	Silicobra: {
		types: ['Ground'],
		bs: {hp: 52, at: 35, df: 75, sa: 57, sd: 50, sp: 46},
		weightkg: 7.6,
		abilities: {0: 'Sand Rush'},
		innates: ['Sand Spit', 'Shed Skin', 'Mega Launcher']
	},
	Sandaconda: {
		types: ['Ground'],
		bs: {hp: 72, at: 65, df: 125, sa: 107, sd: 70, sp: 71},
		weightkg: 65.5,
		abilities: {0: 'Sand Rush'},
		innates: ['Sand Spit', 'Shed Skin', 'Mega Launcher']
	},
	Cramorant: {
		types: ['Flying', 'Water'],
		bs: {hp: 75, at: 90, df: 85, sa: 90, sd: 95, sp: 85},
		weightkg: 18.0,
		abilities: {0: 'Predator'},
		innates: ['Gulp Missile', 'Self Sufficient', 'Field Explorer']
	},
	Arrokuda: {
		types: ['Water'],
		bs: {hp: 41, at: 63, df: 40, sa: 40, sd: 30, sp: 66},
		weightkg: 1.0,
		abilities: {0: 'Predator'},
		innates: ['Propeller Tail', 'Speed Force', 'Reckless']
	},
	Barraskewda: {
		types: ['Water'],
		bs: {hp: 61, at: 123, df: 60, sa: 60, sd: 50, sp: 136},
		weightkg: 30.0,
		abilities: {0: 'Propeller Tail'},
		innates: ['Speed Boost', 'Speed Force', 'Reckless']
	},
	Toxel: {
		types: ['Electric', 'Poison'],
		bs: {hp: 40, at: 38, df: 35, sa: 70, sd: 35, sp: 60},
		weightkg: 11.0,
		abilities: {0: 'Rattled'},
		innates: ['Plus', 'Water Absorb', 'Poison Touch']
	},
	Toxtricity: {
		types: ['Electric', 'Poison'],
		bs: {hp: 75, at: 75, df: 70, sa: 114, sd: 70, sp: 98},
		weightkg: 40.0,
		abilities: {0: 'Technician'},
		innates: ['Punk Rock', 'Loud Bang', 'Water Absorb']
	},
	Sizzlipede: {
		types: ['Fire', 'Bug'],
		bs: {hp: 50, at: 65, df: 45, sa: 50, sd: 50, sp: 45},
		weightkg: 1.0,
		abilities: {0: 'Flash Fire'},
		innates: ['Flame Body', 'Pyromancy', 'Predator']
	},
	Centiskorch: {
		types: ['Fire', 'Bug'],
		bs: {hp: 100, at: 115, df: 90, sa: 65, sd: 90, sp: 65},
		weightkg: 120.0,
		abilities: {0: 'Coil Up'},
		innates: ['Flaming Jaws', 'Let\'s Roll', 'Hyper Aggressive']
	},
	Clobbopus: {
		types: ['Fighting'],
		bs: {hp: 50, at: 68, df: 65, sa: 50, sd: 60, sp: 32},
		weightkg: 4.0,
		abilities: {0: 'Amphibious'},
		innates: ['Grappler', 'Regenerator', 'Stall']
	},
	Grapploct: {
		types: ['Fighting', 'Water'],
		bs: {hp: 80, at: 118, df: 95, sa: 70, sd: 90, sp: 42},
		weightkg: 39.0,
		abilities: {0: 'Self Sufficient'},
		innates: ['Grappler', 'Regenerator', 'Tidal Rush']
	},
	Sinistea: {
		types: ['Ghost'],
		bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
		weightkg: 0.2,
		abilities: {0: 'Weak Armor'},
		innates: ['Ectoplasm', 'Self Sufficient', 'Water Absorb']
	},
	Polteageist: {
		types: ['Ghost'],
		bs: {hp: 60, at: 65, df: 65, sa: 134, sd: 114, sp: 70},
		weightkg: 0.4,
		abilities: {0: 'Weak Armor'},
		innates: ['Ectoplasm', 'Liquified', 'Water Absorb']
	},
	Hatenna: {
		types: ['Psychic'],
		bs: {hp: 42, at: 30, df: 45, sa: 56, sd: 53, sp: 39},
		weightkg: 3.4,
		abilities: {0: 'Twist. Dimension'},
		innates: ['Magic Guard', 'Magic Bounce', 'Healer']
	},
	Hattrem: {
		types: ['Psychic'],
		bs: {hp: 57, at: 40, df: 65, sa: 86, sd: 73, sp: 49},
		weightkg: 4.8,
		abilities: {0: 'Twist. Dimension'},
		innates: ['Magic Guard', 'Magic Bounce', 'Hyper Aggressive']
	},
	Hatterene: {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 57, at: 90, df: 95, sa: 136, sd: 103, sp: 29},
		weightkg: 5.1,
		abilities: {0: 'Healer'},
		innates: ['Pixilate', 'Magic Bounce', 'Hyper Aggressive']
	},
	Impidimp: {
		types: ['Dark', 'Fairy'],
		bs: {hp: 45, at: 55, df: 30, sa: 45, sd: 40, sp: 50},
		weightkg: 5.5,
		abilities: {0: 'Prankster'},
		innates: ['Scare', 'Intimidate', 'Limber']
	},
	Morgrem: {
		types: ['Dark', 'Fairy'],
		bs: {hp: 65, at: 75, df: 45, sa: 60, sd: 55, sp: 70},
		weightkg: 12.5,
		abilities: {0: 'Prankster'},
		innates: ['Scare', 'Intimidate', 'Tangling Hair']
	},
	Grimmsnarl: {
		types: ['Dark', 'Fairy'],
		bs: {hp: 95, at: 120, df: 65, sa: 95, sd: 75, sp: 60},
		weightkg: 61.0,
		abilities: {0: 'Prankster'},
		innates: ['Fur Coat', 'Intimidate', 'Scare']
	},
	Obstagoon: {
		types: ['Dark', 'Normal'],
		bs: {hp: 93, at: 100, df: 101, sa: 60, sd: 81, sp: 95},
		weightkg: 46.0,
		abilities: {0: 'Cheap Tactics'},
		innates: ['Defiant', 'Toxic Boost', 'Poison Heal']
	},
	Perrserker: {
		types: ['Steel'],
		bs: {hp: 90, at: 110, df: 100, sa: 65, sd: 70, sp: 60},
		weightkg: 28.0,
		abilities: {0: 'Fur Coat'},
		innates: ['Tough Claws', 'Battle Armor', 'Steely Spirit']
	},
	Cursola: {
		types: ['Ghost'],
		bs: {hp: 60, at: 95, df: 57, sa: 145, sd: 130, sp: 50},
		weightkg: 0.4,
		abilities: {0: 'Perish Body'},
		innates: ['Fertilize', 'Shadow Shield', 'Stall']
	},
	Sirfetchd: {
		types: ['Fighting'],
		bs: {hp: 92, at: 135, df: 95, sa: 58, sd: 92, sp: 65},
		weightkg: 117.0,
		abilities: {0: 'Aerodynamics'},
		innates: ['Scrappy', 'Keen Edge', 'Long Reach']
	},
	'Mr. Rime': {
		types: ['Ice', 'Psychic'],
		bs: {hp: 80, at: 110, df: 85, sa: 110, sd: 100, sp: 70},
		weightkg: 58.2,
		abilities: {0: 'Prankster'},
		innates: ['Screen Cleaner', 'Ice Body', 'Oblivious']
	},
	Runerigus: {
		types: ['Ground', 'Ghost'],
		bs: {hp: 58, at: 95, df: 145, sa: 50, sd: 105, sp: 30},
		weightkg: 66.6,
		abilities: {0: 'WandrngSprit'},
		innates: ['Haunted Spirit', 'Spiteful', 'Solid Rock']
	},
	Milcery: {
		types: ['Fairy'],
		bs: {hp: 65, at: 40, df: 40, sa: 60, sd: 61, sp: 34},
		weightkg: 0.3,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	Alcremie: {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	Falinks: {
		types: ['Fighting'],
		bs: {hp: 65, at: 100, df: 100, sa: 70, sd: 60, sp: 75},
		weightkg: 62.0,
		abilities: {0: 'Metallic'},
		innates: ['Mighty Horn', 'Fighting Spirit', 'Battle Armor']
	},
	Pincurchin: {
		types: ['Electric', 'Water'],
		bs: {hp: 75, at: 101, df: 95, sa: 101, sd: 95, sp: 15},
		weightkg: 1.0,
		abilities: {0: 'Lightning Rod'},
		innates: ['Electromorphosis', 'Loose Quills', 'Electro Surge']
	},
	Snom: {
		types: ['Ice', 'Bug'],
		bs: {hp: 50, at: 45, df: 55, sa: 65, sd: 50, sp: 40},
		weightkg: 3.8,
		abilities: {0: 'Freezing Point'},
		innates: ['Guilt Trip', 'Overcoat', 'Unaware']
	},
	Frosmoth: {
		types: ['Ice', 'Bug'],
		bs: {hp: 95, at: 50, df: 75, sa: 105, sd: 110, sp: 65},
		weightkg: 42.0,
		abilities: {0: 'Snow Cloak'},
		innates: ['Levitate', 'Majestic Moth', 'Ice Scales']
	},
	Stonjourner: {
		types: ['Rock'],
		bs: {hp: 100, at: 125, df: 135, sa: 20, sd: 60, sp: 70},
		weightkg: 520.0,
		abilities: {0: 'Clear Body'},
		innates: ['Striker', 'Stalwart', 'Solid Rock']
	},
	Eiscue: {
		types: ['Ice'],
		bs: {hp: 85, at: 100, df: 110, sa: 65, sd: 90, sp: 60},
		weightkg: 89.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Ice Face', 'Antarctic Bird', 'Amphibious']
	},
	Indeedee: {
		types: ['Psychic', 'Normal'],
		bs: {hp: 60, at: 55, df: 55, sa: 110, sd: 95, sp: 120},
		weightkg: 28.0,
		abilities: {0: 'Energy Horns'},
		innates: ['Egoist', 'Scrappy', 'Forewarn']
	},
	Morpeko: {
		types: ['Electric', 'Dark'],
		bs: {hp: 58, at: 95, df: 58, sa: 70, sd: 58, sp: 97},
		weightkg: 3.0,
		abilities: {0: 'Electric Burst'},
		innates: ['HungerSwitch', 'Gluttony', 'Lightning Rod']
	},
	Cufant: {
		types: ['Steel'],
		bs: {hp: 72, at: 80, df: 49, sa: 40, sd: 49, sp: 40},
		weightkg: 100.0,
		abilities: {0: 'Long Reach'},
		innates: ['Heavy Metal', 'Lead Coat', 'Sap Sipper']
	},
	Copperajah: {
		types: ['Steel'],
		bs: {hp: 122, at: 130, df: 69, sa: 80, sd: 69, sp: 30},
		weightkg: 650.0,
		abilities: {0: 'Long Reach'},
		innates: ['Heavy Metal', 'Lead Coat', 'Sap Sipper']
	},
	Dracozolt: {
		types: ['Electric', 'Dragon'],
		bs: {hp: 90, at: 100, df: 90, sa: 80, sd: 70, sp: 75},
		weightkg: 190.0,
		abilities: {0: 'Hustle'},
		innates: ['Strong Jaw', 'Dragon\'s Maw', 'Predator']
	},
	Arctozolt: {
		types: ['Electric', 'Ice'],
		bs: {hp: 90, at: 100, df: 90, sa: 70, sd: 80, sp: 75},
		weightkg: 150.0,
		abilities: {0: 'Hustle'},
		innates: ['Strong Jaw', 'Predator', 'Ice Dew']
	},
	Dracovish: {
		types: ['Water', 'Dragon'],
		bs: {hp: 90, at: 90, df: 100, sa: 70, sd: 80, sp: 75},
		weightkg: 215.0,
		abilities: {0: 'Hustle'},
		innates: ['Strong Jaw', 'Dragon\'s Maw', 'Predator']
	},
	Arctovish: {
		types: ['Water', 'Ice'],
		bs: {hp: 90, at: 90, df: 100, sa: 80, sd: 70, sp: 75},
		weightkg: 175.0,
		abilities: {0: 'Hustle'},
		innates: ['Strong Jaw', 'Ice Scales', 'Predator']
	},
	Duraludon: {
		types: ['Steel', 'Dragon'],
		bs: {hp: 70, at: 95, df: 115, sa: 120, sd: 50, sp: 85},
		weightkg: 40.0,
		abilities: {0: 'Light Metal'},
		innates: ['Steel Barrel', 'Mega Launcher', 'Stalwart']
	},
	Dreepy: {
		types: ['Dragon', 'Ghost'],
		bs: {hp: 28, at: 70, df: 30, sa: 50, sd: 30, sp: 92},
		weightkg: 2.0,
		abilities: {0: 'Clear Body'},
		innates: ['Levitate', 'Infiltrator', 'Ectoplasm']
	},
	Drakloak: {
		types: ['Dragon', 'Ghost'],
		bs: {hp: 68, at: 90, df: 50, sa: 70, sd: 50, sp: 102},
		weightkg: 11.0,
		abilities: {0: 'Clear Body'},
		innates: ['Levitate', 'Infiltrator', 'Ectoplasm']
	},
	Dragapult: {
		types: ['Dragon', 'Ghost'],
		bs: {hp: 88, at: 110, df: 75, sa: 110, sd: 75, sp: 142},
		weightkg: 50.0,
		abilities: {0: 'Clear Body'},
		innates: ['Levitate', 'Infiltrator', 'Ectoplasm']
	},
	Zacian: {
		types: ['Fairy'],
		bs: {hp: 92, at: 130, df: 115, sa: 80, sd: 115, sp: 138},
		weightkg: 110.0,
		abilities: {0: 'Scare'},
		innates: ['Intrepid Sword', 'Anger Point', 'Pixilate']
	},
	Zamazenta: {
		types: ['Fighting'],
		bs: {hp: 92, at: 130, df: 115, sa: 80, sd: 115, sp: 138},
		weightkg: 210.0,
		abilities: {0: 'Scare'},
		innates: ['Dauntless Shield', 'Stamina', 'Fighting Spirit']
	},
	Eternatus: {
		types: ['Poison', 'Dragon'],
		bs: {hp: 140, at: 85, df: 95, sa: 145, sd: 95, sp: 130},
		weightkg: 950.0,
		abilities: {0: 'Corrosion'},
		innates: ['Levitate', 'Mega Launcher', 'Primal Armor']
	},
	Kubfu: {
		types: ['Fighting'],
		bs: {hp: 60, at: 100, df: 60, sa: 53, sd: 50, sp: 82},
		weightkg: 12.0,
		abilities: {0: 'Deviate'},
		innates: ['Unseen Fist', 'Violent Rush', 'Anger Point']
	},
	Urshifu: {
		types: ['Fighting', 'Dark'],
		bs: {hp: 100, at: 150, df: 90, sa: 60, sd: 60, sp: 100},
		weightkg: 105.0,
		abilities: {0: 'Discipline'},
		innates: ['Unseen Fist', 'Combat Specialist', 'Precise Fist']
	},
	Zarude: {
		types: ['Dark', 'Grass'],
		bs: {hp: 105, at: 120, df: 105, sa: 70, sd: 95, sp: 105},
		weightkg: 70.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Tough Claws', 'Leaf Guard', 'Overgrow']
	},
	Regieleki: {
		types: ['Electric'],
		bs: {hp: 80, at: 100, df: 50, sa: 100, sd: 50, sp: 200},
		weightkg: 145.0,
		abilities: {0: 'Overcharge'},
		innates: ['Transistor', 'Ground Shock', 'Speed Boost']
	},
	Regidrago: {
		types: ['Dragon'],
		bs: {hp: 200, at: 100, df: 50, sa: 100, sd: 50, sp: 80},
		weightkg: 200.0,
		abilities: {0: 'Predator'},
		innates: ['Dragon\'s Maw', 'Mega Launcher', 'Overwhelm']
	},
	Glastrier: {
		types: ['Ice'],
		bs: {hp: 100, at: 145, df: 130, sa: 65, sd: 110, sp: 30},
		weightkg: 800.0,
		abilities: {0: 'ChillngNeigh'},
		innates: ['Permafrost', 'Stamina', 'Whiteout']
	},
	Spectrier: {
		types: ['Ghost'],
		bs: {hp: 100, at: 65, df: 60, sa: 145, sd: 80, sp: 130},
		weightkg: 44.5,
		abilities: {0: 'Grim Neigh'},
		innates: ['Shadow Shield', 'Scare', 'Speed Boost']
	},
	Calyrex: {
		types: ['Psychic', 'Grass'],
		bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
		weightkg: 7.7,
		abilities: {0: 'Wonder Skin'},
		innates: ['Harvest', 'Gifted Mind', 'Crowned King']
	},
	Wyrdeer: {
		types: ['Normal', 'Psychic'],
		bs: {hp: 123, at: 105, df: 82, sa: 65, sd: 85, sp: 65},
		weightkg: 95.1,
		abilities: {0: 'Inversion'},
		innates: ['North Wind', 'Mighty Horn', 'Illuminate']
	},
	Kleavor: {
		types: ['Bug', 'Rock'],
		bs: {hp: 70, at: 135, df: 95, sa: 45, sd: 70, sp: 85},
		weightkg: 10.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Fossilized', 'Keen Edge', 'Technician']
	},
	Ursaluna: {
		types: ['Ground', 'Normal'],
		bs: {hp: 130, at: 140, df: 105, sa: 45, sd: 80, sp: 50},
		weightkg: 290.0,
		abilities: {0: 'Guts'},
		innates: ['Tough Claws', 'Predator', 'Overcoat']
	},
	Basculegion: {
		types: ['Water', 'Ghost'],
		bs: {hp: 120, at: 112, df: 65, sa: 80, sd: 75, sp: 78},
		weightkg: 110.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Clear Body', 'Reckless', 'Supreme Overlord']
	},
	Sneasler: {
		types: ['Fighting', 'Poison'],
		bs: {hp: 80, at: 130, df: 60, sa: 40, sd: 80, sp: 120},
		weightkg: 43.0,
		abilities: {0: 'Unburden'},
		innates: ['Tough Claws', 'Poison Touch', 'Mountaineer']
	},
	Overqwil: {
		types: ['Dark', 'Poison'],
		bs: {hp: 85, at: 115, df: 95, sa: 65, sd: 65, sp: 85},
		weightkg: 60.5,
		abilities: {0: 'Swift Swim'},
		innates: ['Merciless', 'Aftermath', 'Toxic Debris']
	},
	Enamorus: {
		types: ['Fairy', 'Flying'],
		bs: {hp: 74, at: 115, df: 70, sa: 135, sd: 80, sp: 106},
		weightkg: 48.0,
		abilities: {0: 'Pure Love'},
		innates: ['Pixie Power', 'Queenly Majesty', 'Weather Control']
	},
	Sprigatito: {
		types: ['Grass'],
		bs: {hp: 40, at: 66, df: 54, sa: 45, sd: 45, sp: 70},
		weightkg: 4.1,
		abilities: {0: 'Soothing Aroma'},
		innates: ['Overgrow', 'Protean', 'Long Reach']
	},
	Floragato: {
		types: ['Grass'],
		bs: {hp: 66, at: 80, df: 63, sa: 60, sd: 63, sp: 88},
		weightkg: 12.2,
		abilities: {0: 'Spike Armor'},
		innates: ['Overgrow', 'Protean', 'Long Reach']
	},
	Meowscarada: {
		types: ['Grass', 'Dark'],
		bs: {hp: 81, at: 110, df: 70, sa: 81, sd: 70, sp: 123},
		weightkg: 31.2,
		abilities: {0: 'Magician'},
		innates: ['Overgrow', 'Protean', 'Long Reach']
	},
	Fuecoco: {
		types: ['Fire'],
		bs: {hp: 72, at: 45, df: 59, sa: 63, sd: 45, sp: 36},
		weightkg: 9.8,
		abilities: {0: 'Banshee'},
		innates: ['Blaze', 'Unaware', 'Amplifier']
	},
	Crocalor: {
		types: ['Fire'],
		bs: {hp: 86, at: 55, df: 78, sa: 90, sd: 62, sp: 49},
		weightkg: 30.7,
		abilities: {0: 'Banshee'},
		innates: ['Blaze', 'Unaware', 'Amplifier']
	},
	Skeledirge: {
		types: ['Fire', 'Ghost'],
		bs: {hp: 104, at: 75, df: 100, sa: 110, sd: 80, sp: 66},
		weightkg: 326.5,
		abilities: {0: 'Banshee'},
		innates: ['Blaze', 'Unaware', 'Amplifier']
	},
	Quaxly: {
		types: ['Water'],
		bs: {hp: 55, at: 65, df: 45, sa: 50, sd: 45, sp: 60},
		weightkg: 6.1,
		abilities: {0: 'Cute Charm'},
		innates: ['Torrent', 'Striker', 'Water Veil']
	},
	Quaxwell: {
		types: ['Water', 'Fighting'],
		bs: {hp: 70, at: 85, df: 65, sa: 65, sd: 65, sp: 70},
		weightkg: 21.5,
		abilities: {0: 'Moxie'},
		innates: ['Torrent', 'Striker', 'Water Veil']
	},
	Quaquaval: {
		types: ['Water', 'Fighting'],
		bs: {hp: 85, at: 120, df: 80, sa: 85, sd: 75, sp: 90},
		weightkg: 61.9,
		abilities: {0: 'Moxie'},
		innates: ['Torrent', 'Striker', 'Water Veil']
	},
	Lechonk: {
		types: ['Normal'],
		bs: {hp: 54, at: 60, df: 65, sa: 35, sd: 50, sp: 35},
		weightkg: 10.2,
		abilities: {0: 'Lingering Aroma'},
		innates: ['Thick Fat', 'Gluttony', 'Pastel Veil']
	},
	Oinkologne: {
		types: ['Normal'],
		bs: {hp: 100, at: 110, df: 100, sa: 59, sd: 85, sp: 65},
		weightkg: 120.0,
		abilities: {0: 'Lingering Aroma'},
		innates: ['Thick Fat', 'Gluttony', 'Pastel Veil']
	},
	Tarountula: {
		types: ['Bug'],
		bs: {hp: 35, at: 41, df: 45, sa: 29, sd: 40, sp: 20},
		weightkg: 4.0,
		abilities: {0: 'Spider Lair'},
		innates: ['Let\'s Roll', 'Insomnia', 'Stakeout']
	},
	Spidops: {
		types: ['Bug'],
		bs: {hp: 90, at: 85, df: 92, sa: 55, sd: 86, sp: 52},
		weightkg: 16.5,
		abilities: {0: 'Web Spinner'},
		innates: ['Ambush', 'Exploit Weakness', 'Stakeout']
	},
	Nymble: {
		types: ['Bug'],
		bs: {hp: 33, at: 46, df: 40, sa: 21, sd: 25, sp: 45},
		weightkg: 1.0,
		abilities: {0: 'Tinted Lens'},
		innates: ['Violent Rush', 'Swarm', 'Striker']
	},
	Lokix: {
		types: ['Bug', 'Dark'],
		bs: {hp: 71, at: 102, df: 78, sa: 52, sd: 55, sp: 92},
		weightkg: 17.5,
		abilities: {0: 'Avenger'},
		innates: ['Showdown Mode', 'Swarm', 'Striker']
	},
	Pawmi: {
		types: ['Electric'],
		bs: {hp: 45, at: 50, df: 20, sa: 40, sd: 25, sp: 70},
		weightkg: 2.5,
		abilities: {0: 'Adrenaline Rush'},
		innates: ['Volt Absorb', 'Volt Rush', 'Avenger']
	},
	Pawmo: {
		types: ['Electric', 'Fighting'],
		bs: {hp: 60, at: 75, df: 40, sa: 50, sd: 40, sp: 95},
		weightkg: 6.5,
		abilities: {0: 'Adrenaline Rush'},
		innates: ['Volt Absorb', 'Volt Rush', 'Avenger']
	},
	Pawmot: {
		types: ['Electric', 'Fighting'],
		bs: {hp: 70, at: 115, df: 70, sa: 70, sd: 60, sp: 125},
		weightkg: 41.0,
		abilities: {0: 'Adrenaline Rush'},
		innates: ['Volt Absorb', 'Volt Rush', 'Avenger']
	},
	Tandemaus: {
		types: ['Normal'],
		bs: {hp: 50, at: 50, df: 45, sa: 40, sd: 45, sp: 75},
		weightkg: 1.8,
		abilities: {0: 'Friend Guard'},
		innates: ['Own Tempo', 'Parental Bond', 'Technician']
	},
	Maushold: {
		types: ['Normal'],
		bs: {hp: 74, at: 75, df: 70, sa: 65, sd: 75, sp: 111},
		weightkg: 2.3,
		abilities: {0: 'Friend Guard'},
		innates: ['Own Tempo', 'Parental Bond', 'Technician']
	},
	Fidough: {
		types: ['Fairy'],
		bs: {hp: 37, at: 55, df: 70, sa: 30, sd: 55, sp: 65},
		weightkg: 10.9,
		abilities: {0: 'Gluttony'},
		innates: ['Well Baked Body', 'Shield Dust', 'Self Sufficient']
	},
	Dachsbun: {
		types: ['Fairy'],
		bs: {hp: 57, at: 80, df: 115, sa: 50, sd: 80, sp: 105},
		weightkg: 14.9,
		abilities: {0: 'Gluttony'},
		innates: ['Well Baked Body', 'Shield Dust', 'Self Sufficient']
	},
	Smoliv: {
		types: ['Grass', 'Normal'],
		bs: {hp: 41, at: 35, df: 45, sa: 58, sd: 51, sp: 30},
		weightkg: 6.5,
		abilities: {0: 'Cute Charm'},
		innates: ['Chloroplast', 'Overcoat', 'Earth Eater']
	},
	Dolliv: {
		types: ['Grass', 'Normal'],
		bs: {hp: 52, at: 53, df: 60, sa: 78, sd: 78, sp: 33},
		weightkg: 11.9,
		abilities: {0: 'Triage'},
		innates: ['Chloroplast', 'Overcoat', 'Cute Charm']
	},
	Arboliva: {
		types: ['Grass', 'Normal'],
		bs: {hp: 78, at: 69, df: 90, sa: 125, sd: 109, sp: 39},
		weightkg: 48.2,
		abilities: {0: 'Triage'},
		innates: ['Seed Sower', 'Overcoat', 'Harvest']
	},
	Squawkabilly: {
		types: ['Normal', 'Flying'],
		bs: {hp: 90, at: 45, df: 106, sa: 76, sd: 90, sp: 85},
		weightkg: 2.4,
		abilities: {0: 'Power Spot'},
		innates: ['Airborne', 'Flock', 'Parroting']
	},
	Nacli: {
		types: ['Rock'],
		bs: {hp: 55, at: 60, df: 75, sa: 35, sd: 40, sp: 25},
		weightkg: 16.0,
		abilities: {0: 'Salt Circle'},
		innates: ['Purifying Salt', 'Loose Rocks', 'Impenetrable']
	},
	Naclstack: {
		types: ['Rock'],
		bs: {hp: 60, at: 60, df: 100, sa: 35, sd: 65, sp: 35},
		weightkg: 10.5,
		abilities: {0: 'Salt Circle'},
		innates: ['Purifying Salt', 'Loose Rocks', 'Impenetrable']
	},
	Garganacl: {
		types: ['Rock'],
		bs: {hp: 100, at: 100, df: 130, sa: 45, sd: 90, sp: 35},
		weightkg: 240.0,
		abilities: {0: 'Salt Circle'},
		innates: ['Purifying Salt', 'Loose Rocks', 'Impenetrable']
	},
	Charcadet: {
		types: ['Fire'],
		bs: {hp: 40, at: 50, df: 40, sa: 50, sd: 40, sp: 35},
		weightkg: 10.5,
		abilities: {0: 'Weak Armor'},
		innates: ['Battle Armor', 'Simple', 'Flash Fire']
	},
	Armarouge: {
		types: ['Fire', 'Psychic'],
		bs: {hp: 85, at: 60, df: 100, sa: 125, sd: 80, sp: 75},
		weightkg: 85.0,
		abilities: {0: 'Weak Armor'},
		innates: ['Battle Armor', 'Mega Launcher', 'Flash Fire']
	},
	Ceruledge: {
		types: ['Fire', 'Ghost'],
		bs: {hp: 75, at: 125, df: 80, sa: 60, sd: 100, sp: 85},
		weightkg: 62.0,
		abilities: {0: 'Weak Armor'},
		innates: ['Battle Armor', 'Hyper Cutter', 'Dual Wield']
	},
	Tadbulb: {
		types: ['Electric'],
		bs: {hp: 71, at: 31, df: 45, sa: 66, sd: 45, sp: 45},
		weightkg: 0.4,
		abilities: {0: 'Damp'},
		innates: ['Electromorphosis', 'Dry Skin', 'Static']
	},
	Bellibolt: {
		types: ['Electric'],
		bs: {hp: 109, at: 64, df: 95, sa: 110, sd: 95, sp: 45},
		weightkg: 113.0,
		abilities: {0: 'Damp'},
		innates: ['Electromorphosis', 'Dry Skin', 'Static']
	},
	Wattrel: {
		types: ['Electric', 'Flying'],
		bs: {hp: 40, at: 40, df: 35, sa: 55, sd: 40, sp: 70},
		weightkg: 2.6,
		abilities: {0: 'Competitive'},
		innates: ['Volt Absorb', 'Terminal Velocity', 'Air Blower']
	},
	Kilowattrel: {
		types: ['Electric', 'Flying'],
		bs: {hp: 70, at: 70, df: 60, sa: 105, sd: 60, sp: 125},
		weightkg: 38.6,
		abilities: {0: 'Raging Storm'},
		innates: ['Volt Absorb', 'Terminal Velocity', 'Wind Power']
	},
	Maschiff: {
		types: ['Dark'],
		bs: {hp: 60, at: 78, df: 60, sa: 40, sd: 51, sp: 51},
		weightkg: 16.0,
		abilities: {0: 'Intimidate'},
		innates: ['Guard Dog', 'Strong Jaw', 'Jaws of Carnage']
	},
	Mabosstiff: {
		types: ['Dark'],
		bs: {hp: 80, at: 120, df: 90, sa: 60, sd: 70, sp: 85},
		weightkg: 6.1,
		abilities: {0: 'Intimidate'},
		innates: ['Guard Dog', 'Strong Jaw', 'Jaws of Carnage']
	},
	Shroodle: {
		types: ['Poison', 'Normal'],
		bs: {hp: 40, at: 65, df: 35, sa: 40, sd: 35, sp: 75},
		weightkg: 0.7,
		abilities: {0: 'Prankster'},
		innates: ['Poison Touch', 'Cheap Tactics', 'Pickpocket']
	},
	Grafaiai: {
		types: ['Poison', 'Normal'],
		bs: {hp: 63, at: 95, df: 65, sa: 80, sd: 72, sp: 110},
		weightkg: 27.2,
		abilities: {0: 'Unburden'},
		innates: ['Poison Touch', 'Cheap Tactics', 'Scrappy']
	},
	Bramblin: {
		types: ['Grass', 'Ghost'],
		bs: {hp: 50, at: 65, df: 30, sa: 45, sd: 35, sp: 70},
		weightkg: 0.6,
		abilities: {0: 'Infiltrator'},
		innates: ['Wind Rider', 'Let\'s Roll', 'Nosferatu']
	},
	Brambleghast: {
		types: ['Grass', 'Ghost'],
		bs: {hp: 65, at: 115, df: 70, sa: 80, sd: 70, sp: 100},
		weightkg: 6.0,
		abilities: {0: 'Infiltrator'},
		innates: ['Wind Rider', 'Desert Cloak', 'Nosferatu']
	},
	Toedscool: {
		types: ['Ground', 'Grass'],
		bs: {hp: 40, at: 40, df: 35, sa: 50, sd: 100, sp: 70},
		weightkg: 33.0,
		abilities: {0: 'Poison Heal'},
		innates: ['Stall', 'Absorbant', 'Mycelium Might']
	},
	Toedscruel: {
		types: ['Ground', 'Grass'],
		bs: {hp: 80, at: 70, df: 65, sa: 80, sd: 120, sp: 100},
		weightkg: 58.0,
		abilities: {0: 'Poison Heal'},
		innates: ['Stall', 'Absorbant', 'Mycelium Might']
	},
	Klawf: {
		types: ['Rock'],
		bs: {hp: 70, at: 100, df: 115, sa: 35, sd: 55, sp: 75},
		weightkg: 79.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shell Armor', 'Anger Shell', 'Sturdy']
	},
	Capsakid: {
		types: ['Grass'],
		bs: {hp: 50, at: 62, df: 40, sa: 62, sd: 40, sp: 50},
		weightkg: 3.0,
		abilities: {0: 'Moody'},
		innates: ['Water Absorb', 'Growing Tooth', 'Pyromancy']
	},
	Scovillain: {
		types: ['Grass', 'Fire'],
		bs: {hp: 65, at: 108, df: 65, sa: 108, sd: 65, sp: 75},
		weightkg: 15.0,
		abilities: {0: 'Moody'},
		innates: ['Water Absorb', 'Multi-Headed', 'Pyromancy']
	},
	Rellor: {
		types: ['Bug'],
		bs: {hp: 41, at: 50, df: 60, sa: 50, sd: 58, sp: 30},
		weightkg: 1.0,
		abilities: {0: 'Compound Eyes'},
		innates: ['Let\'s Roll', 'Stench', 'Speed Boost']
	},
	Rabsca: {
		types: ['Bug', 'Psychic'],
		bs: {hp: 75, at: 50, df: 85, sa: 115, sd: 100, sp: 45},
		weightkg: 3.5,
		abilities: {0: 'Telepathy'},
		innates: ['Parental Bond', 'Psychic Mind', 'Levitate']
	},
	Flittle: {
		types: ['Psychic'],
		bs: {hp: 30, at: 35, df: 30, sa: 55, sd: 30, sp: 75},
		weightkg: 1.5,
		abilities: {0: 'Speed Boost'},
		innates: ['Levitate', 'Egoist', 'Psychic Mind']
	},
	Espathra: {
		types: ['Psychic'],
		bs: {hp: 95, at: 60, df: 60, sa: 101, sd: 60, sp: 105},
		weightkg: 90.0,
		abilities: {0: 'Speed Boost'},
		innates: ['Egoist', 'Frisk', 'Psychic Mind']
	},
	Tinkatink: {
		types: ['Fairy', 'Steel'],
		bs: {hp: 50, at: 55, df: 45, sa: 35, sd: 64, sp: 62},
		weightkg: 8.9,
		abilities: {0: 'Steelworker'},
		innates: ['Super Slammer', 'Rattled', 'Mold Breaker']
	},
	Tinkatuff: {
		types: ['Fairy', 'Steel'],
		bs: {hp: 65, at: 65, df: 55, sa: 45, sd: 82, sp: 82},
		weightkg: 59.1,
		abilities: {0: 'Steelworker'},
		innates: ['Super Slammer', 'Long Reach', 'Mold Breaker']
	},
	Tinkaton: {
		types: ['Fairy', 'Steel'],
		bs: {hp: 85, at: 75, df: 77, sa: 70, sd: 105, sp: 94},
		weightkg: 112.8,
		abilities: {0: 'Steely Spirit'},
		innates: ['Super Slammer', 'Long Reach', 'Mold Breaker']
	},
	Wiglett: {
		types: ['Water'],
		bs: {hp: 15, at: 55, df: 30, sa: 35, sd: 35, sp: 95},
		weightkg: 1.8,
		abilities: {0: 'Accelerate'},
		innates: ['Gooey', 'Field Explorer', 'Rattled']
	},
	Wugtrio: {
		types: ['Water'],
		bs: {hp: 35, at: 100, df: 50, sa: 50, sd: 70, sp: 120},
		weightkg: 5.4,
		abilities: {0: 'Accelerate'},
		innates: ['Gooey', 'Field Explorer', 'Multi-Headed']
	},
	Bombirdier: {
		types: ['Flying', 'Dark'],
		bs: {hp: 70, at: 103, df: 85, sa: 60, sd: 85, sp: 82},
		weightkg: 42.9,
		abilities: {0: 'Big Pecks'},
		innates: ['Mountaineer', 'Rocky Payload', 'Retriever']
	},
	Finizen: {
		types: ['Water'],
		bs: {hp: 70, at: 45, df: 40, sa: 45, sd: 40, sp: 75},
		weightkg: 60.2,
		abilities: {0: 'Swift Swim'},
		innates: ['Adaptability', 'Damp', 'Tidal Rush']
	},
	Palafin: {
		types: ['Water'],
		bs: {hp: 100, at: 70, df: 72, sa: 53, sd: 62, sp: 100},
		weightkg: 60.2,
		abilities: {0: 'Friend Guard'},
		innates: ['Zero To Hero', 'Justified', 'Water Veil']
	},
	Varoom: {
		types: ['Steel', 'Poison'],
		bs: {hp: 45, at: 70, df: 63, sa: 30, sd: 45, sp: 47},
		weightkg: 35.0,
		abilities: {0: 'Speed Force'},
		innates: ['Speed Boost', 'Filter', 'Overcoat']
	},
	Revavroom: {
		types: ['Steel', 'Poison'],
		bs: {hp: 80, at: 119, df: 90, sa: 54, sd: 67, sp: 90},
		weightkg: 120.0,
		abilities: {0: 'Speed Force'},
		innates: ['Speed Boost', 'Filter', 'Overcoat']
	},
	Cyclizar: {
		types: ['Dragon', 'Normal'],
		bs: {hp: 70, at: 95, df: 65, sa: 85, sd: 65, sp: 121},
		weightkg: 63.0,
		abilities: {0: 'Multiscale'},
		innates: ['Shed Skin', 'Field Explorer', 'Regenerator']
	},
	Orthworm: {
		types: ['Steel'],
		bs: {hp: 70, at: 85, df: 145, sa: 60, sd: 55, sp: 65},
		weightkg: 310.0,
		abilities: {0: 'Sand Guard'},
		innates: ['Earth Eater', 'Aftershock', 'Unaware']
	},
	Glimmet: {
		types: ['Rock', 'Poison'],
		bs: {hp: 48, at: 35, df: 42, sa: 105, sd: 60, sp: 60},
		weightkg: 8.0,
		abilities: {0: 'Loose Quills'},
		innates: ['Corrosion', 'Neurotoxin', 'Sturdy']
	},
	Glimmora: {
		types: ['Rock', 'Poison'],
		bs: {hp: 83, at: 55, df: 90, sa: 130, sd: 81, sp: 86},
		weightkg: 45.0,
		abilities: {0: 'Corrosion'},
		innates: ['Toxic Debris', 'Merciless', 'Accelerate']
	},
	Greavard: {
		types: ['Ghost'],
		bs: {hp: 50, at: 61, df: 60, sa: 30, sd: 55, sp: 34},
		weightkg: 35.0,
		abilities: {0: 'Ethereal Rush'},
		innates: ['Pickup', 'Cursed Body', 'Soul Eater']
	},
	Houndstone: {
		types: ['Ghost'],
		bs: {hp: 72, at: 101, df: 100, sa: 50, sd: 97, sp: 68},
		weightkg: 15.0,
		abilities: {0: 'Ethereal Rush'},
		innates: ['Scare', 'Haunted Spirit', 'Soul Eater']
	},
	Flamigo: {
		types: ['Flying', 'Fighting'],
		bs: {hp: 82, at: 115, df: 74, sa: 75, sd: 64, sp: 90},
		weightkg: 37.0,
		abilities: {0: 'Quick Feet'},
		innates: ['Vital Spirit', 'Flock', 'Aerilate']
	},
	Cetoddle: {
		types: ['Ice'],
		bs: {hp: 108, at: 68, df: 45, sa: 30, sd: 40, sp: 43},
		weightkg: 15.0,
		abilities: {0: 'Slush Rush'},
		innates: ['Thick Fat', 'Freezing Point', 'Scavenger']
	},
	Cetitan: {
		types: ['Ice'],
		bs: {hp: 170, at: 113, df: 65, sa: 45, sd: 55, sp: 73},
		weightkg: 700.0,
		abilities: {0: 'Whiteout'},
		innates: ['Thick Fat', 'Let\'s Roll', 'Predator']
	},
	Veluza: {
		types: ['Water', 'Psychic'],
		bs: {hp: 102, at: 102, df: 83, sa: 78, sd: 65, sp: 70},
		weightkg: 9.0,
		abilities: {0: 'Mold Breaker'},
		innates: ['Keen Edge', 'Torrent', 'Hyper Cutter']
	},
	Dondozo: {
		types: ['Water'],
		bs: {hp: 150, at: 100, df: 115, sa: 65, sd: 65, sp: 35},
		weightkg: 220.0,
		abilities: {0: 'Unaware'},
		innates: ['Water Veil', 'Predator', 'Juggernaut']
	},
	Tatsugiri: {
		types: ['Dragon', 'Water'],
		bs: {hp: 68, at: 50, df: 60, sa: 120, sd: 95, sp: 82},
		weightkg: 8.0,
		abilities: {0: 'Commander'},
		innates: ['Torrent', 'High Tide', 'Opportunist']
	},
	Annihilape: {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 110, at: 115, df: 80, sa: 50, sd: 90, sp: 90},
		weightkg: 56.0,
		abilities: {0: 'Shallow Grave'},
		innates: ['Hyper Aggressive', 'Rage Point', 'Vengeful Spirit']
	},
	Clodsire: {
		types: ['Poison', 'Ground'],
		bs: {hp: 130, at: 85, df: 80, sa: 85, sd: 100, sp: 35},
		weightkg: 223.0,
		abilities: {0: 'Wonder Skin'},
		innates: ['Toxic Debris', 'Water Absorb', 'Rough Skin']
	},
	Farigiraf: {
		types: ['Normal', 'Psychic'],
		bs: {hp: 120, at: 75, df: 75, sa: 115, sd: 75, sp: 60},
		weightkg: 160.0,
		abilities: {0: 'Cud Chew'},
		innates: ['Armor Tail', 'Mind Crunch', 'Scare']
	},
	Dudunsparce: {
		types: ['Normal'],
		bs: {hp: 125, at: 100, df: 80, sa: 85, sd: 75, sp: 55},
		weightkg: 39.2,
		abilities: {0: 'Mighty Horn'},
		innates: ['Super Luck', 'Own Tempo', 'Serene Grace']
	},
	Kingambit: {
		types: ['Dark', 'Steel'],
		bs: {hp: 100, at: 135, df: 120, sa: 60, sd: 85, sp: 50},
		weightkg: 120.0,
		abilities: {0: 'Pressure'},
		innates: ['Supreme Overlord', 'Hyper Cutter', 'Battle Armor']
	},
	'Great Tusk': {
		types: ['Ground', 'Fighting'],
		bs: {hp: 115, at: 131, df: 131, sa: 53, sd: 53, sp: 87},
		weightkg: 320.0,
		abilities: {0: 'Spike Armor'},
		innates: ['Protosynthesis', 'Mighty Horn', 'Aftershock']
	},
	'Scream Tail': {
		types: ['Fairy', 'Psychic'],
		bs: {hp: 115, at: 65, df: 99, sa: 65, sd: 115, sp: 111},
		weightkg: 8.0,
		abilities: {0: 'Fur Coat'},
		innates: ['Protosynthesis', 'Nosferatu', 'Tangling Hair']
	},
	'Brute Bonnet': {
		types: ['Grass', 'Dark'],
		bs: {hp: 111, at: 127, df: 99, sa: 79, sd: 99, sp: 55},
		weightkg: 21.0,
		abilities: {0: 'Fungal Infection'},
		innates: ['Protosynthesis', 'Regenerator', 'Solar Power']
	},
	'Flutter Mane': {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 55, at: 55, df: 55, sa: 135, sd: 135, sp: 135},
		weightkg: 4.0,
		abilities: {0: 'Vengeful Spirit'},
		innates: ['Protosynthesis', 'Ill Will', 'Frenzied Phantom']
	},
	'Slither Wing': {
		types: ['Bug', 'Fighting'],
		bs: {hp: 85, at: 135, df: 79, sa: 85, sd: 105, sp: 81},
		weightkg: 92.0,
		abilities: {0: 'Fluffy'},
		innates: ['Protosynthesis', 'Majestic Moth', 'Powder Burst']
	},
	'Sandy Shocks': {
		types: ['Electric', 'Ground'],
		bs: {hp: 85, at: 81, df: 97, sa: 121, sd: 85, sp: 101},
		weightkg: 60.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Protosynthesis', 'Multi-Headed', 'Transistor']
	},
	'Iron Treads': {
		types: ['Ground', 'Steel'],
		bs: {hp: 90, at: 112, df: 120, sa: 72, sd: 70, sp: 106},
		weightkg: 240.0,
		abilities: {0: 'Let\'s Roll'},
		innates: ['Quark Drive', 'Impenetrable', 'Mega Launcher']
	},
	'Iron Bundle': {
		types: ['Ice', 'Water'],
		bs: {hp: 56, at: 80, df: 114, sa: 124, sd: 60, sp: 136},
		weightkg: 11.0,
		abilities: {0: 'Mountaineer'},
		innates: ['Quark Drive', 'Cold Rebound', 'Speed Boost']
	},
	'Iron Hands': {
		types: ['Fighting', 'Electric'],
		bs: {hp: 154, at: 140, df: 108, sa: 50, sd: 68, sp: 50},
		weightkg: 380.7,
		abilities: {0: 'Iron Fist'},
		innates: ['Quark Drive', 'Power Core', 'Static']
	},
	'Iron Jugulis': {
		types: ['Dark', 'Flying'],
		bs: {hp: 94, at: 80, df: 86, sa: 122, sd: 80, sp: 108},
		weightkg: 111.0,
		abilities: {0: 'Hubris'},
		innates: ['Quark Drive', 'Multi-Headed', 'Rapid Response']
	},
	'Iron Moth': {
		types: ['Fire', 'Poison'],
		bs: {hp: 80, at: 70, df: 60, sa: 140, sd: 110, sp: 110},
		weightkg: 36.0,
		abilities: {0: 'Molten Down'},
		innates: ['Quark Drive', 'Majestic Moth', 'Overcoat']
	},
	'Iron Thorns': {
		types: ['Rock', 'Electric'],
		bs: {hp: 100, at: 134, df: 110, sa: 70, sd: 84, sp: 72},
		weightkg: 303.0,
		abilities: {0: 'Fearmonger'},
		innates: ['Quark Drive', 'Sharp Edges', 'Self Repair']
	},
	Frigibax: {
		types: ['Dragon', 'Ice'],
		bs: {hp: 65, at: 75, df: 45, sa: 35, sd: 45, sp: 55},
		weightkg: 17.0,
		abilities: {0: 'Mountaineer'},
		innates: ['Thermal Exchange', 'Heatproof', 'Freezing Point']
	},
	Arctibax: {
		types: ['Dragon', 'Ice'],
		bs: {hp: 90, at: 95, df: 66, sa: 45, sd: 65, sp: 62},
		weightkg: 30.0,
		abilities: {0: 'Freezing Point'},
		innates: ['Thermal Exchange', 'Heatproof', 'Overwhelm']
	},
	Baxcalibur: {
		types: ['Dragon', 'Ice'],
		bs: {hp: 115, at: 145, df: 92, sa: 75, sd: 86, sp: 87},
		weightkg: 210.0,
		abilities: {0: 'Freezing Point'},
		innates: ['Thermal Exchange', 'Heatproof', 'Overwhelm']
	},
	Gimmighoul: {
		types: ['Ghost'],
		bs: {hp: 65, at: 30, df: 70, sa: 75, sd: 70, sp: 10},
		weightkg: 5.0,
		abilities: {0: 'Surprise!'},
		innates: ['Good As Gold', 'Super Luck', 'Prankster']
	},
	Gholdengo: {
		types: ['Steel', 'Ghost'],
		bs: {hp: 87, at: 60, df: 95, sa: 133, sd: 91, sp: 84},
		weightkg: 30.0,
		abilities: {0: 'Sharing Is Caring'},
		innates: ['Good As Gold', 'Steely Spirit', 'Super Luck']
	},
	'Wo Chien': {
		types: ['Dark', 'Grass'],
		bs: {hp: 125, at: 70, df: 100, sa: 95, sd: 135, sp: 55},
		weightkg: 74.2,
		abilities: {0: 'Grass Pelt'},
		innates: ['Tablets Of Ruin', 'Stall', 'Absorbant']
	},
	'Chien Pao': {
		types: ['Dark', 'Ice'],
		bs: {hp: 80, at: 130, df: 80, sa: 90, sd: 65, sp: 135},
		weightkg: 152.2,
		abilities: {0: 'Unaware'},
		innates: ['Sword Of Ruin', 'Arctic Fur', 'Strong Jaw']
	},
	'Ting Lu': {
		types: ['Dark', 'Ground'],
		bs: {hp: 165, at: 110, df: 125, sa: 55, sd: 80, sp: 45},
		weightkg: 699.7,
		abilities: {0: 'Aftershock'},
		innates: ['Vessel Of Ruin', 'Pressure', 'Thick Skin']
	},
	'Chi Yu': {
		types: ['Dark', 'Fire'],
		bs: {hp: 55, at: 80, df: 80, sa: 145, sd: 120, sp: 100},
		weightkg: 4.9,
		abilities: {0: 'Hellblaze'},
		innates: ['Beads Of Ruin', 'Turboblaze', 'Molten Down']
	},
	'Roaring Moon': {
		types: ['Dragon', 'Dark'],
		bs: {hp: 105, at: 139, df: 71, sa: 55, sd: 101, sp: 119},
		weightkg: 380.0,
		abilities: {0: 'Equinox'},
		innates: ['Protosynthesis', 'Overwhelm', 'Fearmonger']
	},
	'Iron Valiant': {
		types: ['Fairy', 'Fighting'],
		bs: {hp: 74, at: 130, df: 90, sa: 120, sd: 60, sp: 116},
		weightkg: 35.0,
		abilities: {0: 'Equinox'},
		innates: ['Quark Drive', 'Long Reach', 'Gallantry']
	},
	Koraidon: {
		types: ['Fighting', 'Dragon'],
		bs: {hp: 100, at: 135, df: 115, sa: 85, sd: 100, sp: 135},
		weightkg: 303.0,
		abilities: {0: 'Rock Head'},
		innates: ['Orichalcum Pulse', 'Turboblaze', 'Winged King']
	},
	Miraidon: {
		types: ['Electric', 'Dragon'],
		bs: {hp: 100, at: 85, df: 100, sa: 135, sd: 115, sp: 135},
		weightkg: 240.0,
		abilities: {0: 'Surge Surfer'},
		innates: ['Hadron Engine', 'Dragon\'s Maw', 'Iron Serpent']
	},
	'Walking Wake': {
		types: ['Water', 'Dragon'],
		bs: {hp: 99, at: 83, df: 91, sa: 125, sd: 83, sp: 109},
		weightkg: 280.0,
		abilities: {0: 'Drought'},
		innates: ['Protosynthesis', 'Overwhelm', 'Multiscale']
	},
	'Iron Leaves': {
		types: ['Grass', 'Psychic'],
		bs: {hp: 90, at: 104, df: 88, sa: 108, sd: 70, sp: 130},
		weightkg: 125.0,
		abilities: {0: 'Blademaster'},
		innates: ['Quark Drive', 'Surge Surfer', 'Momentum']
	},
	Dipplin: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 80, at: 80, df: 110, sa: 95, sd: 80, sp: 40},
		weightkg: 4.4,
		abilities: {0: 'Draco Morale'},
		innates: ['Supersweet Syrup', 'Shell Armor', 'Super Hot Goo']
	},
	Poltchageist: {
		types: ['Grass', 'Ghost'],
		bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
		weightkg: 1.1,
		abilities: {0: 'Ill Will'},
		innates: ['Heatproof', 'Cursed Body', 'Soul Eater']
	},
	Sinistcha: {
		types: ['Grass', 'Ghost'],
		bs: {hp: 71, at: 60, df: 106, sa: 121, sd: 80, sp: 70},
		weightkg: 2.2,
		abilities: {0: 'Ill Will'},
		innates: ['Heatproof', 'Cursed Body', 'Soul Eater']
	},
	Okidogi: {
		types: ['Poison', 'Fighting'],
		bs: {hp: 88, at: 128, df: 115, sa: 58, sd: 86, sp: 80},
		weightkg: 92.2,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Toxic Chain', 'Guard Dog', 'Anger Point']
	},
	Munkidori: {
		types: ['Poison', 'Psychic'],
		bs: {hp: 88, at: 75, df: 66, sa: 130, sd: 80, sp: 116},
		weightkg: 12.2,
		abilities: {0: 'Merciless'},
		innates: ['Toxic Chain', 'Monkey Business', 'Exploit Weakness']
	},
	Fezandipiti: {
		types: ['Poison', 'Fairy'],
		bs: {hp: 82, at: 90, df: 75, sa: 83, sd: 125, sp: 100},
		weightkg: 30.1,
		abilities: {0: 'Corrosion'},
		innates: ['Toxic Chain', 'Prankster', 'Majestic Bird']
	},
	Ogerpon: {
		types: ['Grass'],
		bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
		weightkg: 39.8,
		abilities: {0: 'Prankster'},
		innates: ['Long Reach', 'Overgrow', 'Super Slammer']
	},
	Archaludon: {
		types: ['Steel', 'Dragon'],
		bs: {hp: 90, at: 105, df: 130, sa: 125, sd: 65, sp: 85},
		weightkg: 10.0,
		abilities: {0: 'Light Metal'},
		innates: ['Steel Barrel', 'Mega Launcher', 'Full Metal Body']
	},
	Hydrapple: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 106, at: 80, df: 110, sa: 135, sd: 80, sp: 44},
		weightkg: 10.0,
		abilities: {0: 'Self Sufficient'},
		innates: ['Multi-Headed', 'Shell Armor', 'Super Hot Goo']
	},
	'Gouging Fire': {
		types: ['Fire', 'Dragon'],
		bs: {hp: 105, at: 115, df: 121, sa: 65, sd: 93, sp: 91},
		weightkg: 10.0,
		abilities: {0: 'Battle Armor'},
		innates: ['Protosynthesis', 'Tough Claws', 'Turboblaze']
	},
	'Raging Bolt': {
		types: ['Electric', 'Dragon'],
		bs: {hp: 125, at: 63, df: 91, sa: 137, sd: 99, sp: 75},
		weightkg: 10.0,
		abilities: {0: 'Power Spot'},
		innates: ['Protosynthesis', 'Overwhelm', 'Teravolt']
	},
	'Iron Boulder': {
		types: ['Rock', 'Psychic'],
		bs: {hp: 90, at: 120, df: 80, sa: 68, sd: 108, sp: 124},
		weightkg: 10.0,
		abilities: {0: 'Mold Breaker'},
		innates: ['Quark Drive', 'Keen Edge', 'Solid Rock']
	},
	'Iron Crown': {
		types: ['Steel', 'Psychic'],
		bs: {hp: 90, at: 72, df: 100, sa: 122, sd: 98, sp: 108},
		weightkg: 10.0,
		abilities: {0: 'Competitive'},
		innates: ['Quark Drive', 'Mystic Blades', 'Sweeping Edge']
	},
	Terapagos: {
		types: ['Normal'],
		bs: {hp: 105, at: 105, df: 110, sa: 105, sd: 110, sp: 85},
		weightkg: 10.0,
		abilities: {0: 'Wonder Skin'},
		innates: ['Tera Shell', 'Adaptability', 'Natural Cure']
	},
	Pecharunt: {
		types: ['Poison', 'Ghost'],
		bs: {hp: 88, at: 88, df: 160, sa: 88, sd: 88, sp: 88},
		weightkg: 10.0,
		abilities: {0: 'Merciless'},
		innates: ['Levitate', 'Toxic Chain', 'Poison Puppeteer']
	},
	Phantowl: {
		types: ['Ghost', 'Flying'],
		bs: {hp: 105, at: 60, df: 90, sa: 96, sd: 126, sp: 55},
		weightkg: 63.8,
		abilities: {0: 'Tinted Lens'},
		innates: ['Moon Spirit', 'Wonder Skin', 'Majestic Bird']
	},
	Duelumber: {
		types: ['Rock', 'Fighting'],
		bs: {hp: 90, at: 130, df: 140, sa: 30, sd: 90, sp: 40},
		weightkg: 10.0,
		abilities: {0: 'Raging Boxer'},
		innates: ['Raw Wood', 'Sturdy', 'Juggernaut']
	},
	Escarginite: {
		types: ['Fire', 'Rock'],
		bs: {hp: 90, at: 50, df: 130, sa: 90, sd: 105, sp: 35},
		weightkg: 10.0,
		abilities: {0: 'Simple'},
		innates: ['Molten Down', 'Flash Fire', 'Flame Shield']
	},
	Arachtres: {
		types: ['Bug', 'Poison'],
		bs: {hp: 100, at: 130, df: 80, sa: 60, sd: 80, sp: 100},
		weightkg: 47.0,
		abilities: {0: 'Spider Lair'},
		innates: ['Terrify', 'Menacing Situation', 'Merciless']
	},
	Flairgrance: {
		types: ['Fairy', 'Poison'],
		bs: {hp: 121, at: 72, df: 89, sa: 99, sd: 140, sp: 29},
		weightkg: 27.0,
		abilities: {0: 'Aroma Veil'},
		innates: ['Soothing Aroma', 'Pixilate', 'Fragrant Daze']
	},
	Polartic: {
		types: ['Ice', 'Fighting'],
		bs: {hp: 100, at: 145, df: 90, sa: 45, sd: 80, sp: 90},
		weightkg: 0.0,
		abilities: {0: 'Guts'},
		innates: ['Tough Claws', 'Ice Downfall', 'Predator']
	},
	Arashinne: {
		types: ['Electric', 'Fairy'],
		bs: {hp: 93, at: 58, df: 57, sa: 128, sd: 107, sp: 111},
		weightkg: 7.4,
		abilities: {0: 'Power Spot'},
		innates: ['Electrocytes', 'Gluttony', 'Retriever']
	},
	Dreadnaut: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 100, at: 131, df: 140, sa: 96, sd: 103, sp: 30},
		weightkg: 700.0,
		abilities: {0: 'Steely Spirit'},
		innates: ['Metallic', 'Old Mariner', 'Soul Eater']
	},
	Boarlock: {
		types: ['Psychic'],
		bs: {hp: 120, at: 65, df: 65, sa: 110, sd: 130, sp: 60},
		weightkg: 106.0,
		abilities: {0: 'Headstrong'},
		innates: ['Power Core', 'Thick Fat', 'Fur Coat']
	},
	Heliomodo: {
		types: ['Electric', 'Fire'],
		bs: {hp: 70, at: 61, df: 52, sa: 134, sd: 94, sp: 120},
		weightkg: 51.0,
		abilities: {0: 'Generator'},
		innates: ['Solar Power', 'Electrocytes', 'Shiny Lightning']
	},
	Sopranice: {
		types: ['Ice', 'Psychic'],
		bs: {hp: 75, at: 50, df: 75, sa: 125, sd: 125, sp: 90},
		weightkg: 0.0,
		abilities: {0: 'Snow Song'},
		innates: ['Resonance', 'Beautiful Music', 'Amplifier']
	},
	Beefender: {
		types: ['Bug', 'Flying'],
		bs: {hp: 60, at: 124, df: 60, sa: 78, sd: 60, sp: 112},
		weightkg: 100.0,
		abilities: {0: 'Beast Boost'},
		innates: ['Pressure', 'Mighty Horn', 'Anger Point']
	},
	Salazarus: {
		types: ['Poison', 'Fire'],
		bs: {hp: 85, at: 104, df: 85, sa: 36, sd: 85, sp: 85},
		weightkg: 48.9,
		abilities: {0: 'Supreme Overlord'},
		innates: ['Subdue', 'Half Drake', 'Moxie']
	},
	Gooschase: {
		types: ['Normal'],
		bs: {hp: 98, at: 120, df: 80, sa: 55, sd: 100, sp: 55},
		weightkg: 46.0,
		abilities: {0: 'Restraining Order'},
		innates: ['Overwatch', 'Tough Claws', 'Subdue']
	},
	Lepastry: {
		types: ['Fairy', 'Fighting'],
		bs: {hp: 112, at: 82, df: 99, sa: 96, sd: 96, sp: 65},
		weightkg: 40.0,
		abilities: {0: 'Gladiator'},
		innates: ['Sugar Rush', 'Super Slammer', 'Readied Action']
	},
	Gyaradeath: {
		types: ['Ghost'],
		bs: {hp: 95, at: 110, df: 79, sa: 60, sd: 100, sp: 96},
		weightkg: 0.0,
		abilities: {0: 'Scare'},
		innates: ['Levitate', 'Mold Breaker', 'Vengeful Spirit']
	},
	Tortemple: {
		types: ['Fire'],
		bs: {hp: 90, at: 100, df: 160, sa: 100, sd: 70, sp: 30},
		weightkg: 0.0,
		abilities: {0: 'Stamina'},
		innates: ['Drought', 'Shell Armor', 'Hot Coals']
	},
	Brontonana: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 123, at: 88, df: 82, sa: 123, sd: 84, sp: 100},
		weightkg: 281.0,
		abilities: {0: 'Ripen'},
		innates: ['Big Leaves', 'Immunity', 'Seed Sower']
	},
	Dredwood: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 111, at: 130, df: 106, sa: 85, sd: 92, sp: 76},
		weightkg: 500.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Lumberjack', 'Vengeful Spirit', 'Woodland Curse']
	},
	Corm: {
		types: ['Grass'],
		bs: {hp: 50, at: 45, df: 55, sa: 50, sd: 65, sp: 40},
		weightkg: 3.8,
		abilities: {0: 'Grass Pelt'},
		innates: ['Self Sufficient', 'Harvest', 'Seed Sower']
	},
	Cormoth: {
		types: ['Grass'],
		bs: {hp: 95, at: 50, df: 100, sa: 90, sd: 100, sp: 65},
		weightkg: 0.0,
		abilities: {0: 'Grass Pelt'},
		innates: ['Self Sufficient', 'Harvest', 'Seed Sower']
	},
	Popcorm: {
		types: ['Grass', 'Fire'],
		bs: {hp: 95, at: 110, df: 90, sa: 50, sd: 90, sp: 65},
		weightkg: 0.0,
		abilities: {0: 'Unburden'},
		innates: ['Aerodynamics', 'Levitate', 'Skill Link']
	},
	'Blizzard Maw': {
		types: ['Ice', 'Dark'],
		bs: {hp: 115, at: 133, df: 101, sa: 73, sd: 103, sp: 65},
		weightkg: 0.0,
		abilities: {0: 'Scare'},
		innates: ['Protosynthesis', 'Permafrost', 'Primal Maw']
	},
	'Lumber Sloth': {
		types: ['Fire', 'Grass'],
		bs: {hp: 109, at: 135, df: 91, sa: 85, sd: 89, sp: 61},
		weightkg: 0.0,
		abilities: {0: 'Overcoat'},
		innates: ['Protosynthesis', 'Tough Claws', 'Flammable Coat']
	},
	'Iron Carapace': {
		types: ['Electric', 'Steel'],
		bs: {hp: 92, at: 64, df: 98, sa: 132, sd: 70, sp: 114},
		weightkg: 59.0,
		abilities: {0: 'Coil Up'},
		innates: ['Quark Drive', 'Turboblaze', 'Megabite']
	},
	Magnemous: {
		types: ['Poison', 'Fire'],
		bs: {hp: 80, at: 120, df: 125, sa: 70, sd: 60, sp: 125},
		weightkg: 0.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Pyroclastic Flow', 'Exploit Weakness', 'Venoblaze Pincers']
	},
	Kaiosea: {
		types: ['Water', 'Flying'],
		bs: {hp: 90, at: 122, df: 70, sa: 65, sd: 110, sp: 108},
		weightkg: 92.0,
		abilities: {0: 'Lightning Rod'},
		innates: ['Mighty Horn', 'Water Veil', 'Supreme Overlord']
	},
	Slyduck: {
		types: ['Dark'],
		bs: {hp: 80, at: 156, df: 70, sa: 96, sd: 70, sp: 128},
		weightkg: 0.0,
		abilities: {0: 'Fearmonger'},
		innates: ['From the Shadows', 'Malicious', 'Dark Aura']
	},
	Shyduck: {
		types: ['Dark'],
		bs: {hp: 90, at: 86, df: 86, sa: 86, sd: 86, sp: 86},
		weightkg: 0.0,
		abilities: {0: 'Anger Point'},
		innates: ['Fur Coat', 'Analytic', 'Dark Aura']
	},
	Marbeep: {
		types: ['Bug'],
		bs: {hp: 70, at: 40, df: 45, sa: 65, sd: 45, sp: 30},
		weightkg: 2.3,
		abilities: {0: 'Honey Gather'},
		innates: ['Levitate', 'Fluffy', 'Run Away']
	},
	Fluffbee: {
		types: ['Bug'],
		bs: {hp: 85, at: 55, df: 60, sa: 80, sd: 60, sp: 40},
		weightkg: 9.0,
		abilities: {0: 'Honey Gather'},
		innates: ['Levitate', 'Fluffy', 'Run Away']
	},
	Amphybuzz: {
		types: ['Bug', 'Fairy'],
		bs: {hp: 110, at: 75, df: 90, sa: 115, sd: 90, sp: 50},
		weightkg: 38.7,
		abilities: {0: 'Honey Gather'},
		innates: ['Aerialist', 'Fluffy', 'Pretty Princess']
	},
	Bariong: {
		types: ['Ice', 'Dragon'],
		bs: {hp: 100, at: 100, df: 85, sa: 140, sd: 115, sp: 60},
		weightkg: 0.0,
		abilities: {0: 'Multiscale'},
		innates: ['Ice Scales', 'Ice Cold Hunter', 'Arcane Force']
	},
	Crabruiser: {
		types: ['Fighting', 'Dark'],
		bs: {hp: 107, at: 145, df: 129, sa: 77, sd: 87, sp: 43},
		weightkg: 0.0,
		abilities: {0: 'Denting Blows'},
		innates: ['Spike Armor', 'Jackhammer', 'Battle Armor']
	},
	Phanfernal: {
		types: ['Fire', 'Grass'],
		bs: {hp: 95, at: 78, df: 142, sa: 135, sd: 85, sp: 65},
		weightkg: 68.0,
		abilities: {0: 'Speed Boost'},
		innates: ['Phantom', 'Flash Fire', 'Monster Mash']
	},
	Skulberus: {
		types: ['Dark'],
		bs: {hp: 100, at: 135, df: 90, sa: 60, sd: 80, sp: 115},
		weightkg: 165.0,
		abilities: {0: 'Moxie'},
		innates: ['Nocturnal', 'Guard Dog', 'Shadow Tag']
	},
	Velozel: {
		types: ['Flying'],
		bs: {hp: 95, at: 80, df: 70, sa: 80, sd: 70, sp: 155},
		weightkg: 13.8,
		abilities: {0: 'Impulse'},
		innates: ['Aerodynamics', 'Overcoat', 'Looter']
	},
	'Bewarden-Redux': {
		types: ['Normal', 'Fairy'],
		bs: {hp: 130, at: 120, df: 70, sa: 100, sd: 60, sp: 70},
		weightkg: 6.9,
		abilities: {0: 'No Guard'},
		innates: ['Fluffiest', 'Entrance', 'Cute Charm']
	},
	Bubbleo: {
		types: ['Water', 'Poison'],
		bs: {hp: 72, at: 85, df: 69, sa: 50, sd: 48, sp: 52},
		weightkg: 20.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Predator', 'Nocturnal', 'Moxie']
	},
	Hydroar: {
		types: ['Water', 'Poison'],
		bs: {hp: 100, at: 125, df: 85, sa: 60, sd: 60, sp: 87},
		weightkg: 54.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Predator', 'Nocturnal', 'Moxie']
	},
	Granitun: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 110, at: 100, df: 90, sa: 105, sd: 120, sp: 30},
		weightkg: 0.0,
		abilities: {0: 'Unaware'},
		innates: ['Apple Pie', 'Harvest', 'Thick Fat']
	},
	Fujiflap: {
		types: ['Grass', 'Dragon'],
		bs: {hp: 80, at: 125, df: 85, sa: 85, sd: 60, sp: 120},
		weightkg: 0.0,
		abilities: {0: 'Hustle'},
		innates: ['Aerialist', 'Overwhelm', 'Corrosion']
	},
	'Burmy Eterna': {
		types: ['Bug', 'Poison'],
		bs: {hp: 210, at: 79, df: 205, sa: 255, sd: 205, sp: 86},
		weightkg: 3.4,
		abilities: {0: 'Anticipation'},
		innates: ['Half Drake', 'Rampage', 'Dragon\'s Maw']
	},
	Sagaracas: {
		types: ['Grass'],
		bs: {hp: 90, at: 66, df: 92, sa: 106, sd: 92, sp: 75},
		weightkg: 6.0,
		abilities: {0: 'Chlorophyll'},
		innates: ['Sharp Edges', 'Super Slammer', 'Huge Power']
	},
	Lucineon: {
		types: ['Water', 'Fairy'],
		bs: {hp: 83, at: 69, df: 76, sa: 127, sd: 106, sp: 106},
		weightkg: 45.0,
		abilities: {0: 'Protean'},
		innates: ['Imposing Wings', 'Serene Grace', 'Illuminate']
	},
	Crawdauntless: {
		types: ['Water', 'Dark'],
		bs: {hp: 86, at: 160, df: 105, sa: 75, sd: 77, sp: 65},
		weightkg: 0.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Hyper Cutter', 'Shell Armor', 'Grip Pincer']
	},
	Scrafster: {
		types: ['Dark', 'Fighting'],
		bs: {hp: 90, at: 115, df: 115, sa: 52, sd: 115, sp: 93},
		weightkg: 62.0,
		abilities: {0: 'Combat Specialist'},
		innates: ['Intimidate', 'Rock Head', 'Reckless']
	},
	'Iron Voca': {
		types: ['Steel', 'Normal'],
		bs: {hp: 94, at: 56, df: 120, sa: 112, sd: 70, sp: 118},
		weightkg: 22.6,
		abilities: {0: 'Punk Rock'},
		innates: ['Quark Drive', 'Fairy Tale', 'Amplifier']
	},
	Morpekyll: {
		types: ['Electric', 'Dark'],
		bs: {hp: 87, at: 121, df: 78, sa: 62, sd: 85, sp: 121},
		weightkg: 0.0,
		abilities: {0: 'Gluttony'},
		innates: ['Two-Faced', 'Magic Bounce', 'Lightning Rod']
	},
	Frostula: {
		types: ['Ice', 'Bug'],
		bs: {hp: 85, at: 120, df: 132, sa: 50, sd: 58, sp: 112},
		weightkg: 180.0,
		abilities: {0: 'Ice Body'},
		innates: ['Deep Freeze', 'Rough Skin', 'Snow Warning']
	},
	Dududunsparce: {
		types: ['Normal', 'Ground'],
		bs: {hp: 145, at: 115, df: 80, sa: 120, sd: 85, sp: 55},
		weightkg: 770.0,
		abilities: {0: 'Mighty Horn'},
		innates: ['Super Luck', 'Oblivious', 'Serene Grace']
	},
	'Dududunsparce-Mega': {
		types: ['Normal', 'Ground'],
		bs: {hp: 145, at: 135, df: 100, sa: 140, sd: 105, sp: 75},
		weightkg: 770.0,
		abilities: {0: 'Mighty Horn'},
		innates: ['Super Luck', 'World Serpent', 'Lucky Wings']
	},
	'Ogerpon-Mega': {
		types: ['Grass'],
		bs: {hp: 80, at: 125, df: 104, sa: 80, sd: 106, sp: 155},
		weightkg: 39.8,
		abilities: {0: 'Embody Aspect'},
		innates: ['Defiant', 'Forest Rage', 'Super Slammer']
	},
	'Ogerpon Hearthflame-Mega': {
		types: ['Grass', 'Fire'],
		bs: {hp: 80, at: 135, df: 104, sa: 110, sd: 96, sp: 125},
		weightkg: 39.8,
		abilities: {0: 'Embody Aspect'},
		innates: ['Mold Breaker', 'Hellblaze', 'Super Slammer']
	},
	'Ogerpon Cornerstone-Mega': {
		types: ['Grass', 'Rock'],
		bs: {hp: 80, at: 120, df: 156, sa: 80, sd: 96, sp: 118},
		weightkg: 39.8,
		abilities: {0: 'Embody Aspect'},
		innates: ['Self Repair', 'We Will Rock You', 'Super Slammer']
	},
	'Ogerpon Wellspring': {
		types: ['Grass', 'Water'],
		bs: {hp: 80, at: 120, df: 94, sa: 80, sd: 156, sp: 120},
		weightkg: 39.8,
		abilities: {0: 'Embody Aspect'},
		innates: ['Self Repair', 'Riptide', 'Super Slammer']
	},
	Seerkat: {
		types: ['Normal', 'Ground'],
		bs: {hp: 100, at: 120, df: 79, sa: 90, sd: 79, sp: 67},
		weightkg: 27.0,
		abilities: {0: 'Stakeout'},
		innates: ['Hover', 'Strategic Pause', 'Overrule']
	},
	Tentagrewl: {
		types: ['Water', 'Poison'],
		bs: {hp: 100, at: 80, df: 90, sa: 90, sd: 130, sp: 110},
		weightkg: 55.0,
		abilities: {0: 'Corrosion'},
		innates: ['Poison Touch', 'Neurotoxin', 'Tentalock']
	},
	Cacjack: {
		types: ['Grass', 'Dark'],
		bs: {hp: 80, at: 125, df: 80, sa: 115, sd: 80, sp: 75},
		weightkg: 77.4,
		abilities: {0: 'Tipping Point'},
		innates: ['Ominous Shroud', 'Nocturnal', 'Scarecrow']
	},
	Tyranjoula: {
		types: ['Bug', 'Electric'],
		bs: {hp: 128, at: 77, df: 96, sa: 107, sd: 74, sp: 70},
		weightkg: 14.3,
		abilities: {0: 'Merciless'},
		innates: ['On the Prowl', 'Chokehold', 'Compound Eyes']
	},
	'Crag Hopper': {
		types: ['Rock', 'Ground'],
		bs: {hp: 111, at: 125, df: 119, sa: 69, sd: 101, sp: 45},
		weightkg: 42.4,
		abilities: {0: 'Thick Skin'},
		innates: ['Protosynthesis', 'Solar Flare', 'Magma Armor']
	},
	Dedelibird: {
		types: ['Ice', 'Flying'],
		bs: {hp: 125, at: 65, df: 60, sa: 110, sd: 95, sp: 80},
		weightkg: 16.0,
		abilities: {0: 'Christmas Spirit'},
		innates: ['Magic Guard', 'North Wind', 'Pixilate']
	},
	Krampird: {
		types: ['Ice'],
		bs: {hp: 80, at: 110, df: 70, sa: 80, sd: 70, sp: 125},
		weightkg: 16.0,
		abilities: {0: 'Snow Cloak'},
		innates: ['Devious Present', 'Christmas Nightmare', 'Deviate']
	},
	'Iron Palette': {
		types: ['Normal', 'Psychic'],
		bs: {hp: 114, at: 80, df: 60, sa: 124, sd: 136, sp: 56},
		weightkg: 22.0,
		abilities: {0: 'Protean'},
		innates: ['Quark Drive', 'Mega Launcher', 'Paint Shot']
	},
	Carbonix: {
		types: ['Rock', 'Dragon'],
		bs: {hp: 75, at: 55, df: 75, sa: 105, sd: 200, sp: 20},
		weightkg: 210.0,
		abilities: {0: 'Sand Stream'},
		innates: ['Sturdy', 'Arcane Force', 'Adaptability']
	},
	Wispywaspy: {
		types: ['Bug', 'Ghost'],
		bs: {hp: 50, at: 20, df: 15, sa: 20, sd: 15, sp: 55},
		weightkg: 0.3,
		abilities: {0: 'Shield Dust'},
		innates: ['Locust Swarm', 'Shadow Shield', 'Curse of Famine']
	},
	'Iron Scythe': {
		types: ['Poison', 'Ghost'],
		bs: {hp: 102, at: 126, df: 68, sa: 68, sd: 108, sp: 98},
		weightkg: 6.9,
		abilities: {0: 'Sweeping Edge'},
		innates: ['Quark Drive', 'Power Edge', 'Soul Harvest']
	},
	'Wooly Worm': {
		types: ['Grass', 'Bug'],
		bs: {hp: 181, at: 83, df: 61, sa: 129, sd: 79, sp: 37},
		weightkg: 6.9,
		abilities: {0: 'Sharp Edges'},
		innates: ['Protosynthesis', 'Fluffiest', 'Metallic']
	},
	Heracreus: {
		types: ['Grass', 'Fairy'],
		bs: {hp: 75, at: 100, df: 100, sa: 55, sd: 70, sp: 100},
		weightkg: 6.9,
		abilities: {0: 'Spike Armor'},
		innates: ['Half Drake', 'Mighty Horn', 'Rough Skin']
	},
	Grotom: {
		types: ['Poison'],
		bs: {hp: 70, at: 100, df: 87, sa: 50, sd: 87, sp: 136},
		weightkg: 0.3,
		abilities: {0: 'Scavenger'},
		innates: ['Water Absorb', 'Corrosion', 'Slime Mold']
	},
	Orchestot: {
		types: ['Normal', 'Flying'],
		bs: {hp: 96, at: 72, df: 65, sa: 112, sd: 65, sp: 121},
		weightkg: 6.9,
		abilities: {0: 'Musical Notes'},
		innates: ['Resonance', 'Amplifier', 'Cloud Nine']
	},
	Queengambit: {
		types: ['Dark', 'Steel'],
		bs: {hp: 75, at: 81, df: 60, sa: 125, sd: 90, sp: 119},
		weightkg: 6.9,
		abilities: {0: 'Pressure'},
		innates: ['Supreme Overlord', 'Super Luck', 'Battle Armor']
	},
	Pentadug: {
		types: ['Ground'],
		bs: {hp: 90, at: 120, df: 80, sa: 60, sd: 75, sp: 100},
		weightkg: 6.9,
		abilities: {0: 'Stamina'},
		innates: ['Multi-Headed', 'Earthbound', 'Thick Fat']
	},
	'Crabominable-Mega': {
		types: ['Fighting', 'Ice'],
		bs: {hp: 97, at: 167, df: 132, sa: 62, sd: 127, sp: 33},
		weightkg: 180.0,
		abilities: {0: 'Pressure'},
		innates: ['Abominable Monster', 'Anger Point', 'Arctic Fur']
	},
	Abyssand: {
		types: ['Ghost', 'Ground'],
		bs: {hp: 105, at: 55, df: 75, sa: 135, sd: 115, sp: 45},
		weightkg: 6.9,
		abilities: {0: 'Fort Knox'},
		innates: ['Water Compaction', 'Dune Veil', 'Vengeance']
	},
	Pentawug: {
		types: ['Water'],
		bs: {hp: 70, at: 120, df: 75, sa: 55, sd: 75, sp: 130},
		weightkg: 6.9,
		abilities: {0: 'Accelerate'},
		innates: ['Limber', 'Depth Explorer', 'Multi-Headed']
	},
	Ratiking: {
		types: ['Normal'],
		bs: {hp: 123, at: 113, df: 84, sa: 57, sd: 77, sp: 54},
		weightkg: 6.9,
		abilities: {0: 'King\'s Wrath'},
		innates: ['Minion Control', 'Fort Knox', 'Tangled Tails']
	},
	Ratfioso: {
		types: ['Dark', 'Normal'],
		bs: {hp: 105, at: 96, df: 90, sa: 40, sd: 80, sp: 97},
		weightkg: 6.9,
		abilities: {0: 'Low Blow'},
		innates: ['Turf War', 'Unnerve', 'Greedy']
	},
	Guardozel: {
		types: ['Water'],
		bs: {hp: 90, at: 70, df: 85, sa: 70, sd: 90, sp: 145},
		weightkg: 6.9,
		abilities: {0: 'Friend Guard'},
		innates: ['Stalwart', 'Technician', 'Water Bubble']
	},
	Beniccino: {
		types: ['Normal'],
		bs: {hp: 95, at: 125, df: 60, sa: 70, sd: 75, sp: 105},
		weightkg: 6.9,
		abilities: {0: 'Pixilate'},
		innates: ['Massive Pelt', 'Skill Link', 'Overcoat']
	},
	Bewarden: {
		types: ['Normal', 'Fighting'],
		bs: {hp: 130, at: 135, df: 70, sa: 75, sd: 70, sp: 70},
		weightkg: 6.9,
		abilities: {0: 'Scrappy'},
		innates: ['Fluffiest', 'Adaptability', 'Lumberjack']
	},
	Torrentula: {
		types: ['Water', 'Bug'],
		bs: {hp: 88, at: 94, df: 102, sa: 68, sd: 153, sp: 52},
		weightkg: 6.9,
		abilities: {0: 'Foamy Web'},
		innates: ['Water Bubble', 'Compound Eyes', 'Predator']
	},
	Spindaze: {
		types: ['Normal', 'Poison'],
		bs: {hp: 90, at: 92, df: 78, sa: 92, sd: 78, sp: 110},
		weightkg: 6.9,
		abilities: {0: 'Let\'s Dance'},
		innates: ['Bruiser', 'Cosmic Daze', 'Toxic Spill']
	},
	Blocli: {
		types: ['Normal'],
		bs: {hp: 55, at: 40, df: 65, sa: 40, sd: 60, sp: 25},
		weightkg: 6.9,
		abilities: {0: 'Friend Guard'},
		innates: ['Soundproof', 'Drop Blocks', 'Overcoat']
	},
	Bloxtack: {
		types: ['Normal'],
		bs: {hp: 65, at: 60, df: 80, sa: 50, sd: 75, sp: 25},
		weightkg: 6.9,
		abilities: {0: 'Overcoat'},
		innates: ['Soundproof', 'Drop Blocks', 'Pickup']
	},
	Gargablox: {
		types: ['Normal'],
		bs: {hp: 95, at: 80, df: 110, sa: 80, sd: 110, sp: 25},
		weightkg: 6.9,
		abilities: {0: 'Fort Knox'},
		innates: ['Strong Foundation', 'Drop Blocks', 'Pickup']
	},
	Hippopotato: {
		types: ['Grass', 'Ground'],
		bs: {hp: 78, at: 40, df: 66, sa: 52, sd: 52, sp: 42},
		weightkg: 6.9,
		abilities: {0: 'Intoxicate'},
		innates: ['Raw Wood', 'Earth Eater', 'Natural Cure']
	},
	Hippotaton: {
		types: ['Grass', 'Ground'],
		bs: {hp: 128, at: 55, df: 116, sa: 92, sd: 92, sp: 42},
		weightkg: 6.9,
		abilities: {0: 'Well Baked Body'},
		innates: ['Mashed Potato', 'Earth Eater', 'Seed Sower']
	},
	'Corn Tyrant': {
		types: ['Grass', 'Dragon'],
		bs: {hp: 135, at: 135, df: 135, sa: 55, sd: 55, sp: 55},
		weightkg: 6.9,
		abilities: {0: 'Overcoat'},
		innates: ['Protosynthesis', 'Loose Thorns', 'Seed Sower']
	},
	'Iron Spirals': {
		types: ['Ground', 'Psychic'],
		bs: {hp: 98, at: 68, df: 114, sa: 108, sd: 114, sp: 88},
		weightkg: 6.9,
		abilities: {0: 'Energy Horns'},
		innates: ['Quark Drive', 'Impenetrable', 'Laser Drill']
	},
	'Iron Saber': {
		types: ['Grass', 'Electric'],
		bs: {hp: 102, at: 82, df: 104, sa: 76, sd: 102, sp: 104},
		weightkg: 6.9,
		abilities: {0: 'Intimidate'},
		innates: ['Quark Drive', 'Dual Wield', 'Lightsaber']
	},
	Hypnocroak: {
		types: ['Poison', 'Psychic'],
		bs: {hp: 105, at: 65, df: 100, sa: 75, sd: 90, sp: 95},
		weightkg: 6.9,
		abilities: {0: 'Anticipation'},
		innates: ['Clear Body', 'Dreamcatcher', 'Hypnotic Touch']
	},
	Plundertow: {
		types: ['Ghost', 'Grass'],
		bs: {hp: 83, at: 121, df: 77, sa: 121, sd: 77, sp: 121},
		weightkg: 700.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Metallic', 'Ghost Frenzy', 'Infiltrator']
	},
	'Venusaur-Mega Y': {
		types: ['Grass', 'Poison'],
		bs: {hp: 90, at: 100, df: 123, sa: 122, sd: 120, sp: 80},
		weightkg: 100.0,
		abilities: {0: 'Big Leaves'},
		innates: ['Forest Rage', 'Thick Fat', 'Poison Absorb']
	},
	'Charizard-Mega X': {
		types: ['Fire', 'Dragon'],
		bs: {hp: 79, at: 140, df: 111, sa: 105, sd: 100, sp: 100},
		weightkg: 90.5,
		abilities: {0: 'Tough Claws'},
		innates: ['Hellblaze', 'Levitate', 'Discipline']
	},
	'Charizard-Mega Y': {
		types: ['Fire', 'Flying'],
		bs: {hp: 79, at: 123, df: 78, sa: 140, sd: 115, sp: 100},
		weightkg: 90.5,
		abilities: {0: 'Drought'},
		innates: ['Hellblaze', 'Flash Fire', 'Solar Power']
	},
	'Blastoise-Mega Y': {
		types: ['Water', 'Steel'],
		bs: {hp: 84, at: 103, df: 120, sa: 135, sd: 115, sp: 78},
		weightkg: 85.5,
		abilities: {0: 'Artillery'},
		innates: ['Riptide', 'Shell Armor', 'Mega Launcher']
	},
	'Beedrill-Mega': {
		types: ['Bug', 'Poison'],
		bs: {hp: 65, at: 150, df: 60, sa: 45, sd: 80, sp: 175},
		weightkg: 29.5,
		abilities: {0: 'Adaptability'},
		innates: ['Hyper Aggressive', 'Merciless', 'Levitate']
	},
	'Pidgeot-Mega': {
		types: ['Normal', 'Flying'],
		bs: {hp: 83, at: 80, df: 95, sa: 130, sd: 80, sp: 126},
		weightkg: 39.5,
		abilities: {0: 'No Guard'},
		innates: ['Flock', 'Majestic Bird', 'Giant Wings']
	},
	'Alakazam-Mega': {
		types: ['Psychic'],
		bs: {hp: 55, at: 50, df: 65, sa: 175, sd: 105, sp: 150},
		weightkg: 48.0,
		abilities: {0: 'Mystic Power'},
		innates: ['Psychic Mind', 'Psychic Surge', 'Magic Guard']
	},
	'Slowbro-Mega': {
		types: ['Water', 'Psychic'],
		bs: {hp: 95, at: 75, df: 180, sa: 130, sd: 80, sp: 30},
		weightkg: 78.5,
		abilities: {0: 'Analytic'},
		innates: ['Regenerator', 'Armor Tail', 'Shell Armor']
	},
	'Gengar-Mega Y': {
		types: ['Ghost', 'Poison'],
		bs: {hp: 65, at: 65, df: 80, sa: 170, sd: 95, sp: 130},
		weightkg: 40.5,
		abilities: {0: 'Shadow Tag'},
		innates: ['Vengeance', 'Ectoplasm', 'Early Grave']
	},
	'Kangaskhan-Mega': {
		types: ['Normal'],
		bs: {hp: 105, at: 125, df: 100, sa: 60, sd: 100, sp: 100},
		weightkg: 80.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Parental Bond', 'Scrappy', 'Avenger']
	},
	'Pinsir-Mega': {
		types: ['Bug', 'Flying'],
		bs: {hp: 65, at: 155, df: 120, sa: 65, sd: 90, sp: 105},
		weightkg: 55.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Aerilate', 'Hyper Cutter', 'Grip Pincer']
	},
	'Gyarados-Mega X': {
		types: ['Water', 'Dark'],
		bs: {hp: 95, at: 155, df: 109, sa: 70, sd: 130, sp: 81},
		weightkg: 235.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Aerialist', 'Beast Boost', 'Mold Breaker']
	},
	'Aerodactyl-Mega': {
		types: ['Rock', 'Flying'],
		bs: {hp: 80, at: 135, df: 85, sa: 70, sd: 95, sp: 150},
		weightkg: 59.0,
		abilities: {0: 'Speed Force'},
		innates: ['Fossilized', 'Rock Head', 'Tough Claws']
	},
	'Mewtwo-Mega X': {
		types: ['Psychic', 'Fighting'],
		bs: {hp: 106, at: 190, df: 100, sa: 154, sd: 100, sp: 130},
		weightkg: 122.0,
		abilities: {0: 'Precise Fist'},
		innates: ['Psychic Mind', 'Raging Boxer', 'Fatal Precision']
	},
	'Mewtwo-Mega Y': {
		types: ['Psychic'],
		bs: {hp: 106, at: 150, df: 70, sa: 194, sd: 120, sp: 140},
		weightkg: 122.0,
		abilities: {0: 'Arcane Force'},
		innates: ['Psychic Mind', 'Neuroforce', 'Fatal Precision']
	},
	'Ampharos-Mega': {
		types: ['Electric', 'Dragon'],
		bs: {hp: 110, at: 95, df: 105, sa: 165, sd: 110, sp: 45},
		weightkg: 61.5,
		abilities: {0: 'Overwhelm'},
		innates: ['Fluffy', 'Overcharge', 'Transistor']
	},
	'Steelix-Mega': {
		types: ['Steel', 'Ground'],
		bs: {hp: 75, at: 145, df: 230, sa: 55, sd: 105, sp: 20},
		weightkg: 400.0,
		abilities: {0: 'Primal Armor'},
		innates: ['Lead Coat', 'Impenetrable', 'Strong Jaw']
	},
	'Scizor-Mega': {
		types: ['Bug', 'Steel'],
		bs: {hp: 70, at: 150, df: 140, sa: 65, sd: 100, sp: 75},
		weightkg: 118.0,
		abilities: {0: 'Sniper'},
		innates: ['Tough Claws', 'Hyper Cutter', 'Technician']
	},
	'Heracross-Mega': {
		types: ['Bug', 'Fighting'],
		bs: {hp: 80, at: 185, df: 115, sa: 50, sd: 95, sp: 75},
		weightkg: 54.0,
		abilities: {0: 'Skill Link'},
		innates: ['Hunter\'s Horn', 'Battle Armor', 'Vital Spirit']
	},
	'Houndoom-Mega': {
		types: ['Dark', 'Fire'],
		bs: {hp: 75, at: 110, df: 90, sa: 140, sd: 90, sp: 125},
		weightkg: 35.0,
		abilities: {0: 'Combustion'},
		innates: ['Hyper Aggressive', 'Pyromancy', 'Equinox']
	},
	'Tyranitar-Mega': {
		types: ['Rock', 'Dark'],
		bs: {hp: 100, at: 164, df: 150, sa: 95, sd: 120, sp: 71},
		weightkg: 202.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Juggernaut', 'Battle Armor', 'Power Core']
	},
	'Sceptile-Mega': {
		types: ['Grass', 'Dragon'],
		bs: {hp: 70, at: 145, df: 75, sa: 110, sd: 85, sp: 150},
		weightkg: 52.2,
		abilities: {0: 'Big Leaves'},
		innates: ['Forest Rage', 'Speed Force', 'Keen Edge']
	},
	'Blaziken-Mega': {
		types: ['Fire', 'Fighting'],
		bs: {hp: 85, at: 160, df: 80, sa: 130, sd: 80, sp: 100},
		weightkg: 52.0,
		abilities: {0: 'Speed Boost'},
		innates: ['Hellblaze', 'Roundhouse', 'Striker']
	},
	'Swampert-Mega': {
		types: ['Water', 'Ground'],
		bs: {hp: 100, at: 150, df: 130, sa: 75, sd: 110, sp: 70},
		weightkg: 81.9,
		abilities: {0: 'Breakwater'},
		innates: ['Riptide', 'Iron Fist', 'Regenerator']
	},
	'Gardevoir-Mega': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 68, at: 85, df: 80, sa: 165, sd: 135, sp: 100},
		weightkg: 48.4,
		abilities: {0: 'Pixilate'},
		innates: ['Serene Grace', 'Magic Guard', 'Soul-Heart']
	},
	'Sableye-Mega': {
		types: ['Dark', 'Ghost'],
		bs: {hp: 70, at: 85, df: 130, sa: 85, sd: 120, sp: 20},
		weightkg: 11.0,
		abilities: {0: 'Prankster'},
		innates: ['Haste Makes Waste', 'Magic Bounce', 'Coward']
	},
	'Mawile-Mega': {
		types: ['Steel', 'Fairy'],
		bs: {hp: 70, at: 105, df: 130, sa: 55, sd: 100, sp: 50},
		weightkg: 11.5,
		abilities: {0: 'Huge Power'},
		innates: ['Multi-Headed', 'Hungry Maws', 'Grip Pincer']
	},
	'Aggron-Mega': {
		types: ['Steel'],
		bs: {hp: 70, at: 140, df: 230, sa: 60, sd: 80, sp: 50},
		weightkg: 360.0,
		abilities: {0: 'Juggernaut'},
		innates: ['Lead Coat', 'Primal Armor', 'Impenetrable']
	},
	'Medicham-Mega': {
		types: ['Fighting', 'Psychic'],
		bs: {hp: 60, at: 100, df: 100, sa: 95, sd: 85, sp: 110},
		weightkg: 31.5,
		abilities: {0: 'Huge Power'},
		innates: ['Combat Specialist', 'Enlightened', 'Technician']
	},
	'Manectric-Mega': {
		types: ['Electric'],
		bs: {hp: 70, at: 110, df: 80, sa: 135, sd: 80, sp: 155},
		weightkg: 40.2,
		abilities: {0: 'Generator'},
		innates: ['Intimidate', 'Ground Shock', 'Overcharge']
	},
	'Sharpedo-Mega': {
		types: ['Water', 'Dark'],
		bs: {hp: 70, at: 150, df: 70, sa: 110, sd: 65, sp: 135},
		weightkg: 88.8,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Strong Jaw', 'Speed Force', 'Violent Rush']
	},
	'Camerupt-Mega': {
		types: ['Fire', 'Ground'],
		bs: {hp: 90, at: 120, df: 110, sa: 145, sd: 115, sp: 20},
		weightkg: 220.0,
		abilities: {0: 'Drought'},
		innates: ['Magma Armor', 'Artillery', 'Thick Fat']
	},
	'Altaria-Mega': {
		types: ['Dragon', 'Fairy'],
		bs: {hp: 75, at: 110, df: 110, sa: 110, sd: 105, sp: 100},
		weightkg: 20.6,
		abilities: {0: 'Pixilate'},
		innates: ['Natural Cure', 'Fluffiest', 'Imposing Wings']
	},
	'Banette-Mega': {
		types: ['Ghost', 'Normal'],
		bs: {hp: 84, at: 165, df: 105, sa: 75, sd: 103, sp: 108},
		weightkg: 12.5,
		abilities: {0: 'Soul Linker'},
		innates: ['Intimidate', 'Prankster', 'Soul Eater']
	},
	'Absol-Mega': {
		types: ['Dark', 'Fairy'],
		bs: {hp: 65, at: 175, df: 65, sa: 105, sd: 65, sp: 125},
		weightkg: 47.0,
		abilities: {0: 'Dark Aura'},
		innates: ['Super Luck', 'Keen Edge', 'Magic Guard']
	},
	'Glalie-Mega': {
		types: ['Ice'],
		bs: {hp: 80, at: 130, df: 100, sa: 80, sd: 90, sp: 120},
		weightkg: 256.5,
		abilities: {0: 'Jaws of Carnage'},
		innates: ['Cryo Proficiency', 'Glacial Rage', 'Immovable Object']
	},
	'Salamence-Mega': {
		types: ['Dragon', 'Flying'],
		bs: {hp: 95, at: 145, df: 130, sa: 120, sd: 90, sp: 120},
		weightkg: 102.6,
		abilities: {0: 'Beast Boost'},
		innates: ['Reckless', 'Overwhelm', 'Predator']
	},
	'Metagross-Mega': {
		types: ['Steel', 'Psychic'],
		bs: {hp: 80, at: 150, df: 150, sa: 105, sd: 110, sp: 105},
		weightkg: 550.0,
		abilities: {0: 'Light Metal'},
		innates: ['Tough Claws', 'Full Metal Body', 'Levitate']
	},
	'Latias-Mega': {
		types: ['Dragon', 'Psychic'],
		bs: {hp: 80, at: 100, df: 120, sa: 140, sd: 150, sp: 110},
		weightkg: 40.0,
		abilities: {0: 'Natural Recovery'},
		innates: ['Levitate', 'Prism Armor', 'Mystic Power']
	},
	'Latios-Mega': {
		types: ['Dragon', 'Psychic'],
		bs: {hp: 80, at: 130, df: 100, sa: 160, sd: 120, sp: 110},
		weightkg: 60.0,
		abilities: {0: 'Speed Boost'},
		innates: ['Levitate', 'Multiscale', 'Arcane Force']
	},
	'Lopunny-Mega': {
		types: ['Normal', 'Fighting'],
		bs: {hp: 65, at: 136, df: 74, sa: 64, sd: 96, sp: 135},
		weightkg: 33.3,
		abilities: {0: 'Scrappy'},
		innates: ['Limber', 'Fur Coat', 'Striker']
	},
	'Garchomp-Mega': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 108, at: 160, df: 120, sa: 90, sd: 120, sp: 102},
		weightkg: 95.0,
		abilities: {0: 'Overwhelm'},
		innates: ['Hyper Aggressive', 'Keen Edge', 'Hyper Cutter']
	},
	'Lucario-Mega X': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 70, at: 145, df: 78, sa: 145, sd: 70, sp: 117},
		weightkg: 54.0,
		abilities: {0: 'Iron Fist'},
		innates: ['Inner Focus', 'Adaptability', 'Fighting Spirit']
	},
	'Abomasnow-Mega': {
		types: ['Grass', 'Ice'],
		bs: {hp: 90, at: 142, df: 105, sa: 142, sd: 105, sp: 30},
		weightkg: 135.5,
		abilities: {0: 'North Wind'},
		innates: ['Snow Warning', 'Whiteout', 'Permafrost']
	},
	'Gallade-Mega': {
		types: ['Psychic', 'Fighting'],
		bs: {hp: 68, at: 135, df: 95, sa: 95, sd: 125, sp: 115},
		weightkg: 52.0,
		abilities: {0: 'Intrepid Sword'},
		innates: ['Dual Wield', 'Fatal Precision', 'Avenger']
	},
	'Audino-Mega': {
		types: ['Normal', 'Fairy'],
		bs: {hp: 103, at: 90, df: 126, sa: 90, sd: 126, sp: 50},
		weightkg: 31.0,
		abilities: {0: 'Pastel Veil'},
		innates: ['Pure Love', 'Natural Recovery', 'Triage']
	},
	'Diancie-Mega': {
		types: ['Rock', 'Fairy'],
		bs: {hp: 50, at: 160, df: 110, sa: 160, sd: 110, sp: 110},
		weightkg: 8.8,
		abilities: {0: 'Equinox'},
		innates: ['Solid Rock', 'Levitate', 'Magic Guard']
	},
	'Rayquaza-Mega': {
		types: ['Dragon', 'Flying'],
		bs: {hp: 105, at: 180, df: 100, sa: 180, sd: 100, sp: 115},
		weightkg: 206.5,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Delta Stream', 'Dragon\'s Maw', 'Aerilate']
	},
	'Kyogre Primal': {
		types: ['Water'],
		bs: {hp: 100, at: 150, df: 90, sa: 180, sd: 160, sp: 90},
		weightkg: 352.0,
		abilities: {0: 'Raging Storm'},
		innates: ['Swift Swim', 'Primal Armor', 'Primordial Sea']
	},
	'Groudon Primal': {
		types: ['Ground', 'Fire'],
		bs: {hp: 100, at: 180, df: 160, sa: 150, sd: 90, sp: 90},
		weightkg: 950.0,
		abilities: {0: 'Solar Power'},
		innates: ['Molten Down', 'Primal Armor', 'Desolate Land']
	},
	'Rattata-Alolan': {
		types: ['Dark', 'Normal'],
		bs: {hp: 30, at: 56, df: 35, sa: 25, sd: 35, sp: 72},
		weightkg: 3.5,
		abilities: {0: 'Hustle'},
		innates: ['Cheap Tactics', 'Run Away', 'Thick Fat']
	},
	'Raticate-Alolan': {
		types: ['Dark', 'Normal'],
		bs: {hp: 75, at: 71, df: 70, sa: 40, sd: 80, sp: 77},
		weightkg: 18.5,
		abilities: {0: 'Hustle'},
		innates: ['Jaws of Carnage', 'Opportunist', 'Retriever']
	},
	'Raichu-Alolan': {
		types: ['Electric', 'Psychic'],
		bs: {hp: 60, at: 85, df: 50, sa: 95, sd: 85, sp: 115},
		weightkg: 30.0,
		abilities: {0: 'Psychic Mind'},
		innates: ['Surge Surfer', 'Levitate', 'Ground Shock']
	},
	'Sandshrew-Alolan': {
		types: ['Ice', 'Steel'],
		bs: {hp: 70, at: 75, df: 90, sa: 10, sd: 35, sp: 40},
		weightkg: 12.0,
		abilities: {0: 'Snow Cloak'},
		innates: ['Freezing Point', 'Slush Rush', 'Battle Armor']
	},
	'Sandslash-Alolan': {
		types: ['Ice', 'Steel'],
		bs: {hp: 95, at: 100, df: 120, sa: 25, sd: 65, sp: 65},
		weightkg: 29.5,
		abilities: {0: 'Whiteout'},
		innates: ['Let\'s Roll', 'Tough Claws', 'Iron Barbs']
	},
	'Vulpix-Alolan': {
		types: ['Ice', 'Fairy'],
		bs: {hp: 38, at: 41, df: 40, sa: 60, sd: 65, sp: 65},
		weightkg: 9.9,
		abilities: {0: 'Ice Dew'},
		innates: ['Quick Feet', 'Refrigerate', 'Frozen Soul']
	},
	'Ninetales-Alolan': {
		types: ['Ice', 'Fairy'],
		bs: {hp: 73, at: 67, df: 75, sa: 91, sd: 100, sp: 109},
		weightkg: 19.9,
		abilities: {0: 'Frozen Soul'},
		innates: ['Serene Grace', 'Ice Dew', 'Queenly Majesty']
	},
	'Diglett-Alolan': {
		types: ['Ground', 'Steel'],
		bs: {hp: 10, at: 55, df: 30, sa: 35, sd: 45, sp: 90},
		weightkg: 0.8,
		abilities: {0: 'Sand Rush'},
		innates: ['Tangling Hair', 'Steelworker', 'Ambush']
	},
	'Dugtrio-Alolan': {
		types: ['Ground', 'Steel'],
		bs: {hp: 35, at: 100, df: 60, sa: 50, sd: 70, sp: 110},
		weightkg: 33.3,
		abilities: {0: 'Sand Rush'},
		innates: ['Multi-Headed', 'Sand Force', 'Speed Force']
	},
	'Meowth-Alolan': {
		types: ['Dark'],
		bs: {hp: 40, at: 45, df: 35, sa: 75, sd: 40, sp: 90},
		weightkg: 4.2,
		abilities: {0: 'Pickpocket'},
		innates: ['Cheap Tactics', 'Coward', 'Perfectionist']
	},
	'Persian-Alolan': {
		types: ['Dark'],
		bs: {hp: 65, at: 78, df: 65, sa: 105, sd: 65, sp: 117},
		weightkg: 32.0,
		abilities: {0: 'Fur Coat'},
		innates: ['Coward', 'Prim and Proper', 'Low Blow']
	},
	'Geodude-Alolan': {
		types: ['Rock', 'Electric'],
		bs: {hp: 40, at: 80, df: 75, sa: 30, sd: 40, sp: 35},
		weightkg: 20.0,
		abilities: {0: 'Magnet Pull'},
		innates: ['Let\'s Roll', 'Sturdy', 'Static']
	},
	'Graveler-Alolan': {
		types: ['Rock', 'Electric'],
		bs: {hp: 55, at: 95, df: 90, sa: 45, sd: 60, sp: 45},
		weightkg: 105.0,
		abilities: {0: 'Magnet Pull'},
		innates: ['Let\'s Roll', 'Sturdy', 'Static']
	},
	'Golem-Alolan': {
		types: ['Rock', 'Electric'],
		bs: {hp: 90, at: 135, df: 110, sa: 45, sd: 95, sp: 45},
		weightkg: 300.0,
		abilities: {0: 'Magnet Pull'},
		innates: ['Ground Shock', 'Sturdy', 'Galvanize']
	},
	'Grimer-Alolan': {
		types: ['Poison', 'Dark'],
		bs: {hp: 90, at: 80, df: 55, sa: 40, sd: 55, sp: 25},
		weightkg: 30.0,
		abilities: {0: 'Poison Touch'},
		innates: ['Liquified', 'Corrosion', 'Power of Alchemy']
	},
	'Muk-Alolan': {
		types: ['Poison', 'Dark'],
		bs: {hp: 105, at: 105, df: 85, sa: 65, sd: 110, sp: 50},
		weightkg: 30.0,
		abilities: {0: 'Poison Touch'},
		innates: ['Liquified', 'Corrosion', 'Power of Alchemy']
	},
	'Exeggutor-Alolan': {
		types: ['Grass', 'Dragon'],
		bs: {hp: 95, at: 125, df: 85, sa: 105, sd: 75, sp: 45},
		weightkg: 120.0,
		abilities: {0: 'Sun Basking'},
		innates: ['Long Reach', 'Sun\'s Bounty', 'Multi-Headed']
	},
	'Marowak-Alolan': {
		types: ['Fire', 'Ghost'],
		bs: {hp: 75, at: 80, df: 110, sa: 50, sd: 80, sp: 60},
		weightkg: 45.0,
		abilities: {0: 'Ill Will'},
		innates: ['Bone Zone', 'Early Grave', 'Rock Head']
	},
	'Meowth-Galarian': {
		types: ['Steel'],
		bs: {hp: 50, at: 75, df: 55, sa: 65, sd: 40, sp: 40},
		weightkg: 4.2,
		abilities: {0: 'Sniper'},
		innates: ['Tough Claws', 'Opportunist', 'Perfectionist']
	},
	'Ponyta-Galarian': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 50, at: 85, df: 55, sa: 65, sd: 65, sp: 90},
		weightkg: 30.0,
		abilities: {0: 'Guilt Trip'},
		innates: ['Coward', 'Speed Force', 'Dazzling']
	},
	'Rapidash-Galarian': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 85, at: 110, df: 70, sa: 75, sd: 80, sp: 120},
		weightkg: 95.0,
		abilities: {0: 'Power Edge'},
		innates: ['Mighty Horn', 'Speed Force', 'Dazzling']
	},
	'Slowpoke-Galarian': {
		types: ['Psychic'],
		bs: {hp: 90, at: 65, df: 65, sa: 65, sd: 40, sp: 15},
		weightkg: 36.0,
		abilities: {0: 'Unaware'},
		innates: ['Oblivious', 'Poison Absorb', 'Stall']
	},
	'Slowbro-Galarian': {
		types: ['Poison', 'Psychic'],
		bs: {hp: 95, at: 110, df: 90, sa: 110, sd: 65, sp: 20},
		weightkg: 78.5,
		abilities: {0: 'Unaware'},
		innates: ['Oblivious', 'Quick Draw', 'Stall']
	},
	'Farfetchd-Galarian': {
		types: ['Fighting'],
		bs: {hp: 52, at: 95, df: 55, sa: 58, sd: 62, sp: 55},
		weightkg: 15.0,
		abilities: {0: 'Hyper Cutter'},
		innates: ['Scrappy', 'Sniper', 'Moxie']
	},
	'Weezing-Galarian': {
		types: ['Poison', 'Fairy'],
		bs: {hp: 85, at: 70, df: 120, sa: 95, sd: 90, sp: 60},
		weightkg: 9.5,
		abilities: {0: 'Pressure'},
		innates: ['Levitate', 'Multi-Headed', 'Poison Absorb']
	},
	'Mr Mime-Galarian': {
		types: ['Ice', 'Psychic'],
		bs: {hp: 50, at: 65, df: 65, sa: 90, sd: 90, sp: 100},
		weightkg: 54.5,
		abilities: {0: 'Prankster'},
		innates: ['Screen Cleaner', 'Ice Body', 'Oblivious']
	},
	'Articuno-Galarian': {
		types: ['Psychic', 'Flying'],
		bs: {hp: 90, at: 85, df: 85, sa: 125, sd: 100, sp: 95},
		weightkg: 55.4,
		abilities: {0: 'Serene Grace'},
		innates: ['Aurora Borealis', 'Permafrost', 'Gifted Mind']
	},
	'Zapdos-Galarian': {
		types: ['Fighting', 'Flying'],
		bs: {hp: 90, at: 125, df: 90, sa: 85, sd: 90, sp: 100},
		weightkg: 52.6,
		abilities: {0: 'Defiant'},
		innates: ['Striker', 'Speed Boost', 'Roundhouse']
	},
	'Moltres-Galarian': {
		types: ['Dark', 'Flying'],
		bs: {hp: 90, at: 85, df: 90, sa: 100, sd: 125, sp: 90},
		weightkg: 60.0,
		abilities: {0: 'Bad Luck'},
		innates: ['Dark Aura', 'Shadow Shield', 'Tipping Point']
	},
	'Slowking-Galarian': {
		types: ['Poison', 'Psychic'],
		bs: {hp: 95, at: 65, df: 80, sa: 110, sd: 110, sp: 30},
		weightkg: 79.5,
		abilities: {0: 'Rejection'},
		innates: ['Spiteful', 'Pressure', 'Permanence']
	},
	'Corsola-Galarian': {
		types: ['Ghost'],
		bs: {hp: 60, at: 55, df: 100, sa: 65, sd: 100, sp: 30},
		weightkg: 5.0,
		abilities: {0: 'Perish Body'},
		innates: ['Cursed Body', 'Sturdy', 'Rattled']
	},
	'Zigzagoon-Galarian': {
		types: ['Dark', 'Normal'],
		bs: {hp: 38, at: 60, df: 41, sa: 30, sd: 41, sp: 70},
		weightkg: 17.5,
		abilities: {0: 'Pickup'},
		innates: ['Scrappy', 'Quick Feet', 'Guts']
	},
	'Linoone-Galarian': {
		types: ['Dark', 'Normal'],
		bs: {hp: 78, at: 100, df: 61, sa: 50, sd: 61, sp: 110},
		weightkg: 32.5,
		abilities: {0: 'Pickup'},
		innates: ['Defiant', 'Violent Rush', 'Guts']
	},
	'Darumaka-Galarian': {
		types: ['Ice'],
		bs: {hp: 70, at: 90, df: 45, sa: 15, sd: 45, sp: 50},
		weightkg: 37.5,
		abilities: {0: 'Hustle'},
		innates: ['Heatproof', 'Inner Focus', 'Ice Body']
	},
	'Darmanitan-Galarian': {
		types: ['Ice'],
		bs: {hp: 105, at: 140, df: 65, sa: 50, sd: 65, sp: 95},
		weightkg: 92.9,
		abilities: {0: 'Gorilla Tactics'},
		innates: ['Heatproof', 'Iron Fist', 'Mold Breaker']
	},
	'Yamask-Galarian': {
		types: ['Ground', 'Ghost'],
		bs: {hp: 38, at: 55, df: 85, sa: 30, sd: 65, sp: 30},
		weightkg: 1.5,
		abilities: {0: 'Ill Will'},
		innates: ['Vengeance', 'Cursed Body', 'Haunted Spirit']
	},
	'Stunfisk-Galarian': {
		types: ['Ground', 'Steel'],
		bs: {hp: 109, at: 81, df: 99, sa: 66, sd: 84, sp: 32},
		weightkg: 11.0,
		abilities: {0: 'Clap Trap'},
		innates: ['Mimicry', 'Scrapyard', 'Iron Barbs']
	},
	'Pikachu Cosplay': {
		types: ['Electric', 'Normal'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Pickup', 'Anticipation', 'Unaware']
	},
	'Pikachu Rock Star': {
		types: ['Electric', 'Steel'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Steely Spirit', 'Bulletproof', 'Rhythmic']
	},
	'Pikachu Belle': {
		types: ['Electric', 'Ice'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Deep Freeze', 'Water Absorb', 'Ice Scales']
	},
	'Pikachu Pop Star': {
		types: ['Electric', 'Fairy'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Pixie Power', 'Subdue', 'Serene Grace']
	},
	'Pikachu Ph D': {
		types: ['Electric', 'Psychic'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Psychic Mind', 'Inner Focus', 'Tinted Lens']
	},
	'Pikachu Libre': {
		types: ['Electric', 'Fighting'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Fighter', 'Aerodynamics', 'Scrappy']
	},
	'Pikachu Kanto': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pikachu Hoenn': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pikachu Sinnoh': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pikachu Unova': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pikachu Kalos': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pikachu Alola': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pikachu Partner Cap': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pikachu World': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Pichu Spiky': {
		types: ['Electric'],
		bs: {hp: 20, at: 40, df: 15, sa: 35, sd: 35, sp: 60},
		weightkg: 2.0,
		abilities: {0: 'Electrocytes'},
		innates: ['Short Circuit', 'Plus', 'Ground Shock']
	},
	'Unown B': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown C': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown D': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown E': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown F': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown G': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown H': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown I': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown J': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown K': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown L': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown M': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown N': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown O': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown P': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown Q': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown R': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown S': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown T': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown U': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown V': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown W': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown X': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown Y': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown Z': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown Emark': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Unown Qmark': {
		types: ['Psychic'],
		bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
		weightkg: 5.0,
		abilities: {0: 'Run Away'},
		innates: ['Schooling', 'Levitate', '-------']
	},
	'Castform Sunny': {
		types: ['Fire'],
		bs: {hp: 75, at: 75, df: 75, sa: 105, sd: 75, sp: 110},
		weightkg: 0.8,
		abilities: {0: 'Solar Power'},
		innates: ['Forecast', 'Weather Control', 'Adaptability']
	},
	'Castform Rainy': {
		types: ['Water'],
		bs: {hp: 75, at: 75, df: 75, sa: 105, sd: 75, sp: 110},
		weightkg: 0.8,
		abilities: {0: 'Swift Swim'},
		innates: ['Forecast', 'Weather Control', 'Adaptability']
	},
	'Castform Snowy': {
		types: ['Ice'],
		bs: {hp: 75, at: 75, df: 75, sa: 105, sd: 75, sp: 110},
		weightkg: 0.8,
		abilities: {0: 'Slush Rush'},
		innates: ['Forecast', 'Weather Control', 'Adaptability']
	},
	'Deoxys Attack': {
		types: ['Psychic'],
		bs: {hp: 50, at: 180, df: 20, sa: 180, sd: 20, sp: 150},
		weightkg: 60.8,
		abilities: {0: 'Retriever'},
		innates: ['Berserk DNA', 'Mold Breaker', 'Infiltrator']
	},
	'Deoxys Defense': {
		types: ['Psychic'],
		bs: {hp: 50, at: 70, df: 160, sa: 70, sd: 160, sp: 90},
		weightkg: 60.8,
		abilities: {0: 'Aurora Borealis'},
		innates: ['Fort Knox', 'Stamina', 'Fortitude']
	},
	'Deoxys Speed': {
		types: ['Psychic'],
		bs: {hp: 50, at: 95, df: 90, sa: 95, sd: 90, sp: 180},
		weightkg: 60.8,
		abilities: {0: 'Blur'},
		innates: ['Regenerator', 'Emergency Exit', 'Tactical Retreat']
	},
	'Burmy Sandy': {
		types: ['Bug'],
		bs: {hp: 55, at: 29, df: 60, sa: 59, sd: 60, sp: 36},
		weightkg: 3.4,
		abilities: {0: 'Anticipation'},
		innates: ['Swarm', 'Shed Skin', 'Overcoat']
	},
	'Burmy Trash': {
		types: ['Bug'],
		bs: {hp: 55, at: 29, df: 60, sa: 59, sd: 60, sp: 36},
		weightkg: 3.4,
		abilities: {0: 'Anticipation'},
		innates: ['Swarm', 'Shed Skin', 'Overcoat']
	},
	'Wormadam Sandy': {
		types: ['Bug', 'Ground'],
		bs: {hp: 84, at: 99, df: 105, sa: 59, sd: 85, sp: 36},
		weightkg: 6.5,
		abilities: {0: 'Anticipation'},
		innates: ['Adaptability', 'Battle Armor', 'Sand Veil']
	},
	'Wormadam Trash': {
		types: ['Bug', 'Steel'],
		bs: {hp: 84, at: 69, df: 105, sa: 69, sd: 105, sp: 36},
		weightkg: 6.5,
		abilities: {0: 'Anticipation'},
		innates: ['Adaptability', 'Battle Armor', 'Scrapyard']
	},
	'Cherrim Sunshine': {
		types: ['Grass', 'Fire'],
		bs: {hp: 70, at: 100, df: 70, sa: 100, sd: 78, sp: 85},
		weightkg: 9.3,
		abilities: {0: 'Sun Basking'},
		innates: ['Flower Gift', 'Chlorophyll', 'Leaf Guard']
	},
	'Shellos East': {
		types: ['Water'],
		bs: {hp: 76, at: 48, df: 48, sa: 57, sd: 62, sp: 34},
		weightkg: 6.3,
		abilities: {0: 'Shell Armor'},
		innates: ['Sticky Hold', 'Self Sufficient', 'Limber']
	},
	'Gastrodon East': {
		types: ['Water', 'Ground'],
		bs: {hp: 111, at: 83, df: 68, sa: 92, sd: 82, sp: 39},
		weightkg: 29.9,
		abilities: {0: 'Sand Guard'},
		innates: ['Sticky Hold', 'Self Sufficient', 'Shell Armor']
	},
	'Rotom Heat': {
		types: ['Electric', 'Fire'],
		bs: {hp: 50, at: 65, df: 107, sa: 115, sd: 107, sp: 86},
		weightkg: 0.3,
		abilities: {0: 'Flash Fire'},
		innates: ['Levitate', 'Furnace', 'Phantom']
	},
	'Rotom Wash': {
		types: ['Electric', 'Water'],
		bs: {hp: 50, at: 65, df: 107, sa: 115, sd: 107, sp: 86},
		weightkg: 0.3,
		abilities: {0: 'Water Absorb'},
		innates: ['Levitate', 'Damp', 'Phantom']
	},
	'Rotom Frost': {
		types: ['Electric', 'Ice'],
		bs: {hp: 50, at: 65, df: 107, sa: 115, sd: 107, sp: 86},
		weightkg: 0.3,
		abilities: {0: 'Ice Dew'},
		innates: ['Levitate', 'Refrigerator', 'Phantom']
	},
	'Rotom Fan': {
		types: ['Electric', 'Flying'],
		bs: {hp: 50, at: 65, df: 107, sa: 115, sd: 107, sp: 86},
		weightkg: 0.3,
		abilities: {0: 'Volt Absorb'},
		innates: ['Air Blower', 'Wind Rider', 'Phantom']
	},
	'Rotom Mow': {
		types: ['Electric', 'Grass'],
		bs: {hp: 50, at: 65, df: 107, sa: 115, sd: 107, sp: 86},
		weightkg: 0.3,
		abilities: {0: 'Teravolt'},
		innates: ['Levitate', 'Lawnmower', 'Phantom']
	},
	'Giratina Origin': {
		types: ['Ghost', 'Dragon'],
		bs: {hp: 150, at: 140, df: 120, sa: 140, sd: 120, sp: 110},
		weightkg: 750.0,
		abilities: {0: 'Fearmonger'},
		innates: ['Shadow Shield', 'Shadow Tag', 'Soul Eater']
	},
	'Shaymin Sky': {
		types: ['Grass', 'Flying'],
		bs: {hp: 100, at: 103, df: 75, sa: 120, sd: 75, sp: 127},
		weightkg: 2.1,
		abilities: {0: 'Magic Bounce'},
		innates: ['Natural Cure', 'Serene Grace', 'Speed Boost']
	},
	'Arceus Fighting': {
		types: ['Fighting'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Flying': {
		types: ['Flying'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Poison': {
		types: ['Poison'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Ground': {
		types: ['Ground'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Rock': {
		types: ['Rock'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Bug': {
		types: ['Bug'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Ghost': {
		types: ['Ghost'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Steel': {
		types: ['Steel'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Fire': {
		types: ['Fire'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Water': {
		types: ['Water'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Grass': {
		types: ['Grass'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Electric': {
		types: ['Electric'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Psychic': {
		types: ['Psychic'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Ice': {
		types: ['Ice'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Dragon': {
		types: ['Dragon'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Dark': {
		types: ['Dark'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Arceus Fairy': {
		types: ['Fairy'],
		bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
		weightkg: 320.0,
		abilities: {0: 'Multitype'},
		innates: ['Power Core', 'Pressure', 'Levitate']
	},
	'Basculin Blue': {
		types: ['Water'],
		bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 118},
		weightkg: 18.0,
		abilities: {0: 'Mold Breaker'},
		innates: ['Torrent', 'Adaptability', 'Hyper Aggressive']
	},
	'Darmanitan Zen': {
		types: ['Fire', 'Psychic'],
		bs: {hp: 105, at: 35, df: 95, sa: 140, sd: 95, sp: 50},
		weightkg: 92.9,
		abilities: {0: 'Sheer Force'},
		innates: ['Enlightened', 'Impenetrable', 'Psychic Mind']
	},
	'Darmanitan Zen Mode-Galarian': {
		types: ['Ice', 'Fire'],
		bs: {hp: 105, at: 120, df: 60, sa: 35, sd: 60, sp: 140},
		weightkg: 92.9,
		abilities: {0: 'Gorilla Tactics'},
		innates: ['Heatproof', 'Iron Fist', 'Turboblaze']
	},
	'Deerling Summer': {
		types: ['Normal', 'Grass'],
		bs: {hp: 60, at: 60, df: 50, sa: 40, sd: 50, sp: 75},
		weightkg: 19.5,
		abilities: {0: 'Chlorophyll'},
		innates: ['Overgrow', 'Violent Rush', 'Sap Sipper']
	},
	'Deerling Autumn': {
		types: ['Normal', 'Grass'],
		bs: {hp: 60, at: 60, df: 50, sa: 40, sd: 50, sp: 75},
		weightkg: 19.5,
		abilities: {0: 'Chlorophyll'},
		innates: ['Overgrow', 'Violent Rush', 'Sap Sipper']
	},
	'Deerling Winter': {
		types: ['Normal', 'Grass'],
		bs: {hp: 60, at: 60, df: 50, sa: 40, sd: 50, sp: 75},
		weightkg: 19.5,
		abilities: {0: 'Chlorophyll'},
		innates: ['Overgrow', 'Violent Rush', 'Sap Sipper']
	},
	'Sawsbuck Summer': {
		types: ['Normal', 'Grass'],
		bs: {hp: 80, at: 100, df: 70, sa: 60, sd: 70, sp: 95},
		weightkg: 92.5,
		abilities: {0: 'Adaptability'},
		innates: ['Mighty Horn', 'Violent Rush', 'Elude']
	},
	'Sawsbuck Autumn': {
		types: ['Normal', 'Grass'],
		bs: {hp: 80, at: 100, df: 70, sa: 60, sd: 70, sp: 95},
		weightkg: 92.5,
		abilities: {0: 'Adaptability'},
		innates: ['Mighty Horn', 'Violent Rush', 'Elude']
	},
	'Sawsbuck Winter': {
		types: ['Normal', 'Grass'],
		bs: {hp: 80, at: 100, df: 70, sa: 60, sd: 70, sp: 95},
		weightkg: 92.5,
		abilities: {0: 'Adaptability'},
		innates: ['Mighty Horn', 'Violent Rush', 'Elude']
	},
	'Tornadus Therian': {
		types: ['Flying'],
		bs: {hp: 79, at: 100, df: 80, sa: 110, sd: 90, sp: 121},
		weightkg: 63.0,
		abilities: {0: 'Airborne'},
		innates: ['Regenerator', 'Weather Control', 'Keen Eye']
	},
	'Thundurus Therian': {
		types: ['Electric', 'Flying'],
		bs: {hp: 79, at: 105, df: 70, sa: 145, sd: 80, sp: 101},
		weightkg: 61.0,
		abilities: {0: 'Transistor'},
		innates: ['Teravolt', 'Weather Control', 'Volt Absorb']
	},
	'Landorus Therian': {
		types: ['Ground', 'Flying'],
		bs: {hp: 89, at: 145, df: 90, sa: 105, sd: 80, sp: 91},
		weightkg: 68.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Sand Stream', 'Weather Control', 'Intimidate']
	},
	'Kyurem White': {
		types: ['Dragon', 'Ice'],
		bs: {hp: 125, at: 120, df: 90, sa: 170, sd: 100, sp: 95},
		weightkg: 325.0,
		abilities: {0: 'Beast Boost'},
		innates: ['Turboblaze', 'Permafrost', 'Whiteout']
	},
	'Kyurem Black': {
		types: ['Dragon', 'Ice'],
		bs: {hp: 125, at: 170, df: 100, sa: 120, sd: 90, sp: 95},
		weightkg: 325.0,
		abilities: {0: 'Beast Boost'},
		innates: ['Teravolt', 'Permafrost', 'Multiscale']
	},
	'Keldeo Resolute': {
		types: ['Water', 'Fighting'],
		bs: {hp: 91, at: 117, df: 70, sa: 129, sd: 70, sp: 123},
		weightkg: 48.5,
		abilities: {0: 'Blade\'s Essence'},
		innates: ['Fighter', 'Arcane Force', 'Riptide']
	},
	'Meloetta Pirouette': {
		types: ['Normal', 'Fighting'],
		bs: {hp: 100, at: 128, df: 90, sa: 77, sd: 77, sp: 128},
		weightkg: 6.5,
		abilities: {0: 'Egoist'},
		innates: ['Serene Grace', 'Speed Force', 'Combat Specialist']
	},
	'Genesect Douse Drive': {
		types: ['Bug', 'Steel'],
		bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
		weightkg: 82.5,
		abilities: {0: 'Download'},
		innates: ['Full Metal Body', 'Predator', 'Mega Launcher']
	},
	'Genesect Shock Drive': {
		types: ['Bug', 'Steel'],
		bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
		weightkg: 82.5,
		abilities: {0: 'Download'},
		innates: ['Full Metal Body', 'Predator', 'Mega Launcher']
	},
	'Genesect Burn Drive': {
		types: ['Bug', 'Steel'],
		bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
		weightkg: 82.5,
		abilities: {0: 'Download'},
		innates: ['Full Metal Body', 'Predator', 'Mega Launcher']
	},
	'Genesect Chill Drive': {
		types: ['Bug', 'Steel'],
		bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
		weightkg: 82.5,
		abilities: {0: 'Download'},
		innates: ['Full Metal Body', 'Predator', 'Mega Launcher']
	},
	'Greninja Battle Bond': {
		types: ['Water', 'Dark'],
		bs: {hp: 72, at: 100, df: 67, sa: 103, sd: 71, sp: 122},
		weightkg: 40.0,
		abilities: {0: 'Smokey Maneuvers'},
		innates: ['Torrent', 'Skill Link', 'Battle Bond']
	},
	'Ash-Greninja': {
		types: ['Water', 'Dark'],
		bs: {hp: 72, at: 150, df: 67, sa: 153, sd: 71, sp: 132},
		weightkg: 40.0,
		abilities: {0: 'Surprise!'},
		innates: ['Riptide', 'Skill Link', 'Battle Bond']
	},
	'Vivillon Polar': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Tundra': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Continental': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Gardens': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Elegant': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Meadow': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Modern': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Marine': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Archipelago': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon High Plains': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Sandstorm': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon River': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Monsoon': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Savanna': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Sun': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Ocean': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Jungle': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Fancy': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Vivillon Pokéball': {
		types: ['Bug', 'Flying'],
		bs: {hp: 85, at: 51, df: 65, sa: 110, sd: 65, sp: 109},
		weightkg: 17.0,
		abilities: {0: 'Multiscale'},
		innates: ['Powder Burst', 'Compound Eyes', 'Aerialist']
	},
	'Flabebe Yellow': {
		types: ['Fairy'],
		bs: {hp: 54, at: 38, df: 59, sa: 61, sd: 79, sp: 32},
		weightkg: 0.1,
		abilities: {0: 'Flower Veil'},
		innates: ['Natural Cure', 'Aroma Veil', 'Flower Gift']
	},
	'Flabebe Orange': {
		types: ['Fairy'],
		bs: {hp: 54, at: 38, df: 59, sa: 61, sd: 79, sp: 32},
		weightkg: 0.1,
		abilities: {0: 'Flower Veil'},
		innates: ['Natural Cure', 'Aroma Veil', 'Flower Gift']
	},
	'Flabebe Blue': {
		types: ['Fairy'],
		bs: {hp: 54, at: 38, df: 59, sa: 61, sd: 79, sp: 32},
		weightkg: 0.1,
		abilities: {0: 'Flower Veil'},
		innates: ['Natural Cure', 'Aroma Veil', 'Flower Gift']
	},
	'Flabebe White': {
		types: ['Fairy'],
		bs: {hp: 54, at: 38, df: 59, sa: 61, sd: 79, sp: 32},
		weightkg: 0.1,
		abilities: {0: 'Flower Veil'},
		innates: ['Natural Cure', 'Aroma Veil', 'Flower Gift']
	},
	'Floette Yellow': {
		types: ['Fairy'],
		bs: {hp: 64, at: 45, df: 67, sa: 75, sd: 98, sp: 42},
		weightkg: 0.9,
		abilities: {0: 'Flower Veil'},
		innates: ['Pastel Veil', 'Regenerator', 'Water Veil']
	},
	'Floette Orange': {
		types: ['Fairy'],
		bs: {hp: 64, at: 45, df: 67, sa: 75, sd: 98, sp: 42},
		weightkg: 0.9,
		abilities: {0: 'Flower Veil'},
		innates: ['Pastel Veil', 'Regenerator', 'Water Veil']
	},
	'Floette Blue': {
		types: ['Fairy'],
		bs: {hp: 64, at: 45, df: 67, sa: 75, sd: 98, sp: 42},
		weightkg: 0.9,
		abilities: {0: 'Flower Veil'},
		innates: ['Pastel Veil', 'Regenerator', 'Water Veil']
	},
	'Floette White': {
		types: ['Fairy'],
		bs: {hp: 64, at: 45, df: 67, sa: 75, sd: 98, sp: 42},
		weightkg: 0.9,
		abilities: {0: 'Flower Veil'},
		innates: ['Pastel Veil', 'Regenerator', 'Water Veil']
	},
	'Floette Eternal Flower': {
		types: ['Fairy'],
		bs: {hp: 74, at: 65, df: 67, sa: 125, sd: 128, sp: 92},
		weightkg: 0.9,
		abilities: {0: 'Energy Tap'},
		innates: ['Pastel Veil', 'Magic Guard', 'Mystic Power']
	},
	'Florges Yellow': {
		types: ['Fairy'],
		bs: {hp: 88, at: 55, df: 88, sa: 112, sd: 154, sp: 55},
		weightkg: 10.0,
		abilities: {0: 'Harvest'},
		innates: ['Natural Cure', 'Regenerator', 'Self Sufficient']
	},
	'Florges Orange': {
		types: ['Fairy'],
		bs: {hp: 88, at: 55, df: 88, sa: 112, sd: 154, sp: 55},
		weightkg: 10.0,
		abilities: {0: 'Harvest'},
		innates: ['Natural Cure', 'Regenerator', 'Self Sufficient']
	},
	'Florges Blue': {
		types: ['Fairy'],
		bs: {hp: 88, at: 55, df: 88, sa: 112, sd: 154, sp: 55},
		weightkg: 10.0,
		abilities: {0: 'Harvest'},
		innates: ['Natural Cure', 'Regenerator', 'Self Sufficient']
	},
	'Florges White': {
		types: ['Fairy'],
		bs: {hp: 88, at: 55, df: 88, sa: 112, sd: 154, sp: 55},
		weightkg: 10.0,
		abilities: {0: 'Harvest'},
		innates: ['Natural Cure', 'Regenerator', 'Self Sufficient']
	},
	'Furfrou Heart': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Entrance'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou Star': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Wonder Skin'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou Diamond': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Solid Rock'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou Debutante': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Soothing Aroma'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou Matron': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Hospitality'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou Dandy': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Moxie'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou La Reine': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Queenly Majesty'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou Kabuki': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Cloud Nine'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Furfrou Pharaoh': {
		types: ['Normal'],
		bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
		weightkg: 28.0,
		abilities: {0: 'Sand Guard'},
		innates: ['Fur Coat', 'Overcoat', 'Guard Dog']
	},
	'Meowstic Female': {
		types: ['Psychic'],
		bs: {hp: 84, at: 48, df: 76, sa: 103, sd: 81, sp: 104},
		weightkg: 8.5,
		abilities: {0: 'Sage Power'},
		innates: ['Psychic Mind', 'Competitive', 'Hyper Aggressive']
	},
	'Aegislash Blade': {
		types: ['Steel', 'Ghost'],
		bs: {hp: 60, at: 140, df: 50, sa: 140, sd: 50, sp: 60},
		weightkg: 53.0,
		abilities: {0: 'Shadow Shield'},
		innates: ['Levitate', 'Keen Edge', 'Stance Change']
	},
	'Pumpkaboo Small': {
		types: ['Ghost', 'Grass'],
		bs: {hp: 49, at: 44, df: 70, sa: 66, sd: 55, sp: 51},
		weightkg: 5.0,
		abilities: {0: 'Frisk'},
		innates: ['Insomnia', 'Cursed Body', 'Haunted Spirit']
	},
	'Pumpkaboo Large': {
		types: ['Ghost', 'Grass'],
		bs: {hp: 49, at: 44, df: 70, sa: 66, sd: 55, sp: 51},
		weightkg: 5.0,
		abilities: {0: 'Frisk'},
		innates: ['Insomnia', 'Cursed Body', 'Haunted Spirit']
	},
	'Pumpkaboo Super': {
		types: ['Ghost', 'Grass'],
		bs: {hp: 49, at: 44, df: 70, sa: 66, sd: 55, sp: 51},
		weightkg: 5.0,
		abilities: {0: 'Frisk'},
		innates: ['Insomnia', 'Cursed Body', 'Haunted Spirit']
	},
	'Gourgeist Small': {
		types: ['Ghost', 'Grass'],
		bs: {hp: 55, at: 58, df: 122, sa: 85, sd: 75, sp: 99},
		weightkg: 12.5,
		abilities: {0: 'Flare Boost'},
		innates: ['Insomnia', 'Cursed Body', 'Haunted Spirit']
	},
	'Gourgeist Large': {
		types: ['Ghost', 'Grass'],
		bs: {hp: 75, at: 58, df: 122, sa: 95, sd: 75, sp: 69},
		weightkg: 12.5,
		abilities: {0: 'Flare Boost'},
		innates: ['Insomnia', 'Cursed Body', 'Haunted Spirit']
	},
	'Gourgeist Super': {
		types: ['Ghost', 'Grass'],
		bs: {hp: 85, at: 58, df: 122, sa: 100, sd: 75, sp: 54},
		weightkg: 12.5,
		abilities: {0: 'Flare Boost'},
		innates: ['Insomnia', 'Cursed Body', 'Haunted Spirit']
	},
	'Xerneas Active': {
		types: ['Fairy'],
		bs: {hp: 126, at: 131, df: 95, sa: 131, sd: 98, sp: 99},
		weightkg: 215.0,
		abilities: {0: 'Pixilate'},
		innates: ['Fairy Aura', 'Illuminate', 'Soul-Heart']
	},
	'Zygarde 10': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 74, at: 120, df: 71, sa: 61, sd: 85, sp: 115},
		weightkg: 305.0,
		abilities: {0: 'Aura Break'},
		innates: ['Primal Maw', 'Earthbound', 'Speed Force']
	},
	'Zygarde 10 Power Construct': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 74, at: 120, df: 71, sa: 61, sd: 85, sp: 115},
		weightkg: 305.0,
		abilities: {0: 'Aura Break'},
		innates: ['Primal Maw', 'Earthbound', 'Speed Force']
	},
	'Zygarde 50 Power Construct': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 108, at: 100, df: 121, sa: 81, sd: 95, sp: 95},
		weightkg: 305.0,
		abilities: {0: 'Aura Break'},
		innates: ['Primal Armor', 'Earthbound', 'Power Core']
	},
	'Zygarde Complete': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 216, at: 100, df: 121, sa: 91, sd: 95, sp: 85},
		weightkg: 305.0,
		abilities: {0: 'Power Construct'},
		innates: ['Primal Armor', 'Earthbound', 'Power Core']
	},
	'Hoopa Unbound': {
		types: ['Psychic', 'Dark'],
		bs: {hp: 80, at: 170, df: 60, sa: 160, sd: 130, sp: 80},
		weightkg: 9.0,
		abilities: {0: 'Intimidate'},
		innates: ['Soul Eater', 'Hyper Aggressive', 'Infiltrator']
	},
	'Oricorio Pom Pom': {
		types: ['Electric', 'Flying'],
		bs: {hp: 75, at: 70, df: 70, sa: 108, sd: 70, sp: 103},
		weightkg: 3.4,
		abilities: {0: 'Dancer'},
		innates: ['Serene Grace', 'Lightning Rod', 'Flock']
	},
	'Oricorio Pau': {
		types: ['Psychic', 'Flying'],
		bs: {hp: 75, at: 70, df: 70, sa: 108, sd: 70, sp: 103},
		weightkg: 3.4,
		abilities: {0: 'Dancer'},
		innates: ['Serene Grace', 'Psychic Mind', 'Flock']
	},
	'Oricorio Sensu': {
		types: ['Ghost', 'Flying'],
		bs: {hp: 75, at: 70, df: 70, sa: 108, sd: 70, sp: 103},
		weightkg: 3.4,
		abilities: {0: 'Dancer'},
		innates: ['Serene Grace', 'Phantom Pain', 'Flock']
	},
	'Rockruff Own Tempo': {
		types: ['Rock'],
		bs: {hp: 45, at: 65, df: 40, sa: 30, sd: 40, sp: 60},
		weightkg: 9.2,
		abilities: {0: 'Own Tempo'},
		innates: ['Keen Eye', 'Opportunist', 'Rock Head']
	},
	'Lycanroc Midnight': {
		types: ['Rock', 'Dark'],
		bs: {hp: 85, at: 115, df: 75, sa: 55, sd: 75, sp: 82},
		weightkg: 25.0,
		abilities: {0: 'Tough Claws'},
		innates: ['No Guard', 'Nocturnal', 'Hyper Aggressive']
	},
	'Lycanroc Dusk': {
		types: ['Rock', 'Fighting'],
		bs: {hp: 75, at: 117, df: 65, sa: 55, sd: 65, sp: 110},
		weightkg: 25.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Opportunist', 'Fatal Precision', 'Rock Head']
	},
	'Wishiwashi School': {
		types: ['Water'],
		bs: {hp: 45, at: 140, df: 130, sa: 140, sd: 135, sp: 30},
		weightkg: 0.3,
		abilities: {0: 'Water Veil'},
		innates: ['Schooling', 'Regenerator', 'Multiscale']
	},
	'Silvally Fighting': {
		types: ['Fighting'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Inner Focus']
	},
	'Silvally Flying': {
		types: ['Flying'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Aerialist']
	},
	'Silvally Poison': {
		types: ['Poison'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Poison Point']
	},
	'Silvally Ground': {
		types: ['Ground'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Earth Eater']
	},
	'Silvally Rock': {
		types: ['Rock'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Mountaineer']
	},
	'Silvally Bug': {
		types: ['Bug'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Predator']
	},
	'Silvally Ghost': {
		types: ['Ghost'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Cursed Body']
	},
	'Silvally Steel': {
		types: ['Steel'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Armor Tail']
	},
	'Silvally Fire': {
		types: ['Fire'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Flash Fire']
	},
	'Silvally Water': {
		types: ['Water'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Storm Drain']
	},
	'Silvally Grass': {
		types: ['Grass'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Raw Wood']
	},
	'Silvally Electric': {
		types: ['Electric'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Lightning Rod']
	},
	'Silvally Psychic': {
		types: ['Psychic'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Magic Bounce']
	},
	'Silvally Ice': {
		types: ['Ice'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Freezing Point']
	},
	'Silvally Dragon': {
		types: ['Dragon'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Overwhelm']
	},
	'Silvally Dark': {
		types: ['Dark'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Justified']
	},
	'Silvally Fairy': {
		types: ['Fairy'],
		bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
		weightkg: 100.5,
		abilities: {0: 'Unaware'},
		innates: ['RKS System', 'Primal Armor', 'Regenerator']
	},
	'Minior Orange': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
		weightkg: 40.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shields Down', 'Shell Armor', 'Overcoat']
	},
	'Minior Yellow': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
		weightkg: 40.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shields Down', 'Shell Armor', 'Overcoat']
	},
	'Minior Green': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
		weightkg: 40.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shields Down', 'Shell Armor', 'Overcoat']
	},
	'Minior Blue': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
		weightkg: 40.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shields Down', 'Shell Armor', 'Overcoat']
	},
	'Minior Indigo': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
		weightkg: 40.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shields Down', 'Shell Armor', 'Overcoat']
	},
	'Minior Violet': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
		weightkg: 40.0,
		abilities: {0: 'Regenerator'},
		innates: ['Shields Down', 'Shell Armor', 'Overcoat']
	},
	'Minior Core Red': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
		weightkg: 40.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Shields Down', 'Equinox', 'Frisk']
	},
	'Minior Core Orange': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
		weightkg: 40.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Shields Down', 'Equinox', 'Frisk']
	},
	'Minior Core Yellow': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
		weightkg: 40.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Shields Down', 'Equinox', 'Frisk']
	},
	'Minior Core Green': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
		weightkg: 40.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Shields Down', 'Equinox', 'Frisk']
	},
	'Minior Core Blue': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
		weightkg: 40.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Shields Down', 'Equinox', 'Frisk']
	},
	'Minior Core Indigo': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
		weightkg: 40.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Shields Down', 'Equinox', 'Frisk']
	},
	'Minior Core Violet': {
		types: ['Rock', 'Flying'],
		bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
		weightkg: 40.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Shields Down', 'Equinox', 'Frisk']
	},
	'Mimikyu Busted': {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
		weightkg: 0.7,
		abilities: {0: 'Ethereal Rush'},
		innates: ['Disguise', 'Violent Rush', 'Phantom Pain']
	},
	'Dusk Mane': {
		types: ['Psychic', 'Steel'],
		bs: {hp: 97, at: 157, df: 127, sa: 113, sd: 109, sp: 77},
		weightkg: 230.0,
		abilities: {0: 'Neuroforce'},
		innates: ['Solar Flare', 'Impenetrable', 'Prism Armor']
	},
	'Dawn Wings': {
		types: ['Psychic', 'Ghost'],
		bs: {hp: 97, at: 113, df: 109, sa: 157, sd: 127, sp: 77},
		weightkg: 230.0,
		abilities: {0: 'Neuroforce'},
		innates: ['Lunar Eclipse', 'Shadow Shield', 'Levitate']
	},
	'Necrozma Ultra': {
		types: ['Psychic', 'Dragon'],
		bs: {hp: 97, at: 167, df: 109, sa: 167, sd: 109, sp: 131},
		weightkg: 230.0,
		abilities: {0: 'Soul Eater'},
		innates: ['Beast Boost', 'Neuroforce', 'Levitate']
	},
	'Magearna Original': {
		types: ['Steel', 'Fairy'],
		bs: {hp: 80, at: 95, df: 115, sa: 130, sd: 115, sp: 65},
		weightkg: 80.5,
		abilities: {0: 'Steelworker'},
		innates: ['Mirror Armor', 'Soul-Heart', 'Power Core']
	},
	'Cramorant Gulping': {
		types: ['Flying', 'Water'],
		bs: {hp: 75, at: 90, df: 85, sa: 90, sd: 95, sp: 85},
		weightkg: 18.0,
		abilities: {0: 'Predator'},
		innates: ['Gulp Missile', 'Water Veil', 'Field Explorer']
	},
	'Cramorant Gorging': {
		types: ['Flying', 'Water'],
		bs: {hp: 75, at: 90, df: 85, sa: 90, sd: 95, sp: 85},
		weightkg: 18.0,
		abilities: {0: 'Predator'},
		innates: ['Gulp Missile', 'Transistor', 'Field Explorer']
	},
	'Toxtricity Low Key': {
		types: ['Electric', 'Poison'],
		bs: {hp: 75, at: 75, df: 70, sa: 114, sd: 70, sp: 98},
		weightkg: 40.0,
		abilities: {0: 'Technician'},
		innates: ['Punk Rock', 'Loud Bang', 'Water Absorb']
	},
	'Sinistea Antique': {
		types: ['Ghost'],
		bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
		weightkg: 0.2,
		abilities: {0: 'Weak Armor'},
		innates: ['-------', '-------', '-------']
	},
	'Polteageist Antique': {
		types: ['Ghost'],
		bs: {hp: 60, at: 65, df: 65, sa: 134, sd: 114, sp: 70},
		weightkg: 0.4,
		abilities: {0: 'Weak Armor'},
		innates: ['-------', '-------', '-------']
	},
	'Alcremie Ruby': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Alcremie Matcha': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Alcremie Mint': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Alcremie Lemon': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Alcremie Salted': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Alcremie Ruby Swirl': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Alcremie Caramel': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Alcremie Rainbow': {
		types: ['Fairy'],
		bs: {hp: 75, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
		weightkg: 0.5,
		abilities: {0: 'Gooey'},
		innates: ['Fluffy', 'Aroma Veil', 'Self Sufficient']
	},
	'Eiscue Noice Face': {
		types: ['Ice'],
		bs: {hp: 85, at: 100, df: 70, sa: 65, sd: 55, sp: 135},
		weightkg: 89.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Ice Face', 'Antarctic Bird', 'Amphibious']
	},
	'Indeedee Female': {
		types: ['Psychic', 'Normal'],
		bs: {hp: 70, at: 55, df: 75, sa: 95, sd: 115, sp: 85},
		weightkg: 28.0,
		abilities: {0: 'Hospitality'},
		innates: ['Telekinetic', 'Friend Guard', 'Fluffy']
	},
	'Morpeko Hangry': {
		types: ['Electric', 'Dark'],
		bs: {hp: 67, at: 101, df: 87, sa: 58, sd: 57, sp: 101},
		weightkg: 3.0,
		abilities: {0: 'Doom Blast'},
		innates: ['HungerSwitch', 'Gluttony', 'Lightning Rod']
	},
	'Zacian Crowned': {
		types: ['Fairy', 'Steel'],
		bs: {hp: 92, at: 170, df: 115, sa: 80, sd: 115, sp: 148},
		weightkg: 110.0,
		abilities: {0: 'Crowned Sword'},
		innates: ['Steelworker', 'Battle Armor', 'Keen Edge']
	},
	'Zamazenta Crowned': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 92, at: 110, df: 155, sa: 80, sd: 155, sp: 128},
		weightkg: 210.0,
		abilities: {0: 'Crowned Shield'},
		innates: ['Steelworker', 'Battle Armor', 'Lead Coat']
	},
	'Eternatus Primal': {
		types: ['Poison', 'Dragon'],
		bs: {hp: 140, at: 105, df: 105, sa: 185, sd: 115, sp: 140},
		weightkg: 950.0,
		abilities: {0: 'Corrosion'},
		innates: ['Levitate', 'Master Hand', 'Primal Armor']
	},
	'Urshifu Rapid Strike Style': {
		types: ['Fighting', 'Water'],
		bs: {hp: 90, at: 140, df: 100, sa: 60, sd: 60, sp: 110},
		weightkg: 105.0,
		abilities: {0: 'Fatal Precision'},
		innates: ['Unseen Fist', 'Combat Specialist', 'Precise Fist']
	},
	'Zarude Dada': {
		types: ['Fairy', 'Grass'],
		bs: {hp: 105, at: 100, df: 105, sa: 70, sd: 115, sp: 105},
		weightkg: 70.0,
		abilities: {0: 'Parental Bond'},
		innates: ['Friend Guard', 'Jungle\'s Guard', 'Overgrow']
	},
	'Calyrex Ice Rider': {
		types: ['Psychic', 'Ice'],
		bs: {hp: 100, at: 165, df: 150, sa: 85, sd: 130, sp: 50},
		weightkg: 7.7,
		abilities: {0: 'As One'},
		innates: ['Permafrost', 'Stamina', 'Whiteout']
	},
	'Calyrex Shadow Rider': {
		types: ['Psychic', 'Ghost'],
		bs: {hp: 100, at: 85, df: 80, sa: 165, sd: 100, sp: 150},
		weightkg: 7.7,
		abilities: {0: 'As One'},
		innates: ['Shadow Shield', 'Fearmonger', 'Speed Boost']
	},
	'Qwilfish-Hisuian': {
		types: ['Dark', 'Poison'],
		bs: {hp: 65, at: 95, df: 85, sa: 55, sd: 55, sp: 85},
		weightkg: 3.9,
		abilities: {0: 'Water Veil'},
		innates: ['Merciless', 'Aftermath', 'Toxic Debris']
	},
	'Growlithe-Hisuian': {
		types: ['Fire', 'Rock'],
		bs: {hp: 60, at: 75, df: 45, sa: 65, sd: 50, sp: 55},
		weightkg: 19.0,
		abilities: {0: 'Rock Head'},
		innates: ['Fluffy', 'Predator', 'Violent Rush']
	},
	'Arcanine-Hisuian': {
		types: ['Fire', 'Rock'],
		bs: {hp: 90, at: 130, df: 90, sa: 80, sd: 90, sp: 120},
		weightkg: 155.0,
		abilities: {0: 'Rock Head'},
		innates: ['Elude', 'Predator', 'Violent Rush']
	},
	'Voltorb-Hisuian': {
		types: ['Electric', 'Grass'],
		bs: {hp: 40, at: 30, df: 50, sa: 55, sd: 55, sp: 100},
		weightkg: 10.4,
		abilities: {0: 'Chloroplast'},
		innates: ['Impenetrable', 'Aftermath', 'Grassy Surge']
	},
	'Electrode-Hisuian': {
		types: ['Electric', 'Grass'],
		bs: {hp: 60, at: 50, df: 70, sa: 100, sd: 80, sp: 150},
		weightkg: 66.6,
		abilities: {0: 'Terminal Velocity'},
		innates: ['Impenetrable', 'Aftermath', 'Grassy Surge']
	},
	'Typhlosion-Hisuian': {
		types: ['Fire', 'Ghost'],
		bs: {hp: 93, at: 74, df: 78, sa: 120, sd: 85, sp: 85},
		weightkg: 79.5,
		abilities: {0: 'Early Grave'},
		innates: ['Blaze', 'Pyromancy', 'Frisk']
	},
	'Sneasel-Hisuian': {
		types: ['Poison', 'Fighting'],
		bs: {hp: 60, at: 95, df: 55, sa: 35, sd: 75, sp: 115},
		weightkg: 28.0,
		abilities: {0: 'Serene Grace'},
		innates: ['Tough Claws', 'Intoxicate', 'Unburden']
	},
	'Samurott-Hisuian': {
		types: ['Water', 'Dark'],
		bs: {hp: 90, at: 110, df: 80, sa: 100, sd: 65, sp: 90},
		weightkg: 94.6,
		abilities: {0: 'Exploit Weakness'},
		innates: ['Torrent', 'Shell Armor', 'Keen Edge']
	},
	'Lilligant-Hisuian': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 80, at: 105, df: 80, sa: 50, sd: 80, sp: 105},
		weightkg: 16.3,
		abilities: {0: 'Chlorophyll'},
		innates: ['Blade Dance', 'Speed Force', 'Taekkyeon']
	},
	'Braviary-Hisuian': {
		types: ['Psychic', 'Flying'],
		bs: {hp: 100, at: 57, df: 75, sa: 123, sd: 75, sp: 80},
		weightkg: 41.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Tinted Lens', 'Giant Wings', 'Resonance']
	},
	'Sliggoo-Hisuian': {
		types: ['Dragon', 'Steel'],
		bs: {hp: 58, at: 75, df: 83, sa: 83, sd: 113, sp: 40},
		weightkg: 17.5,
		abilities: {0: 'Gooey'},
		innates: ['Shell Armor', 'Impenetrable', 'Filter']
	},
	'Goodra-Hisuian': {
		types: ['Dragon', 'Steel'],
		bs: {hp: 80, at: 100, df: 100, sa: 110, sd: 150, sp: 60},
		weightkg: 150.5,
		abilities: {0: 'Gooey'},
		innates: ['Shell Armor', 'Impenetrable', 'Filter']
	},
	'Avalugg-Hisuian': {
		types: ['Ice', 'Rock'],
		bs: {hp: 95, at: 127, df: 184, sa: 34, sd: 76, sp: 38},
		weightkg: 505.0,
		abilities: {0: 'Technician'},
		innates: ['Primal Armor', 'Impenetrable', 'Strong Jaw']
	},
	'Decidueye-Hisuian': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 90, at: 120, df: 90, sa: 50, sd: 90, sp: 95},
		weightkg: 36.6,
		abilities: {0: 'Archer'},
		innates: ['Overgrow', 'Sniper', 'Aerodynamics']
	},
	'Zorua-Hisuian': {
		types: ['Normal', 'Ghost'],
		bs: {hp: 35, at: 60, df: 40, sa: 85, sd: 40, sp: 70},
		weightkg: 12.5,
		abilities: {0: 'Ambush'},
		innates: ['Illusion', 'Vengeance', 'Opportunist']
	},
	'Zoroark-Hisuian': {
		types: ['Normal', 'Ghost'],
		bs: {hp: 55, at: 100, df: 60, sa: 125, sd: 60, sp: 110},
		weightkg: 81.1,
		abilities: {0: 'Ambush'},
		innates: ['Illusion', 'Vengeance', 'Exploit Weakness']
	},
	'Tauros-Paldean-Aqua-Breed': {
		types: ['Fighting', 'Water'],
		bs: {hp: 95, at: 130, df: 105, sa: 30, sd: 70, sp: 100},
		weightkg: 88.4,
		abilities: {0: 'Violent Rush'},
		innates: ['Rock Head', 'Anger Point', 'Torrent']
	},
	'Tauros-Paldean-Blaze-Breed': {
		types: ['Fighting', 'Fire'],
		bs: {hp: 95, at: 130, df: 105, sa: 30, sd: 70, sp: 100},
		weightkg: 88.4,
		abilities: {0: 'Violent Rush'},
		innates: ['Rock Head', 'Anger Point', 'Blaze']
	},
	'Tauros-Paldean-Combat-Breed': {
		types: ['Fighting'],
		bs: {hp: 95, at: 130, df: 105, sa: 30, sd: 70, sp: 100},
		weightkg: 88.4,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Rock Head', 'Violent Rush', 'Frisk']
	},
	'Ursaluna Bloodmoon': {
		types: ['Ground', 'Normal'],
		bs: {hp: 113, at: 70, df: 120, sa: 135, sd: 65, sp: 52},
		weightkg: 290.0,
		abilities: {0: 'Voodoo Power'},
		innates: ['Mind\'s Eye', 'Moon Spirit', 'Overcoat']
	},
	'Palafin Hero': {
		types: ['Water'],
		bs: {hp: 100, at: 160, df: 97, sa: 106, sd: 87, sp: 100},
		weightkg: 60.2,
		abilities: {0: 'Friend Guard'},
		innates: ['Zero To Hero', 'Justified', 'Adaptability']
	},
	'Dudunsparce Three': {
		types: ['Normal'],
		bs: {hp: 125, at: 100, df: 80, sa: 85, sd: 75, sp: 55},
		weightkg: 39.2,
		abilities: {0: 'Mighty Horn'},
		innates: ['Super Luck', 'Own Tempo', 'Serene Grace']
	},
	'Maushold Four': {
		types: ['Normal'],
		bs: {hp: 74, at: 75, df: 70, sa: 65, sd: 75, sp: 111},
		weightkg: 2.3,
		abilities: {0: 'Friend Guard'},
		innates: ['Own Tempo', 'Parental Bond', 'Technician']
	},
	'Tatsugiri Curly': {
		types: ['Dragon', 'Water'],
		bs: {hp: 68, at: 50, df: 60, sa: 120, sd: 95, sp: 82},
		weightkg: 8.0,
		abilities: {0: 'Commander'},
		innates: ['Torrent', 'High Tide', 'Opportunist']
	},
	'Tatsugiri Stretchy': {
		types: ['Dragon', 'Water'],
		bs: {hp: 68, at: 50, df: 60, sa: 120, sd: 95, sp: 82},
		weightkg: 8.0,
		abilities: {0: 'Commander'},
		innates: ['Torrent', 'High Tide', 'Opportunist']
	},
	'Tatsugiri Droopy': {
		types: ['Dragon', 'Water'],
		bs: {hp: 68, at: 50, df: 60, sa: 120, sd: 95, sp: 82},
		weightkg: 8.0,
		abilities: {0: 'Commander'},
		innates: ['Torrent', 'High Tide', 'Opportunist']
	},
	'Squawkabilly Green Plumage': {
		types: ['Normal', 'Flying'],
		bs: {hp: 90, at: 45, df: 100, sa: 76, sd: 90, sp: 85},
		weightkg: 2.4,
		abilities: {0: 'Power Spot'},
		innates: ['Airborne', 'Flock', 'Parroting']
	},
	'Squawkabilly Blue': {
		types: ['Normal', 'Flying'],
		bs: {hp: 90, at: 45, df: 100, sa: 76, sd: 90, sp: 85},
		weightkg: 2.4,
		abilities: {0: 'Power Spot'},
		innates: ['Airborne', 'Flock', 'Parroting']
	},
	'Squawkabilly Yellow': {
		types: ['Normal', 'Flying'],
		bs: {hp: 90, at: 45, df: 100, sa: 76, sd: 90, sp: 85},
		weightkg: 2.4,
		abilities: {0: 'Power Spot'},
		innates: ['Airborne', 'Flock', 'Parroting']
	},
	'Squawkabilly White': {
		types: ['Normal', 'Flying'],
		bs: {hp: 90, at: 45, df: 100, sa: 76, sd: 90, sp: 85},
		weightkg: 2.4,
		abilities: {0: 'Power Spot'},
		innates: ['Airborne', 'Flock', 'Parroting']
	},
	'Ogerpon Wellspring Mask': {
		types: ['Grass', 'Water'],
		bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
		weightkg: 39.8,
		abilities: {0: 'Water Veil'},
		innates: ['Long Reach', 'Torrent', 'Super Slammer']
	},
	'Ogerpon Hearthflame': {
		types: ['Grass', 'Fire'],
		bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
		weightkg: 39.8,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Long Reach', 'Blaze', 'Super Slammer']
	},
	'Ogerpon Cornerstone': {
		types: ['Grass', 'Rock'],
		bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
		weightkg: 39.8,
		abilities: {0: 'Loose Rocks'},
		innates: ['Long Reach', 'Rockhard Will', 'Super Slammer']
	},
	'Dialga Origin': {
		types: ['Dragon', 'Steel'],
		bs: {hp: 100, at: 120, df: 140, sa: 170, sd: 140, sp: 110},
		weightkg: 683.0,
		abilities: {0: 'Temporal Rupture'},
		innates: ['Primal Armor', 'Impenetrable', 'Power Core']
	},
	'Palkia Origin': {
		types: ['Dragon', 'Water'],
		bs: {hp: 90, at: 120, df: 120, sa: 170, sd: 140, sp: 140},
		weightkg: 336.0,
		abilities: {0: 'Heaven Asunder'},
		innates: ['Prism Scales', 'Primal Armor', 'Power Core']
	},
	'Enamorus Therian': {
		types: ['Fairy', 'Flying'],
		bs: {hp: 74, at: 115, df: 110, sa: 135, sd: 100, sp: 46},
		weightkg: 48.0,
		abilities: {0: 'Pure Love'},
		innates: ['Pixie Power', 'Fluffy', 'Weather Control']
	},
	'Castform Sandy': {
		types: ['Rock'],
		bs: {hp: 75, at: 75, df: 75, sa: 105, sd: 75, sp: 110},
		weightkg: 0.8,
		abilities: {0: 'Sand Rush'},
		innates: ['Forecast', 'Weather Control', 'Adaptability']
	},
	'Polartic Bluemoon': {
		types: ['Ice', 'Fighting'],
		bs: {hp: 130, at: 145, df: 70, sa: 50, sd: 105, sp: 55},
		weightkg: 0.0,
		abilities: {0: 'Sheer Force'},
		innates: ['Equinox', 'Ice Downfall', 'Last Stand']
	},
	'Lumbering Sloth Engulfed': {
		types: ['Fire', 'Grass'],
		bs: {hp: 109, at: 135, df: 65, sa: 85, sd: 65, sp: 111},
		weightkg: 0.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Protosynthesis', 'Tough Claws', 'Pyromancy']
	},
	'Gimmighoul Roaming': {
		types: ['Ghost'],
		bs: {hp: 65, at: 30, df: 25, sa: 75, sd: 45, sp: 80},
		weightkg: 5.0,
		abilities: {0: 'Surprise!'},
		innates: ['Good As Gold', 'Super Luck', 'Prankster']
	},
	'Basculegion F': {
		types: ['Water', 'Ghost'],
		bs: {hp: 130, at: 75, df: 65, sa: 112, sd: 75, sp: 73},
		weightkg: 110.0,
		abilities: {0: 'Rapid Response'},
		innates: ['Shadow Shield', 'Wonder Skin', 'Supreme Overlord']
	},
	'Terapagos Primal': {
		types: ['Stellar'],
		bs: {hp: 170, at: 115, df: 110, sa: 150, sd: 110, sp: 65},
		weightkg: 10.0,
		abilities: {0: 'Wonder Skin'},
		innates: ['Teraform Zero', 'Adaptability', 'Terastal Treasure']
	},
	'Hydroar F': {
		types: ['Water', 'Poison'],
		bs: {hp: 100, at: 125, df: 85, sa: 60, sd: 60, sp: 87},
		weightkg: 54.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Predator', 'Nocturnal', 'Moxie']
	},
	'Pikachu Partner': {
		types: ['Electric'],
		bs: {hp: 50, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Short Circuit', 'Electrocytes', 'Overcharge']
	},
	'Eevee Partner': {
		types: ['Normal'],
		bs: {hp: 65, at: 75, df: 70, sa: 65, sd: 85, sp: 75},
		weightkg: 6.5,
		abilities: {0: 'Prankster'},
		innates: ['Adaptability', 'Overcoat', 'Cute Charm']
	},
	'Meowth Partner': {
		types: ['Normal'],
		bs: {hp: 50, at: 90, df: 45, sa: 75, sd: 50, sp: 125},
		weightkg: 4.2,
		abilities: {0: 'Opportunist'},
		innates: ['Cheap Tactics', 'Scrappy', 'Super Luck']
	},
	'Mimikyu Primal': {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 79, at: 120, df: 90, sa: 120, sd: 115, sp: 116},
		weightkg: 0.7,
		abilities: {0: 'Shadow Tag'},
		innates: ['Patchwork', 'Pretty Princess', 'Phantom Pain']
	},
	'Slaking-Mega Ape Shift': {
		types: ['Normal', 'Ice'],
		bs: {hp: 130, at: 210, df: 110, sa: 85, sd: 105, sp: 110},
		weightkg: 130.5,
		abilities: {0: 'Unseen Fist'},
		innates: ['Ape Shift', 'Mold Breaker', 'Crystallize']
	},
	'Raichu-Mega Y': {
		types: ['Electric'],
		bs: {hp: 60, at: 100, df: 60, sa: 160, sd: 80, sp: 130},
		weightkg: 30.0,
		abilities: {0: 'Power Outage'},
		innates: ['Generator', 'Shiny Lightning', 'Ground Shock']
	},
	'Castform Foggy': {
		types: ['Ghost'],
		bs: {hp: 75, at: 75, df: 75, sa: 105, sd: 75, sp: 110},
		weightkg: 0.8,
		abilities: {0: 'Ethereal Rush'},
		innates: ['Forecast', 'Weather Control', 'Adaptability']
	},
	'Chesnaught Battle Bond': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 88, at: 107, df: 122, sa: 74, sd: 80, sp: 64},
		weightkg: 90.0,
		abilities: {0: 'Loose Quills'},
		innates: ['Overgrow', 'Shell Armor', 'Battle Bond']
	},
	'Clemont-Chesnaught': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 88, at: 128, df: 152, sa: 98, sd: 92, sp: 87},
		weightkg: 90.0,
		abilities: {0: 'Faraday Cage'},
		innates: ['Forest Rage', 'Teravolt', 'Battle Bond']
	},
	'Delphox Battle Bond': {
		types: ['Fire', 'Psychic'],
		bs: {hp: 75, at: 69, df: 72, sa: 114, sd: 100, sp: 105},
		weightkg: 39.0,
		abilities: {0: 'Adaptability'},
		innates: ['Blaze', 'Flame Shield', 'Battle Bond']
	},
	'Serena-Delphox': {
		types: ['Fire', 'Psychic'],
		bs: {hp: 75, at: 96, df: 95, sa: 134, sd: 120, sp: 125},
		weightkg: 39.0,
		abilities: {0: 'Adaptability'},
		innates: ['Hellblaze', 'Soothsayer', 'Battle Bond']
	},
	'Morpekyll Hangry': {
		types: ['Electric', 'Dark'],
		bs: {hp: 87, at: 121, df: 78, sa: 62, sd: 85, sp: 121},
		weightkg: 0.0,
		abilities: {0: 'Gluttony'},
		innates: ['Two-Faced', 'Magic Bounce', 'Lightning Rod']
	},
	'Unown Revelation': {
		types: ['Psychic'],
		bs: {hp: 58, at: 138, df: 133, sa: 138, sd: 133, sp: 30},
		weightkg: 5.0,
		abilities: {0: 'Anticipation'},
		innates: ['Revelation', 'Wonder Skin', 'Unown Power']
	},
	'Lycanroc Eclipse': {
		types: ['Rock', 'Ghost'],
		bs: {hp: 85, at: 76, df: 55, sa: 85, sd: 75, sp: 111},
		weightkg: 25.0,
		abilities: {0: 'Sturdy'},
		innates: ['Dead Power', 'To The Bone', 'Lunar Eclipse']
	},
	'Lycanroc Twilight': {
		types: ['Rock', 'Fairy'],
		bs: {hp: 92, at: 53, df: 75, sa: 115, sd: 64, sp: 88},
		weightkg: 25.0,
		abilities: {0: 'Mind Crunch'},
		innates: ['Fluffy', 'Moon Spirit', 'Dazzling']
	},
	'Scrafty-Mega': {
		types: ['Dark', 'Fighting'],
		bs: {hp: 65, at: 130, df: 135, sa: 55, sd: 135, sp: 68},
		weightkg: 30.0,
		abilities: {0: 'Backstreet Boy'},
		innates: ['Wonder Scale', 'Backflip', 'Overcoat']
	},
	'Falinks-Mega': {
		types: ['Fighting'],
		bs: {hp: 65, at: 135, df: 135, sa: 70, sd: 65, sp: 100},
		weightkg: 62.0,
		abilities: {0: 'Fort Knox'},
		innates: ['Voltron', 'Warrior\'s Spear', 'Vital Spirit']
	},
	'Pyroar-Mega': {
		types: ['Normal', 'Fire'],
		bs: {hp: 86, at: 88, df: 92, sa: 129, sd: 86, sp: 136},
		weightkg: 81.5,
		abilities: {0: 'Adaptability'},
		innates: ['Emperor\'s Wrath', 'Rivalry', 'Predator']
	},
	'Chesnaught-Mega': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 88, at: 137, df: 172, sa: 74, sd: 115, sp: 49},
		weightkg: 90.0,
		abilities: {0: 'King\'s Wrath'},
		innates: ['Forest Rage', 'Stalwart', 'Spike Armor']
	},
	'Delphox-Mega': {
		types: ['Fire', 'Psychic'],
		bs: {hp: 75, at: 69, df: 73, sa: 159, sd: 125, sp: 134},
		weightkg: 39.0,
		abilities: {0: 'Deadly Precision'},
		innates: ['Hellblaze', 'Witch Broom', 'Magic Guard']
	},
	'Greninja-Mega': {
		types: ['Water', 'Dark'],
		bs: {hp: 72, at: 125, df: 77, sa: 138, sd: 81, sp: 142},
		weightkg: 40.0,
		abilities: {0: 'Fatal Precision'},
		innates: ['Riptide', 'Giant Shuriken', 'Anticipation']
	},
	'Eelektross-Mega': {
		types: ['Electric'],
		bs: {hp: 85, at: 145, df: 90, sa: 135, sd: 100, sp: 80},
		weightkg: 80.5,
		abilities: {0: 'Electromorphosis'},
		innates: ['Mucus Membrane', 'Levitate', 'Amphibious']
	},
	'Malamar-Mega': {
		types: ['Dark', 'Psychic'],
		bs: {hp: 86, at: 102, df: 88, sa: 115, sd: 120, sp: 88},
		weightkg: 47.0,
		abilities: {0: 'Entrance'},
		innates: ['Hypnotic Trance', 'Brain Overload', 'Brain Mass']
	},
	'Victreebel-Mega': {
		types: ['Grass', 'Poison'],
		bs: {hp: 100, at: 125, df: 95, sa: 135, sd: 105, sp: 70},
		weightkg: 15.5,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Tummyache', 'Acid Reflux', 'Wonder Skin']
	},
	'Dragalge-Mega': {
		types: ['Poison', 'Dragon'],
		bs: {hp: 85, at: 97, df: 105, sa: 142, sd: 163, sp: 44},
		weightkg: 81.5,
		abilities: {0: 'Protean'},
		innates: ['Waterborne', 'Toxic Spill', 'Drakelp Head']
	},
	'Hawlucha-Mega': {
		types: ['Fighting', 'Flying'],
		bs: {hp: 78, at: 137, df: 100, sa: 74, sd: 93, sp: 118},
		weightkg: 21.5,
		abilities: {0: 'Good As Gold'},
		innates: ['Lucha Libre', 'Stamina', 'Vital Spirit']
	},
	'Clefable-Mega Y': {
		types: ['Fairy', 'Flying'],
		bs: {hp: 100, at: 80, df: 95, sa: 135, sd: 110, sp: 88},
		weightkg: 40.0,
		abilities: {0: 'Lepidopteran'},
		innates: ['Pollinate', 'Giant Wings', 'Magic Guard']
	},
	'Dragonite-Mega Y': {
		types: ['Dragon', 'Flying'],
		bs: {hp: 91, at: 124, df: 115, sa: 145, sd: 125, sp: 100},
		weightkg: 210.0,
		abilities: {0: 'Serene Grace'},
		innates: ['Angelic Wings', 'Mystic Power', 'Inner Focus']
	},
	'Excadrill-Mega': {
		types: ['Ground', 'Steel'],
		bs: {hp: 110, at: 165, df: 100, sa: 65, sd: 65, sp: 103},
		weightkg: 40.4,
		abilities: {0: 'Mold Breaker'},
		innates: ['Mega Drill', 'Steelworker', 'Aftershock']
	},
	'Scolipede-Mega': {
		types: ['Bug', 'Poison'],
		bs: {hp: 90, at: 140, df: 159, sa: 75, sd: 99, sp: 62},
		weightkg: 200.5,
		abilities: {0: 'Tinted Lens'},
		innates: ['Toxic Shell', 'Hemotoxin', 'Mighty Horn']
	},
	'Chandelure-Mega Y': {
		types: ['Ghost', 'Fire'],
		bs: {hp: 80, at: 75, df: 110, sa: 175, sd: 110, sp: 90},
		weightkg: 34.3,
		abilities: {0: 'Purgatory'},
		innates: ['Levitate', 'Ethereal Rush', 'Radiance']
	},
	'Floette-Mega': {
		types: ['Fairy'],
		bs: {hp: 74, at: 85, df: 87, sa: 155, sd: 148, sp: 102},
		weightkg: 0.9,
		abilities: {0: 'Energy Siphon'},
		innates: ['Eternal Flower', 'Magic Guard', 'Fairy Aura']
	},
	'Zygarde-Mega': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 216, at: 70, df: 121, sa: 216, sd: 85, sp: 100},
		weightkg: 305.0,
		abilities: {0: 'Nihil Blaster'},
		innates: ['Primal Armor', 'Earthbound', 'Power Core']
	},
	'Barbaracle-Mega': {
		types: ['Rock', 'Fighting'],
		bs: {hp: 72, at: 140, df: 130, sa: 64, sd: 106, sp: 88},
		weightkg: 96.0,
		abilities: {0: 'Frisk'},
		innates: ['Hand Barnacles', 'Tough Claws', 'Solid Rock']
	},
	'Drampa-Mega': {
		types: ['Normal', 'Dragon'],
		bs: {hp: 78, at: 95, df: 110, sa: 160, sd: 126, sp: 36},
		weightkg: 185.0,
		abilities: {0: 'Storm Cloud'},
		innates: ['Thunder Clouds', 'Overcoat', 'Going Berserk']
	},
	'Starmie-Mega': {
		types: ['Water', 'Psychic'],
		bs: {hp: 60, at: 100, df: 110, sa: 130, sd: 105, sp: 120},
		weightkg: 80.0,
		abilities: {0: 'Huge Power'},
		innates: ['Break it Down', 'Blur', 'Mystic Power']
	},
	'Skarmory-Mega Y': {
		types: ['Steel', 'Flying'],
		bs: {hp: 75, at: 140, df: 110, sa: 40, sd: 100, sp: 130},
		weightkg: 50.5,
		abilities: {0: 'Talon Trap'},
		innates: ['To The Bone', 'Light Metal', 'Hyper Aggressive']
	},
	'Froslass-Mega Y': {
		types: ['Ice', 'Ghost'],
		bs: {hp: 70, at: 80, df: 70, sa: 140, sd: 100, sp: 140},
		weightkg: 26.6,
		abilities: {0: 'Cryomancy'},
		innates: ['Yuki Onna', 'Whiteout', 'Glacial Ghost']
	},
	'Milotic-Mega': {
		types: ['Water', 'Fairy'],
		bs: {hp: 95, at: 69, df: 110, sa: 129, sd: 156, sp: 81},
		weightkg: 162.0,
		abilities: {0: 'Natural Recovery'},
		innates: ['Prism Scales', 'Tangling Hair', 'Adaptability']
	},
	'Butterfree-Mega': {
		types: ['Bug', 'Psychic'],
		bs: {hp: 75, at: 15, df: 65, sa: 165, sd: 140, sp: 115},
		weightkg: 32.0,
		abilities: {0: 'Tinted Lens'},
		innates: ['Shield Dust', 'Compound Eyes', 'Imposing Wings']
	},
	'Machamp-Mega': {
		types: ['Fighting'],
		bs: {hp: 90, at: 170, df: 100, sa: 65, sd: 105, sp: 75},
		weightkg: 130.0,
		abilities: {0: 'Raging Boxer'},
		innates: ['No Guard', 'Iron Fist', 'Anger Point']
	},
	'Kingler-Mega': {
		types: ['Water'],
		bs: {hp: 80, at: 170, df: 135, sa: 50, sd: 80, sp: 85},
		weightkg: 60.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Shell Armor', 'Hyper Cutter', 'Tough Claws']
	},
	'Lapras-Mega Y': {
		types: ['Water', 'Ice'],
		bs: {hp: 130, at: 105, df: 110, sa: 125, sd: 125, sp: 50},
		weightkg: 220.0,
		abilities: {0: 'Liquid Voice'},
		innates: ['Ice Scales', 'Shell Armor', 'Self Sufficient']
	},
	'Flygon-Mega': {
		types: ['Ground', 'Bug'],
		bs: {hp: 80, at: 125, df: 80, sa: 130, sd: 100, sp: 125},
		weightkg: 82.0,
		abilities: {0: 'Sand Song'},
		innates: ['Dragonfly', 'Sepia Lens', 'Desert Spirit']
	},
	'Kingdra-Mega X': {
		types: ['Water', 'Dragon'],
		bs: {hp: 75, at: 105, df: 100, sa: 145, sd: 100, sp: 115},
		weightkg: 152.0,
		abilities: {0: 'Swift Swim'},
		innates: ['Raging Storm', 'Mega Launcher', 'Multiscale']
	},
	'Dewgong-Mega': {
		types: ['Water', 'Ice'],
		bs: {hp: 90, at: 135, df: 110, sa: 110, sd: 110, sp: 90},
		weightkg: 120.0,
		abilities: {0: 'Hardened Sheath'},
		innates: ['Cold Rebound', 'Water Veil', 'Arctic Fur']
	},
	'Hitmonchan-Mega': {
		types: ['Fighting', 'Ground'],
		bs: {hp: 80, at: 145, df: 99, sa: 35, sd: 120, sp: 106},
		weightkg: 50.2,
		abilities: {0: 'Parry'},
		innates: ['Raging Boxer', 'Power Fists', 'Blitz Boxer']
	},
	'Hitmonlee-Mega': {
		types: ['Fighting', 'Rock'],
		bs: {hp: 80, at: 140, df: 73, sa: 60, sd: 110, sp: 122},
		weightkg: 49.8,
		abilities: {0: 'Roundhouse'},
		innates: ['Hustle', 'Mineralize', 'Striker']
	},
	'Hitmontop-Mega': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 80, at: 135, df: 115, sa: 45, sd: 135, sp: 75},
		weightkg: 48.0,
		abilities: {0: 'Spinning Top'},
		innates: ['Technician', 'Battle Armor', 'Intimidate']
	},
	'Crobat-Mega': {
		types: ['Poison', 'Flying'],
		bs: {hp: 85, at: 140, df: 70, sa: 120, sd: 70, sp: 160},
		weightkg: 75.0,
		abilities: {0: 'Elude'},
		innates: ['Ominous Shroud', 'Spectral Shroud', 'Nosferatu']
	},
	'Skarmory-Mega X': {
		types: ['Steel', 'Flying'],
		bs: {hp: 75, at: 100, df: 174, sa: 40, sd: 138, sp: 68},
		weightkg: 50.5,
		abilities: {0: 'Shattered Armor'},
		innates: ['Steelworker', 'Self Repair', 'Power Core']
	},
	'Torterra-Mega': {
		types: ['Grass', 'Ground'],
		bs: {hp: 95, at: 150, df: 184, sa: 65, sd: 105, sp: 36},
		weightkg: 310.0,
		abilities: {0: 'Grassy Surge'},
		innates: ['Forest Rage', 'Shell Armor', 'Atlas']
	},
	'Infernape-Mega': {
		types: ['Fire', 'Fighting'],
		bs: {hp: 76, at: 145, df: 71, sa: 145, sd: 71, sp: 127},
		weightkg: 55.0,
		abilities: {0: 'Evaporate'},
		innates: ['Hellblaze', 'Equinox', 'Adrenaline Rush']
	},
	'Empoleon-Mega': {
		types: ['Water', 'Steel'],
		bs: {hp: 84, at: 80, df: 118, sa: 136, sd: 121, sp: 96},
		weightkg: 84.5,
		abilities: {0: 'No Guard'},
		innates: ['Riptide', 'Antarctic Bird', 'Battle Armor']
	},
	'Shuckle-Mega': {
		types: ['Bug', 'Rock'],
		bs: {hp: 50, at: 60, df: 255, sa: 10, sd: 255, sp: 5},
		weightkg: 20.5,
		abilities: {0: 'Self Repair'},
		innates: ['Multi-Headed', 'Juggernaut', 'Fort Knox']
	},
	'Relicanth-Mega': {
		types: ['Water', 'Rock'],
		bs: {hp: 100, at: 160, df: 130, sa: 45, sd: 75, sp: 95},
		weightkg: 23.4,
		abilities: {0: 'Marine Apex'},
		innates: ['Impenetrable', 'Reckless', 'Primal Armor']
	},
	'Toucannon-Mega': {
		types: ['Normal', 'Steel'],
		bs: {hp: 80, at: 120, df: 110, sa: 135, sd: 110, sp: 70},
		weightkg: 26.0,
		abilities: {0: 'Sturdy'},
		innates: ['Steel Barrel', 'Iron Barrage', 'Pyro Shells']
	},
	'Dragonite-Mega': {
		types: ['Dragon', 'Electric'],
		bs: {hp: 91, at: 159, df: 120, sa: 125, sd: 125, sp: 80},
		weightkg: 210.0,
		abilities: {0: 'Multiscale'},
		innates: ['Galvanize', 'Discipline', 'Thundercall']
	},
	'Breloom-Mega': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 60, at: 140, df: 130, sa: 50, sd: 110, sp: 70},
		weightkg: 39.2,
		abilities: {0: 'Long Reach'},
		innates: ['Perfectionist', 'Technician', 'Fungal Infection']
	},
	'Slaking-Mega': {
		types: ['Normal', 'Ice'],
		bs: {hp: 130, at: 210, df: 110, sa: 85, sd: 105, sp: 110},
		weightkg: 130.5,
		abilities: {0: 'Unseen Fist'},
		innates: ['Ape Shift', 'Truant', 'Crystallize']
	},
	'Feraligatr-Mega X': {
		types: ['Water', 'Dragon'],
		bs: {hp: 85, at: 160, df: 130, sa: 89, sd: 93, sp: 78},
		weightkg: 88.8,
		abilities: {0: 'Crushing Jaw'},
		innates: ['Riptide', 'Sharp Edges', 'Predator']
	},
	'Feraligatr-Mega Y': {
		types: ['Water', 'Electric'],
		bs: {hp: 85, at: 80, df: 130, sa: 159, sd: 113, sp: 68},
		weightkg: 88.8,
		abilities: {0: 'Atomic Burst'},
		innates: ['Riptide', 'Predator', 'Berserker Rage']
	},
	'Granbull-Mega': {
		types: ['Fairy', 'Ground'],
		bs: {hp: 90, at: 160, df: 135, sa: 70, sd: 105, sp: 35},
		weightkg: 48.7,
		abilities: {0: 'Tough Claws'},
		innates: ['Pretty Princess', 'Defiant', 'Hyper Aggressive']
	},
	'Quagsire-Mega': {
		types: ['Water', 'Ground'],
		bs: {hp: 95, at: 110, df: 130, sa: 110, sd: 130, sp: 35},
		weightkg: 75.0,
		abilities: {0: 'Unaware'},
		innates: ['Clueless', 'Water Absorb', 'Water Veil']
	},
	'Gyarados-Mega Y': {
		types: ['Water', 'Dragon'],
		bs: {hp: 95, at: 95, df: 99, sa: 130, sd: 140, sp: 81},
		weightkg: 235.0,
		abilities: {0: 'Mystic Power'},
		innates: ['Aerialist', 'Prism Scales', 'Drake Of Rage']
	},
	'Haxorus-Mega': {
		types: ['Dragon', 'Steel'],
		bs: {hp: 76, at: 180, df: 110, sa: 82, sd: 90, sp: 102},
		weightkg: 105.5,
		abilities: {0: 'Fearmonger'},
		innates: ['Hyper Cutter', 'Keen Edge', 'Mold Breaker']
	},
	'Meganium-Mega': {
		types: ['Grass', 'Fairy'],
		bs: {hp: 80, at: 92, df: 115, sa: 143, sd: 115, sp: 90},
		weightkg: 100.5,
		abilities: {0: 'Grassy Surge'},
		innates: ['Forest Rage', 'Flower Necklace', 'Triage']
	},
	'Luxray-Mega': {
		types: ['Electric'],
		bs: {hp: 90, at: 143, df: 96, sa: 89, sd: 96, sp: 119},
		weightkg: 42.0,
		abilities: {0: 'Shocking Maw'},
		innates: ['Gleam Eyes', 'Merciless', 'Jaws of Carnage']
	},
	'Nidoking-Mega': {
		types: ['Poison', 'Ground'],
		bs: {hp: 81, at: 142, df: 92, sa: 85, sd: 95, sp: 110},
		weightkg: 62.0,
		abilities: {0: 'Sheer Force'},
		innates: ['King\'s Wrath', 'Fearmonger', 'Venom Crown']
	},
	'Nidoqueen-Mega': {
		types: ['Poison', 'Ground'],
		bs: {hp: 90, at: 82, df: 112, sa: 125, sd: 110, sp: 86},
		weightkg: 60.0,
		abilities: {0: 'Queenly Majesty'},
		innates: ['Queen\'s Mourning', 'Blight Scale', 'Battle Armor']
	},
	'Sandslash-Mega': {
		types: ['Ground'],
		bs: {hp: 95, at: 140, df: 110, sa: 45, sd: 85, sp: 95},
		weightkg: 29.5,
		abilities: {0: 'Tough Claws'},
		innates: ['Desert Cloak', 'Sand Rush', 'Sand Force']
	},
	'Typhlosion-Mega': {
		types: ['Fire', 'Ground'],
		bs: {hp: 78, at: 94, df: 98, sa: 150, sd: 105, sp: 110},
		weightkg: 79.5,
		abilities: {0: 'Volcano Rage'},
		innates: ['Hellblaze', 'Magma Eater', 'Flaming Soul']
	},
	'Krookodile-Mega': {
		types: ['Ground', 'Dark'],
		bs: {hp: 95, at: 147, df: 110, sa: 65, sd: 100, sp: 102},
		weightkg: 96.3,
		abilities: {0: 'Scare'},
		innates: ['Metallic Jaws', 'Dune Terror', 'Jaws of Carnage']
	},
	'Magnezone-Mega': {
		types: ['Electric', 'Steel'],
		bs: {hp: 70, at: 75, df: 135, sa: 165, sd: 125, sp: 65},
		weightkg: 180.0,
		abilities: {0: 'Electric Burst'},
		innates: ['Electro Surge', 'Multi-Headed', 'Magnet Pull']
	},
	'Shedinja-Mega': {
		types: ['Bug', 'Ghost'],
		bs: {hp: 1, at: 120, df: 45, sa: 120, sd: 30, sp: 120},
		weightkg: 1.2,
		abilities: {0: 'Cheating Death'},
		innates: ['Tinted Lens', 'Magic Guard', 'Dead Power']
	},
	'Swalot-Mega': {
		types: ['Poison'],
		bs: {hp: 100, at: 88, df: 138, sa: 128, sd: 110, sp: 43},
		weightkg: 80.0,
		abilities: {0: 'Wonder Skin'},
		innates: ['Toxic Spill', 'Liquified', 'Corrosion']
	},
	'Lanturn-Mega': {
		types: ['Water', 'Electric'],
		bs: {hp: 125, at: 58, df: 88, sa: 126, sd: 116, sp: 67},
		weightkg: 22.5,
		abilities: {0: 'Hydro Circuit'},
		innates: ['Radiance', 'Storm Drain', 'Volt Absorb']
	},
	'Lapras-Mega X': {
		types: ['Water'],
		bs: {hp: 130, at: 135, df: 105, sa: 100, sd: 90, sp: 85},
		weightkg: 220.0,
		abilities: {0: 'Primal Maw'},
		innates: ['Swift Swim', 'Shell Armor', 'Jaws of Carnage']
	},
	'Slowking-Mega': {
		types: ['Psychic'],
		bs: {hp: 95, at: 85, df: 80, sa: 130, sd: 180, sp: 20},
		weightkg: 79.5,
		abilities: {0: 'Analytic'},
		innates: ['Psychic Surge', 'Gifted Mind', 'Shell Armor']
	},
	'Ribombee-Mega': {
		types: ['Bug', 'Fairy'],
		bs: {hp: 60, at: 55, df: 70, sa: 130, sd: 105, sp: 144},
		weightkg: 0.5,
		abilities: {0: 'Fairy Aura'},
		innates: ['Aerialist', 'Radiance', 'Trickster']
	},
	'Alakazam-Mega-Redux': {
		types: ['Dark'],
		bs: {hp: 55, at: 50, df: 105, sa: 175, sd: 65, sp: 150},
		weightkg: 48.0,
		abilities: {0: 'Minion Control'},
		innates: ['Cheap Tactics', 'Mystic Power', 'Nocturnal']
	},
	'Beedrill-Mega-Redux': {
		types: ['Ice', 'Poison'],
		bs: {hp: 65, at: 150, df: 60, sa: 45, sd: 80, sp: 175},
		weightkg: 29.5,
		abilities: {0: 'Freezing Point'},
		innates: ['Skill Link', 'Exploit Weakness', 'Adaptability']
	},
	'Machamp-Mega-Redux': {
		types: ['Fighting', 'Dragon'],
		bs: {hp: 70, at: 130, df: 140, sa: 65, sd: 145, sp: 55},
		weightkg: 130.0,
		abilities: {0: 'Raging Boxer'},
		innates: ['Brawling Wyvern', 'Stamina', 'Power Core']
	},
	'Skarmory-Mega': {
		types: ['Steel', 'Fire'],
		bs: {hp: 75, at: 130, df: 100, sa: 80, sd: 70, sp: 140},
		weightkg: 50.5,
		abilities: {0: 'Molten Blades'},
		innates: ['Levitate', 'Flame Body', 'Speed Force']
	},
	'Arcanine-Redux-Mega': {
		types: ['Fire', 'Grass'],
		bs: {hp: 90, at: 145, df: 100, sa: 135, sd: 100, sp: 130},
		weightkg: 155.0,
		abilities: {0: 'Scare'},
		innates: ['Smoldering Wood', 'Stench', 'Immunity']
	},
	'Garchomp-Mega-Redux': {
		types: ['Water', 'Ghost'],
		bs: {hp: 100, at: 150, df: 105, sa: 100, sd: 105, sp: 140},
		weightkg: 95.0,
		abilities: {0: 'Haunting Frenzy'},
		innates: ['Keen Edge', 'Hyper Aggressive', 'Soul Eater']
	},
	'Mawile-Mega-Redux': {
		types: ['Dark', 'Ghost'],
		bs: {hp: 70, at: 105, df: 100, sa: 55, sd: 65, sp: 115},
		weightkg: 11.5,
		abilities: {0: 'Dead Power'},
		innates: ['Multi-Headed', 'Strong Jaw', 'Shadow Tag']
	},
	'Sableye-Mega-Redux': {
		types: ['Steel', 'Fairy'],
		bs: {hp: 70, at: 100, df: 110, sa: 100, sd: 110, sp: 20},
		weightkg: 11.0,
		abilities: {0: 'Prankster'},
		innates: ['Magic Guard', 'Stainless Steel', 'Magic Bounce']
	},
	'Houndoom-Mega-Redux': {
		types: ['Ghost'],
		bs: {hp: 75, at: 115, df: 60, sa: 125, sd: 120, sp: 135},
		weightkg: 35.0,
		abilities: {0: 'Surprise!'},
		innates: ['Haunted Spirit', 'Contrary', 'Purgatory']
	},
	'Froslass-Mega X': {
		types: ['Ice', 'Ghost'],
		bs: {hp: 70, at: 70, df: 120, sa: 130, sd: 120, sp: 90},
		weightkg: 26.6,
		abilities: {0: 'Rejection'},
		innates: ['Hollow Ice Zone', 'Cryostasis', 'Aurora Borealis']
	},
	'Wigglytuff-Mega X': {
		types: ['Fighting', 'Fairy'],
		bs: {hp: 120, at: 133, df: 45, sa: 100, sd: 40, sp: 135},
		weightkg: 12.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Balloon Blitz', 'Combat Specialist', 'Defiant']
	},
	'Cascoon Primal': {
		types: ['Bug'],
		bs: {hp: 121, at: 121, df: 121, sa: 121, sd: 121, sp: 121},
		weightkg: 11.5,
		abilities: {0: 'Angel\'s Wrath'},
		innates: ['Color Change', 'Impenetrable', 'Adaptability']
	},
	'Wigglytuff-Mega Y': {
		types: ['Fire', 'Fairy'],
		bs: {hp: 120, at: 90, df: 55, sa: 140, sd: 108, sp: 60},
		weightkg: 12.0,
		abilities: {0: 'Combustion'},
		innates: ['Balloon Bomb', 'Immolate', 'Fur Coat']
	},
	'Lucario-Mega Z': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 70, at: 100, df: 70, sa: 164, sd: 70, sp: 151},
		weightkg: 54.0,
		abilities: {0: 'Aura Armor'},
		innates: ['Deflect', 'Mega Launcher', 'Inner Focus']
	},
	'Gyaradeath-Mega X': {
		types: ['Ghost', 'Fire'],
		bs: {hp: 95, at: 140, df: 109, sa: 70, sd: 120, sp: 106},
		weightkg: 0.0,
		abilities: {0: 'Fire Scales'},
		innates: ['Levitate', 'Funeral Pyre', 'Soul Eater']
	},
	'Gyaradeath-Mega Y': {
		types: ['Ghost', 'Psychic'],
		bs: {hp: 95, at: 110, df: 90, sa: 140, sd: 69, sp: 136},
		weightkg: 0.0,
		abilities: {0: 'Psychic Surge'},
		innates: ['Shadow Shield', 'Life Steal', 'Levitate']
	},
	'Arbok-Mega': {
		types: ['Poison', 'Dark'],
		bs: {hp: 90, at: 130, df: 94, sa: 135, sd: 94, sp: 65},
		weightkg: 65.0,
		abilities: {0: 'Pattern Change'},
		innates: ['Sniper', 'Merciless', 'Sidewinder']
	},
	'Kingambit-Mega': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 90, at: 135, df: 100, sa: 85, sd: 105, sp: 135},
		weightkg: 120.0,
		abilities: {0: 'Sweeping Edge'},
		innates: ['Dual Wield', 'Intimidate', 'Olé!']
	},
	'Golisopod-Mega Y': {
		types: ['Bug', 'Water'],
		bs: {hp: 75, at: 155, df: 140, sa: 100, sd: 100, sp: 60},
		weightkg: 108.0,
		abilities: {0: 'No Turning Back'},
		innates: ['Shell Armor', 'Sturdy', 'Tough Claws']
	},
	'Rapidash-Mega': {
		types: ['Fire', 'Electric'],
		bs: {hp: 85, at: 130, df: 100, sa: 95, sd: 100, sp: 130},
		weightkg: 95.0,
		abilities: {0: 'Reckless'},
		innates: ['Speed Boost', 'Arc Flash', 'Speed Force']
	},
	'Rapidash-Mega-Galarian': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 85, at: 105, df: 90, sa: 122, sd: 90, sp: 148},
		weightkg: 95.0,
		abilities: {0: 'Mystic Blades'},
		innates: ['Unicorn', 'Energy Horns', 'Speed Force']
	},
	'Oricorio-Mega': {
		types: ['Flying'],
		bs: {hp: 75, at: 70, df: 90, sa: 138, sd: 90, sp: 133},
		weightkg: 3.4,
		abilities: {0: 'Dancer'},
		innates: ['Color Spectrum', 'Aerialist', 'Serene Grace']
	},
	'Aegislash-Mega': {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 70, at: 200, df: 200, sa: 20, sd: 40, sp: 70},
		weightkg: 53.0,
		abilities: {0: 'Adrenaline Rush'},
		innates: ['Shadow Tag', 'Dual Wield', 'Stance Change']
	},
	'Aegislash Blade-Redux-Mega': {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 70, at: 20, df: 40, sa: 200, sd: 200, sp: 70},
		weightkg: 53.0,
		abilities: {0: 'Adrenaline Rush'},
		innates: ['Shadow Tag', 'Mythical Arrows', 'Stance Change']
	},
	'Reuniclus-Redux-Mega': {
		types: ['Fire', 'Water'],
		bs: {hp: 110, at: 125, df: 105, sa: 165, sd: 105, sp: 30},
		weightkg: 20.1,
		abilities: {0: 'Elemental Vortex'},
		innates: ['Flame Bubble', 'Illuminate', 'Catastrophe']
	},
	'Hydreigon-Redux-Mega': {
		types: ['Fairy', 'Dragon'],
		bs: {hp: 100, at: 105, df: 130, sa: 165, sd: 130, sp: 70},
		weightkg: 160.0,
		abilities: {0: 'Mega Launcher'},
		innates: ['Eternal Blessing', 'Multi-Headed', 'Radiance']
	},
	'Cormoth-Mega': {
		types: ['Grass'],
		bs: {hp: 95, at: 70, df: 135, sa: 100, sd: 135, sp: 65},
		weightkg: 0.0,
		abilities: {0: 'Grass Pelt'},
		innates: ['Self Sufficient', 'Big Leaves', 'Seed Sower']
	},
	'Popcorm-Mega': {
		types: ['Grass', 'Fire'],
		bs: {hp: 95, at: 120, df: 60, sa: 110, sd: 100, sp: 115},
		weightkg: 0.0,
		abilities: {0: 'Butter Up'},
		innates: ['Puffy', 'Skill Link', 'Levitate']
	},
	'Torterra-Redux-Mega': {
		types: ['Flying', 'Electric'],
		bs: {hp: 95, at: 149, df: 184, sa: 85, sd: 85, sp: 37},
		weightkg: 310.0,
		abilities: {0: 'Giant Wings'},
		innates: ['Thundercall', 'Shell Armor', 'Impenetrable']
	},
	'Infernape-Redux-Mega': {
		types: ['Water', 'Fighting'],
		bs: {hp: 76, at: 135, df: 90, sa: 105, sd: 95, sp: 134},
		weightkg: 55.0,
		abilities: {0: 'Blitz Boxer'},
		innates: ['Nika', 'Raging Boxer', 'Riptide']
	},
	'Empoleon-Redux-Mega': {
		types: ['Fire', 'Ice'],
		bs: {hp: 84, at: 88, df: 80, sa: 141, sd: 111, sp: 131},
		weightkg: 84.5,
		abilities: {0: 'Frost Burn'},
		innates: ['Parental Bond', 'Thermomancy', 'Thermal Slide']
	},
	'Tsareena-Redux-Mega': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 68, at: 62, df: 100, sa: 140, sd: 130, sp: 130},
		weightkg: 21.4,
		abilities: {0: 'Inflatable'},
		innates: ['Water Bubble', 'Amplifier', 'Queenly Majesty']
	},
	'Toxtricity-Redux-Mega': {
		types: ['Electric', 'Dark'],
		bs: {hp: 80, at: 70, df: 115, sa: 139, sd: 80, sp: 118},
		weightkg: 40.0,
		abilities: {0: 'Piercing Solo'},
		innates: ['Metallic', 'Power Metal', 'Bass Boosted']
	},
	'Toxtricity-Redux-Fuzz-Mega': {
		types: ['Electric', 'Dark'],
		bs: {hp: 80, at: 70, df: 80, sa: 139, sd: 115, sp: 118},
		weightkg: 40.0,
		abilities: {0: 'Chunky Bass Line'},
		innates: ['Phantom', 'Banshee', 'Bass Boosted']
	},
	'Flygon-Redux-Mega': {
		types: ['Ice', 'Bug'],
		bs: {hp: 80, at: 130, df: 85, sa: 130, sd: 90, sp: 125},
		weightkg: 82.0,
		abilities: {0: 'Slush Rush'},
		innates: ['Dragonfly', 'Snowy Wrath', 'Fluffy']
	},
	'Clefable-Redux-Mega': {
		types: ['Rock'],
		bs: {hp: 95, at: 55, df: 103, sa: 140, sd: 120, sp: 95},
		weightkg: 40.0,
		abilities: {0: 'Lunar Affinity'},
		innates: ['Solid Rock', 'Dazzling', 'Moon Spirit']
	},
	'Glalie-Redux-Mega': {
		types: ['Dark', 'Fighting'],
		bs: {hp: 90, at: 120, df: 110, sa: 80, sd: 110, sp: 90},
		weightkg: 256.5,
		abilities: {0: 'Bloodlust'},
		innates: ['Rage Point', 'Battle Aura', 'Bad Omen']
	},
	'Froslass-Mega': {
		types: ['Dark', 'Ghost'],
		bs: {hp: 70, at: 120, df: 90, sa: 70, sd: 120, sp: 130},
		weightkg: 26.6,
		abilities: {0: 'Blood Stigma'},
		innates: ['Blood Stain', 'Dual Wield', 'Low Blow']
	},
	'Amphybuzz-Mega': {
		types: ['Bug', 'Fairy'],
		bs: {hp: 110, at: 95, df: 105, sa: 155, sd: 110, sp: 55},
		weightkg: 38.7,
		abilities: {0: 'Queen\'s Mourning'},
		innates: ['Imposing Wings', 'Fluffy', 'Pretty Princess']
	},
	'Urshifu-Mega': {
		types: ['Fighting', 'Dark'],
		bs: {hp: 100, at: 200, df: 120, sa: 60, sd: 70, sp: 110},
		weightkg: 105.0,
		abilities: {0: 'Way of Precision'},
		innates: ['Final Blow', 'Combat Specialist', 'Pretentious']
	},
	'Urshifu Rapid Strike Style-Mega': {
		types: ['Fighting', 'Water'],
		bs: {hp: 90, at: 170, df: 100, sa: 70, sd: 80, sp: 150},
		weightkg: 105.0,
		abilities: {0: 'Way of Swiftness'},
		innates: ['Final Blow', 'Combat Specialist', 'Technician']
	},
	'Melmetal-Mega': {
		types: ['Steel'],
		bs: {hp: 135, at: 183, df: 183, sa: 110, sd: 65, sp: 24},
		weightkg: 80.0,
		abilities: {0: 'Atomic Punch'},
		innates: ['Iron Giant', 'Steely Spirit', 'Transistor']
	},
	'Venusaur-Mega X': {
		types: ['Grass', 'Poison'],
		bs: {hp: 90, at: 125, df: 130, sa: 100, sd: 130, sp: 60},
		weightkg: 100.0,
		abilities: {0: 'Energy Siphon'},
		innates: ['Forest Rage', 'Whiplash', 'Long Reach']
	},
	'Blastoise-Mega X': {
		types: ['Water', 'Steel'],
		bs: {hp: 84, at: 145, df: 125, sa: 113, sd: 120, sp: 48},
		weightkg: 85.5,
		abilities: {0: 'Dauntless Shield'},
		innates: ['Riptide', 'Shell Armor', 'Skill Link']
	},
	'Gengar-Mega X': {
		types: ['Ghost', 'Poison'],
		bs: {hp: 65, at: 155, df: 100, sa: 70, sd: 100, sp: 115},
		weightkg: 40.5,
		abilities: {0: 'Shadow Tag'},
		innates: ['Jumpscare', 'Jaws of Carnage', 'Menacing Situation']
	},
	'Charizard-Mega Z': {
		types: ['Fire'],
		bs: {hp: 79, at: 94, df: 113, sa: 144, sd: 120, sp: 85},
		weightkg: 90.5,
		abilities: {0: 'Wildfire'},
		innates: ['Hellblaze', 'Fire Scales', 'Flame Shield']
	},
	'Snorlax-Mega': {
		types: ['Normal', 'Grass'],
		bs: {hp: 160, at: 130, df: 65, sa: 95, sd: 160, sp: 30},
		weightkg: 460.0,
		abilities: {0: 'Raw Wood'},
		innates: ['Self Repair', 'Thick Fat', 'Impenetrable']
	},
	'Rillaboom-Mega': {
		types: ['Grass'],
		bs: {hp: 100, at: 150, df: 105, sa: 105, sd: 110, sp: 65},
		weightkg: 90.0,
		abilities: {0: 'Rhythmic'},
		innates: ['Forest Rage', 'Higher Rank', 'Seed Sower']
	},
	'Cinderace-Mega': {
		types: ['Fire'],
		bs: {hp: 80, at: 145, df: 90, sa: 95, sd: 85, sp: 140},
		weightkg: 33.0,
		abilities: {0: 'Deadeye'},
		innates: ['Hellblaze', 'Striker', 'Libero']
	},
	'Inteleon-Mega': {
		types: ['Water'],
		bs: {hp: 75, at: 125, df: 70, sa: 150, sd: 70, sp: 145},
		weightkg: 45.2,
		abilities: {0: 'Deadeye'},
		innates: ['Riptide', 'Pretentious', 'Sniper']
	},
	'Corviknight-Mega': {
		types: ['Flying', 'Steel'],
		bs: {hp: 98, at: 68, df: 110, sa: 117, sd: 145, sp: 57},
		weightkg: 75.0,
		abilities: {0: 'Frisk'},
		innates: ['Wind Rage', 'Chrome Coat', 'Mirror Armor']
	},
	'Drednaw-Mega': {
		types: ['Water', 'Dragon'],
		bs: {hp: 90, at: 145, df: 120, sa: 78, sd: 68, sp: 84},
		weightkg: 115.5,
		abilities: {0: 'Mountaineer'},
		innates: ['Long Reach', 'Rocky Payload', 'Primal Maw']
	},
	'Coalossal-Mega': {
		types: ['Rock', 'Fire'],
		bs: {hp: 110, at: 100, df: 100, sa: 140, sd: 140, sp: 40},
		weightkg: 310.5,
		abilities: {0: 'Earth Eater'},
		innates: ['Steam Engine', 'Rocky Payload', 'Tar Toss']
	},
	'Sandaconda-Mega': {
		types: ['Ground', 'Flying'],
		bs: {hp: 72, at: 70, df: 135, sa: 142, sd: 85, sp: 106},
		weightkg: 65.5,
		abilities: {0: 'Sand Rush'},
		innates: ['Dune Terror', 'Aerilate', 'Mega Launcher']
	},
	'Copperajah-Mega': {
		types: ['Steel'],
		bs: {hp: 122, at: 160, df: 109, sa: 80, sd: 109, sp: 20},
		weightkg: 650.0,
		abilities: {0: 'Stall'},
		innates: ['Steely Spirit', 'Juggernaut', 'Battle Armor']
	},
	'Hatterene-Mega': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 57, at: 110, df: 95, sa: 166, sd: 133, sp: 49},
		weightkg: 5.1,
		abilities: {0: 'Raging Goddess'},
		innates: ['Pixilate', 'Magic Bounce', 'Psychic Mind']
	},
	'Garbodor-Mega': {
		types: ['Poison', 'Steel'],
		bs: {hp: 80, at: 130, df: 102, sa: 95, sd: 127, sp: 60},
		weightkg: 107.3,
		abilities: {0: 'Permanence'},
		innates: ['Watch Your Step', 'Steelworker', 'Trash Heap']
	},
	'Orbeetle-Mega': {
		types: ['Bug', 'Psychic'],
		bs: {hp: 60, at: 65, df: 130, sa: 120, sd: 150, sp: 100},
		weightkg: 40.8,
		abilities: {0: 'Power Spot'},
		innates: ['Gifted Mind', 'Magical Dust', 'Tinted Lens']
	},
	'Grimmsnarl-Mega': {
		types: ['Dark', 'Fairy'],
		bs: {hp: 95, at: 140, df: 75, sa: 110, sd: 105, sp: 85},
		weightkg: 61.0,
		abilities: {0: 'Fearmonger'},
		innates: ['Fur Coat', 'Prankster', 'Twinkle Toes']
	},
	'Centiskorch-Mega': {
		types: ['Fire', 'Bug'],
		bs: {hp: 100, at: 165, df: 90, sa: 85, sd: 90, sp: 95},
		weightkg: 120.0,
		abilities: {0: 'Mountaineer'},
		innates: ['Coil Up', 'Hyper Aggressive', 'Molten Down']
	},
	'Alcremie-Mega': {
		types: ['Fairy'],
		bs: {hp: 75, at: 80, df: 80, sa: 140, sd: 146, sp: 84},
		weightkg: 0.5,
		abilities: {0: 'Natural Cure'},
		innates: ['Fluffy', 'Super Hot Goo', 'Self Sufficient']
	},
	'Toxtricity-Mega': {
		types: ['Electric', 'Poison'],
		bs: {hp: 75, at: 82, df: 90, sa: 144, sd: 90, sp: 121},
		weightkg: 40.0,
		abilities: {0: 'Stun Shock'},
		innates: ['Sludgy Mix', 'Amplifier', 'Noise Cancel']
	},
	'Pikachu-Mega': {
		types: ['Electric'],
		bs: {hp: 50, at: 85, df: 65, sa: 135, sd: 80, sp: 120},
		weightkg: 6.0,
		abilities: {0: 'Ground Shock'},
		innates: ['Huge Power', 'Thick Fat', 'Thundercall']
	},
	'Eevee-Mega': {
		types: ['Normal'],
		bs: {hp: 65, at: 125, df: 65, sa: 120, sd: 110, sp: 50},
		weightkg: 6.5,
		abilities: {0: 'Prankster'},
		innates: ['Protean', 'Prim and Proper', 'Fluffiest']
	},
	'Meowth-Mega': {
		types: ['Normal'],
		bs: {hp: 50, at: 140, df: 75, sa: 85, sd: 60, sp: 125},
		weightkg: 4.2,
		abilities: {0: 'Good As Gold'},
		innates: ['On the Prowl', 'Mystic Power', 'Pure Power']
	},
	'Weavile-Mega': {
		types: ['Dark', 'Ice'],
		bs: {hp: 70, at: 135, df: 85, sa: 80, sd: 85, sp: 155},
		weightkg: 34.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Pressure', 'Predator', 'Tough Claws']
	},
	'Serperior-Mega': {
		types: ['Grass', 'Dragon'],
		bs: {hp: 83, at: 87, df: 125, sa: 90, sd: 125, sp: 125},
		weightkg: 63.0,
		abilities: {0: 'Scare'},
		innates: ['Forest Rage', 'Royal Decree', 'Multiscale']
	},
	'Emboar-Mega': {
		types: ['Fire', 'Fighting'],
		bs: {hp: 110, at: 148, df: 75, sa: 110, sd: 110, sp: 82},
		weightkg: 150.0,
		abilities: {0: 'Fire Ruler'},
		innates: ['Hellblaze', 'Evaporate', 'Brute Force']
	},
	'Samurott-Mega': {
		types: ['Water', 'Fighting'],
		bs: {hp: 95, at: 120, df: 100, sa: 120, sd: 100, sp: 100},
		weightkg: 94.6,
		abilities: {0: 'Mystic Blades'},
		innates: ['Riptide', 'Dual Wield', 'Adrenaline Rush']
	},
	'Decidueye-Mega': {
		types: ['Grass', 'Ghost'],
		bs: {hp: 78, at: 127, df: 75, sa: 100, sd: 90, sp: 165},
		weightkg: 36.6,
		abilities: {0: 'Hunter\'s Mark'},
		innates: ['Forest Rage', 'Super Sniper', 'Archer']
	},
	'Decidueye-Hisuian-Mega': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 90, at: 150, df: 100, sa: 80, sd: 90, sp: 125},
		weightkg: 36.6,
		abilities: {0: 'JunshiSanda'},
		innates: ['Gladiator', 'Combat Specialist', 'Aerodynamics']
	},
	'Incineroar-Mega': {
		types: ['Fire', 'Dark'],
		bs: {hp: 100, at: 135, df: 110, sa: 100, sd: 110, sp: 80},
		weightkg: 83.0,
		abilities: {0: 'Champion\'s Entrance'},
		innates: ['Hellblaze', 'Combat Specialist', 'Forsaken Heart']
	},
	'Meowscarada-Mega': {
		types: ['Grass', 'Dark'],
		bs: {hp: 81, at: 140, df: 70, sa: 121, sd: 70, sp: 153},
		weightkg: 31.2,
		abilities: {0: 'Conjurer Of Deceit'},
		innates: ['Forest Rage', 'Protean', 'Long Reach']
	},
	'Primarina-Mega': {
		types: ['Water', 'Fairy'],
		bs: {hp: 80, at: 104, df: 94, sa: 146, sd: 141, sp: 70},
		weightkg: 44.0,
		abilities: {0: 'Presto'},
		innates: ['Riptide', 'Liquid Voice', 'Water Absorb']
	},
	'Quaquaval-Mega': {
		types: ['Water', 'Fighting'],
		bs: {hp: 85, at: 140, df: 115, sa: 85, sd: 95, sp: 115},
		weightkg: 61.9,
		abilities: {0: 'Gladiator'},
		innates: ['Riptide', 'Moxie', 'Samba']
	},
	'Samurott-Hisuian-Mega': {
		types: ['Water', 'Dark'],
		bs: {hp: 90, at: 148, df: 90, sa: 120, sd: 75, sp: 112},
		weightkg: 94.6,
		abilities: {0: 'Relentless'},
		innates: ['Riptide', 'Shell Armor', 'Blademaster']
	},
	'Skeledirge-Mega': {
		types: ['Fire', 'Ghost'],
		bs: {hp: 104, at: 95, df: 120, sa: 130, sd: 100, sp: 86},
		weightkg: 326.5,
		abilities: {0: 'Banshee'},
		innates: ['Hellblaze', 'Flaming Soul', 'Amplifier']
	},
	'Typhlosion-Hisuian-Mega': {
		types: ['Fire', 'Ghost'],
		bs: {hp: 93, at: 89, df: 101, sa: 145, sd: 108, sp: 99},
		weightkg: 79.5,
		abilities: {0: 'Soul Devourer'},
		innates: ['Hellblaze', 'Early Grave', 'Vengeful Spirit']
	},
	'Mienshao-Mega': {
		types: ['Fighting', 'Flying'],
		bs: {hp: 65, at: 150, df: 65, sa: 150, sd: 65, sp: 115},
		weightkg: 35.5,
		abilities: {0: 'Aerodynamics'},
		innates: ['Combat Specialist', 'Regenerator', 'Qigong']
	},
	'Arcanine-Mega': {
		types: ['Fire'],
		bs: {hp: 90, at: 145, df: 100, sa: 135, sd: 100, sp: 130},
		weightkg: 155.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Guard Dog', 'Flame Coat', 'Immolate']
	},
	'Goodra-Mega': {
		types: ['Dragon'],
		bs: {hp: 90, at: 125, df: 85, sa: 140, sd: 170, sp: 90},
		weightkg: 150.5,
		abilities: {0: 'Poison Absorb'},
		innates: ['Acidic Slime', 'Sap Sipper', 'Shell Armor']
	},
	'Slowbro-Mega-Galarian': {
		types: ['Poison', 'Psychic'],
		bs: {hp: 95, at: 150, df: 110, sa: 150, sd: 70, sp: 15},
		weightkg: 78.5,
		abilities: {0: 'Unaware'},
		innates: ['Gunman', 'Quick Draw', 'Stall']
	},
	'Slowking-Mega-Galarian': {
		types: ['Poison', 'Psychic'],
		bs: {hp: 95, at: 70, df: 110, sa: 135, sd: 150, sp: 30},
		weightkg: 79.5,
		abilities: {0: 'Poison Absorb'},
		innates: ['Corrupted Mind', 'Shell Armor', 'Permanence']
	},
	'Roserade-Mega': {
		types: ['Grass', 'Poison'],
		bs: {hp: 60, at: 145, df: 70, sa: 145, sd: 90, sp: 125},
		weightkg: 14.5,
		abilities: {0: 'Technician'},
		innates: ['Equinox', 'Merciless', 'Long Reach']
	},
	'Clodsire-Mega': {
		types: ['Poison', 'Ground'],
		bs: {hp: 130, at: 145, df: 110, sa: 95, sd: 110, sp: 25},
		weightkg: 223.0,
		abilities: {0: 'Wonder Skin'},
		innates: ['Toxic Surge', 'Water Absorb', 'Poison Quills']
	},
	'Gothitelle-Mega': {
		types: ['Psychic', 'Dark'],
		bs: {hp: 80, at: 80, df: 120, sa: 130, sd: 150, sp: 80},
		weightkg: 44.0,
		abilities: {0: 'Mental Pollution'},
		innates: ['Madness Enhancement', 'Magic Guard', 'Low Visibility']
	},
	'Arcanine-Hisuian-Mega': {
		types: ['Fire', 'Rock'],
		bs: {hp: 90, at: 140, df: 110, sa: 110, sd: 110, sp: 140},
		weightkg: 155.0,
		abilities: {0: 'Tough Claws'},
		innates: ['Rock Head', 'Molten Coat', 'Reckless']
	},
	'Reuniclus-Mega': {
		types: ['Psychic'],
		bs: {hp: 110, at: 135, df: 105, sa: 135, sd: 125, sp: 30},
		weightkg: 20.1,
		abilities: {0: 'Magical Fists'},
		innates: ['Psychic Mind', 'Liquified', 'Magic Guard']
	},
	Kipmodo: {
		types: ['Dragon', 'Poison'],
		bs: {hp: 50, at: 61, df: 53, sa: 39, sd: 42, sp: 70},
		weightkg: 7.6,
		abilities: {0: 'Unaware'},
		innates: ['Amphibious', 'Poison Touch', 'Own Tempo']
	},
	Marshmodo: {
		types: ['Dragon', 'Poison'],
		bs: {hp: 65, at: 85, df: 65, sa: 45, sd: 63, sp: 97},
		weightkg: 28.0,
		abilities: {0: 'Regenerator'},
		innates: ['Amphibious', 'Poison Touch', 'Rattled']
	},
	Swampage: {
		types: ['Dragon', 'Poison'],
		bs: {hp: 95, at: 115, df: 75, sa: 60, sd: 73, sp: 117},
		weightkg: 81.9,
		abilities: {0: 'Regenerator'},
		innates: ['Amphibious', 'Poison Touch', 'Tough Claws']
	},
	'Swampage-Mega': {
		types: ['Dragon', 'Poison'],
		bs: {hp: 95, at: 143, df: 98, sa: 112, sd: 95, sp: 92},
		weightkg: 81.9,
		abilities: {0: 'Swamp Thing'},
		innates: ['Amphibious', 'Toxic Surge', 'Tough Claws']
	},
	'Chandelure-Mega X': {
		types: ['Ghost', 'Fire'],
		bs: {hp: 80, at: 65, df: 100, sa: 190, sd: 115, sp: 90},
		weightkg: 34.3,
		abilities: {0: 'Friend Guard'},
		innates: ['Chandelier', 'Multi-Headed', 'Flame Body']
	},
	'Zapdos-Mega': {
		types: ['Electric', 'Flying'],
		bs: {hp: 90, at: 110, df: 85, sa: 155, sd: 110, sp: 150},
		weightkg: 52.6,
		abilities: {0: 'Supercell'},
		innates: ['Lightning Aspect', 'Gale Wings', 'Static']
	},
	'Articuno-Mega': {
		types: ['Ice', 'Flying'],
		bs: {hp: 90, at: 85, df: 130, sa: 125, sd: 150, sp: 120},
		weightkg: 55.4,
		abilities: {0: 'Aurora\'s Gale'},
		innates: ['Ice Plumes', 'Winter Throne', 'Antarctic Bird']
	},
	'Moltres-Mega': {
		types: ['Fire', 'Flying'],
		bs: {hp: 90, at: 100, df: 95, sa: 200, sd: 95, sp: 120},
		weightkg: 60.0,
		abilities: {0: 'Blistering Sun'},
		innates: ['Fire Aspect', 'Molten Core', 'Majestic Bird']
	},
	'Zapdos Ex': {
		types: ['Electric', 'Flying'],
		bs: {hp: 90, at: 90, df: 85, sa: 135, sd: 90, sp: 110},
		weightkg: 52.6,
		abilities: {0: 'Overcharge'},
		innates: ['Volt Absorb', 'Ground Shock', 'Static']
	},
	'Articuno Ex': {
		types: ['Ice', 'Flying'],
		bs: {hp: 90, at: 85, df: 110, sa: 95, sd: 135, sp: 85},
		weightkg: 55.4,
		abilities: {0: 'North Wind'},
		innates: ['Antarctic Bird', 'Majestic Bird', 'Permafrost']
	},
	'Moltres Ex': {
		types: ['Fire', 'Flying'],
		bs: {hp: 90, at: 100, df: 90, sa: 125, sd: 85, sp: 90},
		weightkg: 60.0,
		abilities: {0: 'Air Blower'},
		innates: ['Flash Fire', 'Molten Down', 'Pyromancy']
	},
	'Minccino-Redux': {
		types: ['Ice', 'Fairy'],
		bs: {hp: 50, at: 30, df: 40, sa: 55, sd: 45, sp: 80},
		weightkg: 5.8,
		abilities: {0: 'Pastel Veil'},
		innates: ['Freezing Point', 'Arctic Fur', 'Serene Grace']
	},
	'Cinccino-Redux': {
		types: ['Ice', 'Fairy'],
		bs: {hp: 65, at: 60, df: 80, sa: 95, sd: 75, sp: 95},
		weightkg: 7.5,
		abilities: {0: 'Friend Guard'},
		innates: ['Arctic Fur', 'Overcoat', 'Serene Grace']
	},
	Frostuccino: {
		types: ['Ice', 'Fairy'],
		bs: {hp: 95, at: 105, df: 70, sa: 70, sd: 70, sp: 120},
		weightkg: 7.5,
		abilities: {0: 'Chilling Pellets'},
		innates: ['Arctic Fur', 'Tangling Hair', 'Frosty Prescence']
	},
	'Sinistea-Redux': {
		types: ['Ghost', 'Dragon'],
		bs: {hp: 45, at: 74, df: 60, sa: 30, sd: 64, sp: 35},
		weightkg: 0.2,
		abilities: {0: 'Draco Morale'},
		innates: ['Cursed Body', 'Limber', 'Fighting Spirit']
	},
	'Polteageist-Redux': {
		types: ['Ghost', 'Dragon'],
		bs: {hp: 80, at: 134, df: 85, sa: 45, sd: 114, sp: 50},
		weightkg: 0.4,
		abilities: {0: 'Overwhelm'},
		innates: ['Warmonger', 'Limber', 'Fighting Spirit']
	},
	'Cetoddle-Redux': {
		types: ['Steel'],
		bs: {hp: 60, at: 58, df: 78, sa: 30, sd: 46, sp: 62},
		weightkg: 15.0,
		abilities: {0: 'Predator'},
		innates: ['Monster Hunter', 'Steelworker', 'Chainsaw']
	},
	'Cetitan-Redux': {
		types: ['Steel', 'Dark'],
		bs: {hp: 80, at: 89, df: 120, sa: 62, sd: 80, sp: 90},
		weightkg: 700.0,
		abilities: {0: 'Keen Edge'},
		innates: ['Monster Hunter', 'Blood Price', 'Chainsaw']
	},
	'Talonflame-Mega': {
		types: ['Fire', 'Flying'],
		bs: {hp: 78, at: 121, df: 91, sa: 89, sd: 94, sp: 126},
		weightkg: 24.5,
		abilities: {0: 'Galeforce Wings'},
		innates: ['Hyper Aggressive', 'Predator', 'Big Pecks']
	},
	'Carbonix-Mega': {
		types: ['Rock', 'Dragon'],
		bs: {hp: 75, at: 55, df: 105, sa: 145, sd: 230, sp: 20},
		weightkg: 210.0,
		abilities: {0: 'Desert Cloak'},
		innates: ['Crystalline Armor', 'Arcane Force', 'Adaptability']
	},
	'Grotom Glass': {
		types: ['Poison', 'Rock'],
		bs: {hp: 70, at: 110, df: 107, sa: 65, sd: 107, sp: 71},
		weightkg: 0.3,
		abilities: {0: 'Sharp Edges'},
		innates: ['Water Absorb', 'Clear Body', 'Slime Mold']
	},
	'Grotom Roll': {
		types: ['Poison', 'Ground'],
		bs: {hp: 70, at: 110, df: 107, sa: 65, sd: 107, sp: 71},
		weightkg: 0.3,
		abilities: {0: 'Inflatable'},
		innates: ['Water Absorb', 'Let\'s Roll', 'Slime Mold']
	},
	'Grotom Drum': {
		types: ['Poison', 'Steel'],
		bs: {hp: 70, at: 110, df: 107, sa: 65, sd: 107, sp: 71},
		weightkg: 0.3,
		abilities: {0: 'Fort Knox'},
		innates: ['Water Absorb', 'Lead Coat', 'Gooey']
	},
	'Grotom Kick': {
		types: ['Poison', 'Fighting'],
		bs: {hp: 70, at: 110, df: 107, sa: 65, sd: 107, sp: 71},
		weightkg: 0.3,
		abilities: {0: 'Roundhouse'},
		innates: ['Water Absorb', 'Striker', 'Slime Mold']
	},
	'Grotom Fill': {
		types: ['Poison', 'Dark'],
		bs: {hp: 70, at: 110, df: 107, sa: 65, sd: 107, sp: 71},
		weightkg: 0.3,
		abilities: {0: 'Innards Out'},
		innates: ['Water Absorb', 'Overcoat', 'Slime Mold']
	},
	'Heracreus-Mega': {
		types: ['Grass', 'Fairy'],
		bs: {hp: 75, at: 120, df: 130, sa: 75, sd: 110, sp: 90},
		weightkg: 6.9,
		abilities: {0: 'Venom Crown'},
		innates: ['Dragonfruit', 'Equinox', 'Spike Armor']
	},
	'Wispywaspy Hivemind': {
		types: ['Bug', 'Ghost'],
		bs: {hp: 50, at: 130, df: 120, sa: 130, sd: 115, sp: 75},
		weightkg: 0.3,
		abilities: {0: 'Shield Dust'},
		innates: ['Locust Swarm', 'Shadow Shield', 'Curse of Famine']
	},
	'Dragapult-Mega': {
		types: ['Dragon', 'Ghost'],
		bs: {hp: 88, at: 125, df: 93, sa: 125, sd: 93, sp: 176},
		weightkg: 50.0,
		abilities: {0: 'Blur'},
		innates: ['Parental Bond', 'Infiltrator', 'Mach 3']
	},
	'Sandslash-Alolan-Mega': {
		types: ['Ice', 'Steel'],
		bs: {hp: 95, at: 125, df: 135, sa: 55, sd: 75, sp: 85},
		weightkg: 29.5,
		abilities: {0: 'Whiteout'},
		innates: ['Ice Picks', 'Battle Armor', 'Sharp Edges']
	},
	'Kleavor-Mega': {
		types: ['Bug', 'Rock'],
		bs: {hp: 70, at: 165, df: 130, sa: 65, sd: 75, sp: 95},
		weightkg: 10.0,
		abilities: {0: 'Mineralize'},
		innates: ['Stonecutter', 'Dual Wield', 'Technician']
	},
	'Scyther-Mega': {
		types: ['Bug', 'Flying'],
		bs: {hp: 70, at: 130, df: 80, sa: 125, sd: 80, sp: 115},
		weightkg: 56.0,
		abilities: {0: 'Aerilate'},
		innates: ['Perfectionist', 'Edgelord', 'Technician']
	},
	'Hydreigon-Mega': {
		types: ['Dark', 'Dragon'],
		bs: {hp: 92, at: 115, df: 123, sa: 165, sd: 90, sp: 115},
		weightkg: 160.0,
		abilities: {0: 'Wings of Pestilence'},
		innates: ['Hydra', 'Mind Crunch', 'Merciless']
	},
	'Vanilluxe-Mega': {
		types: ['Ice'],
		bs: {hp: 71, at: 110, df: 115, sa: 145, sd: 105, sp: 105},
		weightkg: 57.5,
		abilities: {0: 'Snow Cloak'},
		innates: ['Multi-Headed', 'Sundae', 'Slush Rush']
	},
	'Pentadug-Alolan': {
		types: ['Ground', 'Steel'],
		bs: {hp: 95, at: 120, df: 90, sa: 55, sd: 75, sp: 90},
		weightkg: 6.9,
		abilities: {0: 'Costar'},
		innates: ['Multi-Headed', 'Steely Spirit', 'Moustache']
	},
	'Rattata-Redux': {
		types: ['Poison'],
		bs: {hp: 35, at: 66, df: 40, sa: 20, sd: 30, sp: 62},
		weightkg: 3.5,
		abilities: {0: 'Hustle'},
		innates: ['Poison Touch', 'Stench', 'Scrappy']
	},
	'Raticate-Redux': {
		types: ['Poison', 'Fighting'],
		bs: {hp: 70, at: 86, df: 80, sa: 40, sd: 55, sp: 82},
		weightkg: 18.5,
		abilities: {0: 'Hustle'},
		innates: ['Poison Touch', 'Stench', 'Scrappy']
	},
	'Vanillite-Redux': {
		types: ['Ice', 'Fire'],
		bs: {hp: 51, at: 64, df: 55, sa: 46, sd: 44, sp: 61},
		weightkg: 5.7,
		abilities: {0: 'Flash Fire'},
		innates: ['Solid Rock', 'Molten Down', 'Crispy Cream']
	},
	'Vanillish-Redux': {
		types: ['Ice', 'Fire'],
		bs: {hp: 66, at: 84, df: 73, sa: 50, sd: 61, sp: 77},
		weightkg: 41.0,
		abilities: {0: 'Well Baked Body'},
		innates: ['Solid Rock', 'Own Tempo', 'Crispy Cream']
	},
	'Vanilluxe-Redux': {
		types: ['Ice', 'Fire'],
		bs: {hp: 91, at: 125, df: 100, sa: 70, sd: 90, sp: 75},
		weightkg: 57.5,
		abilities: {0: 'Well Baked Body'},
		innates: ['Solid Rock', 'Molten Down', 'Crispy Cream']
	},
	'Vanilluxe-Redux-Mega': {
		types: ['Ice', 'Fire'],
		bs: {hp: 91, at: 155, df: 110, sa: 110, sd: 105, sp: 80},
		weightkg: 57.5,
		abilities: {0: 'Deep Fried'},
		innates: ['Solid Rock', 'Gooey', 'Crispy Cream']
	},
	'Litwick-Redux': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 45, at: 39, df: 64, sa: 74, sd: 58, sp: 25},
		weightkg: 3.1,
		abilities: {0: 'Backup Power'},
		innates: ['Illuminate', 'Cursed Body', 'Static']
	},
	'Lampent-Redux': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 72, at: 40, df: 64, sa: 95, sd: 64, sp: 35},
		weightkg: 13.0,
		abilities: {0: 'Backup Power'},
		innates: ['Illuminate', 'Cursed Body', 'Levitate']
	},
	'Chandelure-Redux': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 100, at: 55, df: 90, sa: 145, sd: 90, sp: 60},
		weightkg: 34.3,
		abilities: {0: 'Backup Power'},
		innates: ['Illuminate', 'Cursed Body', 'Levitate']
	},
	'Chandelure-Mega': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 100, at: 75, df: 110, sa: 165, sd: 110, sp: 80},
		weightkg: 34.3,
		abilities: {0: 'Backup Power'},
		innates: ['Radiance', 'Power Leak', 'Levitate']
	},
	'Drilbur-Redux': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 73, at: 63, df: 59, sa: 32, sd: 59, sp: 42},
		weightkg: 8.5,
		abilities: {0: 'Hyper Cutter'},
		innates: ['Mineralize', 'Thick Skin', 'Rattled']
	},
	'Excadrill-Redux': {
		types: ['Dragon', 'Ground'],
		bs: {hp: 98, at: 105, df: 85, sa: 55, sd: 85, sp: 90},
		weightkg: 40.4,
		abilities: {0: 'Tough Claws'},
		innates: ['Rocky Exterior', 'Thick Fat', 'Dragon\'s Maw']
	},
	Rexcadrill: {
		types: ['Dragon', 'Ground'],
		bs: {hp: 118, at: 135, df: 85, sa: 50, sd: 105, sp: 75},
		weightkg: 6.9,
		abilities: {0: 'Tough Claws'},
		innates: ['Rock Armor', 'Thick Blubber', 'Dragon\'s Maw']
	},
	'Swinub-Redux': {
		types: ['Ground', 'Grass'],
		bs: {hp: 45, at: 55, df: 45, sa: 25, sd: 45, sp: 35},
		weightkg: 6.5,
		abilities: {0: 'Sap Sipper'},
		innates: ['Overcoat', 'Own Tempo', 'Gluttony']
	},
	'Piloswine-Redux': {
		types: ['Ground', 'Grass'],
		bs: {hp: 70, at: 102, df: 84, sa: 55, sd: 65, sp: 74},
		weightkg: 55.8,
		abilities: {0: 'Sap Sipper'},
		innates: ['Overcoat', 'Own Tempo', 'Natural Cure']
	},
	'Mamoswine-Redux': {
		types: ['Ground', 'Grass'],
		bs: {hp: 110, at: 120, df: 80, sa: 70, sd: 80, sp: 70},
		weightkg: 291.0,
		abilities: {0: 'Earthbound'},
		innates: ['Grass Pelt', 'Thick Fat', 'Harvest']
	},
	'Mamoswine-Mega': {
		types: ['Ground', 'Grass'],
		bs: {hp: 110, at: 140, df: 100, sa: 90, sd: 100, sp: 90},
		weightkg: 291.0,
		abilities: {0: 'Craving'},
		innates: ['Seed Sower', 'Thick Fat', 'Resilience']
	},
	Selenumbra: {
		types: ['Bug', 'Dark'],
		bs: {hp: 85, at: 65, df: 85, sa: 145, sd: 105, sp: 115},
		weightkg: 6.9,
		abilities: {0: 'Moon Spirit'},
		innates: ['Phantom', 'Lunar Wrath', 'Levitate']
	},
	'Larvesta-Redux': {
		types: ['Bug', 'Dark'],
		bs: {hp: 45, at: 43, df: 52, sa: 78, sd: 92, sp: 50},
		weightkg: 28.8,
		abilities: {0: 'Illuminate'},
		innates: ['Phantom', 'Overcoat', 'Nocturnal']
	},
	'Volcarona-Redux': {
		types: ['Bug', 'Dark'],
		bs: {hp: 65, at: 80, df: 90, sa: 100, sd: 110, sp: 105},
		weightkg: 46.0,
		abilities: {0: 'Moon Spirit'},
		innates: ['Phantom', 'Prism Armor', 'Levitate']
	},
	'Klefki-Redux': {
		types: ['Electric', 'Poison'],
		bs: {hp: 77, at: 95, df: 71, sa: 95, sd: 77, sp: 85},
		weightkg: 3.0,
		abilities: {0: 'Volt Absorb'},
		innates: ['Spyware', 'Infiltrator', 'Levitate']
	},
	'Bellsprout-Redux': {
		types: ['Grass', 'Ice'],
		bs: {hp: 66, at: 46, df: 62, sa: 46, sd: 58, sp: 42},
		weightkg: 4.0,
		abilities: {0: 'Snow Cloak'},
		innates: ['Phantom', 'Overgrow', 'Permafrost']
	},
	'Weepinbell-Redux': {
		types: ['Grass', 'Ice'],
		bs: {hp: 91, at: 70, df: 91, sa: 47, sd: 69, sp: 42},
		weightkg: 6.4,
		abilities: {0: 'Ice Body'},
		innates: ['Frostmaw', 'Bad Omen', 'Dead Bark']
	},
	'Victreebel-Redux': {
		types: ['Grass', 'Ice'],
		bs: {hp: 106, at: 96, df: 112, sa: 76, sd: 89, sp: 51},
		weightkg: 15.5,
		abilities: {0: 'Ice Body'},
		innates: ['Sap Trap', 'Bad Luck', 'Dead Bark']
	},
	'Sawk-Redux': {
		types: ['Normal'],
		bs: {hp: 95, at: 95, df: 75, sa: 30, sd: 75, sp: 95},
		weightkg: 51.0,
		abilities: {0: 'Normalize'},
		innates: ['Super Luck', 'Home Run', 'Super Slammer']
	},
	'Throh-Redux': {
		types: ['Normal'],
		bs: {hp: 110, at: 100, df: 100, sa: 30, sd: 80, sp: 45},
		weightkg: 55.5,
		abilities: {0: 'Battle Armor'},
		innates: ['Bulletproof', 'Rocky Payload', 'Stamina']
	},
	'Sneasler-Mega': {
		types: ['Fighting', 'Poison'],
		bs: {hp: 80, at: 155, df: 70, sa: 65, sd: 120, sp: 120},
		weightkg: 43.0,
		abilities: {0: 'Weak Armor'},
		innates: ['Lead Claws', 'Rocky Exterior', 'Mountaineer']
	},
	'Clefable-Mega': {
		types: ['Fairy'],
		bs: {hp: 100, at: 60, df: 115, sa: 115, sd: 133, sp: 85},
		weightkg: 40.0,
		abilities: {0: 'Dazzling'},
		innates: ['Cosmic Wings', 'Cosmic Dust', 'Moon Spirit']
	},
	'Tsareena-Mega': {
		types: ['Grass', 'Fighting'],
		bs: {hp: 72, at: 142, df: 108, sa: 72, sd: 108, sp: 128},
		weightkg: 21.4,
		abilities: {0: 'Defiant'},
		innates: ['Empress', 'Striker', 'Deadly Precision']
	},
	'Goodra-Hisuian-Mega': {
		types: ['Dragon', 'Steel'],
		bs: {hp: 80, at: 130, df: 140, sa: 130, sd: 160, sp: 60},
		weightkg: 150.5,
		abilities: {0: 'Gooey'},
		innates: ['Fortress', 'Impenetrable', 'Bulletproof']
	},
	'Hariyama-Mega': {
		types: ['Fighting'],
		bs: {hp: 144, at: 130, df: 100, sa: 60, sd: 100, sp: 70},
		weightkg: 253.8,
		abilities: {0: 'Steadfast'},
		innates: ['Sumo Guard', 'Sumo Wrestler', 'Vital Spirit']
	},
	'Swablu-Redux': {
		types: ['Fire', 'Water'],
		bs: {hp: 46, at: 48, df: 62, sa: 55, sd: 75, sp: 54},
		weightkg: 1.2,
		abilities: {0: 'Overcoat'},
		innates: ['Flash Fire', 'Levitate', 'Water Absorb']
	},
	'Altaria-Redux': {
		types: ['Fire', 'Water'],
		bs: {hp: 72, at: 68, df: 82, sa: 95, sd: 115, sp: 78},
		weightkg: 20.6,
		abilities: {0: 'Evaporate'},
		innates: ['Taste the Rainbow', 'Levitate', 'Overcoat']
	},
	'Altaria-Redux-Mega': {
		types: ['Fire', 'Water'],
		bs: {hp: 72, at: 84, df: 102, sa: 109, sd: 155, sp: 88},
		weightkg: 20.6,
		abilities: {0: 'Evaporate'},
		innates: ['Rainbow Scales', 'Aerialist', 'Serene Grace']
	},
	Eraticate: {
		types: ['Poison', 'Fighting'],
		bs: {hp: 100, at: 122, df: 90, sa: 50, sd: 75, sp: 71},
		weightkg: 6.9,
		abilities: {0: 'Rat King'},
		innates: ['Poison Touch', 'Stench', 'Looter']
	},
	'Exeggcute-Redux': {
		types: ['Grass', 'Normal'],
		bs: {hp: 60, at: 56, df: 55, sa: 54, sd: 80, sp: 20},
		weightkg: 2.5,
		abilities: {0: 'Grassy Surge'},
		innates: ['Raw Wood', 'Multi-Headed', 'Effect Spore']
	},
	'Exeggutor-Redux': {
		types: ['Grass', 'Normal'],
		bs: {hp: 100, at: 60, df: 105, sa: 130, sd: 105, sp: 30},
		weightkg: 120.0,
		abilities: {0: 'Triage'},
		innates: ['Rite Of Spring', 'Multi-Headed', 'Oblivious']
	},
	'Luxzero-Mega': {
		types: ['Electric', 'Ice'],
		bs: {hp: 75, at: 125, df: 84, sa: 125, sd: 94, sp: 130},
		weightkg: 42.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Flawless Precision', 'Fluffy', 'Predator']
	},
	Kecleong: {
		types: ['Ice', 'Normal'],
		bs: {hp: 90, at: 90, df: 70, sa: 95, sd: 120, sp: 95},
		weightkg: 120.0,
		abilities: {0: 'Prismatic Fur'},
		innates: ['Retribution Blow', 'Thick Fat', 'North Wind']
	},
	'Noibat-Redux': {
		types: ['Rock', 'Ghost'],
		bs: {hp: 50, at: 75, df: 45, sa: 30, sd: 50, sp: 95},
		weightkg: 8.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Levitate', 'Nocturnal', 'Vengeance']
	},
	'Noivern-Redux': {
		types: ['Rock', 'Ghost'],
		bs: {hp: 85, at: 97, df: 80, sa: 70, sd: 80, sp: 123},
		weightkg: 85.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Levitate', 'Nocturnal', 'Vengeance']
	},
	Luxzero: {
		types: ['Electric', 'Ice'],
		bs: {hp: 75, at: 110, df: 74, sa: 90, sd: 74, sp: 110},
		weightkg: 42.0,
		abilities: {0: 'Pressure'},
		innates: ['Fatal Precision', 'Fluffy', 'Predator']
	},
	Clawtificer: {
		types: ['Fire', 'Electric'],
		bs: {hp: 86, at: 65, df: 83, sa: 110, sd: 82, sp: 110},
		weightkg: 35.3,
		abilities: {0: 'Elemental Charge'},
		innates: ['Ice Age', 'Levitate', 'Dual Wield']
	},
	'Honedge-Redux': {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 45, at: 95, df: 85, sa: 35, sd: 37, sp: 28},
		weightkg: 2.0,
		abilities: {0: 'Soul Eater'},
		innates: ['Sweeping Edge', 'Vengeance', 'Cursed Body']
	},
	'Doublade-Redux': {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 59, at: 125, df: 110, sa: 45, sd: 49, sp: 60},
		weightkg: 4.5,
		abilities: {0: 'Soul Eater'},
		innates: ['Sweeping Edge', 'Vengeance', 'Cursed Body']
	},
	'Aegislash-Redux': {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 70, at: 140, df: 140, sa: 20, sd: 70, sp: 60},
		weightkg: 53.0,
		abilities: {0: 'Soul Eater'},
		innates: ['Shadow Tag', 'Keen Edge', 'Stance Change']
	},
	'Aegislash Blade-Redux': {
		types: ['Fighting', 'Ghost'],
		bs: {hp: 70, at: 20, df: 70, sa: 140, sd: 140, sp: 60},
		weightkg: 53.0,
		abilities: {0: 'Soul Eater'},
		innates: ['Shadow Tag', 'Mythical Arrows', 'Stance Change']
	},
	'Abra-Redux': {
		types: ['Dark'],
		bs: {hp: 25, at: 20, df: 55, sa: 105, sd: 15, sp: 90},
		weightkg: 19.5,
		abilities: {0: 'Intimidate'},
		innates: ['Cheap Tactics', 'Nocturnal', 'Bad Luck']
	},
	'Kadabra-Redux': {
		types: ['Dark', 'Fighting'],
		bs: {hp: 40, at: 120, df: 105, sa: 35, sd: 70, sp: 30},
		weightkg: 56.5,
		abilities: {0: 'Exploit Weakness'},
		innates: ['Cheap Tactics', 'Super Slammer', 'Nocturnal']
	},
	'Alakazam-Redux': {
		types: ['Dark'],
		bs: {hp: 55, at: 50, df: 95, sa: 135, sd: 45, sp: 120},
		weightkg: 48.0,
		abilities: {0: 'Minion Control'},
		innates: ['Cheap Tactics', 'Mystic Power', 'Nocturnal']
	},
	'Weedle-Redux': {
		types: ['Ice', 'Poison'],
		bs: {hp: 40, at: 35, df: 30, sa: 20, sd: 20, sp: 50},
		weightkg: 3.2,
		abilities: {0: 'Compound Eyes'},
		innates: ['Ice Scales', 'Ice Dew', 'Overcoat']
	},
	'Kakuna-Redux': {
		types: ['Ice', 'Poison'],
		bs: {hp: 45, at: 25, df: 50, sa: 25, sd: 25, sp: 35},
		weightkg: 10.0,
		abilities: {0: 'Shed Skin'},
		innates: ['Ice Body', 'Ice Dew', 'Overcoat']
	},
	'Beedrill-Redux': {
		types: ['Ice', 'Poison'],
		bs: {hp: 65, at: 110, df: 40, sa: 45, sd: 80, sp: 135},
		weightkg: 29.5,
		abilities: {0: 'Freezing Point'},
		innates: ['Skill Link', 'Exploit Weakness', 'Levitate']
	},
	'Stufful-Redux': {
		types: ['Normal', 'Fairy'],
		bs: {hp: 70, at: 65, df: 60, sa: 65, sd: 45, sp: 35},
		weightkg: 6.8,
		abilities: {0: 'Cute Charm'},
		innates: ['Fluffy', 'Guts', 'Innards Out']
	},
	'Bewear-Redux': {
		types: ['Normal', 'Fairy'],
		bs: {hp: 120, at: 115, df: 80, sa: 85, sd: 55, sp: 45},
		weightkg: 135.0,
		abilities: {0: 'No Guard'},
		innates: ['Fluffy', 'Entrance', 'Cute Charm']
	},
	'Panpour-Redux': {
		types: ['Psychic'],
		bs: {hp: 50, at: 43, df: 45, sa: 75, sd: 45, sp: 64},
		weightkg: 13.5,
		abilities: {0: 'Trace'},
		innates: ['Psychic Mind', 'Super Luck', 'Magic Bounce']
	},
	'Simipour-Redux': {
		types: ['Psychic'],
		bs: {hp: 110, at: 70, df: 79, sa: 110, sd: 60, sp: 91},
		weightkg: 29.0,
		abilities: {0: 'Trace'},
		innates: ['Psychic Mind', 'Super Luck', 'Magic Bounce']
	},
	'Pansage-Redux': {
		types: ['Fighting'],
		bs: {hp: 44, at: 63, df: 43, sa: 63, sd: 43, sp: 66},
		weightkg: 10.5,
		abilities: {0: 'Competitive'},
		innates: ['Fighter', 'Inner Focus', 'Parry']
	},
	'Simisage-Redux': {
		types: ['Fighting'],
		bs: {hp: 75, at: 99, df: 63, sa: 110, sd: 63, sp: 110},
		weightkg: 30.5,
		abilities: {0: 'Competitive'},
		innates: ['Fighter', 'Inner Focus', 'Parry']
	},
	'Pansear-Redux': {
		types: ['Dark'],
		bs: {hp: 50, at: 61, df: 48, sa: 43, sd: 55, sp: 65},
		weightkg: 11.0,
		abilities: {0: 'Prankster'},
		innates: ['Nocturnal', 'Low Blow', 'Pickup']
	},
	'Simisear-Redux': {
		types: ['Dark'],
		bs: {hp: 80, at: 100, df: 79, sa: 70, sd: 90, sp: 101},
		weightkg: 28.0,
		abilities: {0: 'Prankster'},
		innates: ['Nocturnal', 'Low Blow', 'Pickup']
	},
	'Slugma-Redux': {
		types: ['Grass'],
		bs: {hp: 50, at: 40, df: 50, sa: 75, sd: 20, sp: 15},
		weightkg: 35.0,
		abilities: {0: 'Simple'},
		innates: ['Shell Armor', 'Natural Cure', 'Harvest']
	},
	'Magcargo-Redux': {
		types: ['Grass', 'Rock'],
		bs: {hp: 70, at: 50, df: 140, sa: 100, sd: 45, sp: 25},
		weightkg: 55.0,
		abilities: {0: 'Shell Armor'},
		innates: ['Overcoat', 'Harvest', 'Impenetrable']
	},
	'Buizel-Redux': {
		types: ['Flying'],
		bs: {hp: 50, at: 50, df: 40, sa: 50, sd: 40, sp: 100},
		weightkg: 29.5,
		abilities: {0: 'Technician'},
		innates: ['Aerodynamics', 'Keen Eye', 'Cloud Nine']
	},
	'Floatzel-Redux': {
		types: ['Flying'],
		bs: {hp: 80, at: 85, df: 60, sa: 85, sd: 60, sp: 125},
		weightkg: 33.5,
		abilities: {0: 'Technician'},
		innates: ['Aerodynamics', 'Keen Eye', 'Cloud Nine']
	},
	'Azelf-Redux': {
		types: ['Dark', 'Fairy'],
		bs: {hp: 70, at: 130, df: 65, sa: 130, sd: 65, sp: 120},
		weightkg: 0.3,
		abilities: {0: 'Comatose'},
		innates: ['Levitate', 'Dark Aura', 'Malicious']
	},
	'Mesprit-Redux': {
		types: ['Dark', 'Fairy'],
		bs: {hp: 75, at: 110, df: 100, sa: 110, sd: 100, sp: 85},
		weightkg: 0.3,
		abilities: {0: 'Tinted Lens'},
		innates: ['Levitate', 'Dark Aura', 'Malicious']
	},
	'Uxie-Redux': {
		types: ['Dark', 'Fairy'],
		bs: {hp: 80, at: 80, df: 130, sa: 80, sd: 130, sp: 80},
		weightkg: 0.3,
		abilities: {0: 'Unaware'},
		innates: ['Levitate', 'Dark Aura', 'Malicious']
	},
	'Machop-Redux': {
		types: ['Fighting', 'Dragon'],
		bs: {hp: 50, at: 70, df: 70, sa: 15, sd: 65, sp: 35},
		weightkg: 19.5,
		abilities: {0: 'Overwhelm'},
		innates: ['No Guard', 'Iron Fist', 'Guts']
	},
	'Machoke-Redux': {
		types: ['Fighting', 'Dragon'],
		bs: {hp: 60, at: 80, df: 100, sa: 30, sd: 90, sp: 45},
		weightkg: 70.5,
		abilities: {0: 'Overwhelm'},
		innates: ['No Guard', 'Iron Fist', 'Guts']
	},
	'Machamp-Redux': {
		types: ['Fighting', 'Dragon'],
		bs: {hp: 70, at: 110, df: 110, sa: 45, sd: 115, sp: 55},
		weightkg: 130.0,
		abilities: {0: 'Overwhelm'},
		innates: ['Impenetrable', 'Iron Fist', 'Guts']
	},
	'Solosis-Redux': {
		types: ['Fire', 'Water'],
		bs: {hp: 45, at: 30, df: 50, sa: 95, sd: 50, sp: 20},
		weightkg: 1.0,
		abilities: {0: 'Overcoat'},
		innates: ['Hydration', 'Flaming Soul', 'Adaptability']
	},
	'Duosion-Redux': {
		types: ['Fire', 'Water'],
		bs: {hp: 75, at: 40, df: 60, sa: 105, sd: 60, sp: 30},
		weightkg: 8.0,
		abilities: {0: 'Overcoat'},
		innates: ['Hydration', 'Flaming Soul', 'Adaptability']
	},
	'Reuniclus-Redux': {
		types: ['Fire', 'Water'],
		bs: {hp: 110, at: 115, df: 85, sa: 115, sd: 85, sp: 30},
		weightkg: 20.1,
		abilities: {0: 'Overcoat'},
		innates: ['Water Bubble', 'Flaming Soul', 'Catastrophe']
	},
	'Skarmory-Redux': {
		types: ['Steel', 'Fire'],
		bs: {hp: 75, at: 110, df: 90, sa: 50, sd: 60, sp: 110},
		weightkg: 50.5,
		abilities: {0: 'Molten Down'},
		innates: ['Levitate', 'Keen Edge', 'Opportunist']
	},
	'Growlithe-Redux': {
		types: ['Fire', 'Grass'],
		bs: {hp: 55, at: 60, df: 65, sa: 50, sd: 60, sp: 60},
		weightkg: 19.0,
		abilities: {0: 'Scare'},
		innates: ['Raw Wood', 'Stench', 'Flash Fire']
	},
	'Arcanine-Redux': {
		types: ['Fire', 'Grass'],
		bs: {hp: 90, at: 115, df: 90, sa: 105, sd: 90, sp: 110},
		weightkg: 155.0,
		abilities: {0: 'Scare'},
		innates: ['Raw Wood', 'Stench', 'Flash Fire']
	},
	'Whismur-Redux': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 84, at: 36, df: 53, sa: 45, sd: 63, sp: 19},
		weightkg: 16.3,
		abilities: {0: 'Soundproof'},
		innates: ['White Noise', 'Galvanize', 'Amplifier']
	},
	'Loudred-Redux': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 104, at: 62, df: 73, sa: 71, sd: 83, sp: 39},
		weightkg: 40.5,
		abilities: {0: 'Noise Cancel'},
		innates: ['White Noise', 'Galvanize', 'Amplifier']
	},
	'Exploud-Redux': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 134, at: 61, df: 103, sa: 91, sd: 113, sp: 98},
		weightkg: 84.0,
		abilities: {0: 'Noise Cancel'},
		innates: ['White Noise', 'Galvanize', 'Amplifier']
	},
	'Gible-Redux': {
		types: ['Water', 'Ghost'],
		bs: {hp: 50, at: 80, df: 35, sa: 30, sd: 55, sp: 50},
		weightkg: 20.5,
		abilities: {0: 'Predator'},
		innates: ['Hydration', 'Keen Edge', 'Hyper Aggressive']
	},
	'Gabite-Redux': {
		types: ['Water', 'Ghost'],
		bs: {hp: 60, at: 100, df: 55, sa: 40, sd: 65, sp: 90},
		weightkg: 56.0,
		abilities: {0: 'Predator'},
		innates: ['Hydration', 'Keen Edge', 'Hyper Aggressive']
	},
	'Garchomp-Redux': {
		types: ['Water', 'Ghost'],
		bs: {hp: 100, at: 140, df: 85, sa: 70, sd: 95, sp: 110},
		weightkg: 95.0,
		abilities: {0: 'Predator'},
		innates: ['Hydration', 'Keen Edge', 'Hyper Aggressive']
	},
	'Deino-Redux': {
		types: ['Fairy', 'Dragon'],
		bs: {hp: 52, at: 45, df: 50, sa: 65, sd: 50, sp: 38},
		weightkg: 17.3,
		abilities: {0: 'Mega Launcher'},
		innates: ['Celestial Blessing', 'Tangling Hair', 'Misty Surge']
	},
	'Zweilous-Redux': {
		types: ['Fairy', 'Dragon'],
		bs: {hp: 72, at: 65, df: 70, sa: 85, sd: 70, sp: 58},
		weightkg: 50.0,
		abilities: {0: 'Mega Launcher'},
		innates: ['Celestial Blessing', 'Multi-Headed', 'Misty Surge']
	},
	'Hydreigon-Redux': {
		types: ['Fairy', 'Dragon'],
		bs: {hp: 100, at: 105, df: 100, sa: 125, sd: 100, sp: 70},
		weightkg: 160.0,
		abilities: {0: 'Mega Launcher'},
		innates: ['Celestial Blessing', 'Multi-Headed', 'Misty Surge']
	},
	'Pawniard-Redux': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 45, at: 75, df: 65, sa: 40, sd: 40, sp: 75},
		weightkg: 10.2,
		abilities: {0: 'Defiant'},
		innates: ['Keen Edge', 'Intimidate', 'Rattled']
	},
	'Bisharp-Redux': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 75, at: 115, df: 75, sa: 60, sd: 75, sp: 90},
		weightkg: 70.0,
		abilities: {0: 'Defiant'},
		innates: ['Keen Edge', 'Intimidate', 'Olé!']
	},
	'Mawile-Redux': {
		types: ['Dark', 'Ghost'],
		bs: {hp: 70, at: 95, df: 55, sa: 55, sd: 55, sp: 80},
		weightkg: 11.5,
		abilities: {0: 'Adaptability'},
		innates: ['Strong Jaw', 'Opportunist', 'Fae Hunter']
	},
	'Sableye-Redux': {
		types: ['Steel', 'Fairy'],
		bs: {hp: 70, at: 75, df: 80, sa: 65, sd: 70, sp: 50},
		weightkg: 11.0,
		abilities: {0: 'Fae Hunter'},
		innates: ['Subdue', 'Steelworker', 'Wonder Skin']
	},
	'Houndour-Redux': {
		types: ['Ghost'],
		bs: {hp: 45, at: 50, df: 35, sa: 95, sd: 50, sp: 75},
		weightkg: 10.8,
		abilities: {0: 'Flare Boost'},
		innates: ['Soul Eater', 'Phantom Pain', 'Vengeance']
	},
	'Houndoom-Redux': {
		types: ['Ghost'],
		bs: {hp: 75, at: 90, df: 50, sa: 130, sd: 80, sp: 105},
		weightkg: 35.0,
		abilities: {0: 'Flare Boost'},
		innates: ['Soul Eater', 'Phantom Pain', 'Vengeance']
	},
	'Doduo-Redux': {
		types: ['Poison', 'Dark'],
		bs: {hp: 65, at: 95, df: 55, sa: 25, sd: 35, sp: 75},
		weightkg: 39.2,
		abilities: {0: 'Moody'},
		innates: ['Solenoglyphs', 'Half Drake', 'Multi-Headed']
	},
	'Dodrio-Redux': {
		types: ['Dark', 'Poison'],
		bs: {hp: 90, at: 130, df: 80, sa: 50, sd: 60, sp: 100},
		weightkg: 85.2,
		abilities: {0: 'Moody'},
		innates: ['Solenoglyphs', 'Half Drake', 'Multi-Headed']
	},
	'Kingambit-Redux': {
		types: ['Fighting', 'Steel'],
		bs: {hp: 90, at: 125, df: 90, sa: 60, sd: 75, sp: 110},
		weightkg: 120.0,
		abilities: {0: 'Defiant'},
		innates: ['Keen Edge', 'Intimidate', 'Olé!']
	},
	'Larvitar-Redux': {
		types: ['Rock', 'Fire'],
		bs: {hp: 90, at: 20, df: 30, sa: 90, sd: 30, sp: 40},
		weightkg: 72.0,
		abilities: {0: 'Determination'},
		innates: ['Magma Armor', 'Furnace', 'Molten Down']
	},
	'Pupitar-Redux': {
		types: ['Rock', 'Fire'],
		bs: {hp: 110, at: 40, df: 50, sa: 110, sd: 50, sp: 50},
		weightkg: 152.0,
		abilities: {0: 'Solid Rock'},
		innates: ['Magma Armor', 'Furnace', 'Molten Down']
	},
	'Tyranitar-Redux': {
		types: ['Rock', 'Fire'],
		bs: {hp: 150, at: 81, df: 85, sa: 134, sd: 90, sp: 60},
		weightkg: 202.0,
		abilities: {0: 'Solid Rock'},
		innates: ['Magma Armor', 'Furnace', 'Molten Down']
	},
	'Tyranitar-Mega-Redux': {
		types: ['Rock', 'Fire'],
		bs: {hp: 150, at: 91, df: 103, sa: 150, sd: 126, sp: 80},
		weightkg: 202.0,
		abilities: {0: 'Evaporate'},
		innates: ['Primal Armor', 'Furnace', 'Molten Down']
	},
	'Ursaluna-Mega': {
		types: ['Ground', 'Normal'],
		bs: {hp: 130, at: 180, df: 135, sa: 45, sd: 110, sp: 50},
		weightkg: 290.0,
		abilities: {0: 'Guts'},
		innates: ['Fluffy', 'Predator', 'Contempt']
	},
	'Iron Exo': {
		types: ['Ghost', 'Electric'],
		bs: {hp: 70, at: 74, df: 90, sa: 140, sd: 140, sp: 76},
		weightkg: 97.0,
		abilities: {0: 'Teravolt'},
		innates: ['Quark Drive', 'Exploit Weakness', 'Artillery']
	},
	'Scizor-Redux': {
		types: ['Poison', 'Steel'],
		bs: {hp: 70, at: 50, df: 75, sa: 125, sd: 100, sp: 80},
		weightkg: 118.0,
		abilities: {0: 'Mind Crunch'},
		innates: ['Half Drake', 'Envenom', 'Purple Haze']
	},
	'Wooper-Paldean': {
		types: ['Poison', 'Ground'],
		bs: {hp: 55, at: 55, df: 60, sa: 65, sd: 65, sp: 15},
		weightkg: 8.5,
		abilities: {0: 'Wonder Skin'},
		innates: ['Toxic Debris', 'Water Absorb', 'Poison Point']
	},
	'Basculin White': {
		types: ['Water'],
		bs: {hp: 70, at: 80, df: 65, sa: 92, sd: 55, sp: 118},
		weightkg: 18.0,
		abilities: {0: 'Mold Breaker'},
		innates: ['Rattled', 'Adaptability', 'Hyper Aggressive']
	},
	'Escarginite-Redux': {
		types: ['Grass', 'Rock'],
		bs: {hp: 100, at: 50, df: 150, sa: 100, sd: 70, sp: 30},
		weightkg: 10.0,
		abilities: {0: 'Shell Armor'},
		innates: ['Overcoat', 'Harvest', 'Impenetrable']
	},
	'Dragonite Delivery': {
		types: ['Dragon', 'Flying'],
		bs: {hp: 91, at: 159, df: 120, sa: 125, sd: 125, sp: 80},
		weightkg: 210.0,
		abilities: {0: 'Multiscale'},
		innates: ['Dragon\'s Ritual', 'Thick Fat', 'Discipline']
	},
	'Chien Pao-Mega': {
		types: ['Dark', 'Ice'],
		bs: {hp: 80, at: 160, df: 100, sa: 110, sd: 85, sp: 145},
		weightkg: 152.2,
		abilities: {0: 'Sword of Damnation'},
		innates: ['Apex Predator', 'Frostmaw', 'Primal Maw']
	},
	'Dracovish-Mega': {
		types: ['Water', 'Dragon'],
		bs: {hp: 90, at: 110, df: 110, sa: 85, sd: 100, sp: 110},
		weightkg: 215.0,
		abilities: {0: 'Jaws of Carnage'},
		innates: ['Berserk DNA', 'Water Veil', 'Primal Maw']
	},
	'Iron Heart': {
		types: ['Steel', 'Bug'],
		bs: {hp: 78, at: 122, df: 92, sa: 74, sd: 92, sp: 112},
		weightkg: 0.0,
		abilities: {0: 'Parry'},
		innates: ['Quark Drive', 'Vitality Strike', 'Steel Beetle']
	},
	'Snorlax Primal': {
		types: ['Normal'],
		bs: {hp: 160, at: 130, df: 120, sa: 65, sd: 135, sp: 30},
		weightkg: 460.0,
		abilities: {0: 'Inversion'},
		innates: ['Self Repair', 'Dream Whimsy', 'Dream State']
	},
	'Victini Primal': {
		types: ['Psychic', 'Fire'],
		bs: {hp: 100, at: 140, df: 100, sa: 120, sd: 100, sp: 140},
		weightkg: 4.0,
		abilities: {0: 'Lucky Halo'},
		innates: ['Victory Star', 'Victory Bomb', 'Turboblaze']
	},
	'Wigglytuff Primal': {
		types: ['Normal', 'Fairy'],
		bs: {hp: 120, at: 90, df: 65, sa: 155, sd: 115, sp: 90},
		weightkg: 12.0,
		abilities: {0: 'Apple Enlightenment'},
		innates: ['Arcane Force', 'Soul-Heart', 'Competitive']
	},
	'Flygon-Redux B': {
		types: ['Electric', 'Dragon'],
		bs: {hp: 88, at: 100, df: 75, sa: 120, sd: 75, sp: 142},
		weightkg: 82.0,
		abilities: {0: 'Electro Surge'},
		innates: ['Levitate', 'Galvanize', 'Clear Body']
	},
	'Flygon-Redux B-Mega': {
		types: ['Electric', 'Dragon'],
		bs: {hp: 88, at: 110, df: 95, sa: 150, sd: 95, sp: 162},
		weightkg: 82.0,
		abilities: {0: 'Electro Surge'},
		innates: ['Thundercall', 'Galvanize', 'Energized']
	},
	'Ribombee-Redux': {
		types: ['Bug', 'Electric'],
		bs: {hp: 60, at: 105, df: 60, sa: 55, sd: 70, sp: 114},
		weightkg: 0.5,
		abilities: {0: 'Shield Dust'},
		innates: ['Hover', 'Archer', 'Merciless']
	},
	'Ribombee-Redux-Mega': {
		types: ['Bug', 'Electric'],
		bs: {hp: 60, at: 130, df: 90, sa: 55, sd: 95, sp: 134},
		weightkg: 0.5,
		abilities: {0: 'Magic Bounce'},
		innates: ['Hover', 'Archer', 'Depravity']
	},
	'Weavile-Redux': {
		types: ['Ground', 'Dark'],
		bs: {hp: 80, at: 105, df: 70, sa: 60, sd: 70, sp: 125},
		weightkg: 34.0,
		abilities: {0: 'Sand Pit'},
		innates: ['Assassin\'s Tools', 'Merciless', 'Sniper']
	},
	'Weavile-Redux-Mega': {
		types: ['Ground', 'Dark'],
		bs: {hp: 80, at: 120, df: 90, sa: 75, sd: 90, sp: 155},
		weightkg: 34.0,
		abilities: {0: 'Sand Veil'},
		innates: ['Assassin\'s Tools', 'Tough Claws', 'Sand Bender']
	},
	'Abomasnow Santa': {
		types: ['Grass', 'Ice'],
		bs: {hp: 90, at: 142, df: 105, sa: 142, sd: 105, sp: 30},
		weightkg: 135.5,
		abilities: {0: 'Christmas Spirit'},
		innates: ['Cryo Proficiency', 'Whiteout', 'Overcoat']
	},
	'Bewear Angry': {
		types: ['Normal', 'Fighting'],
		bs: {hp: 120, at: 135, df: 100, sa: 55, sd: 60, sp: 130},
		weightkg: 135.0,
		abilities: {0: 'Blind Rage'},
		innates: ['Parental Bond', 'Combat Specialist', 'Fur Coat']
	},
	'Mimikyu Rayquaza': {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 79, at: 120, df: 90, sa: 120, sd: 115, sp: 116},
		weightkg: 0.7,
		abilities: {0: 'Shadow Tag'},
		innates: ['Patchwork', 'Pretty Princess', 'Phantom Pain']
	},
	'Espeon Primal': {
		types: ['Psychic'],
		bs: {hp: 65, at: 90, df: 100, sa: 100, sd: 135, sp: 135},
		weightkg: 26.5,
		abilities: {0: 'Pure Power'},
		innates: ['Forewarn', 'Tinted Lens', 'Magic Bounce']
	},
	'Darkrai Nightmare': {
		types: ['Dark'],
		bs: {hp: 70, at: 110, df: 95, sa: 170, sd: 95, sp: 160},
		weightkg: 50.5,
		abilities: {0: 'Bad Dreams'},
		innates: ['Shadow Tag', 'Fearmonger', 'Dark Aura']
	},
	'Solrock System': {
		types: ['Rock', 'Psychic'],
		bs: {hp: 90, at: 125, df: 115, sa: 125, sd: 115, sp: 120},
		weightkg: 154.0,
		abilities: {0: 'Phantom'},
		innates: ['Desolate Land', 'Daybreak', 'Radiance']
	},
	'Spectrier Cloud': {
		types: ['Flying'],
		bs: {hp: 100, at: 80, df: 80, sa: 115, sd: 60, sp: 145},
		weightkg: 44.5,
		abilities: {0: 'Adrenaline Rush'},
		innates: ['Slipstream', 'Weather Control', 'Fluffy']
	},
	'Calyrex Cloud Rider': {
		types: ['Psychic', 'Flying'],
		bs: {hp: 100, at: 100, df: 100, sa: 135, sd: 80, sp: 165},
		weightkg: 7.7,
		abilities: {0: 'Breezy Neigh'},
		innates: ['Slipstream', 'Weather Control', 'Fluffy']
	},
	'Mawile-Redux B': {
		types: ['Grass', 'Poison'],
		bs: {hp: 70, at: 95, df: 75, sa: 85, sd: 80, sp: 75},
		weightkg: 11.5,
		abilities: {0: 'Heatproof'},
		innates: ['Multi-Headed', 'Strong Jaw', 'Scare']
	},
	'Mawile-Redux B-Mega': {
		types: ['Grass', 'Poison'],
		bs: {hp: 70, at: 105, df: 110, sa: 95, sd: 105, sp: 95},
		weightkg: 11.5,
		abilities: {0: 'Flaming Maw'},
		innates: ['Huge Power', 'Multi-Headed', 'Corrosion']
	},
	'Wigglytuff Apex': {
		types: ['Normal', 'Fairy'],
		bs: {hp: 120, at: 70, df: 55, sa: 130, sd: 105, sp: 55},
		weightkg: 12.0,
		abilities: {0: 'Friend Guard'},
		innates: ['Mystic Power', 'Fur Coat', 'Inflatable']
	},
	'Yveltal-Mega': {
		types: ['Dark', 'Flying'],
		bs: {hp: 126, at: 151, df: 105, sa: 151, sd: 108, sp: 139},
		weightkg: 203.0,
		abilities: {0: 'Dark Aura'},
		innates: ['Opportunist', 'Giant Wings', 'Shadow Shield']
	},
	'Kartana Fallen': {
		types: ['Grass', 'Steel'],
		bs: {hp: 159, at: 181, df: 149, sa: 67, sd: 101, sp: 113},
		weightkg: 0.1,
		abilities: {0: 'Pinnacle Blade'},
		innates: ['Beast Boost', 'Blademaster', 'Aerodynamics']
	},
	'Tinkaton-Mega': {
		types: ['Fairy', 'Steel'],
		bs: {hp: 85, at: 110, df: 107, sa: 105, sd: 105, sp: 94},
		weightkg: 112.8,
		abilities: {0: 'Demolitionist'},
		innates: ['Super Slammer', 'Long Reach', 'Mold Breaker']
	},
	'Turtwig-Redux': {
		types: ['Flying', 'Fairy'],
		bs: {hp: 57, at: 58, df: 64, sa: 55, sd: 75, sp: 11},
		weightkg: 10.2,
		abilities: {0: 'Fertilize'},
		innates: ['Cloud Nine', 'Shell Armor', 'Impenetrable']
	},
	'Grotle-Redux': {
		types: ['Flying', 'Fairy'],
		bs: {hp: 80, at: 79, df: 90, sa: 65, sd: 85, sp: 21},
		weightkg: 97.0,
		abilities: {0: 'Fertilize'},
		innates: ['Cloud Nine', 'Shell Armor', 'Impenetrable']
	},
	'Torterra-Redux': {
		types: ['Flying', 'Fairy'],
		bs: {hp: 95, at: 109, df: 134, sa: 65, sd: 95, sp: 37},
		weightkg: 310.0,
		abilities: {0: 'Fertilize'},
		innates: ['Cloud Nine', 'Shell Armor', 'Impenetrable']
	},
	'Chimchar-Redux': {
		types: ['Water'],
		bs: {hp: 44, at: 62, df: 64, sa: 22, sd: 64, sp: 64},
		weightkg: 6.2,
		abilities: {0: 'Blitz Boxer'},
		innates: ['Iron Fist', 'Torrent', 'Frisk']
	},
	'Monferno-Redux': {
		types: ['Water', 'Fighting'],
		bs: {hp: 64, at: 83, df: 72, sa: 43, sd: 72, sp: 86},
		weightkg: 22.0,
		abilities: {0: 'Blitz Boxer'},
		innates: ['Iron Fist', 'Torrent', 'Frisk']
	},
	'Infernape-Redux': {
		types: ['Water', 'Fighting'],
		bs: {hp: 76, at: 115, df: 86, sa: 59, sd: 91, sp: 108},
		weightkg: 55.0,
		abilities: {0: 'Blitz Boxer'},
		innates: ['Iron Fist', 'Long Reach', 'Inflatable']
	},
	'Piplup-Redux': {
		types: ['Fire', 'Ice'],
		bs: {hp: 53, at: 31, df: 43, sa: 67, sd: 56, sp: 70},
		weightkg: 5.2,
		abilities: {0: 'Pyromancy'},
		innates: ['Antarctic Bird', 'Flash Fire', 'Overcoat']
	},
	'Prinplup-Redux': {
		types: ['Fire', 'Ice'],
		bs: {hp: 69, at: 46, df: 58, sa: 86, sd: 81, sp: 80},
		weightkg: 23.0,
		abilities: {0: 'Pyromancy'},
		innates: ['Antarctic Bird', 'Flash Fire', 'Overcoat']
	},
	'Empoleon-Redux': {
		types: ['Fire', 'Ice'],
		bs: {hp: 84, at: 66, df: 78, sa: 111, sd: 101, sp: 95},
		weightkg: 84.5,
		abilities: {0: 'Drought'},
		innates: ['Thermal Slide', 'Molten Down', 'Flame Shield']
	},
	'Bounsweet-Redux': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 38, at: 22, df: 30, sa: 50, sd: 30, sp: 64},
		weightkg: 3.2,
		abilities: {0: 'Oblivious'},
		innates: ['Water Bubble', 'Limber', 'Let\'s Roll']
	},
	'Steenee-Redux': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 48, at: 32, df: 40, sa: 70, sd: 40, sp: 94},
		weightkg: 8.2,
		abilities: {0: 'Oblivious'},
		innates: ['Water Bubble', 'Limber', 'Thick Fat']
	},
	'Tsareena-Redux': {
		types: ['Psychic', 'Fairy'],
		bs: {hp: 68, at: 42, df: 90, sa: 120, sd: 90, sp: 120},
		weightkg: 21.4,
		abilities: {0: 'Inflatable'},
		innates: ['Water Bubble', 'Limber', 'Queenly Majesty']
	},
	'Toxel-Redux': {
		types: ['Electric', 'Dark'],
		bs: {hp: 40, at: 38, df: 38, sa: 70, sd: 37, sp: 55},
		weightkg: 11.0,
		abilities: {0: 'Prankster'},
		innates: ['Electrocytes', 'Loud Bang', 'Volt Absorb']
	},
	'Toxtricity-Redux': {
		types: ['Electric', 'Dark'],
		bs: {hp: 80, at: 65, df: 85, sa: 114, sd: 65, sp: 93},
		weightkg: 40.0,
		abilities: {0: 'Hyper Aggressive'},
		innates: ['Metallic', 'Piercing Solo', 'Punk Rock']
	},
	'Toxtricity-Redux-Fuzz': {
		types: ['Electric', 'Dark'],
		bs: {hp: 80, at: 65, df: 65, sa: 114, sd: 85, sp: 93},
		weightkg: 40.0,
		abilities: {0: 'Rhythmic'},
		innates: ['Phantom', 'Chunky Bass Line', 'Punk Rock']
	},
	'Trapinch-Redux': {
		types: ['Ice', 'Bug'],
		bs: {hp: 45, at: 110, df: 35, sa: 45, sd: 35, sp: 20},
		weightkg: 15.0,
		abilities: {0: 'Whiteout'},
		innates: ['Strong Jaw', 'Fluffy', 'Overcoat']
	},
	'Vibrava-Redux': {
		types: ['Ice', 'Bug'],
		bs: {hp: 50, at: 80, df: 40, sa: 70, sd: 40, sp: 80},
		weightkg: 15.3,
		abilities: {0: 'Whiteout'},
		innates: ['Dragonfly', 'Fluffy', 'Overcoat']
	},
	'Flygon-Redux': {
		types: ['Ice', 'Bug'],
		bs: {hp: 80, at: 100, df: 80, sa: 100, sd: 80, sp: 100},
		weightkg: 82.0,
		abilities: {0: 'Whiteout'},
		innates: ['Dragonfly', 'Fluffy', 'Mountaineer']
	},
	'Crabrawler-Redux': {
		types: ['Fighting', 'Dark'],
		bs: {hp: 62, at: 72, df: 77, sa: 32, sd: 57, sp: 53},
		weightkg: 7.0,
		abilities: {0: 'Bulletproof'},
		innates: ['Spike Armor', 'Hyper Aggressive', 'Shed Skin']
	},
	'Crabominable-Redux': {
		types: ['Fighting', 'Dark'],
		bs: {hp: 97, at: 122, df: 117, sa: 77, sd: 72, sp: 33},
		weightkg: 180.0,
		abilities: {0: 'Merciless'},
		innates: ['Spike Armor', 'Super Slammer', 'Shed Skin']
	},
	'Cleffa-Redux': {
		types: ['Rock'],
		bs: {hp: 50, at: 15, df: 28, sa: 55, sd: 55, sp: 15},
		weightkg: 3.0,
		abilities: {0: 'Friend Guard'},
		innates: ['Solid Rock', 'Dazzling', 'Nocturnal']
	},
	'Clefairy-Redux': {
		types: ['Rock'],
		bs: {hp: 70, at: 20, df: 58, sa: 70, sd: 65, sp: 40},
		weightkg: 7.5,
		abilities: {0: 'Friend Guard'},
		innates: ['Solid Rock', 'Dazzling', 'Nocturnal']
	},
	'Clefable-Redux': {
		types: ['Rock'],
		bs: {hp: 95, at: 50, df: 83, sa: 115, sd: 90, sp: 75},
		weightkg: 40.0,
		abilities: {0: 'Prism Armor'},
		innates: ['Solid Rock', 'Dazzling', 'Nocturnal']
	},
	'Gligar-Redux': {
		types: ['Poison', 'Fire'],
		bs: {hp: 55, at: 85, df: 85, sa: 60, sd: 50, sp: 95},
		weightkg: 64.8,
		abilities: {0: 'Violent Rush'},
		innates: ['Grip Pincer', 'Shell Armor', 'Solenoglyphs']
	},
	'Gliscor-Redux': {
		types: ['Poison', 'Fire'],
		bs: {hp: 65, at: 105, df: 105, sa: 70, sd: 60, sp: 105},
		weightkg: 42.5,
		abilities: {0: 'Predator'},
		innates: ['Grip Pincer', 'Shell Armor', 'Venoblaze Pincers']
	},
	'Psyduck-Redux': {
		types: ['Dark'],
		bs: {hp: 50, at: 75, df: 43, sa: 52, sd: 45, sp: 65},
		weightkg: 19.6,
		abilities: {0: 'Scare'},
		innates: ['Fur Coat', 'Analytic', 'Nocturnal']
	},
	'Seel-Redux': {
		types: ['Ice', 'Dragon'],
		bs: {hp: 63, at: 66, df: 55, sa: 66, sd: 60, sp: 65},
		weightkg: 90.0,
		abilities: {0: 'Slush Rush'},
		innates: ['Prism Scales', 'Hyper Aggressive', 'Unaware']
	},
	'Dewgong-Redux': {
		types: ['Ice', 'Dragon'],
		bs: {hp: 78, at: 120, df: 66, sa: 78, sd: 66, sp: 120},
		weightkg: 120.0,
		abilities: {0: 'Slush Rush'},
		innates: ['Dragon\'s Maw', 'Ice Cold Hunter', 'Speed Force']
	},
	'Snorunt-Redux': {
		types: ['Dark'],
		bs: {hp: 65, at: 65, df: 50, sa: 60, sd: 60, sp: 70},
		weightkg: 16.8,
		abilities: {0: 'Prankster'},
		innates: ['Nocturnal', 'Looter', 'Fur Coat']
	},
	'Glalie-Redux': {
		types: ['Dark', 'Fighting'],
		bs: {hp: 90, at: 100, df: 90, sa: 60, sd: 90, sp: 70},
		weightkg: 256.5,
		abilities: {0: 'Contrary'},
		innates: ['Blood Bath', 'Weak Armor', 'Battle Aura']
	},
	'Froslass-Redux': {
		types: ['Dark', 'Ghost'],
		bs: {hp: 70, at: 110, df: 70, sa: 70, sd: 70, sp: 110},
		weightkg: 26.6,
		abilities: {0: 'Blood Price'},
		innates: ['Low Blow', 'Keen Edge', 'Soul Eater']
	},
	'Darumaka-Redux': {
		types: ['Ground', 'Fighting'],
		bs: {hp: 50, at: 90, df: 55, sa: 15, sd: 55, sp: 50},
		weightkg: 37.5,
		abilities: {0: 'Gorilla Tactics'},
		innates: ['Earth Eater', 'Earthbound', 'Mold Breaker']
	},
	'Darmanitan-Redux': {
		types: ['Ground', 'Fighting'],
		bs: {hp: 80, at: 140, df: 80, sa: 50, sd: 80, sp: 90},
		weightkg: 92.9,
		abilities: {0: 'Gorilla Tactics'},
		innates: ['Earth Eater', 'Iron Fist', 'Mold Breaker']
	},
	'Darmanitan Aura': {
		types: ['Rock', 'Fighting'],
		bs: {hp: 60, at: 50, df: 95, sa: 150, sd: 95, sp: 70},
		weightkg: 92.9,
		abilities: {0: 'Sage Power'},
		innates: ['Rocky Payload', 'Magical Fists', 'Mold Breaker']
	},
	'Darmanitan-Redux Bond': {
		types: ['Ground', 'Fighting'],
		bs: {hp: 80, at: 140, df: 80, sa: 50, sd: 80, sp: 90},
		weightkg: 92.9,
		abilities: {0: 'Gorilla Tactics'},
		innates: ['Battle Bond', 'Iron Fist', 'Mold Breaker']
	},
	'Happiny-Redux': {
		types: ['Fighting'],
		bs: {hp: 15, at: 75, df: 5, sa: 10, sd: 5, sp: 110},
		weightkg: 24.4,
		abilities: {0: 'Wimp Out'},
		innates: ['Vital Spirit', 'Long Reach', 'Iron Fist']
	},
	'Chansey-Redux': {
		types: ['Fighting'],
		bs: {hp: 35, at: 110, df: 10, sa: 110, sd: 10, sp: 175},
		weightkg: 34.6,
		abilities: {0: 'Emergency Exit'},
		innates: ['Vital Spirit', 'Long Reach', 'Iron Fist']
	},
	'Blissey-Redux': {
		types: ['Fighting'],
		bs: {hp: 45, at: 135, df: 10, sa: 95, sd: 10, sp: 255},
		weightkg: 46.8,
		abilities: {0: 'Emergency Exit'},
		innates: ['Vital Spirit', 'Long Reach', 'Iron Fist']
	},
	'Spiritomb-Redux': {
		types: ['Ghost', 'Poison'],
		bs: {hp: 77, at: 60, df: 108, sa: 117, sd: 120, sp: 35},
		weightkg: 108.0,
		abilities: {0: 'Scare'},
		innates: ['Spectral Shroud', 'Poison Puppeteer', 'Cosmic Daze']
	},
	'Blunder-Darmanitan': {
		types: ['Ground', 'Fighting'],
		bs: {hp: 80, at: 170, df: 105, sa: 60, sd: 105, sp: 110},
		weightkg: 92.9,
		abilities: {0: 'Gorilla Tactics'},
		innates: ['Battle Bond', 'Iron Fist', 'Mold Breaker']
	},
	'Dewpider-Redux': {
		types: ['Ice', 'Bug'],
		bs: {hp: 38, at: 65, df: 72, sa: 40, sd: 27, sp: 47},
		weightkg: 4.0,
		abilities: {0: 'Ice Body'},
		innates: ['Deep Freeze', 'Rough Skin', 'Swarm']
	},
	'Araquanid-Redux': {
		types: ['Ice', 'Bug'],
		bs: {hp: 68, at: 90, df: 112, sa: 50, sd: 52, sp: 82},
		weightkg: 82.0,
		abilities: {0: 'Ice Body'},
		innates: ['Deep Freeze', 'Rough Skin', 'Swarm']
	},
	'Mimikyu Apex': {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 79, at: 90, df: 80, sa: 90, sd: 105, sp: 96},
		weightkg: 0.7,
		abilities: {0: 'Predator'},
		innates: ['Disguise', 'Overcoat', 'Phantom Pain']
	},
	'Mimikyu Apex Busted': {
		types: ['Ghost', 'Fairy'],
		bs: {hp: 79, at: 90, df: 80, sa: 90, sd: 105, sp: 96},
		weightkg: 0.7,
		abilities: {0: 'Predator'},
		innates: ['Disguise', 'Overcoat', 'Phantom Pain']
	},
	'Tinkatink-Redux': {
		types: ['Water', 'Poison'],
		bs: {hp: 51, at: 70, df: 52, sa: 33, sd: 33, sp: 72},
		weightkg: 8.9,
		abilities: {0: 'Toxic Debris'},
		innates: ['Poison Point', 'Deviate', 'Limber']
	},
	'Tinkatuff-Redux': {
		types: ['Water', 'Poison'],
		bs: {hp: 61, at: 85, df: 62, sa: 47, sd: 47, sp: 92},
		weightkg: 59.1,
		abilities: {0: 'Toxic Debris'},
		innates: ['Poison Point', 'Deviate', 'Torrent']
	},
	'Tinkaton-Redux': {
		types: ['Water', 'Poison'],
		bs: {hp: 85, at: 105, df: 82, sa: 65, sd: 65, sp: 104},
		weightkg: 112.8,
		abilities: {0: 'Hydration'},
		innates: ['Poison Point', 'Deviate', 'Toxic Debris']
	},
	'Tinkaton-Redux-Mega': {
		types: ['Water', 'Poison'],
		bs: {hp: 85, at: 140, df: 107, sa: 85, sd: 70, sp: 119},
		weightkg: 112.8,
		abilities: {0: 'Atlantic Ruler'},
		innates: ['Super Slammer', 'Deviate', 'Poison Quills']
	},
	'Scyther-Redux': {
		types: ['Poison', 'Ground'],
		bs: {hp: 70, at: 110, df: 60, sa: 110, sd: 60, sp: 90},
		weightkg: 56.0,
		abilities: {0: 'Merciless'},
		innates: ['Half Drake', 'Envenom', 'Speed Boost']
	},
	'Scyther-Redux-Mega': {
		types: ['Poison', 'Ground'],
		bs: {hp: 70, at: 140, df: 70, sa: 140, sd: 70, sp: 110},
		weightkg: 56.0,
		abilities: {0: 'Dual Wield'},
		innates: ['Komodo', 'Slipstream', 'Merciless']
	},
	'Scizor-Redux-Mega': {
		types: ['Poison', 'Steel'],
		bs: {hp: 70, at: 65, df: 110, sa: 155, sd: 125, sp: 75},
		weightkg: 118.0,
		abilities: {0: 'Primal Maw'},
		innates: ['Komodo', 'Gnashing Cannon', 'Purple Haze']
	},
	'Kleavor-Redux': {
		types: ['Poison', 'Rock'],
		bs: {hp: 70, at: 135, df: 100, sa: 50, sd: 80, sp: 65},
		weightkg: 10.0,
		abilities: {0: 'Sweeping Edge'},
		innates: ['Half Drake', 'Rough Skin', 'Violent Rush']
	},
	'Kleavor-Redux-Mega': {
		types: ['Poison', 'Rock'],
		bs: {hp: 70, at: 155, df: 120, sa: 80, sd: 110, sp: 65},
		weightkg: 10.0,
		abilities: {0: 'Cutthroat'},
		innates: ['Komodo', 'Dual Wield', 'Sharp Edges']
	},
	'Krabby-Redux': {
		types: ['Psychic'],
		bs: {hp: 45, at: 38, df: 48, sa: 97, sd: 88, sp: 34},
		weightkg: 6.5,
		abilities: {0: 'Serene Grace'},
		innates: ['Magic Guard', 'Shell Armor', 'Mystic Power']
	},
	'Kingler-Redux': {
		types: ['Psychic'],
		bs: {hp: 85, at: 50, df: 75, sa: 115, sd: 115, sp: 60},
		weightkg: 60.0,
		abilities: {0: 'Serene Grace'},
		innates: ['Magic Guard', 'Mystic Power', 'Archmage']
	},
	'Kingler-Redux-Mega': {
		types: ['Psychic'],
		bs: {hp: 85, at: 75, df: 80, sa: 150, sd: 145, sp: 65},
		weightkg: 60.0,
		abilities: {0: 'Mystic Power'},
		innates: ['Magic Guard', 'Psychic Mind', 'Archmage']
	},
	'Shinx-Redux': {
		types: ['Grass'],
		bs: {hp: 45, at: 65, df: 34, sa: 40, sd: 34, sp: 65},
		weightkg: 9.5,
		abilities: {0: 'Intimidate'},
		innates: ['Leaf Guard', 'Grass Pelt', 'Guts']
	},
	'Luxio-Redux': {
		types: ['Grass'],
		bs: {hp: 60, at: 85, df: 49, sa: 40, sd: 49, sp: 80},
		weightkg: 30.5,
		abilities: {0: 'Intimidate'},
		innates: ['Guts', 'Grass Pelt', 'Strong Jaw']
	},
	'Luxray-Redux': {
		types: ['Grass'],
		bs: {hp: 80, at: 100, df: 84, sa: 67, sd: 79, sp: 123},
		weightkg: 42.0,
		abilities: {0: 'Reckless'},
		innates: ['Predator', 'Speed Force', 'Raw Wood']
	},
	'Luxray-Redux-Mega': {
		types: ['Grass'],
		bs: {hp: 80, at: 130, df: 99, sa: 89, sd: 99, sp: 136},
		weightkg: 42.0,
		abilities: {0: 'Brute Force'},
		innates: ['King of the Jungle', 'Speed Force', 'Grassy Surge']
	},
	'Aron-Redux': {
		types: ['Water', 'Rock'],
		bs: {hp: 54, at: 70, df: 76, sa: 40, sd: 64, sp: 26},
		weightkg: 60.0,
		abilities: {0: 'Hydration'},
		innates: ['Water Veil', 'Bulletproof', 'Solid Rock']
	},
	'Lairon-Redux': {
		types: ['Water', 'Rock'],
		bs: {hp: 64, at: 91, df: 98, sa: 44, sd: 86, sp: 47},
		weightkg: 120.0,
		abilities: {0: 'Shell Armor'},
		innates: ['Water Veil', 'Rockhard Will', 'Solid Rock']
	},
	'Aggron-Redux': {
		types: ['Water', 'Rock'],
		bs: {hp: 70, at: 115, df: 140, sa: 50, sd: 100, sp: 55},
		weightkg: 360.0,
		abilities: {0: 'Weak Armor'},
		innates: ['Water Veil', 'Mighty Horn', 'Solid Rock']
	},
	'Aggron-Redux-Mega': {
		types: ['Water', 'Rock'],
		bs: {hp: 70, at: 150, df: 160, sa: 55, sd: 125, sp: 70},
		weightkg: 360.0,
		abilities: {0: 'Hunter\'s Horn'},
		innates: ['Water Veil', 'Sheer Force', 'Battle Armor']
	},
	'Makuhita-Redux': {
		types: ['Fire', 'Steel'],
		bs: {hp: 59, at: 46, df: 74, sa: 27, sd: 38, sp: 23},
		weightkg: 86.4,
		abilities: {0: 'Power Core'},
		innates: ['Earthbound', 'Superheavy', 'Heavy Metal']
	},
	'Hariyama-Redux': {
		types: ['Fire', 'Steel'],
		bs: {hp: 85, at: 85, df: 109, sa: 50, sd: 105, sp: 70},
		weightkg: 253.8,
		abilities: {0: 'Ancient Idol'},
		innates: ['Grounded', 'Superheavy', 'Insomnia']
	},
	Kilozuna: {
		types: ['Fire', 'Steel'],
		bs: {hp: 105, at: 90, df: 135, sa: 55, sd: 110, sp: 75},
		weightkg: 253.8,
		abilities: {0: 'Ancient Idol'},
		innates: ['Grounded', 'Full Metal Body', 'Juggernaut']
	},
	'Kilozuna-Mega': {
		types: ['Steel', 'Fire'],
		bs: {hp: 105, at: 130, df: 150, sa: 65, sd: 120, sp: 100},
		weightkg: 253.8,
		abilities: {0: 'Ancient Idol'},
		innates: ['Grounded', 'Full Metal Body', 'Juggernaut']
	},
	Fogging: {
		types: ['Water', 'Flying'],
		bs: {hp: 60, at: 45, df: 55, sa: 60, sd: 65, sp: 65},
		weightkg: 1.0,
		abilities: {0: 'Drizzle'},
		innates: ['Static', 'Water Absorb', 'Fluffy']
	},
	Breezing: {
		types: ['Water', 'Flying'],
		bs: {hp: 120, at: 70, df: 60, sa: 95, sd: 90, sp: 85},
		weightkg: 9.5,
		abilities: {0: 'Lightning Rod'},
		innates: ['Drizzle', 'Lightning Born', 'Fluffy']
	},
	Storming: {
		types: ['Water', 'Flying'],
		bs: {hp: 135, at: 70, df: 65, sa: 105, sd: 95, sp: 80},
		weightkg: 9.5,
		abilities: {0: 'Overcharge'},
		innates: ['Drizzle', 'Lightning Born', 'Fluffy']
	},
	'Ralts-Redux': {
		types: ['Water'],
		bs: {hp: 42, at: 27, df: 27, sa: 57, sd: 32, sp: 48},
		weightkg: 6.6,
		abilities: {0: 'Run Away'},
		innates: ['Torrent', 'Natural Cure', 'Liquid Ooze']
	},
	'Kirlia-Redux': {
		types: ['Water'],
		bs: {hp: 58, at: 36, df: 37, sa: 77, sd: 49, sp: 74},
		weightkg: 20.2,
		abilities: {0: 'Run Away'},
		innates: ['Torrent', 'Predator', 'Static']
	},
	'Gardevoir-Redux': {
		types: ['Water', 'Dark'],
		bs: {hp: 75, at: 125, df: 78, sa: 85, sd: 65, sp: 105},
		weightkg: 48.4,
		abilities: {0: 'On the Prowl'},
		innates: ['Phantom', 'Predator', 'Long Reach']
	},
	'Gallade-Redux': {
		types: ['Water', 'Fairy'],
		bs: {hp: 105, at: 75, df: 78, sa: 85, sd: 125, sp: 65},
		weightkg: 52.0,
		abilities: {0: 'Best Offense'},
		innates: ['Cute Charm', 'Rough Skin', 'Water Veil']
	},
	'Gardevoir-Redux-Mega': {
		types: ['Water', 'Dark'],
		bs: {hp: 75, at: 150, df: 93, sa: 100, sd: 85, sp: 130},
		weightkg: 48.4,
		abilities: {0: 'Swift Swim'},
		innates: ['Phantom', 'Impaler', 'Tag']
	},
	'Gallade-Redux-Mega': {
		types: ['Water', 'Fairy'],
		bs: {hp: 105, at: 85, df: 103, sa: 120, sd: 145, sp: 75},
		weightkg: 52.0,
		abilities: {0: 'Magus Blades'},
		innates: ['Cute Charm', 'Dazzling', 'Purifying Waters']
	},
	Merrykarp: {
		types: ['Fire', 'Fairy'],
		bs: {hp: 40, at: 15, df: 15, sa: 55, sd: 20, sp: 60},
		weightkg: 10.0,
		abilities: {0: 'Blaze'},
		innates: ['Levitate', 'Aerilate', 'Festivities']
	},
	Gyarevelry: {
		types: ['Fire', 'Dragon'],
		bs: {hp: 110, at: 60, df: 70, sa: 112, sd: 118, sp: 70},
		weightkg: 235.0,
		abilities: {0: 'Dancer'},
		innates: ['Fey Flight', 'Two Step', 'Festivities']
	},
	'Munchlax-Redux': {
		types: ['Water'],
		bs: {hp: 100, at: 27, df: 76, sa: 67, sd: 84, sp: 36},
		weightkg: 105.0,
		abilities: {0: 'Liquid Ooze'},
		innates: ['Gooey', 'Soundproof', 'Immunity']
	},
	'Snorlax-Redux': {
		types: ['Water'],
		bs: {hp: 196, at: 57, df: 82, sa: 102, sd: 67, sp: 36},
		weightkg: 460.0,
		abilities: {0: 'Liquid Ooze'},
		innates: ['Gooey', 'Soundproof', 'Liquified']
	},
	'Snorlax-Redux-Mega': {
		types: ['Water'],
		bs: {hp: 196, at: 66, df: 104, sa: 114, sd: 104, sp: 56},
		weightkg: 460.0,
		abilities: {0: 'Hyper Cleanse'},
		innates: ['Gooey', 'Liquid Ooze', 'Liquified']
	},
	'Raichu-Mega X': {
		types: ['Electric', 'Fighting'],
		bs: {hp: 60, at: 135, df: 95, sa: 90, sd: 95, sp: 115},
		weightkg: 30.0,
		abilities: {0: 'Electro Booster'},
		innates: ['Ground Shock', 'Current Crash', 'Daredevil']
	},
	'Chimecho-Mega': {
		types: ['Psychic', 'Steel'],
		bs: {hp: 85, at: 50, df: 110, sa: 150, sd: 125, sp: 65},
		weightkg: 1.0,
		abilities: {0: 'Wind Chimes'},
		innates: ['Levitate', 'Steelworker', 'Loud Bang']
	},
	'Absol-Mega Z': {
		types: ['Dark', 'Ghost'],
		bs: {hp: 65, at: 154, df: 75, sa: 85, sd: 70, sp: 151},
		weightkg: 47.0,
		abilities: {0: 'Reaper\'s Embarce'},
		innates: ['Scare', 'Defiant', 'Bad Luck']
	},
	'Staraptor-Mega': {
		types: ['Fighting', 'Flying'],
		bs: {hp: 85, at: 140, df: 100, sa: 60, sd: 90, sp: 110},
		weightkg: 24.9,
		abilities: {0: 'Brute Force'},
		innates: ['Bird of Prey', 'Feathercoat', 'Adrenaline Rush']
	},
	'Garchomp-Mega Z': {
		types: ['Dragon'],
		bs: {hp: 108, at: 130, df: 85, sa: 141, sd: 85, sp: 151},
		weightkg: 95.0,
		abilities: {0: 'Sinister Claws'},
		innates: ['Terminal Velocity', 'Aerialist', 'Sleek Scales']
	},
	'Heatran-Mega': {
		types: ['Fire'],
		bs: {hp: 79, at: 94, df: 113, sa: 144, sd: 120, sp: 85},
		weightkg: 430.0,
		abilities: {0: 'Wildfire'},
		innates: ['Hellblaze', 'Fire Scales', 'Flame Shield']
	},
	'Darkrai-Mega': {
		types: ['Fire'],
		bs: {hp: 79, at: 94, df: 113, sa: 144, sd: 120, sp: 85},
		weightkg: 50.5,
		abilities: {0: 'Wildfire'},
		innates: ['Hellblaze', 'Fire Scales', 'Flame Shield']
	},
	'Golurk-Mega': {
		types: ['Ground', 'Ghost'],
		bs: {hp: 89, at: 169, df: 115, sa: 70, sd: 115, sp: 55},
		weightkg: 330.0,
		abilities: {0: 'Unstable Core'},
		innates: ['Relic Stone', 'Power Fists', 'Shadow Shield']
	},
	'Meowstic-Mega': {
		types: ['Psychic'],
		bs: {hp: 84, at: 48, df: 89, sa: 153, sd: 101, sp: 124},
		weightkg: 8.5,
		abilities: {0: 'Prankster'},
		innates: ['Overwhelming Mind', 'Hover', 'Duality']
	},
	'Golisopod-Mega': {
		types: ['Bug', 'Steel'],
		bs: {hp: 75, at: 150, df: 175, sa: 70, sd: 120, sp: 40},
		weightkg: 108.0,
		abilities: {0: 'Droideka'},
		innates: ['Skill Link', 'Bulletproof', 'Galvanize']
	},
	'Magearna-Mega': {
		types: ['Fire'],
		bs: {hp: 79, at: 94, df: 113, sa: 144, sd: 120, sp: 85},
		weightkg: 80.5,
		abilities: {0: 'Wildfire'},
		innates: ['Hellblaze', 'Fire Scales', 'Flame Shield']
	},
	'Zeraora-Mega': {
		types: ['Fire'],
		bs: {hp: 79, at: 94, df: 113, sa: 144, sd: 120, sp: 85},
		weightkg: 44.5,
		abilities: {0: 'Wildfire'},
		innates: ['Hellblaze', 'Fire Scales', 'Flame Shield']
	},
	'Scovillain-Mega': {
		types: ['Grass', 'Fire'],
		bs: {hp: 65, at: 138, df: 85, sa: 138, sd: 85, sp: 75},
		weightkg: 15.0,
		abilities: {0: 'Flaming Jaws'},
		innates: ['Mob Boss', 'Multi-Headed', 'Ghost Pepper']
	},
	'Glimmora-Mega': {
		types: ['Rock', 'Poison'],
		bs: {hp: 83, at: 90, df: 105, sa: 150, sd: 96, sp: 101},
		weightkg: 45.0,
		abilities: {0: 'Corrosion'},
		innates: ['Toxic Debris', 'Petal Shield', 'Accelerate']
	},
	'Tatsugiri-Mega': {
		types: ['Dragon', 'Water'],
		bs: {hp: 68, at: 65, df: 90, sa: 135, sd: 125, sp: 92},
		weightkg: 8.0,
		abilities: {0: 'Commander'},
		innates: ['Multiscale', 'High Tide', '3 > 1']
	},
	'Baxcalibur-Mega': {
		types: ['Dragon', 'Ice'],
		bs: {hp: 115, at: 175, df: 117, sa: 105, sd: 101, sp: 87},
		weightkg: 210.0,
		abilities: {0: 'Permafrost'},
		innates: ['Thermal Entropy', 'Frost Dragon', 'Overwhelm']
	},
	'Spearow-Redux': {
		types: ['Fighting'],
		bs: {hp: 45, at: 62, df: 29, sa: 26, sd: 32, sp: 68},
		weightkg: 2.0,
		abilities: {0: 'Defiant'},
		innates: ['Flock', 'Deviate', 'Merciless']
	},
	'Fearow-Redux': {
		types: ['Fighting', 'Dark'],
		bs: {hp: 85, at: 112, df: 85, sa: 51, sd: 51, sp: 98},
		weightkg: 38.0,
		abilities: {0: 'Violent Rush'},
		innates: ['Striker', 'Merciless', 'Scare']
	},
	Terrow: {
		types: ['Dark', 'Fighting'],
		bs: {hp: 105, at: 132, df: 95, sa: 51, sd: 51, sp: 108},
		weightkg: 6.9,
		abilities: {0: 'Blood Bath'},
		innates: ['Striker', 'Sharp Talons', 'Scare']
	},
	Slate: {
		types: ['Normal'],
		bs: {hp: 85, at: 110, df: 65, sa: 85, sd: 80, sp: 125},
		weightkg: 6.9,
		abilities: {0: 'Perfectionist'},
		innates: ['Technician', 'Cute Charm', 'Fluffiest']
	},
};

const ZA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Absol: {otherFormes: ['Absol-Mega', 'Absol-Mega-Z']},
  Barbaracle: {otherFormes: ['Barbaracle-Mega']},
  Baxcalibur: {otherFormes: ['Baxcalibur-Mega']},
  Chandelure: {otherFormes: ['Chandelure-Mega']},
  Chesnaught: {otherFormes: ['Chesnaught-Mega']},
  Chimecho: {otherFormes: ['Chimecho-Mega']},
  Clefable: {otherFormes: ['Clefable-Mega']},
  Crabominable: {otherFormes: ['Crabominable-Mega']},
  Darkrai: {otherFormes: ['Darkrai-Mega']},
  Delphox: {otherFormes: ['Delphox-Mega']},
  Dragalge: {otherFormes: ['Dragalge-Mega']},
  Dragonite: {otherFormes: ['Dragonite-Mega']},
  Drampa: {otherFormes: ['Drampa-Mega']},
  Eelektross: {otherFormes: ['Eelektross-Mega']},
  Emboar: {otherFormes: ['Emboar-Mega']},
  Excadrill: {otherFormes: ['Excadrill-Mega']},
  Falinks: {otherFormes: ['Falinks-Mega']},
  Feraligatr: {otherFormes: ['Feraligatr-Mega']},
  Floette: {otherFormes: ['Floette-Eternal', 'Floette-Mega']},
  Froslass: {otherFormes: ['Froslass-Mega']},
  Garchomp: {otherFormes: ['Garchomp-Mega', 'Garchomp-Mega-Z']},
  Glimmora: {otherFormes: ['Glimmora-Mega']},
  Golisopod: {otherFormes: ['Golisopod-Mega']},
  Golurk: {otherFormes: ['Golurk-Mega']},
  Greninja: {otherFormes: ['Greninja-Ash', 'Greninja-Bond', 'Greninja-Mega']},
  Hawlucha: {otherFormes: ['Hawlucha-Mega']},
  Heatran: {otherFormes: ['Heatran-Mega']},
  Lucario: {otherFormes: ['Lucario-Mega', 'Lucario-Mega-Z']},
  Magearna: {otherFormes: ['Magearna-Mega', 'Magearna-Original', 'Magearna-Original-Mega']},
  Malamar: {otherFormes: ['Malamar-Mega']},
  Meganium: {otherFormes: ['Meganium-Mega']},
  Meowstic: {otherFormes: ['Meowstic-F', 'Meowstic-F-Mega', 'Meowstic-M-Mega']},
  Pyroar: {otherFormes: ['Pyroar-Mega']},
  Raichu: {otherFormes: ['Raichu-Alola', 'Raichu-Mega-X', 'Raichu-Mega-Y']},
  Scolipede: {otherFormes: ['Scolipede-Mega']},
  Scovillain: {otherFormes: ['Scovillain-Mega']},
  Scrafty: {otherFormes: ['Scrafty-Mega']},
  Skarmory: {otherFormes: ['Skarmory-Mega']},
  Staraptor: {otherFormes: ['Staraptor-Mega']},
  Starmie: {otherFormes: ['Starmie-Mega']},
  Tatsugiri: {
    otherFormes: [
      'Tatsugiri-Curly-Mega',
      'Tatsugiri-Droopy',
      'Tatsugiri-Droopy-Mega',
      'Tatsugiri-Stretchy',
      'Tatsugiri-Stretchy-Mega',
    ],
  },
  Victreebel: {otherFormes: ['Victreebel-Mega']},
  Zeraora: {otherFormes: ['Zeraora-Mega']},
  Zygarde: {otherFormes: ['Zygarde-10%', 'Zygarde-Complete', 'Zygarde-Mega']},
  'Absol-Mega-Z': {
    types: ['Dark', 'Ghost'],
    bs: {hp: 65, at: 154, df: 60, sa: 75, sd: 60, sp: 151},
    weightkg: 49.0,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Absol',
  },
  'Barbaracle-Mega': {
    types: ['Rock', 'Fighting'],
    bs: {hp: 72, at: 140, df: 130, sa: 64, sd: 106, sp: 88},
    weightkg: 100.0,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Barbaracle',
  },
  'Baxcalibur-Mega': {
    types: ['Dragon', 'Ice'],
    bs: {hp: 115, at: 175, df: 117, sa: 105, sd: 101, sp: 87},
    weightkg: 315.0,
    abilities: {0: 'Thermal Exchange'},
    baseSpecies: 'Baxcalibur',
  },
  'Chandelure-Mega': {
    types: ['Ghost', 'Fire'],
    bs: {hp: 60, at: 75, df: 110, sa: 175, sd: 110, sp: 90},
    weightkg: 69.6,
    abilities: {0: 'Infiltrator'},
    baseSpecies: 'Chandelure',
  },
  'Chesnaught-Mega': {
    types: ['Grass', 'Fighting'],
    bs: {hp: 88, at: 137, df: 172, sa: 74, sd: 115, sp: 44},
    weightkg: 90.0,
    abilities: {0: 'Bulletproof'},
    baseSpecies: 'Chesnaught',
  },
  'Chimecho-Mega': {
    types: ['Psychic', 'Steel'],
    bs: {hp: 75, at: 50, df: 110, sa: 135, sd: 120, sp: 65},
    weightkg: 8.0,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Chimecho',
  },
  'Clefable-Mega': {
    types: ['Fairy', 'Flying'],
    bs: {hp: 95, at: 80, df: 93, sa: 135, sd: 110, sp: 70},
    weightkg: 42.3,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Clefable',
  },
  'Crabominable-Mega': {
    types: ['Fighting', 'Ice'],
    bs: {hp: 97, at: 157, df: 122, sa: 62, sd: 107, sp: 33},
    weightkg: 252.8,
    abilities: {0: 'Iron Fist'},
    baseSpecies: 'Crabominable',
  },
  'Darkrai-Mega': {
    types: ['Dark'],
    bs: {hp: 70, at: 120, df: 130, sa: 165, sd: 130, sp: 85},
    weightkg: 240.0,
    gender: 'N',
    abilities: {0: 'Bad Dreams'},
    baseSpecies: 'Darkrai',
  },
  'Delphox-Mega': {
    types: ['Fire', 'Psychic'],
    bs: {hp: 75, at: 69, df: 72, sa: 159, sd: 125, sp: 134},
    weightkg: 39.0,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Delphox',
  },
  'Dragalge-Mega': {
    types: ['Poison', 'Dragon'],
    bs: {hp: 65, at: 85, df: 105, sa: 132, sd: 163, sp: 44},
    weightkg: 100.3,
    abilities: {0: 'Poison Point'},
    baseSpecies: 'Dragalge',
  },
  'Dragonite-Mega': {
    types: ['Dragon', 'Flying'],
    bs: {hp: 91, at: 124, df: 115, sa: 145, sd: 125, sp: 100},
    weightkg: 290.0,
    abilities: {0: 'Multiscale'},
    baseSpecies: 'Dragonite',
  },
  'Drampa-Mega': {
    types: ['Normal', 'Dragon'],
    bs: {hp: 78, at: 85, df: 110, sa: 160, sd: 116, sp: 36},
    weightkg: 240.5,
    abilities: {0: 'Berserk'},
    baseSpecies: 'Drampa',
  },
  'Eelektross-Mega': {
    types: ['Electric'],
    bs: {hp: 85, at: 145, df: 80, sa: 135, sd: 90, sp: 80},
    weightkg: 180.0,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Eelektross',
  },
  'Emboar-Mega': {
    types: ['Fire', 'Fighting'],
    bs: {hp: 110, at: 148, df: 75, sa: 110, sd: 110, sp: 75},
    weightkg: 180.3,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Emboar',
  },
  'Excadrill-Mega': {
    types: ['Ground', 'Steel'],
    bs: {hp: 110, at: 165, df: 100, sa: 65, sd: 65, sp: 103},
    weightkg: 60.0,
    abilities: {0: 'Piercing Drill'},
    baseSpecies: 'Excadrill',
  },
  'Falinks-Mega': {
    types: ['Fighting'],
    bs: {hp: 65, at: 135, df: 135, sa: 70, sd: 65, sp: 100},
    weightkg: 99.0,
    gender: 'N',
    abilities: {0: 'Battle Armor'},
    baseSpecies: 'Falinks',
  },
  'Feraligatr-Mega': {
    types: ['Water', 'Dragon'],
    bs: {hp: 85, at: 160, df: 125, sa: 89, sd: 93, sp: 78},
    weightkg: 108.8,
    abilities: {0: 'Dragonize'},
    baseSpecies: 'Feraligatr',
  },
  'Floette-Mega': {
    types: ['Fairy'],
    bs: {hp: 74, at: 85, df: 87, sa: 155, sd: 148, sp: 102},
    weightkg: 100.8,
    gender: 'F',
    abilities: {0: 'Fairy Aura'},
    baseSpecies: 'Floette',
  },
  'Froslass-Mega': {
    types: ['Ice', 'Ghost'],
    bs: {hp: 70, at: 80, df: 70, sa: 140, sd: 100, sp: 120},
    weightkg: 29.6,
    gender: 'F',
    abilities: {0: 'Snow Warning'},
    baseSpecies: 'Froslass',
  },
  'Garchomp-Mega-Z': {
    types: ['Dragon'],
    bs: {hp: 108, at: 130, df: 85, sa: 141, sd: 85, sp: 151},
    weightkg: 99.0,
    abilities: {0: 'Sand Force'},
    baseSpecies: 'Garchomp',
  },
  'Glimmora-Mega': {
    types: ['Rock', 'Poison'],
    bs: {hp: 83, at: 90, df: 105, sa: 150, sd: 96, sp: 101},
    weightkg: 77.0,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Glimmora',
  },
  'Golisopod-Mega': {
    types: ['Bug', 'Steel'],
    bs: {hp: 75, at: 150, df: 175, sa: 70, sd: 120, sp: 40},
    weightkg: 148.0,
    abilities: {0: 'Emergency Exit'},
    baseSpecies: 'Golisopod',
  },
  'Golurk-Mega': {
    types: ['Ground', 'Ghost'],
    bs: {hp: 89, at: 159, df: 105, sa: 70, sd: 105, sp: 55},
    weightkg: 330.0,
    gender: 'N',
    abilities: {0: 'Unseen Fist'},
    baseSpecies: 'Golurk',
  },
  'Greninja-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 125, df: 77, sa: 133, sd: 81, sp: 142},
    weightkg: 40.0,
    abilities: {0: 'Protean'},
    baseSpecies: 'Greninja',
  },
  'Hawlucha-Mega': {
    types: ['Fighting', 'Flying'],
    bs: {hp: 78, at: 137, df: 100, sa: 74, sd: 93, sp: 118},
    weightkg: 25.0,
    abilities: {0: 'Limber'},
    baseSpecies: 'Hawlucha',
  },
  'Heatran-Mega': {
    types: ['Fire', 'Steel'],
    bs: {hp: 91, at: 120, df: 106, sa: 175, sd: 141, sp: 67},
    weightkg: 570.0,
    abilities: {0: 'Flash Fire'},
    baseSpecies: 'Heatran',
  },
  'Lucario-Mega-Z': {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 100, df: 70, sa: 164, sd: 70, sp: 151},
    weightkg: 49.4,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Lucario',
  },
  'Magearna-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 125, df: 115, sa: 170, sd: 115, sp: 95},
    weightkg: 248.1,
    gender: 'N',
    abilities: {0: 'Soul-Heart'},
    baseSpecies: 'Magearna',
  },
  'Magearna-Original-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 125, df: 115, sa: 170, sd: 115, sp: 95},
    weightkg: 248.1,
    gender: 'N',
    abilities: {0: 'Soul-Heart'},
    baseSpecies: 'Magearna',
  },
  'Malamar-Mega': {
    types: ['Dark', 'Psychic'],
    bs: {hp: 86, at: 102, df: 88, sa: 98, sd: 120, sp: 88},
    weightkg: 69.8,
    abilities: {0: 'Contrary'},
    baseSpecies: 'Malamar',
  },
  'Meganium-Mega': {
    types: ['Grass', 'Fairy'],
    bs: {hp: 80, at: 92, df: 115, sa: 143, sd: 115, sp: 80},
    weightkg: 201.0,
    abilities: {0: 'Mega Sol'},
    baseSpecies: 'Meganium',
  },
  'Meowstic-F-Mega': {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 143, sd: 101, sp: 124},
    weightkg: 10.1,
    gender: 'F',
    abilities: {0: 'Trace'},
    baseSpecies: 'Meowstic',
  },
  'Meowstic-M-Mega': {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 143, sd: 101, sp: 124},
    weightkg: 10.1,
    gender: 'M',
    abilities: {0: 'Trace'},
    baseSpecies: 'Meowstic',
  },
  'Pyroar-Mega': {
    types: ['Fire', 'Normal'],
    bs: {hp: 86, at: 88, df: 92, sa: 129, sd: 86, sp: 126},
    weightkg: 93.3,
    abilities: {0: 'Rivalry'},
    baseSpecies: 'Pyroar',
  },
  'Raichu-Mega-X': {
    types: ['Electric'],
    bs: {hp: 60, at: 135, df: 95, sa: 90, sd: 95, sp: 110},
    weightkg: 38.0,
    abilities: {0: 'Surge Surfer'},
    baseSpecies: 'Raichu',
  },
  'Raichu-Mega-Y': {
    types: ['Electric'],
    bs: {hp: 60, at: 100, df: 55, sa: 160, sd: 80, sp: 130},
    weightkg: 26.0,
    abilities: {0: 'Surge Surfer'},
    baseSpecies: 'Raichu',
  },
  'Scolipede-Mega': {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 140, df: 149, sa: 75, sd: 99, sp: 62},
    weightkg: 230.5,
    abilities: {0: 'Poison Point'},
    baseSpecies: 'Scolipede',
  },
  'Scovillain-Mega': {
    types: ['Grass', 'Fire'],
    bs: {hp: 65, at: 138, df: 85, sa: 138, sd: 85, sp: 75},
    weightkg: 22.0,
    abilities: {0: 'Spicy Spray'},
    baseSpecies: 'Scovillain',
  },
  'Scrafty-Mega': {
    types: ['Dark', 'Fighting'],
    bs: {hp: 65, at: 130, df: 135, sa: 55, sd: 135, sp: 68},
    weightkg: 31.0,
    abilities: {0: 'Shed Skin'},
    baseSpecies: 'Scrafty',
  },
  'Skarmory-Mega': {
    types: ['Steel', 'Flying'],
    bs: {hp: 65, at: 140, df: 110, sa: 40, sd: 100, sp: 110},
    weightkg: 40.4,
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Skarmory',
  },
  'Staraptor-Mega': {
    types: ['Fighting', 'Flying'],
    bs: {hp: 85, at: 140, df: 100, sa: 60, sd: 90, sp: 110},
    weightkg: 50.0,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Staraptor',
  },
  'Starmie-Mega': {
    types: ['Water', 'Psychic'],
    bs: {hp: 60, at: 100, df: 105, sa: 130, sd: 105, sp: 120},
    weightkg: 80.0,
    gender: 'N',
    abilities: {0: 'Huge Power'},
    baseSpecies: 'Starmie',
  },
  'Tatsugiri-Curly-Mega': {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 65, df: 90, sa: 135, sd: 125, sp: 92},
    weightkg: 24,
    abilities: {0: 'Commander'},
    baseSpecies: 'Tatsugiri',
  },
  'Tatsugiri-Droopy-Mega': {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 65, df: 90, sa: 135, sd: 125, sp: 92},
    weightkg: 24,
    abilities: {0: 'Commander'},
    baseSpecies: 'Tatsugiri',
  },
  'Tatsugiri-Stretchy-Mega': {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 65, df: 90, sa: 135, sd: 125, sp: 92},
    weightkg: 24,
    abilities: {0: 'Commander'},
    baseSpecies: 'Tatsugiri',
  },
  'Victreebel-Mega': {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 125, df: 85, sa: 135, sd: 95, sp: 70},
    weightkg: 125.5,
    abilities: {0: 'Innards Out'},
    baseSpecies: 'Victreebel',
  },
  'Zeraora-Mega': {
    types: ['Electric'],
    bs: {hp: 88, at: 157, df: 75, sa: 147, sd: 80, sp: 153},
    weightkg: 44.5,
    gender: 'N',
    abilities: {0: 'Volt Absorb'},
    baseSpecies: 'Zeraora',
  },
  'Zygarde-Mega': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 216, at: 70, df: 91, sa: 216, sd: 85, sp: 100},
    weightkg: 610,
    gender: 'N',
    abilities: {0: 'Aura Break'},
    baseSpecies: 'Zygarde',
  },
};

const SV: {[name: string]: SpeciesData} = extend(true, {}, SS, PLA_PATCH, SV_PATCH, ZA_PATCH);

for (const [name, specie] of Object.entries(SV)) {
  if (name.endsWith('-Gmax')) {
    delete SV[name];
    continue;
  }
  if (specie.otherFormes) {
    // @ts-expect-error readonly
    specie.otherFormes = [...new Set(specie.otherFormes)].filter(f => !f.endsWith('-Gmax'));
    // @ts-expect-error readonly
    if (!specie.otherFormes.length) specie.otherFormes = undefined;
  }
}

const CHAMPIONS_LIST = [
  'Abomasnow',
  'Abomasnow-Mega',
  'Absol',
  'Absol-Mega',
  'Aegislash-Blade',
  'Aegislash-Both',
  'Aegislash-Shield',
  'Aerodactyl',
  'Aerodactyl-Mega',
  'Aggron',
  'Aggron-Mega',
  'Alakazam',
  'Alakazam-Mega',
  'Alcremie',
  'Altaria',
  'Altaria-Mega',
  'Ampharos',
  'Ampharos-Mega',
  'Appletun',
  'Araquanid',
  'Arbok',
  'Arcanine',
  'Arcanine-Hisui',
  'Archaludon',
  'Ariados',
  'Armarouge',
  'Aromatisse',
  'Audino',
  'Audino-Mega',
  'Aurorus',
  'Avalugg',
  'Avalugg-Hisui',
  'Azumarill',
  'Banette',
  'Banette-Mega',
  'Basculegion',
  'Basculegion-F',
  'Bastiodon',
  'Beartic',
  'Beedrill',
  'Beedrill-Mega',
  'Bellibolt',
  'Blastoise',
  'Blastoise-Mega',
  'Camerupt',
  'Camerupt-Mega',
  'Castform',
  'Castform-Rainy',
  'Castform-Snowy',
  'Castform-Sunny',
  'Ceruledge',
  'Chandelure',
  'Chandelure-Mega',
  'Charizard',
  'Charizard-Mega-X',
  'Charizard-Mega-Y',
  'Chesnaught',
  'Chesnaught-Mega',
  'Chimecho',
  'Chimecho-Mega',
  'Clawitzer',
  'Clefable',
  'Clefable-Mega',
  'Cofagrigus',
  'Conkeldurr',
  'Corviknight',
  'Crabominable',
  'Crabominable-Mega',
  'Decidueye',
  'Decidueye-Hisui',
  'Dedenne',
  'Delphox',
  'Delphox-Mega',
  'Diggersby',
  'Ditto',
  'Dragapult',
  'Dragonite',
  'Dragonite-Mega',
  'Drampa',
  'Drampa-Mega',
  'Emboar',
  'Emboar-Mega',
  'Emolga',
  'Empoleon',
  'Espathra',
  'Espeon',
  'Excadrill',
  'Excadrill-Mega',
  'Farigiraf',
  'Feraligatr',
  'Feraligatr-Mega',
  'Flapple',
  'Flareon',
  'Floette-Eternal',
  'Floette-Mega',
  'Florges',
  'Forretress',
  'Froslass',
  'Froslass-Mega',
  'Furfrou',
  'Gallade',
  'Gallade-Mega',
  'Garbodor',
  'Garchomp',
  'Garchomp-Mega',
  'Gardevoir',
  'Gardevoir-Mega',
  'Garganacl',
  'Gengar',
  'Gengar-Mega',
  'Glaceon',
  'Glalie',
  'Glalie-Mega',
  'Glimmora',
  'Glimmora-Mega',
  'Gliscor',
  'Golurk',
  'Golurk-Mega',
  'Goodra',
  'Goodra-Hisui',
  'Gourgeist',
  'Gourgeist-Large',
  'Gourgeist-Small',
  'Gourgeist-Super',
  'Greninja',
  'Greninja-Mega',
  'Gyarados',
  'Gyarados-Mega',
  'Hatterene',
  'Hawlucha',
  'Hawlucha-Mega',
  'Heliolisk',
  'Heracross',
  'Heracross-Mega',
  'Hippowdon',
  'Houndoom',
  'Houndoom-Mega',
  'Hydrapple',
  'Hydreigon',
  'Incineroar',
  'Infernape',
  'Jolteon',
  'Kangaskhan',
  'Kangaskhan-Mega',
  'Kingambit',
  'Kleavor',
  'Klefki',
  'Kommo-o',
  'Krookodile',
  'Leafeon',
  'Liepard',
  'Lopunny',
  'Lopunny-Mega',
  'Lucario',
  'Lucario-Mega',
  'Luxray',
  'Lycanroc',
  'Lycanroc-Dusk',
  'Lycanroc-Midnight',
  'Machamp',
  'Mamoswine',
  'Manectric',
  'Manectric-Mega',
  'Maushold',
  'Maushold-Four',
  'Medicham',
  'Medicham-Mega',
  'Meganium',
  'Meganium-Mega',
  'Meowscarada',
  'Meowstic',
  'Meowstic-F',
  'Meowstic-F-Mega',
  'Meowstic-M-Mega',
  'Milotic',
  'Mimikyu',
  'Mimikyu-Busted',
  'Morpeko',
  'Morpeko-Hangry',
  'Mr. Rime',
  'Mudsdale',
  'Ninetales',
  'Ninetales-Alola',
  'Noivern',
  'Oranguru',
  'Orthworm',
  'Palafin',
  'Palafin-Hero',
  'Pangoro',
  'Passimian',
  'Pelipper',
  'Pidgeot',
  'Pidgeot-Mega',
  'Pikachu',
  'Pinsir',
  'Pinsir-Mega',
  'Politoed',
  'Polteageist',
  'Polteageist-Antique',
  'Primarina',
  'Quaquaval',
  'Raichu',
  'Raichu-Alola',
  'Rampardos',
  'Reuniclus',
  'Rhyperior',
  'Roserade',
  'Rotom',
  'Rotom-Fan',
  'Rotom-Frost',
  'Rotom-Heat',
  'Rotom-Mow',
  'Rotom-Wash',
  'Runerigus',
  'Sableye',
  'Sableye-Mega',
  'Salazzle',
  'Samurott',
  'Samurott-Hisui',
  'Sandaconda',
  'Scizor',
  'Scizor-Mega',
  'Scovillain',
  'Scovillain-Mega',
  'Serperior',
  'Sharpedo',
  'Sharpedo-Mega',
  'Simipour',
  'Simisage',
  'Simisear',
  'Sinistcha',
  'Sinistcha-Masterpiece',
  'Skarmory',
  'Skarmory-Mega',
  'Skeledirge',
  'Slowbro',
  'Slowbro-Galar',
  'Slowbro-Mega',
  'Slowking',
  'Slowking-Galar',
  'Slurpuff',
  'Sneasler',
  'Snorlax',
  'Spiritomb',
  'Starmie',
  'Starmie-Mega',
  'Steelix',
  'Steelix-Mega',
  'Stunfisk',
  'Stunfisk-Galar',
  'Sylveon',
  'Talonflame',
  'Tauros',
  'Tauros-Paldea-Aqua',
  'Tauros-Paldea-Blaze',
  'Tauros-Paldea-Combat',
  'Tinkaton',
  'Torkoal',
  'Torterra',
  'Toucannon',
  'Toxapex',
  'Toxicroak',
  'Trevenant',
  'Tsareena',
  'Typhlosion',
  'Typhlosion-Hisui',
  'Tyranitar',
  'Tyranitar-Mega',
  'Tyrantrum',
  'Umbreon',
  'Vanilluxe',
  'Vaporeon',
  'Venusaur',
  'Venusaur-Mega',
  'Victreebel',
  'Victreebel-Mega',
  'Vivillon',
  'Vivillon-Fancy',
  'Vivillon-Pokeball',
  'Volcarona',
  'Watchog',
  'Weavile',
  'Whimsicott',
  'Wyrdeer',
  'Zoroark',
  'Zoroark-Hisui',
];

const CHAMPIONS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Floette-Eternal': {otherFormes: ['Floette-Mega']},
  'Floette-Mega': {baseSpecies: 'Floette-Eternal'},
};

const CHAMPIONS: {[name: string]: SpeciesData} = extend(
  true, {},
  Object.fromEntries(CHAMPIONS_LIST.map(s => [s, SV[s]])), CHAMPIONS_PATCH
);

removeAttr(CHAMPIONS, 'Alcremie', 'otherFormes');
removeAttr(CHAMPIONS, 'Appletun', 'otherFormes');
removeAttr(CHAMPIONS, 'Araquanid', 'otherFormes');
removeAttr(CHAMPIONS, 'Corviknight', 'otherFormes');
removeAttr(CHAMPIONS, 'Flapple', 'otherFormes');
removeAttr(CHAMPIONS, 'Floette-Eternal', 'baseSpecies');
removeAttr(CHAMPIONS, 'Garbodor', 'otherFormes');
removeAttr(CHAMPIONS, 'Hatterene', 'otherFormes');
removeAttr(CHAMPIONS, 'Machamp', 'otherFormes');
removeAttr(CHAMPIONS, 'Pikachu', 'otherFormes');
removeAttr(CHAMPIONS, 'Salazzle', 'otherFormes');
removeAttr(CHAMPIONS, 'Sandaconda', 'otherFormes');
removeAttr(CHAMPIONS, 'Snorlax', 'otherFormes');

export const SPECIES = [CHAMPIONS, RBY, GSC, ADV, DPP, BW, XY, SM, SS, SV];

export class Species implements I.Species {
  private readonly gen: I.GenerationNum;

  constructor(gen: I.GenerationNum) {
    this.gen = gen;
  }

  get(id: I.ID) {
    return SPECIES_BY_ID[this.gen][id];
  }

  *[Symbol.iterator]() {
    for (const id in SPECIES_BY_ID[this.gen]) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Specie implements I.Specie {
  readonly kind: 'Species';
  readonly id: I.ID;
  readonly name: I.SpeciesName;
  readonly types!: [I.TypeName] | [I.TypeName, I.TypeName];
  readonly baseStats: Readonly<I.StatsTable>;
  readonly weightkg!: number; // weight
  readonly gender?: I.GenderName;
  readonly nfe?: boolean;
  readonly abilities?: {0: I.AbilityName};
  readonly otherFormes?: I.SpeciesName[];
  readonly baseSpecies?: I.SpeciesName;

  private static readonly EXCLUDE = new Set(['bs', 'otherFormes']);

  constructor(name: string, data: SpeciesData) {
    this.kind = 'Species';
    this.id = toID(name);
    this.name = name as I.SpeciesName;

    const baseStats: Partial<I.StatsTable> = {};
    baseStats.hp = data.bs.hp;
    baseStats.atk = data.bs.at;
    baseStats.def = data.bs.df;
    baseStats.spa = gen === 0 || gen >= 2 ? data.bs.sa : data.bs.sl;
    baseStats.spd = gen === 0 || gen >= 2 ? data.bs.sd : data.bs.sl;
    baseStats.spe = data.bs.sp;
    this.baseStats = baseStats as I.StatsTable;
    this.otherFormes = data.otherFormes as I.SpeciesName[];

    assignWithout(this, data, Specie.EXCLUDE);
  }
}
const SPECIES_BY_ID: Array<{[id: string]: Specie}> = [];

let gen = 0;
for (const species of SPECIES) {
  const map: {[id: string]: Specie} = {};
  for (const specie in species) {
    if (gen >= 2 && species[specie].bs.sl) delete species[specie].bs.sl;
    const m = new Specie(specie, species[specie]);
    map[m.id] = m;
  }
  SPECIES_BY_ID.push(map);
  gen++;
}
