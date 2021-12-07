import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})

export class ShoppingListAddComponent implements OnChanges {
  @Input() item!: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd: boolean = true;

  constructor(private service: ShoppingListService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['item'].currentValue);
    if (changes['item'].currentValue === undefined) {
      this.isAdd = true;
      this.item = { name: '', amount: 0 };
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient) {
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    if (this.isAdd) {
      this.item = newIngredient;
      this.service.addItem(this.item);
    } else {
      this.service.editItem(this.item, newIngredient);
      this.item = newIngredient;
    }
  }

  onDelete() {
    this.service.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }
}
