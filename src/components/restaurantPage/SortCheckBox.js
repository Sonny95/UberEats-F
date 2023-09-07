import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { reset, setSort } from "../../redux/features/restaurantsSlice";
import { showAllRestaurants } from "../../redux/features/restaurantsAction";

const continents = [
  { id: 1, name: "Picked for you" },
  { id: 2, name: "Most popular" },
  { id: 3, name: "Rating" },
  { id: 4, name: "Delivery time" },
];

function SortCheckBox(props) {
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

  //radio box rendering 클릭하면 핸들토글 홏출
  const chekcboxRenderList = () =>
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
        <div className="text-2xl">Sort</div>
        {chekcboxRenderList()}
      </div>
    </div>
  );
}

export default SortCheckBox;
