export interface IGame {
  id: Number;
  state: GameState;
  players: PlayersArray;
  questions: QuestionsArray;
  createdAt: any;
}

export interface PlayersArray {
  [index: number]: string;
}

export interface QuestionsArray {
  [index: number]: string;
}

export enum GameState { Registration, InProgress, GameOver }
