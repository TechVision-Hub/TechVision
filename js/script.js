document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initCopyButtons();
  initContactForm();
});

/* Menu mobile a scomparsa */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("header nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "chiudi ✕" : "menu ☰";
  });

  // chiude il menu quando si clicca un link (utile su mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "menu ☰";
    });
  });
}

/* Pulsante "copia" nei blocchi di codice degli articoli */
function initCopyButtons() {
  document.querySelectorAll(".code-block").forEach((block) => {
    const button = block.querySelector(".copy-btn");
    const codeEl = block.querySelector("pre code") || block.querySelector("pre");
    if (!button || !codeEl) return;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeEl.textContent.trim());
        const original = button.textContent;
        button.textContent = "copiato ✓";
        setTimeout(() => (button.textContent = original), 1500);
      } catch (err) {
        button.textContent = "errore";
      }
    });
  });
}

/* Form contatti: nessun backend collegato, mostra solo un messaggio di conferma */
function initContactForm() {
  const form = document.querySelector(".form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#nome")?.value.trim();
    const email = form.querySelector("#email")?.value.trim();
    const message = form.querySelector("#messaggio")?.value.trim();

    if (!name || !email || !message) {
      if (status) {
        status.textContent = "# compila tutti i campi prima di inviare.";
        status.style.color = "#ff6b6b";
      }
      return;
    }

    // Qui andrà collegato un servizio reale (es. Formspree, endpoint proprio, ecc.)
    if (status) {
      status.style.color = "";
      status.textContent = `# messaggio pronto per l'invio, grazie ${name}! (collega un backend per l'invio reale)`;
    }
    form.reset();
  });
}