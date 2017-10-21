package linhtran.it.vnua.sale.form;

/**
 * Created by linhtran on 22/10/17.
 */
public class OrderChangeInfoForm {
    private  long id;
    private  long idUser;
    private  int  status;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
