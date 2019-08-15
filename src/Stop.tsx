import React, { Ref } from "react";
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
  color: "red",
  position: "absolute"
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

const MIN_DISTANCE = 50;

const insertStop = (stops: Array<TStop>, stop: TStop, offset: number) => {
  const idx = stops.findIndex((value, i) => value.offset > offset);
  if (idx !== -1) {
    if (idx == 0) {
      stop.offset = stops[0].offset - MIN_DISTANCE;
      if (stop.offset < 0) stop.offset = 0;
    } else {
      stop.offset = (stops[idx - 1].offset + stops[idx].offset) / 2;
    }
    stops.splice(idx, 0, stop);
  } else {
    stop.offset = stops[stops.length - 1].offset + MIN_DISTANCE;
    stops.push(stop);
  }
  console.log("Stop positions:", stops.map(x => x.offset));
};

export const Stop: React.FC<StopProps> = ({ stop, route }) => {
  const store = useStore();
  const [{ isDragging }, drag] = useDrag({
    item: { stop, route, type: ItemTypes.BOX },
    end: (
      item: { stop: TStop; route: TRoute } | undefined,
      monitor: DragSourceMonitor
    ) => {
      const dropResult = monitor.getDropResult() as {
        route: TRoute;
        offset: { x: number; y: number };
      };
      if (item && dropResult) {
        removeItem(route.stops, stop);
        insertStop(dropResult.route.stops, stop, dropResult.offset.x);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;
  const left = stop.offset;

  return (
    <div ref={drag} style={{ ...style, opacity, left }}>
      <div>{stop.name}</div>
    </div>
  );
};
