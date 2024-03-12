import Container from "../components/Container";
import ErrorScreen from "../components/Errors/ErrorScreen";
import ImageInput from "../components/Inputs/ImageInput";
import TextInput from "../components/Inputs/TextInput";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingScreen from "../components/Loading/LoadingScreen";
import { useEffect, useState } from "react";
import { addDestination } from "../firefunctions";
import { db, storage } from "../config/firebase";
import { ref as storageRef } from "firebase/storage";
import { collection } from "firebase/firestore";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
export default function AddDestination() {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [desdata, desloading, deserror] = useCollectionData(
    collection(db, "destinations")
  );
  const [formData, setFormData] = useState(null);
  const [showDestinations, setShowDestinations] = useState(false);

  useEffect(() => {
    //alert("Check whether destination is already in the database.");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (file, type) => {
    setFormData({
      ...formData,
      [type]: file,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const destRef = await addDestination(db, {
        ...formData,
        // add only file names to the destination object
        desktopImages: formData.desktopImages.map((file) => file.name),
        mobileImages: formData.mobileImages.map((file) => file.name),
        tags: formData.tags.trim().toLowerCase().split(","),
        "other-names": formData["other-names"].trim().split(","),
      });

      formData.desktopImages.forEach(async (file, index) => {
        const deskImgRef = storageRef(
          storage,
          `destinations/${destRef.id}/desktop/${index}`
        );
        await uploadFile(deskImgRef, file);
      });
      formData.mobileImages.forEach(async (file, index) => {
        const deskImgRef = storageRef(
          storage,
          `destinations/${destRef.id}/mobile/${index}`
        );
        await uploadFile(deskImgRef, file);
      });
    } catch (e) {
      return <ErrorScreen />;
    }
  };

  if (error || deserror) {
    return <ErrorScreen />;
  }
  if (uploading) {
    return (
      <LoadingScreen
        messages={[
          "Uploading Images to Server",
          "Please Wait",
          "This may take a while",
        ]}
        progress={(snapshot.bytesTransferred / snapshot.totalBytes) * 100}
      />
    );
  }
  if (desloading) {
    return (
      <LoadingScreen
        messages={["Fetching Data", "Please Wait", "This may take a while"]}
      />
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <Container className={" flex flex-col gap-3 pt-5 pb-10 px-2"}>
        <h1 className="text-3xl font-bold text-center">Add Destination</h1>
        <div
          className=" relative cursor-pointer flex gap-3 items-center border px-4 py-2 "
          onClick={() => setShowDestinations(!showDestinations)}
        >
          <p className="text-lg font-semibold text-red-600">
            {desdata.length > 0
              ? `Destionations in Database: ${desdata.length}`
              : "No Destinations in Database"}
          </p>
          {showDestinations ? (
            <MdExpandLess className="text-2xl text-red-600" />
          ) : (
            <MdExpandMore className="text-2xl text-red-600" />
          )}

          {showDestinations && (
            <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              <ul className="flex flex-col gap-2 p-2">
                {desdata.map((dest, index) => (
                  <li
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                  >
                    {dest.name}-{dest.city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-center">
            Desktop View Images
          </h3>
          <ImageInput
            onImageChange={(file) => {
              handleFileChange(file, "desktopImages");
            }}
            description="1920 x 1080 Images"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-center">
            Mobile View Images
          </h3>
          <ImageInput
            onImageChange={(file) => {
              handleFileChange(file, "mobileImages");
            }}
            description="1024 x 768 Images"
          />
        </div>
        <TextInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          label={"Name"}
          placeholder={"eg: Sigiriya"}
        />
        <TextInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          label={"Other Names"}
          placeholder={"Lions Rock, Kubera Palace, etc... "}
        />
        <TextInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          label={"Description"}
          placeholder={"Description about the place"}
        />
        <TextInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          label={"Tags"}
          placeholder={"urban, nature, historical, etc..."}
        />
        <div className="flex w-full gap-2">
          <TextInput
            onChange={(e) => {
              handleInputChange(e);
            }}
            label={"Longitude"}
            placeholder={"eg: 80.7459"}
            type="number"
            step="0.01"
          />
          <TextInput
            onChange={(e) => {
              handleInputChange(e);
            }}
            label={"Latitude"}
            placeholder={"eg: 7.8731"}
            type="number"
            step="0.01"
          />
        </div>
        <TextInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          label={"City"}
          placeholder={"eg: Dambulla"}
        />
        <TextInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          label={"District"}
          placeholder={"eg: Matale"}
        />
        <TextInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          label={"Province"}
          placeholder={"eg: Central"}
        />
        <select
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => {
            handleInputChange(e);
          }}
          name="uploaderName"
        >
          <option value={""} disabled selected>
            Uploader Name
          </option>
          <option value={"Atheek"}>Atheek</option>
          <option value={"Bhanuka"}>Bhanuka</option>
          <option value={"Duvin"}>Duvin</option>
          <option value={"Lakshan"}>Lakshan</option>
          <option value={"Saraah"}>Saraah</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2.5 w-full"
        >
          Add Destination
        </button>
      </Container>
    </form>
  );
}
