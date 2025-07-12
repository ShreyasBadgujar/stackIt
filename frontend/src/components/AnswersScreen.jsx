import React from 'react';
import MainContent from './MainContent';
import { ChevronLeft } from 'lucide-react';

const AnswersScreen = ({ setCurrentScreen }) => (
  <MainContent>
    <div className="mb-6">
      <button 
        onClick={() => setCurrentScreen('browse')}
        className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-4"
      >
        <ChevronLeft size={16} />
        Back to Questions
      </button>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">
          How do you join 2 columns in a data set to make a separate column in SQL?
        </h1>
        <p className="text-gray-300 mb-4">
          I am looking for a way to create a formula that takes the values from two columns 
          and puts them in a new column. Let me know if you have any solutions for this problem.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">sql</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">database</span>
          </div>
          <div className="text-sm text-gray-400">
            Asked by john_doe • 2 hours ago
          </div>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">3 Answers</h2>

      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <button className="text-gray-400 hover:text-green-400">▲</button>
              <span className="text-white font-semibold">15</span>
              <button className="text-gray-400 hover:text-red-400">▼</button>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 mb-4">
                You can use the CONCAT function to join two columns in SQL. Here's the syntax:
              </p>
              <div className="bg-gray-900 rounded p-3 mb-4">
                <code className="text-green-400">
                  SELECT CONCAT(column1, column2) as new_column FROM table_name;
                </code>
              </div>
              <div className="text-sm text-gray-400">
                Answered by sql_expert • 1 hour ago
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <button className="text-gray-400 hover:text-green-400">▲</button>
              <span className="text-white font-semibold">8</span>
              <button className="text-gray-400 hover:text-red-400">▼</button>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 mb-4">
                Another option is to use the || operator (depending on your SQL dialect):
              </p>
              <div className="bg-gray-900 rounded p-3 mb-4">
                <code className="text-green-400">
                  SELECT column1 || column2 as new_column FROM table_name;
                </code>
              </div>
              <div className="text-sm text-gray-400">
                Answered by db_admin • 45 minutes ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Your Answer</h3>
      <textarea
        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none border border-gray-600 focus:border-blue-500 resize-none"
        rows="6"
        placeholder="Write your answer here..."
      />
      <div className="mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
          Post Answer
        </button>
      </div>
    </div>
  </MainContent>
);

export default AnswersScreen;
