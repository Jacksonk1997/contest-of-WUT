<?php
	$phonenum = $_GET["phonenum"];
	$passkey = md5($_GET["passkey"]);
	$nickname = $_GET["nickname"];
	$email = $_GET["email"];
	$locat = $_GET["locat"];
	$room = $_GET["room"];
	$dbhost = 'localhost:3306';
	$dbuser = 'root';
	$dbpass = 'HXCg0402.';
	$dbname = 'codepay';
	$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
	if(! $con) {
		echo 'Could not connect';
	}
	$sql = "INSERT INTO customer VALUES
	(NULL,'".$phonenum."','".$passkey."','".$nickname."','".$email."','".$locat."','".$room."',0,'false');";
	if($con->query($sql)){
		echo "成功";
	}else{
		echo "失败";
		echo $phonenum.$passkey.$nickname.$email.$locat.$room;
	}
	mysqli_close($con);	
?>