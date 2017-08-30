import {Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    public recipeService: RecipeService,
    public router: Router) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
  }

  goToRecipe(recipe: Recipe) {
    this.router.navigate([`/recipe/${recipe._id}`]);
  }
}
