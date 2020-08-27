// closures Challenge

function interviewQuestion(Job){
    var t = 'What subject do you teach';
    var unknow = 'what do you do?';

    return function (name) {
        if (Job === 'Designer') {
            console.log(name + ' Can you Please Explaine UX? ');
        } else if (Job === 'Teacher') {
            console.log(t + ' ' + name);
        }else {
            console.log('Hello ' + name + ' ' + unknow);
        }
    }
}

var jhon = interviewQuestion('Designer') ('John');