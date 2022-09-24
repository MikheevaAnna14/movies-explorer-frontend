import React, { useState } from 'react';

// function getWindowDimensions() {
//   const width = window.innerWidth;
//   // const { innerWidth: width, innerHeight: height } = window;
//   // return {
//   //   width,
//   //   height
//   // };
// }
export default function useWindowDimensions() {
  const width = window.innerWidth;
  const [windowDimensions, setWindowDimensions] = useState(width);

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(width);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //   }
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);
  return windowDimensions;
}