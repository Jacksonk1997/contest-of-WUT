<?php
	$m_content = $_GET["m_content"];
	$m_data = $_GET["m_data"];
	$m_from = $_GET["m_from"];
	$dbhost = 'localhost:3306';
	$dbuser = 'root';
	$dbpass = 'HXCg0402.';
	$dbname = 'wife_db';
	$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
	if(! $con) {
		echo 'Could not connect';
	}
	$sql = "SELECT COUNT(m_id) FROM message";
	$result = $con->query($sql);
	$row = mysqli_fetch_Array($result);
	$sql = "INSERT INTO message VALUES('".$row[0]."','".$m_content."','".$m_data."','".$m_from."');";
	$con->query($sql);
	mysqli_close($con);
?>