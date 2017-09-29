package linhtran.it.vnua.sale.util;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

/**
 * Created by linhtran on 28/09/17.
 */
public class Message {
    public static String OK = "OK";
    public static String EXIST_ALREADY = "đã tồn tại";
    public static String NOT_VALID = "không đúng";
    public static String PASS_NOT_RIGHT = "mật khẩu không đúng";
    public static String NOT_EXIST = "không tồn tại ";
    public static String PASS_WORD_NOT_OVERLAP = "mật khẩu không trùng nhau ";

    public static  String getError(BindingResult bindingResult) {
        StringBuilder stringBuilder = new StringBuilder();
        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                stringBuilder.append(error.getDefaultMessage()).append(", ");
            }
        }
        stringBuilder.replace(stringBuilder.length()-2,stringBuilder.length()-1,"");
        return stringBuilder.toString();
    }
}
