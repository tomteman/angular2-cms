export interface IPlayer {
  id: string;
  name: string;
  authType: AuthType;
  picture: string;
  accessToken: string;
}

export enum AuthType {
  Facebook
}