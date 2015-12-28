/*验证码部分开始*/
var icBasePath = "http://www.mikuscallion.com/miku-ic/";
var icimg = document.getElementById("icimg");
var $icStatus = $("#icStatus");
var changeBtn = document.getElementById("changeBtn");
var userIcInput = document.getElementById("userIcInput");
var $icForm = $("#userResultForm");
var $submitBtn = $("#submitBtn");
var time;
//初始化
initIc();
//换一张
changeBtn.addEventListener("click",function(event){
    initIc();
});
$(icimg).load(function(){
    $icStatus.text("加载完成");
    $(changeBtn).show();
});
//表单提交
$icForm.submit(function(event){
    $submitBtn.hide();
    //获取用户输入
    var userIc = userIcInput.value;
    if(!userIc){
        alert("请输入验证码");
        $submitBtn.show();
        return false;
    }
    $.post(icBasePath+"checkic.php",{"userIc":userIc,"time":time},function(data){
        if(data == "true"){
            //alert("验证码输入正确！");
            /**/
            onIcOk();
        }else{
            alert("验证码输入错误！");
            $submitBtn.show();
            initIc();
        }
    });
    return false;
});
function initIc(){
    $icStatus.text("正加载中");
    $(changeBtn).hide();
    time = new Date().getTime();
    icimg.src = icBasePath+"getic.php?lang=zh&time="+time;
    userIcInput.value = "";
}
/*验证码部分结束*/

/*加密提交部分开始*/
var uploadBasePath = "http://www.mikuscallion.com/miku-rank/";
var rsa_n = "F8EB38B8E145D84ECE281123430B80112C617AA9D567394F46B921AA676304A0EA0467EA082E7505391073B398697789FE1B60290D6E540011D5386B6361128F74A548AB89152E04A9DE4BE2B7E85EEE9F96630FF54182ACE4E2FA6E59C97A4BF8BD09D3B3E9EE737BF29B25D29468B1A874B7E2C3A3FEDDA06F597E5BC69871";
function rsacode(orgstr){
    setMaxDigits(131); //131 => n的十六进制位数/2+3
    var key = new RSAKeyPair("10001", '', rsa_n); //10001 => e的十六进制
    var codestr = encryptedString(key, orgstr + '\x01'); //不支持汉字
    return codestr;
}
//当验证码已经通过之后
function onIcOk(){
    //console.log("ic is ok");
    var gameId = 1;
    var $userResultForm = $("#userResultForm");
    var $userNameInput = $("#userNameInput");
    //获取游戏ID（初始化写死），用户名，分数(已经缓存到session)
    var userName = $userNameInput.val();
    //对用户名进行初步检测
    if(userName==""){
        alert("用户名不能为空");
        $submitBtn.show();
        return false;
    }
    if(userName.length > 12){
        alert("用户名太长");
        $submitBtn.show();
        return false;
    }
    //提交数据
    
    $.post(uploadBasePath+"/rankbyscore/addinfo.php",{"gameId":gameId,"userName":userName},function(data){
        if(data == "true"){
            alert("恭喜您，分数已经成功提交（已经为您弹出排行版窗口，请解除拦截查看）");
            //模拟点击排行版
            var rankTableA = document.getElementById("rankTable");
            rankTableA.click();
        }else{
            $submitBtn.show();
            alert("对不起，分数提交失败，请检查网络后重试（本地项目无法使用排行榜）");
        }
    });
}
/*加密提交部分结束*/