import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset, setSort } from "../../redux/features/restaurantsSlice";

const continents = [
  { id: 1, name: "Vegetarian" },
  { id: 2, name: "Vegan" },
  { id: 3, name: "Gluten-free" },
  { id: 4, name: "Halal" },
];

function DietCheckBox() {
  const dispatch = useDispatch();

  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [filter, setFilter] = useState("");
  console.log(filter, "dietFilter");

  const handleButtonClick = (value) => {
    if (selectedButton === value) {
      setSelectedButton(null); // 선택 해제
      setFilter("");
    } else {
      setSelectedButton(value);
      setFilter(value);
    }
  };

  useEffect(() => {
    if (filter !== "") {
      dispatch(setSort(filter.toLowerCase())); // setSort 액션을 dispatch
    }
    return () => {
      dispatch(reset());
    };
  }, [filter]);

  const handleButtonHover = (value) => {
    setHoveredButton(value);
  };
  const radioRenderList = () =>
    continents.map((value, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col mt-3">
          <button
            onClick={() => handleButtonClick(value.name)}
            onMouseEnter={() => handleButtonHover(value)}
            onMouseLeave={() => handleButtonHover(null)}
            className={`bg-gray-300 h-12 rounded-2xl p-1.5 w-full flex-grow ${selectedButton === value ? "bg-gray-500 text-white" : ""} ${
              hoveredButton === value ? "bg-gray-500 text-white" : ""
            } sm:text-sm lg:text-lg`}
          >
            <div className="inline-block">{value.name}</div>
          </button>
        </div>
      </React.Fragment>
    ));

  return (
    <div>
      <div className="w-full h-1/5 mt-10 mb-10 text-lg flex flex-col">
        <div className="text-2xl">Dietary</div>
        {radioRenderList()}
      </div>
    </div>
  );
}

export default DietCheckBox;
