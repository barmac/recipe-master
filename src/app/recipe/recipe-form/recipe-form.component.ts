import {Component, OnInit} from '@angular/core';

import { Recipe } from '../recipe';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../alert/alert.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html'
})
export class RecipeFormComponent implements OnInit {

  recipe = new Recipe();
  edit = false;
  id = '';
  myForm: FormGroup;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {}

  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.edit = true;
      this.id = this.route.snapshot.params.id;
      this.recipeService.getRecipe(this.id).then(recipe => {
        this.recipe = recipe;
        this.initForm();
        this.myForm.patchValue({
          name: this.recipe.name,
          desc: this.recipe.desc,
          photoURL: this.recipe.photoURL
        });
        this.recipe.instructions.forEach(item => {
          const instructions = this.formBuilder.group({
            name: [item.name, [Validators.required, Validators.minLength(1)]],
            time: [item.time, [Validators.min(0)]],
          });
          (<FormArray>this.myForm.controls['instructions']).push(instructions);
        });
        this.recipe.ingredients.forEach(item => {
          const ingredients = this.formBuilder.group({
            name: [item.name, [Validators.required, Validators.minLength(1)]],
            quantity: [item.quantity, [Validators.min(0)]],
            unit: item.unit
          });
          (<FormArray>this.myForm.controls['ingredients']).push(ingredients);
        });
      });
    } else {
      this.initForm();
    }

  }

  initForm() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      desc: '',
      photoURL: '',
      ingredients: this.formBuilder.array([
      ]),
      instructions: this.formBuilder.array([
      ])
    });
  }

  initIngredient() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      quantity: [0, [Validators.min(0)]],
      unit: ['']
    });
  }

  addIngredient() {
    const control = <FormArray>this.myForm.controls['ingredients'];
    control.push(this.initIngredient());
  }

  removeIngredient(i: number) {
    const control = <FormArray>this.myForm.controls['ingredients'];
    control.removeAt(i);
  }

  initInstruction() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      time: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addInstruction() {
    const control = <FormArray>this.myForm.controls['instructions'];
    control.push(this.initInstruction());
  }

  removeInstruction(i: number) {
    const control = <FormArray>this.myForm.controls['instructions'];
    control.removeAt(i);
  }

  onSubmit(form: FormGroup) {
    if (this.edit) {
      this.recipeService.update(form.value, this.id)
        .then((newRecipe) => this.router.navigateByUrl(`recipe/${newRecipe._id}`))
        .catch((e) => {
          this.alertService.error(e);
        });
    } else {
      this.recipeService.create(form.value)
        .then((newRecipe) => this.router.navigateByUrl(`recipe/${newRecipe._id}`))
        .catch((e) => {
          this.alertService.error(e);
        });
    }
  }
}
