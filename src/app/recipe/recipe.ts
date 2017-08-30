import {Ingredient} from './ingredient';
import {Instruction} from './instruction';

export class Recipe {
  _id: string;
  name: string;
  desc: string;
  photoURL: string;
  ingredients: Array<Ingredient>;
  instructions: Array<Instruction>;
  owner: string;
  restricted: boolean;
}
