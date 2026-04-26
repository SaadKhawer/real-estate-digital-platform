import { initDb } from './database.js';

const extraProperties = [
  {
    title: "Skyline Luxury Penthouse",
    location: "Tokyo, Japan",
    price: 6500000,
    period: null,
    bedrooms: 4,
    bathrooms: 4.5,
    area: 4200,
    type: "Sale",
    propertyType: "apartment",
    image: "/luxury_apartment.png",
    description: "An ultra-modern penthouse offering uninterrupted 360-degree views of Tokyo's skyline and Mount Fuji on clear days. Features a private zen garden and a glass-bottom pool.",
    isVerified: 1
  },
  {
    title: "Palm Jumeirah Signature Villa",
    location: "Dubai, UAE",
    price: 15000000,
    period: null,
    bedrooms: 6,
    bathrooms: 7,
    area: 8500,
    type: "Sale",
    propertyType: "villa",
    image: "/luxury_villa.png",
    description: "Located on the fronds of Palm Jumeirah, this signature villa offers direct beach access, a massive infinity pool, and a private yacht dock.",
    isVerified: 1
  },
  {
    title: "Mayfair Townhouse",
    location: "London, UK",
    price: 25000,
    period: "/mo",
    bedrooms: 5,
    bathrooms: 4,
    area: 3800,
    type: "Rent",
    propertyType: "house",
    image: "/luxury_house.png",
    description: "A beautifully restored historic townhouse in the heart of Mayfair. Features classic Victorian architecture seamlessly blended with modern smart home technologies.",
    isVerified: 1
  },
  {
    title: "Monaco Grand Prix Apartment",
    location: "Monte Carlo, Monaco",
    price: 12000000,
    period: null,
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    type: "Sale",
    propertyType: "apartment",
    image: "/luxury_apartment.png",
    description: "A rare opportunity to own a premium apartment with a direct view of the Monaco Grand Prix circuit. Features an expansive terrace and luxury marble finishes.",
    isVerified: 1
  },
  {
    title: "Alpine Ski Chalet",
    location: "Zermatt, Switzerland",
    price: 8500000,
    period: null,
    bedrooms: 5,
    bathrooms: 6,
    area: 5100,
    type: "Sale",
    propertyType: "house",
    image: "/luxury_house.png",
    description: "A spectacular ski-in, ski-out chalet with stunning views of the Matterhorn. Includes an indoor heated pool, sauna, and wine cellar.",
    isVerified: 0
  },
  {
    title: "Bel Air Mega Mansion",
    location: "Los Angeles, CA",
    price: 35000000,
    period: null,
    bedrooms: 8,
    bathrooms: 12,
    area: 18000,
    type: "Sale",
    propertyType: "villa",
    image: "/luxury_villa.png",
    description: "The epitome of Los Angeles luxury. This mega mansion features a 20-car garage, bowling alley, private theater, and a massive infinity edge pool overlooking the city.",
    isVerified: 1
  },
  {
    title: "Parisian Elegance",
    location: "Paris, France",
    price: 18000,
    period: "/mo",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2200,
    type: "Rent",
    propertyType: "apartment",
    image: "/luxury_apartment.png",
    description: "A gorgeous Haussmannian apartment featuring ornate moldings, herringbone hardwood floors, and a balcony with a direct view of the Eiffel Tower.",
    isVerified: 1
  },
  {
    title: "Miami Beachfront Condo",
    location: "Miami, FL",
    price: 4200000,
    period: null,
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2800,
    type: "Sale",
    propertyType: "apartment",
    image: "/luxury_apartment.png",
    description: "Experience vibrant Miami living with direct ocean views, floor-to-ceiling glass walls, and access to five-star resort amenities.",
    isVerified: 0
  },
  {
    title: "Tuscan Vineyard Estate",
    location: "Tuscany, Italy",
    price: 9500000,
    period: null,
    bedrooms: 7,
    bathrooms: 6,
    area: 10000,
    type: "Sale",
    propertyType: "villa",
    image: "/luxury_villa.png",
    description: "A 16th-century estate surrounded by 50 acres of private vineyards and olive groves. Fully modernized while retaining its rustic Italian charm.",
    isVerified: 1
  },
  {
    title: "Singapore Marina Bay Suite",
    location: "Singapore",
    price: 8900000,
    period: null,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    type: "Sale",
    propertyType: "apartment",
    image: "/luxury_apartment.png",
    description: "Located in the heart of Marina Bay, offering unparalleled views of the Gardens by the Bay and the city skyline. Features a private elevator lobby.",
    isVerified: 1
  },
  {
    title: "Malibu Cliffside Retreat",
    location: "Malibu, CA",
    price: 18500000,
    period: null,
    bedrooms: 5,
    bathrooms: 6,
    area: 6000,
    type: "Sale",
    propertyType: "house",
    image: "/luxury_house.png",
    description: "Perched on a cliff overlooking the Pacific Ocean. This architectural masterpiece features walls of glass and a cantilevered swimming pool.",
    isVerified: 1
  },
  {
    title: "Sydney Harbour Penthouse",
    location: "Sydney, Australia",
    price: 11000000,
    period: null,
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3500,
    type: "Sale",
    propertyType: "apartment",
    image: "/luxury_apartment.png",
    description: "Wake up to unobstructed views of the Sydney Opera House and Harbour Bridge from every room in this luxurious penthouse.",
    isVerified: 1
  },
  {
    title: "Caribbean Private Island Villa",
    location: "Bahamas",
    price: 45000,
    period: "/mo",
    bedrooms: 6,
    bathrooms: 6,
    area: 7000,
    type: "Rent",
    propertyType: "villa",
    image: "/luxury_villa.png",
    description: "Escape to your own private slice of paradise. This villa comes fully staffed, with a private beach, dock, and guest cottages.",
    isVerified: 1
  },
  {
    title: "Historic Kyoto Machiya",
    location: "Kyoto, Japan",
    price: 2800000,
    period: null,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "Sale",
    propertyType: "house",
    image: "/luxury_house.png",
    description: "A meticulously restored traditional Japanese townhouse. Features tatami rooms, a central courtyard garden, and modern plumbing hidden in rustic design.",
    isVerified: 0
  },
  {
    title: "Manhattan Billionaires' Row",
    location: "New York, NY",
    price: 22000000,
    period: null,
    bedrooms: 4,
    bathrooms: 5,
    area: 4500,
    type: "Sale",
    propertyType: "apartment",
    image: "/luxury_apartment.png",
    description: "Located on the 80th floor of a Billionaires' Row skyscraper. Offers helicopter-like views of Central Park and the entire city.",
    isVerified: 1
  }
];

async function seedMore() {
  try {
    const db = await initDb();
    
    console.log(`Adding ${extraProperties.length} more properties...`);

    const stmt = await db.prepare(`
      INSERT INTO properties (
        title, location, price, period, bedrooms, bathrooms, area, type, propertyType, image, description, isVerified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of extraProperties) {
      await stmt.run(
        p.title,
        p.location,
        p.price,
        p.period || null,
        p.bedrooms,
        p.bathrooms,
        p.area,
        p.type,
        p.propertyType,
        p.image,
        p.description,
        p.isVerified
      );
    }
    await stmt.finalize();

    console.log('Extra properties added successfully!');
  } catch (error) {
    console.error('Error adding properties:', error);
  }
}

seedMore();
