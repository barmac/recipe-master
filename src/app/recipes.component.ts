import {Component, OnInit} from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  // styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  selectedRecipe: Recipe;

  constructor(
    private router: Router,
    private recipeService: RecipeService) { }

  getRecipes(): void {
    this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedRecipe._id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.recipeService.create(name)
      .then(recipe => {
        this.recipes.push(recipe);
        this.selectedRecipe = null;
      });
  }

  remove(recipe: Recipe): void {
    this.recipeService
      .delete(recipe._id)
      .then(() => {
        this.recipes = this.recipes.filter(h => h !== recipe);
        if (this.selectedRecipe === recipe) { this.selectedRecipe = null; }
      });
  }
}
