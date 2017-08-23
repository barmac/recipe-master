import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { RecipeService } from './recipe.service';
import { Recipe } from './recipe';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .map((params: ParamMap) => params.get('id'))
      .switchMap(id => this.recipeService.getRecipe(id))
      .subscribe(recipe => this.recipe = recipe);
  }

  save(): void {
    this.recipeService.update(this.recipe).then(recipe => this.recipe = recipe);
  }

  getTime(recipe): string {
    let result = 'undefined';
    let minutes = 0;
    for (let instruction of recipe.instructions) {
      minutes += instruction.time;
    }
    if (minutes > 0) {
      result = minutes > 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
    }
    return result;
  }

}
