const prueba = document.getElementById("prueba");
const resultados = document.getElementById("resultados");
const containerprincipal = document.getElementById("container1");
const containerbusqueda = document.getElementById("container2");
const containercompra = document.getElementById("container3");
async function api(){
    resultados.innerHTML = "";
    //const resultado = document.createElement("p");
    //resultados.appendChild(resultado);
    fetch (`https://openlibrary.org/search.json?q=the+lord+of+the+rings`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.docs);
        const containerbusqueda = document.getElementById("container2");
        data.docs.forEach(libro => {
            const autorllave = document.createElement("p");
            const autorname = document.createElement("p");
            const title = document.createElement("p");
            const year = document.createElement("p");
            autorllave.innerHTML = `ID: ${libro.author_key}\n`;
            autorname.innerHTML = `Nombre: ${libro.author_name}\n`;
            title.innerHTML = `Titulo: ${libro.title}\n`;
            year.innerHTML = `Año Publicado: ${libro.first_publish_year}\n`;
            containerbusqueda.appendChild(autorllave);
            containerbusqueda.appendChild(autorname);
            containerbusqueda.appendChild(title);
            containerbusqueda.appendChild(year);
            resultados.appendChild(containerbusqueda);
        })
    })
}
prueba.addEventListener("click", () => api());