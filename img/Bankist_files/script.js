'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];



// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const updateUI=(acc)=>{
  calcDisplaySummary(acc)
    calcPrintBalance(acc)
    displayMovements(acc.movements) 
}

const displayMovements=(movements)=>{
  containerMovements.innerHTML=''
  movements.forEach((mov,i)=>{
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}???</div>
      </div>
    `;
   
   containerMovements.insertAdjacentHTML('afterbegin',html)
}
  )
}
  


const calcPrintBalance=(account)=>{
  account.balance= account.movements.reduce((sum,mov)=>sum+mov,0)
  labelBalance.textContent=`${account.balance}???`  
  }



const calcDisplaySummary=(account)=>{
  labelSumIn.textContent=account.movements.
  filter(mov=>mov>0).
  reduce((a,b)=>a+b)+'???'

  labelSumOut.textContent=Math.abs(
    account.movements
  .filter(mov=>mov<0)
  .reduce((a,b)=>a+b)
  )+'???'
  labelSumInterest.textContent=account.movements.
  filter(mov=>mov>0).map(mov=>mov*account.interestRate/100)
  .filter(mov=>mov>=1)
  .reduce((sum,mov)=>sum+mov).toFixed(2)+'???'
}




const createUsernames=(accounts)=>{
  accounts.forEach(account=>
    account.userName=account.owner.
    split(' ')
    .map(item=>item[0].toLocaleLowerCase()).join('')
    
    )
}
createUsernames(accounts)

let currentAccount;

btnLogin.addEventListener('click', (e)=>{
  e.preventDefault()
  

  currentAccount=accounts.find(account=>account.userName==inputLoginUsername.value)
  if( currentAccount?.pin==inputLoginPin.value*1){
    labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity='1';
    inputLoginUsername.value=inputLoginPin.value=''
    inputLoginPin.blur()


    updateUI(currentAccount)
    
  }
})
///transferin money to another Account
btnTransfer.addEventListener('click',(e)=>{
  e.preventDefault()
  const amount= Number(inputTransferAmount.value)
  const recievedAcc= accounts.find(acc=>acc.userName===inputTransferTo.value)
  
  inputTransferTo.value=inputTransferAmount.value=''


  if(amount>0&&
    currentAccount.balance>=amount&&
    recievedAcc&&
    recievedAcc?.userName!==currentAccount.userName)
    {
    currentAccount.movements.push(-amount)
    recievedAcc.movements.push(amount)
    
      updateUI(currentAccount)
  }
  

})

btnClose.addEventListener('click',(e)=>{
e.preventDefault()
const cloasedAccount=accounts.findIndex(account=>account.userName=inputCloseUsername.value)
console.log(cloasedAccount)

})
