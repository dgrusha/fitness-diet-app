import { getCurrentUser } from '../../helpers/authHelper';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'subscription/updateCoach';

export const updateCoachSubscription = async ({ email }) => {
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
                  "Email": email,
              }
          ),
      });
  
      return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};