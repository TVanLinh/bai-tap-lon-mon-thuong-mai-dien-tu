package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Set;

/**
 * Created by linhtran on 27/09/17.
 */

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {
    User getByUserName(String userName);

    User getUserByUserName(String userName);

    @Query(value = "select * from user,role where " +
            "user.username like  %:query% or" +
            " user.phone like %:query% or user.email like %:query% or role.name like %:query%", nativeQuery = true)
    Set<User> find(@Param(value = "query") String query);

    User findByEmail(String email);
}
