import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'subscription/add';

export const subscribe = async ({subcriptionType, coachEmail, duration}) => {
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
							"coachEmail": coachEmail,
							"subcriptionType": subcriptionType,
							"duration": duration
						}
					),
      });
      return await response;
    } catch (error) {
        return [];
    }
};