import React, { useState, useEffect } from 'react';
import MainContent from './MainContent';
import QuestionCard from './QuestionCard';
import { TrendingUp, Filter, Sparkles, ChevronDown, Eye, MessageCircle, ChevronUp, ChevronDown as ChevronDownVote } from 'lucide-react';

const HomeScreen = ({ setCurrentScreen }) => {
  const [selectedFilter, setSelectedFilter] = useState('Recent');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featuredQuestions = [
    {
      id: 1,
      title: "How do you join 2 columns in a data set to make a separate column in SQL?",
      description: "I am looking for a way to create a formula that takes the values from two columns and puts them in a new column. Let me know if you have any solutions for this problem.",
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
      description: "I'm having trouble with React state updates. The state doesn't seem to update immediately after calling setState. What am I missing?",
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className={`mb-12 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Welcome to StackIt
                </h1>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Get help from the community. Ask questions, share knowledge, and learn together.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-medium">1.2K+ Active Users</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
                  <TrendingUp className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-300 text-sm font-medium">500+ Questions Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Filter Dropdowns */}
        <div className={`lg:hidden mb-8 transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-purple-400" />
              <h3 className="text-white text-lg font-semibold">Quick Filters</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group">
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full bg-gray-700/70 backdrop-blur-sm text-white px-4 py-3 pr-10 rounded-xl text-sm border border-gray-600/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-600/70"
                >
                  <option>Recent</option>
                  <option>Popular</option>
                  <option>Most Answered</option>
                  <option>Trending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="relative group">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-700/70 backdrop-blur-sm text-white px-4 py-3 pr-10 rounded-xl text-sm border border-gray-600/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-600/70"
                >
                  <option>All Categories</option>
                  <option>JavaScript</option>
                  <option>React</option>
                  <option>CSS</option>
                  <option>Python</option>
                  <option>SQL</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-purple-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>

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
                <div className={`group relative bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 ${
                  hoveredQuestion === question.id ? 'ring-2 ring-purple-500/20' : ''
                }`}>
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300 cursor-pointer">
                          {question.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {question.description}
                        </p>
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

                    {/* Question Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-1">
                          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-600/50 transition-colors duration-200">
                            <ChevronUp className="w-4 h-4 text-green-400 hover:text-green-300" />
                            <span className="text-green-400 font-medium text-sm">{question.upvotes}</span>
                          </button>
                          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-600/50 transition-colors duration-200">
                            <ChevronDownVote className="w-4 h-4 text-red-400 hover:text-red-300" />
                            <span className="text-red-400 font-medium text-sm">{question.downvotes}</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400 font-medium">{question.answers}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 font-medium">{question.views}</span>
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

        {/* Enhanced CTA Button */}
        <div className={`text-center transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button
            onClick={() => setCurrentScreen('browse')}
            className="group relative bg-gradient-to-r from-[#6421FF] to-[#8B5CF6] hover:from-[#541ACC] hover:to-[#7C3AED] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/25 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-2">
              View All Questions
              <div className="w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </span>
          </button>
        </div>
      </div>
    </MainContent>
  );
};

export default HomeScreen;