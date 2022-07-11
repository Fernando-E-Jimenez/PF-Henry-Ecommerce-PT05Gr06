
const arraycategorias = [
    {
        "name": "Tinto"
    },
    {
        "name": "Blanco"
    },
    {
        "name": "Rosado"
    },
    {
        "name": "Espumoso"
    },
    {
        "name": "Generoso"
    },
    {
        "name": "Sin Crianza"
    },
    {
        "name": "Crianza"
    },
    {
        "name": "Reserva"
    },
    {
        "name": "Gran Reserva"
    },
    {
        "name": "Secos"
    },
    {
        "name": "Abocados"
    },
    {
        "name": "Semi-Secos"
    },
    {
        "name": "Semi-Dulces"
    },
    {
        "name": "Dulces"
    },
    {
        "name": "Semi-Dulces"
    }
]

const arrayProductos = [
    {
        "name": "Cerveza Quilmes",
        "description": "Cerveza QUILMES Botella 970 Cc",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00005000/00005098.jpg?3.0.137b",
        "price": "130",
        "stock": "2500",
        "category": [1,5,7]
    },
    {
        "name": "Cerveza Isenbeck",
        "description": "Cerveza ISENBECK Botella 1 L",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00243200/00243261.jpg?3.0.137b",
        "price": "135",
        "stock": "1000",
        "category": [8,9,10]
    },
    {
        "name": "Cerveza Brahma",
        "description": "Cerveza BRAHMA Chopp Porron 340 Cc",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00298200/00298226.jpg?3.0.137b",
        "price": "60",
        "stock": "800",
        "category": [3,6,7]
    },
    {
        "name": "Cerveza Palermo",
        "description": "Cerveza  PALERMO   Botella 1 L",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00007300/00007306.jpg?3.0.137b",
        "price": "150",
        "stock": "2000",
        "category": [0,2,3]
    },
    {
        "name": "Cerveza Budweiser",
        "description": "Cerveza  BUDWEISER  Porron 340 CC",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00492400/00492430.jpg?3.0.137b",
        "price": "57",
        "stock": "1350",
        "category": [1,0]
    },
    {
        "name": "Cerveza Iguana",
        "description": "Cerveza Pilsener IGUANA   Botella 1 L",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00129400/00129407.jpg?3.0.137b",
        "price": "121",
        "stock": "430",
        "category": [5,9,2]
    },
    {
        "name": "Cerveza SANTA FE",
        "description": "Cerveza  SANTA FE   Botella 1 L",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00082400/00082451.jpg?3.0.137b",
        "price": "159",
        "stock": "4500",
        "category": [0,1,2,3]
    },
    {
        "name": "Cerveza Schneider",
        "description": "Cerveza Lager SCHNEIDER   Botella 1 L",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00245700/00245789.jpg?3.0.137b",
        "price": "168",
        "stock": "1850",
        "category": [5,6,7,8]
    },
    {
        "name": "Vino Tinto Resero",
        "description": "Vino Tinto . RESERO Ttb 1 Ltr",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00002200/00002233.jpg?3.0.137b",
        "price": "222",
        "stock": "6500",
        "category": [1,2,3,4]
    },
    {
        "name": "Sidra Reina de Alcantara",
        "description": "Sidra Et.Blanca REINA DE ALCANTARA Bot 720 Cmq",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00063600/00063668.jpg?3.0.137b",
        "price": "185",
        "stock": "230",
        "category": [0,5,8,9]
    },
    {
        "name": "Vino Blanco Toro",
        "description": "Vino Blanco . Toro Ttb 1 Ltr",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00514800/00514833.jpg?3.0.137b",
        "price": "286",
        "stock": "485",
        "category": [0]
    },
    {
        "name": "Clerico Fizz La Farruca",
        "description": "Clerico Fizz . La Farruca Bot 710 Cmq",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00197300/00197374.jpg?3.0.137b",
        "price": "180",
        "stock": "560",
        "category": [5,2,3]
    },
    {
        "name": "Mistela CROTTA",
        "description": "Mistela . CROTTA Bot 2 Ltr",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00082800/00082854.jpg?3.0.137b",
        "price": "690",
        "stock": "350",
        "category": [6,7,3]
    },
    {
        "name": "Colon Syrah",
        "description": "COLON Syrah Botella De 750 Ml",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00087600/00087662.jpg?3.0.137b",
        "price": "183",
        "stock": "3500",
        "category": [1,2,3]
    },
    {
        "name": "Espumante Blue Frizze",
        "description": "Espumante Evolution Blue Frizze Bot 1 Ltr",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00503900/00503970.jpg?3.0.137b",
        "price": "224",
        "stock": "8500",
        "category": [3,4,5]
    },
    {
        "name": "Sidra DEL VALLE",
        "description": "Sidra Etiqueta Blanc DEL VALLE Bot 710 Cmq",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00063700/00063783.jpg?3.0.137b",
        "price": "279",
        "stock": "3520",
        "category": [10,11,12]
    },
    {
        "name": "Cerveza Doble Malta Quilmes x6",
        "description": "Cerveza Doble Malta Quilmes X6 Unidades Pak 410 Ml",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00525100/00525185.jpg?3.0.137b",
        "price": "747",
        "stock": "6324",
        "category": [13,14,7]
    },
    {
        "name": "Vino Cab.Sauv Malbec Postales",
        "description": "Vino Cab.Sauv Malbec Postales Fd Bot 750 Cmq",
        "image": "https://static.cotodigital3.com.ar/sitios/fotos/medium/00140200/00140207.jpg?3.0.137b",
        "price": "279",
        "stock": "3560",
        "category": [10,14,11]
    }
]

module.exports = { arrayProductos, arraycategorias };