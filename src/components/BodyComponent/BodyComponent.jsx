import PropTypes from "prop-types";
import React from "react";
import { BodyComponentText } from "./BodyComponentText";
import { BodyComponentImage } from "./BodyComponentImage";
import { BodyComponentSelectedWork } from "./BodyComponentSelectedWork";
import { BodyComponentListGroup } from "./variants/BodyComponentListGroup";
import { BodyComponentCardGroup } from "./variants/BodyComponentCardGroup";

export const BodyComponent = (props) => {
  // Render the appropriate component based on property1
  switch (props.property1) {
    case "text":
      return <BodyComponentText {...props} />;
    case "image":
      return <BodyComponentImage {...props} />;
    case "selected-work":
      return <BodyComponentSelectedWork {...props} />;
    case "list-group":
      return <BodyComponentListGroup {...props} />;
    case "card-group":
      return <BodyComponentCardGroup {...props} />;
    default:
      return null;
  }
};

BodyComponent.propTypes = {
  property1: PropTypes.oneOf([
    "text",
    "image",
    "selected-work",
    "list-group",
    "card-group"
  ]),
  className: PropTypes.string,
  frameClassName: PropTypes.string,
  frameClassNameOverride: PropTypes.string
};
