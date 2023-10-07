const baseUrl = 'allergy/getAll';

export const getAllergies = async () => {
    try {
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZTE0ZTllOS01OTg1LTQ0YjgtOGNjMS00ZTkwMDFlMzNkYTkiLCJqdGkiOiIwNjNlOTE5YS0yNmJmLTQ3ZjctOWQyNC04ZTZiZmVjOWUzYTUiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImV4cCI6MTY5NzA0MzA0NSwiaXNzIjoiRml0bmVzc0NPIiwiYXVkIjoiRml0bmVzc0F1ZGllbmNlIn0.BBr7Jkswonb5BKpWhizgfpImv2phWSYRe44UiNwowdI',
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