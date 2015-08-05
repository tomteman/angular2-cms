declare module "pof/game" {

  interface IGame {
    id: Number;
    state: GameState;
    players: PlayersArray;
    questions: QuestionsArray;
    createdAt: any;
  }

  interface PlayersArray {
    [index: number]: string;
  }

  interface QuestionsArray {
    [index: number]: string;
  }
  
  enum GameState { Registration, InProgress, GameOver }

}