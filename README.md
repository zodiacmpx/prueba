# Vínculo — Psicología Online

Landing premium, mobile-first y SEO-first para psicóloga online en Chile. Incluye funnel de reserva, selección de servicio, Checkout Pro de Mercado Pago (modo demo si no hay credenciales), desbloqueo de agenda después de pago y punto de integración para Cal.com.

## Producción en 15 minutos
1. Reemplazar en `index.html`: nombre, credenciales reales, dominio, precios y `APP.calBookingUrl`.
2. Cambiar `TU-DOMINIO.CL` en canonical, OpenGraph, JSON-LD, robots y sitemap.
3. Desplegar en Vercel.
4. Variables: `MERCADOPAGO_ACCESS_TOKEN` y opcionalmente `MERCADOPAGO_WEBHOOK_URL`.
5. Crear un evento en Cal.com y pegar la URL pública en `APP.calBookingUrl`.

## SEO / salud (importante)
- No publicar títulos, registros ni especialidades que la profesional no pueda acreditar.
- Los artículos deben tener autor/a real, fecha, revisión profesional y fuentes cuando corresponda.
- No crear contenido masivo con IA solo para captar keywords.
- Crear páginas específicas según servicios reales: `/psicologa-online-ansiedad`, `/terapia-online-autoestima`, `/psicologa-online-relaciones`, etc. Cada una debe aportar contenido útil y diferente.
- Vincular Google Search Console y enviar sitemap.
- Optimizar Core Web Vitals, imágenes WebP/AVIF y fotografía profesional real.
- Añadir política de privacidad, consentimiento informado, cancelaciones y protocolo de crisis.

## Pago y boleta
Este repositorio valida pagos con Mercado Pago. La emisión tributaria NO se activa por defecto porque el documento correcto depende de la situación tributaria real de la profesional (honorarios vs. boleta de ventas/servicios; afecta/exenta, etc.). Integrar OpenFactura/SII solo después de confirmarlo con contador/a y configurar un webhook idempotente de pago aprobado.

## Modo demo
Sin `MERCADOPAGO_ACCESS_TOKEN`, el endpoint devuelve a `?payment=demo-approved`, para probar la experiencia completa sin cobrar.
