import React from "react";
import '../../Styles/Loading.css'
function Loading() {
  return (
    <>
      <div className="loader">
        <div className="light"></div>
        <div className="black_overlay"></div>
      </div>
    </>
  );
}

export default Loading;
