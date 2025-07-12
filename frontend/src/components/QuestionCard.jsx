import React from 'react';

const QuestionCard = ({ question }) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-6 hover:bg-gray-750 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-white text-lg font-semibold hover:text-blue-400 cursor-pointer">
        {question.title}
      </h3>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span>{question.votes} votes</span>
        <span>{question.answers} answers</span>
      </div>
    </div>
    <p className="text-gray-300 mb-4 line-clamp-3">{question.description}</p>
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {question.tags.map(tag => (
          <span key={tag} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-400">
        Asked by {question.author} • {question.time}
      </div>
    </div>
  </div>
);

export default QuestionCard;
