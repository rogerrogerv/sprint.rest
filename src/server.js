const pokeData = require("./data");
const express = require("express");
const helper = require("./helpers");
const capitalize = helper.capitalize;
const indexOf = helper.indexOf;

const setupExpressServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();

  app.use(express.json()); // JSON serializer/deserializer middleware

  app.get("/api/pokemon", (request, response) => {
    let pokemonResponse = [];
    const limit = request.query.limit;
    if (limit === undefined) {
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

  app.get("/api/pokemon/:idOrName", (request, response) => {
    let pokemonResponse = "";
    // For :name params
    if (!parseInt(request.params.idOrName)) {
      const pokeName = capitalize(request.params.idOrName);
      pokemonResponse = pokeData.pokemon[indexOf(pokeName)];
    } else {
      const pokeID = parseInt(request.params.idOrName, 10) - 1;
      pokemonResponse = pokeData.pokemon[pokeID];
    }
    response.send(pokemonResponse);
  });

  // app.get("/api/pokemon/:id", (request, response, next) => {
  //   // if (!parseInt(request.params.id)) return next();
  //   const pokeID = parseInt(request.params.id, 10);
  //   const pokemonResponse = pokeData.pokemon[pokeID - 1];
  //   response.send(pokemonResponse);
  // });

  // app.get("/api/pokemon/:name", (request, response) => {
  //   let pokeName = request.params.name.toLowerCase();
  //   pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
  //   let pokemonResponse = "";
  //   for (const pokemon in pokeData.pokemon) {
  //     if (pokeData.pokemon[pokemon].name === pokeName)
  //       pokemonResponse = pokeData.pokemon[pokemon];
  //   }
  //   response.send(pokemonResponse);
  // });

  app.patch("/api/pokemon/:idOrName", (request, response) => {
    let pokemonResponse = "";
    // For :name params
    if (!parseInt(request.params.idOrName)) {
      const pokeName = capitalize(request.params.idOrName);
      for (const pokemon in pokeData.pokemon) {
        if (pokeData.pokemon[pokemon].name === pokeName) {
          // Update pokemon's properties
          for (const prop in request.body) {
            pokeData.pokemon[pokemon][prop] = request.body[prop];
          }
          pokemonResponse = pokeData.pokemon[pokemon];
        }
      }
    } else {
      const pokeID = parseInt(request.params.idOrName, 10) - 1;
      // Update pokemon's properties
      for (const prop in request.body) {
        pokeData.pokemon[pokeID][prop] = request.body[prop];
      }
      pokemonResponse = pokeData.pokemon[pokeID];
    }

    response.send(pokemonResponse);
  });

  app.delete("/api/pokemon/:idOrName", (request, response) => {
    if (!parseInt(request.params.idOrName)) {
      const pokeName = capitalize(request.params.idOrName);
      pokeData.pokemon.splice(indexOf(pokeName), 1);
    } else {
      const pokeID = parseInt(request.params.idOrName, 10) - 1;
      pokeData.pokemon.splice(pokeID, 1);
    }
    response.status(200).send();
  });

  return app;
};

module.exports = { setupExpressServer };
