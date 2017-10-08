package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.Product;
import org.springframework.core.annotation.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.OrderBy;
import javax.transaction.Transactional;
import java.util.Set;

/**
 * Created by linhtran on 28/09/17.
 */

@Repository
@Transactional
public interface ProductRepository extends CrudRepository<Product, Long> {

    @Query(value = "select  * from product where UCASE(catalog_code) =:catalogCode limit :offset,:limit", nativeQuery = true)
    Set<Product> findProductByCatalog(@Param(value = "catalogCode") String catalogCode,
                              @Param("offset") int offset, @Param(value = "limit") int limit);


    @Query(value = "select  * from product where UCASE(catalog_code) =:catalogCode", nativeQuery = true)
    Set<Product> findProductByCatalog(@Param(value = "catalogCode") String catalogCode);

    @Query(value = "select  * from product limit :offset,:limit", nativeQuery = true)
    Set<Product> findProduct(@Param("offset") int offset, @Param(value = "limit") int limit);

    @Query(value = "select  * from product limit :offset,:limit ",nativeQuery = true)
    @OrderBy(value = "discount desc ")
    Set<Product> findProductSaleOff(@Param("offset") int offset, @Param(value = "limit") int limit);

    @Query(value = "select  * from product limit :offset,:limit ",nativeQuery = true)
    @OrderBy(value = "create_date desc ")
    Set<Product> findProductNew(@Param("offset") int offset, @Param(value = "limit") int limit);

    @Query(value = "select  * from product limit :offset,:limit ",nativeQuery = true)
    @OrderBy(value = "amount asc ")
    Set<Product> getProductSaleHight(@Param("offset") int offset, @Param(value = "limit") int limit);


    @Query(value = "select  * from product, catalog WHERE product.name like %:query% OR catalog.name like %:query% limit :offset,:limit ",nativeQuery = true)
    Set<Product>  findProduct(@Param("query")String query,@Param("offset") int offset, @Param(value = "limit") int limit);

    @Query(value = "select  * from product, catalog WHERE product.name like %:query% OR catalog.name like %:query%",nativeQuery = true)
    Set<Product>  findProduct(@Param("query")String query);
}
