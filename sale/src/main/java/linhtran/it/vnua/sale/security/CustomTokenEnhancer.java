package linhtran.it.vnua.sale.security;

import linhtran.it.vnua.sale.entities.Role;
import linhtran.it.vnua.sale.entities.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by linhtran on 04/11/17.
 */


@Configuration
public class CustomTokenEnhancer implements TokenEnhancer {

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();
        Map<String, Object> hashMap = new HashMap<>();
        hashMap.put("userInfo", userDetail.getUser());
        hashMap.put("access_user", this.hashRole(userDetail.getUser(), "user"));
        hashMap.put("access_admin", this.hashRole(userDetail.getUser(), "admin"));
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(hashMap);
        return accessToken;
    }

    private boolean hashRole(User user, String role) {
        for (Role role1 : user.getRoles()) {
            if (role1.getName().equalsIgnoreCase(role)) {
                return true;
            }
        }
        return false;
    }
}
