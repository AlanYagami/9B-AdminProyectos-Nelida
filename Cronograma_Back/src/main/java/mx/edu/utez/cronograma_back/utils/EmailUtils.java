package mx.edu.utez.cronograma_back.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailUtils {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String correo, String resetUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(correo);
        message.setSubject("Recuperación de Contraseña");
        message.setText("¡Hola!\n\n" +
                        "Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en SICALE. " +
                        "Si no solicitaste este cambio, puedes ignorar este correo.\n\n" +
                        "Para restablecer tu contraseña, por favor haz clic en el siguiente enlace:\n\n" +
                        resetUrl + "\n\n" +
                        "Este enlace es válido por 24 horas.\n\n" +
                        "¡Gracias por usar SICALE!\n\n" +
                        "Saludos,\n" +
                        "El equipo de SICALE");
        mailSender.send(message);
    }
}