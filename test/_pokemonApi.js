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
        const res = await request.get("/api/pokemon/Geodude");
        res.should.be.json;
        JSON.parse(res.text).name.should.equal("Geodude");
      });
      it("should be case-insensitive", async () => {
        const res = await request.get("/api/pokemon/PIKACHU");
        res.should.be.json;
        JSON.parse(res.text).name.should.equal("Pikachu");
      });
    });
  });
});
