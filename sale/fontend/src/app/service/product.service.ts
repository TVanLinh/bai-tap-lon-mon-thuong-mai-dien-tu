import {Subject} from "rxjs/Subject";
import {Product} from "../model/product.model";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductService {
  private list: Product[] = [];
  subjectList = new Subject<Product[]>();
  subjectItem = new Subject<Product>();
  subject =  new Subject();
  getProducts() {
    this.list =[];
    const pro = new Product();
    pro.price = 45000;
    pro.imagePath = "../../../../assets/images/nuoc-hoa/chanel-no-5-edp-300x400.jpg";
    pro.name = "Nước hoa Chanel Bleu De Chanel EDT pour homme";
    pro.description = "Nước hoa Chanel Bleu De Chanel EDT pour homme là một" +
      " hương thật năng động, sảng khoái mang một chút ảnh hưởng của dòng nước hoa Chanel " +
      "Allure pour Homme truyền thống qua sự phảng phất của hương thơm đầy nữ tính. Loại nước" +
      " thơm này sẽ sẵn sàng đánh thức các giác quan của bạn, cho bạn một cảm giác thật sự tươi " +
      "trẻ, tràn đầy sức sống và lạc quan hơn bao giờ hết nhưng chỉ như một màn sương nhẹ nhàng," +
      " thoang thoảng bao quanh bạn chứ không hề tạo cảm giác khó chịu bởi cảm giác mùi hương quá đậm đặc. " +
      "Rất thích hợp với những bạn có khướu giác quá nhạy cảm.";
    pro.discount = 0.5;
    pro.id = 2;
    pro.amount = 10;
    this.list.push(pro);
    this.list.push(pro);
    this.list.push(pro);
    this.list.push(pro);
    this.list.push(pro);
    return this.list;
  }

  setProducts(list: Product[]) {
    this.list = list;
  }

  setProduct(index: number, product: Product) {
    this.list[index] = product;
  }

  getProduct(index: number) {
    return this.list[index];
  }

  getProductById(id: number): Product{
    for (let item of this.list) {
        if (item.id == id){
          return item;
        }
    }
    return null;
  }

  getMoney(product: Product):number{
    return product.price - product.price*product.discount;
  }
}
