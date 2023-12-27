import { getCurrentUser } from '../helpers/authHelper';
import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'feedback/add';

export const leaveFeedback = async ({ levelRating, text }) => {
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
                  "levelRating": levelRating,
                  "text" : text,
              }
          ),
      });
  
      return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};