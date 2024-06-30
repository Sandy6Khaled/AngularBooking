export type profile = {
  email: string;
  userName: string;
  image: string;
  city: string;
  street: string;
  postalCode: string;
  phoneNumber: string;
};
export type UpdateProfile = {
  UserId: number;
  Email: string;
  Image: any;
  City: string;
  Street: string;
  PostalCode: string;
  PhoneNumber: string;
};
