import {Product} from "./product.model";
export class Ingredient {
  product: Product;
  amount: number;
  price: number;

     getPrice(ing: Ingredient[]) {
    let money = 0;
    for (let item of ing) {
       money += (item.price)*item.amount;
    }
    return money;
  }
}
