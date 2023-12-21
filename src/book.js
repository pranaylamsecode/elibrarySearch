import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import defaultBook from "./img/defaultBook.png";
import "../src/sass/style.css";
import { motion } from "framer-motion";

const Book = (props) => {
  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15,
      },
    },
  };
  console.log(props);
  let { name, authors_name, publisher_id, image, library_id, id } = props;

  //setting up default values for volume info data
  let title = name || "Title is not available";
  let authors = authors_name || "Author(s) name not available";
  let publisher = publisher_id || "Publisher company not available";
  let id1 = id || "null";
  let libraryid = library_id || "null";
  let previewLink = `https://dindayalupadhyay.smartcitylibrary.com/#/search/book&${title}/${id1}/${libraryid}`;

  if (library_id == "111") {
    var site_name_image_path = `https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
  } else if (library_id == "222") {
    var site_name_image_path = `https://kundanlalgupta.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
  } else {
    var site_name_image_path = `https://rashtramatakasturba.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
  }

  return (
    <section key={id} className="loading-card">
      <div>
        <div>
          <motion.img
            src={image ? site_name_image_path : defaultBook}
            width="100px"
            alt="Book-cover"
            variants={imageVariants}
            whileHover="hover"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = defaultBook;
            }}
          />
        </div>
        <div>
          {title && (
            <div>
              <h3 className="inline">{title}</h3>
            </div>
          )}
        </div>

        <div>
          {authors && (
            <h4 style={{ paddingBottom: "1rem", color: "black" }}>
              {" "}
              Author:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "#3B3B3B",
                }}
              >
                {" "}
                {authors}{" "}
              </span>
            </h4>
          )}
        </div>

        <div>
          {publisher && (
            <h5 style={{ paddingBottom: "1rem", color: "black" }}>
              {" "}
              Published by:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "#3B3B3B",
                }}
              >
                {" "}
                {publisher}{" "}
              </span>
            </h5>
          )}
        </div>

        <div>
          {previewLink && (
            <h5
              style={{
                fontWeight: "bold",
                color: "black",
                paddingBottom: "1rem",
              }}
            >
              <a href={previewLink} target="_blank" rel="noreferrer">
                Read more
              </a>
            </h5>
          )}
        </div>
      </div>
    </section>
  );
};

export default Book;

// import React, { useState } from "react";
// import { BiLinkExternal } from "react-icons/bi";
// import defaultBook from "./img/defaultBook.png";
// import "../src/sass/style.css";
// import { motion } from "framer-motion";

// const Book = (props) => {
//   const [bookDetails, setBookDetails] = useState(null);
//   const imageVariants = {
//     hover: {
//       scale: 1.7,
//       boxShadow: "0px 0px 8px #000",
//       transition: {
//         duration: 0.5,
//         type: "spring",
//         delay: 0.15,
//       },
//     },
//   };

//   const fetchBookDetails = async () => {
//     try {
//       const response = await fetch(
//         `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=${props.id}&search_by_book=true&library_id=111`
//       );
//       const data = await response.json();
//       if (data.success && data.data.length > 0) {
//         setBookDetails(data.data[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching book details:", error);
//     }
//   };

//   const customAPILink = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=${props.id}&search_by_book=true&library_id=111`;

//   const handlePreviewLinkClick = (item) => {
//     console.log(item);
//     // Call the API to get detailed information about the book
//     fetchBookDetails(item);
//   };

//   let { name, authors_name, publisher_id, image, library_id, id } = props;

//   //setting up default values for volume info data
//   let title = name || "Title is not available";
//   let authors = authors_name || "Author(s) name not available";
//   let publisher = publisher_id || "Publisher company not available";
//   //let previewLink = "https://books.google.co.in/";

//   if (library_id == "111") {
//     var site_name_image_path = `https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
//   } else if (library_id == "222") {
//     var site_name_image_path = `https://kundanlalgupta.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
//   } else {
//     var site_name_image_path = `https://rashtramatakasturba.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
//   }

//   return (
//     <section key={id} className="loading-card">
//       <div>
//         <div>
//           <motion.img
//             src={image ? site_name_image_path : defaultBook}
//             width="100px"
//             alt="Book-cover"
//             variants={imageVariants}
//             whileHover="hover"
//             onError={({ currentTarget }) => {
//               currentTarget.onerror = null; // prevents looping
//               currentTarget.src = defaultBook;
//             }}
//           />
//         </div>
//         <div>
//           {title && (
//             <div>
//               <h3 className="inline">{title}</h3>
//             </div>
//           )}
//         </div>

//         <div>
//           {authors && (
//             <h4 style={{ paddingBottom: "1rem", color: "black" }}>
//               {" "}
//               Author:{" "}
//               <span
//                 style={{
//                   fontWeight: "bold",
//                   color: "#3B3B3B",
//                 }}
//               >
//                 {" "}
//                 {authors}{" "}
//               </span>
//             </h4>
//           )}
//         </div>

//         <div>
//           {publisher && (
//             <h5 style={{ paddingBottom: "1rem", color: "black" }}>
//               {" "}
//               Published by:{" "}
//               <span
//                 style={{
//                   fontWeight: "bold",
//                   color: "#3B3B3B",
//                 }}
//               >
//                 {" "}
//                 {publisher}{" "}
//               </span>
//             </h5>
//           )}
//         </div>

//         <div>
//           {customAPILink && (
//             <h5
//               style={{
//                 fontWeight: "bold",
//                 color: "black",
//                 paddingBottom: "1rem",
//               }}
//             >
//               Read more :{" "}
//               <a
//                href={customAPILink}
//                target="_blank"
//                rel="noreferrer"
//                onClick={handlePreviewLinkClick(id)}
//               >
//                 {" "}
//                 Google Books <BiLinkExternal></BiLinkExternal>{" "}
//               </a>
//             </h5>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Book;
