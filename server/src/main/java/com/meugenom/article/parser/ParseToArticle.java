package com.meugenom.article.parser;

import com.meugenom.article.model.Article;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Parses markdown files containing YAML Frontmatter delimited by "---".
 */
public class ParseToArticle {

  private static final Logger logger = LoggerFactory.getLogger(
    ParseToArticle.class
  );
  private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern(
    "yyyy-MM-dd"
  );

  public Article parse(String text) {
    Article article = new Article();

    if (text == null || text.isBlank()) {
      article.setText("");
      return article;
    }

    // Set complete raw content for the article body
    article.setText(text);

    // Split text into lines to process Frontmatter
    String[] lines = text.split("\\r?\\n");
    int frontmatterSeparatorCount = 0;

    for (String line : lines) {
      String trimmedLine = line.trim();

      if ("---".equals(trimmedLine)) {
        frontmatterSeparatorCount++;
        if (frontmatterSeparatorCount == 2) {
          // Reached the end of YAML Frontmatter header
          break;
        }
        continue;
      }

      // Parse metadata key-value pairs between the first and second '---'
      if (frontmatterSeparatorCount == 1 && trimmedLine.contains(":")) {
        int colonIndex = trimmedLine.indexOf(':');
        String key = trimmedLine.substring(0, colonIndex).trim().toLowerCase();
        String value = trimmedLine.substring(colonIndex + 1).trim();

        // Strip surrounding single or double quotes from string value
        if (
          (value.startsWith("\"") && value.endsWith("\"")) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          if (value.length() >= 2) {
            value = value.substring(1, value.length() - 1);
          }
        }

        switch (key) {
          case "date":
            try {
              article.setDate(LocalDate.parse(value, DATE_FORMATTER));
            } catch (DateTimeParseException e) {
              logger.warn(
                "Failed to parse date '{}' in article frontmatter",
                value
              );
            }
            break;
          case "title":
            article.setTitle(value);
            break;
          case "template":
            article.setTemplate(value);
            break;
          case "thumbnail":
            article.setThumbnail(value);
            break;
          case "slug":
            article.setSlug(value);
            break;
          case "cluster":
            article.setCluster(value);
            break;
          case "order":
            article.setOrder(value);
            break;
          case "tags":
            article.setTags(value);
            break;
          default:
            // Ignore non-standard or custom properties
            break;
        }
      }
    }

    return article;
  }
}
