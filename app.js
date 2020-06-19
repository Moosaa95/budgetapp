class UI {
    constructor(){
        this.budgetInput = document.querySelector('#budgetInput')
        this.budgetForm = document.querySelector("#budgetForm")
        this.container = document.querySelector(".container")
        this.allBeb = document.querySelector("#allBeb")
        this.totalBudget = document.querySelector("#totalBudget")
        this.btnBudget = document.querySelector("#btnBudget")
        this.budgetIcon = document.querySelector("#budgetIcon")
        this.budgetSign = document.querySelector("#budgetSign")
        this.budgetAmount = document.querySelector("#budgetAmount")
        this.expenseIcon = document.querySelector("#expenseIcon")
        this.expenseTotal = document.querySelector("#expenseTotal")
        this.expenseSign = document.querySelector("#expenseSign")
        this.expenseAmount = document.querySelector("#expenseAmount")
        this.balanceTotal = document.querySelector("#balanceTotal")
        this.balanceIcon = document.querySelector("#balanceIcon")
        this.balanceSign = document.querySelector("#balanceSign")
        this.balanceSignClass = document.querySelector(".balance-sign")
        this.balanceAmount = document.querySelector("#balanceAmount")
        this.expenseForm = document.querySelector("#expenseForm")
        this.expensesInput = document.querySelector("#expensesInput")
        this.expensesInputAmount = document.querySelector("#expensesInputAmount")
        this.btnExpense = document.querySelector("#btnExpense")
        this.allTitle = document.querySelector("#allTitle")
        this.expenseTitle = document.querySelector("#expenseTitle")
        this.expenseValue = document.querySelector("#expenseValue")        
        this.expenseList = document.querySelector("#expenseList")        
        this.tableList = document.querySelector("#tableList")  
        this.listItems = document.querySelector("#listItems")  

        this.feedBack = document.querySelector(".feed-back")
        this.expenseFeedback =  document.querySelector(".expenseFeedback")
        this.teamList = []
        this.teamID = 0

    }
    //creating the submitbtn
    submitBudgetForm(){
        const value = this.budgetInput.value
        if(value === "" || value < 0){
            this.feedBack.classList.add("showItem")
            this.feedBack.innerHTML = `<p>value added cannot be zero or less than zero</p>`
            setTimeout(() => this.feedBack.classList.remove("showItem"), 3000)  
        }
        else{
            this.budgetAmount.textContent =  value
            this.budgetInput.value = ""
            this.showBalance()
        }
    }
    //show balance
    showBalance(){
        const expense = this.totalExpense()
        const total = parseInt(this.budgetAmount.textContent) - expense
        this.balanceAmount.textContent = total
        if(total < 0){
            this.balanceSignClass.classList.remove("showBlack", "showGreen")
            this.balanceSignClass.classList.add("showRed")
        }
        else if(total > 0){
            this.balanceSignClass.classList.remove("showRed", "showBlack")
            this.balanceSignClass.classList.add("showGreen")
        }
        else if(total === 0){
            this.balanceSignClass.classList.remove("showRed", "showGreen")
            this.balanceSignClass.classList.add("showBlack")
        }
    }
    //submitExpense form
    submitExpenseForm(){
        //calling the variables
        const expensesInput = this.expensesInput.value
        const expensesInputAmount = this.expensesInputAmount.value

        if(expensesInput === "" || expensesInputAmount === "" || expensesInputAmount < 0 ){
            this.expenseFeedback.classList.add("showExpenseItem")
            this.expenseFeedback.innerHTML = `<p> value cannot be left blank </p>`
            setTimeout(() => this.expenseFeedback.classList.remove('showExpenseItem'), 3000)
        }else{
            //converting the expensesInputAmount to int and storing it in a variable
            const amount = parseInt(expensesInputAmount)
            this.expensesInput.value = ''
            this.expensesInputAmount.value = ''

            let expense = {
                id:this.teamID,
                title : expensesInput,
                amount : amount,
            }
            this.teamID++;
            this.teamList.push(expense)
            this.addExpense(expense)
            this.showBalance()
            //show balance
        }

    }
    //add expense
    addExpense(expense){
        const tr = document.createElement('tr')
        /* tr.classList.add("expense") */
        tr.innerHTML = `
        
                <td>${expense.title}</td>
                <td>${expense.amount}</td>
                    <td><a href="#" class= "edit-icon" data-id="${expense.id}">
                        <i class="fas fa-edit"></i>
                    </a></td>
                    <td><a href="#" class= "delete-icon" data-id="${expense.id}">
                        <i class="fas fa-trash"></i>
                    </a></td>
                    
        `
        this.listItems.appendChild(tr)
    }

    //total expense
    totalExpense(){
        let total = 0
        if(this.teamList.length > 0){
            //using this es6 function is the same as saying 
            /* total = this.teamList.reduce(function(acc, curr){
                acc += curr.amount
                return acc
            }, 0) */
            total = this.teamList.reduce((acc, curr) => acc += curr.amount,0)
        }
        this.expenseAmount.textContent = total
        return total
        
    }
    editExpense(element){
        let id = parseInt(element.dataset.id)
        let parent = element.parentElement.parentElement
        

        //remove from the dom
        this.listItems.removeChild(parent)
        //remove from the list
        let expense  = this.teamList.filter((item) => {
            return item.id === id
        })
        //show value 
        this.expensesInput.value = expense[0].title
        this.expensesInputAmount.value = expense[0].amount

        //remove from temp list
        let tempList = this.teamList.filter((item) => {
            return item.id !== id
        })
        this.teamList = tempList
        this.showBalance()

    }
    deleteExpense(element){
        let id = parseInt(element.dataset.id)
        let parent = element.parentElement.parentElement
        

        //remove from the dom
        this.listItems.removeChild(parent)
        //remove from the list
        let expense  = this.teamList.filter((item) => {
            return item.id === id
        })
        let tempList = this.teamList.filter((item) => {
            return item.id !== id
        })
        this.teamList = tempList
        this.showBalance()

    }

    
}

//creating the eventListener function to instantiate from the class UI

function eventListener(){
    //getting the variables 
    const budgetForm = document.querySelector("#budgetForm")
    const expenseForm = document.querySelector("#expenseForm")
    const expenseList = document.querySelector("#expenseList")


    //instantiating the class UI
    const ui = new UI()

    //getting submit event from the budget form
    budgetForm.addEventListener('submit', function(event) {
        //stop form from submitting automatically
        event.preventDefault()
        ui.submitBudgetForm()
    })

    
    //getting submit event from the expense form
    expenseForm.addEventListener('submit', function(event) {
        //stop form from submitting automatically
        event.preventDefault()
        ui.submitExpenseForm()
    })

    //getting click event from the expense list
    expenseList.addEventListener('click', function(event) {
        //getting edit event from the parent element 
        if(event.target.parentElement.classList.contains("edit-icon")){
            ui.editExpense(event.target.parentElement)
        }
        else if(event.target.parentElement.classList.contains("delete-icon")){
            ui.deleteExpense(event.target.parentElement)
        }
    })


}

//adding the DOMLoader
document.addEventListener('DOMContentLoaded', function(){
    eventListener()
})

