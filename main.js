

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
 function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  
  function text(url) {
    return fetch(url).then(res => res.text());
  }
  
  text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
    let ip = data.match(ipRegex)[0];
    console.log(ip);
    
  });