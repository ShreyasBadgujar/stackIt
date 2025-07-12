import React from 'react';

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

export default Sidebar;
