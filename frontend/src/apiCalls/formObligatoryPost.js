import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/obligatoryForm/add';

export const addObligatoryForm = async ({ weight, height, years, allergies }) => {
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
                  "years": years,
                  "allergies": allergies,
              }
          ),
      });
  
      return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};