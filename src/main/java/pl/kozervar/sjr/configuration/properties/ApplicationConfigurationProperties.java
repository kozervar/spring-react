package pl.kozervar.sjr.configuration.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@ConfigurationProperties(prefix = "app")
@Data
public class ApplicationConfigurationProperties {
    private String resourcesDirectory = "";

    public String getWebResourcesDirectory(){
        String workingDirectory = System.getProperty("user.dir");
        return "file:///" + workingDirectory + "/" + resourcesDirectory + "/";
    }
}
