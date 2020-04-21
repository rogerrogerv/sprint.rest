const pokeData = require("./data");

function capitalize(input) {
  let upped = input.toLowerCase();
  upped = upped.charAt(0).toUpperCase() + upped.slice(1);
  return upped;
}

function indexOf(name) {
  return pokeData.pokemon.findIndex((pokemon) => pokemon.name === name);
}

module.exports = { capitalize: capitalize, indexOf: indexOf };
