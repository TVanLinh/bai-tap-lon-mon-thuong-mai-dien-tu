package linhtran.it.vnua.sale.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * Created by linhtran on 04/11/17.
 */

@Configuration
@EnableResourceServer
@EnableWebSecurity

public class ResourceConfigureSecurity extends ResourceServerConfigurerAdapter {

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/customer", "/customer/**").permitAll()
                .antMatchers( "/admin/**","/users/change-pass","/users/**").authenticated()
                .antMatchers("/admin/product").hasRole("ADMIN");
    }


    @Autowired
    public void authenticationManager(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(customUserDetailService);
    }

}
