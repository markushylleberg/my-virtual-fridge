<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">
    <link rel="stylesheet" href="https://bootswatch.com/4/yeti/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <title>My Virtual Fridge</title>
</head>
<body>

    <div class="container mt-3">

        <h1 class="display-4 text-center">
            <i class="fas fa-utensils text-primary"></i>
            My <span class="text-primary"><b>Virtual Fridge</b></span>
        </h1>

        <div class="row mt-5 text-center">

            <div class="col-6 bg-light p-5">

                <i class="fas fa-plus text-primary"></i>

                <h3 class="mt-3">Add new ingredient</h3>
                <form id="ingredientForm" class="mt-4">
                    <div class="form-group">
                        <label for="name">Name of ingredient</label>
                        <input type="text" id="name" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <input type="text" id="amount" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="type">Type</label>
                            <select class="form-control" id="type">
                                <option value="fruit">Fruit / vegetables</option>
                                <option value="meat">Meat</option>
                                <option value="conve">Convenience</option>
                                <option value="basic">Basic kitchen groceries</option>
                            </select>
                    </div>

                    <input type="submit" class="btn btn-primary mt-3" value="Add ingredient">

                </form>
            </div>

            <div class="col-6">

                    <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="ingredient-list">
                                <?php
                                    $sjData = file_get_contents('data.json');
                                    $jData = json_decode($sjData);

                                    foreach($jData->ingredients as $ingredient){
                                        echo '
                                        <tr id='.$ingredient->id.' class="'.$ingredient->type.'">
                                        <td>'.$ingredient->name.'</td>
                                        <td>'.$ingredient->amount.'</td>
                                        <td>'.$ingredient->type.'</td>
                                        <td><a href="#" class="btn btn-light delete">X</a></td>
                                        </tr>
                                    ';
                                    }

                                ?>
                            </tbody>
                        </table>

            </div>

        </div>
        
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="app.js"></script>
</body>
</html>