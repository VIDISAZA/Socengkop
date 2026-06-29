// Data Misi / Tantangan Gamifikasi
const missions = [
    {
        id: 1,
        title: "🛒 Belanja Sembako",
        description: "Belanja kebutuhan pokok minimal Rp50.000 di koperasi",
        reward: 50,
        icon: "shopping_bag",
        category: "daily",
        isActive: true,
        target: 50000,
        unit: "rupiah"
    },
    {
        id: 2,
        title: "📢 Ajak Tetangga",
        description: "Ajak 1 tetangga untuk bergabung menjadi anggota koperasi (via referral code)",
        reward: 100,
        icon: "group_add",
        category: "social",
        isActive: true,
        target: 1,
        unit: "orang"
    },
    {
        id: 3,
        title: "🔗 Share ke WA",
        description: "Bagikan tautan produk unggulan ke WhatsApp atau media sosial",
        reward: 30,
        icon: "share",
        category: "digital",
        isActive: true,
        target: 1,
        unit: "kali"
    },
    {
        id: 4,
        title: "⭐ Rating Produk",
        description: "Beri rating dan review untuk produk yang sudah dibeli",
        reward: 25,
        icon: "star",
        category: "digital",
        isActive: true,
        target: 1,
        unit: "produk"
    },
    {
        id: 5,
        title: "📊 Hadiri RAT Digital",
        description: "Hadiri Rapat Anggota Tahunan (RAT) secara online dan berikan voting",
        reward: 150,
        icon: "event",
        category: "special",
        isActive: false,
        target: 1,
        unit: "kali"
    },
    {
        id: 6,
        title: "🔥 Streak Belanja 7 Hari",
        description: "Belanja di koperasi selama 7 hari berturut-turut",
        reward: 200,
        icon: "local_fire_department",
        category: "daily",
        isActive: true,
        target: 7,
        unit: "hari"
    }
];

module.exports = missions;
