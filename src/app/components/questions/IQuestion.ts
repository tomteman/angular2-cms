export interface IQuestion {
  questionText: string;
  realAnswer: RealAnswer;
  fakeAnswers: FakeAnswerArray;
  creatorId: string;
  state: QuestionState;
}

interface FakeAnswerArray {
  text: string;
  selectedBy: Array<string>;
  createdBy: Array<string>;
}

interface RealAnswer {
  text: string;
  selectedBy: Array<string>; 
}

export enum QuestionState {
  Pending, ShowQuestion, ShowAnswers, RevealTheTruth, End
}