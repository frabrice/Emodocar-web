interface Email {
  value: string;
  status: boolean;
}

interface User {
  userType: string;
  status: string;
  firstName: string;
  lastName: string;
  id: string;
  email: Email;
  phone?: string;
}

export interface LoginResponseType {
  token: string;
  message: string;
  user: User;
}
