import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  recipe = new Recipe('Tomato','Red delicious vegetable','https://ponnaorganics.com/wp-content/uploads/2016/02/tomato.jpg')

  constructor() { }

  ngOnInit(): void {
  }

}
