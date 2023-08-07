export interface createUserPayload {
  firstName: string;
  lastName?: string;
  profileImageUrl?: string;
  email: string;
  password: string;
}

export type UserId = string;

export interface updateUserPayload {
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  email: string;
  password: string;
}

export interface userSignInPayload{
  email:string;
  password:string;
}
