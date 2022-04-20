package com.meugenom.article.parser;

import java.util.regex.Pattern;

/**
 * @author meugenom
 * @param line string value shows some row from the text 
 * @param pattern was maded by regex rules to find matches in the @param line
 * @return boolean: true or false, if we have matches between @param pattern and @param line
 * * @see  Regex rules, Patterns
 * @since 0.1 beta
 */

public class CompilePattern {
    
    public boolean compile(String line, String pattern){
        boolean matches = Pattern.matches(pattern, line);
        return matches;    
    }

}
