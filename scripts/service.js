async function getAnime() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await response.json();
    const container = document.getElementById("anime-container");

    console.log(data);
    data.data.forEach(anime => {
      const card = document.createElement("div");
      card.classList.add("anime-card");
      card.innerHTML = `
        <div class="anime-card-container">
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <h3>${anime.title}</h3>
          <p>Score: ${anime.score ?? "N/A"}</p>
        </div>  
      `;

      // Evento al dar clic en la card
      card.addEventListener("click", () => {
        showModal(anime);
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

// Función para mostrar el modal con datos del anime
function showModal(anime) {
  const modal = document.getElementById("anime-modal");
  modal.style.backgroundImage = `url(${anime.images.jpg.large_image_url})`;
  document.getElementById("modal-image").src = anime.images.jpg.image_url;
  document.getElementById("modal-title").textContent = anime.title;
  document.getElementById("modal-score").textContent = `Score: ${anime.score ?? "N/A"}`;
  document.getElementById("modal-synopsis").textContent = anime.synopsis ?? "Sin sinopsis disponible.";
  document.getElementById("modal-status").textContent = `Estado: ${anime.status}`;

  document.getElementById("anime-modal").style.display = "flex";
}

// Cerrar modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("anime-modal").style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  const modal = document.getElementById("anime-modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

getAnime();
