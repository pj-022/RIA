import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Alert(){

  return (
    <div>
      <ToastContainer
        position= "bottom-right"
        pauseOnHover= {false}
        pauseOnFocusLoss= {false}
        transition={Slide}
        autoClose={3000}
      />
    </div>
  );
}
export default Alert