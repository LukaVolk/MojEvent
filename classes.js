class ZMSpletIzbiraDogodka{


    prikaziDogodke(dogodki){
        console.log(dogodki);
        // Get the table body element
        let dogodkiTableBody = document.querySelector('#dogodki-table tbody');

        // Loop through the dogodki array and create a row for each element
        for (let i = 0; i < dogodki.length; i++) {
            let dogodek = dogodki[i];
            
            let newRow = document.createElement('tr');
            
            let nazivCell = document.createElement('td');
            nazivCell.textContent = dogodek.naziv;
            newRow.appendChild(nazivCell);
            
            let datumCell = document.createElement('td');
            datumCell.textContent = dogodek.datum;
            newRow.appendChild(datumCell);
            
            let krajCell = document.createElement('td');
            krajCell.textContent = dogodek.kraj;
            newRow.appendChild(krajCell);
            
            let cenaKarteCell = document.createElement('td');
            cenaKarteCell.textContent = dogodek.cena;
            newRow.appendChild(cenaKarteCell);
            
            let organizatorCell = document.createElement('td');
            organizatorCell.textContent = dogodek.organizator.ime;
            newRow.appendChild(organizatorCell);
            
            let vsaMestaCell = document.createElement('td');
            vsaMestaCell.textContent = dogodek.vsaMesta;
            newRow.appendChild(vsaMestaCell);
            
            let zasedenaMestaCell = document.createElement('td');
            zasedenaMestaCell.textContent = dogodek.zasedenaMesta;
            newRow.appendChild(zasedenaMestaCell);

            let kolicinaKartCell = document.createElement('input');
            kolicinaKartCell.type = "number";
            kolicinaKartCell.min = 0;
            kolicinaKartCell.max = 10;
            kolicinaKartCell.step = 1;
            kolicinaKartCell.value = 0;
            newRow.appendChild(kolicinaKartCell);

            let rezervirajCell = document.createElement('button');
            rezervirajCell.textContent = "Rezerviraj";
            rezervirajCell.classList.add("rezervirajButton");
            newRow.appendChild(rezervirajCell);

            
            // Append the row to the table body
            dogodkiTableBody.appendChild(newRow);
        }

        
    }

    posodobiZasedenost(kolicina, row){
        console.log(kolicina, row);
        const cells = row.getElementsByTagName('td');
        const zasedenaMesta = parseInt(cells[6].textContent) + kolicina; // zero-based indexing

        console.log(dogodki[row.rowIndex - 1].zasedenaMesta);
        dogodki[row.rowIndex - 1].zasedenaMesta = zasedenaMesta;
        cells[6].textContent = zasedenaMesta;


    }
}

class KRezervacijaDogodka {    
    buttonListener(){
        
    }
    
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

    addDogodek(dogodek) {
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
  
    
}

class Dogodek {
    constructor(naziv, datum, kraj, cena, organizator, vsaMesta, zasedenaMesta) {
        this.naziv = naziv;
        this.datum = datum;
        this.kraj = kraj;
        this.cena = cena;
        this.organizator = organizator;
        this.vsaMesta = vsaMesta;
        this.zasedenaMesta = zasedenaMesta;
    }

}

let organizatorji = [];
let dogodki = [];
let uporabniki = [];
let racuni = [];
  
let organizator = new Organizator("John Doe");
let dogodek = new Dogodek("Skisova trznica", "2023-06-01", "Ljubljana", 20, organizator, 100, 95);
let dogodek1 = new Dogodek("Koncert", "2023-06-01", "Ljubljana", 20, organizator, 100, 20);
let dogodek2 = new Dogodek("Festival", "2023-07-15", "Maribor", 50, organizator, 500, 100);
let dogodek3 = new Dogodek("Gledališka predstava", "2023-09-03", "Celje", 15, organizator, 200, 50);
dogodki.push(dogodek);
dogodki.push(dogodek1);
dogodki.push(dogodek2);
dogodki.push(dogodek3);
console.log(dogodki);
let uporabnik = new Uporabnik("Jane Smith", "jane@example.com");
let rezervacija = new KRezervacijaDogodka();


let maska = new ZMSpletIzbiraDogodka();

document.addEventListener("DOMContentLoaded", function() {
    
    maska.prikaziDogodke(dogodki);
    const buttons = document.querySelectorAll('.rezervirajButton');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
        
        const row = button.parentNode;
        let inputField = row.querySelector('input');
        let kolicina = parseInt(inputField.value);
        const rowIndex = row.rowIndex - 1;

        let zasedenost = rezervacija.statusRezervacije(kolicina, dogodki[rowIndex].vsaMesta, dogodki[rowIndex].zasedenaMesta);
        console.log(zasedenost);
        if (zasedenost == true){
            let cena = rezervacija.izracunCene(dogodki[rowIndex].cena, kolicina);
            let racun = new Racun(uporabnik, dogodki[rowIndex], kolicina, cena);
            maska.posodobiZasedenost(kolicina, row);
            alert(`Račun za ${cena}€ poslan na mail`);
            uporabnik.dodajRacun(racun); // preveri kdo je prijavljen
        }
        else if(zasedenost == false){
            alert("Za ta dogodek žal ni več na voljo toliko kart.");
        }
        else{
            alert("Vnesi število kart, ki jih želiš rezervirati.");
        }
           
        console.log(`Button clicked on row ${rowIndex}, ${kolicina}`);
        });
    });
    
});


