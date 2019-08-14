import React from "react";
import { RouteComp } from "./RouteComp";
import { Stop } from "./Stop";
import { observer } from "mobx-react";
import { useStore } from "./store";

export const Example: React.FC = observer(({ children }) => {
  const store = useStore();
  return (
    <div>
      {store.routes.map(r => (
        <RouteComp key={r.id} route={r}>
          {r.stops.map(s => (
            <Stop key={s.name} stop={s} route={r} />
          ))}
        </RouteComp>
      ))}
      {/* <div style={{ overflow: "hidden", clear: "both" }}> */}
      {/* <Dustbin>
          <Box name="Glass" />
          <Box name="Banana" />
          <Box name="Paper" />
        </Dustbin>
        <Dustbin>
          <Box name="Glass" />
          <Box name="Banana" />
          <Box name="Paper" />
        </Dustbin>
      </div> */}
      {/* // <div style={{ overflow: "hidden", clear: "both" }} /> */}
    </div>
  );
});
