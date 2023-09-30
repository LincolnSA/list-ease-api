export interface InputCreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface OuputCreateUserDto {
  id: string;
  name: string;
  email: string;
}

export interface InputFindByEmailDto {
  email: string;
}

export interface OutpuFindByEmailDto {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface InputFindByIdDto {
  id: string;
}

export interface OutputFindByIdDto {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}
