document.addEventListener('DOMContentLoaded', () => {
    'use strict';

const select = document.querySelector('.select');
const rubAmount = document.querySelector('.amount_rub');
const currencyAmount = document.querySelector('.converted_amount');
const wrapper = document.querySelector('.wrapper');


const getData = () => {
    return fetch('http://api.exchangeratesapi.io/v1/latest?access_key=d6f00d63067738c2e6f5ebf1fd95d651&symbols=USD,RUB')
}
getData()
    .then(response => response.json())
    .then(data => {
        select.addEventListener('change', () => {
            if (select.value === 'EUR' && rubAmount.value !== '' && currencyAmount.value !== '') currencyAmount.value = (rubAmount.value / data.rates.RUB).toFixed(2)
            if (select.value === 'USD' && rubAmount.value !== '' && currencyAmount.value !== '') currencyAmount.value = (rubAmount.value / data.rates.RUB * data.rates.USD).toFixed(2)
        })
        wrapper.addEventListener('input', (e) => {
            if (e.target.name === 'amount_rub') {
                if (select.value === 'EUR') currencyAmount.value = (rubAmount.value / data.rates.RUB).toFixed(2)
                if (select.value === 'USD') currencyAmount.value = (rubAmount.value / data.rates.RUB * data.rates.USD).toFixed(2)
            }
            if (e.target.name === 'amount_currency') {
                if (select.value === 'EUR') rubAmount.value = (currencyAmount.value * data.rates.RUB).toFixed(2)
                if (select.value === 'USD') rubAmount.value = (currencyAmount.value * (data.rates.RUB / data.rates.USD)).toFixed(2)
            }
        })
    })
});

