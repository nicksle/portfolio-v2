import PropTypes from "prop-types";
import React from "react";
import BodyComponentText from "../BodyComponent/BodyComponentText";
import BodyComponentImage from "../BodyComponent/BodyComponentImage";
import { BodyComponentSelectedWork } from "../BodyComponent/BodyComponentSelectedWork";
import "./BodyItem.css";

export const BodyItem = ({ layout, content }) => {
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

  // Handle array of content items for column layout
  if (Array.isArray(content)) {
    return (
      <div className={`body-item ${layout}`}>
        {content.map((contentItem, index) => {
          const componentData = getComponentProps(contentItem);
          if (!componentData) return null;
          
          const Component = componentData.component;
          return <Component key={index} {...componentData.props} />;
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

BodyItem.propTypes = {
  layout: PropTypes.oneOf(["column", "row"]).isRequired,
  content: PropTypes.oneOfType([
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
    PropTypes.arrayOf(
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
      })
    )
  ]).isRequired
};

export default BodyItem;
