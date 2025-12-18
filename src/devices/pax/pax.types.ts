export interface PaxAuthRequest {
  amount: number;
  transactionId: string;
}

export interface PaxAuthResponse {
  approved: boolean;
  authorizedAmount: number;
  rrn?: string;
  cardType?: string;
}
