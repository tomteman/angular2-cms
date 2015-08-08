export interface IPlayer {
  id: string;
  name: string;
  authType: AuthType;
}

export enum AuthType {
  Facebook
}