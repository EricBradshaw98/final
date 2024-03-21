const { getUsers } = require('../emailService/emailPeriodically');

describe('getUsers', () => {
  it('should return an array of user emails', async () => {
    // Mock database query
    const mockRows = [{ email: 'test1@example.com' }, { email: 'test2@example.com' }];
    const mockPool = {
      query: jest.fn().mockResolvedValue({ rows: mockRows }),
    };

    // Invoke the function
    const users = await getUsers(mockPool);

    // Assertions
    expect(users).toHaveLength(2);
    expect(users).toEqual(['test1@example.com', 'test2@example.com']);
  });

  it('should handle errors gracefully', async () => {
    // Mock database query with error
    const mockPool = {
      query: jest.fn().mockRejectedValue(new Error('Database error')),
    };

    // Invoke the function
    const users = await getUsers(mockPool);

    // Assertions
    expect(users).toEqual([]);
  });
});