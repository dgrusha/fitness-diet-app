import { getCurrentUser } from '../helpers/authHelper';
import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'dietForm/add';

export const addDietForm = async ({ activityMode, dietMode, cookingRange }) => {
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
                  "activityModeId": activityMode,
                  "dietModeId" : dietMode,
                  "cookingRangeId": cookingRange,
              }
          ),
      });
      if (!response.ok) {
        return [];
      }
      
      let answer = await response.json();
      return answer;
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};