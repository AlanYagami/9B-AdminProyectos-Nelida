// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <div>
      <h1>Inicio ABOUT</h1>
      <button onClick={goToAbout}>Ir a About</button>
    </div>
  );
}

export default Home;
