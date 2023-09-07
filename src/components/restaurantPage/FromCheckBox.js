import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { reset, setSort } from "../../redux/features/restaurantsSlice";

const continents = [
  { id: 1, name: "Deals" },
  { id: 2, name: "Highest rated" },
];

function FromCheckBox() {
  //contact and update to redux
  const dispatch = useDispatch();
  // save an option
  const [filter, setFilter] = useState("");

  //update an option to filter after clicked the button
  const handleToggle = (value) => {
    if (filter === value) {
      setFilter(""); // 빈 문자열로 설정하여 서버 측에서 undefined로 인식
    } else {
      setFilter(value);
    }
  };

  //chase filter when changed a value
  useEffect(() => {
    if (filter !== "") {
      dispatch(setSort(filter.toLowerCase())); // setSort 액션을 dispatch
    }
    return () => {
      dispatch(reset());
    };
  }, [filter]);

  const radioRenderList = () =>
    continents.map((value, index) => (
      <React.Fragment key={index}>
        <div className="flex items-center" onClick={() => handleToggle(value.name)}>
          {/* name 추가해서 라디오하나만 클릭 */}
          <input type="radio" name="sort" className="ml-0 m-4 w-5 h-5 rounded-full"></input>
          <div className="inline-block">{value.name}</div>
        </div>
      </React.Fragment>
    ));

  return (
    <div>
      <div className="w-full h-1/5 mt-10 mb-10 text-lg flex flex-col">
        <div className="text-2xl">From Uber Eats</div>
        {radioRenderList()}
      </div>
    </div>
  );
}

export default FromCheckBox;
