"use strict";
const products = window.ARTESANIA_PRODUCTOS;
const artisans = window.ARTESANIA_ARTESANAS;
const config = window.ARTESANIA_CONFIG;
const grid = document.querySelector("#productGrid");
const filters = document.querySelector("#categoryFilters");
const search = document.querySelector("#searchInput");
const counter = document.querySelector("#counter");
const empty = document.querySelector("#emptyState");
const dialog = document.querySelector("#detailDialog");
let selectedCategory = "Todas";

function artisanFor(product) {
  return artisans.find(person => person.id === product.artesanaId);
}
function money(amount) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: config.moneda, maximumFractionDigits: 2 }).format(amount);
}
function whatsappUrl(product) {
  const artisan = artisanFor(product);
  const number = (artisan?.whatsapp || config.whatsappPrueba).replace(/\D/g, "");
  const message = `Hola, quisiera consultar por el producto ${product.nombre} (${product.id}) del catálogo Artesanía Conecta. ¿Está disponible?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
function create(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function renderFilters() {
  const categories = ["Todas", ...new Set(products.map(p => p.categoria))];
  filters.replaceChildren(...categories.map(category => {
    const button = create("button", "chip" + (selectedCategory === category ? " active" : ""), category);
    button.type = "button";
    button.setAttribute("aria-pressed", String(selectedCategory === category));
    button.addEventListener("click", () => { selectedCategory = category; renderFilters(); renderProducts(); });
    return button;
  }));
}
function makeVisual(product, big = false) {
  const el = create("div", `product-visual shade-${product.fondo}${big ? " big" : ""}`);
  const ornament = create("span", "visual-ornament", "✳"); ornament.setAttribute("aria-hidden", "true");
  const symbol = create("span", "product-symbol", product.simbolo); symbol.setAttribute("aria-hidden", "true");
  const note = create("span", "visual-note", "Imagen ilustrativa");
  el.append(ornament, symbol, note);
  return el;
}
function makeCard(product) {
  const card = create("article", "product-card");
  const visual = makeVisual(product);
  const tag = create("span", "product-category", product.categoria);
  const title = create("h3", "product-title", product.nombre);
  const maker = create("p", "product-maker", artisanFor(product)?.nombre || "Artesana por confirmar");
  const price = create("div", "product-price", money(product.precio));
  const actions = create("div", "product-actions");
  const view = create("button", "button button-outline button-small", "Ver detalle"); view.type = "button"; view.addEventListener("click", () => showDetails(product));
  const contact = create("a", "button button-contact button-small", "WhatsApp ↗"); contact.href = whatsappUrl(product); contact.target = "_blank"; contact.rel = "noopener noreferrer"; contact.setAttribute("aria-label", `Consultar ${product.nombre} por WhatsApp`);
  actions.append(view, contact);
  const info = create("div", "card-body"); info.append(tag, title, maker, price, actions);
  card.append(visual, info);
  return card;
}
function renderProducts() {
  const term = search.value.trim().toLocaleLowerCase("es");
  const visible = products.filter(p => (selectedCategory === "Todas" || p.categoria === selectedCategory) && [p.nombre, p.categoria, p.descripcion, artisanFor(p)?.nombre || ""].join(" ").toLocaleLowerCase("es").includes(term));
  grid.replaceChildren(...visible.map(makeCard));
  counter.textContent = `${visible.length} ${visible.length === 1 ? "producto" : "productos"}`;
  empty.hidden = visible.length !== 0;
}
function showDetails(product) {
  const pane = create("div", "modal-layout");
  const visual = makeVisual(product, true);
  const content = create("div", "modal-body");
  const close = create("button", "dialog-close", "×"); close.type = "button"; close.setAttribute("aria-label", "Cerrar detalle"); close.addEventListener("click", () => dialog.close());
  const tag = create("span", "section-kicker", `${product.categoria} · ${product.id}`);
  const title = create("h2", "modal-title", product.nombre); title.id = "modalTitle";
  const maker = create("p", "product-maker", artisanFor(product)?.nombre || "Artesana por confirmar");
  const desc = create("p", "modal-desc", product.descripcion);
  const price = create("div", "modal-price", money(product.precio));
  const status = create("p", "modal-disclaimer", "Precio y disponibilidad de ejemplo. Se confirmarán con cada artesana.");
  const contact = create("a", "button button-contact modal-contact", "Consultar por WhatsApp ↗"); contact.href = whatsappUrl(product); contact.target = "_blank"; contact.rel = "noopener noreferrer";
  content.append(close, tag, title, maker, desc, price, status, contact);
  pane.append(visual, content);
  document.querySelector("#modalContent").replaceChildren(pane);
  dialog.showModal();
}
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
search.addEventListener("input", renderProducts);
document.querySelector("#clearFilters").addEventListener("click", () => { search.value = ""; selectedCategory = "Todas"; renderFilters(); renderProducts(); search.focus(); });
renderFilters(); renderProducts();
