import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  showSaveAlert: boolean = false;
  
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.onRecipesSaved.subscribe(
      () => {
        this.showSaveAlert = true;
        setTimeout(() => {
          this.showSaveAlert = false;
        }, 4000)
      }
    );
  }
}
