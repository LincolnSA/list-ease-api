export interface InputFindByIdItemDto{
  id: string;
}

export interface OutputFindByIdItemDto{
  id: string;
  name: string;
  amount: string;
  checked:boolean;
  amount_type: "und" | "l" | "kg";
  category:  "Padaria" | "Legume" | "Carne" | "Fruta" | "Bebida" ;
  created_at: Date;
  user_id: string;
}

export interface InputCreateItemDto{
  name: string;
  amount: string;
  amountType: "und" | "l" | "kg";
  category:  "Padaria" | "Legume" | "Carne" | "Fruta" | "Bebida" ;
  userId: string;
}

export interface OutputCreateItemDto{
  id: string;
  name: string;
  amount: string;
  checked:boolean;
  amount_type: "und" | "l" | "kg";
  category:  "Padaria" | "Legume" | "Carne" | "Fruta" | "Bebida" ;
  created_at: Date;
  user_id: string;
}

export interface InputDeleteItemDto{
  id: string;
  userId: string;
}

export interface InputListItemDto{
  userId: string;
}

export interface OutputListItemDto{
  id: string;
  name: string;
  amount: string;
  checked:boolean;
  amount_type: "und" | "l" | "kg";
  category:  "Padaria" | "Legume" | "Carne" | "Fruta" | "Bebida" ;
  created_at: Date;
  user_id: string;
}

export interface InputUpdateItemDto{
  id: string;
  userId: string;
  name: string;
  amount: string;
  checked:boolean;
  amountType: "und" | "l" | "kg";
  category:  "Padaria" | "Legume" | "Carne" | "Fruta" | "Bebida" ;
}

export interface OutputUpdateItemDto{
  id: string;
  name: string;
  amount: string;
  checked: boolean;
  amount_type: "und" | "l" | "kg";
  category:  "Padaria" | "Legume" | "Carne" | "Fruta" | "Bebida" ;
  created_at: Date;
  user_id: string;
}