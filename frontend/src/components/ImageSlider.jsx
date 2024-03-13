// ImageSlider.js

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const defaultImage = [
  "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1707820119/hotelImages/fzhj7yw3eyx6ifevhq6b.jpg",
];

const ImageSlider = ({ images = defaultImage, styles }) => {
  // If there's only one image, render it without using the slider
  if (images.length === 1) {
    return <img src={images[0]} alt="Single Image" className={styles} />;
  }

  // Otherwise, use the slider
  const settings = {
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          className={styles}
        />
      ))}
    </Slider>
  );
};

export default ImageSlider;
