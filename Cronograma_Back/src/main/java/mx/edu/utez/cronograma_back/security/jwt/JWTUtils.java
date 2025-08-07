package mx.edu.utez.cronograma_back.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTUtils {
    @Value("${secret.key}")
    private String secretKey;

    //Esta funcion ayuda a extraer todas las propiedades del token
    //Es decir, el cuerpo del token
    //Vamos a descencriptar el token, y lo que necesitamos es nuestra palabra secreta
    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    //Esta funcion nos ayuda a poder extrar las propiedades del token
    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        //jalar todas las propiedades, es el cuerpo
        final Claims CLAIMS = extractClaims(token);
        return claimsResolver.apply(CLAIMS);
    }

    //EST funcion extraer el nombre del usuario del token
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    //Esta funcion extrae la fecha de expiracion
    public Date extractExpirationDate(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    //esta funcion nos va a poder ayudar a validar si el token esta expirado
    public Boolean isTokenExpired(String token) {
        return extractExpirationDate(token).before(new Date());
    } //solo la clase la va a conocer

    //Esta funcion consume la funcion de arriba, tambien verifica que coincida el ususario con el token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String USERNAME = extractUsername(token);
        return USERNAME.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    //Esta fucnion nos ayuda a generar un nuevo token  "setIssuedAt() decimos cuando se creo el token"
    // 1000, son milissegundos, luego lo * 60 para que sea un minuto y leugo por 60 para que sea una hora y luego 10 para
    // que sean 10 horas, esto lo podemos cambiar
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder() //aqui decimos que construimos un token
                .setClaims(claims).setSubject(subject) //Aqui la info del usuario
                .setIssuedAt(new Date(System.currentTimeMillis())) //Aqui cuando se creo el token
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 10)) //Cunato va a durar
                .signWith(SignatureAlgorithm.HS256, secretKey) //Aqui lo firmamos
                .compact(); //Terminamos de comptar el token
    }

    // Esta funcion consume la funcion de crar solo para retornar
    public String generateToken(UserDetails userDetails,Integer id, String nombre) {
        Map<String, Object> claims = new HashMap<>();
        String rol = userDetails.getAuthorities().stream()
                .findFirst()
                .map(auth -> auth.getAuthority())
                .orElse("ROLE_USER");
        claims.put("rol", rol);
        claims.put("id", id);
        claims.put("nombre", nombre);

        return createToken(claims, userDetails.getUsername());
    }

    //Con esto terminamos de armar el jwtutils

}
