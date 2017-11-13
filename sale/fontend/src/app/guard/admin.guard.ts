import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../login/login.service";

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // console.log(route.url);
    if (this.loginService.getToken()) {
      // this.router.navigate(["/manager/entity"]);
      return true;
    }

    this.router.navigate(["/login"]);
    return false;


    //  return false;
  }
}
