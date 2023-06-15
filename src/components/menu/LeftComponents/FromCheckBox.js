import React from "react";

function FromCheckBox() {
  const Checkbox = () => {
    return <input type="checkbox" className="ml-0 m-4 w-5 h-5 rounded-full"></input>;
  };

  return (
    <div>
      <div className="w-full h-1/5 mt-10 mb-10 text-lg flex flex-col">
        <div className="text-2xl">From Uber Eats</div>
        <div className="flex items-center">
          <Checkbox />
          <div className="inline-block">Deals</div>
        </div>
        <div className="flex items-center">
          <Checkbox />
          <div className="inline-block">Highest rated</div>
        </div>
      </div>
    </div>
  );
}

export default FromCheckBox;
