import {Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
  }

  getTime(recipe): string {
    let result = 'undefined';
    let minutes = 0;
    for (const instruction of recipe.instructions) {
      minutes += instruction.time;
    }
    if (minutes > 0) {
      result = minutes > 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
    }
    return result;
  }
}
