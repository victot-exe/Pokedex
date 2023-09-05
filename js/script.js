const pokemonName = document.querySelector('.pokemon__name')
const pokemoNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const prevButton = document.querySelector('.btn-prev')
const nextButton = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async(pokemon) =>{

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIresponse.status == 200){
        const data = await APIresponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...'
    pokemoNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemoNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
    }else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :c'
        pokemoNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

prevButton.addEventListener('click', ()=>{
    if(searchPokemon > 1)
    searchPokemon --
    renderPokemon(searchPokemon)
})

nextButton.addEventListener('click', ()=>{
    searchPokemon ++
    renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon)