package dev.eugenem.graphql.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.eugenem.model.Greeting;
import dev.eugenem.repository.GreetingRepository;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;

@Component
public class GreetingMutation implements GraphQLMutationResolver {

  @Autowired
  private GreetingRepository greetingRepository;

  public Greeting newGreeting(String message) {
    Greeting greeting = new Greeting();
    greeting.setMessage(message);

    return greetingRepository.save(greeting);
    
  }
}