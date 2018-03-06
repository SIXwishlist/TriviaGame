(function triviaGame() {

    var questionBank = undefined; //holds the trivia questions as an array of question objects
    var questionIndex = 0; //tracks current question from array
    var currentQuestion = undefined; //container for the question being asked
    var questionTime = 30; //timer for question being asked, reset to 30 each time
    var questionsAnswered = 0; //tracks correctly guessed questions
    var wrongAnswers = 0; //tracks questions answered wrongly
    var timeOuts = 0; //tracks questions not answered before timer end
    var timer; //holds interval defined later

    //resets game state to default, restarts interval
    var startGame = function () {
        questionIndex = 0;
        questionsAnswered = 0;
        wrongAnswers = 0;
        timeOuts = 0;
        currentQuestion = questionBank[questionIndex];
        updateQuestion();
        timer = setInterval(gameInterval, 1000);
    };

    //updates HTML with text of current questions and fills p tags with the answer attributes of each question
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

    //checks text of clicked paragraph against text of answer array at the correct index
    var checkAnswer = function () {

        if ($(this).text() == currentQuestion.answers[currentQuestion.correctAnswer]) {
            $(".question").text("Correct!");
            questionsAnswered++;
            questionIndex++;
            setTimeout(checkEnd, 3000);
        } else {
            $(".question").text("Incorrect! The correct answer was: " + currentQuestion.answers[currentQuestion.correctAnswer]);
            wrongAnswers++;
            questionIndex++;
            setTimeout(checkEnd, 3000);
        }
    };

    //compares number of questions done versus length question bank
    var checkEnd = function () {
        if (questionIndex < questionBank.length) { //goes to next question
            console.log(questionIndex);
            updateQuestion();
        } else {
            clearInterval(timer); //ends game and then restarts after 10 seconds
            alert("Game over!");
            for (let i = 0; i < 4; i++) {
                $("#answer" + i).empty();
            }
            $(".question").empty();
            $(".question").append($("<p> Questions answered correctly: " + questionsAnswered + "</p>"));
            $(".question").append($("<p> Questions answered incorrectly: " + wrongAnswers + "</p>"));
            $(".question").append($("<p> Questions not answered in time: " + timeOuts + "</p>"));
            setTimeout(startGame, 10000);
        }
    };

    //object for holding questions to be asked, their answers, and the index of the correct answer in the answer array
    var question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    };

    //called by the game interval, decrements and update the timer and updates time out count if timer reaches zero    
    var gameInterval = function () {
        questionTime--;
        $(".time").text("Time Remaining: " + questionTime);


        if (questionTime <= 0) {
            clearInterval(timer);
            $(".question").text("Time's up! The correct answer was: " + currentQuestion.answers[currentQuestion.correctAnswer]);
            timeOuts++;
            questionIndex++;
            if (questionIndex >= questionBank.length) {
                setTimeout(checkEnd, 3000);
            } else {
                questionTime = 30;
                setTimeout(updateQuestion, 3000);
                timer = setInterval(gameInterval, 1000);

            }

        }

    }

    var questionOne = new question("Stalker, a Russian sci-fi classic, later adapted into a video game, was released in what year?", 
                    ["1968", "1983", "1979", "2002"], 2);
    var questionTwo = new question("Which German expressionist film is widely considered one of the first sci-fi pieces produced for the screen?", 
                    ["The Time Machine", "Star Wars", "Flash Gordon", "Metropolis"], 3);
    var questionThree = new question("Star Wars' Tattoine scenes were filmed in which North African country?", 
                    ["Tunisia", "Mali", "Algeria", "Egypt"], 0);
    var questionFour = new question("Which of the following names belonged to the villain of The Fifth Element?", 
                    ["Judge Death", "Freiza", "Jean-Baptiste Emmanuel Zorg", "Darth Plagueis"], 2);
    var questionFive = new question("This entry in the Mad Max series was the first not star Mel Gibson in the titular role", 
                    ["Mad Max", "Mad Max: Fury Road", "Mad Max: Beyond Thunderdome", "Mad Max 2"], 1);
    questionBank = [questionOne, questionTwo, questionThree, questionFour, questionFive];

    $(document).ready(function () {
        startGame();

        $(document).on("click", ".answers", checkAnswer);
    });
})();

