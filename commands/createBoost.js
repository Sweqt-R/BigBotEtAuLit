const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');
const DungeonPicker = require('../util/DungeonPicker.js');
// import * as dgPicker from '../util/DungeonPicker.js';

const HOW_MANY = "Combien de clés ?"
const SPECIFIC_DUNGEON = "Donjon(s) spécifique(s) ?";

module.exports = {

	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Créer un boost'),
	execute(interaction) {
		interaction.reply("Check tes DMs pour créer le boost").then(() => setTimeout(() => interaction.deleteReply(), 10000));

		const howManyFilter = response => {
			return parseInt(response);
		}

		let numberOfKeys;

		interaction.user.send(HOW_MANY).then(message => {
			message.channel.awaitMessages({ filter: howManyFilter, max: 1, time: 60000, errors: ['time']}).then(collected => {
				interaction.user.send(`${collected.first().author} and message is : ${collected.first().content}`)
				numberOfKeys = collected.first().content;
				console.log("number of keys :" + numberOfKeys);
			})
			.catch(collected => {
				interaction.user.send("Response timed out");
			})
			;
		});


		// interaction.user.send(SPECIFIC_DUNGEON).then(message => {
		// 	message.react("✅").then(() => message.react("❌")).then(() => {

		// 		const specificDungeonFilter = (reaction, user) => {
		// 			// console.log("user.id1 : " + user.id + " interaction.user.id1 : " + interaction.user.id)
		// 			return ["✅", "❌"].includes(reaction.emoji.name) && user.id === interaction.user.id;
		// 		};

		// 		const collector = message.createReactionCollector({ filter: specificDungeonFilter, max: 1, time: 60000 });

		// 		collector.on('collect', (reaction, user) => {
		// 			switch (reaction.emoji.name) {
		// 				case "✅":
		// 					// List all dungeons and collect user input
		// 					let dungeonPicker = new DungeonPicker();
		// 					dungeonPicker.doList(interaction);
		// 					break;
		// 				case "❌":
		// 					console.log("no");
		// 					break;
		// 				default:
		// 					console.log("idk");
		// 					break;
		// 			}

		// 		});

		// 		collector.on('end', collected => {
		// 			console.log(`Collected ${collected.size} items`);
		// 		});
		// 	})
		// })
	},
};

