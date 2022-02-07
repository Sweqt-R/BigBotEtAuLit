class DungeonPicker {
    doList(interaction) {

        const dungeonPickerFilter = (reaction, user) => {
            // console.log("user.id2 : " + user.id + " interaction.user.id2 : " + interaction.user.id)
            return ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"].includes(reaction.emoji.name) && user.id == interaction.user.id;
        };

        interaction.user.send(listAllDungeons()).then((m) => {

            m.react("1️⃣").then(() => m.react("2️⃣")).then(() => m.react("3️⃣")).then(() => m.react("4️⃣")).then(() => m.react("5️⃣")).then(() => m.react("6️⃣")).then(() => m.react("7️⃣")).then(() => m.react("8️⃣")).then(() => m.react("9️⃣"));

            const djCollector = m.createReactionCollector({ filter: dungeonPickerFilter, time: 60000 });

            djCollector.on('collect', (reaction, user) => {
                console.log(`djCollector : Collected ${reaction.emoji.name} from ${user.tag}`);
            });
        });

    }
}

function listAllDungeons() {
	console.log("listAllDungeons called");
	return (
		"__**1 - SoA**__ : Flèches de l'Ascension (Spires of Ascension) \n" +
		"__**2 - SD**__: Profondeurs Sanguines (Sanguine Depths) \n" +
		"__**3 - Mists**__ : Brume de Tirna Scithe (Mists of Tirna Scithe) \n" +
		"__**4 - PF**__: Malepeste (Plaguefall) \n" +
		"__**5 - HoA**__ : Salles de l'Expiation (Halls of Atonement) \n" +
		"__**6 - NW**__: Sillage Necrotique (Necrotic Wake) \n" +
		"__**7 - DOS**__ : L'Autre Côté (De Other Side) \n" +
		"__**8 - TOP**__ : Théâtre de la Souffrance (Theater of Pain) \n" +
		"__**9 - Taza**__ : Tazavesh");
}

module.exports = DungeonPicker