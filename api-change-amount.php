<?php

    $id = $_GET['id'];
    $amount = $_GET['amount'];

    $sjData = file_get_contents('data.json');
    $jData = json_decode($sjData);


    $jData->ingredients->$id->amount = $amount;


    $sjData = json_encode($jData, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $sjData);

?>