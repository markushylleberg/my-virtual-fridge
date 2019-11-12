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

            row.innerHTML = `
                                <td>${ingredient.name}</td>
                                <td>${ingredient.amount}</td>
                                <td>${ingredient.type}</td>
                                <td><a href="#" class="btn btn-light delete">X</a></td>
                            `;

            list.appendChild(row);

        }

        static removeIngredientFromList(e) {
            e.parentElement.parentElement.remove();

            const id = e.parentElement.parentElement.id;

            $.ajax({
                url: 'api-remove-ingredient.php?id='+id,
                method: 'GET'
            }).done( function(response) {
                console.log(response);
            });

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
        }

    }


// Automatically show ingredient-list
    // document.addEventListener('DOMContentLoaded', UI.showIngredients());

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


// Remove ingredient from list
    one('#ingredient-list').addEventListener('click', (e) => {
        if ( e.target.classList.contains('delete') ){
            UI.removeIngredientFromList(e.target);

        }
    })