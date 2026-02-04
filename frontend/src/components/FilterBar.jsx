import React from "react";


const FilterBar = ({ keyword, setKeyword, status, setStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Search Input with Icon */}
      <div className="relative w-full sm:w-80">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by title or venue..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {keyword && (
          <button
            onClick={() => setKeyword("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg 
              className="h-4 w-4 text-gray-400 hover:text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="updated">Updated</option>
        <option value="inactive">Inactive</option>
        <option value="imported">Imported</option>
      </select>
    </div>
  );
};

export default FilterBar;   