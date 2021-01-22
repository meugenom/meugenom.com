package dev.eugenem.article.parser;


import java.util.regex.Pattern;

public class CompilePattern {
    
    public boolean compile(String line, String pattern){
        boolean matches = Pattern.matches(pattern, line);
        return matches;    
    }

}
