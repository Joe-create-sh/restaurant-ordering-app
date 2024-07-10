import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
console.log(uuidv4());

export const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozzarella"],
        id: uuidv4(),
        price: 14,
        emoji: "/images/pizza-slice-graphic.jpg",
        alt:"a graphic depicting a slice of salami and cheese pizza"
            
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        id: uuidv4(),
        price: 12,
        emoji: "/images/burger-graphic.jpg",
        alt:"a graphic depicting a hamburger"
        
    },
    {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        id: uuidv4(),
        price: 12,
        emoji: "/images/beer-graphic.jpg",
        alt:"a graphic depicting a pint of beer"
        
    }
];