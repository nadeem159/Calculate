// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // hide Result
    document.getElementById('results').style.display = 'none';

    // image Loading
    document.getElementById('loading').style.display = 'block';

    // time out

    setTimeout(calculateResults, 1000);
    e.preventDefault();
});

// Calculate Results
function calculateResults() {

    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }


}

// error

function showError(error) {
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // create div
    const erroDiv = document.createElement('div');

    // add class
    erroDiv.className = 'alert alert-danger';

    // apendchidl
    erroDiv.appendChild(document.createTextNode(error));

    // incert card
    card.insertBefore(erroDiv, heading);

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    // setTimeOut
    setTimeout(clearError, 3000);

}

function clearError() {
    document.querySelector('.alert').remove();
}