package com.meugenom.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.beans.factory.annotation.Value;

@Configuration("projectRedisConfig") // Eindeutiger Name für diese Konfigurationsklasse
@EnableRedisRepositories(
    basePackages = "com.meugenom.project.repository",
    redisTemplateRef = "projectRedisTemplate" // Verweist direkt auf das untere Bean
)
public class ProjectRedisConfig {

    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.port}")
    private int redisPort;

    @Bean("projectJedisConnectionFactory")
    public JedisConnectionFactory jedisConnectionFactory() {
        // Verbindungsdaten für den Projekt-Cache (Port 9001)
        RedisStandaloneConfiguration jedisConFactory = new RedisStandaloneConfiguration(redisHost, redisPort);    
        return new JedisConnectionFactory(jedisConFactory);
    }

    @Bean("projectRedisTemplate")
    public RedisTemplate<String, Object> projectRedisTemplate() {
        final RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<Object>(Object.class));
        return template;
    }   
}