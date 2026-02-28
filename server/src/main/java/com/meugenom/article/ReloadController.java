package com.meugenom.article;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST endpoint for manual article reload.
 * Usage: POST /api/reload
 * Call this after git pull to pick up changed .md files immediately.
 */
@RestController
@RequestMapping("/api")
public class ReloadController {

    private static final Logger logger = LoggerFactory.getLogger(ReloadController.class);

    @Autowired
    private RunApp runApp;

    @PostMapping("/reload")
    public String reload() {
        logger.info("Manual reload triggered via POST /api/reload");
        runApp.reloadArticles();
        return "{\"status\":\"ok\",\"message\":\"Articles reloaded\"}";
    }
}
