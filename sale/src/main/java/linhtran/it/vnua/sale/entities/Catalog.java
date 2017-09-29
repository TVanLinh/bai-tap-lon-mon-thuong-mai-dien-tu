package linhtran.it.vnua.sale.entities;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "catalog")
public class Catalog  extends AbstractEntity  implements Serializable {

  @Basic
  @Column(name = "code")
  private String catalogCode;

  @Basic
  @Column(name = "name")
  private String name;



  public String getCatalogCode() {
    return catalogCode;
  }

  public void setCatalogCode(String catalogCode) {
    this.catalogCode = catalogCode;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
