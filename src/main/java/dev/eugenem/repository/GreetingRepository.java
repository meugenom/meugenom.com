package dev.eugenem.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Component;

import dev.eugenem.model.Greeting;


@Component
public class GreetingRepository {

  private Map<String, Greeting> greetings;

  public GreetingRepository() {
    greetings = new HashMap<>();
  }

  public Greeting save(Greeting greeting) {
    String id = UUID.randomUUID().toString();

    greetings.put(id, greeting);
    greeting.setId(id);

    return greeting;
  }

  public Greeting find(String id) {    
    return greetings.get(id);
  }

}
