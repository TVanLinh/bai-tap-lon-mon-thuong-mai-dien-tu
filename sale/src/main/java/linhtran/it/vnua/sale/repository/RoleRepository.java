package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.Role;
import linhtran.it.vnua.sale.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 27/09/17.
 */

@Repository
@Transactional
public interface RoleRepository extends CrudRepository<Role, Long> {
    void deleteByUser(User user);

    void deleteRoleByUser(User user);

    @Query(value = "delete  from role where user_id =:user_id", nativeQuery = true)
     void deleteByIdUser(@Param(value = "user_id") long idUser);
}
