import { useContext, createContext } from 'react';

export type GlobalContent = {
  response: any,
  setResponse: (r: any) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  response: null,
  setResponse: () => {}
})

export const useGlobalContext = () => useContext(MyGlobalContext);
