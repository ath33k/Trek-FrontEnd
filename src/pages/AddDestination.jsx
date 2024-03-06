import Container from "../components/Container";
import ErrorScreen from "../components/Errors/ErrorScreen";
import ImageInput from "../components/Inputs/ImageInput";
import TextInput from "../components/Inputs/TextInput";
import { useUploadFile } from "react-firebase-hooks/storage";
import LoadingScreen from "../components/Loading/LoadingScreen";
import { useState } from "react";
import { addDestination } from "../firefunctions";
import { db, storage } from "../config/firebase";
import { ref as storageRef } from "firebase/storage";
export default function AddDestination() {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [formData, setFormData] = useState(null);

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
        "other-names": formData["other-names"].trim().toLowerCase().split(","),
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

  if (error) {
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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <Container className={" flex flex-col gap-3 pt-5 pb-10 px-2"}>
        <h1 className="text-3xl font-bold text-center">Add Destination</h1>
        <div>
          <h3 className="text-xl font-bold mb-2 text-center">
            Desktop View Images
          </h3>
          <ImageInput
            onImageChange={(file) => {
              handleFileChange(file, "desktopImages");
            }}
            description="More Rectangle looking Images"
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
            description="More Square lookig Images"
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
            step="any"
          />
          <TextInput
            onChange={(e) => {
              handleInputChange(e);
            }}
            label={"Latitude"}
            placeholder={"eg: 7.8731"}
            type="number"
            step="any"
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
