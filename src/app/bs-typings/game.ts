import {IQuestion} from 'question';
import {IPlayer} from 'player'

export interface IGame {
  name: string;
  state: GameState;
  players: Array<IPlayer>;
  questions: Questions;
  createdAt: any;
  currentTime?: Date;
  numberOfQuestions: number;
  answerQuestionTime: number;
  selectAnswerTime: number;
}


export interface Questions {
  [index: string]: IQuestion;
}

export enum GameState { Registration, InProgress, GameOver }
