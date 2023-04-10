import bcrypt from 'bcrypt';

describe('encryptPassword', () => {
  it('should encrypt password correctly', async () => {
    const password = 'testpassword123';
    const encryptedPassword = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, encryptedPassword);

    expect(isMatch).toBe(true);
  });
});
