// Data Produk Unggulan (Untuk Afiliasi)
const products = [
    {
        id: 1,
        name: "Beras Organik Sumberejo",
        price: 14000,
        unit: "kg",
        stock: 500,
        description: "Beras organik dari pertanian warga Desa Sumberejo, bebas pestisida dan dipanen secara tradisional",
        image: "https://via.placeholder.com/200x200/1B5E20/FFFFFF?text=Beras+Organik",
        category: "Pangan",
        producer: "Kelompok Tani Sumberejo",
        origin: "Desa Sumberejo, Sleman",
        certifications: ["Organik", "Lokal"],
        rating: 4.8,
        totalSold: 250
    },
    {
        id: 2,
        name: "Gula Kelapa Murni",
        price: 25000,
        unit: "kg",
        stock: 200,
        description: "Gula kelapa asli produksi rumah tangga, tanpa pemanis buatan dan pewarna",
        image: "https://via.placeholder.com/200x200/FFC107/FFFFFF?text=Gula+Kelapa",
        category: "Pangan",
        producer: "Ibu-ibu PKK Sumberejo",
        origin: "Desa Sumberejo, Sleman",
        certifications: ["Halal", "Lokal"],
        rating: 4.9,
        totalSold: 180
    },
    {
        id: 3,
        name: "Kerajinan Anyaman Bambu",
        price: 150000,
        unit: "buah",
        stock: 50,
        description: "Anyaman bambu khas Sleman, dibuat oleh perajin lokal dengan motif tradisional modern",
        image: "https://via.placeholder.com/200x200/8D6E63/FFFFFF?text=Anyaman+Bambu",
        category: "Kerajinan",
        producer: "Perajin Anyaman Sleman",
        origin: "Desa Sumberejo, Sleman",
        certifications: ["Lokal", "Eco-friendly"],
        rating: 4.7,
        totalSold: 35
    },
    {
        id: 4,
        name: "Kopi Arabika Merapi",
        price: 85000,
        unit: "250gr",
        stock: 100,
        description: "Kopi Arabika premium dari lereng Gunung Merapi, roasted medium dengan rasa fruity",
        image: "https://via.placeholder.com/200x200/795548/FFFFFF?text=Kopi+Arabika",
        category: "Minuman",
        producer: "Petani Kopi Merapi",
        origin: "Desa Sumberejo, Sleman",
        certifications: ["Fair Trade", "Lokal"],
        rating: 4.9,
        totalSold: 75
    },
    {
        id: 5,
        name: "Madu Hutan Murni",
        price: 120000,
        unit: "500ml",
        stock: 75,
        description: "Madu hutan murni dari kawasan pegunungan, tanpa tambahan gula dan pemanis",
        image: "https://via.placeholder.com/200x200/FF6F00/FFFFFF?text=Madu+Hutan",
        category: "Kesehatan",
        producer: "Peternak Lebah Sumberejo",
        origin: "Desa Sumberejo, Sleman",
        certifications: ["Organik", "Halal"],
        rating: 4.9,
        totalSold: 60
    }
];

module.exports = products;
