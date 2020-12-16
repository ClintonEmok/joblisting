import React, { useState, useEffect } from "react";
import data from "./assets/data.json";
import JobBoard from "./components/JobBoard";

/**
 *  Clinton Emok, 15-12-2020
 */

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(["CSS"]);

  useEffect(() => setJobs(data), []);

  const filterFunction = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }
    const tags = [role, level];

    if (tools) {
      tags.push(...tools);
    }

    if (languages) {
      tags.push(...languages);
    }

    return tags.some((tag) => filters.includes(tag));
  };

  const handleTagClick = (tag) => {
    // Avoids multiple occurence of identical tags
    if (filters.includes(tag)) return;
    setFilters([...filters, tag]);
  };

  // Enable tags selection
  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };
  // Returns empty list of selected tags
  const handleClearFilter = () => {
    return setFilters([]);
  };

  const filteredJobs = jobs.filter(filterFunction);

  return (
    <>
      <header className=" flex flex-col bg-green-700 text-white bg-opacity-75 mb-12">
        <img
          className="w-full"
          src="images/bg-header-desktop.svg"
          alt="bg-image"
        />{" "}
        Created by Clinton Emok
      </header>
      `
      <div className="container m-auto ">
        {filters.length > 0 && (
          <div className={`flex  bg-white shadow-md my-16 mx-10 p-6 rounded`}>
            {filters.map((filter) => (
              <span
                className=" cursor-pointer mr-4 mb-4 rounded font-bold text-green-400 bg-blue-300 bg-opacity-50  p-2
              transition duration-500 ease-in-out text-green-400 bg-blue-300 bg-opacity-50 hover:bg-black 
              transform hover:-translate-y-1 hover:scale-200  sm:mb-0"
                onClick={() => handleFilterClick(filter)}
              >
                {filter} ×
              </span>
            ))}
            <button
              className="text-grey-700 ml-auto font-bold rounded p-1 
            transition duration-500 ease-in-out text-green-400 bg-blue-300 bg-opacity-50 
            hover:bg-black transform hover:-translate-y-1 hover:scale-200 "
              onClick={() => handleClearFilter()}
            >
              Clear
            </button>
          </div>
        )}

        {jobs.length === 0 ? (
          <p>Jobs are getting fetched</p>
        ) : (
          filteredJobs.map((job) => (
            <JobBoard job={job} key={job.id} handleTagClick={handleTagClick} />
          ))
        )}
      </div>
    </>
  );
}

export default App;

// TODO
// 1. Study the design & API (json) ✅
// 2. Create Job Board (Takes Object)✅
// 3. Retrieve data from JSON file✅
// 4. Pass down data to Job Board✅
// 5. Styling Mobile ✅
// 6. Styling Desktop ✅
// 7. Filter interaction✅
