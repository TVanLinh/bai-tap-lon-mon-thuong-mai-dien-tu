package linhtran.it.vnua.sale.controller;


import linhtran.it.vnua.sale.entities.Product;
import linhtran.it.vnua.sale.form.ProductForm;
import linhtran.it.vnua.sale.form.ProductFormUtil;
import linhtran.it.vnua.sale.response.ProductResponse;
import linhtran.it.vnua.sale.service.ProductService;
import linhtran.it.vnua.sale.util.Message;
import linhtran.it.vnua.sale.util.Page;
import linhtran.it.vnua.sale.util.PageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

/**
 * Created by linhtran on 20/07/17.
 */

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin("*")
    @GetMapping(value = "product")
    public ResponseEntity<ProductResponse> getProduct(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                      @RequestParam(value = "param", required = false, defaultValue = "") String catalog) {

        int limit = 12;
        int offset = (page - 1) * limit;
        int count;
        Set<Product> products;
        if (catalog.equals("") || catalog.equalsIgnoreCase("all")) {
            products = this.productService.findProduct(offset, limit);
            count = (int) this.productService.getCount();
        } else {
            products = this.productService.findProductByCatalog(catalog, offset, limit);
            count = this.productService.findProductByCatalog(catalog).size();
        }

        Page pageResult = PageUtils.getPage(count, page, 5, limit);
        pageResult.currentPage = page;


        return new ResponseEntity<ProductResponse>(new ProductResponse(pageResult, products), HttpStatus.OK);

    }

    @CrossOrigin("*")
    @GetMapping(value = "product/saleoff")
    public ResponseEntity<ProductResponse> getProductOff() {
        Set<Product> products = this.productService.findProductSaleOff(0, 4);

        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);

    }

    @CrossOrigin("*")
    @GetMapping(value = "product/different")
    public ResponseEntity<ProductResponse> getProductDifferent() {
        Set<Product> products = this.productService.findProduct(0, 8);
        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);

    }

    @CrossOrigin("*")
    @GetMapping(value = "product/{id}")
    public ResponseEntity<Product> findProduct(@PathVariable(value = "id") Long id) {
        Product product = this.productService.find(id);
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping(value = "product/productnew")
    public ResponseEntity<ProductResponse> getProductNew() {
        Set<Product> products = this.productService.findProductNew(0, 4);
        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "product/product-sale-hight")
    public ResponseEntity<ProductResponse> getProductSaleHight() {
        Set<Product> products = this.productService.getProductSaleHight(0, 8);
        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "product/search")
    public ResponseEntity<ProductResponse> search(@RequestParam(value = "page", defaultValue = "1") int page,
                                                  @RequestParam(value = "param") String query) {

        int limit = 12;
        int offset = (page - 1) * limit;
        int count;
        Set<Product> products;
        count = this.productService.findProduct(query).size();
        Page pageResult = PageUtils.getPage(count, page, 5, limit);
        pageResult.currentPage = page;
        products = this.productService.findProduct(query, offset, limit);
        return new ResponseEntity<ProductResponse>(new ProductResponse(pageResult, products), HttpStatus.OK);

    }


    @CrossOrigin("*")
    @GetMapping(value = "/admin/product")
    public ResponseEntity<Set<ProductForm>> getProductByAdmin() {
        return new ResponseEntity<Set<ProductForm>>(ProductFormUtil.getProductFormsFromProducts(this.productService.findAll()), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "/admin/product/search")
    public ResponseEntity<Set<ProductForm>> findProductByAdmin(@RequestParam(value = "param") String query) {
        return new ResponseEntity<Set<ProductForm>>(ProductFormUtil.getProductFormsFromProducts(this.productService.findProduct(query)), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @PostMapping(value = "/admin/product/create")
    public ResponseEntity<String> createProductByAdmin(@Valid @RequestBody ProductForm productForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }
        this.productService.save(productForm.toProduct());
        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }


}
