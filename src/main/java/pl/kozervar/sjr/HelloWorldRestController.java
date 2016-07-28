package pl.kozervar.sjr;

import com.google.common.collect.ImmutableMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Created by kozervar on 2016-07-24.
 */
@RestController
public class HelloWorldRestController {

    @Autowired
    private CounterService service;

    @RequestMapping("/api/hello/{name}")
    public CounterService.Counter hello(@PathVariable("name") String name) {
        return service.getCounterObj(name);
    }
}
