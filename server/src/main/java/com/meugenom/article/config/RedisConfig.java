package com.meugenom.article.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericToStringSerializer;


import com.meugenom.article.queue.MessagePublisher;
import com.meugenom.article.queue.RedisMessagePublisher;
import com.meugenom.article.queue.RedisMessageSubscriber;

//https://www.baeldung.com/spring-data-redis-tutorial

@Configuration
@ComponentScan("com.meugenom.article")
@EnableRedisRepositories(basePackages = "com.meugenom.article.repository")
@PropertySource("classpath:application.properties")
public class RedisConfig {

    @Bean
JedisConnectionFactory jedisConnectionFactory() {
	RedisStandaloneConfiguration jedisConFactory = new RedisStandaloneConfiguration("localhost", 9001);    
    return new JedisConnectionFactory(jedisConFactory);
}

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        final RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<Object>(Object.class));
        return template;
    }

	
    @Bean
    MessageListenerAdapter messageListener() {
        return new MessageListenerAdapter(new RedisMessageSubscriber());
    }
	

    @Bean
    RedisMessageListenerContainer redisContainer() {
        final RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(jedisConnectionFactory());
        container.addMessageListener(messageListener(), topic());
        return container;
    }

    
	@Bean
    MessagePublisher redisPublisher() {
        return new RedisMessagePublisher(redisTemplate(), topic());
    }
	

    @Bean
    ChannelTopic topic() {
        return new ChannelTopic("pubsub:queue");
    }
	
}
