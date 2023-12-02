'use client';

import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import NavBar from '../../components/userComponents/navBar/navBar';
import QrScanner from "../../components/userComponents/QrScanner/QrScanner"
// Define the App component
/**
 *
 */
function App() {
  const onNewScanResult = (decodedText, decodedResult) => {
    // handle decoded results here
    console.log(decodedText, decodedResult);
};

//   const [scanResult, setScanResult] = useState(null);

//   const config = {
//     fps: 10,
//     qrbox: {width: 100, height: 100},
//     rememberLastUsedCamera: true,
//     supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
//   };

//   useEffect(() => {
//     // Create a new Html5QrcodeScanner instance
//     const scanner = new Html5QrcodeScanner('reader', {
//       qrbox: {
//         width: 250,
//         height: 250,
//       },
//       fps: 5,
//     });
//     // Define the success callback function
//     /**
//      *
//      * @param result
//      */
//     function success(result) {
//       scanner.clear();
//       setScanResult(result);
//     }
//     // Define the error callback function
//     /**
//      *
//      * @param err
//      */
//     function error(err) {
//       console.warn(err);
//     }
//     scanner.render(success, error);
//     // Cleanup function
//     return () => {
//       scanner.clear();
//     };
//   }, []); 
  return (
    <div style={{ backgroundColor: '#FFFDF7', height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '19px' }}>
        <h1 className="pt-[61px] text-[#3B3B3B] text-[32px] font-Lato">
          QR Learning Exhibits
        </h1>
        <p className="pt-[31px] text-[16.5px] text-[#3B3B3B] font-Lato text-base font-normal">
          Saratoga is home to an abundance of plant and animal life. As you
          explore these exhibits, you will learn about species that are
          endangered and being carefully monitored by scientists with protective
          efforts in place. We welcome you to learn more about these important
          plants and animals throughout the exhibits by utilizing our QR codes
          on each sign that has a fun fact about a species.
        </p>
      </div>
{/* <div className="p-[19px]"> */}

<QrScanner />

{/* {scanResult
      ? <div>Successful Scan!</div>
      : <div id="reader" />} */}
{/* </div> */}
    </div>
  );
}
export default App;