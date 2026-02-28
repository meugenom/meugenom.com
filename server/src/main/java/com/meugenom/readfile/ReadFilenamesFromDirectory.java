package com.meugenom.readfile;

import java.io.File;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ReadFilenamesFromDirectory {
    /**
     * this method was copied from https://www.baeldung.com/java-list-directory-files
     * @param dir (path from the root of project)
     * @return sorted set of files in current directory (TreeSet guarantees stable order)
     */
    public Set<String> listFilesUsingJavaIO(String dir) {
        return Stream.of(new File(dir).listFiles())
          .filter(file -> !file.isDirectory())
          .map(File::getName)
          .collect(Collectors.toCollection(TreeSet::new));
    }
    
}
