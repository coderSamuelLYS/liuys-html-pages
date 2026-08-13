(function () {
  const links = [...document.querySelectorAll(".toc a[href^='#']")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY + 120;
    let current = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= y) current = s;
    }
    links.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current.id);
    });
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const sel = btn.getAttribute("data-copy");
      const el = document.querySelector(sel);
      if (!el) return;
      await navigator.clipboard.writeText(el.innerText.trim());
      const old = btn.textContent;
      btn.textContent = "已复制";
      btn.classList.add("ok");
      setTimeout(() => {
        btn.textContent = old;
        btn.classList.remove("ok");
      }, 1600);
    });
  });
})();
