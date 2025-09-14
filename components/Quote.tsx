import React, { useState } from 'react';
import { getInspirationalQuote } from '../services/geminiService';

const Quote: React.FC = () => {
  const [quote] = useState<string>(getInspirationalQuote());

  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-700/50 text-center shadow-blue-500/10">
      <h2 className="text-lg font-semibold text-slate-300 mb-2">Daily Inspiration</h2>
      <blockquote className="text-slate-400 italic">
        <p>"{quote.split(' - ')[0]}"</p>
        {quote.includes(' - ') && <footer className="mt-2 not-italic font-semibold text-slate-300">- {quote.split(' - ')[1]}</footer>}
      </blockquote>
    </div>
  );
};

export default Quote;
