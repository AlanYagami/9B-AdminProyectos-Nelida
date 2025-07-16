package mx.edu.utez.cronograma_back.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

//Esta clase me la robe de cocker
@Configuration
public class DBConnection {
    @Value("${db.url}")
    private String DB_URL;

    @Value("${db.username}")
    private String DB_USERNAME;

    @Value("${db.password}")
    private String DB_PASSWORD;


    @Bean
    public DataSource getConnection(){
        try {
            DriverManagerDataSource configuration = new DriverManagerDataSource();
            configuration.setUrl(DB_URL);
            configuration.setUsername(DB_USERNAME);
            configuration.setPassword(DB_PASSWORD);

            configuration.setDriverClassName("com.mysql.cj.jdbc.Driver");

            return configuration;
        } catch (Exception e) {
            // Manejo de excepciones
            System.out.println("Error al establecer la conexión a la base de datos: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}

