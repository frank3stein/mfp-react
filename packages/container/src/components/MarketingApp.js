import { mount } from "marketing/Marketing";
import React, { useRef, useEffect } from "react";
// we need the history object to update the it manually
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  // in order to communicate with the marketing module we pass in an object
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // location object has a pathname property, we will rename it while destructuring
      onNavigate: ({ pathname: nextPathname }) => {
        console.log(
          "The container noticed Navigation in Marketing",
          nextPathname
        );
        history.push(nextPathname);
      },
    });

    // We need to listen for the changes and call the onParentNavigate
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
