const prueba = document.getElementById("prueba");

async function api(){
    fetch (`https://openlibrary.org/search.json?q=the+lord+of+the+rings`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.docs);
    })
}
prueba.addEventListener("click", () => prueba());