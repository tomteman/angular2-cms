
export interface IQuestion {
  questionText: string;
  realAnswer: RealAnswer;
  fakeAnswers: FakeAnswerArray;
  creatorId: string;
  state: QuestionState;
}

export interface ISeedQuestion {
  questionText: string;
  realAnswer: RealAnswer;
  fakeAnswers: Array<string>;
}

export interface FakeAnswerArray {
  text: string;
  selectedBy: Array<string>;
  createdBy: Array<string>;
}

export interface RealAnswer {
  text: string;
  selectedBy: Array<string>;
}

export enum QuestionState {
  Pending, ShowQuestion, ShowAnswers, RevealTheTruth, ScoreBoard, End
}