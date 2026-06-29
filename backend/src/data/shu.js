// Data SHU (Sisa Hasil Usaha) - Simulasi
const shuData = {
    year: 2025,
    period: "Januari - Desember 2025",
    totalSHU: 125000000,
    distribution: {
        members: 60,
        cadangan: 20,
        pengurus: 10,
        sosial: 5,
        pendidikan: 5
    },
    memberBonus: [
        {
            userId: 4,
            name: "Dewi Lestari",
            tier: 3,
            points: 4200,
            weight: 0.15,
            shuAmount: 11250000,
            rank: 1
        },
        {
            userId: 5,
            name: "Rina Marlina",
            tier: 2,
            points: 3250,
            weight: 0.12,
            shuAmount: 9000000,
            rank: 2
        },
        {
            userId: 2,
            name: "Ahmad Junaedi",
            tier: 2,
            points: 2800,
            weight: 0.10,
            shuAmount: 7500000,
            rank: 3
        },
        {
            userId: 3,
            name: "Budi Santoso",
            tier: 1,
            points: 1890,
            weight: 0.07,
            shuAmount: 5250000,
            rank: 4
        },
        {
            userId: 1,
            name: "Siti Rahayu",
            tier: 1,
            points: 1250,
            weight: 0.05,
            shuAmount: 3750000,
            rank: 5
        }
    ],
    pointToSHU: {
        formula: "Bobot SHU = (Poin User / Total Poin Seluruh Anggota) × 60% × Total SHU",
        totalMemberPoints: 13390,
        totalSHUForMembers: 75000000
    }
};

module.exports = shuData;
