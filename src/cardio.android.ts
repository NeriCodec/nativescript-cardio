import { Common } from './cardio.common';

import * as app from "tns-core-modules/application";
import * as permissions from "nativescript-permissions";

declare var io: any;

export class Cardio {

    public onScan(): Promise<any> {

        return new Promise((resolve, reject) => {


            this.checkPermissions(reject);

            let activity = app.android.foregroundActivity || app.android.startActivity;

            try {

                var scanIntent = new android.content.Intent(activity, io.card.payment.CardIOActivity.class);
                // customize these values to suit your needs.
                scanIntent.putExtra(io.card.payment.CardIOActivity.EXTRA_REQUIRE_EXPIRY, true);
                scanIntent.putExtra(io.card.payment.CardIOActivity.EXTRA_REQUIRE_CVV, false);
                scanIntent.putExtra(io.card.payment.CardIOActivity.EXTRA_REQUIRE_POSTAL_CODE, false);

                activity.startActivityForResult(scanIntent, 1777);

            } catch (error) {

                reject(error);

            }


            try {

                activity.onActivityResult = (requestCode, resultCode, data) => {

                    if (requestCode == 1777) {

                        var cardInfo = {};
                        let expiration = null;
                        let cvv = null;
                        let postalCode = null;

                        if (data != null && data.hasExtra(io.card.payment.CardIOActivity.EXTRA_SCAN_RESULT)) {

                            var scanResult = data.getParcelableExtra(io.card.payment.CardIOActivity.EXTRA_SCAN_RESULT);

                            if (scanResult.isExpiryValid()) {

                                expiration = scanResult.expiryMonth + "/" + scanResult.expiryYear;

                            }

                            if (scanResult.cvv != null) {

                                cvv = scanResult.cvv.length();

                            }

                            if (scanResult.postalCode != null) {

                                postalCode = scanResult.postalCode;

                            }

                            cardInfo = {
                                "card-number": scanResult.getFormattedCardNumber(),
                                "card-number-hidden": scanResult.getRedactedCardNumber(),
                                "expiration": expiration,
                                "cvv": cvv,
                                "postalCode": postalCode
                            };

                        } else {

                            cardInfo = {
                                "error": "Scan was canceled."
                            };

                        }

                        resolve(cardInfo);
                    }

                    reject("other activity results");

                }

            } catch (error) {

                reject(error);

            }

        });

    }

    public checkPermissions(reject) {

        if ((<any>android.support.v4.content.ContextCompat).checkSelfPermission(
            app.android.currentContext,
            (<any>android).Manifest.permission.CAMERA) !== android.content.pm.PackageManager.PERMISSION_GRANTED) {

            reject(new Error("Application does not have permissions to use Camera"));

        }

    }

}

export let requestPermissions = function () {

    return permissions.requestPermissions([
        (<any>android).Manifest.permission.WRITE_EXTERNAL_STORAGE,
        (<any>android).Manifest.permission.CAMERA
    ]);

};