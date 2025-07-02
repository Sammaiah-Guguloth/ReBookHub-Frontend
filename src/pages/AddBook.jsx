import React, { useState } from "react";
import FileUploadDropBox from "../components/FileUploadDropBox";
import genres from "../data/genres";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios/axiosInstance";
import { ADD_BOOK_URL } from "../api/apis";

const AddBookForm = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [trueImages, setTrueImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data) => {
    if (!coverImage) {
      toast("Please upload a cover image");
      return;
    }

    if (trueImages.length === 0) {
      toast("Please upload at least one additional image");
      return;
    }

    const formData = new FormData();

    // Adding text data
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("genre", data.genre);
    formData.append("language", data.language);
    formData.append("price", data.price);

    const publication = JSON.stringify({
      date: data.publicationDate,
      publisher: data.publisher,
    });
    formData.append("publication", publication);

    formData.append("coverImage", coverImage);
    trueImages.forEach((image) => {
      formData.append("trueImages", image);
    });

    // console.log("formData : " , formData);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(ADD_BOOK_URL, formData);
      setIsLoading(false);
      // console.log("response : ", response);

      if (response.status === 201) {
        toast.success("Book added Successfully");
        reset();
        setCoverImage(null);
        setTrueImages([]);
      } else {
        toast.error("Failed to add book");
      }
    } catch (error) {
      setIsLoading(false);
      // console.log("Error while adding the book  : ", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const inputStyle = (fieldError) =>
    `p-2 border rounded-md w-full outline-none ${
      fieldError ? "border-red-500" : ""
    }`;

  return (
    <div className="flex flex-col items-center w-full mt-5 animate-slideUp">
      <h2 className="text-center text-2xl font-semibold mb-6">Add a Book</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full md:w-[90%] p-6 border-2 rounded-md flex flex-col gap-6 mb-3  "
      >
        <div className="flex md:flex-row flex-col gap-6 w-full justify-between md:gap-3">
          <div className="w-full">
            <input
              {...register("title", { required: "Title name is required" })}
              className={inputStyle(errors.title)}
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("author", { required: "Author name is required" })}
              className={inputStyle(errors.author)}
              placeholder="Author"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-6 w-full justify-between md:gap-3">
          <input
            {...register("language", { required: "Language is required" })}
            className={inputStyle(errors.language)}
            placeholder="Language"
          />
          <input
            {...register("rating")}
            type="number"
            min={0}
            max={10}
            step={0.1}
            className={inputStyle(errors.rating)}
            placeholder="Rating /10"
          />
        </div>

        <div>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={inputStyle(errors.description)}
            placeholder="Description"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex md:flex-row flex-col gap-6 w-full justify-between md:gap-3">
          <select
            {...register("genre", { required: "Genre is required" })}
            className={`border rounded-md md:w-[50%] w-full p-2 px-4 bg-white text-gray-800 outline-none ${
              errors.genre ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={genre.id} value={genre.genre}>
                {genre.genre}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}

          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            step={0.1}
            className={inputStyle(errors.price)}
            placeholder="Price"
          />
        </div>

        <div className="flex md:flex-row flex-col gap-6 w-full justify-between md:gap-3">
          <input
            {...register("publisher", { required: "Publisher is required" })}
            className={inputStyle(errors.publisher)}
            placeholder="Publisher"
          />
          <div className="w-full relative">
            <label className="absolute -top-2 z-20 left-5 text-sm">
              Publication Date
            </label>
            <input
              {...register("publicationDate", {
                required: "Publication Date is required",
              })}
              type="date"
              className={inputStyle(errors.publicationDate)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Upload Cover Image</label>
          <FileUploadDropBox
            files={coverImage}
            setFiles={setCoverImage}
            isCover={true}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Upload Additional Images</label>
          <FileUploadDropBox
            files={trueImages}
            setFiles={setTrueImages}
            isCover={false}
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-[60%] mx-auto bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 font-semibold transition-all hover:scale-105"
          disabled={isLoading ? true : false}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
