

function calculatetax() {
    try{
        if(window.openDatabase){
                var shortName   =  'calchistorys';
                var version   =  '1.0';
                var displayName  =  'Edentiti Information';
                var maxSize   =  65536; // in bytes
                db    =  openDatabase(shortName, version, displayName, maxSize);
                       
            }
       }catch(e){
        alert(e);
       }
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
        var previousCalculations = JSON.parse(localStorage.getItem("calculations")) || [];
        previousCalculations.push({ money: firstNumber, tax: secondNumber, result: percentage.toFixed(2) });
        localStorage.setItem("calculations", JSON.stringify(previousCalculations));

        
        updateCalculationsTable(previousCalculations);
    
    }
    function updateCalculationsTable(previousCalculations) {
        var table = document.getElementById("previousCalculationsTable");
        table.innerHTML = ''; 
    
        
        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");
        var headerCells = ["Money", "Tax", "Result"];
        headerCells.forEach(function (headerText) {
            var th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        
        var tbody = document.createElement("tbody");
        for (var i = previousCalculations.length - 1; i >= 0; i--) {
            var calculation = previousCalculations[i];
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            cell1.textContent = calculation.money;
            cell2.textContent = calculation.tax;
            cell3.textContent = calculation.result;
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
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


function loadWinnersData() {
  fetch('/winningData') 
    .then((response) => response.json())
    .then((data) => {
      const winnersDiv = document.getElementById('Winners');
      const table = document.createElement('table');
      table.classList.add('winners-table');

      
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const headerCells = ['Ticket Number', 'City', 'Amount'];

      headerCells.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      
      const tbody = document.createElement('tbody');

      data.forEach((item) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');

        cell1.textContent = item.ticketNumber;
        cell2.textContent = item.city;
        cell3.textContent = item.amount;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      winnersDiv.innerHTML = '';
      winnersDiv.appendChild(table);
    })
    .catch((error) => {
      console.error('Error loading JSON data:', error);
    });
}

window.addEventListener('load', loadWinnersData);
