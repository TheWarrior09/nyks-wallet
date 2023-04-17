import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

type QueryKey = [string, string];

export async function queryFunctionWithAxios(context: QueryFunctionContext<QueryKey>) {
  const { queryKey, signal } = context;
  const [_, url] = queryKey;
  return (await axios.get(url, { signal })).data;
}
