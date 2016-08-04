
package pl.kozervar.sjr.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import pl.kozervar.sjr.configuration.properties.ApplicationConfigurationProperties;

import javax.annotation.Resource;


@Configuration
@EnableWebMvc
@ComponentScan
public class WebMvcConfiguration extends WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter {

    @Autowired
    private ApplicationConfigurationProperties appProps;

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        String workingDirectory = System.getProperty("user.dir");
        registry.addResourceHandler("/webresources/**")
                .addResourceLocations(appProps.getWebResourcesDirectory());
    }

}
