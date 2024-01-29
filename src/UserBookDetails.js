import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import defaultBook from "./img/defaultBook.png";
// import AOS from "aos";

const TreadingBooks = (props) => {
  const [details1, setDetails1] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&limit=4&library_id=111`
      );

      setDetails1(resources.data.data);
    };
    fetchDetails();
  }, []);

  return (
    <section className="case-studies detailTrending">
            <div className="container">
                <div className="row grid-margin">
                    <div className="col-12 text-center common-heading pb-5">
                        <h2
                            style={{
                                fontSize: "3rem",
                                fontFamily: "Philosopher",
                            }}
                        >
                            Trendings Books
                        </h2>
                    </div>
                    {details1.length !== 0 ? (
                        details1.slice(0, 4).map((book, i) => {
                            if (book.library_id == "111") {
                                var site_name_image_path = `https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                            } else if (book.library_id == "222") {
                                var site_name_image_path = `https://kundanlalgupta.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                            } else {
                                var site_name_image_path = `https://rashtramatakasturba.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                            }
                            return (
                                <div
                                    key={i}
                                    className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                                    // data-aos="zoom-in"
                                >
                                    <div className="card color-cards">
                                        <div className="card-body p-0">
                                            <div
                                                className="text-center card-contents"
                                                style={{
                                                    backgroundColor: "#f2f2f2",
                                                }}
                                                // onClick={() =>
                                                //     handleDetails(
                                                //         `${book.name}/${book.id}/${book.library_id}`
                                                //     )
                                                // }
                                            >
                                                <div className="card-image">
                                                    <img
                                                        src={
                                                            book.image
                                                                ? site_name_image_path
                                                                : defaultBook
                                                        }
                                                        className="case-studies-card-img"
                                                        alt=""
                                                        onError={({
                                                            currentTarget,
                                                        }) => {
                                                            currentTarget.onerror =
                                                                null; // prevents looping
                                                            currentTarget.src =
                                                                defaultBook;
                                                        }}
                                                    />
                                                </div>
                                                <div className="card-details text-center pt-4">
                                                    <h6 className="m-0 pb-1">
                                                        {book.name
                                                            ? book.name
                                                            : "NA"}
                                                    </h6>
                                                </div>
                                                <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                    <div
                                                        style={{
                                                            width: "fit-content",
                                                            padding: "auto 5px",
                                                        }}
                                                    >
                                                        <div className="d-flex flex-column align-items-center library_badge">
                                                            <span className="badge badge-info">
                                                                {book.items
                                                                    .length &&
                                                                book.items[0]
                                                                    .format ===
                                                                    3
                                                                    ? "E-Book"
                                                                    : "Book"}
                                                            </span>

                                                            {book.library_id ===
                                                            111 ? (
                                                                <span className="badge badge-danger">
                                                                    Dindayal
                                                                    Upadhyay
                                                                    Library
                                                                </span>
                                                            ) : book.library_id ===
                                                              222 ? (
                                                                <span className="badge badge-danger">
                                                                    Kundanlal
                                                                    Gupta
                                                                    Library
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-danger">
                                                                    Rashtramata
                                                                    Kasturba
                                                                    Library
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="btn btn-white frontend-btn"
                                                        // onClick={() =>
                                                        //     handleDetails(
                                                        //         `${book.name}/${book.id}/${book.library_id}`
                                                        //     )
                                                        // }
                                                    >
                                                        <span>Read More</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="spinner">
                            <img src="/public/images/301.gif" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    
  );
};

/* const SearchedBooks = (props) => {
    
    


    return (
        <>
        <h1>Search book </h1>
        </>
    )
}; */

const BookDetails = (props) => {
  const [details, setDetails] = useState([]);
  const [library_id, setLibrary_id] = useState(111);

  const libraryStatus = [
    {
      value: 111,
      label: "Dindayal Upadhyay Library ",
    },
    {
      value: 222,
      label: "Kundanlal Gupta Library",
    },
    {
      value: 333,
      label: "Rashtramata Kasturba Library",
    },
  ];

  const libraryOnChange = (e) => {
    setLibrary_id(e.target.value);
    // const book1 = details.filter((item) => item.book.library_id === e.target.value);
    // console.log(book1);
  };


  

  useEffect(() => {
    const fetchDetails = async () => {
      const resources = await axios.get(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=61&search_by_book=true&library_id=${library_id}`
      );

      setDetails(resources.data.data);
    };
    fetchDetails();
  }, []);

  // const status = details.some(
  //   (book) => book.book.library_id === libraryStatus.value
  // );
  // const length1=details[0]?.ebooksubscriptions.length;
  // console.log(length1);
  // console.log("hy", details[0]?.book?.library_id);

  

  

 
    
    
  





  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  /* https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=766&search_by_book=true&library_id=111 */
  //run useeefect get all data of that book with make this page same as on live

  //axios

  //addet npm i react-slider  use this to show slider

  return (
    <div>
      {/* style added  */}

      <div className="book-wrapper">
        {/* {searchBooks.length ? ( */}
        <section className="book-details modal-content shadow-none">
          {/* {searchBooks.filter(
              (book) =>
                book.format !== 3 &&
                book.status === bookItemStatusConstants.AVAILABLE
            ).length === 0
              ? searchBooks.slice(-1).map((book, i) => {
                  console.log("books", book);
                  return ( */}
          <div className="container">
            <div className="row">
              <div className="col-md-6 product_img">
                <img
                  src={details[0]?.book?.image_path}
                  className="img-responsive"
                  width={400}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = defaultBook;
                  }}
                />
              </div>

              <div className="col-md-6 product_content px-4 py-3 rounded-lg">
                <h1 className="h1">{details[0]?.book?.name}</h1>
                <span>Condition 2</span>

                {details[0]?.book?.authors ? (
                  <p className="author_name">
                    by{" "}
                    <span>
                      {details
                        ? details[0]?.book?.authors.map((author) => {
                            const firstName = author.first_name
                              ? author.first_name
                              : "";
                            const lastName = author.last_name
                              ? author.last_name
                              : "";
                            return firstName + " " + lastName + ", ";
                          })
                        : null}
                    </span>{" "}
                    (Author)
                  </p>
                ) : (
                  ""
                )}

                {details && details[0]?.book?.description ? (
                  <div className="description">
                    <div className="inner_description">
                      <p>
                        {details && details[0]?.book?.description
                          ? details[0]?.book?.description
                          : ""}
                      </p>
                    </div>
                    <span className="show_more">see more details</span>

                    {/* <span className="show_less" style="display: none"
                  >see less details &gt;&gt;</span
                > */}
                  </div>
                ) : (
                  ""
                )}

                {/* here coursal logic  */}
                <Slider {...settings}>
                  <div className="details_box ">
                    <div className="inner_box">
                      <p className="detail_type">Language</p>
                      <p className="detail_image">
                        <i className="fas fa-globe-europe"></i>
                      </p>
                      <p className="detail_des">
                        {details[0]?.language?.language_name}
                      </p>
                    </div>
                  </div>

                  <div className="details_box ">
                    <div className="inner_box">
                      <p className="detail_type">Publisher</p>
                      <p className="detail_image">
                        <i className="fa-solid fa-building-user"></i>
                      </p>
                      <p className="detail_des">
                        {details[0]?.publisher?.name
                          ? details[0]?.publisher?.name
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="details_box ">
                    <div className="inner_box">
                      <p className="detail_type">ISBN </p>
                      <p className="detail_image">
                        <i className="fa-solid fa-barcode"></i>
                      </p>
                      <p className="detail_des">
                        {details && details[0]?.book?.isbn
                          ? details[0]?.book?.isbn
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="details_box ">
                    <div className="inner_box">
                      <p className="detail_type">Format</p>
                      <p className="detail_image">
                        <i className="fa-solid fa-book-open"></i>
                      </p>
                      <p className="detail_des">
                        {details[0]?.format === 1
                          ? "Hardcover"
                          : details[0]?.format === 2
                          ? "Paperback"
                          : "E-Book"}
                      </p>
                    </div>
                  </div>

                  <div className="details_box ">
                    <div className="inner_box">
                      <p className="detail_type">Genre</p>
                      <p className="detail_image">
                        <i className="fas fa-film"></i>
                      </p>
                      <p className="detail_des">
                        {details[0]?.book?.genres[0].name
                          ? details[0]?.book?.genres[0].name
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="details_box ">
                    <div className="inner_box">
                      <p className="detail_type">Edition</p>
                      <p className="detail_image">
                        <i className="far fa-address-book"></i>
                      </p>
                      <p className="detail_des">{details[0]?.edition}</p>
                    </div>
                  </div>
                </Slider>

                <p className="author_name specifications">
                  <span>Belongs To: </span>
                  <div className="publisher">
                    <select
                      defaultValue={details[0]?.book?.library_id}
                      className="form-select"
                      aria-label="Select Library."
                      onChange={libraryOnChange}
                    >
                      {libraryStatus.length ? (
                        libraryStatus.map((library) => {
                          return (
                            <option
                              key={library.value}
                              value={library.value}
                              enabled={details.some(
                                (book) => book.book.library_id === library.value
                              )}
                            >
                              {library.label}
                            </option>
                          );
                        })
                      ) : (
                        <option value="">No records found.</option>
                      )}
                    </select>
                  </div>
                </p>

                {/* here coursal logic end  */}
                <div className="availability">
                  <div className="label">
                    <p>Availability</p>
                  </div>
                  <div className="avail_options">
                    <span>
                      {details[0]?.format === 2 && details[0]?.status == 1
                        ? "Paperback(1)"
                        : "Paperback(0)"}
                    </span>
                    <span>
                      {details[0]?.format === 1 && details[0]?.status == 1
                        ? "Hardcover(1)"
                        : "Hardcover(0)"}
                    </span>
                    <span className="available">
                      Ebook(
                      {details && details[0]?.ebooksubscriptions.length
                        ? 20 - details[0]?.ebooksubscriptions.length
                        : 0}
                      )
                    </span>
                  </div>
                </div>

                <div class="buttons">
                  {(details[0]?.format === 1 && details[0]?.status == 1) ||
                  (details[0]?.format === 2 && details[0]?.status == 1) ? (
                    <button
                      type="button"
                      class="frontend-btn btn-warning"
                      // onClick={(index) =>
                      //   handleReserve(
                      //     details[0]?.id,
                      //     index,
                      //     details[0]?.book?.library_id
                      //   )
                      // }
                    >
                      <span> Reserve</span>
                    </button>
                  ) : (
                    ""
                  )}

                  {details[0]?.format === 3 ? (
                    <div class="buttons">
                      {details ? (
                        <button
                          type="button"
                          className={`frontend-btn btn-warning e-book `}
                          // onClick={() =>
                          //   handleSubscribe(
                          //     book.id,
                          //     book.book.library_id
                          //   )
                          // }
                        >
                          <span>Subscribe E-book</span>
                        </button>
                      ) : (
                        "hy not found"
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* );
                })
              : null} */}

          {/* <PDFviewerModal {...pdfModalOptions} /> */}
        </section>
        {/* ) : (
          <div className="spinner">
            <img src="/public/images/301.gif" />
          </div>
        )} */}
      </div>

      {/* style added end */}
    </div>
  );
};

function UserBookDetails(props) {
  return (
    <div>
      {/*  <SearchedBooks/> */}
      <BookDetails />
      <TreadingBooks />
    </div>
  );
}

export default UserBookDetails;
