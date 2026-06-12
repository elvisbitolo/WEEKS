import { RecipeItem } from './RecipeItem';

export class RecipeCollection {
  private recipes: RecipeItem[] = [];

  constructor() {
    this.load();
  }

  public getRecipes(): RecipeItem[] {
    return this.recipes;
  }

  public addRecipe(title: string, ingredients: string[], instructions: string): void {
    const newRecipe = new RecipeItem(title, ingredients, instructions);
    this.recipes.push(newRecipe);
    this.save();
  }

  public removeRecipe(id: string): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.save();
  }

  public toggleFavorite(id: string): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.save();
    }
  }

  public clearAll(): void {
    this.recipes = [];
    this.save();
  }

  public save(): void {
    localStorage.setItem('recipesCollection', JSON.stringify(this.recipes));
  }

  public load(): void {
    const stored = localStorage.getItem('recipesCollection');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.recipes = parsed.map(
        (r: any) => new RecipeItem(r.title, r.ingredients, r.instructions, r.id, r.isFavorite)
      );
    }
  }
}