package com.miweb.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DebugFlags {

    private static boolean debugMode;

    public DebugFlags(@Value("${debug:false}") boolean debug) {
        debugMode = debug;
    }

    public static boolean isDebugMode() {
        return debugMode;
    }

    public static void log(String mensaje) {
        if (debugMode) {
            System.out.println("DEBUG: " + mensaje);
        }
    }
}
