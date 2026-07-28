package com.meugenom.article.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.beans.factory.annotation.Value;

@Configuration("articleRedisConfig") // Eindeutiger Name für die Artikel-Konfiguration
@EnableRedisRepositories(
    basePackages = "com.meugenom.article.repository",
    redisTemplateRef = "articleRedisTemplate"
)
public class ArticleRedisConfig {

    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.port}")
    private int redisPort;

    @Bean("articleJedisConnectionFactory")
    public JedisConnectionFactory jedisConnectionFactory() {
        RedisStandaloneConfiguration jedisConFactory = new RedisStandaloneConfiguration(redisHost, redisPort);    
        return new JedisConnectionFactory(jedisConFactory);
    }

    @Bean("articleRedisTemplate")
    public RedisTemplate<String, Object> articleRedisTemplate() {
        final RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<Object>(Object.class));
        return template;
    }   
}