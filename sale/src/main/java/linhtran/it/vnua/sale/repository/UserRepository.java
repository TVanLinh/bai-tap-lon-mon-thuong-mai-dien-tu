package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 27/09/17.
 */

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {
    User getByUserName(String userName);

    User getUserByUserName(String userName);
}
