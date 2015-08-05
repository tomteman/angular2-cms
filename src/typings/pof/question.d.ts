declare module 'pof/question' {
  interface IQuestion {
    questionText: string;
    realAnswer: RealAnswer;
    fakeAnswers: FakeAnswerArray;
    creatorId: string;
    state: QuestionState;
  }

  interface ISeedQuestion {
    questionText: string;
    realAnswer: RealAnswer;
    fakeAnswers: Array<string>;
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

  enum QuestionState {
    Pending, ShowQuestion, ShowAnswers, RevealTheTruth, End
  }
}