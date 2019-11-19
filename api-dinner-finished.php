<?php

    $id = $_GET['id'];
    $from = $_GET['from'];


    $sjData = file_get_contents('data.json');
    $jData = json_decode($sjData);

    if ( $from == 'dinner' ) {

        $jData->dinners->$id->finished = 1;
        
    } else if ( $from == 'shopping' ) {

        $jData->shoppinglist->$id->finished = 1;

    }


    $sjData = json_encode($jData, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $sjData);

?>