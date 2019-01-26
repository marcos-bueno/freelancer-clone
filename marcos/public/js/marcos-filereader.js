class MarcosFileReader {

    constructor(inputEl, imgEl){

        this.inputEl = inputEl;
        this.imgEl = imgEl;

        this.initInputEvent();
    }

    initInputEvent(){

        document.querySelector(this.inputEl).addEventListener("change", e => {

            this.reader(e.target.files[0]).then(result =>{

                document.querySelector(this.imgEl).src = result;

            });

        });
    }

    reader(file){

        return new Promise((resolve, reject) => {

            let reader = new FileReader();

            reader.onload = function() {

                resolve(reader.result);

            }

            reader.onerror = function() {

                reject("Não foi possivel ler a imagem.");
            }

            reader.readAsDataURL(file);

        });

    }
}