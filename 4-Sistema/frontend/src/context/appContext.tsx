import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { API_URL } from '../config/variables';
import { IAppContext, IAppContextFunctions } from '../types';
import {
  CLEAR_ALERT,
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_ERROR,
  CREATE_CUSTOMER_SUCCESS,
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_ERROR,
  GET_CUSTOMERS_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SHOW_ALERT,
  VERIFY_AUTH_BEGIN,
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_ERROR,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  OPERATION_BEGIN,
  ADD_NEW_MODALITY_ERROR,
  ADD_NEW_MODALITY_SUCCESS,
  GET_MODALITIES_ERROR,
  GET_MODALITIES_SUCCESS,
  UPDATE_MODALITY_ERROR,
  UPDATE_MODALITY_SUCCESS,
} from './actions';
import { initialState, reducer } from './reducerAndState';

const AppContext = React.createContext<IAppContext>({} as IAppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(err);
    }
  );

  // Auto adjust a timer every time an alert is displayed to clear it
  useEffect(() => {
    setTimeout(() => {
      if (state.showAlert) dispatch({ type: CLEAR_ALERT });
    }, 4000);
  }, [state.showAlert]);

  const displayAlert = (alertText, alertType) => {
    dispatch({ type: SHOW_ALERT, payload: { alertText, alertType } });
  };

  const clearAlertNoDelay = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  const createCustomer = async (userData: { name: string; email: string; phoneNumber: string }): Promise<void> => {
    dispatch({ type: CREATE_CUSTOMER_BEGIN });

    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/customers',
        data: { ...userData },
      });

      dispatch({ type: CREATE_CUSTOMER_SUCCESS, payload: { newCustomer: res.data.customer, alertText: 'Novo cliente criado!' } });
    } catch (err) {
      dispatch({ type: CREATE_CUSTOMER_ERROR, payload: { alertText: 'Falha ao criar cliente' } });
      throw new Error(err.response.data.message);
    }
  };

  const getCustomers = async () => {
    dispatch({ type: GET_CUSTOMERS_BEGIN });

    try {
      const res = await axiosInstance({
        method: 'get',
        url: 'customers',
      });

      setTimeout(() => {
        dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: res.data });
      }, 500);
    } catch (err) {
      console.error(err.response);
      dispatch({ type: GET_CUSTOMERS_ERROR, payload: { alertText: 'Falha ao obter clientes' } });
    }
  };

  const loginUser = async ({ email, password }) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      const { userId, userRole } = res.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { userId, userRole, alertText: 'Usuário logado com sucesso!' } });
    } catch (err) {
      const alertText = err.response.data?.message || 'Tente novamente mais tarde. Estamos passando por problemas no servidor :(';
      dispatch({ type: LOGIN_USER_ERROR, payload: { alertText } });
      throw new Error(err);
    }
  };

  const verifyAuth = async () => {
    dispatch({ type: VERIFY_AUTH_BEGIN });

    try {
      const res = await axiosInstance.get('/auth');
      const { userId, userRole } = res.data;
      console.log(userId, userRole);
      dispatch({ type: VERIFY_AUTH_SUCCESS, payload: { userId, userRole } });
    } catch (err) {
      dispatch({ type: VERIFY_AUTH_ERROR });
    }
  };

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER_BEGIN });

    try {
      await axiosInstance.delete('/auth/logout');
      dispatch({ type: LOGOUT_USER_SUCCESS, payload: { alertText: 'Usuário deslogado do sistema' } });
    } catch (err) {
      const alertText = err.response.data?.message || 'Tente novamente mais tarde. Estamos passando por problemas no servidor :(';
      dispatch({ type: LOGOUT_USER_ERROR, payload: { alertText } });
      throw new Error(err);
    }
  };

  const registerUser = async (user: { name: string; email: string; password: string }) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const createdUser = await axiosInstance.post('/customers', user);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { createdUser, alertText: 'Usuário criado com sucesso' } });
      await loginUser({ email: user.email, password: user.password });
    } catch (err) {
      console.error(err);
      dispatch({ type: REGISTER_USER_ERROR, payload: { alertText: err.response.data.message } });
      throw new Error('err.message');
    }
  };

  const addModality = async (newModality: { name: string; active: boolean }) => {
    dispatch({ type: OPERATION_BEGIN });

    try {
      const res = await axiosInstance.post('/modalities', newModality);
      const { modality } = res.data;
      dispatch({ type: ADD_NEW_MODALITY_SUCCESS, payload: { modality } });
    } catch (err) {
      const errMsg = err.response?.data.message || 'Não foi possível criar modalidade';
      dispatch({ type: ADD_NEW_MODALITY_ERROR, payload: { alertText: errMsg } });
    }
  };

  const getModalities = async () => {
    dispatch({ type: OPERATION_BEGIN });

    try {
      const res = await axiosInstance.get('/modalities');
      const { modalities } = res.data;
      dispatch({ type: GET_MODALITIES_SUCCESS, payload: { modalities } });
    } catch (err) {
      const errMsg = err.response?.data.message || 'Não foi possível obter modalidades';
      dispatch({ type: GET_MODALITIES_ERROR, payload: { alertText: errMsg } });
    }
  };

  const updateModality = async (newModality: { name: string; active: boolean }, id: string) => {
    dispatch({ type: OPERATION_BEGIN });

    try {
      const res = await axiosInstance.patch(`/modalities/${id}`, newModality);
      const { modality } = res.data;
      dispatch({ type: UPDATE_MODALITY_SUCCESS, payload: { modality } });
    } catch (err) {
      const errMsg = err.response?.data.message || 'Não foi possível editar modalidade';
      dispatch({ type: UPDATE_MODALITY_ERROR, payload: { alertText: errMsg } });
    }
  };

  const publicFunctions: IAppContextFunctions = {
    displayAlert,
    clearAlertNoDelay,
    createCustomer,
    getCustomers,
    loginUser,
    verifyAuth,
    logoutUser,
    registerUser,
    addModality,
    getModalities,
    updateModality,
  };

  return <AppContext.Provider value={{ ...state, ...publicFunctions }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
