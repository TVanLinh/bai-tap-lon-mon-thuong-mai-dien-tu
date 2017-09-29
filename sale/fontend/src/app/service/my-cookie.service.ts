import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/core";
@Injectable()
export class MyCookieService<T> {
  constructor(private cookieService: CookieService) {
  }
  public static SHOP_LIST =  "SHOP_LIST";
  public static PRODUCT_ITEM = "PRODUCT_ITEM";

  public putObject(key: string, value: T): void {
    this.cookieService.putObject(key, value);
  }

  public getObject(key: string): T {
    return <T>this.cookieService.getObject(key);
  }

  public put(key: string, value: any) {
    this.cookieService.put(key, value);
  }

  public  get(key: string) {
    return this.cookieService.get(key);
  }

  public remove(key: string) {
    this.cookieService.remove(key);
  }

  public removeAll() {
    this.cookieService.removeAll();
  }
}
