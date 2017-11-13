import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Response} from "@angular/http";
import {CatalogEntityService} from "./catalog-entity.service";
import {CatalogEntity} from "./catalog-entity.model";
import * as  Collections from "typescript-collections";

import {BaseComponent} from "../../BaseComponent";
@Component({
  selector: 'app-catalog-entity',
  templateUrl: './catalog-entity.component.html',
  styleUrls: ['./catalog-entity.component.css', "../entities.component.css"]
})
export class CatalogEntityComponent extends BaseComponent implements OnInit {

  success: boolean = true;
  listCatalog = new Collections.LinkedList<CatalogEntity>();
  catalogTemp = new Collections.LinkedList<CatalogEntity>();
  titleCatalog = "Tạo catalog ";
  valid = true;
  query = '';

  temp: CatalogEntity = null;
  // message = '';

  constructor(private catalogEntityService: CatalogEntityService) {
    super();
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
    console.log(this.temp);

    if (value.name.trim() === "") {
      this.valid = false;
    }

    if (this.temp != null) {
      let bodyUpdate: CatalogEntity = {
        id: this.temp.id,
        code: this.temp.code,
        name: value.name
      };
      this.catalogEntityService.updateCatalog(bodyUpdate).subscribe((data) => {
        let indx = this.listCatalog.indexOf(this.temp);
        console.log(indx);
        this.listCatalog.remove(this.temp);
        this.listCatalog.add(bodyUpdate, indx);
        this.updateMessge('Cập nhật thành công  ', 'success');
        this.closeModal(catalogModal);
      }, (err) => {
        this.updateMessge('Cập nhật không thành công  ', 'warning');
      });
      this.temp = null;
      formData.reset();
      return;
    }

    if (value.code.trim() === "") {
      this.valid = false;
    }

    let catalog: CatalogEntity = {
      id: 0,
      name: value.name.trim(),
      code: value.code.trim()
    };


    this.catalogEntityService.createCatalog(catalog).subscribe((data: Response) => {
      if (data.status > 200) {
        this.success = false;
      } else {
        this.success = true;
        this.listCatalog.add(catalog, 0);
        catalogModal.hide();
        this.updateMessge('Lưu thành công  ', 'success');
      }
    }, (err) => {
      this.updateMessge('Lưu không thành công   ', 'warning');
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

  editItem(formData: NgForm, temp, catalogModal) {
    this.temp = temp;
    formData.setValue({
      name: temp.name,
      code: temp.code
    });
    catalogModal.show();
  }


}
