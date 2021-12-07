import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})

export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm!: FormGroup;

  private recipeIndex!: number;
  private subscription!: Subscription;
  private recipe!: Recipe;
  private isNew: boolean = true;

  constructor(private route: ActivatedRoute,
              private service: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private navigateBack(){
    this.router.navigate(['../'])
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: any) => {
      if (params.hasOwnProperty('id')) {
        this.isNew = false;
        this.recipeIndex = +params['id']
        this.recipe = this.service.getRecipe(this.recipeIndex);
      } else {
        this.isNew = true;
      }
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients: FormArray = new FormArray([]);


    if (!this.isNew) {
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.recipe.ingredients[i].amount, [
              Validators.required,
              Validators.min(1),
            ]),
          })
        )
        recipeName = this.recipe.name;
        recipeImagePath = this.recipe.imagePath;
        recipeDescription = this.recipe.description;
      }

      
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients,
    })
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if(this.isNew){
      this.service.addRecipe(newRecipe);
    } else {
      this.service.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  onRemoveItem(index: number){
    (<FormArray> this.recipeForm.controls['ingredients']).removeAt(index);
  }

  onAddItem(name: string, amount: string){
    (<FormArray> this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [
          Validators.required,
          Validators.min(1),
        ]),
      })
    );
  }
}