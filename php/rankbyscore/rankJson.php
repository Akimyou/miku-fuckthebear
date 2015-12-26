<?php
    include("../rankbyscore/config.php");
    
    //查询排行榜
    $sql = "SELECT uname,score,date_format(sdate, '%y-%m-%d %H:%i') sdate FROM gameinfo ORDER BY score DESC,sdate DESC";

    $result = mysql_query($sql);

    while($row = mysql_fetch_object($result)){
        $arrPHPobj[] = $row;
    }

    $rankJson = json_encode($arrPHPobj);

    echo $rankJson;










?>