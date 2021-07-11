import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { SearchProductComponent } from './search-product/search-product.component';

const routes: Routes = [
    {
        path: '', component: ProductsComponent,
    },
    {
        path: 'search', component: SearchProductComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
