import { createContext, useContext } from 'react';

const PreviewContext = createContext<boolean>(false);

export const usePreview = () => useContext(PreviewContext);

export const PreviewProvider = PreviewContext.Provider;
