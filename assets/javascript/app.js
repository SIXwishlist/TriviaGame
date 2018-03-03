
var triviaGame = {

    questionBank : undefined,
    questionIndex: 0,
    currentQuestion : undefined,
    questionTime : 30,
    questionsAnswered : 0,
    wrongAnswers : 0,
    timeOuts : 0,
    
    startGame: function(questions) {
        this.questionBank = questions;
        this.questionIndex = 0;
        this.currentQuestion = this.questionBank[this.questionIndex];
        this.updateQuestion();
    },

    updateQuestion : function() {
        console.log("update question");
        $(".question").text(this.questionBank[this.questionIndex].question);

        for (let i = 0; i < this.currentQuestion.answers.length; i++) {
            $("#answer" + i).text(this.currentQuestion.answers[i]);
        }
    },

    checkAnswer : function(answerText) {
        
    }

}

var question = function(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

var questionOne = new question("Life, Universe, Everything", ["5", "10", "42", "15"], 2);
var questionArray = [questionOne];

$(document).ready(function() {
    triviaGame.startGame(questionArray);

    $(".answers").click(function(e) {
         triviaGame.checkAnswer($(this).text());
    });
});

