const ano = document.getElementById("ano");
ano.textContent = `@ ${new Date().getFullYear()}`;

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("modal-close");
const modalDescription = document.getElementById("modal-description");
const splideList = document.getElementById("splide-list");

let splideInstance = null;

document.querySelectorAll("#projetos .wrapper .card").forEach(card => {

    card.addEventListener("click", () => {
        const images = card.dataset.images.split(",");
        const description = card.dataset.description;
        
        splideList.innerHTML = "";
        
        images.forEach(img => {
            const li = document.createElement("li");
            li.classList.add("splide__slide");
            li.innerHTML = `<img src="${img.trim()}" />`;
            splideList.appendChild(li);
        });

        modalDescription.innerHTML = description;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        if (splideInstance) {
            splideInstance.destroy();
        }

        splideInstance = new Splide("#modal-splide", {
            type: "loop",
            perPage: 1,
            arrows: true,
            pagination: true,
        });

        splideInstance.mount();
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});