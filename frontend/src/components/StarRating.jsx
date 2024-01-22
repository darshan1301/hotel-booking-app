// eslint-disable-next-line react/prop-types
const StarRating = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star, index) => (
        <svg
          key={index}
          className={`h-5 w-5 fill-current ${roundedRating >= star ? "text-stone-800" : "text-gray-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
