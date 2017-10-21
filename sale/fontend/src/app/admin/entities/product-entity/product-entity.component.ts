import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import * as Collections from "typescript-collections";
import {ProductEntityService} from "./product-entity.service";
import {ProductEntity} from "./product-entity.model.component";
import {NgForm} from "@angular/forms";
import {CatalogEntityService} from "../catalog-entity/catalog-entity.service";
import {CatalogEntity} from "../catalog-entity/catalog-entity.model";
import {BaseComponent} from "../../BaseComponent";

@Component({
  selector: 'app-product-entity',
  templateUrl: './product-entity.component.html',
  styleUrls: ['./product-entity.component.css', "../entities.component.css"]
})
export class ProductEntityComponent extends BaseComponent implements OnInit {
  listProduct = new Collections.LinkedList<ProductEntity>();

  success: boolean = true;
  titleProduct = "Tạo sản phẩm  ";
  valid = true;
  query = '';
  imagePath = '';
  listCatalog = new Collections.LinkedList<CatalogEntity>();
  tempUpdate: ProductEntity[] = null;

  tempDetail: ProductEntity = null;

  constructor(private productEntityService: ProductEntityService, private  catalogService: CatalogEntityService) {
    super();
  }

  ngOnInit() {
    this.getProducts();
    this.getCatalog();
  }


  onSave(formData: NgForm, procductModal) {
    let value = formData.value;
    let product = new ProductEntity();
    if (this.imagePath != '') {
      product.imagePath = this.imagePath;
    } else {
      product.imagePath = value.imagePath;
    }
    product.amount = value.amount;
    let catalog = this.listCatalog.elementAtIndex(value.catalog);
    product.catalog = {id: catalog.id, name: catalog.name, code: catalog.code};
    product.name = value.name;
    product.description = value.description;
    product.discount = value.discount;
    product.price = value.price;

    console.log("product " + product);
    if (this.tempUpdate == null) {
      console.log(value);
      this.productEntityService.createProduct(product).subscribe((data: Response) => {
        if (data.status === 200) {
          this.updateMessge('Thêm thành công ', 'success');
          this.listProduct.add(product, 0);
          procductModal.hide();
          formData.reset();
        } else {
          this.updateMessge('Thêm không thành công vui lòng kiểm tra lại thông tin ', 'warning');
        }
      });
    }

    // if (value.name.trim() === "" || value.code.trim() === "") {
    //   this.valid = false;
    // }
    // let procut: ProductEntity = {
    //   id: 0,
    //   name: value.name.trim(),
    //   code: value.code.trim()
    // };
    // console.log(value);
    // this.procutEntityService.createCatalog(procut).subscribe((data: Response) => {
    //   if (data.status > 200) {
    //     this.success = false;
    //   } else {
    //     this.success = true;
    //     this.listCatalog.add(procut, 0);
    //     procutModal.hide();
    //     AdminUtil.alert(this.message, " Thêm thành công ", TIME_OUT);
    //   }
    // });
  }

  closeModal(procutModal: any) {
    this.success = true;
    procutModal.hide();
  }

  onSearch() {
    this.productEntityService.findBy(this.query).subscribe((data: ProductEntity[]) => {
      this.listProduct.clear();
      for (let item of data) {
        this.listProduct.add(item);
      }
    });
  }


  uploadImage($even) {
    var files = $even.target.files;
    var files = $even.target.files;
    var file = files[0];
    console.log(file.name);
    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    console.log("ok");
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    this.imagePath = "data:image/png;base64," + base64textString;
    console.log((this.imagePath));
  }

  private getCatalog() {
    this.catalogService.findAll().subscribe((data: CatalogEntity[]) => {
      for (let item of data) {
        this.listCatalog.add(item);
      }
    });
  }

  private getProducts() {
    this.productEntityService.findAll().subscribe((data: ProductEntity[]) => {
      for (let item of data) {
        this.listProduct.add(item);
      }
    });
  }

  openDetail(item: ProductEntity, productModalDetail: any) {
    this.tempDetail = item;
    productModalDetail.show();
  }

  onImageInputChange($event) {
    this.imagePath = $event;
    console.log($event);
  }
}
