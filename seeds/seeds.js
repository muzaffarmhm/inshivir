const randomPrice = () => {
  return Math.floor(Math.random() * 500 + 40);
};

const data = [{
  "title": "Street",
  "location": "Bayaguana"
}, {
  "title": "Center",
  "location": "Vitali"
}, {
  "title": "Parkway",
  "location": "Al Bīrah"
}, {
  "title": "Terrace",
  "location": "Baiyang"
}, {
  "title": "Lane",
  "location": "Sixi"
}, {
  "title": "Trail",
  "location": "Sabugo"
}, {
  "title": "Alley",
  "location": "Al Azraq ash Shamālī"
}, {
  "title": "Lane",
  "location": "Alcanhões"
}, {
  "title": "Crossing",
  "location": "Pongol"
}, {
  "title": "Crossing",
  "location": "Rääkkylä"
}, {
  "title": "Point",
  "location": "Nyahururu"
}, {
  "title": "Plaza",
  "location": "Stamford"
}, {
  "title": "Pass",
  "location": "Duisburg"
}, {
  "title": "Road",
  "location": "Sydney Mines"
}, {
  "title": "Point",
  "location": "Almaguer North"
}, {
  "title": "Avenue",
  "location": "Newton"
}, {
  "title": "Road",
  "location": "Wonosari"
}, {
  "title": "Circle",
  "location": "Zhifudao"
}, {
  "title": "Trail",
  "location": "Fiditi"
}, {
  "title": "Park",
  "location": "Al Khafsah"
}, {
  "title": "Lane",
  "location": "Kotabaru"
}, {
  "title": "Crossing",
  "location": "Turgenevo"
}, {
  "title": "Way",
  "location": "Linpu"
}, {
  "title": "Hill",
  "location": "Yamaga"
}, {
  "title": "Lane",
  "location": "Lom Kao"
}, {
  "title": "Crossing",
  "location": "Az Zintān"
}, {
  "title": "Parkway",
  "location": "Beirut"
}, {
  "title": "Place",
  "location": "Jicun"
}, {
  "title": "Trail",
  "location": "Karangtanjung"
}, {
  "title": "Pass",
  "location": "Silvares"
}, {
  "title": "Point",
  "location": "Langres"
}, {
  "title": "Alley",
  "location": "Dolna Banjica"
}, {
  "title": "Hill",
  "location": "Bergen"
}, {
  "title": "Junction",
  "location": "Hechun"
}, {
  "title": "Avenue",
  "location": "Huazhai"
}, {
  "title": "Crossing",
  "location": "Baguim do Monte"
}, {
  "title": "Drive",
  "location": "Luocun"
}, {
  "title": "Place",
  "location": "Litein"
}, {
  "title": "Plaza",
  "location": "Jangheung"
}, {
  "title": "Point",
  "location": "Concórdia"
}, {
  "title": "Center",
  "location": "Hefei"
}, {
  "title": "Plaza",
  "location": "Miguel Hidalgo"
}, {
  "title": "Junction",
  "location": "Gurlan"
}, {
  "title": "Parkway",
  "location": "Mekarsari"
}, {
  "title": "Avenue",
  "location": "Beaumont"
}, {
  "title": "Way",
  "location": "Wutan"
}, {
  "title": "Road",
  "location": "Sembungan Kidul"
}, {
  "title": "Road",
  "location": "Lille"
}, {
  "title": "Circle",
  "location": "Austin"
}, {
  "title": "Road",
  "location": "Kuching"
}].map(item => ({
  ...item, "image": "https://source.unsplash.com/800x600/?woods,camps",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "price": randomPrice(),
  "author": '61b1c71c96187ce6833b9320',
  "image": [ { "url" : "https://res.cloudinary.com/djmfik7ni/image/upload/v1639480966/Inshivir/t4uou8t6i2yfr1pfiaax.png", "filename" : "Inshivir/t4uou8t6i2yfr1pfiaax"} ]
}));

module.exports = data;