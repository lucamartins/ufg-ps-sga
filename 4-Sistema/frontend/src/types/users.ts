export interface IConsumerFiliate {
  _id: string;
  name: string;
  birthday: Date;
}

export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  memberships: string[];
  stripeId: string;
  filiates: IConsumerFiliate[];
}
