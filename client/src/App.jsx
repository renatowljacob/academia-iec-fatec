import { useState, useEffect} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";

import HomePage from "./pages/homePage/homePage";
import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro/cadastro";
import Administrativo from "./pages/administrativo/administrativo";
import Cliente from "./pages/cliente/cliente"

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []);


  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/administrativo" element={<Administrativo />} />
          <Route path="/cliente" element={<Cliente />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
