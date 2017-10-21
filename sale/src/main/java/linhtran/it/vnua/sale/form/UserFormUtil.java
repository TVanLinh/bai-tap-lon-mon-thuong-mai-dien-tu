package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.Role;
import linhtran.it.vnua.sale.entities.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by linhtran on 27/09/17.
 */
public class UserFormUtil {

    public static UserForm getUserFormFromUser(User user) {
        UserForm userForm = new UserForm();
        userForm.setId(user.getId());
        userForm.setEmail(user.getEmail());
        userForm.setPhone(user.getPhone());
        userForm.setEnable(user.isEnable());
        userForm.setPassWord(user.getPassword());
        userForm.setUserName(user.getUserName());
        Set<String> roles = new HashSet<>();
        for (Role role : user.getRoles()) {
            roles.add(role.getName());
        }
        userForm.setRoles(roles);
        userForm.setName(user.getName());
        return userForm;
    }


    public static List<UserForm> getUserFormsFromUsers(List<User> users) {
        List<UserForm> userForms = new ArrayList<>();
        for (User user : users) {
            userForms.add(UserFormUtil.getUserFormFromUser(user));
        }
        return userForms;
    }

    public static Set<UserForm> getUserFormsFromUsers(Set<User> users) {
        Set<UserForm> userForms = new HashSet<>();
        for (User user : users) {
            userForms.add(UserFormUtil.getUserFormFromUser(user));
        }
        return userForms;
    }

}
