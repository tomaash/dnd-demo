import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { TRoute } from "./createStore";

const style: React.CSSProperties = {
  height: "4rem",
  width: "32rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal"
};

type RouteCompProps = {
  route: TRoute;
};

export const RouteComp: React.FC<RouteCompProps> = ({ children, route }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ route }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {children}
    </div>
  );
};
