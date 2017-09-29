package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.Customer;

import javax.validation.constraints.NotNull;

/**
 * Created by linhtran on 28/09/17.
 */
public class CustomerRegisterForm {

    @NotNull(message = "tên không được để trống ")
    private String fullName;

    @NotNull(message = "email không được  để trống ")
    private String email;

    @NotNull(message = "Số điện thoại không được để trống ")
    private String phone;

    @NotNull(message = "Địa chỉ  không được để trống ")
    private String address;

    @NotNull(message = "Mật khẩu không được để trống ")
    private String passWord;

    private String rePassWord;


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getRePassWord() {
        return rePassWord;
    }

    public void setRePassWord(String rePassWord) {
        this.rePassWord = rePassWord;
    }

    public Customer toCustomer() {
        Customer customer = new Customer();
        customer.setFullName(this.fullName);
        customer.setAddress(this.address);
        customer.setEmail(this.email);
        customer.setPassWord(this.passWord);
        customer.setPhone(this.phone);
        return customer;
    }
}
