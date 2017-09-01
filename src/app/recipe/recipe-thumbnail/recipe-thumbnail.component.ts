import {Component, Input} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';


@Component({
  selector: 'app-recipe-thumbnail',
  templateUrl: './recipe-thumbnail.component.html',
  styleUrls: ['./recipe-thumbnail.component.css']
})
export class RecipeThumbnailComponent {
  @Input() recipe: Recipe;
  constructor(
    public recipeService: RecipeService) {}
}
