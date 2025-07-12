import React, { useState, useEffect } from 'react';
import MainContent from './MainContent';
import { ChevronUp, ChevronDown as ChevronDownVote, Eye, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const HomeScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get('/api/questions');
        setQuestions(res.data.slice(0, 5)); // show top 5 as "Featured"
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.response?.data?.error || 'Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <MainContent className="min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-6">Welcome to StackIt</h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Find answers to your toughest questions, help others, and improve your skills. Browse featured questions below.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Questions</h2>
        {loading ? (
          <p className="text-gray-400">Loading questions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-400">No questions found.</p>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div
                key={q._id}
                onClick={() => navigate(`/answer/${q._id}`)}
                onMouseEnter={() => setHoveredQuestion(q._id)}
                onMouseLeave={() => setHoveredQuestion(null)}
                className={`cursor-pointer relative group bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 ${
                  hoveredQuestion === q._id ? 'ring-2 ring-purple-500/20' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                        {q.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{q.description}</p>
                    </div>
                    <div className={`ml-4 px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty || 'intermediate'}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-1">
                        <span className="flex items-center gap-1 px-2 py-1 text-green-400">
                          <ChevronUp className="w-4 h-4" /> {q.upvotes || 0}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 text-red-400">
                          <ChevronDownVote className="w-4 h-4" /> {q.downvotes || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <MessageCircle className="w-4 h-4" /> {q.answerCount || 0}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-4 h-4" /> 100
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <p>by <span className="text-purple-400 font-medium">{q.userId?.username || 'unknown'}</span></p>
                      <p className="text-xs">{new Date(q.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainContent>
  );
};

export default HomeScreen;
