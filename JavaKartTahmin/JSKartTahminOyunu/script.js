const icerikler = [
    { id: 1, src: "resimler/resim1.jpg" },
    { id: 2, src: "resimler/resim2.jpg" },
    { id: 3, src: "resimler/resim8.webp" },
    { id: 4, src: "resimler/resim8.webp" },
    { id: 5, src: "resimler/resim4.png" },
    { id: 6, src: "resimler/resim7.webp" },
    { id: 7, src: "resimler/resim3.webp" },
    { id: 8, src: "resimler/resim6.webp" },
    { id: 9, src: "resimler/resim2.jpg" },
    { id: 10, src: "resimler/resim5.jpg" },
    { id: 11, src: "resimler/resim7.webp" },
    { id: 12, src: "resimler/resim4.png" },
    { id: 13, src: "resimler/resim6.webp" },
    { id: 14, src: "resimler/resim5.jpg" },
    { id: 15, src: "resimler/resim1jpg" },
    { id: 16, src: "resimler/resim3.webp" }
];
const kapsayici = document.getElementById("container");
        const btnBasla = document.getElementById("startButton");
        let acikKartlar = [];
        let bekleyenKartlar = [];
        let eslesmeSayisi = 0;

        btnBasla.addEventListener("click", () => {
            btnBasla.style.display = "none";
            kartOlustur();
        });

        function kartOlustur() {
            karistir(icerikler);
            icerikler.forEach((icerik) => {
                const kart = document.createElement("div");
                kart.innerHTML = "?";
                kart.className = "card";
                kart.dataset.id = icerik.id;
                kart.dataset.src = icerik.src;
                kart.style.backgroundImage = "none"; // Resmi göstermemek için
                kapsayici.appendChild(kart);
                kart.addEventListener("click", kartAc);
            });
        }

        function kartAc() {
            if (acikKartlar.length < 2 && !acikKartlar.includes(this) && !bekleyenKartlar.includes(this)) {
                this.style.backgroundImage = `url('${this.dataset.src}')`; // Resmi açmak için
                acikKartlar.push(this);

                if (acikKartlar.length === 2) {
                    setTimeout(kontrolEt, 500);
                }
            } else if (acikKartlar.length === 2) {
                bekleyenKartlar.push(acikKartlar[0], acikKartlar[1]);
                setTimeout(() => {
                    bekleyenKartlar.forEach((kart) => {
                        kart.innerHTML = "?";
                        kart.style.backgroundImage = "none"; // Resmi kapatmak için
                    });
                    acikKartlar = [];
                    bekleyenKartlar = [];
                }, 500);
            }
        }

        function kontrolEt() {
            const [kart1, kart2] = acikKartlar;
        
            if (kart1.dataset.src === kart2.dataset.src) {
                kart1.classList.add("matched");
                kart2.classList.add("matched");
                eslesmeSayisi++;
        
                if (eslesmeSayisi === icerikler.length / 2) {
                    oyunuKontrolEt();
                }
                acikKartlar = [];
            } else {
                setTimeout(() => {
                    kart1.innerHTML = "?";
                    kart2.innerHTML = "?";
                    kart1.style.backgroundImage = "none";
                    kart2.style.backgroundImage = "none";
                    acikKartlar = [];
                    bekleyenKartlar = [];
                }, 250);
            }
        }

        function oyunuKontrolEt() {
            alert("Oyun bitti!");
        }

        function karistir(icerikler) {
            for (let i = icerikler.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [icerikler[i], icerikler[j]] = [icerikler[j], icerikler[i]];
            }
        }