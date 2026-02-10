import { useState } from "react";
import ScrollAnimation from "../utils/scrollAnimation";
import PropTypes from "prop-types"



function BoxComponent({ title, content, image, bgColor, fgColor }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className="min-h-96 w-full items-center bg-custom-secondary text-center rounded-md sm:h-72 h-72 py-5 text-gray-200"
      onClick={handleClick}
      style={{
        backgroundImage: isClicked ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.3s ease",
      }}
    >
      {!isClicked && (
        <>
          <h2 className="text-xl font-bold mb-2 reveal-type" data-bg-color={bgColor} data-fg-color={fgColor}>{title}</h2>
          <ScrollAnimation>
            <p className="reveal-type" data-bg-color={bgColor} data-fg-color={fgColor}>
              {content}
            </p>
          </ScrollAnimation>
          <div className="mt-4 flex justify-center items-center max-h-full bg-cover bg-center rounded-md ">
            <img
              src={image}
              alt={title}
              className="h-full max-h-64 w-auto object-contain px-10"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

BoxComponent.propTypes={
  title:PropTypes.string,
  content:PropTypes.string,
  image:PropTypes.string,
  bgColor:PropTypes.string,
  fgColor:PropTypes.string
}

export default BoxComponent;
