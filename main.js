const pokebola = document.querySelector(".pokebola-image");
const pokemonElement = document.querySelector("div.pokemon");
const titleStart = document.querySelector(".title-start");

const randomId = () => Math.floor(Math.random() * 905);
const getAbilities = (abilities) => abilities.map((item) => item.ability.name);
const createAbilities = (abilities) =>
  abilities.reduce((acc, item) => (acc += `<li>${item}</li>`), "");

const createPokemon = ({ image, name, abilities }) => {
  pokemonElement.innerHTML = `
  <div class="pokemon-wrapperImage">
  <img
          src="${image}"
          class="pokemon-image"
          alt="pokemon ${name}"
          />
          </div>
          <div class="pokemon-info">
          <h2 class="pokemon-name">${name}</h2>
          <ul class="pokemon-abilities">
          ${createAbilities(abilities)}
          </ul>
          </div>
          `;
};

pokebola.addEventListener("click", async () => {
  const urlApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId()}`);
  const response = await urlApi.json();
  const { name, abilities, ...pokemon } = response;
  const pokemonImage = pokemon.sprites.other.dream_world.front_default;
  const pokemonSelected = {
    name: name,
    image: pokemonImage ? pokemonImage : "./assets/img/pokemon-logo.png",
    abilities: getAbilities(abilities),
  };
  createPokemon(pokemonSelected);
  titleStart.classList.add("select");
});
