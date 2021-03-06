import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService ) { 
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    this.recipeService.onRecipesRefresh.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }

  onSaveButton(){
    this.recipeService.storeData().subscribe();
  }

  onRefreshButton(){
    this.recipeService.refreshData();
  }
}
