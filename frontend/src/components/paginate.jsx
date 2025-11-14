import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  if (pages <= 1) return null; // 🧩 No pagination needed for single page

  return (
    <Pagination className="justify-content-center my-3">
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;

        // 🧠 Construct correct route
        const link = !isAdmin
          ? keyword
            ? `/search/${keyword}/page/${pageNumber}`
            : `/page/${pageNumber}`
          : `/admin/userlist/${pageNumber}`;

        return (
          <LinkContainer key={pageNumber} to={link}>
            <Pagination.Item active={pageNumber === page}>
              {pageNumber}
            </Pagination.Item>
          </LinkContainer>
        );
      })}
    </Pagination>
  );
};

export default Paginate;
