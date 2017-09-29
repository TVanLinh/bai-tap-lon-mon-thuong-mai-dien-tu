package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.Role;
import linhtran.it.vnua.sale.entities.User;

import java.util.HashSet;
import java.util.Set;

;

/**
 * Created by linhtran on 27/09/17.
 */
public class UserForm {

    private long id;
    private String userName;


    private String passWord;

    private String name;

    private boolean enable;

    private String phone;

    private String email;

    private Set<String> roles;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<Role> toRoleUser() {
        Set<Role> list = new HashSet<>();
        if (this.roles != null) {
            Role role;
            for (String str : this.roles) {
                role = new Role();
                role.setName(str);
                list.add(role);
            }
        }
        return list;
    }

    public User toUser() {
        User user = new User();
        user.setId(this.id);
        user.setEmail(email);
        user.setUserName(this.userName);
        user.setPhone(this.phone);
        user.setEnable(this.enable);
        user.setPassword(this.passWord);
        user.setRoles(this.toRoleUser());
        user.setName(this.name);
        return user;
    }
}
