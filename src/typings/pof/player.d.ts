declare module 'pof/player' {

  interface IPlayer {
    id: string;
    name: string;
    authType: AuthType;
  }

  enum AuthType {
    Facebook
  }

}