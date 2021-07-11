import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ShareService } from 'src/app/services/share.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, OnDestroy {

  constructor(public shareService: ShareService, private _snackBar: MatSnackBar) { }
  search$ = new Subject;
  subscription: Subscription | undefined;
  productList: Array<Product> = [];

  ngOnInit(): void {
    this.subscription = this.search$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((searchText:any) => this.shareService.searchProducts(searchText))
    ).subscribe((response: any) => {
        this.productList = response
    });
  }

  delete(id: string | undefined) {
    this.shareService.deleteProducts(id).subscribe((res: any) => {
      console.log(res)
      this._snackBar.open("Product Deleted!")
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
