<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
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

            <div class="col-md-6 bg-light p-5 col-sm-12">

                <i class="fas fa-carrot text-primary"></i>

                <h3 class="mt-3">Add new ingredient</h3>
                <form id="ingredientForm" class="mt-4">
                    <div class="form-group">
                        <label for="name">Name of ingredient</label>
                        <input type="text" id="name" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="amount">Amount (kg)</label>
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

            <div class="col-md-6 col-sm-12">

                <p class="text-left"><i>Total amount of ingredients: </i><b><span class="text-primary total-amount"></span></b></p>
                <div class="pre-scrollable">
                    <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th></th>
                                    <th></th>
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
                                        <td>'.$ingredient->amount.'kg</td>
                                        <td>'.$ingredient->type.'</td>
                                        <td><a href="#" class="btn btn-primary increase">+</a></td>
                                        <td><a href="#" class="btn btn-secondary decrease">-</a></td>
                                        <td><a href="#" class="btn btn-light delete">X</a></td>
                                        </tr>
                                    ';
                                    }

                                ?>
                            </tbody>
                        </table>
                    </div>
            </div>

        <div class="bg-lighter mt-3 col-md-6 col-sm-12 p-5">

            <i class="fas fa-utensils"></i>
            <h3 class="mt-3">Add dinner</h3>
                <form id="dinnerForm" class="mt-4">

                        <div class="form-group">
                            <label for="day">Day</label>
                                <select class="form-control" id="day">
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesay</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                        </div>

                        <div class="form-group">
                            <label for="dinner">Dinner</label>
                                <input type="text" id="dinner" class="form-control">
                        </div>

                        <input type="submit" class="btn btn-primary mt-3" value="Add dinner">
                </form>
        </div>

        <div class="bg-lighter mt-3 col-md-6 col-sm-12 p-5">
            
            <h4 class="display-6 text-center">
                What's for <span class="text-primary"><b>dinner</b></span> this week?
            </h4>

            <table class="table table-striped mt-3">
                <thead>
                    <th>Day</th>
                    <th>Dinner</th>
                    <th></th>
                </thead>
                <tbody id="dinner-list">
                    <?php
                        $sjData = file_get_contents('data.json');
                        $jData = json_decode($sjData);

                        foreach($jData->dinners as $dinner){
                            echo '
                            <tr id='.$dinner->id.'>
                            <td>'.$dinner->day.'</td>
                            <td>'.$dinner->dinner.'</td>
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