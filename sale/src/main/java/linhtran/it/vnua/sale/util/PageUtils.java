package linhtran.it.vnua.sale.util;

/**
 * Created by linhtran on 20/07/17.
 */
public class PageUtils {


    public static Page getPage(int totalRecord, int pageCurrent, int pagNum,int numberRecordView) {

        Page page = new Page();
        int numLink = pagNum/2;
        int totalPage = totalRecord % numberRecordView == 0 ? totalRecord / numberRecordView : totalRecord / numberRecordView + 1;
        page.totalPage = totalPage;
        if (pageCurrent >= pagNum) {
            page.start = pageCurrent - numLink;
            if (totalPage > pageCurrent + numLink) {
                page.end = pageCurrent + numLink;
            } else if (pageCurrent <= totalPage && pageCurrent > totalPage - (pagNum - 1)) {
                page.start = totalPage - (pagNum - 1);
                page.end = totalPage;
            } else {
                page.end = totalPage;
            }
        } else {
            page.start = 1;
            if (totalPage > pagNum)
                page.end = pagNum;
            else
                page.end = totalPage;
        }
        return  page;
    }
}
