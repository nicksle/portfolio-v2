import PropTypes from "prop-types";
import React from "react";
import { BodyItem } from "../BodyItem/BodyItem";
import { BodyItemRow } from "../BodyItem/BodyItemRow";
import "./Body.css";

export const Body = ({ 
  className,
  bodyItems = [] // Array of bodyItem configurations
}) => {
  return (
    <div className={`body ${className || ""}`}>
      {bodyItems.map((item, index) => {
        // Determine which component to render based on layout
        if (item.layout === "row") {
          return (
            <div key={index} className="body-item">
              <BodyItemRow
                layout="row"
                content={item.content}
              />
            </div>
          );
        } else {
          return (
            <div key={index} className="body-item">
              <BodyItem
                layout="column"
                content={item.content}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

Body.propTypes = {
  className: PropTypes.string,
  bodyItems: PropTypes.arrayOf(
    PropTypes.shape({
      layout: PropTypes.oneOf(["column", "row"]).isRequired,
      content: PropTypes.oneOfType([
        PropTypes.shape({
          type: PropTypes.oneOf([
            "text",
            "image",
            "selected-work",
            "list-group",
            "card-group"
          ]).isRequired,
          text: PropTypes.string,
          src: PropTypes.string,
          works: PropTypes.arrayOf(
            PropTypes.shape({
              index: PropTypes.number.isRequired,
              subtitle: PropTypes.string.isRequired,
              image: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
            })
          )
        }),
        PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.oneOf([
              "text",
              "image",
              "selected-work",
              "list-group",
              "card-group"
            ]).isRequired,
            text: PropTypes.string,
            src: PropTypes.string
          })
        )
      ]).isRequired
    })
  )
};

export default Body;
