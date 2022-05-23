<?php

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phoneNum = $_POST['phoneNum'];
$theme = $_POST['theme'];
$comment = $_POST['comment'];

// Формирование самого письма
$title = $theme;
$body = "
<h2>Сообщение с сайта:</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phoneNum<br><br>
<b>Сообщение:</b><br>$comment
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'libcon@yandex.ru'; // Логин на почте
    $mail->Password   = 'gmyzhmwznijcustc'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('libcon@yandex.ru', 'Сообщение от '.$name); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('libcon@yandex.ru');
    // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success"; $status = "Сообщение успешно отправленно";}
    else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);
