document.addEventListener("DOMContentLoaded", () => {
    const balance = document.getElementById("balance");
    const moneyPlus = document.getElementById("moneyplus");
    const moneyMinus = document.getElementById("moneyminus");
    const list = document.getElementById("list");
    const form = document.getElementById("form");
    const text = document.getElementById("text");
    const amount = document.getElementById("amount");
    const initialBalanceInput = document.getElementById("initialBalance");
    const setBalanceBtn = document.getElementById("setBalanceBtn");

    let totalIncome = 0;
    let totalExpense = 0;
    let transactions = [];

    function updateUI() {
        const totalBalance = totalIncome - totalExpense;
        balance.innerText = `₹${totalBalance.toFixed(2)}`;
        moneyPlus.innerText = `₹${totalIncome.toFixed(2)}`;
        moneyMinus.innerText = `₹${totalExpense.toFixed(2)}`;

        list.innerHTML = transactions.length === 0 ? "<li>No Transactions</li>" : "";
        transactions.forEach(transaction => {
            const li = document.createElement("li");
            li.innerHTML = `${transaction.text} <span>₹${Math.abs(transaction.amount).toFixed(2)}</span>`;
            list.appendChild(li);
        });
    }

    
    setBalanceBtn.addEventListener("click", () => {
        const enteredBalance = parseFloat(initialBalanceInput.value);

        if (isNaN(enteredBalance) || enteredBalance <= 0) {
            alert("Please enter a valid starting balance.");
            return;
        }

        totalIncome = enteredBalance;
        totalExpense = 0;
        transactions = [];

        updateUI();
        initialBalanceInput.value = ""; 
    });

  
    form.addEventListener("submit", (e) => {
        e.preventDefault();

       
        if (totalIncome <= 0) {
            alert("Insufficient Balance in your wallet. Please set a balance first.");
            return;
        }

        const transactionText = text.value.trim();
        const transactionAmount = parseFloat(amount.value);

        if (transactionText === "" || isNaN(transactionAmount) || transactionAmount <= 0) {
            alert("Please enter valid transaction details");
            return;
        }

        const totalBalance = totalIncome - totalExpense;
        if (transactionAmount > totalBalance) {
            alert("Limit exceeded. You cannot spend more than your available balance.");
            return;
        }

        transactions.push({ text: transactionText, amount: -Math.abs(transactionAmount) });
        totalExpense += Math.abs(transactionAmount);

        updateUI();
        text.value = "";
        amount.value = "";
    });

    updateUI();
});
