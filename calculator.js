/*formula for interest rate */
/* I = Prt */

//get the input data for calculation
const Principle = document.getElementById('amount');
const Rate = document.getElementById('interest');
const Years = document.getElementById('time');
const timeChoice = document.getElementById("time_choice");
const inputForm = document.querySelector('.input_form')
const Clear = document.getElementById('clear');

//link the output to the right DOM
const endBalance = document.getElementById("end_balance")
const interestEarned = document.querySelectorAll(".interest_earned");
const inputAmount = document.querySelectorAll('.input_amount');
const inputInterest = document.getElementById("input_interest");
const inputYear = document.getElementById("input_year");

/*get inputs and clear*/

inputForm.addEventListener('submit', getInput);

function getInput(e) {
    e.preventDefault();
    //calculate the time
    let terms;

    timeChoice.value === "month"? terms = terms = Math.round((Years.value / 12)*10)/10: terms = Years.value
    //calculate interest_earned and end_balance
    let principleInt;
    
    // reset end_balance to 0 otherwise end_balance gives NaN when form reset
  isNaN(parseInt(Principle.value)) ? principleInt = 0 : principleInt = parseInt(Principle.value)
  
    const interest_earned = Math.round((principleInt * (Rate.value / 100) * terms)*100)/100;
    const end_balance = principleInt+ interest_earned;
    
    //display the results
    endBalance.innerHTML = end_balance;
    
    interestEarned.forEach((item) => item.innerHTML = interest_earned);
    inputAmount.forEach((item) => item.innerHTML = Principle.value);
    inputInterest.innerHTML = Rate.value;
  inputYear.innerHTML = terms;
  
  //call the charts
  getPiechart(principleInt, interest_earned);
  getBargraph(principleInt, Rate.value, terms)
}
Clear.addEventListener('click', clearData)

function clearData(){
    endBalance.innerHTML = 0;
    interestEarned.forEach((item) => (item.innerHTML = 0));
    inputAmount.forEach((item) => (item.innerHTML = 0));
    inputInterest.innerHTML = 0;
    inputYear.innerHTML = 0;
  document.querySelector("form").reset();

}

/**charts, graph, tables***/
let pieChart = null; //make this a global variable so it can be accessible in multiple functions
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
function getBargraph(principleInt, rate, terms) {
  //calculations
   const interest_earned =
     Math.round(principleInt * (rate / 100) * terms * 100) / 100;
   const end_balance = principleInt + interest_earned;
  // Data block
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Ending Balance",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
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
        },
      },
    },
  };
  
  // Render initiation block
  const barGraph = new Chart(document.getElementById("bar_graph"), config);  
}
