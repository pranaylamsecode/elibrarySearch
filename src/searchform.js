import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
const Searchform = ({ searchText }) => {
  const [text, setText] = useState("");
  const [showValidTextModal, setShowValidTextModal] = useState(false);

  const [genres, setGenre] = useState([]);
  const [authors, setAuthor] = useState([]);
  const [publishers, setPublisher] = useState([]);
  const [languages, setLanguage] = useState([]);
  const [formats, setFormat] = useState([]);

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

  console.log(languages);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "" || !text.trim()) {
      setShowValidTextModal(true);
      return;
    }
    searchText(text);
  };

  const onChangevalue = (e) => {
    e.preventDefault();
    setText(e.target.value);
    searchText(e.target.value);
    if (e.target.value === "") {
      setText("");
      searchText("");
    }
  };

  return (
    <div>
      <br />
      <div className="row">
        <div className="col-md-12">
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
            />
          </div>

          <div className="col-md-3">
            <Select
              title="Formats"
              placeholder="Select Formats"
              options={
                formats
                  ? formats.map((genre, i) => ({
                      label: genre.label,
                      value: genre.id,
                    }))
                  : []
              }
            />
          </div>
        </div>
      </div>

      <br />

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
          onChange={onChangevalue}
        />
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
      </form>
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
  );
};

export default Searchform;
