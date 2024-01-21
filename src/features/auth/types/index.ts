export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
};

export type UserResponse = {
  user: AuthUser;
};

export type LoginSignupResponse ={
   
      token:string
    
}