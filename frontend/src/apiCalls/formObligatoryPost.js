import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'obligatoryForm/add';

export const addObligatoryForm = async ({ weight, height, allergies }) => {
  const token = getCurrentUser();
  try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(
              {
                  "weight": weight,
                  "height" : height,
                  "allergies": allergies,
              }
          ),
      });
  
      return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};