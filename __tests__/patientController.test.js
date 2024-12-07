import request from 'supertest'; // For API testing
import mongoose from 'mongoose'; // For MongoDB mocking
import { MongoMemoryServer } from 'mongodb-memory-server'; // In-memory MongoDB for testing
import app from '../index.js'; // Adjust to your main app file
import Patient from '../model/patientModel.js'; // Adjust to your Patient model file

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Patient API - fetchById", () => {
  it("should return a patient by ID", async () => {
    // Seed a patient into the database
    const patient = await Patient.create({ name: "John Doe", age: 30 });

    const response = await request(app).get(`/api/patients/${patient._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.age).toBe(30);
  });

  it("should return 404 if patient not found", async () => {
    const nonExistentId = mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/patients/${nonExistentId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Patient not found");
  });

  it("should return 500 if an error occurs", async () => {
    jest.spyOn(Patient, "findById").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get(`/api/patients/12345`);
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("Internal server error");
  });
});
