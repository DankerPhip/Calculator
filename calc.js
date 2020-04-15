function add(num1, num2){
    let sum = num1 + num2;
    return sum;
}

function subtract(num1, num2){
    let difference = num1 -  num2;
    return difference;
}

function multiply(num1, num2){
    let product = num1 * num2;
    return product;
}

function divide(num1, num2){
    let quotient = num1/num2;
    return quotient;
}

function exponent(num1, num2){
    let power = 1;
    if(num2 >= 0){
        for(i = 0; i < num2; i++){
            power = num1 * power;
        }
    } else{
        for(i = num2; i <= 0; i++){
            power = power / num1;
        }
    }
    return power;
}

function operate(operator, num1, num2){
    if(operator == "add"){
        let sum = add(num1, num2);
        return sum;
    } else if (operator == "subtract"){
        let difference = subtract(num1, num2);
        return difference;
    } else if (operator == "multiply"){
        let product = multiply(num1, num2);
        return product;  
    } else if (operator == "divide"){
        let quotient = divide(num1, num2);
        return quotient;
    } else if (operator =="exponent"){
        let power = exponent(num1, num2);
        return power;
    }
}

const buttons = document.querySelectorAll("button"); //Makes button clicks animation
buttons.forEach(button => button.addEventListener("click", function(e){
    button.classList.add("clicking");
}));
buttons.forEach(button => button.addEventListener("transitionend", function(e){
    this.classList.remove("clicking");
}));

//below is functionality of calculator
let equation = {
    num1: "",
    num2: "",
    operator: 0 
}

const numbers = document.querySelectorAll(".numbers");
numbers.forEach(number => number.addEventListener("click", function(e) {
    let firstInput = document.getElementById("first-num");
    let secondInput = document.getElementById("second-num");
    if(firstInput.innerHTML == "0"){
        firstInput.innerHTML = "";
    }
    if(equation.num1 == ""){
        firstInput.innerHTML = firstInput.innerHTML + this.innerHTML;
    } else if (equation.num1 != "" && equation.operator != 0){
        secondInput.innerHTML = secondInput.innerHTML + this.innerHTML;
        equation.num2 = secondInput.innerHTML;
    }

}));

const clear = document.querySelector("#clear");
clear.addEventListener("click", function(e){
    document.getElementById("first-num").innerHTML = "0";
    document.getElementById("sign").innerHTML = "";
    document.getElementById("second-num").innerHTML = "";
    document.getElementById("past-input").innerHTML = "";
    equation.num1 = "";
    equation.num2 = "";
    equation.operator = 0;
});


const operator = document.querySelectorAll(".operator");
operator.forEach(operator => operator.addEventListener("click", function (e){
    let firstInput = document.getElementById("first-num");
    let sign = operator.getAttribute("id");
    equation.num1 = parseInt(firstInput.innerHTML); //converts string into numbers
    if(equation.num2 == "" && equation.num1 != ""){
        if(sign == "add"){
            document.getElementById("sign").innerHTML = " + ";
            equation.operator = "add";
        } else if(sign == "subtract"){
            document.getElementById("sign").innerHTML = " - ";
            equation.operator = "subtract";
        } else if(sign == "multiply"){
            document.getElementById("sign").innerHTML = " x ";
            equation.operator = "multiply";
        } else if(sign == "divide"){
            document.getElementById("sign").innerHTML = " / ";
            equation.operator = "divide";
        } else if(sign == "exponent"){
            document.getElementById("sign").innerHTML = " ^ ";
            equation.operator = "exponent";
        } 
    } else {
        equation.num2 = parseInt(document.getElementById("second-num").innerHTML);
        if(equation.num2 != NaN && equation.num2 != ""){
            result = operate(equation.operator, equation.num1, equation.num2);
            result = Math.round(result*100)/100;
            document.getElementById("past-input").innerHTML = document.getElementById("first-num").innerHTML + document.getElementById("sign").innerHTML + document.getElementById("second-num").innerHTML + " = ";
            document.getElementById("first-num").innerHTML = result;
            if(sign == "add"){
                document.getElementById("sign").innerHTML = " + ";
                equation.operator = "add";
            } else if(sign == "subtract"){
                document.getElementById("sign").innerHTML = " - ";
                equation.operator = "subtract";
            } else if(sign == "multiply"){
                document.getElementById("sign").innerHTML = " x ";
                equation.operator = "multiply";
            } else if(sign == "divide"){
                document.getElementById("sign").innerHTML = " / ";
                equation.operator = "divide";
            } else if(sign == "exponent"){
                document.getElementById("sign").innerHTML = " ^ ";
                equation.operator = "exponent";
            } 
            document.getElementById("second-num").innerHTML = "";
            equation.num1 = result;
            equation.num2 = "";    
        }

    }     
}));

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", function(e){
    let firstInput = document.getElementById("first-num");
    let secondInput = document.getElementById("second-num");
    let sign = document.getElementById("sign");
    if(firstInput.innerHTML != "" && sign.innerHTML != "" && secondInput.innerHTML != ""){
        secondInput.innerHTML = "";
        equation.num2 = "";
    } else if(firstInput != "" && sign.innerHTML != ""){
        sign.innerHTML = "";
        equation.operator = 0;
    } else if( firstInput != ""){
        firstInput.innerHTML = "";
        equation.num1 = "";
    }
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", function(e) {
    let result = "";
    if(equation.num1 != "" && equation.num2 != NaN && equation.num2 != "" && equation.operator != 0){
        equation.num2 = parseInt(document.getElementById("second-num").innerHTML);
        result = operate(equation.operator, equation.num1, equation.num2);
        result = Math.round(result*100)/100;
        document.getElementById("past-input").innerHTML = document.getElementById("first-num").innerHTML + document.getElementById("sign").innerHTML + document.getElementById("second-num").innerHTML + " = ";
        document.getElementById("first-num").innerHTML = result;
        document.getElementById("sign").innerHTML = "";
        document.getElementById("second-num").innerHTML = "";
        equation.num1 = result;
        equation.num2 = "";
        equation.operator = 0;    
    }
});