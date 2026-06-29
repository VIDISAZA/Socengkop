// Data Rantai Pasok (Supply Chain)
const supplyChain = [
    {
        id: 1,
        productName: "Beras Organik Sumberejo",
        producer: "Kelompok Tani Sumberejo I",
        quantity: "500 kg",
        status: "koperasi", // petani | koperasi | pasar
        lastUpdate: "2026-06-29T10:00:00Z",
        steps: [
            { stage: "Petani", label: "Panen & Pengeringan selesai oleh Kelompok Tani", date: "2026-06-27T08:00:00Z", completed: true },
            { stage: "Koperasi", label: "Pengemasan & Quality Control di Koperasi Desa", date: "2026-06-29T10:00:00Z", completed: true },
            { stage: "Pasar", label: "Distribusi ke Warung Anggota & Toko Koperasi", date: "-", completed: false }
        ]
    },
    {
        id: 2,
        productName: "Gula Kelapa Murni",
        producer: "PKK Dusun Sendang",
        quantity: "150 kg",
        status: "pasar", // petani | koperasi | pasar
        lastUpdate: "2026-06-29T08:30:00Z",
        steps: [
            { stage: "Petani", label: "Penyadapan nira oleh penderes kelapa", date: "2026-06-25T07:00:00Z", completed: true },
            { stage: "Koperasi", label: "Pengolahan gula kelapa kristal selesai", date: "2026-06-26T14:00:00Z", completed: true },
            { stage: "Pasar", label: "Tersedia & terjual di pasar digital/toko fisik", date: "2026-06-29T08:30:00Z", completed: true }
        ]
    },
    {
        id: 3,
        productName: "Kopi Arabika Merapi",
        producer: "Koperasi Tani Merapi",
        quantity: "200 bungkus",
        status: "petani", // petani | koperasi | pasar
        lastUpdate: "2026-06-28T16:00:00Z",
        steps: [
            { stage: "Petani", label: "Pemetikan buah merah (Roasting check)", date: "2026-06-28T16:00:00Z", completed: true },
            { stage: "Koperasi", label: "Proses hulling & pemilahan green beans", date: "-", completed: false },
            { stage: "Pasar", label: "Siap didistribusikan ke Kopi Shop lokal", date: "-", completed: false }
        ]
    }
];

module.exports = supplyChain;
