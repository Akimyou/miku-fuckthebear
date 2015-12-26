<?php 
    header("Content-Type:text/html;charset=utf-8");    
    $host = "localhost";
    $root = "root";
    $password = "MIKU@941004";
    $dbName = "score_rank";

//    $host = "localhost";
//    $root = "root";
//    $password = "";
//    $dbName = "games";

    $conn = mysql_connect($host,$root,$password);
    mysql_select_db($dbName);
    mysql_query("set names utf8");
?>