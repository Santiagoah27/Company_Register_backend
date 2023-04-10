import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Company from '../models/Company';

describe('Company model', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should use NIT as primary key', async () => {
    const NIT = '123456789';
    const companyName = 'Test Company';
    const phone = '3125429207';
    const address = '123 Test Street';

    const company = new Company({ NIT, name: companyName, phone, address });
    await company.save();

    const foundCompany = await Company.findOne({ NIT });

    expect(foundCompany.name).toEqual(companyName);
  });
});
