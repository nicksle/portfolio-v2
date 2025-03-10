import PropTypes from "prop-types";
import React from "react";
import BodyComponentText from "../BodyComponent/BodyComponentText";
import BodyComponentImage from "../BodyComponent/BodyComponentImage";
import { BodyComponentSelectedWork } from "../BodyComponent/BodyComponentSelectedWork";
import "./BodyItem.css";

export const BodyItemRow = ({ layout, content }) => {
  const getComponentProps = (contentItem) => {
    switch (contentItem.type) {
      case "text":
        return {
          component: BodyComponentText,
          props: { text: contentItem.text }
        };
      case "image":
        return {
          component: BodyComponentImage,
          props: { src: contentItem.src }
        };
      case "selected-work":
        return {
          component: BodyComponentSelectedWork,
          props: { works: contentItem.works }
        };
      default:
        return null;
    }
  };

  // Handle array of content items for row layout
  if (Array.isArray(content)) {
    return (
      <div className={`body-item ${layout}`}>
        {content.map((contentItem, index) => {
          const componentData = getComponentProps(contentItem);
          if (!componentData) return null;
          
          const Component = componentData.component;
          return (
            <div key={index} className="body-item-content">
              <Component {...componentData.props} />
            </div>
          );
        })}
      </div>
    );
  }

  // Handle single content item
  const componentData = getComponentProps(content);
  if (!componentData) return null;

  const Component = componentData.component;
  return (
    <div className={`body-item ${layout}`}>
      <Component {...componentData.props} />
    </div>
  );
};

BodyItemRow.propTypes = {
  layout: PropTypes.oneOf(["row"]).isRequired,
  content: PropTypes.oneOfType([
    // Single content item
    PropTypes.shape({
      type: PropTypes.oneOf(["text", "image", "selected-work"]).isRequired,
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
      ),
    }),
    // Array of content items
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(["text", "image", "selected-work"]).isRequired,
        text: PropTypes.string,
        src: PropTypes.string
      })
    )
  ]).isRequired
};

export default BodyItemRow;
