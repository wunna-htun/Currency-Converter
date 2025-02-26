
// Default conversion rates
let rates = {
    mmk_to_usd: 0.000225,  // 1 MMK = 0.000476 USD
    mmk_to_thb: 0.007576,     // 1 MMK = 0.017 THB
    usd_to_mmk: 4453,      // 1 USD = 2100 MMK
    usd_to_thb: 33.85,      // 1 USD = 35.7 THB
    thb_to_mmk: 132,     // 1 THB = 58.82 MMK
    thb_to_usd: 0.029542     // 1 THB = 0.028 USD
};

// Function to update related rates when one is changed


function updateRelatedRates(changedRate) {
const now = new Date();

if (changedRate === 'usd-mmk') {
// Only update USD-MMK pair
const usdToMmk = parseFloat(document.getElementById('rate-usd-mmk').value);
if (isNaN(usdToMmk) || usdToMmk <= 0) return;

rates.usd_to_mmk = usdToMmk;
rates.mmk_to_usd = roundToSixDecimals(1 / usdToMmk);
} 
else if (changedRate === 'usd-thb') {
// Only update USD-THB pair
const usdToThb = parseFloat(document.getElementById('rate-usd-thb').value);
if (isNaN(usdToThb) || usdToThb <= 0) return;

rates.usd_to_thb = usdToThb;
rates.thb_to_usd = roundToSixDecimals(1 / usdToThb);
} 
else if (changedRate === 'thb-mmk') {
// Only update THB-MMK pair
const thbToMmk = parseFloat(document.getElementById('rate-thb-mmk').value);
if (isNaN(thbToMmk) || thbToMmk <= 0) return;

rates.thb_to_mmk = thbToMmk;
rates.mmk_to_thb = roundToSixDecimals(1 / thbToMmk);
}

// Update all form fields
document.getElementById('rate-usd-mmk').value = rates.usd_to_mmk;
document.getElementById('rate-mmk-usd').value = rates.mmk_to_usd;
document.getElementById('rate-usd-thb').value = rates.usd_to_thb;
document.getElementById('rate-thb-usd').value = rates.thb_to_usd;
document.getElementById('rate-thb-mmk').value = rates.thb_to_mmk;
document.getElementById('rate-mmk-thb').value = rates.mmk_to_thb;

// Update timestamp and reset results
document.getElementById('last-updated').textContent = now.toLocaleString();
document.getElementById('mmk-result').style.display = 'none';
document.getElementById('usd-result').style.display = 'none';
document.getElementById('thb-result').style.display = 'none';
}
// Helper function to round to 6 decimal places (for small values)
function roundToSixDecimals(num) {
    return Math.round(num * 1000000) / 1000000;
}

// Helper function to round to 2 decimal places
function roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
}

// Toggle settings panel
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
    }
}

function switchTab(tabIndex) {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.conversion-form');
    
    // Hide all results
    document.getElementById('mmk-result').style.display = 'none';
    document.getElementById('usd-result').style.display = 'none';
    document.getElementById('thb-result').style.display = 'none';
    
    // Reset active state
    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active'));
    
    // Set active state for selected tab
    tabs[tabIndex].classList.add('active');
    forms[tabIndex].classList.add('active');
}

function convertFromMMK() {
    const amount = parseFloat(document.getElementById('mmk-amount').value);
    const target = document.getElementById('mmk-target').value;
    const resultDiv = document.getElementById('mmk-result');
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    resultDiv.style.display = 'block';
    
    if (target === 'usd' || target === 'both') {
        const usdAmount = amount * rates.mmk_to_usd;
        document.getElementById('mmk-usd-result').style.display = 'block';
        document.getElementById('mmk-usd-amount').textContent = `${amount.toLocaleString()} MMK = ${usdAmount.toFixed(2)} USD`;
        document.getElementById('mmk-usd-rate').textContent = `1 MMK = ${rates.mmk_to_usd.toFixed(6)} USD`;
    } else {
        document.getElementById('mmk-usd-result').style.display = 'none';
    }
    
    if (target === 'thb' || target === 'both') {
        const thbAmount = amount * rates.mmk_to_thb;
        document.getElementById('mmk-thb-result').style.display = 'block';
        document.getElementById('mmk-thb-amount').textContent = `${amount.toLocaleString()} MMK = ${thbAmount.toFixed(2)} THB`;
        document.getElementById('mmk-thb-rate').textContent = `1 MMK = ${rates.mmk_to_thb.toFixed(4)} THB`;
    } else {
        document.getElementById('mmk-thb-result').style.display = 'none';
    }
}

function convertFromUSD() {
    const amount = parseFloat(document.getElementById('usd-amount').value);
    const target = document.getElementById('usd-target').value;
    const resultDiv = document.getElementById('usd-result');
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    resultDiv.style.display = 'block';
    
    if (target === 'mmk' || target === 'both') {
        const mmkAmount = amount * rates.usd_to_mmk;
        document.getElementById('usd-mmk-result').style.display = 'block';
        document.getElementById('usd-mmk-amount').textContent = `${amount.toLocaleString()} USD = ${mmkAmount.toLocaleString()} MMK`;
        document.getElementById('usd-mmk-rate').textContent = `1 USD = ${rates.usd_to_mmk.toLocaleString()} MMK`;
    } else {
        document.getElementById('usd-mmk-result').style.display = 'none';
    }
    
    if (target === 'thb' || target === 'both') {
        const thbAmount = amount * rates.usd_to_thb;
        document.getElementById('usd-thb-result').style.display = 'block';
        document.getElementById('usd-thb-amount').textContent = `${amount.toLocaleString()} USD = ${thbAmount.toFixed(2)} THB`;
        document.getElementById('usd-thb-rate').textContent = `1 USD = ${rates.usd_to_thb.toFixed(2)} THB`;
    } else {
        document.getElementById('usd-thb-result').style.display = 'none';
    }
}

function convertFromTHB() {
    const amount = parseFloat(document.getElementById('thb-amount').value);
    const target = document.getElementById('thb-target').value;
    const resultDiv = document.getElementById('thb-result');
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    resultDiv.style.display = 'block';
    
    if (target === 'mmk' || target === 'both') {
        const mmkAmount = amount * rates.thb_to_mmk;
        document.getElementById('thb-mmk-result').style.display = 'block';
        document.getElementById('thb-mmk-amount').textContent = `${amount.toLocaleString()} THB = ${mmkAmount.toLocaleString()} MMK`;
        document.getElementById('thb-mmk-rate').textContent = `1 THB = ${rates.thb_to_mmk.toLocaleString()} MMK`;
    } else {
        document.getElementById('thb-mmk-result').style.display = 'none';
    }
    
    if (target === 'usd' || target === 'both') {
        const usdAmount = amount * rates.thb_to_usd;
        document.getElementById('thb-usd-result').style.display = 'block';
        document.getElementById('thb-usd-amount').textContent = `${amount.toLocaleString()} THB = ${usdAmount.toFixed(2)} USD`;
        document.getElementById('thb-usd-rate').textContent = `1 THB = ${rates.thb_to_usd.toFixed(4)} USD`;
    } else {
        document.getElementById('thb-usd-result').style.display = 'none';
    }
}

// Initialize form with default exchange rates
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rate-usd-mmk').value = rates.usd_to_mmk;
    document.getElementById('rate-mmk-usd').value = rates.mmk_to_usd;
    document.getElementById('rate-usd-thb').value = rates.usd_to_thb;
    document.getElementById('rate-thb-usd').value = rates.thb_to_usd;
    document.getElementById('rate-thb-mmk').value = rates.thb_to_mmk;
    document.getElementById('rate-mmk-thb').value = rates.mmk_to_thb;
});
