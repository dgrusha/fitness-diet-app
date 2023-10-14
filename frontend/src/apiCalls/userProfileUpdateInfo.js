import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/userProfile/updatedUser';

export const updateUserProfile = async ({ name, surname }) => {
  const token = getCurrentUser();
  try {
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(
              {
                  "firstName": name,
                  "lastName" : surname
              }
          ),
      });
  
      return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};