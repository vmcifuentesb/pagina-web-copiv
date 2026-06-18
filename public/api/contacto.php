<?php
require_once __DIR__ . '/config.php';

$name    = htmlspecialchars($input['name'] ?? '', ENT_QUOTES, 'UTF-8');
$company = htmlspecialchars($input['company'] ?? '', ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars($input['email'] ?? '', ENT_QUOTES, 'UTF-8');
$phone   = htmlspecialchars($input['phone'] ?? '', ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($input['subject'] ?? 'Agentes de Seguridad', ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($input['message'] ?? '', ENT_QUOTES, 'UTF-8');

if (!$name || !$email || !$message) {
    jsonResponse(['success' => false, 'message' => 'Faltan campos requeridos (nombre, correo, mensaje)'], 400);
}

$emailSubject = "Nuevo contacto - $subject - $name";
$htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
body{font-family:sans-serif;color:#333;padding:20px}
h2{color:#E22732;border-bottom:2px solid #EFB810;padding-bottom:8px}
table{width:100%;border-collapse:collapse;margin:16px 0}
td{padding:8px 12px;border:1px solid #ddd;vertical-align:top}
td:first-child{font-weight:700;background:#f5f5f5;width:140px}
</style></head>
<body>
<h2>Nuevo mensaje de contacto</h2>
<table>
<tr><td>Nombre</td><td>$name</td></tr>
<tr><td>Empresa</td><td>$company</td></tr>
<tr><td>Correo</td><td>$email</td></tr>
<tr><td>Teléfono</td><td>$phone</td></tr>
<tr><td>Servicio</td><td>$subject</td></tr>
</table>
<h3>Mensaje:</h3>
<p>$message</p>
<hr><small style="color:#999">Enviado desde " . SITE_URL . "</small>
</body></html>
HTML;

if (sendMail(CONTACT_EMAIL, $emailSubject, $htmlBody)) {
    jsonResponse(['success' => true, 'message' => 'Mensaje enviado correctamente. Un asesor le responderá pronto.']);
} else {
    jsonResponse(['success' => false, 'message' => 'Error del servidor al enviar el mensaje'], 500);
}
