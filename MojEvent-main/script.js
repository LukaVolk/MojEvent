class ZMSpletIzbiraDogodka {
  prikaziDogodke(dogodki) {
    let dogodkiTableBody = document.querySelector('#dogodki-table tbody');
    let descriptionContainer = document.querySelector('#description-container');
    descriptionContainer.innerHTML = ''; // Clear previous description

    for (let i = 0; i < dogodki.length; i++) {
      let dogodek = dogodki[i];

      let newRow = document.createElement('tr');

      let nazivCell = document.createElement('td');
      nazivCell.textContent = dogodek.naziv;
      nazivCell.classList.add('event-name');
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
      organizatorCell.textContent = dogodek.organizator;
      newRow.appendChild(organizatorCell);

      let vsaMestaCell = document.createElement('td');
      vsaMestaCell.textContent = dogodek.vsaMesta;
      newRow.appendChild(vsaMestaCell);

      let zasedenaMestaCell = document.createElement('td');
      zasedenaMestaCell.textContent = dogodek.zasedenaMesta;
      newRow.appendChild(zasedenaMestaCell);

      let rezervacijaCell = document.createElement('td');
      let kolicinaKartCell = document.createElement('input');
      kolicinaKartCell.type = 'number';
      kolicinaKartCell.min = 0;
      kolicinaKartCell.max = dogodek.vsaMesta - dogodek.zasedenaMesta; // Limit based on available tickets
      kolicinaKartCell.step = 1;
      kolicinaKartCell.value = 0;
      rezervacijaCell.appendChild(kolicinaKartCell);

      let rezervirajButton = document.createElement('button');
      rezervirajButton.textContent = 'Rezerviraj';
      rezervirajButton.classList.add('rezervirajButton');
      rezervacijaCell.appendChild(rezervirajButton);

      newRow.appendChild(rezervacijaCell);

      dogodkiTableBody.appendChild(newRow);

      // Event listener for showing the description
      nazivCell.addEventListener('click', function () {
        descriptionContainer.innerHTML = ''; // Clear previous description
        let description = document.createElement('div');
        description.innerHTML = `
          <p>${dogodek.opis}</p>
          <img src="${dogodek.slika}" alt="Event Image" class="event-image">
        `;
        descriptionContainer.appendChild(description);
      });
    }
  }

  posodobiZasedenost(kolicina, row) {
    let zasedenaMestaCell = row.querySelector('td:nth-child(7)');
    let zasedenaMesta = parseInt(zasedenaMestaCell.textContent);
    let vsaMestaCell = row.querySelector('td:nth-child(6)');
    let vsaMesta = parseInt(vsaMestaCell.textContent);
  
    if (kolicina <= 0) {
      alert('Vnesite veljavno količino kart.');
    } else if (kolicina > zasedenaMesta) {
      alert('Ni na voljo dovolj kart.');
    } else {
      zasedenaMesta -= kolicina;
      zasedenaMestaCell.textContent = zasedenaMesta;
      alert('Rezervacija neuspešna.');
    }
    
    if (kolicina > 0 && kolicina <= zasedenaMesta) {
      alert('Rezervacija uspešna.');
    }
  }
}

// Example data
let dogodki = [
{
naziv: 'Dogodek 1',
datum: '2023.06.01',
kraj: 'Ljubljana',
cena: 20,
organizator: 'Organizator 1',
vsaMesta: 100,
zasedenaMesta: 10,
opis: 'Opis dogodka 1',
slika: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg'
},
{
naziv: 'Dogodek 2',
datum: '2023.06.02',
kraj: 'Maribor',
cena: 30,
organizator: 'Organizator 2',
vsaMesta: 150,
zasedenaMesta: 20,
opis: 'Opis dogodka 2',
slika: 'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200'
},
// Add more events here...
];

let zmSpletIzbiraDogodka = new ZMSpletIzbiraDogodka();
zmSpletIzbiraDogodka.prikaziDogodke(dogodki);

let rezervirajButtons = document.querySelectorAll('.rezervirajButton');
rezervirajButtons.forEach(function (button) {
button.addEventListener('click', function () {
let row = button.parentNode.parentNode;
let kolicina = parseInt(row.querySelector('input[type="number"]').value);
zmSpletIzbiraDogodka.posodobiZasedenost(kolicina, row);
});
});