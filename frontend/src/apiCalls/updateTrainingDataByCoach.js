import { getCurrentUser } from '../helpers/authHelper';
import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'trainingData/updateTrainingDataByCoach';

export const updateTrainingDataByCoach = async ({ exerciseId, userId, text }) => {
  const token = getCurrentUser();
  try {
        const formData = new FormData();
        formData.append('ExerciseId', exerciseId);
        formData.append('UserId', userId);
        formData.append('Text', text);

        const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
        });
   
        return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};