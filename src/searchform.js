import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
const Searchform = ({ searchText }) => {
  return (
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
  );
};

export default Searchform;
