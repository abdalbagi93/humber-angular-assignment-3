import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<ProductData[]>;
  isCardEmpty: boolean = true;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.cartItems$ = this.dataStore.cartItems$;
    this.dataStore.cartItems$.subscribe((data) => {
      if (data.length === 0) {
        this.isCardEmpty = true;
      }
      else {
        this.isCardEmpty = false;
      }
    })
  }

  clearCart() {
    this.dataStore.clearCart();
  }
}
