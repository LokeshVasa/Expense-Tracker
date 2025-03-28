// Wait for the entire HTML content to load before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Get references to HTML elements
    const balance = document.getElementById("balance"); // Balance display element
    const moneyPlus = document.getElementById("moneyplus"); // Income display element
    const moneyMinus = document.getElementById("moneyminus"); // Expense display element
    const list = document.getElementById("list"); // Transaction list
    const form = document.getElementById("form"); // Form element for adding transactions
    const text = document.getElementById("text"); // Input field for transaction description
    const amount = document.getElementById("amount"); // Input field for transaction amount
    const initialBalanceInput = document.getElementById("initialBalance"); // Input for setting initial balance
    const setBalanceBtn = document.getElementById("setBalanceBtn"); // Button to set initial balance

    // Variables to track financial data
    let totalIncome = 0; // Stores total income (initial balance)
    let totalExpense = 0; // Stores total expenses
    let transactions = []; // Stores list of transactions

    // Function to update the UI based on current financial data
    function updateUI() {
        const totalBalance = totalIncome - totalExpense; // Calculate the  remaining balance

        // Update balance, income, and expense on the screen
        balance.innerText = `₹${totalBalance.toFixed(2)}`;
        moneyPlus.innerText = `₹${totalIncome.toFixed(2)}`;
        moneyMinus.innerText = `₹${totalExpense.toFixed(2)}`;

        // Clear the transaction list and show "No Transactions" if empty
        list.innerHTML = transactions.length === 0 ? "<li>No Transactions</li>" : "";

        // Loop through transactions and display each one in the list
        transactions.forEach(transaction => {
            const li = document.createElement("li"); // Create a new list item
            li.innerHTML = `${transaction.text} <span>₹${Math.abs(transaction.amount).toFixed(2)}</span>`;
            list.appendChild(li); // Add the transaction to the list
        });
    }

    // Event listener for setting the initial balance
    setBalanceBtn.addEventListener("click", () => {
        const enteredBalance = parseFloat(initialBalanceInput.value); // Get user input and convert to a number

        // Check if input is a valid number greater than 0
        if (isNaN(enteredBalance) || enteredBalance <= 0) {
            alert("Please enter a valid starting balance."); // Show an error message if invalid
            return;
        }

        // Set the total income as the entered balance, reset expenses and transactions
        totalIncome = enteredBalance;
        totalExpense = 0;
        transactions = [];

        // Update the UI to reflect the new balance
        updateUI();

        // Clear the input field after setting the balance
        initialBalanceInput.value = ""; 
    });

    // Event listener for handling transaction form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page refresh on form submission

        // Check if a balance is set before allowing transactions
        if (totalIncome <= 0) {
            alert("Insufficient Balance in your wallet. Please set a balance first.");
            return;
        }

        const transactionText = text.value.trim(); // Get transaction description
        const transactionAmount = parseFloat(amount.value); // Get transaction amount and convert to number

        // Validate user input (should not be empty, NaN, or zero)
        if (transactionText === "" || isNaN(transactionAmount) || transactionAmount <= 0) {
            alert("Please enter valid transaction details");
            return;
        }

        // Calculate remaining balance
        const totalBalance = totalIncome - totalExpense;

        // Check if the transaction exceeds available balance
        if (transactionAmount > totalBalance) {
            alert("Limit exceeded. You cannot spend more than your available balance.");
            return;
        }

        // Add the new expense transaction (negative value for spending)
        transactions.push({ text: transactionText, amount: -Math.abs(transactionAmount) });

        // Update total expense
        totalExpense += Math.abs(transactionAmount);

        // Update UI to reflect new transaction
        updateUI();

        // Clear input fields after adding the transaction
        text.value = "";
        amount.value = "";
    });

    // Initial UI update when the page loads
    updateUI();
});