import { Observable } from 'tns-core-modules/data/observable';
import { Cardio, requestPermissions } from 'nativescript-cardio';

export class HelloWorldModel extends Observable {

    private cardio: Cardio;

    constructor() {

        super();
        this.cardio = new Cardio();

    }

    public onScanPress() {

        requestPermissions()
            .then(() => {


                this.cardio.onScan()
                    .then((data) => {

                        console.dir(data);

                    }, (error) => {

                        console.log(error);

                    });

            }, () => {

                console.log("permissions denied");

            });
    }
}
