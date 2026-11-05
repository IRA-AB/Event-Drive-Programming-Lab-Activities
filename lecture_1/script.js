function add() {

    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    var answer = Number(num1) + Number(num2);

    document.getElementById("answer").innerText = answer;
}
function subtract() {

    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    var answer = Number(num1) - Number(num2);

    document.getElementById("answer").innerText = answer;
}
function multiply() {

    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    var answer = Number(num1) * Number(num2);

    document.getElementById("answer").innerText = answer;
}
function divide() {

    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    var answer = Number(num1) / Number(num2);

    document.getElementById("answer").innerText = answer;
}