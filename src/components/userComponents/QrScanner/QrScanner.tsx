
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import React, { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

/**
 *
 * @param root0
 * @param root0.setScanResult
 * @param root0.updateScanResult
 * @returns qr scanner 
 */
function Html5QrcodePlugin() {
    useEffect(() => {

        const videoConstraints = {
            facingMode: "environment"
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
        html5QrcodeScanner.render(() => {}, () => {});
        return () => {
            html5QrcodeScanner.clear().catch(error => {});
        };
    }, []);

    return (
        <div id='reader'/>
    );
}

export default Html5QrcodePlugin;