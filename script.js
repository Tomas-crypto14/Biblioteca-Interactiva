// Obtener elementos del DOM
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchFilter = document.getElementById("search-filter");
const resultsContainer = document.getElementById("results");
const searchContainer = document.getElementById("results-container");
const comprasTotales = document.getElementById("productos");
const confirmarCompra = document.getElementById("compra-container");
const limpiarCarrito = document.getElementById("clear-cart");
//const objetos = document.getElementById("cart-items")
const preloader = document.getElementById("preloader");
const carrito = document.getElementById("cestasuperior");
const comprobacion = document.getElementById("checkout-button");
// Variables
let productos = 0;
let libros = [];
let localStorageCompras = [];
let datosLibros = [];
let cantidades = [];
window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 2000); 
});

// Función para obtener libros de la API según la búsqueda del usuario
async function fetchBooks() {
    libros = [];
    datosLibros = [];
    const query = searchInput.value.trim();
    const filter = searchFilter.value;

    if (!query) {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

    resultsContainer.innerHTML = "";
    searchContainer.style.display = "block";

    try {
        const apiUrl = `https://openlibrary.org/search.json?${filter}=${encodeURIComponent(query)}&limit=10`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        dataLibros = data;
        if (data.docs.length === 0) {
            resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
        } else {
            displayBooks(data.docs);
        }
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
    event.stopPropagation();  
    confirmarCompra.style.display = "block";  

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
    agregarALista(bookId);
}
// Función que recoge los datos del libro

function agregarALista(bookId){
    let cantidad = [];
    cantidades = JSON.parse(localStorage.getItem("cantidades"));
    libros = JSON.parse(localStorage.getItem("libros"));
    let i = 0;
    libros.forEach(element => {
        let i = 0
        if (element == bookId){
            cantidad = cantidades[i]
        }
        i++;
    })
    i = 0;
    dataLibros.forEach(element => {
        if (element.key == bookId){
            const node = document.getElementById
        }
    })
}
// Función para finalizar compra
function finalizarcompra() {
    if (productos === 0) {
        alert("No has agregado productos al carrito.");
        return;
    } 
        alert("Gracias por la compra");
        reinicioproducto();
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
// Evento para finalizar compra
comprobacion.addEventListener("click", (event) => {
    event.stopPropagation();  // Evitar que el clic se propague fuera del contenedor
    finalizarcompra();
});

// Evento para vaciar el carrito
limpiarCarrito.addEventListener("click", (event) => {
    event.stopPropagation();  // Evitar la propagación
    vaciarcarro();  // Limpia el carrito
});

function vercompras(){
    if (document.getElementById("search-section").getAttribute("class")=="visible"){
        document.getElementById("search-section").setAttribute("class","invisible");
    }
    else{
        document.getElementById("search-section").setAttribute("class","visible");
    }
    if (document.getElementById("results-container").getAttribute("class")=="visible"){
        document.getElementById("results-container").setAttribute("class","invisible");
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
// Evento para buscar libros
searchButton.addEventListener("click", fetchBooks);

// Detectar clic fuera del contenedor de compra y ocultarlo si se hace clic fuera de él
document.addEventListener("click", function (event) {
    if (!confirmarCompra.contains(event.target) && !limpiarCarrito.contains(event.target) && !event.target.closest(".book-card")) {
        confirmarCompra.style.display = "none";  
    }
});

// Detectar clic
confirmarCompra.addEventListener("click", function (event) {
    event.stopPropagation();
});