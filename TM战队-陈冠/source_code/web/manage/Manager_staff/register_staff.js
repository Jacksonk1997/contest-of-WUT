

var register_Btn = document.getElementById("register");

register_Btn.onclick = function(){
	var phoneNum = document.getElementById("phoneNum").value;
	var nickName = document.getElementById("nickname").value;
	var Password = document.getElementById("Password").value;
	var repeatPassword = document.getElementById("repeatPassword").value;
	var Email = document.getElementById("email").value;
	var Location = document.getElementById("location").value;
	var vertificationCode = validateCode();
	if(!vertificationCode){
		return ;
	}else if(phoneNum==""||nickName==""||Password==""||repeatPassword==""||Email==""||Location==""){
		alert("请填写完整！");
		createCode();
		return ;
	}else if(Password!=repeatPassword){
		alert("两次密码输入不一致！");
		createCode();
		return ;
	}else if(!checkemail(Email)){
		alert("邮箱错误！");
		createCode();
		return ;
	}else if(!checklocation(Location)){
		createCode();
		return ;
	}else if(phoneNum.length!=11){
		alert("手机号长度有问题！");
		createCode();
		return ;
	}else if(nickName.length>10){
		alert("昵称长度错误！");
		createCode();
		return ;
	}else if(alreadyExist(phoneNum,nickName,Email)){
		alert("手机号邮箱或昵称已存在！");
		createCode();
		return ;
	}else{
		setnewMember(phoneNum,Password,nickName,Email,Location);
	}
}



function alreadyExist(phonenum,nickname,email){
	var txtHttp = GetXmlHttpObject();
	var url="/web/manage/Manager_staff/alreadyExist.php";
	url = url + "?s_phonenum=" + phonenum;
	url = url + "&s_nickname=" + nickname;
	url = url + "&s_email=" + email;
	url = url + "&sid="+ Math.random();
	txtHttp.open("POST",url,false);
	txtHttp.send(null);
	if (txtHttp.readyState==4 || txtHttp.readyState=="complete"){ 
		if(txtHttp.responseText=="1"){
			return false;
		}else{
			return true;
		}
	}
}

function setnewMember(phonenum,passkey,nickname,email,locat){
	var setCusHttp = GetXmlHttpObject();
	var url="/web/manage/Manager_staff/setnewStaff.php";
	url = url + "?phonenum=" + phonenum;
	url = url + "&passkey=" + passkey;
	url = url + "&nickname=" + nickname;
	url = url + "&email=" + email;
	url = url + "&locat=" + locat;
	url = url + "&sid="+ Math.random();
	setCusHttp.open("POST",url,false);
	setCusHttp.send(null);
	if (setCusHttp.readyState==4 || setCusHttp.readyState=="complete"){ 
		if(setCusHttp.responseText=="成功"){
			alert("注册成功！");
			window.location.href = "m_page_staff.php";
		}else{
			alert("程序运行错误 请及时联系15171801220！");
			createCode();
			return ;
		}
	}
}

function checkemail( email_address ){
 	var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	if ( regex.test( email_address ) ){
        return true;
	}else{
        return false;
	}
}


function checklocation(element){
 	var regex = /^[X|D]\d{1,2}$/;
	if ( regex.test( element ) ){
        return true;
	}else{
		alert("地址输入错误！")
        return false;
	}
}	




//			var xmlHttp = GetXmlHttpObject();
//			var url="pushall_message.php";
//			url=url+"?sid="+Math.random();
//			xmlHttp.onreadystatechange=stateChanged;
//			xmlHttp.open("POST",url,false);
//			xmlHttp.send(null);
//			function stateChanged(){
//				if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
//			 		document.write(xmlHttp.responseText);
//			 		return ;
//				}
//			}


function GetXmlHttpObject(){
	var xmlHttp=null;
	try{
		xmlHttp=new XMLHttpRequest();
	}catch (e){
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}


var code;
function createCode() {
    code = "";
    var codeLength = 6; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) 
    {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
    }
    if (checkCode) 
    {
        checkCode.className = "code";
        checkCode.innerHTML = code;
    }
    document.getElementsByClassName("code")[0].style.backgroundImage = "url(../img/verication_Imag/ver"+String(parseInt(Math.random()*10))+".jpg)";
}
function validateCode() 
{
    var inputCode = document.getElementById("inputCode").value;
    if (inputCode.length <= 0) 
    {
        alert("请输入验证码！");
        return false;
    }
    else if (inputCode.toUpperCase() != code.toUpperCase()) 
    {
        alert("验证码输入有误！");
        createCode();
        return false;
    }
    else 
    {
        return true;
    }        
}