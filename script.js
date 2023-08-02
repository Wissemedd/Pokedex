// Définition des variables startIndex et pokemonsNumber
let startIndex = 1; // Indice de départ pour récupérer les Pokémon
let pokemonsNumber = 15; // Nombre de Pokémon à récupérer à chaque chargement

// Fonction pour créer une carte de Pokémon
function createPokemonCard(pokemon) {
  // Extraction du type du Pokémon et mise en majuscule de la première lettre du nom
  const type = pokemon.types[0].type.name;
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  // Ajout d'une carte de Pokémon au conteneur "pokemonContainer" dans le document HTML
  document.querySelector("#pokemonContainer").innerHTML += `
    <div class="pokemon ${type}">
      <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}" />
      </div>
      <div class="info">
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
      </div>
    <div>
  `;
}

// Fonction pour récupérer les données des Pokémon depuis l'API et créer leurs cartes
function fetchPokemons() {
  // Boucle pour récupérer les Pokémon depuis l'indice startIndex jusqu'à pokemonsNumber
  for (let i = startIndex; i <= pokemonsNumber; i++) {
    // Appel à l'API pour récupérer les informations du Pokémon avec l'indice i
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((response) => response.json())
      .then((data) => {
        // Appel de la fonction createPokemonCard pour créer la carte du Pokémon avec les données récupérées
        createPokemonCard(data);
      });
  }
}

// Ajout d'un écouteur d'événements sur le bouton "next"
document.querySelector("#next").addEventListener("click", function () {
  // Mise à jour des variables startIndex et pokemonsNumber pour récupérer les Pokémon suivants
  startIndex += pokemonsNumber;
  pokemonsNumber += pokemonsNumber;

  // Appel de la fonction fetchPokemons pour récupérer et afficher les nouveaux Pokémon
  fetchPokemons();
});

// Premier chargement initial des Pokémon
fetchPokemons();
