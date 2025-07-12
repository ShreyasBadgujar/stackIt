import React from 'react';
import MainContent from './MainContent';
import QuestionCard from './QuestionCard';

const HomeScreen = ({ setCurrentScreen }) => {
  const featuredQuestions = [
    {
      id: 1,
      title: "How do you join 2 columns in a data set to make a separate column in SQL?",
      description: "I am looking for a way to create a formula that takes the values from two columns and puts them in a new column. Let me know if you have any solutions for this problem.",
      tags: ['sql', 'database', 'join'],
      votes: 15,
      answers: 3,
      author: 'john_doe',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: "React useState hook not updating state immediately",
      description: "I'm having trouble with React state updates. The state doesn't seem to update immediately after calling setState. What am I missing?",
      tags: ['react', 'javascript', 'hooks'],
      votes: 23,
      answers: 7,
      author: 'react_dev',
      time: '4 hours ago'
    },
    {
      id: 3,
      title: "Best practices for CSS Grid vs Flexbox",
      description: "When should I use CSS Grid over Flexbox? What are the main differences and use cases for each?",
      tags: ['css', 'grid', 'flexbox'],
      votes: 18,
      answers: 5,
      author: 'css_ninja',
      time: '6 hours ago'
    }
  ];

  return (
    <MainContent>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to StackIt</h1>
        <p className="text-gray-300 text-lg">
          Get help from the community. Ask questions, share knowledge, and learn together.
        </p>
      </div>

      <div className="lg:hidden mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white text-sm font-semibold mb-3">Quick Filters</h3>
          <div className="grid grid-cols-2 gap-2">
            <select className="bg-gray-700 text-white px-3 py-2 rounded text-sm">
              <option>Recent</option>
              <option>Popular</option>
              <option>Most Answered</option>
            </select>
            <select className="bg-gray-700 text-white px-3 py-2 rounded text-sm">
              <option>All Categories</option>
              <option>JavaScript</option>
              <option>React</option>
              <option>CSS</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Featured Questions</h2>
        {featuredQuestions.map(question => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={() => setCurrentScreen('browse')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          View All Questions
        </button>
      </div>
    </MainContent>
  );
};

export default HomeScreen;