import {Subject} from "rxjs/Subject";
import {Product} from "../../../model/product.model";
import {Page} from "../../../model/page.model";
export class SearchService {
  private search: Subject<{ products: Product[], page: Page }> = new Subject<{ products: Product[], page: Page }>();

  searchLister = this.search.asObservable();

  publishSearch(result: { products: Product[], page: Page }) {
    this.search.next(result);
  }
}
