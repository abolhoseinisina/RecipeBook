import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})

export class RecipeDetailComponent implements OnInit, OnDestroy {
  @Input() selectedRecipe!: Recipe;
  private selectedIndex!: number;
  private subscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService, 
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) 
  { }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (item) => {
        this.selectedIndex = item["id"];
        this.selectedRecipe = this.recipeService.getRecipe(this.selectedIndex);
      }
    )
  }

  onEdit() {
    this.router.navigate(['/recipes', this.selectedIndex, 'edit']);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }

  onAddItemsToShoppingList() {
    this.shoppingListService.addItems(this.selectedRecipe.ingredients);
  }
}
