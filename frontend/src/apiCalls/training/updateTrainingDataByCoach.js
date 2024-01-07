import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'trainingData/updateTrainingDataByCoach';

export const updateTrainingDataByCoach = async ({ exerciseId, userId, text, file }) => {
  const token = getCurrentUser();
  try {
        const formData = new FormData();
        formData.append('ExerciseId', exerciseId);
        formData.append('UserId', userId);
        formData.append('Text', text);
        formData.append('File', file);

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