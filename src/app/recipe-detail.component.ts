import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { RecipeService } from './recipe.service';
import { Recipe } from './recipe';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  // styleUrls: ['./recipe-detail.component.css']
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
}
