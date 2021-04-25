const calculate = document.getElementById('start');
const incomeAddButton = document.getElementsByTagName('button')[0];
const expensesAddButton = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const accumulatedMothValue = document.getElementsByClassName('accumulated_moth-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const monthSalaryAmount = document.querySelector('.salary-amount');
const additionalIncomeTitle = document.querySelector('.income-title');
const mandatoryExpensesTitle = document.querySelector('.expenses-title');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodAmount = document.querySelector('.period-amount');
const periodSelect = document.querySelector('.period-select');
const cancel = document.querySelector('#cancel');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let inputPlaceholderName;
let inputPlaceholderSum;
let localData = JSON.parse(localStorage.getItem('budgetData')) || [];


const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

class AppData {
    constructor () {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.moneyDeposit = 0;
        this.percentDeposit = 0;

        if (localStorage.getItem('budgetData')) {
            let inputTypeText = document.querySelectorAll('input[type=text], .btn_plus, #deposit-check');
            inputTypeText.forEach(input => input.setAttribute("disabled", "true"));
            calculate.style.display = 'none';
            cancel.style.display = 'block';
        }

        localData.forEach(obj => {
            document.querySelector(`.${obj.name}`).children[1].value = obj.value;
        });

        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split('; ').map(item => item.split('='));

        
        localData.forEach(obj => {
            if (!cookieArray.find(item => item[0] === obj.name && item[1] === obj.value)) {
                    localStorage.removeItem('budgetData');
                    deleteAllCookies()
                } else if (decodedCookie === '') {
                    localStorage.removeItem('budgetData');
                    deleteAllCookies()
                };
            })
    }

    start() {
        
        if (monthSalaryAmount.value === '') {
            alert('Поле "Месячный доход" должно быть заполнено');
        } else if(depositCheck.checked && depositBank.value !== '' && (depositAmount.value === '' || depositPercent.value === '')){
            alert('Введите сумму депозита или процент');
        } else {
            if (depositCheck.checked && depositBank.value === '') {
                depositCheck.checked = !depositCheck.checked;
                this.depositHandler();
            }
            this.budget = +monthSalaryAmount.value;
    
            this.getAddExpenses();
            this.getAddIncome();
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
            let inputTypeText = document.querySelectorAll('input[type=text], .btn_plus, #deposit-check');
            inputTypeText.forEach(input => input.setAttribute("disabled", "true"));
            calculate.style.display = 'none';
            cancel.style.display = 'block';
        }
    };
    depositValidation(){
        depositBank.value === '' ? depositAmount.setAttribute("disabled", "true") : depositAmount.removeAttribute("disabled");
    };
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = this.calcSavedMoney();
        }.bind(this));



        let titles = document.querySelectorAll('.result > div:not(:last-child)');
        titles.forEach(item => {
            let name = item.className;
            let value = item.children[1].value;
            let nameCookie = encodeURIComponent(item.className);
            let valueCookie = encodeURIComponent(item.children[1].value);
            let objData = {
                name,
                value
            };
            localData.push(objData);
            localStorage.setItem('budgetData', JSON.stringify(localData));
            document.cookie = `${nameCookie}=${valueCookie}`;
        });
        document.cookie = 'isLoad=true';


    };
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes.forEach(node => node.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddButton.style.display = 'none';
        }
        this.validInput();
    };
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes.forEach(node => node.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAddButton.style.display = 'none';
        }
        this.validInput();
    };
    getExpenses() {
        expensesItems.forEach(item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };
    getIncome() {
        incomeItems.forEach(item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    };
    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        })
    };
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };
    getBudget() {
        const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);        
    };
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    };
    getPeriodAmout() {
        periodAmount.innerText = periodSelect.value;
    };
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    };
    inputNameValidation() {
        const regex = /[^а-яА-Я0-9\.\,]/g;
        inputPlaceholderName.forEach(input => {
            input.value = input.value.replace(regex, '');
        });
    };
    inputSumValidation() {
        const regex = /[^0-9]/;
        inputPlaceholderSum.forEach(input => {
            input.value = input.value.replace(regex, '');
        });
    };
    validInput() {
        inputPlaceholderName = document.querySelectorAll('.income-title:not(.title), .additional_income-item, .expenses-title:not(.title), .additional_expenses-item');
            inputPlaceholderName.forEach(input => input.addEventListener('input', this.inputNameValidation));
            inputPlaceholderSum = document.querySelectorAll('.income-amount, .expenses-amount, .salary-amount, .target-amount, .deposit-amount, .deposit-percent');
            inputPlaceholderSum.forEach(input => input.addEventListener('input', this.inputSumValidation));
    };
    reset() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.moneyDeposit = 0;
        this.percentDeposit = 0;

        localStorage.removeItem('budgetData');
        deleteAllCookies()

        periodSelect.value = 1;
        const inputClear = document.querySelectorAll('.income-title:not(.title), .additional_income-item, .additional_expenses-item, .expenses-title:not(.title), .result-total, .income-amount, .expenses-amount, .salary-amount, .target-amount');
        inputClear.forEach(input => input.value = '');
        calculate.style.display = 'block';
        cancel.style.display = 'none';
        this.getPeriodAmout();
        const deletedIncomeItems = document.querySelectorAll('.income > div:nth-of-type(n+3)');
        deletedIncomeItems.forEach(input => input.remove());
        const deletedExpenseItems = document.querySelectorAll('.expenses > div:nth-of-type(n+3)');
        deletedExpenseItems.forEach(input => input.remove());
        const inputTypeText = document.querySelectorAll('input[type=text], .btn_plus, #deposit-check');
        inputTypeText.forEach(input => input.removeAttribute("disabled"));
        incomeAddButton.style.display = 'block';
        expensesAddButton.style.display = 'block';
        depositCheck.checked = false;
        this.depositHandler();
    };
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    };
    changePercent() {
        const valueSelect = this.value;
        if ( valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', () => {
                if (depositPercent.value.length > 2) {
                depositPercent.value = depositPercent.value.slice(0, 2);
            }
            });
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    };
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            depositAmount.setAttribute("disabled", "true")
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    };
    eventListners() {
        calculate.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesAddButton.addEventListener('click', this.addExpensesBlock.bind(this));
        incomeAddButton.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.getPeriodAmout.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositBank.addEventListener('change', this.depositValidation.bind(this));
        this.validInput();
    };
};

const appData = new AppData();
appData.eventListners();







