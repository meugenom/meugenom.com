package com.meugenom.project.model;

import java.io.Serializable;

public class Topic implements Serializable {

	private String name;

	public Topic() { }

	public Topic(String name) {
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
		return "Topic[name = " + name + "]";
	}
}
