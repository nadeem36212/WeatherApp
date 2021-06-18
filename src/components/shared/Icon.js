import React from "react";
import FAIcon from "react-native-vector-icons/FontAwesome";
import * as images from "@ImagesNew";

const Icon = (props) => {
  const { name, type, color, size = 15, style } = props;

  const renderFAIcon = () => {
    return <FAIcon {...props} />;
  };

  const renderLocalIcon = () => {
    let LocalIcon = images[name];
    return (
      <LocalIcon style={[{ color: color }, style]} width={size} height={size} />
    );
  };

  return type === "fa" ? renderFAIcon() : renderLocalIcon();
};

export default Icon;
