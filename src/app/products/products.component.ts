import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareService } from '../services/share.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(public shareService: ShareService, public fb: FormBuilder, private _snackBar: MatSnackBar) { }

  public productList: Array<Product> = [];

  addForm: FormGroup = this.fb.group({
    name: [null, {
      validators: [Validators.required]
    }],
    price: [null, {
      validators: [Validators.required]
    }],
    sku: [null, {
      validators: [Validators.required]
    }],
  })
  get f() { return this.addForm.controls; }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productList = [];
    this.shareService.getProducts().subscribe((res: any) => {
      if (res.length > 0) {
        this.productList = res;
      }
    });
  }

  addProduct() {
    if (this.addForm.valid) {
      this.shareService.addProducts(this.addForm.value).subscribe((res: any) => {
        if (res.status == 201) {
          this._snackBar.open(res.message)
          this.addForm.reset();
          this.getProducts();
        } else {
          this._snackBar.open("Could not create, Please try again.")
        }
      })
    }
  }

  delete(id: string | undefined) {
    this.shareService.deleteProducts(id).subscribe((res: any) => {
      console.log(res)
      this._snackBar.open("Product Deleted!")
      this.getProducts();
    })
  }

}
