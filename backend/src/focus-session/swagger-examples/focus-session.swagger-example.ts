export const focusSessionSchema = {
  schema: {
    example: {
      id: 'session-uuid',
      user_id: 'user-uuid',
      preset_id: 'preset-uuid',
      tag_id: 'tag-uuid',
      started_at: '2026-02-17T10:00:00Z',
      finished_at: '2026-02-17T10:25:00Z',
      status: 'COMPLETED',
      actual_duration_seconds: 1500,
      createdAt: '2026-02-17T10:00:00Z',
      updatedAt: '2026-02-17T10:25:00Z',
    },
  },
};

export const focusSessionBodyRequestExample = {
  examples: {
    default: {
      summary: 'Example request',
      value: {
        preset_id: 'preset-uuid',
        tag_id: 'tag-uuid',
        session_data: {
          name: 'Pomodoro',
          type: 'SESSION',
          duration: 25,
          cycles: 4,
          rest_duration: 5,
          animation: 'fade',
          end_sound: 'bell',
        },
        started_at: '2026-02-17T10:00:00Z',
        status: 'RUNNING',
      },
    },
  },
};

export const getAllFocusSession = {
  schema: {
    example: [
      {
        id: 'ab4e3bbd-0e36-4e90-bbbd-5d1789b2dd26',
        user_id: 'e8c29723-6b19-4972-a27a-e3bded11b7d2',
        preset_id: 'e191cb40-f017-472a-bb03-7c1ebca49b95',
        tag_id: null,
        started_at: '2026-02-17T10:00:00.000Z',
        finished_at: null,
        status: 'RUNNING',
        actual_duration_seconds: null,
      },
      {
        id: '7c5bac96-dd88-4f02-861b-2c6986956939',
        user_id: 'e8c29723-6b19-4972-a27a-e3bded11b7d2',
        preset_id: 'e191cb40-f017-472a-bb03-7c1ebca49b95',
        tag_id: null,
        started_at: '2026-02-17T10:00:00.000Z',
        finished_at: null,
        status: 'RUNNING',
        actual_duration_seconds: null,
      },
    ],
  },
};
