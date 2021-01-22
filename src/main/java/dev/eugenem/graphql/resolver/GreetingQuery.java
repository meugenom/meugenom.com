package dev.eugenem.graphql.resolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.eugenem.model.Greeting;
import dev.eugenem.repository.GreetingRepository;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

@Component
public class GreetingQuery implements GraphQLQueryResolver {

  @Autowired
  private GreetingRepository greetingRepository;

  public Greeting getGreeting(String id) {    
    return greetingRepository.find(id);
  }
}
