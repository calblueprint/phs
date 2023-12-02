
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import React, { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
// const createConfig = (props) => {
//     const config = {};
//     if (props.fps) {
//         config.fps = props.fps;
//     }
//     if (props.qrbox) {
//         config.qrbox = props.qrbox;
//     }
//     if (props.aspectRatio) {
//         config.aspectRatio = props.aspectRatio;
//     }
//     if (props.disableFlip !== undefined) {
//         config.disableFlip = props.disableFlip;
//     }
//     return config;
// };

/**
 *
 * @param props
 */
function Html5QrcodePlugin() {

    useEffect(() => {
        // when component mounts
        // const config = createConfig(props);
        // const { verbose, qrCodeSuccessCallback } = props;
        // const verbose = props.verbose === true;
        // const isVerbose = verbose === true
        // Suceess callback is required.
        // if (!(props.qrCodeSuccessCallback)) {
        //     throw "qrCodeSuccessCallback is required callback.";
        // }
        const html5QrcodeScanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 500,
                height: 500
            },
            fps: 5,
            // supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        }, true);
        html5QrcodeScanner.render(() => console.log('lmao'), () => { console.log('lol')});

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
}

export default Html5QrcodePlugin;