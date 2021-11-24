import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  @Output() onRecipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];
  recipe = new Recipe('Tomato','Red delicious vegetable','https://ponnaorganics.com/wp-content/uploads/2016/02/tomato.jpg')

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(recipe: Recipe){
    this.onRecipeSelected.emit(recipe);
  }
}
