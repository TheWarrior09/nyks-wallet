import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

export async function queryFunctionWithAxios(context: QueryFunctionContext<string[]>) {
  const { queryKey, signal } = context;
  const [_, url] = queryKey;
  return (await axios.get(url, { signal })).data;
}
