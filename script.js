// Obtener elementos del DOM
const searchButton = document.getElementById("prueba");
const resultsContainer = document.getElementById("resultados");
const searchContainer = document.getElementById("container2");
const seleccion = document.getElementById("select-filter");
const titulovalue = document.getElementById("titulo");
const autorvalue = document.getElementById("autor");
const publicacionvalue = document.getElementById("publicacion");
const input = document.getElementById("search-input");

async function selection(){
    let selecttitulo;
    if (selecttitulo);
    let selectautor;
    if (selectautor);
    let selectpublicacion;
    if (selectpublicacion);
}
// Función para obtener los libros de la API
async function fetchBooks() {
    resultsContainer.innerHTML = ""; // Limpiar resultados previos
    searchContainer.style.display = "block"; // Mostrar contenedor de búsqueda
    try {
        const authorbusqueda = document.getElementById("search-input").value.toLowerCase();
        const response = await fetch(`https://openlibrary.org/search.json?q=the+lord+of+the+rings&author=${authorbusqueda}&limit=10`);
        const data = await response.json();
        displayBooks(data.docs);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Función para mostrar los libros en el contenedor de búsqueda
function displayBooks(books) {
    books.forEach(book => {
        // Crear la tarjeta del libro
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
        `;

        resultsContainer.appendChild(bookCard);
    });
}

// Evento para buscar libros
searchButton.addEventListener("click", () => fetchBooks());
