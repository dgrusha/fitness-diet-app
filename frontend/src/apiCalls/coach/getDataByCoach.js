import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const types ={
    "diet": `${process.env.REACT_APP_BASE_URL}` + 'dietData/getDietDataByCoach',
    "training": `${process.env.REACT_APP_BASE_URL}` + 'trainingData/getTrainingDataByCoach'
}

export const getDataByCoach = async ({ userId, dataType }) => {
  const token = getCurrentUser();
  const url = `${types[dataType]}?userId=${encodeURIComponent(userId)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const answer = await response.json();
      return answer;
    } else {
      throw new Error(`Error submitting form: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error submitting form: ${error.message}`);
  }
};
