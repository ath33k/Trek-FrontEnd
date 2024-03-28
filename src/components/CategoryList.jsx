/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "./Container";
import MySlider from "./MySlider";
import app, { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getimageURL } from "../firefunctions";
import ScrollSlider from "./ScrollSlider";

export default function CategoryList() {
  const categoryNames = ["scenic", "hiking", "rural"];
  const [selectedCategory, setSelectedCategory] = useState("scenic");
  const [sliderImage, setSliderImage] = useState([]);
  const runsOnce = useRef(true);

  const colRef = collection(db, "destinations");
  const allDoc = useMemo(() => fetchCollection(), []);

  // In this funciton fetches all firestore destination document
  async function fetchCollection() {
    const dest = [];
    const res = await getDocs(colRef);
    if (res) {
      res.docs.forEach((doc) => {
        dest.push({ ...doc.data(), id: doc.id });
      });
      return dest;
    }
  }

  // I this functional fetches ImageURLfor each filtered locations
  useEffect(
    function () {
      async function fetchUrl() {
        if (runsOnce.current) {
          runsOnce.current = false;
          setSliderImage(() => []);

          const resDocs = await allDoc;

          if (resDocs) {
            const categorySliders = resDocs
              .map((img) => img)
              .filter((img) => img.tags.includes(selectedCategory));
            categorySliders.forEach((obj) => {
              getimageURL(0, "/destinations/" + obj.id + "/desktop/").then(
                (imginfo) => {
                  setSliderImage((prev) => {
                    return [
                      ...(prev || []),
                      { ...imginfo, id: obj.id, name: obj.name },
                    ];
                  });
                }
              );
            });
          }
        }
      }
      fetchUrl();
    },
    [selectedCategory, allDoc]
  );

  function handleCategorySelection(e) {
    runsOnce.current = true;
    setSelectedCategory(() => e.target.id);
  }

  return (
    <>
      <div className="flex gap-2 justify-center text-xs ">
        {categoryNames.map((el) => {
          return (
            <CategoryBtn
              id={el}
              selectedCategory={selectedCategory}
              handleCategorySelection={handleCategorySelection}
              key={el}
            />
          );
        })}
      </div>

      {sliderImage && (
        <Container className={"mt-4 mx-8 "}>
          <ScrollSlider images={sliderImage} title={selectedCategory} />
        </Container>
      )}
    </>
  );
}

function CategoryBtn({ id, handleCategorySelection, selectedCategory }) {
  return (
    <button
      id={id}
      className={`transition-all duration-300 p-1 px-2 border-2 rounded-md ${
        selectedCategory == id ? " bg-black text-white" : "hover:bg-gray-300"
      } `}
      onClick={handleCategorySelection}
    >
      {id}
    </button>
  );
}
