import React from 'react';
import MainContent from './MainContent';
import QuestionCard from './QuestionCard';
import { Search, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrowseScreen = () => {
  const questions = [
    {
      id: 1,
      title: "How do you join 2 columns in a data set to make a separate column in SQL?",
      description: "I am looking for a way to create a formula that takes the values from two columns and puts them in a new column.",
      tags: ['sql', 'database'],
      votes: 15,
      answers: 3,
      author: 'john_doe',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: "React useState hook not updating state immediately",
      description: "I'm having trouble with React state updates. The state doesn't seem to update immediately after calling setState.",
      tags: ['react', 'javascript'],
      votes: 23,
      answers: 7,
      author: 'react_dev',
      time: '4 hours ago'
    },
    {
      id: 3,
      title: "Best practices for CSS Grid vs Flexbox",
      description: "When should I use CSS Grid over Flexbox? What are the main differences and use cases for each?",
      tags: ['css', 'grid'],
      votes: 18,
      answers: 5,
      author: 'css_ninja',
      time: '6 hours ago'
    }
  ];

  return (
    <MainContent>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">All Questions</h1>
        <Link 
          to="/ask"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Ask Question
        </Link>
      </div>

      <div className="md:hidden mb-6">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-gray-300 text-sm mb-4">
          Showing {questions.length} questions
        </div>
        {questions.map(question => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mb-6">
        <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50">
          <ChevronLeft size={16} />
        </button>
        {[1, 2, 3, 4, 5].map(num => (
          <button 
            key={num}
            className={`px-3 py-2 rounded ${
              num === 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700">
          <ChevronRight size={16} />
        </button>
      </div>
    </MainContent>
  );
};

export default BrowseScreen;