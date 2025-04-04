// Obtener elementos del DOM
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchFilter = document.getElementById("search-filter");
const resultsContainer = document.getElementById("results");
const searchContainer = document.getElementById("results-container");
const comprasTotales = document.getElementById("productos");

// Función para obtener libros de la API según la búsqueda del usuario
async function fetchBooks() {
    const query = searchInput.value.trim();
    const filter = searchFilter.value;

    if (!query) {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

    resultsContainer.innerHTML = "<p>Cargando resultados, por favor espera...</p>";
    searchContainer.style.display = "block";

    try {
        const apiUrl = `https://openlibrary.org/search.json?${filter}=${encodeURIComponent(query)}&limit=10`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.docs.length === 0) {
            resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
        } else {
            displayBooks(data.docs);
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
        resultsContainer.innerHTML = "<p>Error al cargar los resultados. Por favor, inténtalo más tarde.</p>";
    } 
}

// Función para mostrar los libros en el contenedor de búsqueda
function displayBooks(books) {
    resultsContainer.innerHTML = ""; 

    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        // Extraer datos del libro
        const title = book.title || "Título desconocido";
        const authors = book.author_name ? book.author_name.join(", ") : "Autor desconocido";
        const year = book.first_publish_year || "Año desconocido";
        const coverId = book.cover_i;
        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : "Imagenes/html5.jpg";

        // Insertar contenido en la tarjeta
        bookCard.innerHTML = `
            <img src="${coverUrl}" alt="${title}" class="book-cover">
            <p><strong>Título:</strong> ${title}</p>
            <p><strong>Autor(es):</strong> ${authors}</p>
            <p><strong>Año de publicación:</strong> ${year}</p>
            <div class="cajadeboton">
                <p><button class="add-to-cart" data-id="${book.key}">🛒 Añadir a la cesta</button></p>
            </div>
        `;

        resultsContainer.appendChild(bookCard);
    });

    // Agregar eventos a los botones de "Añadir a la cesta"
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", comprar);
    });
}

// Función para manejar la compra
function comprar(event) {
    productos++;
    comprasTotales.innerHTML = productos;
    console.log("Libro añadido:", event.target.dataset.id);
}

// Evento para buscar libros
searchButton.addEventListener("click", fetchBooks);
