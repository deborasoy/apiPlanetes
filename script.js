document.getElementById("button").addEventListener("click", function () {
    getData() 
});
async function getData() {
    const planeta = document.getElementById("input").value;
    const URL = `https://images-api.nasa.gov/search?q=${planeta}`;
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`code error:${response.status}`);
    const data = await response.json();

    const { collection } = data; //destructuracion del objeto data que contiene el objeto collection
    //console.log(collection)
    const { items } = collection;
    //destructuracion del objeto collection para obtener el array "items" que contiene una coleccion de objetos.
    //console.log(items) //total de objetos relacionados con la busqueda exitosa, en showData() solo muestra 12
    showData(items);
    
    //response.ok ? showData(items) : console.log("no hay nda en la base") averiguar como hacer que cuando no coincida el elemento que agrego el usuario como valor en el input, le sea avisado y no solo salga el error en consola, porque no funciono el endpoints
};

function showData(array) {
    const container = document.getElementById("container"); //agregar contenido
    let template = ``;

    for (let i = 0; i < 12; i++) { //itera sobre el array y muestra solo 12 elementos del total, asi carga la pagina mas agil, cuando iteraba sobre el total era muy lento y demasiado contenido.

        const element = array[i]; //cada objeto del array
        const title = element.data[0].title; // propiedad titulo 
        const description = element.data[0].description; //propiedad descripcion
        const creationPost = element.data[0].date_created; //propiedad fecha de creacion del posteo
        const location = element.data[0].location; //propiedad ubicacion
        const imgFirst = element.links ? element.links[0].href : '' ; //propiedad enlace de la imagen, algunos objetos no tienen esta propiedad, por ello el operador condicional ternario.
       
        template += `
          <div class="col-12 col-md-6 col-xl-4">
                <div class="card">
                    <img alt="formato no compatible para su lectura" src='${imgFirst}' height='200'>
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <div class="overflow-auto" style="height: 140px;">
                            <p class="card-text">${description}</p>
                            <p>Location: ${location} </p>
                            <p>Post creation date: ${creationPost} </p>
                        </div>
                    </div>
                </div>
            </div>
             `;
        
    }
    container.innerHTML = template; //agregar contenido al div del index.html 
}

