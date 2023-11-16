let idUsuario;

document.getElementById("loginUser").addEventListener("click", async function(){
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password}),
    }
    
    await fetch('http://localhost:3000/api/auth/login', data)
    .then(res => {
        // console.log(res.status);
        if(res.status == 202){
           return  res.text()
        }
        if(res.status == 401)
            throw new Error("Unauthorized")
        })
    .then(async res => {
        localStorage.removeItem('SavedToken')
        localStorage.setItem("SavedToken", 'Bearer ' + res)
        console.log(localStorage.getItem('SavedToken'));
        // if(res.statusCode)    
            await fetch('http://localhost:3000/api/auth/profile', { headers: { Authorization:localStorage.getItem('SavedToken') }})
            .then(res => res.json())
            .then(res =>{
                idUsuario = res.userId

                if(document.getElementById("Bienvenida") !== null){
                    document.getElementById("Bienvenida").remove();
                }
                    let newMsg = document.createElement("h5")
                    newMsg.textContent = `${res.username}`
                    newMsg.id = "Bienvenida"
                    newMsg.style.margin = "10px 20px"
                    document.querySelector(".nav_loginForm").appendChild(newMsg)
        })
    })
    .catch(error => {
        if (error.message === "Unauthorized") {
            let newMsg = document.createElement("h5")
                    newMsg.textContent = `${res.username}`
                    newMsg.id = "Bienvenida"
                    newMsg.style.margin = "10px 20px"
                    document.querySelector(".nav_loginForm").appendChild(newMsg)
            // Handle the 401 error here
          } else {
            console.log('Other error handling: ' + error);
            // Handle other errors here
          }
    })
        // console.log(e);
    
    pokemonCapturadosMenu()
})



let siguiente;
let anterior;

async function cargaPokemon(rangeLink) {
    
    // console.log(rangeLink);
  await fetch(rangeLink)
    .then((res => res.json()))
    .then(async res => {
        

        let listaPokemon = await res.pokemon

        // console.log(listaPokemon);

        rellenarContainerDeTarjetas(listaPokemon);

        if(rangeLink === 'http://localhost:3000/api/pokemon/paginated?range=10000&offset=0'){
            console.log("Hello");
            siguiente = 'http://localhost:3000/api/pokemon/paginated?range=30&offset=0'
            anterior = 'http://localhost:3000/api/pokemon/paginated?range=30&offset=0'
        }else{
            siguiente = await res.after
            anterior = await res.before
        }

    });
}

async function miListaPokemon(event){
    event.preventDefault()
    await fetch(`http://localhost:3000/api/pokemon/captured/${idUsuario}`, { headers: { Authorization:localStorage.getItem('SavedToken') }})
    .then((res => res.text()))
    .then((res) => {
        console.log(idUsuario);
        console.log("Si claro, cuando lo implementes te doy la lista que me pides, gracioso");
    })
}

function borrarDomTarjetas(){
    document.getElementById("container").innerHTML = ''
}

function pokemonCapturadosMenu(){
    let menu = document.getElementById("dropdown-content")
    let documentosUsuario = menu.querySelector("#misPokemon")

    if(documentosUsuario === null){
        let misPokemon = document.createElement("a")
        misPokemon.textContent = "Mis Pokemon"
        misPokemon.id = "misPokemon"
        misPokemon.href = "#"
        misPokemon.addEventListener("click", miListaPokemon)
        menu.appendChild(misPokemon)
    }else{
        if(localStorage.getItem("SavedToken") === null){
            menu.removeChild(documentosUsuario)
        }
    }
}

function rellenarContainerDeTarjetas(listaPokemon){
    let cardContainer = document.getElementById("container");
    console.log(listaPokemon);
    borrarDomTarjetas()
    listaPokemon.forEach(pokemon => {
            // console.log(pokemon);
        let newCard = document.createElement("div")
        newCard.className = "item"

        let pokNumberDiv = document.createElement("div")
        pokNumberDiv.className = "container_item_pokedexNumber_captured"
        let pokNumber = document.createElement("h3")
        pokNumber.textContent = "Nº " + pokemon.pokemonNumber;
        pokNumberDiv.appendChild(pokNumber)

        let pokImageDiv = document.createElement("div")
        pokImageDiv.className = "image-container"
        let pokImg = document.createElement("img")
        pokImg.src = pokemon.urlImg

        pokImageDiv.appendChild(pokImg)


        let pokemonName = document.createElement("h2")
        pokemonName.textContent = pokemon.name.substring(0, 1).toUpperCase() + pokemon.name.substring(1);

        let typeDiv = document.createElement("div")
        let typeList = document.createElement("ul")
        pokemon.pokemonType.forEach(type => {
            let pokemonType = document.createElement("li")
            pokemonType.textContent = type.name.substring(0, 1).toUpperCase() + type.name.substring(1);;
            typeList.appendChild(pokemonType)
        })
        typeDiv.appendChild(typeList)

        newCard.appendChild(pokNumberDiv)
        newCard.appendChild(pokImageDiv)
        newCard.appendChild(pokemonName)
        newCard.appendChild(typeDiv)

        // console.log(newCard);
        cardContainer.appendChild(newCard)
    })
}

document.getElementById("actualPage").addEventListener("click", function(event){
    event.preventDefault();
    cargaPokemon("http://localhost:3000/api/pokemon/paginated?range=10000&offset=0")
})

cargaPokemon("http://localhost:3000/api/pokemon/paginated");


document.getElementById("prevPage").addEventListener("click", function(){cargaPokemon(anterior)})

document.getElementById("nextPage").addEventListener("click", function(){cargaPokemon(siguiente)})
