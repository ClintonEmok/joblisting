import React, { useState, useEffect } from "react";

import JobBoard from "./components/JobBoard";

/**
 *  Clinton Emok, 15-12-2020
 */

function App() {
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);
  const [jobs, setJobs] = useState([]);
  console.log(jobs);

  const [filters, setFilters] = useState(["CSS"]);

  const filterFunction = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }
    const tags = [role, level];

    /** Check if tools are empty or not
     * If not tools will be added to the list
     */
    if (tools) {
      tags.push(...tools);
    }

    /** Check if languages are empty or not
     * If not tools will be added to the list
     */

    if (languages) {
      tags.push(...languages);
    }
    return filters.every((tag) =>
      tags.includes(tag)
    ); /** Check if all of the tags can be found in a job listing */
    //return tags.some((tag) => filters.includes(tag)); /** Check if any of the tags can be found in a job listing */
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

  // Array of filtered jobs through selection of tags
  const filteredJobs = jobs.filter(filterFunction);

  return (
    /*Header of App*/
    <>
      <header className="flex flex-row items-center justify-between bg-green-700 text-white bg-opacity-75 mb-12 p-2">
        {/* Spinning logo on the banner*/}
        <img
          src="images/favicon-32x32.png"
          className="place-self-left animate-pulse ml-1 "
        ></img>
        <p className="place-self-center text-2xl font-semibold  ">Job Picker</p>
        <p className="place-self-right animate-pulse ">
          Created by Clinton Emok
        </p>
      </header>

      <div className="container m-auto ">
        {filters.length > 0 && (
          <div className={`flex  bg-white shadow-md my-16 mx-10 p-6 rounded`}>
            {filters.map((filter) => (
              <span
                className=" cursor-pointer mr-4 mb-4 rounded font-bold text-green-400 bg-blue-300 bg-opacity-50  p-2
              transition duration-500 ease-in-out text-green-400 bg-blue-300 bg-opacity-50 hover:bg-red-600 hover:text-white
              transform hover:-translate-y-1 hover:scale-200  sm:mb-0"
                onClick={() => handleFilterClick(filter)}
              >
                {filter} ×
              </span>
            ))}
            <button
              className="text-grey-700 ml-auto font-bold rounded p-1 
            transition duration-500 ease-in-out text-green-400 bg-blue-300 bg-opacity-50 
            hover:bg-red-600 transform hover:-translate-y-1 hover:scale-200  hover:text-white "
              onClick={() => handleClearFilter()}
            >
              Clear
            </button>
          </div>
        )}
        {/* Text to show fetching of data (especially useful with full dataset)  */}
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
