<?php
  $to = 'marvin@anders-handgemacht.de';
  $headers = array(
    'From' => 'info@anders-handgemacht.de',
    'X-Mailer' => 'PHP/' . phpversion()
  );

  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  if($name && $email && $message) {
    $subject = 'Eine nachricht von '. $email;
    $message = 'Diese E-Mail wurde von ' . $name . ' (' . $email . ") über das Kontaktformular Ihrer Webseite https://anders-handgemacht.de versendet.\n\nDie Nachricht:\n\n" . $message;
    mail($to, $subject, $message, $headers);
  } else {
    http_response_code(400);
  }
?>