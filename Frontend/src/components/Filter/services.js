import { aplphabets } from "../../data/alphabet";

//alphabet file data return 
export function getLetter() {
  const letterList = aplphabets;
  return letterList;
}

//alphabet file filter and return 

export function filterLetter(letterType) {
  let filtredLetter = getLetter().filter(type => type.typeOf === letterType);
  // console.log(filtredLetter.length, '<-----------');
    return filtredLetter;
}
