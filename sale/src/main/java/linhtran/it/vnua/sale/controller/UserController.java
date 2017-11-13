package linhtran.it.vnua.sale.controller;


import linhtran.it.vnua.sale.entities.User;
import linhtran.it.vnua.sale.form.UserChangePassForm;
import linhtran.it.vnua.sale.form.UserForm;
import linhtran.it.vnua.sale.form.UserFormUtil;
import linhtran.it.vnua.sale.service.OrderService;
import linhtran.it.vnua.sale.service.RoleService;
import linhtran.it.vnua.sale.service.UserService;
import linhtran.it.vnua.sale.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Set;

/**
 * Created by linhtran on 27/09/17.
 */

@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private OrderService orderService;

    @CrossOrigin("*")
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@Valid @RequestBody UserForm userForm, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<String>(bindingResult.getAllErrors().toString(), HttpStatus.BAD_REQUEST);
        }
        if ((this.userService.getByUserName(userForm.getUserName()) != null)) {
            return new ResponseEntity<String>(userForm.getUserName() + " exist already", HttpStatus.ALREADY_REPORTED);
        }

        if ((this.userService.getByUserName(userForm.getEmail()) != null)) {
            return new ResponseEntity<String>(userForm.getEmail() + " exist already", HttpStatus.ALREADY_REPORTED);
        }

        User user = userForm.toUser();
        this.userService.save(user);
        return new ResponseEntity<String>(this.userService.getUserByUserName(user.getUserName()).getId() + "", HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/users")
    public ResponseEntity<List<UserForm>> getALl() {
        return new ResponseEntity<List<UserForm>>(UserFormUtil.getUserFormsFromUsers(this.userService.findALl()), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @PutMapping("/users")
    public ResponseEntity<String> updateUser(@Valid @RequestBody UserForm userForm, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
        }
        User userTemp;
        if (((userTemp = this.userService.findOne(userForm.getId())) == null)) {
            return new ResponseEntity<String>("user not exist", HttpStatus.BAD_REQUEST);
        }


        if (userTemp.getRoles() != null) {
            userTemp.getRoles().clear();
        }

        User user = userForm.toUser();
        userTemp.getRoles().addAll(user.getRoles());
        userTemp.setUserName(user.getUserName());
        userTemp.setEmail(user.getEmail());
        userTemp.setName(user.getName());
        userTemp.setPassword(user.getPassword());
        userTemp.setPhone(user.getPhone());
        this.userService.save(userTemp);

        return new ResponseEntity<String>("OK", HttpStatus.OK);
    }

    @CrossOrigin("*")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(Principal principal, @PathVariable(value = "id") long id) {
        User user = this.userService.findOne(id);
        if (user.getUserName().equals(principal.getName())) {
            return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
        }

        if (this.orderService.findByUser(user).size() > 0) {
            return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
        }

        this.userService.delete(id);
        return new ResponseEntity<String>("OK", HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping("/users/search")
    public ResponseEntity<Set<UserForm>> deleteUser(@RequestParam(value = "query") String query) {

        return new ResponseEntity<Set<UserForm>>(UserFormUtil.getUserFormsFromUsers(this.userService.find(query)), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @PutMapping("/users/change-pass")
    public ResponseEntity<String> changPass(Principal principal, @RequestBody UserChangePassForm userChangePassForm) {
        User user = this.userService.getByUserName(principal.getName());
        if (!user.getPassword().equals(userChangePassForm.getPassWord())) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }
        user.setPassword(userChangePassForm.getPassWord());
        this.userService.save(user);
        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }
}
