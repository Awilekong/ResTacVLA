const demos = [
  {
    id: "lightbulb",
    label: "Lightbulb Screwing",
    description:
      "Thread engagement is difficult to infer visually. ResTacVLA uses residual tactile cues to align, contact, and screw until electrical success.",
    videos: [
      { title: "pi0.5 baseline", tag: "Vision only", src: "assets/videos/lightbulb/pi05.mp4" },
      { title: "ResTacVLA tactile run 1", tag: "Tactile", src: "assets/videos/lightbulb/tactile-1.mp4" },
      { title: "ResTacVLA tactile run 2", tag: "Tactile", src: "assets/videos/lightbulb/tactile-2.mp4" },
      { title: "ResTacVLA tactile run 3", tag: "Tactile", src: "assets/videos/lightbulb/tactile-3.mp4" }
    ]
  },
  {
    id: "plug",
    label: "Plug Insertion",
    description:
      "Severe occlusion and sub-millimeter uncertainty make plug insertion a tactile-guided alignment problem.",
    videos: [
      { title: "pi0.5 baseline", tag: "Vision only", src: "assets/videos/plug-insertion/pi05.mp4" },
      { title: "ResTacVLA tactile run", tag: "Tactile", src: "assets/videos/plug-insertion/tactile.mp4" },
      { title: "Generalization 1", tag: "Perturbation", src: "assets/videos/plug-insertion/generalization-1.mp4" },
      { title: "Generalization 2", tag: "Perturbation", src: "assets/videos/plug-insertion/generalization-2.mp4" }
    ]
  },
  {
    id: "peg-transfer",
    label: "Peg Transfer",
    description:
      "Sequential insertion demands fine contact sensitivity while the end effector moves between local constraints.",
    videos: [
      { title: "pi0.5 baseline run 1", tag: "Vision only", src: "assets/videos/peg-transfer/pi05.mp4" },
      { title: "pi0.5 baseline run 2", tag: "Vision only", src: "assets/videos/peg-transfer/pi05-2.mp4" },
      { title: "ResTacVLA tactile run", tag: "Tactile", src: "assets/videos/peg-transfer/tactile.mp4" }
    ]
  },
  {
    id: "plate-wiping",
    label: "Plate Wiping",
    description:
      "The policy must maintain sustained surface contact and adapt to height variation without hovering above the plate.",
    videos: [
      { title: "pi0.5 baseline", tag: "Vision only", src: "assets/videos/plate-wiping/pi05.mp4" },
      { title: "pi0.5 height variation", tag: "Height", src: "assets/videos/plate-wiping/pi05-height.mp4" },
      { title: "ResTacVLA tactile run", tag: "Tactile", src: "assets/videos/plate-wiping/tactile.mp4" },
      { title: "ResTacVLA height variation", tag: "Height", src: "assets/videos/plate-wiping/tactile-height.mp4" }
    ]
  },
  {
    id: "peg-in-hole",
    label: "Peg-in-Hole",
    description:
      "Tactile primitives help disambiguate contact state under target occlusion and recover from dynamic displacement.",
    videos: [
      { title: "pi0.5 baseline run 1", tag: "Vision only", src: "assets/videos/peg-in-hole/pi05.mp4" },
      { title: "pi0.5 baseline run 2", tag: "Vision only", src: "assets/videos/peg-in-hole/pi05-2.mp4" },
      { title: "ResTacVLA tactile run", tag: "Tactile", src: "assets/videos/peg-in-hole/tactile.mp4" },
      { title: "Dynamic generalization", tag: "Perturbation", src: "assets/videos/peg-in-hole/generalization.mp4" }
    ]
  },
  {
    id: "generalization",
    label: "Generalization",
    description:
      "Additional perturbation rollouts show how residual tactile feedback supports adaptation beyond nominal settings.",
    videos: [
      { title: "Plug generalization 1", tag: "Plug", src: "assets/videos/plug-insertion/generalization-1.mp4" },
      { title: "Plug generalization 2", tag: "Plug", src: "assets/videos/plug-insertion/generalization-2.mp4" },
      { title: "Peg-in-hole dynamic target", tag: "Peg-in-hole", src: "assets/videos/peg-in-hole/generalization.mp4" }
    ]
  }
];

const tabs = document.querySelector(".demo-tabs");
const description = document.querySelector(".demo-description");
const grid = document.querySelector(".demo-grid");

function renderTabs(activeId) {
  tabs.innerHTML = demos
    .map(
      (demo) =>
        `<button class="demo-tab" type="button" role="tab" aria-selected="${demo.id === activeId}" data-demo="${demo.id}">${demo.label}</button>`
    )
    .join("");
}

function renderDemo(id) {
  const demo = demos.find((item) => item.id === id) || demos[0];
  renderTabs(demo.id);
  description.textContent = demo.description;
  grid.innerHTML = demo.videos
    .map(
      (video) => `
        <article class="demo-card">
          <video controls muted playsinline loop preload="metadata" poster="assets/figures/tasks.png">
            <source src="${video.src}" type="video/mp4" />
          </video>
          <div class="demo-card__meta">
            <h3>${video.title}</h3>
            <span>${video.tag}</span>
          </div>
        </article>
      `
    )
    .join("");
}

if (tabs && description && grid) {
  renderDemo(demos[0].id);
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-demo]");
    if (!button) return;
    renderDemo(button.dataset.demo);
  });
}

const contentsButton = document.querySelector(".contents-button");
const mobileOutline = document.querySelector(".mobile-outline");

if (contentsButton && mobileOutline) {
  contentsButton.addEventListener("click", () => {
    const willOpen = mobileOutline.hasAttribute("hidden");
    mobileOutline.toggleAttribute("hidden", !willOpen);
    contentsButton.setAttribute("aria-expanded", String(willOpen));
  });

  mobileOutline.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      mobileOutline.setAttribute("hidden", "");
      contentsButton.setAttribute("aria-expanded", "false");
    }
  });
}

const outlineLinks = Array.from(document.querySelectorAll(".outline a"));
const sections = outlineLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setCurrentOutline(id) {
  outlineLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function syncOutline() {
  if (!sections.length) return;
  const marker = window.scrollY + window.innerHeight * 0.32;
  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= marker) {
      current = section;
    }
  }
  setCurrentOutline(current.id);
}

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      setCurrentOutline(visible.target.id);
    },
    {
      rootMargin: "-20% 0px -58% 0px",
      threshold: [0.1, 0.35, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

let outlineTicking = false;
window.addEventListener("scroll", () => {
  if (outlineTicking) return;
  outlineTicking = true;
  window.requestAnimationFrame(() => {
    syncOutline();
    outlineTicking = false;
  });
});
window.addEventListener("load", syncOutline);
window.addEventListener("hashchange", syncOutline);
