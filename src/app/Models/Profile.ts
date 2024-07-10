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
  userId: number;
  email: string;
  image: any;
  city: string;
  street: string;
  postalCode: string;
  phoneNumber: string;
};
