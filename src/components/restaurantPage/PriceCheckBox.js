import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset, setSort } from "../../redux/features/restaurantsSlice";

function PriceCheckBox() {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const [filter, setFilter] = useState("");
  console.log(filter, "filter");

  //맵으로 0.1.2.3으로 돌려서 하기때문에 버튼 클릭 요청도 0.1.2.3로 함
  const handleButtonClick = (value) => {
    if (selectedButton === value) {
      setSelectedButton(null); // 선택 해제
      setFilter("");
    } else {
      setSelectedButton(value);
      setFilter(value.toString());
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

  return (
    <div>
      <div className="w-full h-1/5 mt-10 mb-10 text-lg flex flex-col">
        <div className="text-2xl">Price Range</div>
        <div className="flex items-center mt-5  sm:space-x-1 lg:space-x-5">
          {[0, 1, 2, 3].map((value, index) => (
            <button
              key={index}
              className={`bg-gray-300 h-12 w-full rounded-2xl p-3 flex-grow ${selectedButton === value ? "bg-gray-500 text-white" : ""} ${
                hoveredButton === value ? "bg-gray-500 text-white" : ""
              }sm:text-xs lg:text-sm`}
              onClick={() => handleButtonClick(value)}
              onMouseEnter={() => handleButtonHover(value)}
              onMouseLeave={() => handleButtonHover(null)}
            >
              {Array(index + 1)
                .fill("$")
                .join("")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceCheckBox;
