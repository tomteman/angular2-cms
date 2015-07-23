functions starting with * belong to the PRESENTER only



*createGame:
input: questionsGroupId
output: gameGuid (6 chars)

*registerToGameData: 
input: gameGuid
output: gameDataObject

joinGame:
input: 	gameGuid 
nickname (optional)
output: 200

registerToGameState:
input: gameGuid
output: gameStateObject

startGame:
input: gameGuid
output: 200

registerToQuestionObject:
input: 	gameGuid
		questionId
output: questionObject

answerQuestion:
input: {
	gameGuid,
	questionId,
	answerText
}
output:{
	200
}

selectAnswer:
input: {
	gameGuid,
	questionId,
	answerText
}
output: {
	200
}

gameDataObject
{
	"state": gameStateObject,
	"players": [playerObject],
	"questions": [questionObject]

}

questionObject
{
	"questionText": "bla bla",
	"answers": [
		{
			*"userIds": [],
			"state": WAITING/SUBMITTED/UNANSWERED,
			"text":	(if state < SHOW_ANSWERS, omit from response)
			*"selectedBy": [userId]
		}
	]
	*"realAnswer": {
		text: "bla bla",
		selectedBy: [userId]
	},
	"state": "SHOW_QUESTION/WAITING_FOR_ANSWERS/SHOW_ANSWERS/WAITING_FOR_SELECTIONS/SUMMARIZE/END"
}

playerObject 
{
	id: "",
	score: "",

}

gameStateObject:

REGISTRATION
{}

QUESTION 
{
	questionId
}

GAME_OVER




	

