const pokeData = require("./data");
const express = require("express");

const setupExpressServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();

  app.use(express.json()); // JSON serializer/deserializer middleware

  app.get("/api/pokemon", (request, response) => {
    let pokemonResponse = [];
    const limit = request.query.limit;
    if (request.query.limit === undefined) {
      pokemonResponse = pokeData.pokemon;
    }

    pokemonResponse = pokeData.pokemon.slice(0, limit); // slice instead

    response.send(pokemonResponse);
  });

  app.post("/api/pokemon", (request, response) => {
    const newPokemon = request.body;
    pokeData.pokemon.push(newPokemon);
    response.send(newPokemon);
  });

  app.get("/api/pokemon/:id", (request, response) => {
    const pokeID = parseInt(request.params.id, 10);
    const pokemonResponse = pokeData.pokemon[pokeID - 1];
    response.send(pokemonResponse);
  });

  app.get("/api/pokemon/:name", (request, response) => {
    console.log(request, "*********************");
    // const pokeName = request.params.name;
    // const pokemonResponse = pokeData.pokemon[indexOf(pokeName)];
    // console.log(pokemonResponse, "--------------------");

    // response.send(pokemonResponse);
  });

  return app;
};

module.exports = { setupExpressServer };
