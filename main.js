

function calculatetax() {
    try{
        if(window.openDatabase){
                var shortName   =  'calchistorys';
                var version   =  '1.0';
                var displayName  =  'Edentiti Information';
                var maxSize   =  65536; // in bytes
                db    =  openDatabase(shortName, version, displayName, maxSize);
                       alert('Sqlite Database created');
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
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.ticketNumber.localeCompare(b.ticketNumber));
        const winnersDiv = document.getElementById('Winners');
        const table = document.createElement('table');
        table.classList.add('winners-table');
        const headerRow = table.insertRow();
        const headerCells = ['Ticket Number', 'City', 'Amount'];
        for (const headerText of headerCells) {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        }
        data.forEach((item) => {
          const row = table.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          cell1.textContent = item.ticketNumber;
          cell2.textContent = item.city;
          cell3.textContent = item.amount;
        });
        winnersDiv.innerHTML = '';
        winnersDiv.appendChild(table);
      })
      .catch((error) => {
        console.error('Error loading JSON data:', error);
      });
  }
  window.addEventListener('load', loadWinnersData);
  