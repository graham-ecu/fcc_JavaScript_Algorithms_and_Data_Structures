const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


const getPokemon = async () => {
    try {
        const pokemonNameOrId = searchInput.value.toLowerCase();
        const response = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
        );
        const data = await response.json();

        const {name, id, weight: pokeWeight, height: pokeHeight, stats} = data;
        pokemonName.textContent = `${name.toUpperCase()}`;
        pokemonId.textContent = `#${id}`;
        weight.textContent = `Weight: ${pokeWeight}`;
        height.textContent = `Height: ${pokeHeight}`;
        spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;

        hp.textContent = stats[0].base_stat;
        attack.textContent = stats[1].base_stat;
        defense.textContent = stats[2].base_stat;
        specialAttack.textContent = stats[3].base_stat;
        specialDefense.textContent = stats[4].base_stat;
        speed.textContent = stats[5].base_stat;

        types.innerHTML = data.types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
            .join('');
    } catch (err) {
        resetDisplay();
        alert('Pokemon not found');
        console.log('Pokemon not found: ${err}');
    }
};

const resetDisplay = () => {
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();

    pokemonName.textContent = '';
    pokemonId.textContent = '';
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getPokemon();
});
