import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset, setSort } from "../../../redux/features/restaurantsSlice";

function MenuCategories({ menu }) {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const [filter, setFilter] = useState("");

  //버튼 클릭ㅎ ㅜ 요청보내기
  const handleButtonClick = (value) => {
    if (selectedButton === value) {
      setSelectedButton(null); // 선택 해제
      setFilter("");
    } else {
      setSelectedButton(value);
      setFilter(value.toString());
    }
  };

  //렌더링 다타받고
  useEffect(() => {
    if (filter !== "") {
      dispatch(setSort(filter.toLowerCase())); // setSort 액션을 dispatch
    }
    return () => {
      dispatch(reset());
    };
  }, [filter]);

  //버튼 호버
  const handleButtonHover = (value) => {
    setHoveredButton(value);
  };
  return (
    <div className="flex flex-wrap">
      <div className="w-full font-bold text-4xl mb-7 ml-10 mt-10">Explore by category</div>
      {menu.map((value) => (
        <div
          className={`w-1/5 px-5 mb-10 bg-gray-200 ml-10 ${selectedButton === value ? "bg-gray-500 text-white" : ""} ${
            hoveredButton === value ? "bg-gray-500 text-white" : ""
          }sm:text-sm lg:text-lg`}
          key={value.id}
          //value.name 해야지 필터 디스팻치 넘김
          onClick={() => handleButtonClick(value.menu)}
          onMouseEnter={() => handleButtonHover(value)}
          onMouseLeave={() => handleButtonHover(null)}
        >
          <div className="flex justify-center items-center h-full">
            <div className="m-auto flex-shrink-0 sm:text-sm lg:text-lg">{value.menu}</div>
            <img src={value.photo} alt={value.menu} className="w-20 h-20 text-sm flex-shrink-0"></img>
          </div>
        </div>
      ))}
    </div>
  );
}

// return (
//   <div className="flex flex-wrap">
//     <div className="w-full font-bold text-4xl mb-7 ml-10 mt-10">Explore by category</div>
//     {menu.map((value) => (
//       <div
//         className={`w-1/5 px-5 mb-10 bg-gray-200 ml-10 ${selectedButton === value ? "bg-gray-500 text-white" : ""} ${
//           hoveredButton === value ? "bg-gray-500 text-white" : ""
//         }`}
//         key={value.id}
//         //value.name 해야지 필터 디스팻치 넘김
//         onClick={() => handleButtonClick(value.menu)}
//         onMouseEnter={() => handleButtonHover(value)}
//         onMouseLeave={() => handleButtonHover(null)}
//       >
//         <div className="flex flex-col h-full justify-center items-center mt-2">
//           <div className="text-lg m-2">{value.menu}</div>
//           <img src={value.photo} alt={value.menu} className="w-20 h-20 text-sm"></img>
//         </div>
//       </div>
//     ))}
//   </div>
// );

export default MenuCategories;
