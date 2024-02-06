import { useManageHotel } from "../../contexts/ManageHotelContext";

const ImagesSection = () => {
  const { manageHotelState, dispatch } = useManageHotel();
  const existingImageUrls = manageHotelState.imageUrls;

  const handleChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    dispatch({
      type: "addFiles",
      payload: [...newImages],
    });
    console.log(newImages);
  };

  const handleDelete = (e, url) => {
    dispatch({
      type: "deleteImage",
      payload: url,
    });
  };

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Images</h2>
      <div className="flex flex-col gap-4 rounded border p-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="group relative" key={url}>
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          id="imageInput"
          name="photos"
          onChange={(e) => handleChange(e)}
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-700"
        />
      </div>
    </div>
  );
};

export default ImagesSection;
