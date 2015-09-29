export interface IQuestion {
    id: string;
    questionText: string;
    realAnswer: RealAnswer;
    fakeAnswers: Array<FakeAnswer>;
    creatorId: string;
    state: QuestionState;
    approved: boolean;
}

export interface ISeedQuestion {
    questionText: string;
    realAnswer: RealAnswer;
    fakeAnswers: Array<string>;
}

export interface FakeAnswer {
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