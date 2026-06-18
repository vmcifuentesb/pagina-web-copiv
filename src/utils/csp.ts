/**
 * Content Security Policy (CSP) para COPIV TIKAL
 * 
 * Esta política se aplica via <meta> tag en producción.
 * También está duplicada en .htaccess como header HTTP.
 */
export const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' https: data: blob:; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; connect-src 'self' https://api.sanity.io https://apikahf2kwwlfskr3kc5kzmh2i0eglxp.lambda-url.us-east-1.on.aws; frame-ancestors 'none'; form-action 'self'";
