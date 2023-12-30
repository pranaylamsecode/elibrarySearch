import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "./img/Book.svg";

import Footer from "./footer";
import Book from "./book";
import LoadingCard from "./loadingCard";
import Select from "react-select";

const BookDetails = () => {
  /* variable for search */
  const inputRef = useRef(null);
  const [details, setDetails] = useState([]);
  const [prevLimit, setPrevLimit] = useState(10);
  const [prevSkip, setPrevSkip] = useState(0);
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [showValidTextModal, setShowValidTextModal] = useState(false);
  const [genres, setGenre] = useState([]);
  const [authors, setAuthor] = useState([]);
  const [publishers, setPublisher] = useState([]);
  const [languages, setLanguage] = useState([]);
  const [formats, setFormat] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [library, setLibrary] = useState([
    { value: 111, label: "dindayalupadhyay" },
    { value: 222, label: "kundanlalgupta" },
    { value: 333, label: "rashtramatakasturba" },
  ]);

  const [formgenre, setformGenre] = useState(0);

  const [formauthors, setformauthors] = useState(0);
  const [formpublishers, setformpublishers] = useState(0);
  const [formlanguages, setformlanguages] = useState(0);
  const [formformats, setformformats] = useState(0);
  const [optionsuggestions, setoptionsuggestions] = useState([]);

  const [formlibrary_id, setLibraryId] = useState(0);

  function refreshPage() {
    window.location.reload(false);
  }

  const handleButtonClick = (e) => {
    // Access and set the value of the input field using the ref
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.value = e;
    }
    setTerm(e);
  };
  useEffect(() => {
    if (term !== "") {
      fetch(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books-name?search=${term}&limit=5`
      )
        .then((res) => res.json())
        .then((data) => setoptionsuggestions(data.data));
    }

    /*  */
  }, [term]);

  const handleLinkClick = (e) => {
    // Update the state using the setter function
    setTerm(e);
  };
  useEffect(() => {
    const fetchGenre = async () => {
      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/genres?order_by=name&direction=asc`
      );
      setGenre(resources.data.data);
    };
    const fetchAuthor = async () => {
      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/authors?order_by=first_name&direction=asc`
      );
      setAuthor(resources.data.data);
    };
    const fetchPublisher = async () => {
      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/publishers?order_by=name&direction=asc`
      );
      setPublisher(resources.data.data);
    };
    const fetchLanguage = async () => {
      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/b1/book-languages?order_by=language_name&direction=asc`
      );
      setLanguage(resources.data.data);
    };
    const fetchFormat = async () => {
      setFormat([
        { value: 1, label: "Hardcover" },
        { value: 2, label: "PaperBack" },
        { value: 3, label: "E-Book" },
      ]);
    };
    fetchGenre();
    fetchAuthor();
    fetchPublisher();
    fetchLanguage();
    fetchFormat();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "" || !text.trim()) {
      setShowValidTextModal(true);
      return;
    }
    /* searchText(text); */
  };

  const onChangevalue = (e) => {
    e.preventDefault();

    setTerm(e.target.value);
  };

  const filterformGenre = (e) => {
    setformGenre(e.value);
  };
  const filterformAuthor = (e) => {
    setformauthors(e.value);
  };
  const filterformPublishers = (e) => {
    setformpublishers(e.value);
  };
  const filterformLanguages = (e) => {
    setformlanguages(e.value);
  };
  const filterformFormat = (e) => {
    setformformats(e.value);
  };

  const filterformLibrary = (e) => {
    setLibraryId(e.value);
  };

  /* variable for search end */

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setPrevLimit(10);
      setPrevSkip(0);

      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${formformats}`
      );
      setDetails(resources.data.data);
      setIsLoading(false);
    };
    fetchDetails();
  }, [
    term,
    formgenre,
    formauthors,
    formpublishers,
    formlanguages,
    formformats,
    formlibrary_id,
  ]);

  const loadMore = async () => {
    setPrevLimit(prevLimit + 10);
    setPrevSkip(prevSkip + 10);

    const resources = await axios.get(
      `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${formformats}`
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
      {/* saerch logic  */}
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search by book and author name"
            ref={inputRef}
            onChange={onChangevalue}
          />
          <u>
            {optionsuggestions?.map((r) => (
              <li key={r.id}>
                <a href="#" onClick={() => handleButtonClick(r.name)}>
                  {r.name}
                </a>
              </li>
            ))}
          </u>
          {/*  <Suggestions results={optionsuggestions} /> */}
          {/* search logic new  */}
          <br />
          {/* <SearchBookLogic /> */}
          <button
            style={{
              marginLeft: "1rem",
              transition: "all 0.3s ease 0s",
              padding: "0.6rem",
              borderRadius: "0.2rem",
              cursor: "pointer",
            }}
            type="submit"
          >
            Search
          </button>

          <a
            style={{
              marginLeft: "1rem",
              transition: "all 0.3s ease 0s",
              padding: "0.6rem",
              borderRadius: "0.2rem",
              cursor: "pointer",
            }}
            onClick={refreshPage}
          >
            <span style={{ color: "red" }}>Reset</span>
          </a>
        </form>

        <br />
        <div className="row">
          <div className="col-md-12 filter-row">
            <div className="col-md-3">
              <Select
                title="Genre"
                placeholder="Select Genre"
                options={
                  genres
                    ? genres.map((genre, i) => ({
                        label: genre.name,
                        value: genre.id,
                      }))
                    : []
                }
                onChange={filterformGenre}
              />
            </div>

            <div className="col-md-3">
              <Select
                title="Author"
                placeholder="Select Author"
                options={
                  authors
                    ? authors.map((author, i) => ({
                        label: author.first_name,
                        value: author.id,
                      }))
                    : []
                }
                onChange={filterformAuthor}
              />
            </div>

            <div className="col-md-3">
              <Select
                title="Publishers"
                placeholder="Select Publishers"
                options={
                  publishers
                    ? publishers.map((publisher, i) => ({
                        label: publisher.name,
                        value: publisher.id,
                      }))
                    : []
                }
                onChange={filterformPublishers}
              />
            </div>

            <div className="col-md-3">
              <Select
                title="Languages"
                placeholder="Select Languages"
                options={
                  languages
                    ? languages.map((language, i) => ({
                        label: language.language_name,
                        value: language.id,
                      }))
                    : []
                }
                onChange={filterformLanguages}
              />
            </div>

            <br />
            <br />

            <div className="col-md-3">
              <Select
                title="Formats"
                placeholder="Select Formats"
                options={
                  formats
                    ? formats.map((genre, i) => ({
                        label: genre.label,
                        value: genre.value,
                      }))
                    : []
                }
                onChange={filterformFormat}
              />
            </div>

            <div className="col-md-3">
              <Select
                title="Library"
                placeholder="Select Library"
                options={
                  library
                    ? library.map((genre, i) => ({
                        label: genre.label,
                        value: genre.value,
                      }))
                    : []
                }
                onChange={filterformLibrary}
              />
            </div>
          </div>
        </div>

        <br />
        <div
          id="popup1"
          class={showValidTextModal ? "overlay modal-active" : "overlay"}
        >
          <div class="popup">
            <div class="close" onClick={() => setShowValidTextModal(false)}>
              &times;
            </div>
            <h3 class="content">Please Enter the valid text</h3>
          </div>
        </div>
      </div>

      {/* search logic end  */}
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
