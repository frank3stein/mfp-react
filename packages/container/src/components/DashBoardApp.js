import { mount } from "dashboard/Dashboard";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  // in order to communicate with the marketing module we pass in an object
  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
