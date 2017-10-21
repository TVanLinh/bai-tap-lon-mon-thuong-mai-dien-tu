import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {CustomerService} from "../clients/shopping/customer/customer.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomerCanActivateService implements CanActivate {

  constructor(private customerService: CustomerService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   console.log("CustomerCanActivateService");
    if (this.customerService.isAcount()) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }


}
