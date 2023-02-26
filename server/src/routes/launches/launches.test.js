const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "March 4, 2023",
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
  };

  const launchDataWithoutInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "zoot",
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missed requiring properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It can catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
