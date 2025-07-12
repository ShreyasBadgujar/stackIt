import React, { useEffect, useState } from 'react';
import MainContent from './MainContent';
import QuestionCard from './QuestionCard';
import { Search, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api';


const BrowseScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get('/api/questions');
        setQuestions(res.data);
      } catch (err) {
        console.log("API error:", err)
        setError(err.response?.data?.error || 'Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <MainContent>
      {/* Header and Ask Question Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">All Questions</h1>
        <Link 
          to="/ask"
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Ask Question
        </Link>
      </div>

      {/* Mobile Search Input */}
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

      {/* Questions List */}
      <div className="mb-6">
        {loading ? (
          <p className="text-gray-400">Loading questions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="text-gray-300 text-sm mb-4">
              Showing {questions.length} questions
            </div>
            {questions.map((question) => (
              <QuestionCard key={question._id} question={{
                id: question._id,
                title: question.title,
                description: question.description,
                tags: question.tags,
                votes: 0, // or pull from backend if available
                answers: 0, // same here
                author: question.userId?.username || 'unknown',
                time: new Date(question.createdAt).toLocaleString(),
              }} />
            ))}
          </>
        )}
      </div>

      {/* Pagination (optional) */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50">
          <ChevronLeft size={16} />
        </button>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`px-3 py-2 rounded ${
              num === 1
                ? 'text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
