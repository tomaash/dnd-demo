import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { TStop, TRoute } from "./createStore";
import { useStore } from "./store";

const style: React.CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
  color: "red"
};

interface StopProps {
  stop: TStop;
  route: TRoute;
}

const removeItem = (arr, item) => {
  var index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

export const Stop: React.FC<StopProps> = ({ stop, route }) => {
  const store = useStore();
  const [{ isDragging }, drag] = useDrag({
    item: { stop, route, type: ItemTypes.BOX },
    end: (
      item: { stop: TStop; route: TRoute } | undefined,
      monitor: DragSourceMonitor
    ) => {
      const dropResult = monitor.getDropResult() as { route: TRoute };
      if (item && dropResult) {
        dropResult.route.stops.push(stop);
        removeItem(route.stops, stop);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {stop.name}
    </div>
  );
};
