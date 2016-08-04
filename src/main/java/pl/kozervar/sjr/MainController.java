package pl.kozervar.sjr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import pl.kozervar.sjr.configuration.properties.ApplicationConfigurationProperties;

import javax.annotation.PostConstruct;
import java.util.Map;

/**
 * Created by kozervar on 2016-07-24.
 */
@Controller
public class MainController {

    @Autowired
    private ApplicationContext context;
    @Autowired
    private ApplicationConfigurationProperties appProps;
    private React react;

    @Autowired
    private CounterService service;

    @PostConstruct
    public void initialize(){
        this.react = new React(context, appProps.getWebResourcesDirectory());
    }

    @RequestMapping("/")
    public ModelAndView index(Map<String, Object> model) throws Exception {
        String rendered = react.render(service.getCounterObj("Server"));
        model.put("content", rendered);
        return new ModelAndView("index", model);
    }

}
