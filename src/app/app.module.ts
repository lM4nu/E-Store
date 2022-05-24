import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PanelComponent } from './panel/panel.component';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './item/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelComponent,
    ItemComponent,
    CartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
