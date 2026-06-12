import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

const collection = new RecipeCollection();
const template = new RecipeTemplate('recipeContainer');

const entryForm = document.getElementById('recipeEntryForm') as HTMLFormElement;
const clearBtn = document.getElementById('clearRecipesButton') as HTMLButtonElement;

entryForm.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
  const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
  const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;

  const title = titleInput.value.trim();
  const ingredients = ingredientsInput.value.split('\n').map(i => i.trim()).filter(i => i !== '');
  const instructions = instructionsInput.value.trim();

  if (title && ingredients.length > 0 && instructions) {
    collection.addRecipe(title, ingredients, instructions);
    template.render(collection);
    
    // Reset form field inputs
    entryForm.reset();
  }
});

clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all recipes?')) {
    collection.clearAll();
    template.render(collection);
  }
});

// Initial Render on startup
template.render(collection);