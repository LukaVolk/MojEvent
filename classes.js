class ZMSpletIzbiraDogodka{


    prikaziDogodke(dogodki){
        console.log(dogodki);
        let dogodkiDiv = document.querySelector('#dogodki-div');

        // Loop through the dogodki array and create a row for each element
        for (let i = 0; i < dogodki.length; i++) {
            let dogodek = dogodki[i];
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add(i);

            // create the image element
            const img = document.createElement('img');
            img.src = dogodek.slika;
            img.alt = dogodek.naziv;

            // create the content element
            const content = document.createElement('div');
            content.classList.add('content');

            // create the title element
            const title = document.createElement('h2');
            title.textContent = dogodek.naziv;

            // create the date element
            const date = document.createElement('p');
            date.textContent = `Datum: ${dogodek.datum}`;

            // create the city element
            const city = document.createElement('p');
            city.textContent = `Kraj dogodka: ${dogodek.kraj}`;

            // create the price element
            const price = document.createElement('p');
            price.textContent = `Cena: ${dogodek.cena} €`;

            // create the organiser element
            const organiser = document.createElement('p');
            organiser.textContent = `Organizator: ${dogodek.organizator.ime} ${dogodek.organizator.priimek}`;

            // create the tickets element
            const tickets = document.createElement('p');
            console.log(dogodek.vsaMesta, dogodek.zasedenaMesta);
            tickets.textContent = `Proste vstopnice: ${dogodek.vsaMesta-dogodek.zasedenaMesta} / ${dogodek.vsaMesta}`;
            tickets.classList.add("stMest");
            // create the input element
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.max = 10;

            // create the button element
            const button = document.createElement('button');
            button.textContent = 'Rezerviraj';
            button.classList.add("rezervirajButton");
            

            // append the elements to the card element
            content.appendChild(title);
            content.appendChild(date);
            content.appendChild(city);
            content.appendChild(price);
            content.appendChild(organiser);
            content.appendChild(tickets);
            content.appendChild(input);
            content.appendChild(button);
            card.appendChild(img);
            card.appendChild(content);


            // append the card element to the container element
            dogodkiDiv.appendChild(card);
            
        }

        
    }

    posodobiZasedenost(kolicina, indeks, row){
        console.log(kolicina, indeks);
        dogodki[indeks].zasedenaMesta += kolicina;
        row.querySelector('.stMest').textContent = `Proste vstopnice: ${dogodki[indeks].vsaMesta-dogodki[indeks].zasedenaMesta} / ${dogodki[indeks].vsaMesta}`;
        

    }
}

class KRezervacijaDogodka {    

    izracunCene(cena, kolicina){
        return cena*kolicina;
    }
    statusRezervacije(kolicina, vsaMesta, zasedenaMesta){
        console.log(vsaMesta, kolicina, zasedenaMesta);

        if(vsaMesta >= kolicina+zasedenaMesta && kolicina != 0){
            console.log("prosto");
            return true;
        }
        else if (vsaMesta < kolicina+zasedenaMesta){
            console.log("zasedeno");
            return false;
        }
    }
}

class SVPosiljanjeRacuna_SIM{
    posljiRacun(){
        console.log("Racun poslan.")
    }
}

class Organizator {
    constructor(ime, priimek, email) {
      this.ime = ime;
      this.priimek = priimek;
      this.email = email;
      this.dogodki = [];
    }

    vrniDogodke(){
        return this.dogodki;
    }

    vrniIme(){
        return this.ime;
    }

    dodajDogodek(dogodek) {
        this.dogodki.push(dogodek);
    }
}
  

  
class Racun {
    constructor(uporabnik, dogodek, kolicina, cena) {
        this.uporabnik = uporabnik;
        this.dogodek = dogodek;
        this.kolicina = kolicina;
        this.organizator = organizator;
        this.cena = 0;
    }    
    vrniCeno(){
        return this.cena;
    }
}
  
class Uporabnik {
    constructor(ime, priimek, geslo, email, naslov) {
      this.ime = ime;
      this.priimek = priimek;
      this.geslo = geslo;
      this.email = email;
      this.naslov = naslov;
      this.racuni = [];
    }

    dodajRacun(racun){
        this.racuni.push(racun);
    }

    vrniIme(){
        return this.ime;
    }

    vrniEmail(){
        return this.email;
    }
  
    
}

class Dogodek {
    constructor(slika, naziv, datum, kraj, cena, organizator, vsaMesta, zasedenaMesta) {
        this.slika = slika;
        this.naziv = naziv;
        this.datum = datum;
        this.kraj = kraj;
        this.cena = cena;
        this.organizator = organizator;
        this.vsaMesta = vsaMesta;
        this.zasedenaMesta = zasedenaMesta;
    }
    vrniCeno(){
        return this.cena;
    }
    vrniZasedenaMesta(){
        return this.zasedenaMesta;
    }
    vrniVsaMesta(){
        return this.vsaMesta;
    }

}

let organizatorji = [];
let dogodki = [];
let uporabniki = [];
let racuni = [];
  
let organizator = new Organizator("Testni", "Organizator", "test@gmail.com");
let organizator1 = new Organizator("Damjan", "Fujs", "damjan.fujs@gmail.com");
let dogodek = new Dogodek("slike/skisova.jpg", "Skisova trznica", "2023-06-01", "Ljubljana", 20, organizator, 100, 95);
let dogodek1 = new Dogodek("slike/sidd.jpg", "Koncert", "2023-06-01", "Ljubljana", 20, organizator, 100, 20);
let dogodek2 = new Dogodek("slike/cvetka.jpg", "Festival", "2023-07-15", "Maribor", 50, organizator, 500, 100);
let dogodek3 = new Dogodek("slike/ickoti.jpeg", "Gledališka predstava", "2023-09-03", "Celje", 15, organizator, 200, 50);
let dogodek4 = new Dogodek("slike/cirkus.jpg", "Študentski žur", "2023-09-03", "Ljubljana", 5, organizator, 200, 198);
let dogodek5 = new Dogodek("slike/ris.png", "Najboljše vaje", "2023-09-03", "Ljubljana", 0, organizator1, 1000, 1000);
dogodki.push(dogodek);
dogodki.push(dogodek1);
dogodki.push(dogodek2);
dogodki.push(dogodek3);
dogodki.push(dogodek4);
dogodki.push(dogodek5);
let uporabnik = new Uporabnik("Luka", "Volk", "Geslo123", "luka.volk@gmail.com", "1000 Ljubljana", "");
let rezervacija = new KRezervacijaDogodka();


let maska = new ZMSpletIzbiraDogodka();

document.addEventListener("DOMContentLoaded", function() {
    
    maska.prikaziDogodke(dogodki);
    const buttons = document.querySelectorAll('.rezervirajButton');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
        var row = button.parentNode.parentNode;
    
        indeks = row.classList[1];
        let inputField = row.querySelector('input');
        let kolicina = parseInt(inputField.value);
        console.log(dogodki[indeks].vsaMesta);

        let zasedenost = rezervacija.statusRezervacije(kolicina, dogodki[indeks].vsaMesta, dogodki[indeks].zasedenaMesta);
        console.log(zasedenost);
        if (zasedenost == true){
            let cena = rezervacija.izracunCene(dogodki[indeks].cena, kolicina);
            let racun = new Racun(uporabnik, dogodki[indeks], kolicina, cena);
            console.log(racun);
            maska.posodobiZasedenost(kolicina, indeks, row);
            alert(`Račun za ${cena}€ poslan na mail: ${uporabnik.email}`);
            uporabnik.dodajRacun(racun); // preveri kdo je prijavljen
        }
        else if(zasedenost == false){
            alert("Za ta dogodek žal ni več na voljo toliko kart.");
        }
        else{
            alert("Vnesi število kart, ki jih želiš rezervirati.");
        }
        row.querySelector('input').value = "";   
        });
    });
    
});


