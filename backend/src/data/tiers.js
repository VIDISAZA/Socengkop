// Data Jenjang Keanggotaan (The Local Heroes League)
const tiers = [
    {
        level: 1,
        name: "Pandu Srawung",
        shortName: "Pandu",
        description: "Perintis & Seni Membaur",
        philosophy: "Pandu (Perintis/Penunjuk) & Srawung (Seni membaur/bersosialisasi)",
        minPoints: 0,
        maxPoints: 1999,
        multiplier: 1.0,
        badgeColor: "#4CAF50",
        badgeIcon: "🌱",
        criteria: [
            "Melengkapi profil akun",
            "Belanja konsisten di bulan pertama",
            "Menghadiri RAT digital"
        ],
        perks: [
            "Akses dasar koperasi",
            "Poin standar 1.0×",
            "Dapat mengikuti misi harian"
        ],
        nextTier: "Agra Satria",
        nextTierPoints: 2000
    },
    {
        level: 2,
        name: "Agra Satria",
        shortName: "Satria",
        description: "Puncak & Ksatria Pembela Kemakmuran",
        philosophy: "Agra (Puncak tertinggi) & Satria (Ksatria pembela kemakmuran warga)",
        minPoints: 2000,
        maxPoints: 4999,
        multiplier: 1.4,
        badgeColor: "#FFC107",
        badgeIcon: "⚔️",
        criteria: [
            "Menjaga streak belanja mingguan",
            "Sukses menjalankan afiliasi tingkat regional"
        ],
        perks: [
            "Booster poin 1.4×",
            "Akses promo khusus",
            "Prioritas pelayanan",
            "Dapat misi khusus"
        ],
        nextTier: "Kamadeva Widya",
        nextTierPoints: 5000
    },
    {
        level: 3,
        name: "Kamadeva Widya",
        shortName: "Kamadeva",
        description: "Simbol Cinta & Kebijaksanaan",
        philosophy: "Kamadeva (Simbol cinta/keharmonisan komunal), Widya (Kebijaksanaan), Narpati (Pemimpin kemakmuran)",
        minPoints: 5000,
        maxPoints: Infinity,
        multiplier: 2.0,
        badgeColor: "#F44336",
        badgeIcon: "👑",
        criteria: [
            "Menembus kuota penjualan komoditas desa ke pasar nasional",
            "Penggerak digitalisasi masif"
        ],
        perks: [
            "Super booster 2.0×",
            "Hak prioritas aspirasi Rapat Pusat",
            "Penghargaan tahunan",
            "Mentor anggota baru",
            "Akses eksklusif ke program afiliasi"
        ],
        nextTier: null,
        nextTierPoints: null
    }
];

module.exports = tiers;
