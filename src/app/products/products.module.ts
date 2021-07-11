import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './product-routing.module';
import { SearchProductComponent } from './search-product/search-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    SearchProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
