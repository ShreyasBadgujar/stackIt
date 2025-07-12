import React, { useEffect, useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import MainContent from './MainContent';
import API from '../api';

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyQuestions = async () => {
    try {
      const res = await API.get('/api/questions/mine');
      setQuestions(res.data);
    } catch (error) {
      console.error("Failed to fetch my questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyQuestions();
  }, []);

  return (
    <MainContent>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-white mb-6">My Questions</h1>

        {loading ? (
          <div className="flex justify-center items-center h-32 text-white">
            <Loader2 className="animate-spin mr-2" /> Loading...
          </div>
        ) : questions.length === 0 ? (
          <div className="text-gray-400 text-center">
            You haven’t asked any questions yet.
            <Link
              to="/ask"
              className="text-purple-400 hover:underline ml-2"
            >
              Ask one now!
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <Link
                to={`/questions/${q._id}`}
                key={q._id}
                className="block bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-5 transition-all duration-200 shadow-lg group"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-white font-semibold text-lg">
                    {q.title}
                  </h2>
                  <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{q.description?.replace(/<[^>]+>/g, '')}</p>
                <div className="flex flex-wrap mt-3 gap-2">
                  {q.tags?.slice(0, 5).map((tag, idx) => (
                    <span key={idx} className="bg-gray-700 text-xs text-white px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainContent>
  );
};

export default MyQuestions;
