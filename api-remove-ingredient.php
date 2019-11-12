<?php

    $id = $_GET['id'];

    $sjData = file_get_contents('data.json');
    $jData = json_decode($sjData);

    foreach($jData->ingredients as $ingredient){

        if( $ingredient->id == $id ){
            unset($jData->ingredients->$id);
        } 
        
    }

    $sjData = json_encode($jData, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $sjData);

?>