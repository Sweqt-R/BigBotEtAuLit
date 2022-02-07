const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const SPECIFIC_DUNGEON = "Do you need a specific dungeon ?";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Create a report'),
	execute(interaction) {
		interaction.reply("Check your DMs to create the report").then(() => setTimeout(() => interaction.deleteReply(), 5000));

		interaction.user.send(SPECIFIC_DUNGEON).then(message => {
			message.react("✅").then(() => message.react("❌")).then(() => {

				const filter = (reaction, user) => {
					return ["✅", "❌"].includes(reaction.emoji.name) && user.id === interaction.user.id;
				};

				const collector = message.createReactionCollector({ filter, max:1, time: 60000 });

				collector.on('collect', (reaction, user) => {
					// console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
					switch (reaction.emoji.name) {
						case "✅":
							// List all dungeons and collect user input
							interaction.user.send(listAllDungeons()).then((m) => {
								m.react("1️⃣").then(() => m.react("2️⃣")).then(() => m.react("3️⃣")).then(() => m.react("4️⃣")).then(() => m.react("5️⃣")).then(() => m.react("6️⃣")).then(() => m.react("7️⃣")).then(() => m.react("8️⃣"))
							
							});
							// 	const msgFilter = m => interaction.user.id === user.id;

							// 	const msgCollector = message.channel.createMessageCollector({ msgFilter, max:1, time: 10000})

							// 	console.log("here");
							// 	msgCollector.on('collect', msg => {
							// 		console.log("did it");
							// 		console.log(`msgCollector : Collected ${msg.content}`);
							// 	});

							// 	msgCollector.on('end', collected => {
							// 		console.log(`msgCollector : Collected ${collected.size} items`);
							// 	});

							// });

							break;

						case "❌":
							console.log("no");
							break;
						default:
							console.log("idk");
							break;
					}

				});

				collector.on('end', collected => {
					// console.log(`Collected ${collected.size} items`);
				});
			})
		})
	},
};

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
		"__**8 - TOP**__ : Théâtre de la Souffrance (Theater of Pain)");
}
