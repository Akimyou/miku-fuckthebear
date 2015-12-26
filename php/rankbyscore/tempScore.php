<?php
    require("../rsa/rsa.php");
    session_start();//启用session
    $userPoint = 0;
    $userPoint = $_POST["userPoint"];
    //echo "密文:$userPoint";
    $userPoint = base64_encode(pack("H*", $userPoint));
    $userPoint = privatekey_decodeing($userPoint,$prikey,true);
    //echo "解析:$userPoint";
    if(preg_match('/^\d+$/i',$userPoint)){
        $_SESSION["userPoint"] = $userPoint;
        echo "You get ".$userPoint." point !";
    }else{
        $_SESSION["userPoint"] = 0;
        echo "You try to hack the game , fuck your mather !";
    }
?>