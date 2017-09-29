package linhtran.it.vnua.sale.service;


import linhtran.it.vnua.sale.entities.User;
import linhtran.it.vnua.sale.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by linhtran on 27/09/17.
 */

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(User user) {
        this.userRepository.save(user);
    }

    public User getByUserName(String userName) {
        return this.userRepository.getByUserName(userName);
    }

    public List<User> findALl() {
        return (List<User>) this.userRepository.findAll();
    }


    public User getUserByUserName(String userName) {
        return this.userRepository.getUserByUserName(userName);
    }

    public User findOne(Long id) {
        return this.userRepository.findOne(id);
    }

    public void delete(Long id) {
        this.userRepository.delete(id);
    }
}
