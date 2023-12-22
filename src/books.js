import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Book.svg";
import Searchform from "./searchform";
import Footer from "./footer";
import Book from "./book";
import LoadingCard from "./loadingCard";

const BookDetails = () => {
  const [details, setDetails] = useState([]);
  const [prevLimit, setPrevLimit] = useState(10);
  const [prevSkip, setPrevSkip] = useState(0);
  const [genre, setGenre] = useState(18);
  const [library_id, setLibraryId] = useState(0);
  const [term, setTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&direction=desc&limit=10&skip=0&search=${term}&genre=${genre}&library_id=${library_id}`
      );
      setDetails(resources.data.data);
      setIsLoading(false);
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    setPrevLimit(prevLimit + 10);
    setPrevSkip(prevSkip + 10);

    const resources = await axios.get(
      `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&direction=desc&limit=${prevLimit}&skip=${prevSkip}&search=${term}&genre=${genre}&library_id=${library_id}`
    );
    setDetails((oldDetails) => [...oldDetails, ...resources.data.data]);
  };

  return (
    <>
      <h2
        style={{
          textTransform: "capitalize",
          color: "#DB4437",
          fontSize: 40,
          marginTop: -60,
          marginBottom: -21,
          fontFamily: "Scheherazade New",
        }}
      >
        {term}
      </h2>
      <Searchform searchText={(text) => setTerm(text)}></Searchform>
      {isLoading ? (
        <section className="container" style={{ padding: "2rem 0rem" }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : !details ? (
        <h1
          className="loading-name"
          style={{
            background: "white",
            borderRadius: "1rem",
            color: "#DB4437",
            padding: "1rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 33,
            fontFamily: "Inria Serif",
            transform: "translate(-50%,-50%)",
            textTransform: "capitalize",
          }}
        >
          😞 Couldn't find books about {term}
        </h1>
      ) : (
        <section>
          <section className="container" style={{ padding: "2rem 0rem" }}>
            {details.map((book, index) => (
              <Book {...book} key={index} />
            ))}
            <div className="custom-card">
              <h3 style={{ fontSize: "1.32rem", color: "white" }}>
                Didn't find the book you love?
              </h3>
              <br />

              <img
                style={{ width: "100%" }}
                src={logo}
                alt="A man reading a book"
                srcset=""
              />

              <h3 style={{ fontSize: "1.21rem", color: "white" }}>
                Search for your favourite{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Genre{" "}
                </span>
                or{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Author{" "}
                </span>
                in the search box!!
              </h3>
            </div>
          </section>
          <div className="load-more">
            <button onClick={() => loadMore()}>Load More!</button>
          </div>
          <Footer></Footer>
        </section>
      )}
    </>
  );
};

export default BookDetails;
