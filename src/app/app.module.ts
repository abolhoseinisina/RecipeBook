import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from './dropdown.directive';
import { FooterComponent } from './footer.component';
import { SaveAlertComponent } from './save-alert.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    FooterComponent,
    SaveAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShoppingListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
