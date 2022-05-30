package com.meugenom.article.queue;

public interface MessagePublisher {

    void publish(final String message);
}