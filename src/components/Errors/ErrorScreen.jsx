/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import { navlinks } from "../../navlinks";

export default function ErrorScreen({ type }) {
  const navigate = useNavigate();
  return (
    <Container>
      <div
        className=" fixed
  left-1/2 top-1/2 transform -translate-x-1/2 text-center -translate-y-1/2"
      >
        <span className=" text-4xl md:text-8xl text-gray-400 ">
          &#x4e41;(&middot;&bull;&#x1dc4;&lrm;&#x847;&bull;&#x1dc5;&#x20;)&#x30ce;
        </span>
        <div className="mt-5">
          <h1 className="text-sm md:text-2xl text-gray-400 ">
            {type === "404" ? "404" : "Something went wrong"}
          </h1>
          <p className="text-gray-400 md:text-base text-xs ">
            {type === "404"
              ? "The page you are looking for does not exist"
              : "Please try again later"}
          </p>
        </div>
        <button
          className="mt-5 bg-gray-800 text-white px-3 text-sm font-mono py-1 rounded-md"
          onClick={() => navigate(navlinks.home.path)}
        >
          Go Home
        </button>
      </div>
    </Container>
  );
}
