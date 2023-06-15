import React, { useState } from "react";

const continents = [
  { id: 1, name: "Picked for you (default)" },
  { id: 2, name: "Most popular" },
  { id: 3, name: "Rating" },
  { id: 4, name: "Delivery time" },
];

function SortCheckBox(props) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked); //부모에게 넘기기
  };

  const chekcboxRenderList = () =>
    continents.map((value, index) => (
      <React.Fragment key={index}>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="ml-0 m-4 w-5 h-5 rounded-full"
            onChange={() => handleToggle(value.id)}
            checked={checked.indexOf(value.id) === -1 ? false : true}
          ></input>
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
