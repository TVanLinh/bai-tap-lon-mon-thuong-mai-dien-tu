import {Ingredient} from "./ingrendient.model";
export class OrderForm {
  customerLoginForm: { email: string, passWord: string };
  engredients: Ingredient[];
}
