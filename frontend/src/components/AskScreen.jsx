import React, { useState, useEffect } from 'react';
import MainContent from './MainContent';
import TiptapEditor from './TiptapEditor';
import { Sparkles, Tag, FileText, Send, Save } from 'lucide-react';

const AskScreen = ({ formData, handleInputChange }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <MainContent className='bg-gradient-to-br from-[#0F1419] via-[#181F1F] to-[#0F1419] min-h-screen'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Header */}
          <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Ask a Question
                  </h1>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Share your coding challenge with the community and get expert help.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <div className={`transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-50"></div>
              <div className="relative z-10">
                <form className="space-y-8">
                  {/* Enhanced Title Input */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <label className="block text-white text-lg font-semibold">
                        Question Title
                      </label>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="relative w-full bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm text-white px-6 py-4 rounded-xl outline-none border border-gray-600/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="What's your programming question? Be specific and descriptive."
                      />
                    </div>
                    <p className="text-gray-400 text-sm">
                      Write a clear, specific title that summarizes your problem
                    </p>
                  </div>

                  {/* Enhanced Description */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      <label className="block text-white text-lg font-semibold">
                        Description
                      </label>
                    </div>
                    <TiptapEditor
                      content={formData.description}
                      onChange={(html) => handleInputChange('description', html)}
                    />
                    <p className="text-gray-400 text-sm">
                      Provide details about your problem, what you've tried, and what you expect to happen
                    </p>
                  </div>

                  {/* Enhanced Tags Input */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-green-400" />
                      <label className="block text-white text-lg font-semibold">
                        Tags
                      </label>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        className="relative w-full bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm text-white px-6 py-4 rounded-xl outline-none border border-gray-600/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="javascript, react, css, nodejs (separate with commas)"
                      />
                    </div>
                    <p className="text-gray-400 text-sm">
                      Add up to 5 relevant tags to help others find and answer your question
                    </p>
                  </div>

                  {/* Enhanced Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      className="group relative flex-1 bg-gradient-to-r from-[#6421FF] to-[#8B5CF6] hover:from-[#541ACC] hover:to-[#7C3AED] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/25 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Post Question
                      </span>
                    </button>
                    <button
                      type="button"
                      className="group relative flex-1 bg-gradient-to-r from-gray-700/70 to-gray-600/70 backdrop-blur-sm hover:from-gray-600/80 hover:to-gray-500/80 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg border border-gray-600/50 hover:border-gray-500/50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Save className="w-5 h-5" />
                        Save Draft
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default AskScreen;