import { getCurrentUser } from '../helpers/authHelper';
import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'trainingForm/requestGenerateFile';

export const requestGenerateFile = async () => {
  const token = getCurrentUser();
  try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response; 
    } catch (error) {
        return [];
    }
};