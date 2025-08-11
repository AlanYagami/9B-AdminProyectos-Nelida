package mx.edu.utez.cronograma_back.security.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mx.edu.utez.cronograma_back.security.jwt.JWTUtils;
import mx.edu.utez.cronograma_back.security.jwt.UDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//Este filtro se va a ejecutar por cada solicitud
// QUINTO PASO: CREAR UN FILTRO DE SEGURIDAD PARA VERIFICAR LOS TOKENS

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private UDService udService; //este nos va a servir para armar nuestro pasaporte

    @Autowired
    private JWTUtils jwtUtils; //Este nos va ayudar a manipular el token

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        //Este if nos va a ayudar a extraer el token del encabezado Authorization si inicia con "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
            username = jwtUtils.extractUsername(token);
        }

    /*Este if verifica que se haya extraído correctamente el username del JWT y que el contexto de seguridad
    esté en condiciones de autenticar, cargando los datos del usuario con udServices.loadUserByUsername(username)
    solo si hay un username válido y aún no hay autenticación, permitiendo así establecer la autenticación en el
    contexto de Spring Security con la información del JWT.*/
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = udService.loadUserByUsername(username);

            // Verifica que el JWT sea válido antes de crear la autenticación del usuario en Spring Security.
            if (jwtUtils.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                // Asigna detalles de la solicitud actual a la autenticación (IP, sesión, etc.)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Establece la autenticación en el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Siempre continuar con la cadena de filtros, con o sin autenticación
        filterChain.doFilter(request, response);
    }
}
