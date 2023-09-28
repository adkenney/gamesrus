import { useQuery } from 'react-query';

const getPublisherData = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/publishers`
  );
  return response.json();
};

export function useGetPublishers() {
  const { data } = useQuery({
    queryKey: ['publisher'],
    queryFn: getPublisherData,
  });
  return data;
}
