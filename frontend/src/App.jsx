import React, { useState } from 'react';
import { Search, Home, Settings, ChevronLeft, ChevronRight, Menu, X, User, Bell, Plus } from 'lucide-react';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Header Component
  const Header = () => (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setCurrentScreen('home')}
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              StackIt
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentScreen === 'home' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentScreen('browse')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentScreen === 'browse' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setCurrentScreen('ask')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Ask Question
            </button>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-blue-500 w-64"
              />
            </div>
            <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <User size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setCurrentScreen('home');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                currentScreen === 'home' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentScreen('browse');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                currentScreen === 'browse' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => {
                setCurrentScreen('ask');
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Ask Question
            </button>
          </div>
        </div>
      )}
    </header>
  );

  // Sidebar Component
  const Sidebar = () => (
    <aside className="hidden lg:block w-64 bg-gray-900 border-r border-gray-800 fixed left-0 top-16 h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Filter by</h3>
          <div className="space-y-2">
            <select className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-700">
              <option>Recent</option>
              <option>Popular</option>
              <option>Most Answered</option>
            </select>
            <select className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-700">
              <option>All Categories</option>
              <option>JavaScript</option>
              <option>React</option>
              <option>CSS</option>
              <option>SQL</option>
            </select>
          </div>
        </div>
        
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['javascript', 'react', 'css', 'html', 'sql', 'python'].map(tag => (
              <span key={tag} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-700 cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );

  // Main Content Container
  const MainContent = ({ children }) => (
    <main className="flex-1 lg:ml-64">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </main>
  );

  // Question Card Component
  const QuestionCard = ({ question, isDetailed = false }) => (
    <div className="bg-gray-800 rounded-lg p-6 mb-6 hover:bg-gray-750 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-white text-lg font-semibold hover:text-blue-400 cursor-pointer">
          {question.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{question.votes} votes</span>
          <span>{question.answers} answers</span>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 line-clamp-3">{question.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {question.tags.map(tag => (
            <span key={tag} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-400">
          Asked by {question.author} • {question.time}
        </div>
      </div>
    </div>
  );

  // Home Screen
  const HomeScreen = () => {
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

        {/* Mobile Filter */}
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

  // Browse Screen
  const BrowseScreen = () => {
    const questions = [
      {
        id: 1,
        title: "How do you join 2 columns in a data set to make a separate column in SQL?",
        description: "I am looking for a way to create a formula that takes the values from two columns and puts them in a new column.",
        tags: ['sql', 'database'],
        votes: 15,
        answers: 3,
        author: 'john_doe',
        time: '2 hours ago'
      },
      {
        id: 2,
        title: "React useState hook not updating state immediately",
        description: "I'm having trouble with React state updates. The state doesn't seem to update immediately after calling setState.",
        tags: ['react', 'javascript'],
        votes: 23,
        answers: 7,
        author: 'react_dev',
        time: '4 hours ago'
      },
      {
        id: 3,
        title: "Best practices for CSS Grid vs Flexbox",
        description: "When should I use CSS Grid over Flexbox? What are the main differences and use cases for each?",
        tags: ['css', 'grid'],
        votes: 18,
        answers: 5,
        author: 'css_ninja',
        time: '6 hours ago'
      }
    ];

    return (
      <MainContent>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">All Questions</h1>
          <button 
            onClick={() => setCurrentScreen('ask')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Ask Question
          </button>
        </div>

        {/* Mobile Search */}
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

        <div className="mb-6">
          <div className="text-gray-300 text-sm mb-4">
            Showing {questions.length} questions
          </div>
          {questions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4, 5].map(num => (
            <button 
              key={num}
              className={`px-3 py-2 rounded ${
                num === 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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

  // Ask Question Screen
  const AskScreen = () => (
    <MainContent>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Ask a Question</h1>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Question Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none border border-gray-600 focus:border-blue-500"
                placeholder="What's your programming question? Be specific."
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Description
              </label>
              <div className="bg-gray-700 rounded-lg border border-gray-600 focus-within:border-blue-500">
                <div className="border-b border-gray-600 p-3 flex gap-3 text-sm">
                  <button type="button" className="text-gray-400 hover:text-white font-bold">B</button>
                  <button type="button" className="text-gray-400 hover:text-white italic">I</button>
                  <button type="button" className="text-gray-400 hover:text-white underline">U</button>
                  <button type="button" className="text-gray-400 hover:text-white">≡</button>
                  <button type="button" className="text-gray-400 hover:text-white">⋯</button>
                  <div className="ml-auto text-gray-400 text-xs">Rich Text Editor</div>
                </div>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full bg-transparent text-white px-4 py-3 outline-none resize-none"
                  rows="8"
                  placeholder="Describe your problem in detail. Include what you've tried and what specific help you need."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none border border-gray-600 focus:border-blue-500"
                placeholder="javascript, react, css (separate with commas)"
              />
              <p className="text-gray-400 text-xs mt-1">
                Add up to 5 tags to describe what your question is about
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={() => setCurrentScreen('browse')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors font-medium"
              >
                Post Question
              </button>
              <button 
                type="button"
                onClick={() => setCurrentScreen('browse')}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors font-medium"
              >
                Save Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainContent>
  );

  // Answers Screen
  const AnswersScreen = () => (
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

  // Screen Router
  const renderScreen = () => {
    switch(currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'browse':
        return <BrowseScreen />;
      case 'ask':
        return <AskScreen />;
      case 'answers':
        return <AnswersScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <div className="flex">
        <Sidebar />
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;