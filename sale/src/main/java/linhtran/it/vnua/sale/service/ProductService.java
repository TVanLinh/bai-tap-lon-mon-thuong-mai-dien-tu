package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.Product;
import linhtran.it.vnua.sale.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

/**
 * Created by linhtran on 28/09/17.
 */

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Set<Product> findProductByCatalog(String catalogCode,
                                             int offset, int limit) {
        return this.productRepository.findProductByCatalog(catalogCode.toUpperCase(), offset, limit);
    }

    public Set<Product> findProductByCatalog(String catalogCode) {
        return this.productRepository.findProductByCatalog(catalogCode.toUpperCase());
    }

    public Set<Product> findProductSaleOff(int offset, int limit) {
        return this.productRepository.findProductSaleOff(offset, limit);
    }

    public Set<Product> findProduct(int offset, int limit) {
        return this.productRepository.findProduct(offset, limit);
    }

    public long getCount() {
        return this.productRepository.count();
    }


    public Product find(Long id) {
        return this.productRepository.findOne(id);
    }

    public Set<Product> findProductNew(int offset, int limit) {
        return this.productRepository.findProductNew(offset, limit);
    }

    public Set<Product> getProductSaleHight(int offset, int limit) {
        return  this.productRepository.getProductSaleHight(offset,limit);
    }
}
