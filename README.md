# 9B-AdminProyectos-Nelida

## 📘 Descripción

**9B-AdminProyectos-Nelida** es un sistema desarrollado para apoyar a una empresa que organiza talleres, capacitaciones, seminarios y eventos sociales. Su principal objetivo es facilitar la planificación, visualización y comunicación de actividades mediante cronogramas personalizables e intuitivos.

El sistema está dividido en dos partes:  
- Un **front-end en React** para la gestión visual y experiencia de usuario.  
- Un **back-end en Spring Boot** para el manejo de lógica de negocio, seguridad y persistencia de datos.

---

## ⚙️ Requisitos previos

- Java JDK 17  
- MySQL 8.0+  
- Node.js 18+  
- NPM 9+  
- IDE recomendado: IntelliJ IDEA (para backend) y VSCode (para frontend)  
- Git instalado

---

## 🧰 Tecnologías usadas

### 🔙 Back-end
- Spring Boot  
- Lombok  
- JPA (Hibernate)  
- Spring Security  
- Maven

### 🔜 Front-end
- React  
- React Router  
- Tailwind CSS  
- Bootstrap  
- Axios

### 💾 Base de datos
- MySQL

---

## 🚀 Instrucciones de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/9B-AdminProyectos-Nelida.git
cd 9B-AdminProyectos-Nelida
```

### 2. Crear la base de datos

En tu servidor MySQL, crea una base de datos vacía llamada `cronogramas`. No es necesario crear tablas manualmente, ya que Spring Boot las generará automáticamente al iniciar.

```sql
CREATE DATABASE cronogramas;
```

Edita las credenciales en `src/main/resources/application.properties` del proyecto backend:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cronogramas
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
```

### 3. Ejecutar el back-end (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```
O desde IntelliJ

> Asegúrate de que el puerto configurado (por defecto 8080) esté libre.

### 4. Ejecutar el front-end (React)

```bash
cd frontend
npm install
npm run dev
```

> El frontend normalmente se ejecuta en `http://localhost:5173`

---

## 👥 Créditos

Este proyecto fue desarrollado de manera colaborativa por estudiantes como parte de un trabajo académico. La asignación de tareas fue flexible, permitiendo a todos los miembros participar tanto en el desarrollo backend como frontend.

---

## 📄 Licencia

Uso exclusivo para fines académicos.  
**No se permite su uso comercial sin la autorización explícita de los autores y/o colaboradores.**
