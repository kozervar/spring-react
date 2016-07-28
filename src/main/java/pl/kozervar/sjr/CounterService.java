
package pl.kozervar.sjr;

import com.google.common.collect.ImmutableMap;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class CounterService {

    private AtomicLong counter = new AtomicLong();

    public String getCounter(){
        return Long.toString(counter.getAndIncrement());
    }

    public Counter getCounterObj(String name) {
        return new Counter
        (
                name,
                getCounter(),
                OffsetDateTime.now().toString()
        );
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Counter implements Serializable{
        private String name;
        private String counter;
        private String timestamp;
    }
}
