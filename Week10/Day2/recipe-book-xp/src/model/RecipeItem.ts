import { v4 as uuidv4 } from 'uuid';

export interface IRecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

export class RecipeItem implements IRecipeItem {
  public id: string;
  public isFavorite: boolean;

  constructor(
    public title: string,
    public ingredients: string[],
    public instructions: string,
    id: string = uuidv4(),
    isFavorite: boolean = false
  ) {
    this.id = id;
    this.isFavorite = isFavorite;
  }
}