package my.huda.tampal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class CoreApplication
{
    public static void main(String[] args)
    {
        ConfigurableApplicationContext servers = SpringApplication.run(CoreApplication.class, args);
        System.out.println("HTTP running on port: " + servers.getEnvironment().getProperty("local.server.port"));
        System.out.println("gRPC running on port: " + servers.getEnvironment().getProperty("grpc.port"));
    }
}
