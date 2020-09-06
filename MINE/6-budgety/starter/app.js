var budgetController = (function () {

    var Expence = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    // to get Percentage IN Expence Section
    Expence.prototype.calcPerentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }
    };

    Expence.prototype.getPercentage = function () {
        return this.percentage;
    };
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0 ;
        data.allItems[type].forEach( function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        precentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            //[1 2 3 4 5], next ID = 6
            //[1 2 3 6 8], next ID = 9
            // ID = last ID + 1
            // create new id 
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on 'inc' or 'exp' type  
            if (type === 'exp') {
                newItem = new Expence(ID, des, val);                
            }else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // Push into our data Structure
            data.allItems[type].push(newItem);

            //Return the New Element
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;
            //EXAMPLE we have id = 6 To DELETE
            // ids=[1 2 4 6 8]
            //We HAVE to SElect INdex no not id to delete the element 
            //In this Index = 3

            // data.allItems[type][id];

            // .map it return New Array

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        // Calculating the Budget
        calculateBudget: function () {

            // Calculate Total Inc And EXP
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate total budget : inc - exp
            data.budget = data.totals.inc - data.totals.exp;

            // claculate Percentage of the income we spent
            if (data.totals.inc > 0) {
                data.precentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentage: function () {
            //Expence
            // a = 20
            // b = 30
            // c = 40
            // Income
            // income = 100
            // Percentage Of Expence
            // a = 20%
            // b = 30%
            // c = 40%

            data.allItems.exp.forEach(function (cur) {
                cur.calcPerentage(data.totals.inc);
            });

        },

        getPercentages: function () {
            var allPercentage = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });

            return allPercentage;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.precentage
            };
        },

        testing: function(){
            console.log(data);
        }
    };
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var UIController = (function () {
    /// Add All The HTML Classes
    var DOMString = {
        inputTpye: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        InputBTN: '.add__btn',
        incomeContainer: '.income__list',
        expenceContainer: '.expenses__list',
        budgetLable: '.budget__value',
        incomeLable: '.budget__income--value',
        expenceLable: '.budget__expenses--value',
        percentageLable: '.budget__expenses--percentage',
        container:'.container',
        ExpencesPercentageLable: '.item__percentage',
        dateLable: '.budget__title--month'

    };
    // Formatting Number
    var formatNumber =  function (num, type) {
        var numSplit, int, decimal, type;
        // + or - before the Number
        // Exactly 2 Decimal Points
        // comma Seprating the Thousand
        // e.g 1203.4661 => + 1203.47

        num = Math.abs(num);
        num = num.toFixed(2); // Show upto 2 Dicimal

        numSplit = num.split('.');

        int = numSplit[0];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // substr(Index, how many Read) e.g. int = 1230;  int.substr(0, 2) It will give us 12 Only
        }

        decimal = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + decimal;
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return{
        getInput: function () {
            return{
                type: document.querySelector(DOMString.inputTpye).value, /// will be either inc(+) or exp(-). IT selct value From Selector
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            };
        },
        addListItem: function (obj, type) {
            var html, newHtml, element;
            // create HTML string with PlaceHOlder TEXT
            if (type === 'inc') {
                element = DOMString.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class = "item__description"> %description% </div> <div class = "right clearfix"><div class = "item__value"> %value% </div> <div class = "item__delete" ><button class = "item__delete--btn"> <i class = "ion-ios-close-outline"> </i></button></div> </div> </div>'
            } else if (type === 'exp') {
                element = DOMString.expenceContainer;
                html = '<div class = "item clearfix"id = "exp-%id%"><div class = "item__description"> %description% </div> <div class = "right clearfix"><div class = "item__value"> %value% </div> <div class = "item__percentage"> 21 % </div> <div class = "item__delete"> <button class = "item__delete--btn"> <i class = "ion-ios-close-outline" > </i></button > </div> </div> </div>';
            }
            
            //Replace PlaceHolder TEXT with Some actuall Data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //Enter HTML INTO DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem: function (selectorID) {
            // We Cannot Remove Element Firest We have to Move to Parent AAnd then We can delete the Child ELement
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },

        // To Clear All Input Ffields
        clearFields: function () {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue); // this will gives us a list not array
            
            fieldsArray =  Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function (current, index, array)  {
                current.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudget: function (obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMString.budgetLable).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMString.incomeLable).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMString.expenceLable).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMString.percentageLable).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMString.percentageLable).textContent =  '---';
            }
        },

        /// IN EXpEnce Section
        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMString.ExpencesPercentageLable);

            

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function () {
            var now, year, month, months, day, days, date;
            now = new Date();
            year = now.getFullYear();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            day = now.getDay();
            date = now.getDate();
            document.querySelector(DOMString.dateLable).textContent = days[day] + ' ' + date + 'th' + ' ' + months[month] + ' ' + year;
            
        },

        changedType: function () {
            var fields = document.querySelectorAll(
                DOMString.inputTpye + ',' +
                DOMString.inputDescription + ',' +
                DOMString.inputValue
            );

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMString.InputBTN).classList.toggle('red');
        },

        getDOMString: function () {
            return DOMString;
        }
    };
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var appController = (function (budgetContrl, UIControl) {

    // Function THat Have Alll EVENT Listener AND ITS A PRIVATE FUNCTION And ITS ALSO AN IIFE
    var setupEventListener = function () {

        // GETTING ALL DOMSTRING VALUES FROM UICONTROLLER
        var DOM = UIControl.getDOMString();

        ///FOR SIMPLE BUTTON PRESS
        document.querySelector(DOM.InputBTN).addEventListener('click', controlAddItem);
        ///For PRESSING ENTER 
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                controlAddItem();
            }
        });

        //Event Delecation:Event delegation refers to the process of using event propagation (bubbling) to handle events at a higher level in the DOM than the element on which the event originated. It allows us to attach a single event listener for elements that exist now or in the future.

        document.querySelector(DOM.container).addEventListener('click', controlDeleteItem);

        // For Change the HighLights For Input Fields When We change the inc or exp
        document.querySelector(DOM.inputTpye).addEventListener('change', UIControl.changedType);

    };

    var updateBudget = function () {

        // Calculate the BUdget
        budgetContrl.calculateBudget();

        // Return The Budget
        var budget;
        budget = budgetContrl.getBudget();

        //calculate the Percentage of the Income the We Spent
        UIControl.displayBudget(budget);
    };  

    var updatePercentage =  function () {
        //Calculate Percentage
        budgetContrl.calculatePercentage();
        //Read Prescentage From Budget Controller
        var percentage = budgetContrl.getPercentages();
        //Update The UI With New Percentage
        UIControl.displayPercentages(percentage);
    };

    // FUNCTION THAT HAVE ALL CONTROL IN APPLICCATION AND ITS A PRIVATE FUNCTION And ITS ALSO AN IIFE
    var controlAddItem = function () {
        var input, newItems ;
        //GET THE FIELD INPUT
        input = UIControl.getInput();

        // For Not Entering Empty DATA
        if (input.description !== " " && !isNaN(input.value) && input.value > 0) {
            // ADD ITEM TO THE BUDGET CONTROLLER
            newItems = budgetContrl.addItem(input.type, input.description, input.value);

            // Add Item To the UI
            UIControl.addListItem(newItems, input.type);

            // For Clear THE Fields
            UIControl.clearFields();

            // Calculate and update Budget
            updateBudget();

            // Calculate and update Budget
            updatePercentage();
        }

    };

    var controlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // DELETE THE ITEM FROM DATA STRUCTURE'
            budgetContrl.deleteItem(type, ID);

            // DELETE ITEM FROM THE UI
            UIControl.deleteListItem(itemID);

            // Update and show new BUDGET
            updateBudget();

            // Calculate and update Budget
            updatePercentage();
        }
    };

    // FUNCTION WHICH HELP IIFE(Immediately invoked function expression) into Public function
    return{
        init: function () {
            console.log('Application has Started');
            UIControl.displayMonth();
            UIControl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListener();
        }
    };


})(budgetController, UIController);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

appController.init(); 