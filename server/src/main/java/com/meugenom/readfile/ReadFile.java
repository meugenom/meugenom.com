package com.meugenom.readfile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;



public class ReadFile {

    
    public String textFromFile;

    public String read(String dir) throws IOException {

        String currentLine;         

        try (BufferedReader reader = new BufferedReader(new FileReader(dir))) {

            while ((currentLine = reader.readLine()) != null) {
                                
                //System.out.println(currentLine);                
                //textFromFile.add(currentLine);
                textFromFile = textFromFile + System.lineSeparator() + currentLine;
            }
            reader.close();        
            

        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return  textFromFile;
        
    }

    
}
