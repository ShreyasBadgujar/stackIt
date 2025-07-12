import React, { useState } from 'react';
import { 
  ThumbsUp, 
  MessageCircle, 
  Eye, 
  Clock, 
  User, 
  Bookmark, 
  Share2, 
  TrendingUp,
  Star,
  Award
} from 'lucide-react';

const QuestionCard = ({ question }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [voteCount, setVoteCount] = useState(question.votes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (e) => {
    e.stopPropagation();
    if (!hasVoted) {
      setVoteCount(voteCount + 1);
      setHasVoted(true);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Share functionality would go here
    console.log('Sharing question:', question.title);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const getTagColor = (tag) => {
    const colors = {
      'javascript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      'react': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      'css': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      'python': 'bg-green-500/20 text-green-300 border-green-500/40',
      'sql': 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      'html': 'bg-red-500/20 text-red-300 border-red-500/40',
      'node': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      'typescript': 'bg-blue-600/20 text-blue-400 border-blue-600/40',
    };
    return colors[tag.toLowerCase()] || 'bg-gray-500/20 text-gray-300 border-gray-500/40';
  };

  const isHighEngagement = question.votes > 20 || question.answers > 5;
  const isRecent = question.time?.includes('hour') || question.time?.includes('minute');

  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-sm -z-10"></div>

      {/* Status Indicators */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {isHighEngagement && (
          <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-full text-xs font-medium border border-orange-500/30">
            <TrendingUp className="w-3 h-3" />
            <span>Hot</span>
          </div>
        )}
        {isRecent && (
          <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-full text-xs font-medium border border-green-500/30">
            <Clock className="w-3 h-3" />
            <span>New</span>
          </div>
        )}
        {question.difficulty && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </div>
        )}
      </div>

      <div className="relative z-10">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-4 pr-24">
          <div className="flex-1">
            <h3 className="text-white text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300 leading-tight">
              {question.title}
            </h3>
            {question.description && (
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                {question.description}
              </p>
            )}
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-6">
          {question.tags?.map((tag, index) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-110 cursor-pointer ${getTagColor(tag)} hover:shadow-lg`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isHovered ? `tagPulse 0.6s ease-out ${index * 100}ms` : 'none'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          {/* Interactive Stats */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleVote}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                hasVoted 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/40' 
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${hasVoted ? 'fill-current' : ''}`} />
              <span className="font-medium">{voteCount}</span>
            </button>
            
            <div className="flex items-center gap-2 text-blue-400">
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">{question.answers}</span>
            </div>
            
            {question.views && (
              <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{question.views}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                isBookmarked 
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' 
                  : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-110"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Author and Time */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-300">
                Asked by{' '}
                <span className="text-purple-400 font-medium hover:text-purple-300 cursor-pointer transition-colors">
                  {question.author}
                </span>
              </p>
              <p className="text-xs text-gray-500">{question.time}</p>
            </div>
          </div>
          
          {/* Achievement Badge */}
          {question.votes > 30 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full text-xs font-medium border border-yellow-500/30">
              <Award className="w-3 h-3" />
              <span>Popular</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Particles Animation */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75 delay-300"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-75 delay-500"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes tagPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default QuestionCard;