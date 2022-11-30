package my.huda.tampal.config;

import lombok.Data;
import my.huda.tampal.service.TampalService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.protobuf.ProtobufJsonFormatHttpMessageConverter ;

@Data
@Configuration
public class ApiConfig {

    @Bean
    public ProtobufJsonFormatHttpMessageConverter  protobufHttpMessageConverter() {
        return new ProtobufJsonFormatHttpMessageConverter();
    }
    @Bean
    public TampalService tampalService() {
        return new TampalService();
    }

}