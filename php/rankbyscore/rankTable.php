<?php
    include_once("config.php");
    session_start();//启用session
    $gameId = $_SESSION["gameId"];
    if(!isset($gameId)){
        $gameId = $_GET["gameId"];
    }
    if(!isset($gameId)){
        echo "404";
        exit(0);
    }
    $userName = $_SESSION["userName"];
    $userPoint = $_SESSION["userPoint"];
    
    //echo $gameId.",".$userName.",".$userPoint;
    /*游戏名称*/
    $sql_gameName = "SELECT game.gname FROM game,gameinfo WHERE game.gid = $gameId";
    //echo $sql_gameName;
    $result_gName = mysql_query($sql_gameName);
    while($row_gname = mysql_fetch_array($result_gName)){
        $gameName = $row_gname["gname"];
        break;
    }
    /*排行榜*/
    $sql = "SELECT uname,score,date_format(sdate, '%y-%m-%d %H:%i') sdate FROM gameinfo ORDER BY score DESC,sdate DESC";
    $_result = mysql_query($sql);
    /*查找该玩家的排名*/
    $userP = 1;
    while($_row = mysql_fetch_array($_result)){
        if($_row["uname"] == $userName && $_row["score"]==$userPoint){
            $userRank = $userP;
            break;
        }
        $userP++;
    }
?>
<!--html代码部分-->
<!doctype>
<html>
<head>
    <meta charset="utf-8" />
    <title>排行榜</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
    <!--承载榜单的面板-->
    <div class="contaner">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 classclass="panel-title" align="center">
                    <strong><b><?php echo $gameName ?></b>排行榜</strong>
                </h3>
                <h5 align="center">
                    <?php
                    if(isset($userName)&&isset($userPoint)){
                    ?>
                    <div>
                        <label><?php echo $userName; ?>&nbsp;&nbsp;您的分数为：<?php echo "&nbsp;".$userPoint; ?></label>&nbsp;&nbsp;
                        <label>当前排名：<?php echo "&nbsp;".$userRank; ?></label>
                        <br />
                        <br />
                        <a href="javascript:history.go(-1);"  class="btn btn-success">再玩一遍</a>
                    </div>
                    <?php
                        }
                    else{
                    ?>
                       <a href="http://www.mikuscallion.com/miku-game/mygames/new_fuckthebear/" target="_blank" class="btn btn-success">我来玩一次</a> 
                    <?php
                    }
                    ?>
                </h5>
                
                    
                
            </div>
            
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-offset-2 col-md-8">
                        <table class="table table-hover">
                            <thead>
                                <th>排名</th>
                                <th>玩家名称</th>
                                <th>得分</th>
                                <th>日期</th>
                            </thead>

                            <?php
                                $rankID = 1;
                                
                                $result = mysql_query($sql);
                                while($row = mysql_fetch_array($result)){
                                    $uname = $row["uname"];
                                    $score = $row["score"];
                                    $sdate = $row["sdate"];

                                    echo "<tr>";
                                        echo "<td>";
                                            echo "$rankID";
                                        echo "</td>";
                                        echo "<td>";
                                            echo "$uname";
                                        echo "</td>";
                                        echo "<td>";
                                            echo "$score";
                                        echo "</td>";
                                        echo "<td>";
                                            echo "$sdate";
                                        echo "</td>";
                                    echo "</tr>";

                                    $rankID++;
                                }
                            ?>

                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</html>

























