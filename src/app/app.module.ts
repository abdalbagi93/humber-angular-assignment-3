import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { ItemComponent } from './components/item/item.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NumbersonlyDirective } from './components/numbersonly-directive/numbersonly.directive';
import { TwodigitnumberDirective } from './components/twoDigitNumber-directive/twodigitnumber.directive';
import { FourdigitnumberDirective } from './components/fourDigitNumber-directive/fourdigitnumber.directive';
import { DataStoreService } from './services/data-store.service';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    AccountInfoComponent,
    NotFoundComponent,
    CartComponent,
    SearchBarComponent,
    NavBarComponent,
    ItemComponent,
    CartItemComponent,
    OrderItemComponent,
    CheckoutComponent,
    NumbersonlyDirective,
    TwodigitnumberDirective,
    FourdigitnumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    NoopAnimationsModule,
    MatCardModule,
    HttpClientModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, DataStoreService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
