package linhtran.it.vnua.sale.util;

import java.security.SecureRandom;
import java.util.Random;

/**
 * Created by linhtran on 29/09/17.
 */
public class StringUtils {
    private static final Random RANDOM = new SecureRandom();
    /** Length of password. @see #generateRandomPassword() */
    public static final int PASSWORD_LENGTH = 8;
    /**
     * Generate a random String suitable for use as a temporary password.
     *
     * @return String suitable for use as a temporary password
     * @since 2.4
     */
    public static String generateRandomPassword()
    {
        // Pick from some letters that won't be easily mistaken for each
        // other. So, for example, omit o O and 0, 1 l and L.
        String letters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789+@";

        String pw = "";
        for (int i=0; i<PASSWORD_LENGTH; i++)
        {
            int index = (int)(RANDOM.nextDouble()*letters.length());
            pw += letters.substring(index, index+1);
        }
        return pw;
    }
}
