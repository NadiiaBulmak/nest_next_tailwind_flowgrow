export const goalSchema = {
  schema: {
    example: {
      id: 'goal-uuid',
      user_id: 'user-uuid',
      target_hours_per_day: 8,
      createdAt: '2026-02-17T00:00:00Z',
      updatedAt: '2026-02-17T00:00:00Z',
    },
  },
};

export const goalPostExample = {
  examples: {
    default: {
      summary: 'Example request',
      value: {
        target_hours_per_day: 8,
      },
    },
  },
};
