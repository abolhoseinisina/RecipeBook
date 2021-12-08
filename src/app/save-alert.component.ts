import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-save-alert',
  templateUrl: './save-alert.component.html',
  styles: ['.alert {     position: fixed; bottom: 10px; right: 10px; width: 50%;}']
})

export class SaveAlertComponent {
}
