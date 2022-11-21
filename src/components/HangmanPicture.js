import React from "react";
import startImage from "../assets/images/4.jpg";
import HeadImage from "../assets/images/5.jpg";
import BodyImage from "../assets/images/6.jpg";
import RightArm from "../assets/images/7.jpg";
import LeftArm from "../assets/images/8.jpg";
import RigthLeg from "../assets/images/9.jpg";
import LeftLeg from "../assets/images/10.jpg";

const BODY_PARTS = [
  startImage,
  HeadImage,
  BodyImage,
  RightArm,
  LeftArm,
  RigthLeg,
  LeftLeg,
];

const HangmanPicture = ({ numberOfGuesses }) => {
  return (
    <div>
      <img src={BODY_PARTS[numberOfGuesses]} alt="Hangman" />
    </div>
  );
};

export default HangmanPicture;
