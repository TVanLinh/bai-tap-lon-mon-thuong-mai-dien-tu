package linhtran.it.vnua.sale.entities;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by linhtran on 26/09/17.
 */

@Entity
@Table(name = "customer")
public class Customer extends AbstractEntity {

    @Basic
    @Column(name = "full_name")
    private  String fullName;
    @Basic
    @Column(name = "email")
    private  String email;
    @Basic
    @Column(name = "phone")
    private  String phone;
    @Basic
    @Column(name = "address")
    private  String address;
    @Basic
    @Column(name = "pass_word")
    private  String passWord;

//    @OneToMany(mappedBy = "customer",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
//    private Set<Order> orders;

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

//    public Set<Order> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(Set<Order> orders) {
//        this.orders = orders;
//    }
}
