import { ICustomer } from './users';

export interface IAppContextState {
  user: { userId: string; userRole: string } | null;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: 'success' | 'error';
  customers: ICustomer[];
}

export interface IAppContextFunctions {
  displayAlert: (alertText: string, alertType: 'success' | 'error') => void;
  clearAlertNoDelay: () => void;
  createCustomer: (userData: { name: string; email: string; phoneNumber: string }) => Promise<void>;
  getCustomers: () => Promise<void>;
  loginUser: ({ email, password }: { email: string; password: string }) => Promise<void>;
  verifyAuth: () => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (user) => Promise<void>;
}

export interface IAppContext extends IAppContextState, IAppContextFunctions {}
