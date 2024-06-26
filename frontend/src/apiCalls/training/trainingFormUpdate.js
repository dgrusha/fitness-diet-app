import { getCurrentUser } from '../../helpers/authHelper';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'trainingForm/update';

export const updateTrainingForm = async ({ trainingMode, days }) => {
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
                  "trainingMode": trainingMode,
                  "days" : days
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