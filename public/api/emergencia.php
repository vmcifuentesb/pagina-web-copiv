<?php
require_once __DIR__ . '/config.php';

$name = htmlspecialchars($input['name'] ?? '', ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($input['phone'] ?? '', ENT_QUOTES, 'UTF-8');
$desc = htmlspecialchars($input['desc'] ?? '', ENT_QUOTES, 'UTF-8');

if (!$name || !$phone || !$desc) {
    jsonResponse(['success' => false, 'message' => 'Faltan campos requeridos (nombre, teléfono, descripción)'], 400);
}

$emailSubject = "🚨 ALERTA DE CRISIS - $name";
$htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
body{font-family:sans-serif;color:#333;padding:20px}
h2{color:#fff;background:#E22732;padding:12px 20px;border-radius:8px;margin:0 0 20px}
.urgent{border:3px solid #E22732;background:#fff5f5;border-radius:8px;padding:16px;margin:16px 0}
table{width:100%;border-collapse:collapse}
td{padding:8px 12px;border:1px solid #ddd;vertical-align:top}
td:first-child{font-weight:700;background:#f5f5f5;width:140px}
</style></head>
<body>
<h2>🚨 ALERTA DE CRISIS - ATENCIÓN PRIORITARIA</h2>
<div class="urgent">
<table>
<tr><td>Nombre/Empresa</td><td><strong>$name</strong></td></tr>
<tr><td>Teléfono</td><td><strong>$phone</strong></td></tr>
</table>
</div>
<h3>Detalle del Incidente:</h3>
<p>$desc</p>
<hr>
<p><strong>Recibido:</strong> " . date('d/m/Y H:i:s') . "</p>
<small style="color:#999">Enviado desde " . SITE_URL . "</small>
</body></html>
HTML;

$extraHeaders = "X-Priority: 1\r\nX-MSMail-Priority: High\r\nImportance: High";

if (sendMail(EMERGENCY_EMAIL, $emailSubject, $htmlBody)) {
    jsonResponse(['success' => true, 'message' => 'Alerta enviada. Un asesor le contactará inmediatamente.']);
} else {
    jsonResponse(['success' => false, 'message' => 'Error al enviar la alerta. Llame al +502 3066 2135.'], 500);
}
