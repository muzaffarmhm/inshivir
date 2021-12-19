const randomPrice = () => {
  return Math.floor(Math.random() * 500 + 40);
};

//generate random coordinates within a radius
const randomCoordinates = (lat, lng, radius) => {
  const r = radius / 111300; //about 111300 meters in one degree
  const u = Math.random();
  const v = Math.random();

  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newlat = y + lat;
  const newlon = x + lng;

  return [newlon, newlat];
};

const data = [{
  "title": "Sunbrook",
  "location": "Thawat Buri"
}, {
  "title": "Lerdahl",
  "location": "Xuetian"
}, {
  "title": "Dexter",
  "location": "Curvelo"
}, {
  "title": "Graceland",
  "location": "Siquanpu"
}, {
  "title": "Anhalt",
  "location": "Hägersten"
}, {
  "title": "Carioca",
  "location": "Dolno Palčište"
}, {
  "title": "Victoria",
  "location": "Centralniy"
}, {
  "title": "Hoffman",
  "location": "Skuratovskiy"
}, {
  "title": "Thackeray",
  "location": "Polonnaruwa"
}, {
  "title": "Luster",
  "location": "Ambian"
}].map(item => ({
  ...item, "image": "https://source.unsplash.com/800x600/?woods,camps",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "price": randomPrice(),
  "author": '61b1c71c96187ce6833b9320',
  "image": [ { "url" : "https://res.cloudinary.com/djmfik7ni/image/upload/v1639480966/Inshivir/t4uou8t6i2yfr1pfiaax.png", "filename" : "Inshivir/t4uou8t6i2yfr1pfiaax"} ],
  "geometry": {
    "type": "Point",
    "coordinates": randomCoordinates(22.830982779347984, 78.2360325972813, 1000000)
  }
  
}));

module.exports = data;

// "geometry" : 
// { 
//   "type" : "Point", 
//   "coordinates" : [ 76.69389, 11.40861 ] 
// }


