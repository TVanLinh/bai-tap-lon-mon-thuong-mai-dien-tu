import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Response} from "@angular/http";
import {CatalogEntityService} from "./catalog-entity.service";
import {CatalogEntity} from "./catalog-entity.model";
import * as  Collections from "typescript-collections";
import {TIME_OUT} from "../../../config";
import {AdminUtil} from "../../admin.util";
@Component({
  selector: 'app-catalog-entity',
  templateUrl: './catalog-entity.component.html',
  styleUrls: ['./catalog-entity.component.css', "../entities.component.css"]
})
export class CatalogEntityComponent implements OnInit {

  success: boolean = true;
  listCatalog = new Collections.LinkedList();
  catalogTemp = new Collections.LinkedList();
  titleCatalog = "Tạo catalog ";
  valid = true;
  query = '';
  message = '';

  constructor(private catalogEntityService: CatalogEntityService) {
  }

  ngOnInit() {
    this.catalogEntityService.findAll().subscribe((data: CatalogEntity[]) => {
      for (let item of data) {
        this.catalogTemp.add(item);
        this.listCatalog.add(item);
      }
    });
  }


  onSave(formData: NgForm, catalogModal) {
    let value = formData.value;
    if (value.name.trim() === "" || value.code.trim() === "") {
      this.valid = false;
    }
    let catalog: CatalogEntity = {
      id: 0,
      name: value.name.trim(),
      code: value.code.trim()
    };
    console.log(value);
    this.catalogEntityService.createCatalog(catalog).subscribe((data: Response) => {
      if (data.status > 200) {
        this.success = false;
      } else {
        this.success = true;
        this.listCatalog.add(catalog, 0);
        catalogModal.hide();
        AdminUtil.alert(this.message, " Thêm thành công ", TIME_OUT);
      }
    });
  }

  closeModal(catalogModal: any) {
    this.success = true;
    catalogModal.hide();
  }

  onSearch() {
    this.catalogEntityService.findBy(this.query).subscribe((data: CatalogEntity[]) => {
      this.listCatalog.clear();
      for (let item of data) {
        this.listCatalog.add(item);
      }
    });
  }


}
