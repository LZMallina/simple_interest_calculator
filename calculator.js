/*formula for interest rate */
/* I = Prt */

//get the input data for calculation
const Principle = document.getElementById('amount');
const Rate = document.getElementById('interest');
const Years = document.getElementById('time');
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
    //calculate interest_earned and end_balance
    
    const interest_earned = Principle.value * Rate.value * Years.value;
    let principleInt;
    
    // reset end_balance to 0 otherwise end_balance gives NaN when form reset
    isNaN(parseInt(Principle.value)) ? principleInt = 0 : principleInt = parseInt(Principle.value)
   
    const end_balance = principleInt+ interest_earned;
    
    //display the results
    endBalance.innerHTML = end_balance;
    
    interestEarned.forEach((item) => item.innerHTML = interest_earned);
    inputAmount.forEach((item) => item.innerHTML = Principle.value);
    inputInterest.innerHTML = Rate.value;
    inputYear.innerHTML = Years.value;

}
Clear.addEventListener('click', () => {
    document.querySelector("form").reset();
})