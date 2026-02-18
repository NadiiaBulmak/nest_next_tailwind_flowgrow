export const tagSchema = {
  schema: {
    example: {
      id: 'tag-uuid',
      user_id: 'user-uuid',
      name: 'Work',
      description: 'Work-related tasks',
      color: '#FF5733',
      createdAt: '2026-02-17T00:00:00Z',
      updatedAt: '2026-02-17T00:00:00Z',
    },
  },
};

export const tagBodyRequestExample = {
  examples: {
    default: {
      summary: 'Example request',
      value: {
        name: 'Work',
        description: 'Work-related tasks',
        color: '#FF5733',
      },
    },
  },
};

export const getAllTagsExample = {
  schema: {
    example: [
      {
        id: 'tag-uuid-1',
        name: 'Work',
        color: '#FF5733',
        description: 'Work-related tasks',
      },
      {
        id: 'tag-uuid-2',
        name: 'Personal',
        color: '#33FF57',
        description: 'Work-related tasks',
      },
    ],
  },
};
