import React, { useEffect, useState } from 'react'

function ResponsiveUIIndicator() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const variants = {
    container: `w-full`,
    background: `
      w-full text-white py-2 px-5 rounded-3xl
      bg-cyan-500
      sm:bg-cyan-800
      md:bg-gray-600
      lg:bg-yellow-500
      xl:bg-orange-500
      2xl:bg-red-700
    `,
    text: `flex justify-center text-l`,
  }

  let text = ""
  if (viewportWidth >= 1536) {
    text = "2xl"
  } else if (viewportWidth >= 1280) {
    text = "xl"
  } else if (viewportWidth >= 1024) {
    text = "lg"
  } else if (viewportWidth >= 768) {
    text = "md"
  } else if (viewportWidth >= 640) {
    text = "sm"
  } else {
    text = ""
  } 

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={variants.container}>
      <div>ResponsiveUIIndicator</div>
      <div className={variants.background}>
        <p className={variants.text}>Size: {viewportWidth}px ('{text}')</p>
      </div>
    </div>
  )
}

export default ResponsiveUIIndicator