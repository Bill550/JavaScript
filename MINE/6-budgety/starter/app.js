var budgetController = (function () {

})();

var UIController = (function () {
    /// Add All The HTML Classes
    var DOMString = {
        inputTpye: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        InputBTN: '.add__btn',
    }
    return{
        getInput: function () {
            return{
                type:  document.querySelector(DOMString.inputTpye).value, /// will be either inc(+) or exp(-). IT selct value From Selector
                description: document.querySelector(DOMString.inputDescription).value,
                value: document.querySelector(DOMString.inputValue).value
            }
        },

        getDOMString: function () {
            return DOMString;
        }
    }
})();

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

    }

    // FUNCTION THAT HAVE ALL CONTROL IN APPLICCATION AND ITS A PRIVATE FUNCTION And ITS ALSO AN IIFE
    var controlAddItem = function () {
        //GET THE FIELD INPUT
        var input = UIControl.getInput();
        // ADD ITEM TO THE BUDGET CONTROLLER
    }

    // FUNCTION WHICH HELP IIFE(Immediately invoked function expression) into Public function
    return{
        init: function () {
            console.log('Application has Started');
            setupEventListener();
        }
    }


})(budgetController, UIController);

appController.init(); 