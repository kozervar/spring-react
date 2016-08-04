package pl.kozervar.sjr;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import lombok.NonNull;
import org.springframework.context.ApplicationContext;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.*;
import java.util.List;

/**
 * Created by kozervar on 2016-07-24.
 */
public class React {

    private final NashornScriptEngine nashornScriptEngine;
    private ApplicationContext context;
    private String webResourcesDirectory;

    public React(@NonNull ApplicationContext context, @NonNull String webResourcesDirectory){
        this.context = context;
        this.webResourcesDirectory = webResourcesDirectory;
        nashornScriptEngine = initializeScriptEngine();
    }

    public  String render(Object ... params) {
        try {
            Object html = engineHolder.get().invokeFunction("__NASHORN__RENDER__", params);
//            Object html = nashornScriptEngine.invokeFunction("__NASHORN__RENDER__", params);
            return String.valueOf(html);
        }
        catch (Exception e) {
            throw new IllegalStateException("failed to render react component", e);
        }
    }

    private Reader read(String path) {
        InputStream inputStream = null;
        try {
            inputStream = context.getResource(path).getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new InputStreamReader(inputStream);
    }

    private NashornScriptEngine initializeScriptEngine(){
        NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
        try {
            nashornScriptEngine.eval(read(webResourcesDirectory + "nashorn-polyfill.js"));
            nashornScriptEngine.eval(read(webResourcesDirectory + "nashorn.js"));
            nashornScriptEngine.eval(read(webResourcesDirectory + "bundle.server.js"));
        } catch (ScriptException e) {
            throw new RuntimeException(e);
        }
        return nashornScriptEngine;
    }

    private ThreadLocal<NashornScriptEngine> engineHolder = new ThreadLocal<NashornScriptEngine>() {
        @Override
        protected NashornScriptEngine initialValue() {
            NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
            try {
                nashornScriptEngine.eval(read(webResourcesDirectory + "nashorn-polyfill.js"));
                nashornScriptEngine.eval(read(webResourcesDirectory + "nashorn.js"));
                nashornScriptEngine.eval(read(webResourcesDirectory + "bundle.server.js"));
            } catch (ScriptException e) {
                throw new RuntimeException(e);
            }
            return nashornScriptEngine;
        }
    };
}