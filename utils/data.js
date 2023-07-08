// List of names from the epic Mahabharata
const names = [
    "Yudhishthira",
    "Bhima",
    "Arjuna",
    "Nakula",
    "Sahadeva",
    "Draupadi",
    "Duryodhana",
    "Dushasana",
    "Karna",
    "Krishna",
    "Bhishma",
    "Vidura",
    "Gandhari",
    "Kunti",
    "Shakuni",
    "Dronacharya",
    "Ashwatthama",
    "Kripacharya",
    "Abhimanyu",
    "Satyaki",
    "Shikhandi",
    "Uttara",
    "Virata",
    "Drupada",
    "Dhritarashtra",
    "Sanjaya",
    "Shalya",
    "Kritavarma",
    "Upapandavas",
    "Barbarik",
    "Ekalavya",
    "Hidimba",
    "Jarasandha",
    "Kichaka",
    "Subhadra",
    "Vidura",
    "Yuyutsu",
    "Amba",
    "Ambalika",
    "Chitrangada",
    "Ghatotkacha",
    "Kali",
    "Kurukshetra",
    "Lakshagraha",
    "Madri",
    "Pandavas",
    "Purushartha",
    "Shantanu",
    "Sudarshana",
    "Uloopi",
    "Vaishya",
    "Vasudeva",
    "Vayu",
    "Yama",
  ];
  
  // Lines from Rabindranath Tagore's poem "Where the mind is without fear"
  const thought = [
    "Where the mind is without fear and the head is held high;",
    "Where knowledge is free;",
    "Where the world has not been broken up into fragments;",
    "By narrow domestic walls;",
    "Where words come out from the depth of truth;",
    "Where tireless striving stretches its arms towards perfection;",
    "Where the clear stream of reason has not lost its way;",
    "Into the dreary desert sand of dead habit;",
    "Where the mind is led forward by thee",
    "Into ever-widening thought and action;",
    "Into that heaven of freedom, my Father, let my country awake.",
  ];
  
  // Function to get a random item from an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Function to generate a random name
  const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
  
  // Function to generate a random thought
  const getRandomThought = () => `${getRandomArrItem(thought)}`;
  
  // Export the functions to be used in other modules
  module.exports = { getRandomName, getRandomThought };
  