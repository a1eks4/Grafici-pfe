var graficiDiv = document.getElementById('grafici');

    // Definiranje podataka za grafike
    var datumi = ["18.4", "19.4", "20.4", "21.4", "22.4", "23.4"];
    var sati = ["00h", "1h", "2h", "3h", "4h", "5h"];
    var podaci = [
        [4, 12, 9, 5, 0, 0],
        [0, 5, 6, 7, 8, 5],
        [0, 0, 3, 18, 5, 4],
        [0, 4, 3, 15, 6, 2],
        [0, 6, 6, 8, 8, 3],
        [2, 2, 5, 8, 10, 3]
      ];

    // Kreiranje i dodavanje grafova na stranicu
function dodajGrafik(datumi, sati, podaci) {
    var grafikDiv = document.createElement('div');
    grafikDiv.className = "grafik";
    grafikDiv.style.width = "400px"; // Povećanje širine div elementa
    grafikDiv.style.height = "270px"; // Povećanje visine div elementa
    graficiDiv.appendChild(grafikDiv);
    var naslov = document.createElement('h3');
    naslov.className = "datum";
    naslov.textContent = datumi; // Dodavanje datuma kao sadržaja naslova
    grafikDiv.appendChild(naslov);
    var canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 200;
    grafikDiv.appendChild(canvas);
  
    var context = canvas.getContext('2d');
  
    // Postavljanje parametara za grafik
    var margina = 30;
    var visinaGrafa = canvas.height - 2 * margina;
    var sirinaGrafa = canvas.width - 2 * margina;
    var korakX = sirinaGrafa / (sati.length + 1);
  
    // Pronalaženje maksimalnog broja zaspalih osoba
    var maksimalniBroj = Math.max(...podaci);
  
    // Crtanje osi i oznaka
    context.beginPath();
    context.moveTo(margina, margina);
    context.lineTo(margina, canvas.height - margina);
    context.lineTo(canvas.width - margina, canvas.height - margina);
    context.strokeStyle = '#000000';
    context.stroke();
  
    // Crtanje oznake za y osu
    context.fillStyle = '#000000';
    context.textAlign = "center";
    context.fillText("ucenici", margina - 10, margina - 10);
  
    // Crtanje oznake za x osu
    context.fillText("vreme", canvas.width - margina + 10, canvas.height - margina + 20);
  
    // Crtanje stupaca
    var korakY = visinaGrafa / maksimalniBroj;
    var x = margina + korakX;
    for (var i = 0; i < podaci.length; i++) {
      var y = canvas.height - margina - podaci[i] * korakY;
      context.fillStyle = '#0099ff';
      context.fillRect(x, y, 10, podaci[i] * korakY);
  
      // Crtanje oznaka ispod stupaca
      context.fillStyle = '#000000';
      context.fillText(sati[i], x, canvas.height - margina + 20);
  
      // Dodavanje broja zaspalih osoba iznad stupca
      context.fillText(podaci[i].toString(), x, y - 10);
  
      x += korakX;
    }
  
    // Crtanje oznaka za datume na x-osi

  }
  
  // Kreiranje svih grafika
  function crtajGrafike() {
    for (var k = 0; k < datumi.length; k++) {
      dodajGrafik(datumi[k], sati, podaci[k]);
    }
  }
  
  // Poredjaj grafike u dva reda
  function poredjajGrafike() {
    var red1 = document.createElement('div');
    var red2 = document.createElement('div');
    red1.className = "red";
    red2.className = "red";
    graficiDiv.appendChild(red1);
    graficiDiv.appendChild(red2);
  
    var grafici = document.getElementsByClassName('grafik');
    for (var i = 0; i < grafici.length; i++) {
      if (i < 3) {
        red1.appendChild(grafici[i]);
      } else {
        red2.appendChild(grafici[i]);
      }
    }
  }
  
  // Pozivanje funkcija za crtanje i pozicioniranje grafika
  crtajGrafike();
  poredjajGrafike();