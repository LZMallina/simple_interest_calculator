/*formula for interest rate */
/* I = Prt */

//get the input data for calculation
const Principle = document.getElementById('amount');
const Rate = document.getElementById('interest');
const Time = document.getElementById('time');
const timeChoice = document.getElementById("time_choice");
const inputForm = document.querySelector('.input_form')
const Clear = document.getElementById('clear');

//link the output to the right DOM
const endBalance = document.getElementById("end_balance")
const interestEarned = document.querySelectorAll(".interest_earned");
const inputAmount = document.querySelectorAll('.input_amount');
const inputInterest = document.getElementById("input_interest");
const inputTime = document.getElementById("input_time");
const GetSchedule = document.getElementById('schedule');

/*get inputs and clear*/
inputForm.addEventListener('submit', getInput);

function getInput(e) {
    e.preventDefault();
    //calculate the terms of investment depending on month or year choose
  let terms;
    timeChoice.value === "month"? terms = Math.round((Time.value / 12)*100)/100: terms = Time.value
    //convert principle.value and Rate.value to integer
  let principleInt;
  let rateInt;
  isNaN(parseInt(Principle.value))
    ? principleInt = 0
    : principleInt = parseInt(Principle.value)
  isNaN(parseInt(Rate.value))
    ? (rateInt = 0)
    : (rateInt= parseInt(Rate.value));
  //calculate interest earned and end balance
  let interestBank = [];
  let termBank = [];
  let endBalanceBank = [];
  let interest_earned;
  let end_balance;
  
    for (let i = 1; i <= Time.value; i++) {
      timeChoice.value === "month"
        ? (interest_earned =
            Math.round(((principleInt * (rateInt / 100) * i/12)) * 100) / 100)
        : (interest_earned =
            Math.round(principleInt * (rateInt / 100) * i * 100) / 100);
      end_balance = principleInt + interest_earned;
      termBank.push(i);
      interestBank.push(interest_earned);
      endBalanceBank.push(end_balance);
  } 
    //display the results
    endBalance.innerHTML = end_balance;
    
    interestEarned.forEach((item) => item.innerHTML = interest_earned);
    inputAmount.forEach((item) => item.innerHTML = Principle.value);
    inputInterest.innerHTML = Rate.value;
    inputTime.innerHTML = terms;
  
  //call the charts
  getPiechart(principleInt, interest_earned);
  getBargraph(termBank, endBalanceBank, timeChoice.value)
  getSchedule(termBank, endBalanceBank, interestBank, timeChoice.value)
}
Clear.addEventListener('click', clearData)

function clearData(){
    endBalance.innerHTML = 0;
    interestEarned.forEach((item) => (item.innerHTML = 0));
    inputAmount.forEach((item) => (item.innerHTML = 0));
    inputInterest.innerHTML = 0;
    inputTime.innerHTML = 0;
    document.querySelector("form").reset();
}

/**charts, graph, tables***/
let pieChart = null; //initialize as global variable so it can be accessible in multiple functions
let barGraph = null;
function getPiechart(principleInt, interest_earned) {
  //data block
  const data = {
    labels: ["Principle", "Interest Earned"],
    datasets: [
      {
        label: "",
        data: [principleInt, interest_earned],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  //configuration block
  const config = {
    data: data,
    type: "doughnut",
  };
  //render block
  if (pieChart !== null) {
    pieChart.destroy()
  }
  pieChart = new Chart(document.getElementById("pie_chart"), config);
}
function getBargraph(termBank, endBalanceBank, timeChoice) {
  // Data block
  const data = {
    labels: termBank.map(item => item),
    datasets: [
      {
        label: "Ending Balance",
        data: endBalanceBank.map(item=>item),
        borderWidth: 1,
        backgroundColor: "orange"
      },
    ],
  }
  // Configuration block
  const config = {
    data: data,
    type: 'bar',
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text:"$ dollars"
          }
        },
        x: {
          title: {
            display: true,
            text: timeChoice
          }
        }
      },
    },
  };
  
  // Render initiation block
  if (barGraph !== null) {
    barGraph.destroy();
  }
  barGraph = new Chart(document.getElementById("bar_graph"), config);  
}
function getSchedule(termBank, endBalanceBank, interestBank, timeChoice) {
  GetSchedule.innerHTML = `
              <table id ="table">
                  <tr>
                    <th>Term (${timeChoice})</th>
                    <th>Interest Earned</th>
                    <th>End Balance</th>
                  </tr>
              </table>
              ` ;
  const table = document.getElementById('table');
  for (let i = 0; i < termBank.length; i++){
    let row = document.createElement('tr'); 
    let dT = document.createElement('td'); //for term
    let dIB = document.createElement('td');//for interest 
    let dEB = document.createElement('td');//for balance

    // append info to data cells
    dT.append(termBank[i]);
    dIB.append(interestBank[i]);
    dEB.append(endBalanceBank[i]);

    //append td to row
    row.appendChild(dT);
    row.appendChild(dIB);
    row.appendChild(dEB);

    //append rows to table
    table.appendChild(row);


  }
 }