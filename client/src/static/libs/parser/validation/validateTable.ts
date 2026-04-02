import { Grammar } from "../Grammar";
import { tableToken, tableBodyRowToken, tableHeadRowToken, tableCellToken } from "../Token";

export class ValidateTable {
    public static validate(token: tableToken): tableToken {         
        
        // Checking if all fields are present and correctly formatted                
        //if (!token.date.match(Grammar.BLOCKS.CAPTION_DATE)) token.date = "Invalid date format"; // Invalid date format, set to empty string
        //if (!token.thumbnail.match(Grammar.BLOCKS.CAPTION_THUMBNAIL)) token.thumbnail = "Invalid thumbnail format"; // Invalid thumbnail format, set to empty string
        //if (!token.slug.match(Grammar.BLOCKS.CAPTION_SLUG)) token.slug = "Invalid slug format"; // Invalid slug format, set to empty string
        //if (!token.cluster.match(Grammar.BLOCKS.CAPTION_CLUSTER)) token.cluster = "Invalid cluster format"; // Invalid cluster format, set to empty string

        return token;   
    }
}