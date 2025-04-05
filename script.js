// Obtener elementos del DOM
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchFilter = document.getElementById("search-filter");
const resultsContainer = document.getElementById("results");
const searchContainer = document.getElementById("results-container");
const comprasTotales = document.getElementById("productos");
const confirmarCompra = document.getElementById("compra-container");
const limpiarCarrito = document.getElementById("clear-cart");

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
            <div class="cajadeboton"><p><button class="boton-comprar" id="${book.key}" onclick="comprar(event)">🛒 Añadir a la cesta</button></p></div>
        `;

        resultsContainer.appendChild(bookCard);
    });
}

// Función para añadir libro a la cesta
function comprar(event) {
    event.stopPropagation();  // Evita que el clic se propague y active el contenedor accidentalmente
    confirmarCompra.style.display = "block";  // Mostrar el contenedor de compra

    const bookId = event.target.id;
    console.log("Libro añadido a la cesta:", bookId);

    // Recuperar los productos almacenados en localStorage
    localStorageCompras = JSON.parse(localStorage.getItem("localStorageCompras")) || [];
    libros = JSON.parse(localStorage.getItem("librosdiferentes")) || [];

    // Añadir el libro a la lista de localStorage si no está ya en ella
    if (!localStorageCompras.includes(bookId)) {
        productos++;
        comprasTotales.innerHTML = productos;
        libros.push(bookId);
        localStorageCompras.push(bookId);
        localStorage.setItem("librosdiferentes", JSON.stringify(libros));
        localStorage.setItem("localStorageCompras", JSON.stringify(localStorageCompras));
    } else {
        localStorageCompras.push(bookId);
        localStorage.setItem("localStorageCompras", JSON.stringify(localStorageCompras));
    }
}

// Función para finalizar compra
function finalizarcompra() {
    if (productos === 0) {
        alert("No has agregado productos al carrito.");
        return;
    } 
        alert("Gracias por la compra");
        reinicioproducto();  // Reiniciar el carrito después de finalizar la compra si es necesario
}

// Función para reiniciar el carrito
function reinicioproducto() {
    productos = 0;
    comprasTotales.innerHTML = productos;
    confirmarCompra.style.display = "none";
    localStorage.removeItem("localStorageCompras");
    localStorage.removeItem("librosdiferentes");
}

function vaciarcarro(){
    productos = 0;
    alert("Vaciaste el carrito");
    comprasTotales.innerHTML = productos;
    confirmarCompra.style.display = "none";
    localStorage.removeItem("localStorageCompras");
    localStorage.removeItem("librosdiferentes");
}

function vaciarcarro(){
    productos = 0;
    alert("Vaciaste el carrito");
    comprasTotales.innerHTML = productos;
    confirmarCompra.style.display = "none";
    localStorage.removeItem("localStorageCompras");
    localStorage.removeItem("librosdiferentes");
}

function vercompras(){
    if (document.getElementById("search-section").getAttribute("class")=="visible"){
        document.getElementById("search-section").setAttribute("class","invisible");
    }
    else{
        document.getElementById("search-section").setAttribute("class","visible");
    }
    if (document.getElementById("results-container").getAttribute("class")=="visible"){
        document.getElementById("rresuls-container").setAttribute("class","invisible");
    }
    else{
        document.getElementById("results-container").setAttribute("class","visible");
    }
    if (document.getElementById("compra-container").getAttribute("class")=="visible"){
        document.getElementById("compra-container").setAttribute("class","invisible");
    }
    else{
        document.getElementById("compra-container").setAttribute("class","visible");
    }
}
// Evento para finalizar compra
confirmarCompra.addEventListener("click", (event) => {
    event.stopPropagation();  // Evitar que el clic se propague fuera del contenedor
    finalizarcompra();
});

// Evento para vaciar el carrito
limpiarCarrito.addEventListener("click", (event) => {
    event.stopPropagation();  // Evitar la propagación
    vaciarcarro();  // Limpia el carrito
});

// Evento para buscar libros
searchButton.addEventListener("click", fetchBooks);

// Detectar clic fuera del contenedor de compra y ocultarlo si se hace clic fuera de él
document.addEventListener("click", function (event) {
    if (!confirmarCompra.contains(event.target) && !limpiarCarrito.contains(event.target) && !event.target.closest(".book-card")) {
        confirmarCompra.style.display = "none";  // Ocultar si se hace clic fuera
    }
});

// Detectar clic dentro de `compra-container` y evitar que se propague al contenedor padre
confirmarCompra.addEventListener("click", function (event) {
    event.stopPropagation();  // Evita que el clic se propague al contenedor y active la acción de compra accidentalmente
});
