type UserRegisterRequestDto = {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?:string | null;
}

export { type UserRegisterRequestDto};