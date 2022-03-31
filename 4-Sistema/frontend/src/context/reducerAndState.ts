import { IAppContextState } from '../types';
import actions from './actions';

export const initialState: IAppContextState = {
  userAuth: null,
  user: null,
  customerMemberships: [],
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: 'success',
  customers: [],
  modalities: [],
  plans: [],
  classGroups: [],
};

export const reducer = (state, action) => {
  // Gerais

  if (action.type === actions.OPERATION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === actions.SHOW_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.alertType,
      alertText: action.payload.alertText,
    };
  }

  if (action.type === actions.CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
    };
  }

  // Clientes

  if (action.type === actions.GET_CUSTOMERS_SUCCESS) {
    return { ...state, isLoading: false, customers: action.payload.customers };
  }

  if (action.type === actions.GET_CUSTOMERS_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.alertText, alertType: 'error', showAlert: true };
  }

  if (action.type === actions.REGISTER_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: { userId: action.payload.createdUser._id, userRole: action.payload.createdUser.__t },
      alertText: action.payload.alertText,
      alertType: 'success',
      showAlert: true,
    };
  }

  if (action.type === actions.REGISTER_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  // Autenticacao

  if (action.type === actions.LOGIN_USER_SUCCESS) {
    const { userAuth } = action.payload;

    return {
      ...state,
      isLoading: false,
      userAuth,
      alertText: action.payload.alertText,
      alertType: 'success',
      showAlert: true,
    };
  }

  if (action.type === actions.LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.LOGOUT_USER_SUCCESS) {
    return {
      ...initialState,
      alertText: action.payload.alertText,
      showAlert: true,
    };
  }

  if (action.type === actions.LOGOUT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.VERIFY_AUTH_SUCCESS) {
    const { userAuth } = action.payload;

    return { ...state, isLoading: false, userAuth };
  }

  if (action.type === actions.VERIFY_AUTH_ERROR) {
    return { ...state, isLoading: false, user: null };
  }

  // Modalidades

  if (action.type === actions.ADD_NEW_MODALITY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertText: 'Modalidade criada',
      alertType: 'success',
      showAlert: true,
      modalities: [...state.modalities, action.payload.modality],
    };
  }

  if (action.type === actions.ADD_NEW_MODALITY_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.GET_MODALITIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      modalities: [...action.payload.modalities],
    };
  }

  if (action.type === actions.GET_MODALITIES_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.UPDATE_MODALITY_SUCCESS) {
    const newArr = state.modalities.filter((modality) => modality._id !== action.payload.modality._id);
    newArr.push(action.payload.modality);

    return {
      ...state,
      isLoading: false,
      modalities: [...newArr],
    };
  }

  if (action.type === actions.UPDATE_MODALITY_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.DELETE_MODALITY_SUCCESS) {
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

  if (action.type === actions.DELETE_MODALITY_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  // Planos

  if (action.type === actions.ADD_NEW_PLAN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertText: 'Plano criado',
      alertType: 'success',
      showAlert: true,
      plans: [...state.plans, action.payload.plan],
    };
  }

  if (action.type === actions.ADD_NEW_PLAN_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.GET_PLANS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      plans: [...action.payload.plans],
    };
  }

  if (action.type === actions.GET_PLANS_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.UPDATE_PLAN_SUCCESS) {
    let newArr = [...state.plans];

    for (let i = 0; i < state.plans.length; i++) {
      if (state.plans[i]._id === action.payload.plan._id) {
        newArr[i] = action.payload.plan;
      }
    }

    // const newArr = state.plans.filter((plan) => plan._id !== action.payload.plan._id);
    // newArr.push(action.payload.plan);

    return {
      ...state,
      isLoading: false,
      alertText: 'Plano atualizado',
      alertType: 'success',
      showAlert: true,
      plans: [...newArr],
    };
  }

  if (action.type === actions.UPDATE_PLAN_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.DELETE_PLAN_SUCCESS) {
    const newArr = state.plans.filter((plan) => plan._id !== action.payload.id);

    return {
      ...state,
      isLoading: false,
      alertText: 'Plano excluído',
      alertType: 'success',
      showAlert: true,
      plans: [...newArr],
    };
  }

  if (action.type === actions.DELETE_PLAN_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.alertText,
      alertType: 'error',
      showAlert: true,
    };
  }

  // Users

  if (action.type === actions.GET_USER_SUCCESS) {
    const { user } = action.payload;

    return {
      ...state,
      isLoading: false,
      user: user,
    };
  }

  if (action.type === actions.GET_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: 'Falha ao obter usuário',
      alertType: 'error',
      showAlert: true,
    };
  }

  if (action.type === actions.UPDATE_USER_SUCCESS) {
    const { newUserData } = action.payload;

    return {
      ...state,
      user: newUserData,
      alertText: 'Usuário atualizado',
      alertType: 'success',
      showAlert: true,
      isLoading: false,
    };
  }

  if (action.type === actions.UPDATE_USER_ERROR) {
    return {
      ...state,
      alertText: 'Falha ao editar dados',
      alertType: 'error',
      showAlert: true,
      isLoading: false,
    };
  }

  // Memberships

  if (action.type === actions.GET_CUSTOMER_MEMBERSHIPS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customerMemberships: [...action.payload.memberships],
    };
  }

  if (action.type === actions.GET_CUSTOMER_MEMBERSHIPS_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: 'Falha ao obter dados do usuário',
      alertType: 'error',
      showAlert: true,
      customerMemberships: [],
    };
  }

  if (action.type === actions.CREATE_CUSTOMER_MEMBERSHIP_SUCCESS) {
    return {
      ...state,
      alertText: 'Contrato criado',
      alertType: 'success',
      showAlert: true,
      customerMemberships: [...state.customerMemberships, action.payload.membership],
      isLoading: false,
    };
  }

  if (action.type === actions.CREATE_CUSTOMER_MEMBERSHIP_ERROR) {
    return {
      ...state,
      alertText: 'Falha na criação de contrato',
      alertType: 'error',
      showAlert: true,
      isLoading: false,
    };
  }

  // Class Groups

  if (action.type === actions.GET_CLASS_GROUPS_SUCCESS) {
    const { classGroups } = action.payload;

    return {
      ...state,
      classGroups: [...classGroups],
      isLoading: false,
    };
  }

  if (action.type === actions.GET_CLASS_GROUPS_ERROR) {
    return {
      ...state,
      alertText: 'Falha ao obter turmas',
      alertType: 'error',
      showAlert: true,
      isLoading: false,
      classGroups: [],
    };
  }

  if (action.type === actions.CREATE_CLASS_GROUP_SUCCESS) {
    const { classGroup } = action.payload;

    return {
      ...state,
      classGroups: [...state.classGroups, classGroup],
      alertText: 'Turma criada',
      alertType: 'success',
      showAlert: true,
      isLoading: false,
    };
  }

  if (action.type === actions.CREATE_CLASS_GROUP_ERROR) {
    return {
      ...state,
      alertText: 'Falha ao criar turma',
      alertType: 'error',
      showAlert: true,
      isLoading: false,
    };
  }
};
