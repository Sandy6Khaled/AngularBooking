export type Payment = {
  userId: number;
  roomId: number;
  successUrl: string;
  cancelUrl: string;
  amount: number;
};
