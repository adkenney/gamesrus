import { useQuery } from 'react-query';

const getPlatformsData = async () => {
  const response = await fetch('http://localhost:8000/api/platforms');
  return response.json();
};

export function useGetPlatforms() {
  const { data } = useQuery({
    queryKey: ['platform'],
    queryFn: getPlatformsData,
  });
  return data;
}
