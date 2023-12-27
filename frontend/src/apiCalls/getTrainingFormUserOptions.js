import { getCurrentUser } from '../helpers/authHelper';
import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'trainingForm/getAllWithUserChoicesOptions';

export const getTrainingFormWithUserChoicesOptions = async () => {
  const token = getCurrentUser();
  try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return [];
      }
      let answer = await response.json();
      return answer;
    } catch (error) {
        return [];
    }
};