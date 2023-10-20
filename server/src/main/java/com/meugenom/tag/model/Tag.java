package com.meugenom.tag.model;

import java.io.Serializable;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("Tag")
public class Tag implements Serializable {

	private String name;

	private String slug;

	public Tag() { }

	public Tag(String name, String slug) {
		this.name = name;
		this.slug = slug;
	}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }


	@Override
	public String toString() {
		return " Tag[name = " + name + ", slug = " + slug + "]";
	}

}
