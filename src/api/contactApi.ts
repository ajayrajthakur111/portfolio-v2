

// src/api/contactApi.ts
import api from './axios';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactApi = {
  sendMessage: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/contact', data);
    return response.data;
  }
};
