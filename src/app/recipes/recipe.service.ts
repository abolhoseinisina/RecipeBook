import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  onRecipesRefresh = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Pumpkin Cream Cheese Muffins', 'You`ll be glad you made this recipe for pumpkin muffins with a cream cheese filling and a streusel topping.', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2021%2F10%2F15%2FScreen-Shot-2021-10-15-at-12.59.41-PM.png&w=426&h=285&c=sc&poi=face&q=85', [
      new Ingredient('Chicken breast', 1.5),
      new Ingredient('Potato', 1)
    ]),
    new Recipe('Paleo Chicken with Apple and Sweet Potato', 'A freezer dump meal for the slow cooker. Serve with riced cauliflower (such as Trader Joe`s® Riced Cauliflower).', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F02%2Fimage-9-2000.jpeg&w=426&h=285&c=sc&poi=face&q=85', [
      new Ingredient('Tomamto', 3),
      new Ingredient('Meat', 2),
      new Ingredient('Bread', 1.5),
    ])
  ];

  constructor(private http: HttpClient) { }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  getRecipes() {
    this.refreshData();
    return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put('https://recipe-book-c023d-default-rtdb.firebaseio.com/recipes.json', body, httpOptions);
  }

  refreshData() {
    return this.http.get<Recipe[]>('https://recipe-book-c023d-default-rtdb.firebaseio.com/recipes.json')
      .subscribe(data => {
        this.recipes = data;
        this.onRecipesRefresh.emit(this.recipes)
      });
  }
}
