const data = require('../data');

// GET semua produk
exports.getProducts = (req, res) => {
    try {
        const products = data.products;

        res.json({
            success: true,
            data: products,
            message: 'Data produk berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET produk by ID
exports.getProductById = (req, res) => {
    try {
        const { id } = req.params;
        const product = data.products.find(p => p.id === parseInt(id));

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: product,
            message: 'Data produk berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};
