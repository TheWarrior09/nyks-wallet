import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

async function queryFunction<T>(url: string) {
  return (await axios.get<T>(url)).data;
}

interface IuseQueryWithAxiosGet<T> {
  queryKey: string[];
  url: string;
  config?: UseQueryOptions<Promise<T>, AxiosError, T>;
}

function useQueryWithAxiosGet<T = any>({ queryKey, url, config }: IuseQueryWithAxiosGet<T>) {
  return useQuery({
    queryKey,
    queryFn: () => queryFunction<T>(url),
    ...config,
  });
}

export default useQueryWithAxiosGet;
