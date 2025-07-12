import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Clock, Eye, User, CheckCircle,
  ThumbsUp, ThumbsDown
} from 'lucide-react';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "How do you join 2 columns in SQL?",
        description: "I need to merge `first_name` and `last_name` columns into one full_name column. I'm using MySQL. Any recommendations?",
        tags: ['SQL', 'MySQL', 'CONCAT', 'Database'],
        author: 'john_doe',
        time: '2 hours ago',
        views: 128,
        answers: [
          {
            id: 1,
            content: "Use the `CONCAT` function in MySQL:\n```sql\nSELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;\n```",
            author: 'sql_wizard',
            time: '1 hour ago',
            upvotes: 10,
            downvotes: 1,
            isAccepted: true
          },
          {
            id: 2,
            content: "PostgreSQL alternative:\n```sql\nSELECT first_name || ' ' || last_name AS full_name FROM users;\n```",
            author: 'postgres_pro',
            time: '50 mins ago',
            upvotes: 6,
            downvotes: 0,
            isAccepted: false
          }
        ]
      },
      {
        id: 2,
        title: "React useState not updating immediately",
        description: "I'm trying to log updated state right after `setState`, but it's not changing immediately. Why?",
        tags: ['React', 'JavaScript', 'Hooks'],
        author: 'react_ninja',
        time: '3 hours ago',
        views: 200,
        answers: [
          {
            id: 1,
            content: "React state updates are async. Use `useEffect` to track changes instead of logging immediately after `setState`.",
            author: 'dev_guru',
            time: '2 hours ago',
            upvotes: 15,
            downvotes: 2,
            isAccepted: true
          },
          {
            id: 2,
            content: "If you're updating a value and logging it right after `setX(value)`, you won't see the change immediately. Wrap your logic in `useEffect` to observe the new value.",
            author: 'code_master',
            time: '1 hour ago',
            upvotes: 5,
            downvotes: 0,
            isAccepted: false
          }
        ]
      }
    ];

    const found = dummyData.find(q => q.id === parseInt(id));
    if (found) {
      if (!found.answers) found.answers = []; // ensure answers is always defined
      setQuestion(found);
    }
  }, [id]);

  if (!question) {
    return <div className="p-6 text-white">Loading question...</div>;
  }

  return (
    <div className="p-6 ml-[300px] text-white w-full max-w-4xl">
      {/* Back button */}
      <button
        className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Question Title */}
      <h1 className="text-3xl font-bold mb-2">{question.title}</h1>

      {/* Meta Info */}
      <div className="text-sm text-gray-400 mb-4 flex gap-4 items-center">
        <span><Clock className="inline w-4 h-4 mr-1" /> {question.time}</span>
        <span><Eye className="inline w-4 h-4 mr-1" /> {question.views} views</span>
      </div>

      {/* Description */}
      <p className="mb-4 text-gray-300 whitespace-pre-line">{question.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {question.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/40"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Author */}
      <div className="mt-2 mb-8 flex items-center gap-3">
        <User className="w-6 h-6 text-white bg-purple-500 p-1 rounded-full" />
        <span className="text-sm text-gray-400">Asked by {question.author}</span>
      </div>

      {/* Answers */}
      {question.answers?.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">{question.answers.length} Answers</h2>
          {question.answers.map((answer) => (
            <div
              key={answer.id}
              className={`p-4 rounded-xl mb-6 border ${
                answer.isAccepted ? 'border-green-400/40 bg-green-500/10' : 'border-gray-600 bg-gray-800/50'
              }`}
            >
              {answer.isAccepted && (
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Accepted Answer</span>
                </div>
              )}
              <p className="text-gray-200 whitespace-pre-line mb-4">{answer.content}</p>
              <div className="flex justify-between text-sm text-gray-400 items-center">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2 items-center text-green-300">
                    <ThumbsUp className="w-4 h-4" /> {answer.upvotes}
                  </div>
                  <div className="flex gap-2 items-center text-red-300">
                    <ThumbsDown className="w-4 h-4" /> {answer.downvotes}
                  </div>
                </div>
                <div>
                  <span className="text-blue-300 font-medium">{answer.author}</span>{' '}
                  <span className="text-gray-500 text-xs ml-1">• {answer.time}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetail;
