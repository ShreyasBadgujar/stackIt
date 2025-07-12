import React from 'react';
import MainContent from './MainContent';

const AskScreen = ({ formData, handleInputChange }) => (
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
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none border border-gray-600 focus:border-[#6421FF]"
              placeholder="What's your programming question? Be specific."
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Description
            </label>
            <div className="bg-gray-700 rounded-lg border border-gray-600 focus-within:border-[#6421FF]">
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
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none border border-gray-600 focus:border-[#6421FF]"
              placeholder="javascript, react, css (separate with commas)"
            />
            <p className="text-gray-400 text-xs mt-1">
              Add up to 5 tags to describe what your question is about
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              type="submit"
              className="flex-1 bg-[#6421FF] hover:bg-[#541ACC] text-white py-3 px-6 rounded-lg transition-colors font-medium"
            >
              Post Question
            </button>
            <button 
              type="button"
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

export default AskScreen;
