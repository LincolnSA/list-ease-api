export interface InputAuthDto {
  email: string;
  password: string;
}

export interface OutpuAuthDto {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export interface PayloadDto {
  sub: string;
}
