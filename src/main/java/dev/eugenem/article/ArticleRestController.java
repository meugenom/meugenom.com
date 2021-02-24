package dev.eugenem.article;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * without this don't work variable sub-routes for react spring application
 */

@Controller
public class ArticleRestController {

    @RequestMapping(value = { "/", "/article/{id}", "/about", "/articles", "/projects", "/error404" })

    public String index() {
        return "index.html";
    }

    
}
