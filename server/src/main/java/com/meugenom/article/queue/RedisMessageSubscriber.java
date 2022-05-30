package com.meugenom.article.queue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//https://www.baeldung.com/spring-data-redis-tutorial

@Service
public class RedisMessageSubscriber implements MessageListener {

	private static final Logger logger = LoggerFactory.getLogger(RedisMessageSubscriber.class);
    
	public static List<String> messageList = new ArrayList<String>();

    public void onMessage(final Message message, final byte[] pattern) {
        messageList.add(message.toString());
		logger.error("Message received: {}", new String(message.getBody()));
    }
}