import React from "react";

// Defining the contents of data.json so jobs.{} isn't required
// Also renamed new to isNew as it lead to some issues
// Made handleTagClick a prop for better usability
const JobBoard = ({
  job: {
    company,
    logo,
    isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  },
  handleTagClick,
}) => {
  const tags = [role, level];

  if (tools) {
    tags.push(...tools);
  }

  if (languages) {
    tags.push(...languages);
  }

  return (
    <div
      className={`flex flex-col  bg-white shadow-lg my-16 mx-10 p-6 rounded ${
        featured && " border-l-4 border-gray-800 border-solid"
      } lg:flex-row lg: my-6 lg:mx-0 lg:m-4 `}
    >
      <div>
        <img
          /*Logo of company */
          className="-mt-16 mb-6 w-20 h-20 lg:mt-0 lg:h-24 lg:w-24 lg:my-0"
          src={logo}
          alt={company}
        />
      </div>

      <div className=" flex flex-col justify-between ml-4">
        {/* Tags for New and Featured */}
        <h3 className="font-bold text-green-400 ">
          {company}
          {isNew && (
            <span className=" animate-pulse text-white bg-green-400 justify-between font-bold m-2 py-1 px-2 rounded-full text-xs uppercase">
              NEW!
            </span>
          )}
          {featured && (
            <span className=" text-white bg-gray-800 justify-between font-bold m-2 py-1 px-2 rounded-full text-xs uppercase">
              FEATURED
            </span>
          )}
        </h3>
        {/* Description of Job  */}
        <h2 className="font-bold text-xl my-2">{position}</h2>
        <p className="text-gray-500 font-medium">
          {postedAt} • {contract} • {location}
        </p>
      </div>
      <div
        className="flex flex-wrap items-center m-4 pt-4 border-t-2 border-gray-400 border-solid 
        lg:ml-auto lg:border-0 lg:m-4 lg: pt-0 lg: mt-0 "
      >
        {/* List of tags related to Job   */}
        {tags
          ? tags.map((tag) => (
              <span
                onClick={() => handleTagClick(tag)}
                className=" cursor-pointer transition duration-500 ease-in-out text-green-400 
              bg-blue-300 bg-opacity-50 font-bold hover:bg-black transform hover:-translate-y-1
               hover:scale-110cursor-pointer mr-4 mb-4 p-2 rounded lg: mb-0 "
              >
                {tag}
              </span>
            ))
          : ""}
      </div>
    </div>
  );
};

export default JobBoard;
