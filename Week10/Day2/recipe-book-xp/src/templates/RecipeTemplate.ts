import { RecipeCollection } from '../model/RecipeCollection';

export class RecipeTemplate {
  private container: HTMLDivElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLDivElement;
  }

  public render(collection: RecipeCollection): void {
    this.container.innerHTML = '';

    collection.getRecipes().forEach(recipe => {
      const card = document.createElement('div');
      card.className = `recipe-card ${recipe.isFavorite ? 'favorite' : ''}`;
      card.style.border = '1px solid #ccc';
      card.style.padding = '15px';
      card.style.margin = '10px 0';
      card.style.borderRadius = '6px';

      // Title & Favorite button block
      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      
      const title = document.createElement('h3');
      title.innerText = recipe.title;
      
      const favBtn = document.createElement('button');
      favBtn.innerText = recipe.isFavorite ? '★ Unfavorite' : '☆ Favorite';
      favBtn.addEventListener('click', () => {
        collection.toggleFavorite(recipe.id);
        this.render(collection);
      });

      header.append(title, favBtn);
      card.appendChild(header);

      // Collapsible details container
      const details = document.createElement('div');
      
      const ingTitle = document.createElement('h4');
      ingTitle.innerText = 'Ingredients:';
      const ingList = document.createElement('ul');
      recipe.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.innerText = ing;
        ingList.appendChild(li);
      });

      const instTitle = document.createElement('h4');
      instTitle.innerText = 'Instructions:';
      const instText = document.createElement('p');
      instText.innerText = recipe.instructions;

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = '🗑️ Delete Recipe';
      deleteBtn.style.backgroundColor = '#ff4d4d';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = 'none';
      deleteBtn.style.padding = '5px 10px';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.addEventListener('click', () => {
        collection.removeRecipe(recipe.id);
        this.render(collection);
      });

      details.append(ingTitle, ingList, instTitle, instText, deleteBtn);
      card.appendChild(details);
      
      this.container.appendChild(card);
    });
  }
}