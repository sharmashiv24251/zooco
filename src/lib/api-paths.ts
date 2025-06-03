export const API_ROUTES = {
  // Pet routes
  pets: "/api/pets",
  petById: (id: string) => `/api/pets/${id}`,
  
  // Reminder routes
  reminders: "/api/reminders",
  reminderById: (id: string) => `/api/reminders/${id}`,
  
  // Utility routes
  seed: "/api/seed"
} as const;