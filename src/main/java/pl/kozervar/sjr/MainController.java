package pl.kozervar.sjr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

/**
 * Created by kozervar on 2016-07-24.
 */
@Controller
public class MainController {

    private final React react;

    public MainController(){
        this.react = new React();
    }

    @Autowired
    private CounterService service;

    @RequestMapping("/")
    public ModelAndView index(Map<String, Object> model) throws Exception {
        String rendered = react.render(service.getCounterObj("Server"));
        model.put("content", rendered);
        return new ModelAndView("index", model);
    }

}
