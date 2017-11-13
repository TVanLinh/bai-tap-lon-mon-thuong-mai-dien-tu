import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../BaseComponent";
import  * as Collections from "typescript-collections";
import {CustomerEntityService} from "./customer-entity.service";
import {CustomerEntity} from "./customer-entity.model";
@Component({
  selector: 'app-customer-entity',
  templateUrl: './customer-entity.component.html',
  styleUrls: ['./customer-entity.component.css']
})
export class CustomerEntityComponent extends BaseComponent implements OnInit {
  customers = new Collections.LinkedList();

  constructor(private  customerService: CustomerEntityService) {
    super();
  }

  query = "";

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getAll().subscribe((data: CustomerEntity[]) => {
      for (let item of data) {
        this.customers.add(item);
      }
    });
  }

  onSearch() {
    this.customerService.findBy(this.query).subscribe((data: CustomerEntity[]) => {
      this.customers.clear();
      for (let item of data) {
        this.customers.add(item);
      }
    });
  }

}
