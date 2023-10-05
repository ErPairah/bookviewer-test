export class BookViewer {

    constructor(data, base) {
        this.base = base;
        this.search_base = 'https://openlibrary.org/search.json?isbn=';
        this.data = data;
        this.index = 0;

        this.irudia = document.getElementById("irudia");
        this.egilea = document.getElementById("egilea");
        this.izenburua = document.getElementById("izenburua");
        this.dataElem = document.getElementById("data");
        this.isbn = document.getElementById("isbn");
        this.liburuKopuru = document.getElementById("liburuKopuru");

        this.updateView();
        this.initButtons();
        
    }

    initButtons() {
        // aurrera, atzera eta bilatu botoiak hasieratu
        // bilatu botoia sakatzean, erabiltzaileak sartu duen isbn-a duen liburua lortu
        // eta handleSearchData funtzioa exekutatu
        let atzeraBotoia = document.querySelector('#atzera')
        let aurreraBotoia = document.querySelector('#aurrera')
        let bilatuBotoia = document.querySelector('#bilatu')

        atzeraBotoia.onclick=()=> {
            this.prevBook()
        }
    
        aurreraBotoia.onclick=()=>{
            this.nextBook()
        }

        bilatuBotoia.onclick=()=>{
            fetch(this.search_base + this.isbn.value).then(r => r.json()).then(this.handleSearchData);

        }

    }

    extractBookData = (book) => {
        // json objektu egoki bat bueltatu, zure webgunean erabili ahal izateko
        return {
            "isbn": this.isbn.value,
            "egilea": book.docs[0].author_name,
            "data": book.docs[0].first_publish_year,
            "izenburua": book.docs[0].title,
            "filename": book.docs[0].cover_i +"-M.jpg"
        };
      };
      
    addBookToData = (book, data) => {
        // data array-ean sartu liburua, eta liburu berriaren posizioa bueltatu
        data.push(book)
        return data.length - 1
    };

    handleSearchData = (data) => {
        // lortu liburua data objektutik
        // extractBookData eta addBookToData funtzioak erabili, indizea berria lortuz
        // updateView funtzioa erabili, liburu berria bistaratzeko
       let alda = this.extractBookData(data)
        this.index = this.addBookToData(alda, this.data)
        this.updateView()

    };

    updateView() {
        this.izenburua.value = this.data[this.index].izenburua
        this.irudia.src = this.base + this.data[this.index].filename
        this.egilea.value = this.data[this.index].egilea
        this.isbn.value = this.data[this.index].isbn
        this.dataElem.value = this.data[this.index].data
        this.liburuKopuru.innerText = this.data.length
    

   }

                   
    

    nextBook() {
        // Hurrengo indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu liburu kopurua gainditu
        if(this.index< this.data.length-1){
            this.index ++
            this.updateView()
        }
    }

    prevBook() {
        // Aurreko indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu 0 indizea gainditu
        if(this.index > 0){
            this.index--;
            this.updateView()  
              }
    }
}
