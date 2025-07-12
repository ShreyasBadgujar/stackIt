import React, { useState, useEffect } from 'react';
import MainContent from './MainContent';
import {
  TrendingUp, Filter, Sparkles, ChevronDown,
  Eye, MessageCircle, ChevronUp, ChevronDown as ChevronDownVote
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('Recent');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featuredQuestions = [
    {
      id: 1,
      title: "How do you join 2 columns in a data set to make a separate column in SQL?",
      description: "I am looking for a way to create a formula that takes the values from two columns and puts them in a new column.",
      tags: ['SQL Join'],
      upvotes: 15,
      downvotes: 2,
      answers: 3,
      author: 'john_doe',
      time: '2 hours ago',
      views: 128,
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: "React useState hook not updating state immediately",
      description: "I'm having trouble with React state updates. The state doesn't seem to update immediately after calling setState.",
      tags: ['react', 'javascript', 'hooks'],
      upvotes: 23,
      downvotes: 1,
      answers: 7,
      author: 'react_dev',
      time: '4 hours ago',
      views: 256,
      difficulty: 'beginner'
    },
    {
      id: 3,
      title: "Best practices for CSS Grid vs Flexbox",
      description: "When should I use CSS Grid over Flexbox? What are the main differences and use cases for each?",
      tags: ['css', 'grid', 'flexbox'],
      upvotes: 18,
      downvotes: 3,
      answers: 5,
      author: 'css_ninja',
      time: '6 hours ago',
      views: 189,
      difficulty: 'intermediate'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <MainContent className='bg-gradient-to-br from-[#0F1419] via-[#181F1F] to-[#0F1419] min-h-screen'>
      {/* ... Hero and Filters remain unchanged ... */}

      {/* Featured Questions Section */}
      <div className={`mb-8 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Featured Questions</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div className="space-y-4">
          {featuredQuestions.map((question, index) => (
            <div
              key={question.id}
              onMouseEnter={() => setHoveredQuestion(question.id)}
              onMouseLeave={() => setHoveredQuestion(null)}
              className={`transform transition-all duration-500 delay-${index * 100} ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
            >
              <div
                className={`group relative bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 ${
                  hoveredQuestion === question.id ? 'ring-2 ring-purple-500/20' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3
                        onClick={() => navigate(`/question/${question.id}`)}
                        className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300 cursor-pointer"
                      >
                        {question.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{question.description}</p>
                    </div>
                    <div className={`ml-4 px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-200 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-1">
                        <span className="flex items-center gap-1 px-2 py-1 text-green-400">
                          <ChevronUp className="w-4 h-4" /> {question.upvotes}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 text-red-400">
                          <ChevronDownVote className="w-4 h-4" /> {question.downvotes}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <MessageCircle className="w-4 h-4" /> {question.answers}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-4 h-4" /> {question.views}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        by <span className="text-purple-400 font-medium">{question.author}</span>
                      </p>
                      <p className="text-xs text-gray-500">{question.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainContent>
  );
};

export default HomeScreen;
