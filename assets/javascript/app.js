(function triviaGame() {
    var questionBank = undefined;
    var questionIndex = 0;
    var currentQuestion = undefined;
    var questionTime = 30;
    var questionsAnswered = 0;
    var wrongAnswers = 0;
    var timeOuts = 0;
    var timer;

    var startGame = function () {
        questionBank = questionArray;
        questionIndex = 0;
        questionsAnswered = 0;
        wrongAnswers = 0;
        timeOuts = 0;
        currentQuestion = questionBank[questionIndex];
        updateQuestion();
        timer = setInterval(gameInterval, 1000);
    };

    var updateQuestion = function () {
        currentQuestion = questionBank[questionIndex];
        questionTime = 30;

        $(".question").text(questionBank[questionIndex].question);
        console.log(currentQuestion.answers);

        for (var i = 0; i < currentQuestion.answers.length; i++) {
            console.log(i);
            $("#answer" + i).text(currentQuestion.answers[i]);
        }
    };

    var checkAnswer = function () {

        if ($(this).text() == currentQuestion.answers[currentQuestion.correctAnswer]) {
            $(".question").text("Correct!");
            questionsAnswered++;
            questionIndex++;
            checkEnd();
        } else {
            $(".question").text("Incorrect!");
            wrongAnswers++;
            questionIndex++;
            checkEnd();
        }
    };

    var checkEnd = function () {
        if (questionIndex < questionBank.length) {
            console.log(questionIndex);
            updateQuestion();
        } else {
            clearInterval(timer);
            alert("Game over!");
            $(".question").empty();
            $(".question").append($("<p> Questions answered correctly: " + questionsAnswered + "</p>"));
            $(".question").append($("<p> Questions answered incorrectly: " + wrongAnswers + "</p>"));
            $(".question").append($("<p> Questions not answered in time: " + timeOuts + "</p>"));
            setTimeout(startGame, 10000);
        }
    };

    var question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    };

    var gameInterval = function () {
        questionTime--;
        $(".time").text("Time Remaining: " + questionTime);


        if (questionTime <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            timeOuts++;
            questionIndex++;
            if (questionIndex >= questionBank.length) {
                checkEnd();
            } else {
                questionTime = 30;
                timer = setInterval(gameInterval, 1000);
                updateQuestion();
            }

        }

    }

    var questionOne = new question("Life, Universe, Everything", ["5", "10", "42", "15"], 2);
    var questionTwo = new question("best waifu", ["Tifa", "Caulifla", "2B", "None, all waifus are trash"], 3);
    var questionArray = [questionOne, questionTwo];

    $(document).ready(function () {
        startGame();

        $(document).on("click", ".answers", checkAnswer);
    });
})();

