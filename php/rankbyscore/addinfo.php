<?php
    include_once("config.php");
    session_start();//启用session
    $gameId = $_POST["gameId"];
    $userName = $_POST["userName"];
    $userName = substr($userName,0,12);
    $userPoint = $_SESSION["userPoint"];
    $datetime = date('Y-m-d H:i',time());
    /*录入数据库*/
    $addsql = "INSERT INTO gameinfo(gid,uname,score,sdate)VALUES('$gameId','$userName',$userPoint,'$datetime')";
    mysql_query($addsql);
    //存储session
    $_SESSION["gameId"] = $gameId;
    $_SESSION["userName"] = $userName;
    $_SESSION["userPoint"] = $userPoint;
    echo "true";
?>