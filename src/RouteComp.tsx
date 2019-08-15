import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { TRoute } from "./createStore";

const style: React.CSSProperties = {
  height: "4rem",
  width: "32rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  marginLeft: "10rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  position: "relative"
};

type RouteCompProps = {
  route: TRoute;
};

export const RouteComp: React.FC<RouteCompProps> = ({ children, route }) => {
  let dropTarget: HTMLElement;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => {
      // end cursor position
      const clientOffset = monitor.getClientOffset();
      // initial drag cursor position
      const initialClientOffset = monitor.getInitialClientOffset();
      // initial drag element position
      const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
      const dropRect = dropTarget.getBoundingClientRect();
      // The difference between initial cursor and initial element position
      // is subtracted from end cursor position to get end element position
      const offset = {
        x:
          clientOffset.x -
          initialClientOffset.x +
          initialSourceClientOffset.x -
          dropRect.left,
        y:
          clientOffset.y -
          initialClientOffset.y +
          initialSourceClientOffset.y -
          dropRect.top
      };

      return { route, offset };
    },
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

  const fwdRef = ref => {
    dropTarget = ref;
    drop(ref);
  };

  return (
    <div ref={fwdRef} style={{ ...style, backgroundColor }}>
      <div>{children}</div>
    </div>
  );
};
