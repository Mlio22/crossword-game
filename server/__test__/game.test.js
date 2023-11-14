const app = require(".app");
const request = require("supertest");
const { Admin, Player, Game } = required("../models");
const { hashPass } = require("../helpers/bcrypt");

describe("Game tests", () => {
  let token;

  beforeAll(async () => {
    const adminData = [
      {
        email: "admin@example.com",
        password: hashPass("12345678"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await Admin.bulkCreate(adminData);

    const adminLoginResponse = await request(app).post("/admin/login").send({
      email: "admin@example.com",
      password: "12345678",
    });

    token = adminLoginResponse.access_token;
  });

  afterAll(async () => {
    await Admin.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  });

  beforeEach(async () => {
    const gameData = [
      {
        title: "Front-end",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Back-end",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Game.bulkCreate(gameData);
  });

  describe("GET /admin/games", () => {
    it("should return 200 and list of game datas", async () => {
      const response = await request(app)
        .get("/admin/games")
        .set("Authorization", "Bearer " + token);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("data", expect.any(Array));
      expect(response.body.data).toHaveLength(2);

      for (const data of response.body.data) {
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("id", expect.any(Number));
        expect(data).toHaveProperty("title", expect.any(String));
      }
    });

    it("should return 401 when user is unauthorized", async () => {
      const response = await request(app).get("/admin/games");

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "please sign in");
    });

    it("should return 401 when token is invalid", async () => {
      const response = await request(app)
        .get("/admin/games")
        .set("Authorization", "Bearer " + "ABCAJSN");

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
});
