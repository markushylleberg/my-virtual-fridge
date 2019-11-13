<?php

    $id = $_GET['id'];
    $list = $_GET['list'];

    $sjData = file_get_contents('data.json');
    $jData = json_decode($sjData);


    if ( $list == 'ingredients' ) {

        foreach($jData->ingredients as $ingredient){
    
            if( $ingredient->id == $id ){
                unset($jData->ingredients->$id);
            } 
            
        }

    } else {

        foreach($jData->dinners as $dinner){
    
            if( $dinner->id == $id ){
                unset($jData->dinners->$id);
            } 
            
        }

    }


    $sjData = json_encode($jData, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $sjData);

    echo $list;

?>