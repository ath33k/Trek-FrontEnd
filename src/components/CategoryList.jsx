import Container from "./Container";
import MySlider from "./MySlider";

export default function CategoryList({
  categoryNames,
  selectedCategory,
  categorySliders,
  handleCategorySelection,
}) {
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

      {categorySliders && (
        <Container className={"mt-4 mx-8 "}>
          <h2 className="lg:text-lg  my-2 mx-1 xl:mx-2 2xl:mx-4">
            {selectedCategory}
          </h2>
          <MySlider slides={categorySliders} />
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
