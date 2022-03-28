import React, { useEffect } from 'react';
import './sass/_global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Signup, Clientes, ClienteDetailed, Modalidades } from './pages';
import { Dashboard } from './layout';
import { ProtectedRoute } from './auth';
import { useAppContext } from './context';

const App = () => {
  const { verifyAuth } = useAppContext();

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />}>
            {/* Customer routes */}
            <Route path='meus-planos' element={<Clientes />} />
            <Route path='minhas-turmas' element={<Clientes />} />

            {/* Admins-only routes */}
            <Route path='clientes' element={<Clientes />} />
            <Route path='clientes/:userId' element={<ClienteDetailed />} />
            <Route path='modalidades' element={<Modalidades />} />
            {/* <Route path='agendamentos' element={<Agendamentos />}>
              <Route path='natacao' element={<h1>Pagina de agendamentos da natacao</h1>} />
              <Route path='musculacao' element={<h1>Pagina de agendamentos da musculacao</h1>} />
            </Route> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;