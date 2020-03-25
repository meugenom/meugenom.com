package com.eugenem.blog;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author eugenem
 */

@Controller
public class HomeController {

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
	
}
