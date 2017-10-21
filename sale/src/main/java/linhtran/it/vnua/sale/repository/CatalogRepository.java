package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.Catalog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Set;

/**
 * Created by linhtran on 28/09/17.
 */

@Repository
@Transactional
public interface CatalogRepository extends CrudRepository<Catalog, Long> {
    Catalog findCatalogByCatalogCode(String code);

    @Query(value = "select * from catalog where code like %:query% or name like %:query% ", nativeQuery = true)
    Set<Catalog> find(@Param(value = "query") String query);
}
