import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  apiUrl = "http://localhost:8000/";
  constructor(public http: HttpClient) { }

  startLoader() {
    (document.getElementById('loader') as HTMLInputElement).style.display = "block";
  }

  stopLoader() {
    (document.getElementById('loader') as HTMLInputElement).style.display = "none";
  }
  
  getProducts(){
    return this.http.get(this.apiUrl + "products");
  }

  addProducts(body: Product){
    return this.http.post(this.apiUrl + "products", body);
  }

  deleteProducts(id: string | undefined){
    return this.http.delete(`${this.apiUrl}products/${id}`);
  }

  searchProducts(str: string){
    return this.http.delete(`https://demo.dataverse.org/api/search?q=${str}`);
  }

}
