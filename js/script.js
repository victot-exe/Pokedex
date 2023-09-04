const pokemonName = document.querySelector('.pokemon__name')
const pokemoNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const fetchPokemon = async(pokemon) =>{

    pokemon = pokemon.toLowerCase()
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
        pokemonName.innerHTML = data.name
        pokemoNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
    }else{
        pokemonName.innerHTML = 'Not found :c'
        pokemoNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    renderPokemon(input.value)
})

renderPokemon('1')