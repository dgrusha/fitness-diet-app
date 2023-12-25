import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/subscription/add';

export const subscribe = async ({subcriptionType, coachEmail, duration}) => {
  const token = getCurrentUser();
	console.log(token)
	console.log(subcriptionType)
	console.log(coachEmail)
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
			console.log(response)
      return await response;
    } catch (error) {
        return [];
    }
};