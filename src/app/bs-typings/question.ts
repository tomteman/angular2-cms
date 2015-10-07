export interface IQuestion {
    id: string;
    questionText: string;
    realAnswer: Answer;
    fakeAnswers: Array<Answer>;
    creatorId: string;
    state: QuestionState;
    approved: boolean;
}

export interface ISeedQuestion {
    questionText: string;
    realAnswer: Answer;
    fakeAnswers: Array<string>;
}

export interface Answer {
    text: string;
    selectedBy: Array<string>;
    createdBy: Array<string>;
    pointsBreakdown: Object;
}

export enum QuestionState {
    Pending, ShowQuestion, ShowAnswers, RevealTheTruth, ScoreBoard, End
}