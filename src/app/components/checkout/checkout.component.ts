import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalBill: number = 0;
  sessionDataAvailable: boolean = false;
  isSubmitted: boolean = false;
  checkoutForm: FormGroup | any;
  cartData: any;
  ordersListData: any;
  constructor(private dataStoreService: DataStoreService, private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.dataStoreService.cartItems$.subscribe((products) => {
      this.cartData = products;
    })
    this.dataStoreService.orders$.subscribe((orders) => {
      this.ordersListData = orders;
    })
    this.getCartPrice();
    this.checkoutForm = new FormGroup({
      'fName': new FormControl(null, Validators.required),
      'lName': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'postal_code': new FormControl(null, Validators.required),
      'check_country': new FormControl('canada', Validators.required),
      'payment_method': new FormControl('visa', Validators.required),
      'cc_number': new FormControl(null, [Validators.required, Validators.maxLength(16)]),
      'card_exp_month': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(12)]),
      'card_exp_year': new FormControl(null, [Validators.required, Validators.min(1900), Validators.max(2099)]),
      'cvc_number': new FormControl(null, [Validators.required, Validators.max(9999)]),
      'cName': new FormControl(null, Validators.required),
    });
    if (sessionStorage.getItem('addressData')) {
      this.sessionDataAvailable = true;
    }
  }

  submitCheckout() {
    this.isSubmitted = true;
    console.log({
      "products": this.cartData,
      "FormDetail": {
        'First name': this.checkoutForm.value.fName,
        'Last Name': this.checkoutForm.value.lName,
        'Address': this.checkoutForm.value.address,
        'City': this.checkoutForm.value.city,
        'Postal_code': this.checkoutForm.value.postal_code,
        'Check_country': this.checkoutForm.value.check_country,
        'Payment_method': this.checkoutForm.value.payment_method,
        'Card Name': this.checkoutForm.value.cName,
      }
    })
    sessionStorage.setItem('addressData', JSON.stringify({
      'fname': this.checkoutForm.value.fName,
      'lName': this.checkoutForm.value.lName,
      'address': this.checkoutForm.value.address,
      'city': this.checkoutForm.value.city,
      'postal_code': this.checkoutForm.value.postal_code,
      'check_country': this.checkoutForm.value.check_country,
      'payment_method': this.checkoutForm.value.payment_method,
      'cName': this.checkoutForm.value.cName,
    }))
    this.dataStoreService.setOrders([...this.ordersListData, { "orderNumber": (Math.floor(Math.random() * 9000000000) + 1000000000).toString(), "total": this.totalBill.toString() }])
    this.productService.clearCart();
    setTimeout(() => {
      this.isSubmitted = false;
      this.router.navigate(['/'])
    }, 3000)

  }

  cardMonthHandler(event: any) {
    if (event.target.value.length > 2) {
      let newVal = event.target.value.slice(event.target.value.length - 1, 1);
      this.checkoutForm.patchValue({
        'card_exp_month': parseInt(newVal)
      });
    }
  }
  cardYearHandler(event: any) {
    if (event.target.value.length > 4) {
      let newVal = event.target.value.slice(event.target.value.length - 1, 1);
      this.checkoutForm.patchValue({
        'card_exp_year': newVal
      });
    }
  }
  getCartPrice() {
    this.dataStoreService.cartItems$.subscribe((products) => {
      for (let prod of products) {
        this.totalBill = this.totalBill + parseFloat(prod.price.split('$')[1]);
      }
    })
  }
  bringExistingData() {
    if (sessionStorage.getItem('addressData')) {
      let storageData = JSON.parse(sessionStorage.getItem('addressData')!);
      this.checkoutForm.patchValue({
        'fName': storageData.fname,
        'lName': storageData.lName,
        'address': storageData.address,
        'city': storageData.city,
        'postal_code': storageData.postal_code,
        'check_country': storageData.check_country,
        'payment_method': storageData.payment_method,
        'cName': storageData.cName,
      });
    }
  }
}
