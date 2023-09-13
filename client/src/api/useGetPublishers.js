import { useQuery } from 'react-query';

const getPublisherData = async () => {
  const response = await fetch('http://localhost:8000/api/publishers');
  return response.json();
};

export function useGetPublishers() {
  const { data } = useQuery({
    queryKey: ['publisher'],
    queryFn: getPublisherData,
  });
  return data;
}
