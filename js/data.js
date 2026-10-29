// DATA: people, scenes, venues, vehicles list, chat replies
const SK=["#a8714f","#8d5a3b","#c08a62","#7a4a30"];
const SCN=[["Street","A stroll through Lekki"],["Beach","Afternoon at Elegushi Beach"],["Café","Coffee in Yaba"],["Nightlife","Friday night in Victoria Island"],["Market","Haggle at Balogun Market"],["Gym","Sweat session at the gym"],["Suya","Suya night at the Spot"],["Arcade","Game night at the Arcade"],["Park","Live at Freedom Park"]];
const POS=[[18,58],[42,48],[66,61],[85,49]];
const MP=[[28,44],[72,72],[46,20],[82,26],[14,24],[56,48],[88,50],[16,64],[38,78]];
const VENUES=[["Allen Avenue","Ikeja",0],["Adeola Odeku","Victoria Island",0],["Elegushi Beach","Lekki",1],["Lekki Beach","Lekki",1],["Terra Kulture","Victoria Island",2],["Yellow Chilli","Victoria Island",2],["Vaniti Lagos","Victoria Island",3],["The Library Lagos","Lekki Phase 1",3],["Balogun Market","Lagos Island",4],["Skyfit Lagos","Victoria Island",5],["Ikoyi Suya Spot","Ikoyi",6],["Ozone Arcade","Yaba",7],["Freedom Park","Lagos Island",8]];
const RP=["Haha you made me smile 😄","Omo, tell me more!","Lagos traffic nearly stopped me from replying 🚌","Abeg, what's your favourite food?","I like how you talk 💚","Let's meet for coffee this weekend ☕","Wahala! You're funny o"];

const EM=["🛣️","🏖️","☕","🪩","🧺","💪","🍢","🎮","🌳"];
// ACT per location: [name, emoji, energy change, mood change, "result|result"]
const ACT=[
[["Ride a danfo","🚌",-5,5,"The conductor shouted and you survived the ride|You got the window seat. Today is a good day"],["Buy roasted corn","🌽",10,5,"Corn and pear. The classic combo|Smoky, sweet and worth it"],["Dance with the street band","💃",-10,15,"A crowd formed and started filming you|Your shoki moves went viral on the block"],["Billboard selfie","📸",-5,10,"Nailed the pose with traffic behind you|Ten likes in ten seconds"]],
[["Rent a jet ski","🏄",-20,20,"You flew over the waves!|Splash! You loved every second"],["Build a sandcastle","🏰",-5,10,"A tiny kid declared it a palace|The tide won, but it was beautiful"],["Beach football","⚽",-20,15,"Your team won 5-4|You scored a rabona and nobody believes it"],["Drink fresh coconut","🥥",10,10,"Cold, sweet and so refreshing|You drank the whole thing in one go"]],
[["Order a latte","☕",15,10,"The foam had a little heart on it|Perfect brew, perfect seat"],["Sketch in your notebook","✏️",-10,10,"A cool idea showed up out of nowhere|The waiter asked to see your drawing"],["Open mic poetry","🎤",-10,20,"Snaps all around the room|You got a standing ovation"],["Play chess","♟️",-5,10,"Checkmate in 12 moves|You lost, but learned a trick"]],
[["Hit the dance floor","🕺",-25,25,"The DJ shouted you out|You danced until your shoes begged for mercy"],["Buy a round of drinks","🍹",-10,15,"Everyone loves you now|The bill hurt, the vibe didn't"],["Request a song","🎶",-5,10,"The DJ played it just for you|Whole club sang along"],["Karaoke battle","🎤",-15,20,"You hit the high note!|The crowd demanded an encore"]],
[["Haggle for fabric","🧵",-10,10,"You talked her down by half!|She said 'last price' five times, you won"],["Eat akara & pap","🥣",10,5,"Hot akara, soft pap. Heaven|Breakfast of champions"],["Dance with the drummers","🥁",-15,15,"The whole row of stalls clapped along|You found the beat and kept it"],["Try on aso-ebi","👗",-5,15,"You look like the owambe's main character|Tailor says it fits like a dream"]],
[["Lift weights","🏋️",-25,10,"New personal best!|Your arms are now jelly"],["Zumba class","🪩",-20,20,"The instructor called you a natural|Sweaty, happy, and unstoppable"],["Smoothie bar","🥤",10,5,"Pineapple and ginger, so fresh|Protein shake for the win"],["Boxing class","🥊",-20,10,"Jab, jab, hook! The coach is impressed|You left the bag swinging"]],
[["Eat hot suya","🍢",20,15,"Extra pepper, extra onions, extra joy|The mallam gave you free tripe"],["Pepper challenge","🌶️",-5,25,"You cried, you coughed, you won|The whole spot cheered you on"],["Learn to flip suya","🔥",-10,10,"You flipped 20 skewers without dropping one|Smoke in your hair, pride in your heart"],["Gist with strangers","🗣️",-5,15,"Strangers became friends in minutes|You heard the best story of your life"]],
[["Racing game","🏎️",-5,15,"You took first place!|You crashed on the last lap, so close"],["Dance machine","🎮",-15,20,"Perfect combo, high score!|Your feet moved faster than your brain"],["Claw machine","🧸",-5,10,"You grabbed the giant bear!|It slipped, but the next try is yours"],["Join the tournament","🏆",-20,10,"You made the finals!|Champion of Yaba Arcade"]],
[["Join 5-a-side","⚽",-20,15,"You scored a screamer!|Your pass set up the winner"],["Shoot hoops","🏀",-15,15,"Swish! Nothing but net|You dunked and nobody believes it"],["Play tennis","🎾",-15,10,"What a rally, 14 shots!|Your serve was an ace"],["Cheer from the stands","📣",-5,15,"You started a chant and everyone joined|Your drum made the whole crowd dance"]]
];

// DAILY by weekday (0=Sun): [emoji, title, blurb, featured location index, question, options, correct option]
const DAILY=[
["🌳","Freedom Park Sunday","Watch the matches and join a game.",8,"How many players are on a 5-a-side team?",["7","5","11"],1],
["🌧️","Rainy Monday","Cosy day. Head to the Café.",2,"Which yellow bus is the icon of Lagos roads?",["Danfo","Gondola","Tuk-tuk"],0],
["🕹️","Tech Tuesday","Play at the Arcade.",7,"Which Lagos area is nicknamed Yabacon Valley?",["Ikoyi","Surulere","Yaba"],2],
["🚶","Waka Wednesday","Take a walk down the street.",0,"Which snack pairs with roasted corn?",["Pear (ube)","Chocolate","Popcorn"],0],
["📼","Throwback Thursday","Haggle like it's the old days.",4,"Which famous market is on Lagos Island?",["Wuse","Balogun","Onitsha"],1],
["🪩","Detty Friday","Party time. Head to Nightlife.",3,"Which dance craze is a Lagos favourite?",["Polka","Shoki","Tango"],1],
["🏖️","Beach Saturday","Sun, sand and games.",1,"Which beach is a Lekki favourite?",["Waikiki","Bondi","Elegushi"],2]
];
