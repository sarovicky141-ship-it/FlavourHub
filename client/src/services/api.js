const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Unable to reach the FlavourHub API. Check the backend server and VITE_API_URL.');
    }
    throw error;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('The API returned an invalid response.');
  }

  if (!response.ok) {
    const error = new Error(data.message || 'The request could not be completed.');
    error.fieldErrors = data.errors || {};
    throw error;
  }

  if (!data || data.success !== true) {
    throw new Error(data?.message || 'The API did not confirm the request.');
  }

  return data;
}

export const getMenuItems = () => request('/menu');
export const createBooking = (payload) =>
  request('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
