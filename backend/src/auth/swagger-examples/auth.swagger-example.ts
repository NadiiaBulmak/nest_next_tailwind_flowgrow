export const authLoginResponse = {
  schema: {
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: {
        id: 'user-uuid',
        email: 'user@example.com',
        name: 'John Doe',
      },
    },
  },
};

export const authRegisterResponse = {
  schema: {
    example: {
      id: 'e8c29723-6b19-4972-a27a-e3bded11b7d2',
      email: 'user@example.com',
      name: 'UserUser',
      avatar: null,
      created_at: '2026-02-17T16:42:53.911Z',
      updated_at: '2026-02-17T16:42:53.911Z',
    },
  },
};

export const authRefreshResponse = {
  schema: {
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'refresh-token-value',
    },
  },
};
