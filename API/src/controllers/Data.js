const arraycategorias = [
  {
    name: "Tinto",
  },
  {
    name: "Blanco",
  },
  {
    name: "Rosado",
  },
  {
    name: "Espumoso",
  },
  {
    name: "Generoso",
  },
  {
    name: "Sin Crianza",
  },
  {
    name: "Crianza",
  },
  {
    name: "Reserva",
  },
  {
    name: "Gran Reserva",
  },
  {
    name: "Secos",
  },
  {
    name: "Abocados",
  },
  {
    name: "Semi-Secos",
  },
  {
    name: "Semi-Dulces",
  },
  {
    name: "Dulces",
  },
  {
    name: "Semi-Dulces",
  },
  {
    name: "Champaña",
  },
];

const arrayProductos = [
  {
    name: "Vino Tinto Navarro Correas Colección Privada Malbec",
    description:
      "El vino tinto Navarro Correas Colección Privada es un vino argentino que viene por botella de 750 ML. El tipo de unva es Malbec 100%. ¡Prueba una copa de vino tinto con tu familia!.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/280550-1200-auto?v=637900848318330000&width=1200&height=auto&aspect=true",
    price: "75900",
    stock: "2500",
    category: [1, 5, 7],
  },
  {
    name: "Vino Rosado Cousiño Gris Macul Varietal Cabernet Sauvignon",
    description:
      "El vino rosado Cousiño Gris Macul es un vino chileno varietal. El tipo de uva es 100% Cabernet Sauvignon. ¡En Dislicores te acompañamos con una variedad de vinos rosados chilenos! Debe consumirse a una temperatura de 10-12 °C. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/285221-800-auto?v=637905195350900000&width=800&height=auto&aspect=true",
    price: "51900",
    stock: "1000",
    category: [3, 9, 10],
  },
  {
    name: "Vino Tinto Cousiño Macul Varietal Merlot",
    description:
      "El vino tinto Cousiño Macul Varietal es un vino chileno que viene por 750 ML. El tipo de uva es 100% Merlot. ¡Sorprende a tu familia con un vino tinto chileno! Debe consumirse a una temperatura de 16 - 18 °C. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/280543-800-auto?v=637900848252970000&width=800&height=auto&aspect=true",
    price: "102900",
    stock: "800",
    category: [1, 6, 7],
  },
  {
    name: "Vino Blanco Cousiño Macul Varietal Sauvignon Blanc",
    description:
      "El vino blanco Cousiño Macul es un vino chileno varietal que viene por botella 750 ML. El tipo de uva es 100% Sauvignon Blanc. Debe consumirse a una temperatura de 10- 12 °C. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/285225-800-auto?v=637905195353100000&width=800&height=auto&aspect=true",
    price: "99900",
    stock: "2000",
    category: [2, 8, 9],
  },
  {
    name: "Vino Tinto Dadá 1 Bonarda Malbec",
    description:
      "El vino DADA es un vino tinto argentino viene en botella de 750 ML. El tipo de uva es Malbec. ¡Disfruta de un plan de vinos y amigos! Debe consumirse a una temperatura de 16 a 18° C. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/282722-800-auto?v=637902603243200000&width=800&height=auto&aspect=true",
    price: "48900",
    stock: "1350",
    category: [1, 7, 9],
  },
  {
    name: "Vino Tinto Trapiche Fino Manos Malbec",
    description:
      "El vino tinto Trapiche Fino Manos es un vino argentino que viene por botella de 750 ml. El tipo de uva es Malbec 100%. ¡Disfruta de una tarde con un vino tinto y amigos! -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/257814-800-auto?v=637892572075300000&width=800&height=auto&aspect=true",
    price: "635000",
    stock: "430",
    category: [1, 9, 7],
  },
  {
    name: "Vino Tinto Cousiño Macul Varietal Cabernet Sauvignon",
    description:
      "El vino tinto Cousiño Macul Don Luis es un vino tinto chileno. El tipo de uva es Cabernet Sauvignon. ¡Disfruta de una noche especial con una copa de vino tinto chileno! Debe consumirse a una temperatura de 18° C. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/280571-800-auto?v=637900848545930000&width=800&height=auto&aspect=true",
    price: "51900",
    stock: "4500",
    category: [1, 6, 7],
  },
  {
    name: "Vino Blanco Cousiño Macul Varietal Chardonnay",
    description:
      "El vino blanco Cousiño Macul Varietal es un vino chileno que viene por 750 ML. El tipo de uva es 100% Chardonnay. ¡Disfruta de un vino blanco con un ceviche! Debe consumirse a una temperatura de 10 - 12 °C. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/285220-800-auto?v=637905195350430000&width=800&height=auto&aspect=true",
    price: "789000",
    stock: "1850",
    category: [2, 6, 7, 8],
  },
  {
    name: "Vino Espumoso Rivarose Rosado B",
    description:
      "El espumoso Rivarose es un vino rosado francés que viene por 750 ml. El tipo de uva es 100% Syrah. Un espumoso rosado es el complemento perfecto para tus celebraciones. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/283665-800-auto?v=637903467308000000&width=800&height=auto&aspect=true",
    price: "93900",
    stock: "6500",
    category: [4, 3, 9, 7],
  },
  {
    name: "Vino Espumoso Chandon Brut Rose",
    description:
      "El vino Chandon Brut Rosé es un espumoso rosado argentino y de cosecha manual para darle un sabor ideal. Además de su gran calidad, su color es salmón con aromas afrutados (frambuesa, cereza y frutilla), cítricos y damasco y notas florales. Es un vino espumoso fresco, intenso, sedoso y cremoso; Destacada presencia de frutos rojos y notas típicas del Malbec y Pinot Noir que se fusionan con suaves aromas a pan dulce provenientes del contacto sobre levaduras. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/257252-800-auto?v=637892563889030000&width=800&height=auto&aspect=true",
    price: "84300",
    stock: "230",
    category: [4, 3, 8, 9],
  },
  {
    name: "Vino Blanco Jp Divine Brut Chardonnay",
    description:
      "El vino blanco Jp Chenet Divine Brut es un vino francés que viene en botella 750 ml. El tipo de uva es Chardonnay. ¡Dsifruta de un brindis con tus amigos y un vino blanco de Francia! Debe consumirse a una temperatura de 6 a 8° C. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/176151-800-auto?v=637866816988200000&width=800&height=auto&aspect=true",
    price: "75900",
    stock: "485",
    category: [2, 7, 10],
  },
  {
    name: "Vino Rosado Prosecco Mionetto Extra Dry",
    description:
      "El espumoso Prosecco Mionetto Rosado es un vino italiano que viene por botella de 750 ml. El tipo de uva es variedad de uvas. ¡Complementa tus celebraciones con un espumoso italiano! Debe consumirse a una temperatura de 6 y 8° C. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/280509-800-auto?v=637900839628100000&width=800&height=auto&aspect=true",
    price: "67900",
    stock: "560",
    category: [4, 7, 9],
  },
  {
    name: "Vino Espumoso Blanco Calvet Celebration Brut",
    description:
      "El vino blanco Calvet Celebration Brut es un espumoso francés que viene en botella de 750 ML. El tipo de uva es 90% Colombard, 10% Muscat. !Un espumoso francés es el protagonista de tus celebraciones! Debe consumirse a una temperatura de 7 a 9° C. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/280573-800-auto?v=637900848605400000&width=800&height=auto&aspect=true",
    price: "66900",
    stock: "350",
    category: [4, 2, 13],
  },
  {
    name: "Vino Espumoso Jp Chenet Brut",
    description:
      "El espumoso Jp Chenet Sparkling Brut sus uvas se vendimian y se prensan suavemente, se someten a una sedimentación en frío, a un sembrado con levaduras y, finalmente, se fermentan a baja temperatura. La fermentación en botella tiene lugar en depósitos presurizados durante 6 meses. Estos 6 meses de crianza aportan a este vino espumoso superior toda su complejidad. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/283674-800-auto?v=637903467347900000&width=800&height=auto&aspect=true",
    price: "55900",
    stock: "3500",
    category: [4, 12, 14],
  },
  {
    name: "Champagne Moet And Chandon Imperial Brut",
    description:
      "La champagne Moet and Chandon Imperial es un vino de Francia que viene por botella de 750 ml. El tipo de uva Pinot Noir, Chardonnay, Pinot Meunier. Una champagne es el complemento para tus celebraciones. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/288056-800-auto?v=637914699170970000&width=800&height=auto&aspect=true",
    price: "392600",
    stock: "8500",
    category: [16, 11, 12],
  },
  {
    name: "Champagne Veuve Clicquot Brut",
    description:
      "La champange Veuve Clicqout Brut es de Francia viene por botella de 750 ml. El tipo de uva es Pinot Noir, Pinot Meunier y Chardonnay. Debe consumirse a una temperatura de 9° C. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/288047-800-auto?v=637914699150770000&width=800&height=auto&aspect=true",
    price: "382700",
    stock: "3520",
    category: [16, 11, 12],
  },
  {
    name: "Champagne Moet And Chandon Ice Imperial",
    description:
      "La champagne Moet and Chandon Ice Imperial es un vino de Francia que viene por botella de 750 ml. El tipo de uva Pinot Noir, Pinot Meunier, Chardonnay. ¡Una celebración con familia y una champange francesa! Debe consumirse a una temperatura de 4 a 6° C. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/288055-800-auto?v=637914699170000000&width=800&height=auto&aspect=true",
    price: "398100",
    stock: "6324",
    category: [16, 11, 7],
  },
  {
    name: "Champagne Moet And Chandon Imperial Brut",
    description:
      "La champagne Moet and Chandon Imperial es un vino de Francia que viene por botella de 750 ml. El tipo de uva Pinot Noir, Chardonnay, Pinot Meunier. Una champagne es el complemento para tus celebraciones. - Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/288056-800-auto?v=637914699170970000&width=800&height=auto&aspect=true",
    price: "392600",
    stock: "3560",
    category: [16, 7, 11],
  },
  {
    name: "Vino Espumoso Jp Chenet Brut",
    description:
      "El espumoso Jp Chenet Sparkling Brut sus uvas se vendimian y se prensan suavemente, se someten a una sedimentación en frío, a un sembrado con levaduras y, finalmente, se fermentan a baja temperatura. La fermentación en botella tiene lugar en depósitos presurizados durante 6 meses. Estos 6 meses de crianza aportan a este vino espumoso superior toda su complejidad. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/283674-800-auto?v=637903467347900000&width=800&height=auto&aspect=true",
    price: "55900",
    stock: "3560",
    category: [4, 14, 11],
  },
  {
    name: "Champagne Laurent Perrier Grand Siecle",
    description:
      "La champagne Laurent Perirer Grand Siecle es francés viene por botella de 750 ml. El tipo de uva es Chardonnay y Pinot Noir. ¡Sorprende a tus invitados con un vino tinto reserva! Debe consumirse a una temperatura de 8-10°C. -Dislicores no garantiza la añada de los productos, si su decisión de compra está motivada por la añada del producto, por favor comunicarse directamente con servicio al cliente.",
    image:
      "https://dislicoresqa.vtexassets.com/arquivos/ids/257130-800-auto?v=637892561781800000&width=800&height=auto&aspect=true",
    price: "724000",
    stock: "3560",
    category: [16, 14, 11],
  },
];

const arrayReviews = [
  {
    description: "Sabroso",
    star: 5,
    productId: 1,
  },
  {
    description: "Muy Bueno",
    star: 4,
    productId: 2,
  },
  {
    description: "Bueno",
    star: 3,
    productId: 3,
  },
  {
    description: "Regular",
    star: 3,
    productId: 4,
  },
  {
    description: "Sabroso",
    star: 5,
    productId: 5,
  },
  {
    description: "Sabroso",
    star: 4,
    productId: 6,
  },
  {
    description: "Regular",
    star: 3,
    productId: 7,
  },
  {
    description: "Muy bueno",
    star: 5,
    productId: 8,
  },
  {
    description: "Sabroso",
    star: 5,
    productId: 9,
  },
  {
    description: "Malo",
    star: 1,
    productId: 10,
  },
  {
    description: "Podria ser mejor",
    star: 3,
    productId: 11,
  },
  {
    description: "Bueno para su precio",
    star: 4,
    productId: 12,
  },
  {
    description: "Esta bueno",
    star: 5,
    productId: 13,
  },
  {
    description: "Nada mal",
    star: 4,
    productId: 14,
  },
  {
    description: "Sabroso",
    star: 5,
    productId: 15,
  },
  {
    description: "Sabroso",
    star: 5,
    productId: 16,
  },
  {
    description: "Muy Bueno",
    star: 5,
    productId: 17,
  },
  {
    description: "Malisimo",
    star: 1,
    productId: 18,
  },
];

module.exports = { arrayProductos, arraycategorias, arrayReviews };
