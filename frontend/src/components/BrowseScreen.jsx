import React, { useEffect, useState } from 'react';
import MainContent from './MainContent';
import { ChevronUp, ChevronDown as ChevronDownVote, Eye, MessageCircle, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const BrowseScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get('/api/questions');
        setQuestions(res.data);
      } catch (err) {
        console.log("API error:", err);
        setError(err.response?.data?.error || 'Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <MainContent>
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

      {loading ? (
        <p className="text-gray-400">Loading questions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="text-gray-300 text-sm mb-4">
            Showing {questions.length} questions
          </div>
          <div className="space-y-6">
            {questions.map((q) => (
              <div
                key={q._id}
                onClick={() => navigate(`/answer/${q._id}`)}
                className="cursor-pointer relative group bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                        {q.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {q.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-200"
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
        </>
      )}
    </MainContent>
  );
};

export default BrowseScreen;
