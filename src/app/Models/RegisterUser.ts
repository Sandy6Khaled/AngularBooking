export type RegisterUser = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  postalCode: string;
  phoneNumber: string;
};

export type OwnerRegister={
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  City: string;
  Street: string;
  PostalCode: string;
  PhoneNumber: string;
  Certificate:any;
}