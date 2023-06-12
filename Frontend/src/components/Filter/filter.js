import React, { useState, useEffect } from "react";
import { buttons } from "../../data/alphabet";
import "./filter.css";
import { getLetter, filterLetter } from "./services";

export const Filter = () => {

  //filter state
  const [filtredLetter, setFiltredLetter] = useState(null);

  //get data
  useEffect(() => {
    setFiltredLetter(getLetter());
  }, []);

  //Onclick filter function

  function handleLetter(e) {
    let typeLetter = e.target.value;
    typeLetter !== "all"
    ? setFiltredLetter(filterLetter(typeLetter))
    : setFiltredLetter(getLetter());
  }

  return (
    <div className='filter_section'>
      <div className='filter_button_container'>
        <div className='parent_button_container'>
          {/* parent btn */}
          <button onClick={handleLetter} value="all" className="parent_button">
            All
          </button>
        </div>
        {/* child button from alphabet.js file */}
        <div className="child_button_container">
          {buttons &&
            buttons.map((type, index) => (
              <>
                <button
                  key={index}
                  value={type.value}
                  onClick={handleLetter}
                  className="child_button"
                >
                  {type.name}
                </button>
              </>
            ))}
        </div>
      </div>
      <hr/>
      {/* filter list */}
      <div>
        {filtredLetter &&
          filtredLetter.map((type) => (
            <ul key={type.id}>
              <li>{type.name}</li>
            </ul>
          ))}
      </div>
    </div>
  );
};
