import { Request } from 'express';

export interface AuthTokenPayload {
  id: string;
  email: string;
}
