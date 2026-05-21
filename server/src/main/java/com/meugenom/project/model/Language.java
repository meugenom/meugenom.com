package com.meugenom.project.model;

import java.io.Serializable;

public class Language implements Serializable {

	private String name;

	public Language() { }

	public Language(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Language[name = " + name + "]";
	}
}
