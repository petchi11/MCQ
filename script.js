const questionURL = 'data.json';

fetch(questionURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Now 'data' contains your questions and answers from the JSON file
    const question = data;
    //console.log(questions); // You can see the loaded questions in the console

    // You can use 'questions' in your quiz app here
        const questionElement = document.getElementById ( "question" );
        const answerButton = document.getElementById ( "answer-buttons" );
        const nextButton = document.getElementById ( "nxt-btn" );

        let currentQuestionIndex = 0;
        let score = 0;

        function startQuiz () {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            showQuestion();
        }

        function showQuestion () { 
            resetState ();

            let currentQuestion = question [ currentQuestionIndex ];
            let questionNumber = currentQuestionIndex + 1;

            questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

            currentQuestion.answers.forEach ( answers => {
                const button = document.createElement ( "button" );
                button.innerHTML = answers.text;
                button.classList.add ( "btn" );
                answerButton.appendChild ( button );
                if ( answers.correct ) {
                    button.dataset.correct = answers.correct;
                }
                button.addEventListener ( "click", selectAnswer );
            } );
        }

        function resetState () {
            nextButton.style.display = "None";
            while ( answerButton.firstChild ) {
                answerButton.removeChild ( answerButton.firstChild );
            }
        }

        function selectAnswer ( e ) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            
            if ( isCorrect ) {
                selectedBtn.classList.add ( "correct" );
                score += 1;
            }
            else {
                selectedBtn.classList.add ( "incorrect" );
            }

            Array.from(answerButton.children).forEach( button => {
                if ( button.dataset.correct === "true" ) {
                    button.classList.add("correct");
                }
                button.disabled = "true";
            } );

            nextButton.style.display = "block";
        }

        function showScore () {
            resetState ();
            questionElement.innerHTML = "You scored "+ score + " out of " + question.length + "! questions";
            nextButton.innerHTML = "Reset";
            nextButton.style.display = "block";
        }

        function handleNextButton () {
            currentQuestionIndex += 1;
            if ( currentQuestionIndex < question.length ) {
                showQuestion ();
            }
            else {
                showScore ();
            }
        }

        nextButton.addEventListener ( "click", () => {
            if ( currentQuestionIndex < question.length ) {
                handleNextButton ();
            }
            else {
                startQuiz ();
            }
        } );

        startQuiz ();

  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });


// const question = [
//     {
//             question: "Who is the Richest Person in the World ?",
//             answers: [
//                 { text: "Petchi Mani", correct: true },
//                 { text: "Navin Surya", correct: false },
//                 { text:"Elon Musk", correct: false },
//                 { text: "Jeff ", correct: false }
//             ]
//     },
//     {
//         question: "Who is the Intelligent Person in the World ?",
//             answers: [
//                 { text: "Petchi Mani", correct: true },
//                 { text: "Navin Surya", correct: false },
//                 { text:"Elon Musk", correct: false },
//                 { text: "Jeff ", correct: false }
//             ]
//     }
// ];

