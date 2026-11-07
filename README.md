# Artesanía Conecta — MVP demostrativo

Sitio web de catálogo artesanal con búsqueda, filtros, ficha de producto y enlaces a WhatsApp.

## 1. Cómo abrir el MVP

**Opción rápida:** extrae el ZIP y haz doble clic en `index.html` para abrirlo en tu navegador.

**Opción recomendada (servidor local):** abre la carpeta en Visual Studio Code, abre una terminal y ejecuta:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000` en el navegador. Para detenerlo, pulsa Ctrl+C en la terminal.

Si no tienes Python, puedes instalar la extensión "Live Server" en VS Code y abrir `index.html` con ella.

## 2. Prueba del botón de WhatsApp

1. Abre cualquier ficha del catálogo o presiona «WhatsApp» en un producto.
2. Se abrirá una dirección como `https://wa.me/51933860919?text=...`.
3. WhatsApp permitirá revisar un mensaje preparado sobre el producto. **No se envía automáticamente.**
4. Verifica que el destinatario sea el número de prueba 933 860 919 (Perú, código 51).

## 3. ¿Dónde edito los productos?

Abre `products.js`. Cada objeto de `ARTESANIA_PRODUCTOS` tiene: `id`, `nombre`, `categoria`, `precio`, `artesanaId`, `descripcion`, `simbolo`, `fondo` y `disponible`.

Los nombres, productos y precios actuales son **ficticios** y no representan a artesanas reales.

## 4. ¿Cómo funciona el WhatsApp individual?

Por defecto todos los productos envían consultas al número de prueba definido en `ARTESANIA_CONFIG.whatsappPrueba`.

Para que una artesana reciba consultas en su propio número, edita su registro en `ARTESANIA_ARTESANAS`:

```js
{ id: "a1", nombre: "Nombre autorizado", whatsapp: "51XXXXXXXXX" }
```

Usa el código de país y número, sin espacios ni símbolos. **Solo publiques números con autorización.** Si `whatsapp` es `null`, se usa el número general de prueba.

## 5. Alcance actual (importante)

- Es un **MVP frontend sin backend ni base de datos**.
- No tiene login, roles, carrito ni pago integrado.
- Los datos se editan desde `products.js`, no desde un panel web.
- No guarda pedidos: WhatsApp gestiona la conversación externamente.
- Las ilustraciones y precios son de prueba.
- Se utiliza Google Fonts de manera opcional; si no hay internet, funcionará con fuentes del sistema.

Estas decisiones hacen posible probar rápidamente el flujo básico. Después de entrevistar a las artesanas, se definirán los requisitos reales para autenticación, permisos, administración y mantenimiento.

## 6. Lista de pruebas

- [ ] Carga la página en el navegador.
- [ ] Aparecen seis artículos de prueba.
- [ ] La búsqueda filtra por nombre y categoría.
- [ ] Los chips de categorías funcionan.
- [ ] «Ver detalle» muestra descripción, precio y artesana.
- [ ] «WhatsApp» abre el enlace con el número de prueba y el nombre del producto.
- [ ] La página se ve bien desde un celular o modo móvil del navegador.

## 7. Próximos incrementos

1. Entrevistas y requisitos confirmados (incluyendo uso de WhatsApp individual/colectivo).
2. Reemplazar datos ficticios por fotos, descripciones y contactos autorizados.
3. Definir quién actualiza el catálogo y cómo.
4. Si se justifica: backend, base de datos, login, roles y panel CRUD.
5. Publicación y validación con artesanas reales.

## Seguridad y datos

No incluyas contraseñas ni claves secretas en archivos JavaScript del frontend. No agregues datos personales sin consentimiento.
