import {Ingredient} from "../../../model/ingrendient.model";
import {UserEntityModel} from "../user-entity/user.model";
import {CustomerEntity} from "app/admin/entities/customer-entity/customer-entity.model";
export class OrderEntity {
  id: number;
  createTime: number;
  lastUpdateTime: number;
  customer: CustomerEntity;
  status: number;
  user: UserEntityModel;
  orderDetails: Ingredient[];

}
