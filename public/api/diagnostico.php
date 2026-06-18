<?php
require_once __DIR__ . '/config.php';

$company  = htmlspecialchars($input['company'] ?? '', ENT_QUOTES, 'UTF-8');
$name     = htmlspecialchars($input['name'] ?? '', ENT_QUOTES, 'UTF-8');
$email    = htmlspecialchars($input['email'] ?? '', ENT_QUOTES, 'UTF-8');
$phone    = htmlspecialchars($input['phone'] ?? '', ENT_QUOTES, 'UTF-8');
$location = htmlspecialchars($input['location'] ?? '', ENT_QUOTES, 'UTF-8');
$score    = intval($input['score'] ?? 0);
$level    = htmlspecialchars($input['level'] ?? 'No determinado', ENT_QUOTES, 'UTF-8');
$code     = htmlspecialchars($input['code'] ?? 'N/A', ENT_QUOTES, 'UTF-8');

if (!$name || !$email || !$phone) {
    jsonResponse(['success' => false, 'message' => 'Faltan campos requeridos'], 400);
}

$levelBadge = match ($level) {
    'ALTO RIESGO'    => '#E22732',
    'RIESGO MODERADO'=> '#EFB810',
    'BAJO RIESGO'    => '#22c55e',
    default          => '#666'
};

$emailSubject = "Autodiagnóstico completado - $company / $level";
$htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
body{font-family:sans-serif;color:#333;padding:20px}
h2{color:#E22732;border-bottom:2px solid #EFB810;padding-bottom:8px}
.badge{display:inline-block;padding:6px 16px;border-radius:20px;color:#fff;font-weight:700;font-size:14px}
table{width:100%;border-collapse:collapse;margin:16px 0}
td{padding:8px 12px;border:1px solid #ddd;vertical-align:top}
td:first-child{font-weight:700;background:#f5f5f5;width:160px}
</style></head>
<body>
<h2>Autodiagnóstico de Vulnerabilidad</h2>
<table>
<tr><td>Empresa/Condominio</td><td><strong>$company</strong></td></tr>
<tr><td>Solicitante</td><td>$name</td></tr>
<tr><td>Correo</td><td>$email</td></tr>
<tr><td>Teléfono</td><td>$phone</td></tr>
<tr><td>Ubicación</td><td>$location</td></tr>
<tr><td>Código</td><td><strong>$code</strong></td></tr>
<tr><td>Puntaje</td><td>$score / 10</td></tr>
<tr><td>Nivel de Riesgo</td><td><span class="badge" style="background:$levelBadge">$level</span></td></tr>
</table>
<hr><small style="color:#999">Enviado desde " . SITE_URL . "</small>
</body></html>
HTML;

if (sendMail(DIAGNOSTICO_EMAIL, $emailSubject, $htmlBody)) {
    jsonResponse(['success' => true, 'message' => 'Diagnóstico recibido correctamente.']);
} else {
    jsonResponse(['success' => false, 'message' => 'Error al guardar el diagnóstico'], 500);
}
