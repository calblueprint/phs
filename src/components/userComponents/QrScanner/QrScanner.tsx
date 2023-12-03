
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { StateManagerProxy } from 'html5-qrcode/esm/state-manager';
import React, { Dispatch, SetStateAction, useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// {updateScanResult} : {updateScanResult: Dispatch<SetStateAction<any>>}


/**
 *
 * @param root0
 * @param root0.setScanResult
 * @param root0.updateScanResult
 * @returns qr scanner 
 */
function Html5QrcodePlugin() {

    // const handleResult = (decodedText, decodedResult) => {
    //     updateScanResult(decodedResult)
    //     console.log(decodedText, decodedResult)
    // };
    useEffect(() => {

        const videoConstraints = {
            facingMode: "environment" // Use ':environment' for rear camera, 'user' for front camera
        };

        const html5QrcodeScanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 500,
                height: 500
            },
            fps: 5,
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            videoConstraints
        }, false);
        html5QrcodeScanner.render(() => console.log('bruh'), () => { console.log('lol')});
        // html5QrcodeScanner.applyVideoConstraints();
        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div id='reader' />
    );
}

export default Html5QrcodePlugin;