package linhtran.it.vnua.sale.form;

import javax.validation.Valid;

/**
 * Created by linhtran on 29/09/17.
 */


public class CustomerLoginForm {
    private  String email;
    private  String passWord;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
}
