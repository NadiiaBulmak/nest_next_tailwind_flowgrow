export const userSchema = {
  schema: {
    example: {
      id: 'user-uuid',
      email: 'user@example.com',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
  },
};

export const getAllSchema = {
  schema: {
    example: [
      {
        id: 'user-uuid-1',
        email: 'user1@example.com',
        name: 'John Doe',
      },
      {
        id: 'user-uuid-2',
        email: 'user2@example.com',
        name: 'Jane Doe',
      },
    ],
  },
};
