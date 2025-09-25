// This service provides a random inspirational quote from a data file.

import { quotes } from '../data/quotes';

export const getInspirationalQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
