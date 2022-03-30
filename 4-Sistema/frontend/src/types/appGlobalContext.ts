import { ICustomer, IPlan, IModality } from './';

export interface IAppContextState {
  userAuth: { id: string; role: string } | null;
  user: { _id: string; __t: string; name: string; email: string; phoneNumber?: string } | null;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: 'success' | 'error';
  customers: ICustomer[];
  modalities: IModality[];
  plans: IPlan[];
}

export interface IAppContextFunctions {
  displayAlert: (alertText: string, alertType: 'success' | 'error') => void;
  clearAlertNoDelay: () => void;
  getCustomers: () => Promise<void>;
  loginUser: ({ email, password }: { email: string; password: string }) => Promise<void>;
  verifyAuth: () => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (user) => Promise<void>;
  addModality: (modality: { name: string; active: boolean }) => Promise<void>;
  getModalities: () => Promise<void>;
  updateModality: (newModality: { name: string; active: boolean }, id: string) => Promise<void>;
  deleteModality: (id: string) => Promise<void>;
  addPlan: (newPlan: IPlan) => Promise<void>;
  getPlans: () => Promise<void>;
  updatePlan: (newPlan: IPlan) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
  getUser: (id: string) => Promise<void>;
  updateUser: (user: ICustomer) => Promise<void>;
}

export interface IAppContext extends IAppContextState, IAppContextFunctions {}
