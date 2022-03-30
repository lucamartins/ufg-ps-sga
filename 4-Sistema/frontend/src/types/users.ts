export interface ICustomer {
  _id?: string;
  __t?: string;
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface IUserAuth {
  id: string;
  role: string;
}
