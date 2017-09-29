package linhtran.it.vnua.sale.controller;


import org.springframework.web.bind.annotation.RestController;

/**
 * Created by linhtran on 20/07/17.
 */

@RestController
public class ProductController {
//
//    @Autowired
//    private ProductService productService;
//
//    @Autowired
//    private CatalogService catalogService;
//
//    @CrossOrigin("*")
//    @RequestMapping(name = "/product", method = RequestMethod.GET)
//    public ResponseEntity<ProductResponse> getProduct(@RequestParam(value = "page", required = false) String page) {
//
//
//
//        int currentPage = NumberUtils.toInt(page, 1);
//        Page  pageResult = PageService.getPage(this.productService.getCount(),currentPage,5,3);
//        pageResult.currentPage=currentPage;
//
//
//        QueryParam queryParam = new QueryParam();
//        queryParam.offset = (pageResult.currentPage-1)*3;
//        queryParam.limit = 3;
//
//        List<Product> products = this.productService.getProducts(queryParam);
//
//        return new ResponseEntity<ProductResponse>(new ProductResponse(pageResult,products), HttpStatus.OK);
//
//    }
}
