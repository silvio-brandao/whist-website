<?php

/* SETTINGS */
$recipient = "silviobrandao99@gmail.com";
$subject = "WHIST - Orçamento";

if($_POST){

  /* DATA FROM HTML FORM */
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
//$phone = $_POST['phone'];


  /* SUBJECT */
  $emailSubject = $subject . " by " . $name;

  /* HEADERS */
  $headers = "From: $name <silviobrandao99@gmail.com>\r\n" .
             "Reply-To: $name <$email>\r\n" . 
             "Content-type: text/plain; charset=UTF-8\r\n" .
             "MIME-Version: 1.0\r\n" . 
             "X-Mailer: PHP/" . phpversion() . "\r\n";
 
  /* PREVENT EMAIL INJECTION */
  if ( preg_match("/[\r\n]/", $name) || preg_match("/[\r\n]/", $email) ) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    die("500 Internal Server Error");
  }

  /* MESSAGE TEMPLATE */
  $mailBody = "Name: $name\r\n" .
            "Email: $email\r\n" .
            "Subject: $subject\r\n" .
            "Message: $message";


  /* SEND EMAIL */
  mail($recipient, $emailSubject, $mailBody, $headers);

  if(mail($recipient, $emailSubject, $mailBody, $headers)) {
    echo "Mensagem enviada com sucesso!";
  } else {
    echo "Erro ao enviar a mensagem.";
  }
  
}
?>