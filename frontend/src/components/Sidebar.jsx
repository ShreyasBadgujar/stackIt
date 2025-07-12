import React, { useState } from 'react';
import {
  Filter,
  TrendingUp,
  Clock,
  MessageCircle,
  Tag,
  ChevronDown,
  Star,
  Award,
  Users
} from 'lucide-react';

import {
  SiJavascript,
  SiReact,
  SiCss3,
  SiHtml5,
  SiMysql,
  SiPython
} from 'react-icons/si';

const Sidebar = () => {
  const [selectedFilter, setSelectedFilter] = useState('Recent');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeTags, setActiveTags] = useState(new Set());

  const popularTags = [
    { name: 'javascript', count: 1234, icon: SiJavascript, color: 'from-yellow-400 to-orange-400' },
    { name: 'react', count: 956, icon: SiReact, color: 'from-blue-400 to-cyan-400' },
    { name: 'css', count: 789, icon: SiCss3, color: 'from-purple-400 to-pink-400' },
    { name: 'html', count: 678, icon: SiHtml5, color: 'from-red-400 to-orange-400' },
    { name: 'sql', count: 543, icon: SiMysql, color: 'from-green-400 to-emerald-400' },
    { name: 'python', count: 432, icon: SiPython, color: 'from-blue-500 to-indigo-500' }
  ];

  const statsData = [
    { label: 'Total Questions', value: '12.5K', icon: MessageCircle, color: 'text-blue-400' },
    { label: 'Active Users', value: '1.2K', icon: Users, color: 'text-green-400' },
    { label: 'Expert Answers', value: '8.9K', icon: Award, color: 'text-purple-400' }
  ];

  const handleTagClick = (tagName) => {
    const newActiveTags = new Set(activeTags);
    if (newActiveTags.has(tagName)) {
      newActiveTags.delete(tagName);
    } else {
      newActiveTags.add(tagName);
    }
    setActiveTags(newActiveTags);
  };

  return (
    <aside className="hidden lg:block w-72 bg-gradient-to-b from-[#0F1419] via-[#181F1F] to-[#0F1419] border-r border-gray-800/50 fixed left-0 top-16 h-full overflow-y-auto backdrop-blur-sm">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
          <h3 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Community Stats
          </h3>
          <div className="space-y-3">
            {statsData.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                </div>
                <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/30">
          <h3 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-400" />
            Filter Questions
          </h3>
          <div className="space-y-4">
            <div className="relative group">
              <label className="text-xs text-gray-400 mb-2 block">Sort by</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full bg-gray-700/70 text-white px-4 py-3 pr-10 rounded-lg text-sm border border-gray-600/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-600/70"
              >
                <option value="Recent">🕐 Recent</option>
                <option value="Popular">🔥 Popular</option>
                <option value="Most Answered">💬 Most Answered</option>
                <option value="Trending">📈 Trending</option>
              </select>
              <ChevronDown className="absolute right-3 top-9 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-purple-400 transition-colors" />
            </div>

            <div className="relative group">
              <label className="text-xs text-gray-400 mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-700/70 text-white px-4 py-3 pr-10 rounded-lg text-sm border border-gray-600/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-600/70"
              >
                <option value="All Categories">🌐 All Categories</option>
                <option value="JavaScript">⚡ JavaScript</option>
                <option value="React">⚛️ React</option>
                <option value="CSS">🎨 CSS</option>
                <option value="SQL">🗄️ SQL</option>
                <option value="Python">🐍 Python</option>
              </select>
              <ChevronDown className="absolute right-3 top-9 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-purple-400 transition-colors" />
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/30">
          <h3 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4 text-green-400" />
            Popular Tags
          </h3>
          <div className="space-y-2">
            {popularTags.map((tag, index) => {
              const isActive = activeTags.has(tag.name);
              const IconComponent = tag.icon;
              return (
                <button
                  key={tag.name}
                  onClick={() => handleTagClick(tag.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 group ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white'
                      : 'bg-gray-700/40 hover:bg-gray-600/60 border border-gray-600/30 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r ${tag.color} ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} transition-opacity`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium capitalize">{tag.name}</div>
                      <div className="text-xs text-gray-400">{tag.count.toLocaleString()} questions</div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-20"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
