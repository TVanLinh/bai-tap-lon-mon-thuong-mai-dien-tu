package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.Catalog;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by linhtran on 14/10/17.
 */
public class CatalogFormUtil {
    public static CatalogForm getCatalogFromFromCatalog(Catalog catalog) {
        CatalogForm catalogForm = new CatalogForm();
        catalogForm.setId(catalog.getId());
        catalogForm.setCode(catalog.getCatalogCode());
        catalogForm.setName(catalog.getName());
        return catalogForm;
    }

    public static Set<CatalogForm> getCatalogsFromCatalogs(Set<Catalog> catalogs) {
        Set<CatalogForm> catalogForms = new HashSet<>();
        for (Catalog catalog : catalogs) {
            catalogForms.add(CatalogFormUtil.getCatalogFromFromCatalog(catalog));
        }
        return catalogForms;
    }
}
