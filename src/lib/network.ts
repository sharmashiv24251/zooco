import { API_ROUTES } from "./api-paths";


// Types
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  reminders: Reminder[];
  createdAt: string;
}

export interface Reminder {
  id: string;
  title: string;
  note?: string;
  petId: string;
  pet?: Pet;
  time: string;
  date: string;
  frequency: string;
  category: string;
  status: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface NetworkResponse<T> {
  data: T | null;
  statusCode: number;
  error?: string;
}

// Base fetch function with error handling
async function baseFetch<T>(
  url: string,
  options?: RequestInit
): Promise<NetworkResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const result: ApiResponse<T> = await response.json();

    return {
      data: result.success ? result.data || null : null,
      statusCode: response.status,
      error: result.success ? undefined : result.error || 'Unknown error',
    };
  } catch (error) {
    console.error('Network error:', error);
    return {
      data: null,
      statusCode: 500,
      error: 'Network error occurred',
    };
  }
}

// Pet API Functions
export async function fetchPets(): Promise<NetworkResponse<Pet[]>> {
  return baseFetch<Pet[]>(API_ROUTES.pets);
}

export async function fetchPetById(id: string): Promise<NetworkResponse<Pet>> {
  return baseFetch<Pet>(API_ROUTES.petById(id));
}

export async function createPet(petData: {
  name: string;
  breed: string;
  age: number;
}): Promise<NetworkResponse<Pet>> {
  return baseFetch<Pet>(API_ROUTES.pets, {
    method: 'POST',
    body: JSON.stringify(petData),
  });
}

export async function updatePet(
  id: string,
  petData: {
    name: string;
    breed: string;
    age: number;
  }
): Promise<NetworkResponse<Pet>> {
  return baseFetch<Pet>(API_ROUTES.petById(id), {
    method: 'PUT',
    body: JSON.stringify(petData),
  });
}

export async function deletePet(id: string): Promise<NetworkResponse<{ message: string }>> {
  return baseFetch<{ message: string }>(API_ROUTES.petById(id), {
    method: 'DELETE',
  });
}

// Reminder API Functions
export async function fetchReminders(): Promise<NetworkResponse<Reminder[]>> {
  return baseFetch<Reminder[]>(API_ROUTES.reminders);
}

export async function fetchReminderById(id: string): Promise<NetworkResponse<Reminder>> {
  return baseFetch<Reminder>(API_ROUTES.reminderById(id));
}

export async function createReminder(reminderData: {
  title: string;
  note?: string;
  petId: string;
  time: string;
  date: string;
  frequency: string;
  category: string;
  status: string;
}): Promise<NetworkResponse<Reminder>> {
  return baseFetch<Reminder>(API_ROUTES.reminders, {
    method: 'POST',
    body: JSON.stringify(reminderData),
  });
}

export async function updateReminder(
  id: string,
  reminderData: {
    title: string;
    note?: string;
    time: string;
    date: string;
    frequency: string;
    category: string;
    status: string;
  }
): Promise<NetworkResponse<Reminder>> {
  return baseFetch<Reminder>(API_ROUTES.reminderById(id), {
    method: 'PUT',
    body: JSON.stringify(reminderData),
  });
}

export async function deleteReminder(id: string): Promise<NetworkResponse<{ message: string }>> {
  return baseFetch<{ message: string }>(API_ROUTES.reminderById(id), {
    method: 'DELETE',
  });
}

// Utility function for seeding database
export async function seedDatabase(): Promise<NetworkResponse<{ message: string }>> {
  return baseFetch<{ message: string }>(API_ROUTES.seed, {
    method: 'POST',
  });
}