
// Challenge# 2

// console.log('Hello World !!!');

// var mike_total = (116 + 94 + 123) / 3;
// var john_total = (113 + 103 + 120) / 3;
// var mary_total = (97 + 134 + 105) / 3

// console.log('Mike = ', mike_total, 'John = ', john_total, 'Mary = ', mary_total);

// if (mike_total > john_total && mike_total > mary_total) {
//     console.log('Mike\'s Win with score Average = ' + mike_total + ' points');
// } else if (john_total > mike_total && john_total > mary_total){
//     console.log('john\'s Win with score Average = ' + john_total + ' points');
// } else if (mike_total < mary_total && john_total < mary_total) {
//     console.log('Mary\'s Win with score Average = ' + mary_total + ' points');
// } else if (mike_total == mary_total && mike_total != john_total && mary_total != john_total ) {
//     console.log('Its Draw between Mary\'s and Mike\'s ');
// } else if (mike_total == john_total && mike_total != mary_total && mary_total != john_total ) {
//     console.log('Its Draw between John\'s and Mike\'s ');
// } else if (john_total == mary_total && mike_total != john_total && mary_total != mike_total ) {
//     console.log('Its Draw between Mary\'s and John\'s ');
// }else{
//     console.log('Its Draw in all of them');
// }

// Challenge# 3

// var bills = [124, 48, 268];
// function toCalculateTip(bills) {
//     var percentage;
//     if (bills < 50) {
//         percentage = 0.2
        
//     }else if (bills >= 50 && bills <= 200){
//         percentage = 0.15

//     }else if (bills > 200) {
//         percentage = 0.1
//     }
//     else{
//         return console.log('Values Aren\'t Number ');
//     }
//     return percentage * bills;
// }

// var tips = [    toCalculateTip(bills[0]),
//                 toCalculateTip(bills[1]), 
//                 toCalculateTip(bills[2])];

// var finalPay = [    bills[0] + tips[0],
//                     bills[1] + tips[1],
//                     bills[2] + tips[2],]

//     console.log('Tips We Pay =' + tips + ' ' + 'Final Payment = ' + finalPay);
    

// Challenge# 4

// var mark = {
//     fullName : 'Mr.Mark Walter',
//     mass : 65,
//     height : 1.79832,
//     calculateBMI: function () {
//         this.BMI = this.mass / this.height ^ 2;
//         return this.BMI;
//     }
// }
// var john = {
//     fullName : 'Mr.John Wick',
//     mass : 80,
//     height : 1.92024,
//     calculateBMI: function() {
//         this.BMI = this.mass / this.height^2 ;
//         return this.BMI;
//     }
// }

// if (mark.calculateBMI() > john.calculateBMI()){
//     console.log(mark.fullName + ' Have Greater BMI Then The ' + john.fullName + '   ' +
//         mark.fullName + ' BMI = ' + mark.BMI + ' AND ' + john.fullName + ' BMI = ' + john.BMI );
// } else if (john.calculateBMI() > mark.calculateBMI()) {
//     console.log(john.fullName + ' Have Greater BMI Then The ' + mark.fullName + '   ' +
//         john.fullName + ' BMI = ' + john.BMI + ' AND ' + mark.fullName + ' BMI = ' + mark.BMI);
// }else {
//     console.log(john.fullName + ' AND ' + mark.fullName + ' Have Same BMI ' + '   ' +
//         john.fullName + ' BMI = ' + john.BMI + ' AND ' + mark.fullName + ' BMI = ' + mark.BMI);
// }



//for loop backword Challenge

// var john = ['john', 'Samith', 1990, 'Designer', false, 'blue'];
// for (var i= john.length - 1; i >= 0; i-- ){
//     console.log(john[i]);
// }


// Challenge#5

var john = {
    fullname : 'Mr. John Wick',
    bill : [124, 48, 268, 180, 42],
    calculateTips : function () {
        this.tips = [];
        this.FinalValues = [];
        for (var i =0 ; i < this.bill.length ; i++){
            var percent;
            var bills = this.bill[i];
            if (bills < 50){
                percent = 0.2;
            } else if (bills >= 50 && bills < 200){
                percent = 0.15;
            } else if (bills >= 200){
                percent = 0.2;
            }else{
                console.log('Please Check the Values It Should Be Numaric');
                break;
            }
            this.tips[i] = percent * bills;
            this.FinalValues[i] = bills + this.tips[i];
        }
    }
}

var mark = {
    fullname: 'Mr. Mark Winsly',
    bill: [77, 475, 110, 45],
    calculateTips: function () {
        this.tips = [];
        this.FinalValues = [];
        for (var i = 0; i < this.bill.length; i++) {
            var percent;
            var bills = this.bill[i];
            if (bills < 100) {
                percent = 0.2;
            } else if (bills >= 100 && bills < 300) {
                percent = 0.1;
            } else if (bills >= 300) {
                percent = 0.25;
            } else {
                console.log('Please Check the Values It Should Be Numaric');
                break;
            }
            this.tips[i] = percent * bills;
            this.FinalValues[i] = bills + this.tips[i];
        }
    }
}
function AverageTips(tips) {
    var avergTip = 0;
    for (var i = 0; i < tips.length; i++) {
        avergTip = avergTip + tips[i];
    }
    return avergTip / tips.length;
} 

mark.calculateTips();
john.calculateTips();
mark.average = AverageTips(mark.tips);
john.average = AverageTips(john.tips);
console.log(mark, john);

var averageMarks = mark.average;
var averageJohn = john.average;
if(averageJohn < averageMarks){
    console.log('Marks Pay More Average Tip Then John')
} else if (averageJohn > averageMarks) {
    console.log('John Pay More Average Tip Then Mark')
} else if (averageJohn == averageMarks) {
    console.log('Both Mark & John Pay Same Average Tip')
}


