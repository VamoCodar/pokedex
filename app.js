const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => {
	return fetch(getPokemonUrl(index + 1))
		.then(response => response.json())
})

const generateHTML = (pokemons) => {
	return pokemons.reduce((accumulator, { types, name, id }) => {

		const elementTypes = types.map(typeInfo => typeInfo.type.name)
		const imgUrl = (id) => `https://cdn.traction.one/pokedex/pokemon/${id}.png`

		accumulator +=
			`
		  <li class="card ${elementTypes[0]}">
			<img class="card-image " src="${imgUrl(id)}">
			<h2>${id} ${name}</h2>
			<p class="card-subtitle">${elementTypes.join(" | ")}</p>
		  </li>
		  `
		return accumulator
	}, '')

}

const insertPokemonsIntoPage = pokemons => {
	const ul = document.querySelector('[data-js="pokedex"]')
	ul.innerHTML = pokemons
}

Promise.all(generatePokemonPromises())
	.then(generateHTML)
	.then(insertPokemonsIntoPage)

