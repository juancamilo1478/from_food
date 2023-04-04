import image1 from "../../images/01.jpg";
import image2 from "../../images/02.jpg";
import image3 from "../../images/03.jpg";
import image4 from "../../images/04.jpg";
import { useEffect, useState } from "react";

const Slide = () => {
  const images = [image1, image2, image3, image4];
  const [selectIndex, setSelectindex] = useState(0);
  const [selectImage, setSelectimage] = useState(images[0]);
  const [loaded, setloaded] = useState(false);
  const previus = () => {
    setloaded(false);
    const condition = selectIndex > 0;
    const nextindex = condition ? selectIndex - 1 : images.length - 1;
    setSelectimage(images[nextindex]);
    setSelectindex(nextindex);
  };
  const next = () => {
    setloaded(false);
    const condition = selectIndex < images.length - 1;
    const nextindex = condition ? selectIndex + 1 : 0;
    setSelectimage(images[nextindex]);
    setSelectindex(nextindex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <div className="slide_image_relative">
      <div className="slide_image">
        <img
          src={selectImage}
          alt="silide_image"
          onLoad={() => setloaded(true)}
          className={loaded === true ? "slide_off" : "slide_on"}
        />

        <button onClick={previus}>{"<"}</button>
        <button onClick={next}>{">"}</button>
      </div>
    </div>
  );
};

export default Slide;
