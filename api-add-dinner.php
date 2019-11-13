<?php

    $dinner = $_GET['dinner'];
    $day = $_GET['day'];

    $sjData = file_get_contents('data.json');
    $jData = json_decode($sjData);

    $newDinnerID = uniqid();

    $newDinner = new stdClass();
    $newDinner->id = $newDinnerID;
    $newDinner->dinner = $dinner;
    $newDinner->day = $day;
    
    $jData->dinners->$newDinnerID = $newDinner;

    $sjData = json_encode($jData, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $sjData);

?>