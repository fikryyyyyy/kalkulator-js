const readline = require("readline-sync");

let ulangi = true;
let history = [];
let previousResult = null;

while (ulangi) {
    console.log("\n=== Kalkulator Sederhana ===");
    console.log("1. Kalkulasi");
    console.log("2. Lihat Riwayat");
    console.log("3. Keluar");

    const menu = readline.question("Pilih menu (1-3): ");

    switch (menu) {
        case "1":
            subMenuKalkulasi();
            break;
        case "2":
            showHistory();
            break;
        case "3":
            const confirmExit = readline.question("Apakah Anda yakin ingin keluar? (y/n): ");
            if (confirmExit.toLowerCase() === "y") {
                ulangi = false;
                console.log("Terima kasih telah menggunakan kalkulator!");
            }
            break;
        default:
            console.log("Pilihan tidak valid. Silakan coba lagi.");
            break;
    }
}

function subMenuKalkulasi() {
    console.log("\n=== Sub Menu Kalkulasi ===");
    console.log("1. Penjumlahan (+)");
    console.log("2. Pengurangan (-)");
    console.log("3. Perkalian (*)");
    console.log("4. Pembagian (/)");
    console.log("5. Modulus (%)");
    console.log("6. Akar Kuadrat (√)");
    console.log("7. Trigonometri (sin, cos, tan)");

    const kalkulasiMenu = readline.question("Pilih jenis kalkulasi (1-7): ");

    switch (kalkulasiMenu) {
        case "1":
            hitungOperasiDasar("+");
            break;
        case "2":
            hitungOperasiDasar("-");
            break;
        case "3":
            hitungOperasiDasar("*");
            break;
        case "4":
            hitungOperasiDasar("/");
            break;
        case "5":
            hitungOperasiDasar("%");
            break;
        case "6":
            hitungAkarKuadrat();
            break;
        case "7":
            hitungTrigonometri();
            break;
        default:
            console.log("Pilihan tidak valid. Kembali ke menu utama.");
            break;
    }
}

function hitungOperasiDasar(operator) {
    let angkaPertama = previousResult !== null ? previousResult : parseFloat(readline.question("Masukkan Angka Pertama: "));

    if (previousResult !== null) {
        const usePrevious = readline.question("Gunakan hasil sebelumnya? (y/n): ");
        if (usePrevious.toLowerCase() === "y") {
            angkaPertama = previousResult;
        } else {
            angkaPertama = parseFloat(readline.question("Masukkan Angka Pertama: "));
        }
    }

    let angkaKedua;

    angkaKedua = parseFloat(readline.question("Masukkan Angka Kedua: "));

    if (operator === "/" && angkaKedua === 0) {
        console.log("Angka kedua tidak boleh 0. Pembagian tidak valid.");
        return; // Kembali ke sub menu
    }

    const hasil = processHasil(angkaPertama, operator, angkaKedua);
    if (typeof hasil === "string") {
        console.log(hasil);
    } else {
        console.log(`Hasil: ${hasil}`);
        previousResult = hasil;
        history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
    }
}

function hitungAkarKuadrat() {
    const angka = parseFloat(readline.question("Masukkan angka untuk menghitung akar kuadrat: "));
    if (isNaN(angka) || angka < 0) {
        console.log("Input tidak valid. Masukkan angka non-negatif.");
    } else {
        const hasil = Math.sqrt(angka);
        console.log(`Akar kuadrat dari ${angka} adalah ${hasil}`);
        history.push(`√${angka} = ${hasil}`);
    }
}

function hitungTrigonometri() {
    const angle = parseFloat(readline.question("Masukkan sudut dalam derajat: "));
    const radians = angle * (Math.PI / 180); // Konversi derajat ke radian

    const sinValue = Math.sin(radians);
    const cosValue = Math.cos(radians);
    const tanValue = Math.tan(radians);

    console.log(`Sin(${angle}) = ${sinValue}`);
    console.log(`Cos(${angle}) = ${cosValue}`);
    console.log(`Tan(${angle}) = ${tanValue}`);
    
    history.push(`Sin(${angle}) = ${sinValue}`);
    history.push(`Cos(${angle}) = ${cosValue}`);
    history.push(`Tan(${angle}) = ${tanValue}`);
}

function processHasil(angkaPertama, operator, angkaKedua) {
    switch (operator) {
        case "+":
            return angkaPertama + angkaKedua;
        case "-":
            return angkaPertama - angkaKedua;
        case "*":
            return angkaPertama * angkaKedua;
        case "/":
            return angkaKedua !== 0 ? angkaPertama / angkaKedua : "Pembagian dengan 0 tidak diperbolehkan.";
        case "%":
            return angkaPertama % angkaKedua;
        default:
            return "Operator tidak dikenali.";
    }
}

function showHistory() {
    if (history.length === 0) {
        console.log("Tidak ada riwayat kalkulasi.");
    } else {
        history.forEach((entry, index) => {
            console.log(`${index + 1}: ${entry}`);
        });
    }
}