import React, { useEffect } from 'react';
import './sass/_global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Signup, Clientes, ClienteDetailed, Modalidades, Planos, CustomerPlans, CustomerContracts } from './pages';
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
            <Route path='alunos/planos' element={<CustomerPlans />} />
            <Route path='alunos/contratos' element={<CustomerContracts />} />
            {/* <Route path='alunos/turmas' element={<Clientes />} /> */}

            {/* Admins-only routes */}
            <Route path='clientes' element={<Clientes />} />
            <Route path='clientes/:userId' element={<ClienteDetailed />} />
            <Route path='modalidades' element={<Modalidades />} />
            <Route path='planos' element={<Planos />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
