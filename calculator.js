/*formula for interest rate */
/* I = Prt */

//get the input data for calculation
const Principle = document.getElementById('amount');
const Rate = document.getElementById('interest');
const Years = document.getElementById('time');
const inputForm = document.querySelector('.input_form')
const Clear = document.getElementById('clear');


/*get inputs and clear*/

inputForm.addEventListener('submit', getInput);

function getInput(e) {
    e.preventDefault();
    console.log('Principle', Principle.value)
    console.log("Rate", Rate.value)
    console.log("Year", Years.value)
    
}
Clear.addEventListener('click', () => {
    inputForm.reset()
})