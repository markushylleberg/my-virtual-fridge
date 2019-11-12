<?php

$name = $_GET['name'];
$amount = $_GET['amount'];
$type = $_GET['type'];

$sjData = file_get_contents('data.json');
$jData = json_decode($sjData);

$newIngredientID = uniqid();

$newIngredient = new stdClass();

$newIngredient->id = $newIngredientID;
$newIngredient->name = $name;
$newIngredient->amount = $amount;
$newIngredient->type = $type;

$jData->ingredients->$newIngredientID = $newIngredient;

$sjData = json_encode($jData, JSON_PRETTY_PRINT);
file_put_contents('data.json', $sjData);

?>