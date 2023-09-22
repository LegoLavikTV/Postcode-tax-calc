function calculatetax() {

    var MoneyInput1 = document.getElementById("MoneyInput");
    var TaxInput1 = document.getElementById("TaxInput");

    var firstNumber = parseFloat(MoneyInput1.value)
    var secondNumber = parseFloat(TaxInput1.value)

    var percentage = firstNumber - (secondNumber / 100) * firstNumber;
    var result = document.getElementById("result");
    if (isNaN(percentage) || firstNumber <= 0 || secondNumber <= 0){
        alert("Enter valid numbers")

    }
    else {
        result.value = percentage.toFixed(2)
    }
    
    

 }