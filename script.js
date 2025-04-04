// Obtener elementos del DOM
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchFilter = document.getElementById("search-filter");
const resultsContainer = document.getElementById("results");
const searchContainer = document.getElementById("results-container");
const comprasTotales = document.getElementById("productos");
const confirmarCompra = document.getElementById("compra-container");
// Variables
let productos = 0;
let libros = [];
let localStorageCompras = [];

// Función para obtener libros de la API según la búsqueda del usuario
async function fetchBooks() {
    libros = [];
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
            return;
        }

        resultsContainer.innerHTML = ""; 

        displayBooks(data.docs);
    } catch (error) {
        console.error("Error al obtener datos:", error);
        resultsContainer.innerHTML = "<p>Error al cargar los resultados.</p>";
    }
}

// Función para mostrar los libros en el contenedor de búsqueda
function displayBooks(books) {
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
            <div class="cajadeboton"><p><button class="boton-comprar" id=${book.key} onclick="comprar(event)">🛒 Añadir a la cesta</button></p></div>
        `;

        resultsContainer.appendChild(bookCard);
    });
}

// Función para añadir libro a la cesta
function comprar(event) {
    confirmarCompra.style.display = `block`;
    // Incrementar el contador de productos
    productos++;
    comprasTotales.innerHTML = productos;

    const bookId = event.target.id;
    console.log("Libro añadido a la cesta:", bookId);

    // Recuperar los productos almacenados en localStorage
    localStorageCompras = JSON.parse(localStorage.getItem("localStorageCompras")) || [];

    // Añadir el libro a la lista si no está ya en ella
    if (!localStorageCompras.includes(bookId)) {
        localStorageCompras.push(bookId);
        // Guardar de nuevo la lista en localStorage
        localStorage.setItem("localStorageCompras", JSON.stringify(localStorageCompras));
    }
}

function finalizarcompra(){
    alert("Gracias por la compra");
    reinicioproducto();
}

function reinicioproducto(){
    productos = 0;
    comprasTotales.innerHTML = productos;
    localStorage.removeItem("localStorageCompras");
}
// Evento para buscar libros
searchButton.addEventListener("click", fetchBooks);
confirmarCompra.addEventListener("click", finalizarcompra);
