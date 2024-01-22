const dataTest = [
  {
    userId: "user123",
    name: "Luxury Resort",
    city: "Miami",
    country: "USA",
    description: "A luxurious resort by the beach",
    type: "Resort",
    adultCount: 2,
    childCount: 1,
    facilities: ["Swimming Pool", "Spa", "Restaurant"],
    pricePerNight: 300,
    starRating: 5,
    imageUrls: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    lastUpdated: "2024-01-25T12:00:00Z",
    bookings: [
      {
        adultCount: 2,
        childCount: 1,
        checkIn: "2024-02-01T12:00:00Z",
        checkOut: "2024-02-05T10:00:00Z",
      },
    ],
  },
  {
    userId: "user456",
    name: "City Hotel",
    city: "New York",
    country: "USA",
    description: "A modern hotel in the heart of the city",
    type: "Hotel",
    adultCount: 2,
    childCount: 0,
    facilities: ["Gym", "Conference Rooms", "WiFi"],
    pricePerNight: 200,
    starRating: 4,
    imageUrls: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    lastUpdated: "2024-01-25T12:30:00Z",
    bookings: [
      {
        adultCount: 2,
        childCount: 1,
        checkIn: "2024-02-01T12:00:00Z",
        checkOut: "2024-02-05T10:00:00Z",
      },
    ],
  },
];

const MyBookings = () => {
  return (
    <div className="space-y-5 pt-4">
      <h1 className="px-8 text-2xl font-bold uppercase text-stone-500">
        My Bookings
      </h1>
      {dataTest.map((hotel) => (
        <div
          key={hotel.imageUrls}
          className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-8 lg:grid-cols-[1fr_3fr]"
        >
          <div className="lg:h-[250px] lg:w-full">
            <img
              src={hotel.imageUrls[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
            <div className="text-xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking, index) => (
              <div key={index}>
                <div>
                  <span className="mr-2 font-bold">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="mr-2 font-bold">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
