// This service no longer uses the Gemini API.
// It provides a random inspirational quote from a predefined list.

const quotes = [
  "The best way to predict the future is to create it. - Peter Drucker",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The journey of a thousand miles begins with a single step. - Lao Tzu",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The secret of getting ahead is getting started. - Mark Twain",
  "Well done is better than well said. - Benjamin Franklin",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "It does not matter how slowly you go as long as you do not stop. - Confucius"
];

export const getInspirationalQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
