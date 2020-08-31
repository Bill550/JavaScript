// // closures Challenge

// function interviewQuestion(Job){
//     var t = 'What subject do you teach';
//     var unknow = 'what do you do?';

//     return function (name) {
//         if (Job === 'Designer') {
//             console.log(name + ' Can you Please Explaine UX? ');
//         } else if (Job === 'Teacher') {
//             console.log(t + ' ' + name);
//         }else {
//             console.log('Hello ' + name + ' ' + unknow);
//         }
//     }
// }

// var jhon = interviewQuestion('Designer') ('John');


// // Invoking  
// (function() {
        
//     }
// )();


// (function() {
//     // Challenge # 7 Simple 

//     function Question(question, choice, answer) {
//         this.question = question;
//         this.choice = choice;
//         this.answer = answer
//     }

//     Question.prototype.displayQuestion = function () {
//         console.log(this.question);
//         for (var i = 0; i < this.choice.length; i++) {
//             console.log(i + ': ' + this.choice[i]);
//         }
//     }
//     Question.prototype.CheckAnswer = function (ans) {
//         if (ans === this.answer) {
//             console.log('You Have Entered The Right Answer');
//         } else {
//             console.log('You Have Entered The Wrong Answer');
//         }
//     }

//     var q1 = new Question('What\'s your Name', ['Bilal', 'Ahsan'], 0);
//     var q2 = new Question('What\'s your Age', [20, 22], 1);
//     var q3 = new Question('What\'s your Father Name', ['Sohail Iqbal', 'Muhammad Iqbal'], 0);

//     var questions = [q1, q2, q3];

//     var n = Math.floor(Math.random() * questions.length);

//     questions[n].displayQuestion();
//     var answers = parseInt(prompt('Please Enter The Correct Answer'));
//     questions[n].CheckAnswer(answers);

//     }
// )();





(function() {
    // Challenge # 7 ADVANCE 

    function Question(question, choice, answer) {
        this.question = question;
        this.choice = choice;
        this.answer = answer
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);
        for (var i = 0; i < this.choice.length; i++) {
            console.log(i + ': ' + this.choice[i]);
        }
    }
    Question.prototype.CheckAnswer = function (ans, callback) {
        var sc;
        if (ans === this.answer) {
            console.log('You Have Entered The Right Answer');
            sc = callback(true);
        } else {
            console.log('You Have Entered The Wrong Answer');
            sc = callback(false);
        }

        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score){
        console.log('Your Current Score is: ' + score);
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
    }

    var q1 = new Question('What\'s your Name', ['Bilal', 'Ahsan'], 0);
    var q2 = new Question('What\'s your Age', [20, 22], 1);
    var q3 = new Question('What\'s your Father Name', ['Sohail Iqbal', 'Muhammad Iqbal'], 0);

    var questions = [q1, q2, q3];

        function score(){
            var count = 0;
            return function(correct){
                if (correct) {
                    count++;
                }
                return count; 
            }
        }

    var keepScore = score();

    

    function nextQuestion() {

        var n = Math.floor(Math.random() * questions.length);

        questions[n].displayQuestion();
        var answers = prompt('Please Enter The Correct Answer');
        if (answers !== 'exit') {
            questions[n].CheckAnswer(parseInt(answers), keepScore);
            nextQuestion();
        }

    }

    nextQuestion();
    
})();



