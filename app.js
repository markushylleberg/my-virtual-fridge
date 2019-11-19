// Helper functions
    one = function(el){ return document.querySelector(el) }
    all = function(el){ return document.querySelectorAll(el) }

// Our array

    let aIngredients = [];


// Ingredient constructor
    class Ingredient {
        constructor(name, amount, type) {
            this.name = name;
            this.amount = amount;
            this.type = type;
        }
    }

// Dinner constructor
    class Dinner {
        constructor(dinner, day) {
            this.dinner = dinner;
            this.day = day;
        }
    }

// Item constructor
    class Item {
        constructor(name, amount) {
            this.name = name;
            this.amount = amount;
        }
    }

// JSON
    class MyJSON {

        static addIngredientToJSON(ingredient){

            $.ajax({
                url: `api-add-ingredient.php?name=${ingredient.name}&amount=${ingredient.amount}&type=${ingredient.type}`,
                method: 'GET'
            }).done( function(response){
                console.log(response);
            } )
            
        }

        static changeAmountOnIngredient(id, amount){

                $.ajax({
                    url: `api-change-amount.php?id=${id}&amount=${amount}`,
                    method: 'GET'
                }).done( function(response){
                    console.log(response);
                } )

        }

        static addDinnerToList(dinner){

            $.ajax({
                url: `api-add-dinner.php?dinner=${dinner.dinner}&day=${dinner.day}`,
                method: 'GET'
            }).done( function(response) {
                console.log(response);
            })

        }

        static markItemAsFinished(e, from){

            const id = e.parentElement.parentElement.id;

            $.ajax({
                url: 'api-dinner-finished.php?id='+id+'&from='+from,
                method: 'GET'
            }).done( function(response) {
                console.log(response);
            })

        }

        static addItemToList(item) {

            $.ajax({
                url: `api-add-item.php?name=${item.name}&amount=${item.amount}`,
                method: 'GET'
            }).done( function(response) {
                console.log(response);
            })

        }

    }

// UI
    class UI {

        static showIngredients() {

            const ingredients = aIngredients;

            ingredients.forEach((ingredient) => UI.addIngredientToList(ingredient));

        }

        static addIngredientToList(ingredient) {

            const list = one('#ingredient-list');

            const row = document.createElement('tr');

            row.classList = ingredient.type;

            row.innerHTML = `
                                <td>${ingredient.name}</td>
                                <td>${ingredient.amount}kg</td>
                                <td>${ingredient.type}</td>
                                <td><a href="#" class="btn btn-primary increase">+</a></td>
                                <td><a href="#" class="btn btn-light decrease">-</a></td>
                                <td><a href="#" class="btn btn-light delete">X</a></td>
                            `;

            list.appendChild(row);

            UI.updateTotalAmount();

        }

        static addDinnerToList(dinner) {

            const list = one('#dinner-list');

            const row = document.createElement('tr');

            row.innerHTML = `
                            <td>${dinner.day}</td>
                            <td>${dinner.dinner}</td>
                            <td><button href="#" class="btn btn-light finished">✓</button></td>
                            <td><button href="#" class="btn btn-light delete">X</button></td>
                            `;

            list.appendChild(row);

        }

        static addItemToList(item) {

            const list = one('#shopping-list');

            const row = document.createElement('tr');

            row.innerHTML = `
                            <td>${item.name}</td>
                            <td>${item.amount}</td>
                            <td><button href="#" class="btn btn-light finished">✓</button></td>
                            <td><button href="#" class="btn btn-light delete">X</button></td>
                            `;

            list.appendChild(row);

        }


        static removeFromList(e, from) {

            e.parentElement.parentElement.remove();

            const id = e.parentElement.parentElement.id;

            if ( from == 'ingredient-list' ){

                $.ajax({
                    url: 'api-remove-ingredient.php?id='+id+'&list=ingredients',
                    method: 'GET'
                }).done( function(response) {
                    console.log(response);
                });
    
                UI.updateTotalAmount();

            } else if ( from == 'dinner-list' ){

                $.ajax({
                    url: 'api-remove-ingredient.php?id='+id+'&list=dinners',
                    method: 'GET'
                }).done( function(response) {
                    console.log(response);
                });

            } else if ( from == 'shopping-list' ){

                $.ajax({
                    url: 'api-remove-ingredient.php?id='+id+'&list=shopping',
                    method: 'GET'
                }).done( function(response) {
                    console.log(response);
                });

            }

        }

        static changeAmountOnIngredient(e, action) {
            
            const id = e.parentElement.parentElement;

            let currentAmount = id.firstChild.nextElementSibling.nextElementSibling;

            let strippedAmount = currentAmount.innerHTML.replace(/[^0-9.]/g, "");

            let newAmount;

            if ( action == 'increase' ){

                let increasedAmount = strippedAmount*1.3;
    
                currentAmount.innerHTML = increasedAmount.toFixed(2)+'kg';
    
                newAmount = increasedAmount.toFixed(2);
    
                MyJSON.changeAmountOnIngredient(id.id, newAmount);

            } else if ( action == 'decrease' ){

                let increasedAmount = strippedAmount*0.7;

                currentAmount.innerHTML = increasedAmount.toFixed(2)+'kg';

                newAmount = increasedAmount.toFixed(2);

                MyJSON.changeAmountOnIngredient(id.id, newAmount);
            }

            UI.showMessage(id.firstChild.nextElementSibling.innerHTML+' has been updated to '+ newAmount +'kg!', 'alert-success');

        }

        static markDinnerAsFinished(e, from) {

            e.parentElement.parentElement.classList.toggle('finished-style');

            MyJSON.markItemAsFinished(e, from);
    
        }

        static updateTotalAmount() {

            let amount = all('#ingredient-list tr').length;
            let amountText = one('.total-amount');

            amountText.innerHTML = amount;

        }

        static showMessage(message, style) {

            const container = one('.container');

            const div = document.createElement('div');

            div.className = `alert ${style} mt-3 text-center`;
            div.innerHTML = message;

            container.appendChild(div);

            setTimeout(() => one('.alert').remove(), 2000);

        }

        static clearFields(){
            const name = one('#name').value = '';
            const amount = one('#amount').value = '';
            const dinner = one('#dinner').value = '';
            const itemName = one('#itemName').value = '';
            const itemAmount = one('#itemAmount').value = '';
        }

    }


// Automatically update ingredient amount
    document.addEventListener('DOMContentLoaded', UI.updateTotalAmount());

// New ingredient submit
    one('#ingredientForm').addEventListener('submit', (e) => {

        e.preventDefault();

        const name = one('#name').value;
        const amount = one('#amount').value;
        const type = one('#type').value;

        if ( name == '' || amount == '' || type == '' ) {

            UI.showMessage('Please fill out everything in the form', 'alert-danger');

        } else {

            const ingredient = new Ingredient(name, amount, type);
    
            aIngredients.push(ingredient);
    
            UI.addIngredientToList(ingredient);

            MyJSON.addIngredientToJSON(ingredient);

            UI.showMessage('A new ingredient has been added', 'alert-success');
            
            UI.clearFields();

        }

    });

// New dinner submit
    one('#dinnerForm').addEventListener('submit', (e) => {

        e.preventDefault();

        const dinner = one('#dinner').value;
        const day = one('#day').value;

        if ( dinner == '' ) {

            UI.showMessage('Please fill out everything in the form', 'alert-danger');

        } else {

            const newDinner = new Dinner(dinner, day);

            UI.addDinnerToList(newDinner);

            MyJSON.addDinnerToList(newDinner);

            UI.showMessage('A new dinner has been added', 'alert-success');

            UI.clearFields();

        }

    });

    one('#shoppingForm').addEventListener('submit', (e) => {

        e.preventDefault();

        const name = one('#itemName').value;
        const amount = one('#itemAmount').value;

        if ( name == '' || amount == '' ) {


            UI.showMessage('Please fill out everything in the form', 'alert-danger');

        } else {

            const newShoppingItem = new Item(name, amount);

            UI.addItemToList(newShoppingItem);

            MyJSON.addItemToList(newShoppingItem);

            UI.showMessage('A new dinner has been added', 'alert-success');

            UI.clearFields();

        }




    })


// Edit ingredients from list
    one('#ingredient-list').addEventListener('click', (e) => {
        if ( e.target.classList.contains('delete') ){
            UI.removeFromList(e.target, 'ingredient-list');

        } else if ( e.target.classList.contains('increase') ){
            UI.changeAmountOnIngredient(e.target, 'increase');
        } else if ( e.target.classList.contains('decrease') ){
            UI.changeAmountOnIngredient(e.target, 'decrease');
        }
    });

    one('#dinner-list').addEventListener('click', (e) => {
        if ( e.target.classList.contains('delete') ){
            UI.removeFromList(e.target, 'dinner-list');
        } else if ( e.target.classList.contains('finished') ){
            UI.markDinnerAsFinished(e.target, 'dinner');
        }

    })

    one('#shopping-list').addEventListener('click', (e) => {
        if ( e.target.classList.contains('delete') ){
            UI.removeFromList(e.target, 'shopping-list');
        } else if ( e.target.classList.contains('finished') ){
            UI.markDinnerAsFinished(e.target, 'shopping');
        }
    })