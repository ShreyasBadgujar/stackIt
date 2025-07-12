import React, { useEffect, useState } from 'react';
import MainContent from './MainContent';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import API from '../api';

const AnswersScreen = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId');

  const isOwner = currentUserId === question?.userId?._id;

  const fetchData = async () => {
    try {
      const qRes = await API.get(`/api/questions/${questionId}`);
      setQuestion(qRes.data);

      const aRes = await API.get(`/api/answers/${questionId}`);
      setAnswers(aRes.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [questionId]);

  const handlePostAnswer = async () => {
    if (!newAnswer.trim()) return;
    try {
      const res = await API.post(
        `/api/answers/${questionId}`,
        { description: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswers([res.data, ...answers]);
      setNewAnswer('');
    } catch (err) {
      console.error('Post failed:', err);
    }
  };

  if (loading) return <MainContent><p className="text-gray-400">Loading...</p></MainContent>;
  if (!question) return <MainContent><p className="text-red-500">Question not found</p></MainContent>;

  return (
    <MainContent>
      <div className="mb-6">
        <Link to="/browse" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-4">
          <ChevronLeft size={16} /> Back to Questions
        </Link>

        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700/50">
          <h1 className="text-2xl font-bold text-white mb-3">{question.title}</h1>
          <p className="text-gray-300 mb-4">{question.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag, i) => (
                <span key={i} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-400/30">
                  {tag}
                </span>
              ))}
            </div>
            <span>Asked by {question.userId?.username || 'Anonymous'} • {new Date(question.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">{answers.length} Answers</h2>
        <div className="space-y-6">
          {answers.map((ans) => (
            <div
              key={ans._id}
              className={`rounded-xl p-6 border ${ans.accepted ? 'bg-green-900/30 border-green-500/30' : 'bg-gray-800 border-gray-700/50'}`}
            >
              <div className="flex justify-between items-center mb-2">
                {ans.accepted && (
                  <span className="text-green-400 flex items-center gap-1 text-sm">
                    <CheckCircle size={16} /> Accepted Answer
                  </span>
                )}
                <span className="text-xs text-gray-500">{new Date(ans.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-300 mb-3 whitespace-pre-wrap">{ans.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-400">▲ {ans.votes}</span>
                  <span className="text-red-400">▼</span>
                </div>
                <span className="text-sm text-blue-300">{ans.userId?.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {token && !isOwner ? (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-3">Your Answer</h3>
          <textarea
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none border border-gray-600 focus:border-blue-500 resize-none"
            rows={6}
            placeholder="Write your answer here..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button
            onClick={handlePostAnswer}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            Post Answer
          </button>
        </div>
      ) : !token ? (
        <p className="text-gray-400 mt-4">
          <Link to="/login" className="text-blue-400 underline">Login</Link> to post an answer.
        </p>
      ) : (
        <p className="text-yellow-400 mt-4">You cannot answer your own question.</p>
      )}
    </MainContent>
  );
};

export default AnswersScreen;
