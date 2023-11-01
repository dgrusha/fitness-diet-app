import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/auth/registerCoach';

export const registerCoach = async ({ firstName, lastName, email, password, text, file }) => {
  const token = getCurrentUser();
  try {
        const formData = new FormData();
        formData.append('FirstName', firstName);
        formData.append('LastName', lastName);
        formData.append('Email', email);
        formData.append('Password', password);
        formData.append('Text', text);
        formData.append('File', file);

        const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
        });
   
        return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};