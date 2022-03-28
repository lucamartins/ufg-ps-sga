import { IAppContextState } from '../types';
import {
  SHOW_ALERT,
  CLEAR_ALERT,
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_ERROR,
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
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
  ADD_NEW_MODALITY_SUCCESS,
  ADD_NEW_MODALITY_ERROR,
  GET_MODALITIES_ERROR,
  GET_MODALITIES_SUCCESS,
  UPDATE_MODALITY_ERROR,
  UPDATE_MODALITY_SUCCESS,
  DELETE_MODALITY_SUCCESS,
  DELETE_MODALITY_ERROR,
} from './actions';

export const initialState: IAppContextState = {
  user: null,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: 'success',
  customers: [],
  modalities: [],
};

export const reducer = (state, action) => {
  if (action.type === OPERATION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.alertType,
      alertText: action.payload.alertText,
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
    };
  }

  if (action.type === GET_CUSTOMERS_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_CUSTOMERS_SUCCESS) {
    return { ...state, isLoading: false, customers: action.payload.customers };
  }

  if (action.type === CREATE_CUSTOMER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_CUSTOMERS_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.alertText, alertType: 'error', showAlert: true };
  }

  if (action.type === CREATE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customers: [...state.customers, action.payload.newCustomer],
      alertText: action.payload.alertText,
      alertType: 'success',
      showAlert: true,
    };
  }

  if (action.type === CREATE_CUSTOMER_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.alertText, alertType: 'error', showAlert: true };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    const { userId, userRole } = action.payload;

    return {
      ...state,
      isLoading: false,
      user: { userId, userRole },
      alertText: action.payload.alertText,
      alertType: 'success',
      showAlert: true,
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === LOGOUT_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGOUT_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'success',
      showAlert: true,
      user: null,
    };
  }

  if (action.type === LOGOUT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === VERIFY_AUTH_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === VERIFY_AUTH_SUCCESS) {
    return { ...state, isLoading: false, user: { userId: action.payload.userId, userRole: action.payload.userRole } };
  }

  if (action.type === VERIFY_AUTH_ERROR) {
    return { ...state, isLoading: false, user: null };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: { userId: action.payload.createdUser._id, userRole: action.payload.createdUser.__t },
      alertText: action.payload.alertText,
      alertType: 'success',
      showAlert: true,
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === ADD_NEW_MODALITY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertText: 'Modalidade criada',
      alertType: 'success',
      showAlert: true,
      modalities: [...state.modalities, action.payload.modality],
    };
  }

  if (action.type === ADD_NEW_MODALITY_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === GET_MODALITIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      modalities: [...action.payload.modalities],
    };
  }

  if (action.type === GET_MODALITIES_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === UPDATE_MODALITY_SUCCESS) {
    const newArr = state.modalities.filter((modality) => modality._id !== action.payload.modality._id);
    newArr.push(action.payload.modality);

    return {
      ...state,
      isLoading: false,
      modalities: [...newArr],
    };
  }

  if (action.type === UPDATE_MODALITY_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === DELETE_MODALITY_SUCCESS) {
    const newArr = state.modalities.filter((modality) => modality._id !== action.payload.id);

    return {
      ...state,
      isLoading: false,
      alertText: 'Modalidade excluída',
      alertType: 'success',
      showAlert: true,
      modalities: [...newArr],
    };
  }

  if (action.type === DELETE_MODALITY_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }
};
