const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

// Clean up after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Authentication Routes", () => {
  it("should create a new account", async () => {
    const res = await request(app)
      .post("/create-account")
      .send({
        fullName: "Test Userr",
        email: "testuserr@example.com",
        password: "Passworrd123!",
      });

	console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(false);
    expect(res.body.message).toBeDefined();
  });

  it("should log in with correct credentials", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "testuser@example.com",
        password: "Password123!",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(false);
    expect(res.body.accessToken).toBeDefined();
  });

  it("should fail login with incorrect password", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "testuser@example.com",
        password: "WrongPassword",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid Credentials");
  });
});
