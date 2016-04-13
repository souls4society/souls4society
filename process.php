<?php

    $to = "tushar005cse@gmail.com";
    $from = $_POST['email'];
    $name = $_POST['name'];
    $headers = "From: $from";
    $subject = "You have a message.";

    

    $body = $_POST['message']."\n\n".$_POST['name'];

    if(mail($to, $subject, $body, $headers))
		Echo 'success';
?>
