export const sessionPresetSchema = {
  schema: {
    example: {
      id: 'preset-uuid',
      user_id: 'user-uuid',
      name: 'Pomodoro',
      type: 'SESSION',
      duration: 25,
      cycles: 4,
      rest_duration: 5,
      animation: 'fade',
      end_sound: 'bell',
      createdAt: '2026-02-17T00:00:00Z',
      updatedAt: '2026-02-17T00:00:00Z',
    },
  },
};

export const sessioPresetPostExample = {
  examples: {
    default: {
      summary: 'Example request',
      value: {
        name: 'Pomodoro',
        type: 'SESSION',
        duration: 25,
        cycles: 4,
        rest_duration: 5,
        animation: 'fade',
        end_sound: 'bell',
      },
    },
  },
};

export const getAllSessionSchema = {
  schema: {
    example: [
      {
        id: '2a1c66b8-ccf3-4ec1-ac65-f4fe6870ce7e',
        user_id: 'e8c29723-6b19-4972-a27a-e3bded11b7d2',
        name: 'Pomodoro',
        type: 'SESSION',
        duration: 25,
        cycles: 4,
        rest_duration: 5,
        animation: 'fade',
        end_sound: 'bell',
        created_at: '2026-02-18T11:09:39.599Z',
        updated_at: '2026-02-18T11:09:39.599Z',
      },
    ],
  },
};
