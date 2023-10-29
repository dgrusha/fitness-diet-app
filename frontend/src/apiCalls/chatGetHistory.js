import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/chat/getChatHistory';

export const getChatHistory = async ({ receiverEmail }) => {
  const token = getCurrentUser();
  const url = `${baseUrl}?receiverEmail=${encodeURIComponent(receiverEmail)}`;

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