import { Document } from 'mongoose';

export interface Usuario extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string;
  readonly phone: string;
}