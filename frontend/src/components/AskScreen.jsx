import React from 'react';
import MainContent from './MainContent';
import TiptapEditor from './TiptapEditor';

import { useNavigate } from 'react-router-dom';
import API from '../api';

const AskScreen = ({ formData, handleInputChange }) => {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/api/questions', {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()).slice(0, 5), // limit to 5 tags
      });

      alert('Question posted!');
      navigate('/browse'); // or wherever you want to go
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to post question');
    }
  };

  return (
    <MainContent>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Ask a Question</h1>

        <div className="bg-gray-800 rounded-lg p-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Title */}
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
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Description
              </label>
              <TiptapEditor
                content={formData.description}
                onChange={(html) => handleInputChange('description', html)}
              />
            </div>

            {/* Tags */}
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

            {/* Buttons */}
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
};

export default AskScreen;
