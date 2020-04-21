const chai = require("chai");
const chaiHttp = require("chai-http");
const { setupExpressServer } = require("../src/server");
chai.use(chaiHttp);
chai.should();

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */

const app = setupExpressServer();

describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  describe("sprint basics", () => {
    describe("GET /api/pokemon", () => {
      it("should return full list of Pokemon", async () => {
        const res = await request.get("/api/pokemon");
        res.should.be.json;
        JSON.parse(res.text).length.should.equal(151);
      });
      it("should be able to take a query parameter limit = n", async () => {
        const res = await request.get("/api/pokemon").query({ limit: 10 }); // GET /api/pokemon?limit=10
        res.should.be.json;
        JSON.parse(res.text).length.should.equal(10);
      });
    });

    describe("POST /api/pokemon", () => {
      it("should add a pokemon", async () => {
        const pokemon = {
          id: "152",
          name: "Pichu",
          types: ["Electric"],
        };
        const res = await request.post("/api/pokemon").send(pokemon);
        res.should.have.status(200);
      });
    });

    describe("GET /api/pokemon/:id", () => {
      it("should return the Pokemon with given id", async () => {
        const res = await request.get("/api/pokemon/001");
        res.should.be.json;
        JSON.parse(res.text).name.should.equal("Bulbasaur");
      });
      it("should accept leading zeros", async () => {
        const res = await request.get("/api/pokemon/1");
        res.should.be.json;
        JSON.parse(res.text).name.should.equal("Bulbasaur");
      });
    });

    describe("GET /api/pokemon/:name", () => {
      it("should return the Pokemon with given name", async () => {
        const res = await request.get("/api/pokemon/Bulbasaur");
        res.should.be.json;
        JSON.parse(res.text).name.should.equal("Bulbasaur");
      });
      it("should be case-insensitive", async () => {
        const res = await request.get("/api/pokemon/BULBASAUR");
        res.should.be.json;
        JSON.parse(res.text).name.should.equal("Bulbasaur");
      });
    });

    describe("PATCH /api/pokemon/:idOrName", () => {
      it("should allow you to make partial modifications to a Pokemon using NAME", async () => {
        const res = await request
          .patch("/api/pokemon/Bulbasaur")
          .send({ name: "Babysaur" });
        res.should.be.json;
        JSON.parse(res.text).name.should.equal("Babysaur");
      });

      describe("PATCH /api/pokemon/:idOrName", () => {
        it("should allow you to make partial modifications to a Pokemon using ID", async () => {
          const res = await request
            .patch("/api/pokemon/001")
            .send({ name: "Babysaur" });
          res.should.be.json;
          JSON.parse(res.text).name.should.equal("Babysaur");
        });
      });
    });

    describe("DELETE /api/pokemon/:idOrName", () => {
      it("It should delete the given Pokemon by NAME", async () => {
        const res = await request.delete("/api/pokemon/Bulbasaur");
        console.log(res.statusCode, "LISTENING ------------- ");
        res.should.have.status(200);
        const res2 = await request.get("/api/pokemon/Bulbasaur");
        res2.should.be.json;
        res2.text.should.equal(undefined);
      });
    });
    xdescribe("DELETE /api/pokemon/:idOrName", () => {
      it("It should delete the given Pokemon by ID", async () => {
        const res = await request.delete("/api/pokemon/001");
        res.should.have.status(200);
        const res2 = await request.get("/api/pokemon/001");
        res2.should.be.json;
        res2.text.should.equal(undefined);
      });
    });

    xdescribe("GET /api/pokemon/:idOrName/evolutions", () => {
      it("It should return the evolutions a Pokemon has", async () => {
        const res = await request.get("/api/pokemon/staryu/evolutions");
        res.should.be.json;
        JSON.parse(res.text).should.deep.equal([{ id: 121, name: "Starmie" }]);
      });

      it("It should return an empty array if the Pokemon has no evolutions", async () => {
        const res = await request.get("/api/pokemon/Raichu/evolutions");
        res.should.be.json;
        JSON.parse(res.text).should.deep.equal([]);
      });
    });
  });
});
