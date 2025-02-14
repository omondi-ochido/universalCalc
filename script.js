function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendNumber(number) {
    const display = document.getElementById('display');
    if (document.getElementById('mode').value === 'Currency') {
        const amountInput = document.getElementById('amount');
        amountInput.value += number;
        convertCurrency(); // Trigger conversion on input change
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    display.value += operator;
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function setMode(mode) {
    if (mode === 'Currency') {
        document.getElementById('currency-options').style.display = 'flex';
        document.getElementById('display').value = '';
    } else {
        document.getElementById('currency-options').style.display = 'none';
    }
}

function clearCurrencyInput() {
    document.getElementById('amount').value = '';
    convertCurrency(); // Trigger conversion on input change
}

const API_KEY = '143453274d0c9b2c2b3d647a'; // Added API key

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const display = document.getElementById('display');

    if (isNaN(amount)) {
        display.value = 'Invalid amount';
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}?apikey=${API_KEY}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        display.value = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        display.value = 'Conversion error';
    }
}

// Add event listeners for real-time conversion
document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('from-currency').addEventListener('change', convertCurrency);
document.getElementById('to-currency').addEventListener('change', convertCurrency);
