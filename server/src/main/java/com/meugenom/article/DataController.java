package com.meugenom.article;

import java.io.FileReader;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
public class DataController {
    
	@RequestMapping(value = { "/getData" }, method = RequestMethod.GET, produces = "application/json")
    
    public @ResponseBody Object getData() throws Exception {

        JSONParser parser = new JSONParser(new FileReader("./src/main/resources/data/persons.json"));
		Object obj = parser.parse();
        
		return obj;
    }
}
