import { useQuery } from 'react-query';

const getPlatformsData = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/platforms`
  );
  return response.json();
};

export function useGetPlatforms() {
  const { data } = useQuery({
    queryKey: ['platform'],
    queryFn: getPlatformsData,
  });
  return data;
}
