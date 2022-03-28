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
} from './actions';

export const initialState: IAppContextState = {
  user: null,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: 'success',
  customers: [],
};

export const reducer = (state, action) => {
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
};
