<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'JSON inválido']);
    exit;
}

/**
 * ==========================================
 * CONFIGURACIÓN DE CORREO
 * Completa estos valores con los datos de tu webmail/cPanel
 * ==========================================
 */
define('CONTACT_EMAIL', 'ventas@copivgt.com');
define('EMERGENCY_EMAIL', 'soportecnico@copivgt.com');
define('DIAGNOSTICO_EMAIL', 'ventas@copivgt.com');
define('FROM_EMAIL', 'web@copivgt.com');
define('FROM_NAME', 'COPIV TIKAL - Web');
define('SITE_NAME', 'COPIV TIKAL S.A.');
define('SITE_URL', 'https://copivgt.com');

function jsonResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function sendMail($to, $subject, $htmlBody) {
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . FROM_EMAIL . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $htmlBody, $headers);
}
