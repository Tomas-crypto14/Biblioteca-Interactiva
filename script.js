// Elementos del DOM
inputText = document.getElementById("input") //Por si quereis placeholder
tituloLibro = document.getElementById ("titulo")
autorLibro = document.getElementById ("autor")
anyoPrimeraPublicacion = document.getElementById ("anyo")
generoLibro = document.getElementById ("genero");
imagenLibro = documment.getElementById ("imagen");
librosCarrito = document.getElementById ("libros");
claseLibroCesta = document.getElementById ("clase");
compraCorrecta = document.getElementById ("compra");

// Variables
cantidadLibros = 0
resultados = 0

//Función de muestra de búsqueda
functión busqueda{
 document.getElementById ("cuadrobusqueda").setAtribute ("class","visible") // Hace visible el cuadro de búsqueda (crear clase invisible en el CSS)
 const textoabuscar = inputText.value
 const pagina = "https://openlibrary.org/search.json?"
 if (document.querySelector('[id="titulo"]:checked') != null){
   
