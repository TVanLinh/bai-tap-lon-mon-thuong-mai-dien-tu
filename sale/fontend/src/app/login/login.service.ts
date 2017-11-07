import {Http, RequestOptions, RequestOptionsArgs, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/core";
import {UserEntityModel} from "../admin/entities/user-entity/user.model";

@Injectable()
export class LoginService {
  constructor(private _router: Router, private _http: Http, private  cookieService: CookieService) {
  }

  login(loginData) {
    let params = new URLSearchParams();
    params.append('username', loginData.userName);
    params.append('password', loginData.passWord);
    params.append('grant_type', 'password');
    params.append('client_id', 'CLIENT_ID');
    let headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa("CLIENT_ID:CLIENT_SECRET")
    });

    let options: RequestOptionsArgs;
    options = {headers: headers};
    this._http.post('http://localhost:8080/oauth/token', params.toString(), options)
      .map(res => res.json())
      .subscribe(data => {

          this.saveUser(data['userInfo']);
          this.saveToken(data['access_token']);
          this.cookieService.put("admin", data['access_admin']);
          this.cookieService.put("user", data['access_user']);

        },
        err => alert('Invalid Credentials'));
  }


  private saveUser(info) {
    let expireDate = new Date().getTime() + (1000 * info.expires_in);
    this.cookieService.put("userInfo", JSON.stringify(info));
    this._router.navigate(['/manager/entity']);
  }

  private saveToken(token) {
    this.cookieService.put("token", token);
  }

  getToken() {
    return this.cookieService.get("token");
  }

  getUserInfo() {
    return this.cookieService.get("userInfo");
  }

  isAdmin(): boolean {
    return this.cookieService.get("admin") === 'true';
  }

  isUser() {
    return this.cookieService.get("user");
  }
}
