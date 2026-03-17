
const api = "https://cms-vinicius.onrender.com"

async function sectionProjects() {
  try {
    const response = await fetch(`${api}/api/projetos?populate=*`);

    if (!response.ok) throw new Error("Erro ao buscar projetos");

    const result = await response.json();
    const container = document.querySelector("#projetos .container .wrapper");

    if (!container) return;

    container.innerHTML = "";

    result.data.forEach((projeto) => {
      const titulo = projeto.title || "Sem título";
      const descricao = projeto.descricao || "Sem descrição";

      const capaUrl = projeto.capa?.url
        ? `${api}${projeto.capa.url}`
        : "";

      const dataImages = (projeto.galeria || [])
        .map((imagem) => `${api}${imagem.url}`)
        .join(",");

      const card = document.createElement("div");
      card.className = "card";
      card.dataset.description = descricao;
      card.dataset.images = dataImages;

      card.innerHTML = `
        <div class="more_photos"></div>
        <div class="more_photos item_backgroud"></div>
        <img src="${capaUrl}" alt="${titulo}" />
        <p>${titulo}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
  }
}

async function sectionHome() {
  try {
    const response = await fetch(`${api}/api/home?populate=*`);

    if (!response.ok) throw new Error("Erro ao buscar dados da API");

    const data = await response.json();
    const title = data?.data?.Titulo;
    const logo = data?.data?.Logo?.formats?.medium?.url
    console.log(`${api}${logo}`)

    document.querySelector("#home .container h1").innerText = title;
    document.getElementById("logo").src = `${api}${logo}`;
  } catch (error) {
    console.error("Erro ao carregar conteúdo", error);
  }
}

async function sectionAbout() {
  try {
    const response = await fetch(`${api}/api/sobre?populate=*`
    );

    if (!response.ok) throw new Error("Erro ao buscar dados da API");

    const data = await response.json();
    const content = data?.data?.Content;
    const profile = data?.data?.Profile?.formats?.small.url

    document.querySelector("#about .wrapper .content").innerText = content;
    document.getElementById("profile").src = `${api}${profile}`;
  } catch (error) {
    console.error("Erro ao carregar conteúdo", error);
  }
}

sectionAbout();
sectionHome();
sectionProjects();

const ano = document.getElementById("ano");
ano.textContent = `@ ${new Date().getFullYear()}`;

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("modal-close");
const modalDescription = document.getElementById("modal-description");
const splideList = document.getElementById("splide-list");
const projectsWrapper = document.querySelector("#projetos .wrapper");

let splideInstance = null;

projectsWrapper.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;

  const images = card.dataset.images.split(",");
  const description = card.dataset.description;

  splideList.innerHTML = "";

  images.forEach((img) => {
    const li = document.createElement("li");
    li.classList.add("splide__slide");
    li.innerHTML = `<img src="${img.trim()}" alt="Projeto" />`;
    splideList.appendChild(li);
  });

  modalDescription.innerHTML = description;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  if (splideInstance) {
    splideInstance.destroy();
    splideInstance = null;
  }

  splideInstance = new Splide("#modal-splide", {
    type: "loop",
    perPage: 1,
    arrows: true,
    pagination: false,
  });

  splideInstance.mount();
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";

  if (splideInstance) {
    splideInstance.destroy();
    splideInstance = null;
  }
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";

    if (splideInstance) {
      splideInstance.destroy();
      splideInstance = null;
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";

    if (splideInstance) {
      splideInstance.destroy();
      splideInstance = null;
    }
  }
});