package linhtran.it.vnua.sale.form;

/**
 * Created by linhtran on 07/11/17.
 */
public class StatisticForm {
    private String nameProduct;
    private int amount;
    private double totalMoney;

    public StatisticForm() {
    }

    public StatisticForm(String nameProduct, int amount, double totalMoney) {
        this.nameProduct = nameProduct;
        this.amount = amount;
        this.totalMoney = totalMoney;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(double totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Override
    public String toString() {
        return "StatisticForm{" +
                "nameProduct='" + nameProduct + '\'' +
                ", amount=" + amount +
                ", totalMoney=" + totalMoney +
                '}';
    }
}
