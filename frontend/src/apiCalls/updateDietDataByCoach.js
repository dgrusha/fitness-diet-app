import { getCurrentUser } from '../helpers/authHelper';
import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'dietData/updateDietDataByCoach';

export const updateDietDataByCoach = async ({ recipeId, userId, text }) => {
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
                  "recipeId": recipeId,
                  "userId" : userId,
                  "text": text,
              }
          ),
      });
      
      return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};