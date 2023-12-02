import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/userProfile/deleteUser';

export const deleteCoachUnverified = async ({ email }) => {
  const token = getCurrentUser();
  try {
      const response = await fetch(baseUrl, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(
              {
                  "email": email,
              }
          ),
      });
  
      return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};