package mx.edu.utez.cronograma_back.modules.auth.dto;

public class LoginRequestDTO {

    private String correo;
    private String contra;

    // Constructor vacío


    public LoginRequestDTO() {
    }

    public LoginRequestDTO(String correo, String contra) {
        this.correo = correo;
        this.contra = contra;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContra() {
        return contra;
    }

    public void setContra(String contra) {
        this.contra = contra;
    }
}
