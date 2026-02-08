import { Request } from 'express';

export interface AuthTokenPayload {
  id: string;
  email: string;
}

export interface RequestWithCookies extends Request {
  cookies: {
    refreshToken?: string;
  };
}
