const app = require(".app");
const request = require("supertest");
const { Admin, Player } = required("../models");
const { hashPass } = require("../helpers/bcrypt");

describe("Admin Tests", () => {
  const adminData = {
    email: "admin@example.com",
    password: hashPass("12345678"),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeAll(async () => {
    await Admin.bulkCreate([adminData]);
  });

  afterAll(async () => {
    await Admin.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  });

  describe("POST /admin/login", () => {
    it("should login successfully and return access_token", async () => {
      const response = await request(app).post("/admin/login").send({
        email: "admin1@example.com",
        password: "12345678",
      });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
      expect(response.body.access_token).toContain("Bearer ");
    });

    it("should return 400 if email isn't inputted", async () => {
      const response = await request(app).post("/admin/login").send({
        password: "12345678",
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Please fill the login form");
    });

    it("should return 400 if password isn't inputted", async () => {
      const response = await request(app).post("/admin/login").send({
        email: "admin1@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Please fill the login form");
    });

    it("should return 401 if credentials does't match", async () => {
      const response = await request(app).post("/admin/login").send({
        email: "admin1@example.com",
        password: "1234567",
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Wrong email / password");
    });
  });

  describe("GET /admin/logout", () => {
    let token;

    beforeAll(async () => {
      const response = await request(app).post("/login").send({
        email: "admin1@example.com",
        password: "12345678",
      });

      token = response.body.access_token;
    });

    it("should logged out successfully and return 200", async () => {
      const response = await request(app)
        .get("/admin/logout")
        .set("Authorization", "Bearer " + token);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "logged out succesfully");
    });
  });
});

