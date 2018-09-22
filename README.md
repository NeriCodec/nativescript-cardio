# Nativescript card.io

See [nativescript-cardio](https://github.com/NeriCodec/nativescript-cardio.git) for example.

card.io provides fast, easy credit card scanning in mobile apps.

## Installation

Steps:

```javascript
tns plugin add nativescript-cardio
```

## Usage 
	
```javascript
requestPermissions()
        .then(() => {


            this.cardio.onScan()
                .then((data) => {

                    console.dir(data);

                }, (error) => {

                    console.log(error);

                });

        }, (error) => {

            console.log("Permissions denied: " + error);

        });
```)
    
## License

Apache License Version 2.0, January 2004
