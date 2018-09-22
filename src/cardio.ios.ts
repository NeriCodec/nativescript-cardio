import { Common } from './cardio.common';

import * as trace from "tns-core-modules/trace/trace";

export class Cardio extends Common {

    public onScan(): Promise<any> {

        return new Promise((resolve, reject) => {

            reject("Happy plugin");

        });
            
    }

}

export let requestPermissions = () => {

    return new Promise((resolve, reject) => {
        requestCameraPermissions().then(resolve, reject);
    });

};

let requestCameraPermissions = () => {

    return new Promise((resolve, reject) => {

        let cameraStatus = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);

        switch (cameraStatus) {

            case AVAuthorizationStatus.NotDetermined: {

                AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(AVMediaTypeVideo, (granted) => {

                    if (granted) {

                        resolve();

                    } else {

                        reject();

                    }

                });

                break;
            }
            case AVAuthorizationStatus.Authorized: {

                resolve();
                break;

            }
            case AVAuthorizationStatus.Restricted:
            case AVAuthorizationStatus.Denied: {

                if (trace.isEnabled()) {

                    trace.write("Application can not access Camera assets.", trace.categories.Debug);

                }

                reject("Not access camera");
                break;
            }
                
        }

    });

};
