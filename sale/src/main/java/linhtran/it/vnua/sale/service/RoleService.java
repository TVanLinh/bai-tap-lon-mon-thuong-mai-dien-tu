package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.User;
import linhtran.it.vnua.sale.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 27/09/17.
 */

@Service
@Transactional
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public void deleteByUser(User user) {
        this.roleRepository.deleteByUser(user);
    }

    public void deleteRoleByUser(User user) {
        this.roleRepository.deleteRoleByUser(user);
    }

    public void deleteByIdUser(long id) {
        this.roleRepository.deleteByIdUser(id);
    }

}
