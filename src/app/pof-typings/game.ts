import {IQuestion} from 'question';

export interface IGame {
  name: string;
  state: GameState;
  players: PlayersArray;
  questions: Questions;
  createdAt: any;
}

export interface PlayersArray {
  [index: number]: string;
}

export interface Questions {
  [index: string]: IQuestion;
}

export enum GameState { Registration, InProgress, GameOver }
