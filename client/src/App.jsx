import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// rotas primordiais 
import Login from "./pages/login/login";
import Administrativo from "./pages/Administrativo/administrativo";
import Cliente from "./pages/Cliente/cliente"

// rotas do cliente 
import AcomProgresso from "./components/Cliente/acompanharProgresso";
import AgendaAula from "./components/Cliente/agendarAula";
import ConsHorario from "./components/Cliente/consultaHorario";
import Pagamento from "./components/Cliente/pagamento";
import TreinoPerso from "./components/Cliente/treinoPersonalizado";

// rotas administrativo
import CadCliente from "./components/Administrativo/cadastrarCliente"
import CadTreino from "./components/Administrativo/cadastrarTreinos"
import ControlePresenca from "./components/Administrativo/controlePresenca"
import GestaoPlano from "./components/Administrativo/gestaoPlanos"


function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* rotas primordiais */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* rotas a partir do cliente */}
          <Route path="/cliente" element={<Cliente />}>
            <Route path="progresso" element={<AcomProgresso />} />
            <Route path="agenda" element={<AgendaAula />} />
            <Route path="horario" element={<ConsHorario />} />
            <Route path="pagamento" element={<Pagamento />} />
            <Route path="treinos" element={<TreinoPerso />} />
          </Route>

          {/* rotas a partir do administrativo */}
          <Route path="/administrativo" element={<Administrativo />}>
            <Route path="cadastrar-cliente" element={<CadCliente />} />
            <Route path="cadastrar-treino" element={<CadTreino />} />
            <Route path="controle-presenca" element={<ControlePresenca />} />
            <Route path="gestao-planos" element={<GestaoPlano />} />
          </Route>


        </Routes>
      </Router>

    </>
  )
}

export default App
