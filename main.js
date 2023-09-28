// Define the function to load the calculations table
function loadCalculationsTable() {
    var previousCalculations = JSON.parse(localStorage.getItem("calculations")) || [];
    var table = document.getElementById("previousCalculationsTable");
    table.innerHTML = '';
    table.classList.add('winners-table'); // Add the same styling class as the winners table

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    var headerCells = ["Money", "Tax", "Result"];

    headerCells.forEach(function (headerText) {
        var th = document.createElement("th");
        th.textContent = headerText;
        th.style.textAlign = 'center'; // Center-align the header cells
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    for (var i = previousCalculations.length - 1; i >= 0; i--) {
        var calculation = previousCalculations[i];
        var row = document.createElement("tr");

        // Create and style the cells for Money, Tax, and Result
        var cell1 = document.createElement("td");
        cell1.textContent = calculation.money;
        cell1.style.textAlign = 'center'; // Center-align Money
        row.appendChild(cell1);

        var cell2 = document.createElement("td");
        cell2.textContent = calculation.tax;
        cell2.style.textAlign = 'center'; // Center-align Tax
        row.appendChild(cell2);

        var cell3 = document.createElement("td");
        cell3.textContent = calculation.result;
        cell3.style.textAlign = 'center'; // Center-align Result
        row.appendChild(cell3);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
}


// Call the loadCalculationsTable function on page load
window.addEventListener('load', loadCalculationsTable);

// Modify the calculatetax function to update the table after calculations
function calculatetax() {
    try {
        if (window.openDatabase) {
            var shortName = 'calchistorys';
            var version = '1.0';
            var displayName = 'Edentiti Information';
            var maxSize = 65536; // in bytes
            db = openDatabase(shortName, version, displayName, maxSize);

        }
    } catch (e) {
        alert(e);
    }
    var MoneyInput1 = document.getElementById("MoneyInput");
    var TaxInput1 = document.getElementById("TaxInput");

    var firstNumber = parseFloat(MoneyInput1.value)
    var secondNumber = parseFloat(TaxInput1.value)

    var percentage = firstNumber - (secondNumber / 100) * firstNumber;
    var result = document.getElementById("result");
    if (isNaN(percentage) || firstNumber <= 0 || secondNumber <= 0) {
        result.value = ("Enter valid numbers!")

    } else {
        result.value = percentage.toFixed(2);
        var previousCalculations = JSON.parse(localStorage.getItem("calculations")) || [];
        previousCalculations.push({ money: firstNumber, tax: secondNumber, result: percentage.toFixed(2) });
        localStorage.setItem("calculations", JSON.stringify(previousCalculations));

        // After calculating, update the table
        loadCalculationsTable();
    }
}



function openTab(evt, TabName) {
    var i, tabcontent, tablinks;
    document.getElementById("initialText").style.display = "none";

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(TabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (TabName === 'Winners') {
        // Show the "Add Winner" button and input fields when the "Winners" tab is selected
        document.getElementById('addWinnerSection')
    } else {
        // Hide the "Add Winner" button and input fields for other tabs
        document.getElementById('addWinnerSection')
    }
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
    // Get the winners from local storage
    var winnersFromLocalStorage = JSON.parse(localStorage.getItem("winners")) || [];

    // Get the winners from JSON data
    fetch('/data.json')
        .then((response) => response.json())
        .then((winnersFromJson) => {
            // Combine data from local storage and JSON, with JSON winners on top
            var combinedWinners = [...winnersFromJson, ...winnersFromLocalStorage];

            const winnersDiv = document.getElementById('Winners');
            const table = document.createElement('table');
            table.classList.add('winners-table');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headerCells = ['Ticket Number', 'City', 'Amount'];

            headerCells.forEach((headerText) => {
                const th = document.createElement('th');
                th.textContent = headerText;
                th.style.textAlign = 'center';
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');

            combinedWinners.forEach((item) => {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                const cell3 = document.createElement('td');

                cell1.textContent = item.ticketNumber;
                cell2.textContent = item.city;
                cell3.textContent = item.amount;

                // Center-align the data cells
                cell1.style.textAlign = 'center';
                cell2.style.textAlign = 'center';
                cell3.style.textAlign = 'center';

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



function addWinner() {
    var ticketNumber = document.getElementById("ticketNumber").value;
    var city = document.getElementById("city").value;
    var amount = document.getElementById("amount").value;
    if (ticketNumber && city && amount) {
        
        var winners = JSON.parse(localStorage.getItem("winners")) || [];

        
        var newWinner = {
            ticketNumber: ticketNumber,
            city: city,
            amount: amount
        };

        
        winners.push(newWinner);

        
        localStorage.setItem("winners", JSON.stringify(winners));

        loadWinnersData();
        closeAddWinnerPopup();
        document.getElementById("appwinnererror").style.display = "none";
    } else {
        document.getElementById("addwinnererror").style.display = "block";
    }
}

function openAddWinnerPopup() {
    var popup = document.getElementById("addWinnerPopup");
    popup.style.display = "block";
    document.getElementById("addwinnererror").style.display = "none";
}

function closeAddWinnerPopup() {
    var popup = document.getElementById("addWinnerPopup");
    popup.style.display = "none";
}



