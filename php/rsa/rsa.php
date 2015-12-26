<?php
//私密钥，使用
//openssl genrsa -des3 -out prikey.pem 1024
//openssl rsa -in prikey.pem -out prikey.pem
//openssl rsa -in prikey.pem -pubout -out pubkey.pem
//openssl asn1parse -out temp.ans -i -inform PEM < prikey.pem
//生成公钥与密钥
//本地
//$prikey = '-----BEGIN RSA PRIVATE KEY-----
//MIICXQIBAAKBgQDSMiWb81YZdScIhy6AzTuyMSD5ivT2Y71m4CyN3MBP9TP8PJs9
//0us1Nbq054xvA51QAC/rebFCNwM5GdblsD2/cxn3VunyUS1daBuPIta60aPt9+UE
//V/ha88gJ1ghZGMBIt5I/rdYcPBAfcQkifWiPUf4cIgJXZEx11DPgDQpBtwIDAQAB
//AoGBAK2JX0mIte3grfA5gygtyPpN21aK5cFCCU4VCFO7DD83RssZ0mVRbIUKrfHL
//NUM2Lbut2+JCHxl2x79t2ODbB6432tnOA9PyiaBcjm1dTGZr8qF+SoRv0KJd/ySn
//RBKh15CY4mbO/skzGZGlr4h6jecP+bHe0QnK/oAcUVcYc1bBAkEA8i12zB7ylptO
//D8Phrne1eVqmxLzoniGTukCB9BcoVEu45YW1JuRscMmIPi5juOi7P3xuNXHJav3w
//fq2hPSjdFwJBAN4xYz8FmhBv+I7W4D9A1NPqpNzAntSb1Etkg/8G81X0DkriIqXq
//4wVlnYmX/8Chyr4cD1JRXnm7yCHiVuVK5GECQHX4ybcTmE7fZr5tSGHJ9MAh9b0+
//3P4zExiW1fdG1KGDpZVBdgZ1HZIvykuoI3HvBVAe2Dz2qgyRmXbMNBBr+I8CQHSl
//7PqbEETs48rpmBTdDl6q4x5ZqYjovk1OWdW7amiHljFOAu6kH8cnj8s6lzQkPHIN
///SU0PqseIHVZhFEgPkECQQCprY8jMCZhH/o5ZjWluVPsom+lWwoIXV8xfMoBUmH/
//dNELwwimfcF4RI5czRImElYloLKJLVXajtgz1OTd6nz7
//-----END RSA PRIVATE KEY-----
//';
//生成公钥与密钥
//服务器
$prikey = '-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQD46zi44UXYTs4oESNDC4ARLGF6qdVnOU9GuSGqZ2MEoOoEZ+oI
LnUFORBzs5hpd4n+G2ApDW5UABHVOGtjYRKPdKVIq4kVLgSp3kvit+he7p+WYw/1
QYKs5OL6blnJekv4vQnTs+nuc3vymyXSlGixqHS34sOj/t2gb1l+W8aYcQIDAQAB
AoGBAKBoLLhva2wWdKG7UYbuDUyD1hmPAlevxdeki/5c+6FK9SN7t4QoM/72pBR7
gtdMUl+vUouB/Twig1ttLT7wml0UhvoT4R1inVb0xRIsj+PKUygxog5luc0KZPYE
RVxDjvrJHzK2JXcumuTiDbAhTXt6CPAMV9cFFLdyllNrFiLxAkEA/x+S6WM1DyON
NoYZGdIUNhj9rYBmCUM0RI4aR3Fp0uKDRAefDHhTqqlwz/R/YfF9lf4hfZ+URn0I
dPdimmL4FQJBAPnGMJLUcTNq8YUw4mr0/knlSCO6ohEL2hiG91xIsgms3KWRTydC
ADT3jwU9wyYptQFozxZueLa/k24VI1eRee0CQDc6M4hYVIUZchlKgCaJxpxLXqbv
c6cvqCHrDR9IGttu83GHoNOHPL1l/qjVybl/GGue3ssd/3Ae4vTHFM5M/F0CQC4r
NjtNzYblk7M87/05P+/E0+rWyrI/8JZsDDkgrtge/cIU8/6bspIX2HXtjq71MqIK
D41j6ihNjSDiA2BiYZkCQERzzXZbVpfOr/1MpkGOoKiq5KCPi1G0wrFCpnjv2X8G
hE504YiwudF6P+DjSoMj6m+se8jTsuiuE/RYhJKy5Ag=
-----END RSA PRIVATE KEY-----
';
/** 
 * 私钥解密 
 * 
 * @param string 密文（二进制格式且base64编码） 
 * @param string 私人密钥内容
 * @param string 密文是否来源于JS的RSA加密 
 * @return string 明文 
 */  
function privatekey_decodeing($crypttext, $prikey, $fromjs = FALSE)  
{  
    $prikeyid    = openssl_get_privatekey($prikey);  
    $crypttext   = base64_decode($crypttext);  
    $padding = $fromjs ? OPENSSL_NO_PADDING : OPENSSL_PKCS1_PADDING;  
    if (openssl_private_decrypt($crypttext, $sourcestr, $prikeyid, $padding))  
    {  
        $temp = $fromjs ? rtrim(strrev($sourcestr), "/0") : "".$sourcestr;
        $temp = trim($temp);
        $temp = substr($temp,0,strlen($temp)-1);
        return $temp;
    }
    //解密失败
    return false;  
}
?>