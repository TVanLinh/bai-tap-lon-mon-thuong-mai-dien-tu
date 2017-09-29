package linhtran.it.vnua.sale.entities;

import javax.persistence.*;

/**
 * Created by linhtran on 20/07/17.
 */

@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
