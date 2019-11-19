<?php

    $name = $_GET['name'];
    $amount = $_GET['amount'];

    $sjData = file_get_contents('data.json');
    $jData = json_decode($sjData);

    $newItemID = uniqid();

    $newItem = new stdClass();
    $newItem->id = $newItemID;
    $newItem->name = $name;
    $newItem->amount = $amount;
    $newItem->finished = 0;
    
    $jData->shoppinglist->$newItemID = $newItem;

    $sjData = json_encode($jData, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $sjData);



?>