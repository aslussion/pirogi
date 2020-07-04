<?
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8;";
$email = 'aa@aa.aa';
$subj = 'Перезвоните';
$text = "Имя: ".$_GET['name']."<br>Телефон: ".$_GET['phone'];
if(!empty($_GET['phone']) && isset($_GET['antispam']) ){
	if(mail($email, $subj, $text, $headers))
		echo 'success';
}
else echo 'required';
?>