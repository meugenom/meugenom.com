package com.meugenom.readfile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


public class ReadFile {

    /**
     * Reads the complete content of a file into a String using UTF-8 encoding.
     * 
     * @param dir Path to the file
     * @return File content as String
     * @throws IOException If an I/O error occurs reading from the stream
     */
    
    public String read(String dir) throws IOException {
        return Files.readString(Path.of(dir));
    }
}
