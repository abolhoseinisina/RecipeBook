import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  @Output() onRecipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService ) { 
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
  }

  onSelected(recipe: Recipe){
    this.onRecipeSelected.emit(recipe);
  }
}
