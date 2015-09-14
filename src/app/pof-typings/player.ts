export interface IPlayer {
  id: string;
  name: string;
  authType: AuthType;
  picture: string;
}

export enum AuthType {
  Facebook
}