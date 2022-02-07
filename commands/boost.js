const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, Message } = require('discord.js');

let button1 = new MessageButton()
    .setCustomId('primary')
    .setLabel('Primary')
    .setStyle('PRIMARY');

const filter = (reaction, user) => {
    return ["✅", "❌"].includes(reaction.emoji.name);
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boost')
        .setDescription('New boost'),
    execute(interaction) {
        interaction.reply("Check your DMs to create the boost").then(() => setTimeout(() => interaction.deleteReply(), 5000));

        const boostEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Title #xxxx')
            .setAuthor({ name: "sweqt" })
            .setDescription('#xxxx desc')
            .addFields(
                { name: 'Regular field title', value: 'Some value here title1' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here 1', inline: true },
                { name: 'Inline field title', value: 'Some value here 2', inline: true },
            )
            .addField('Inline field title', 'Some value here alone', true)
            .setTimestamp()
            .setFooter({ text: 'Some footer text here' });

        interaction.user.send({ embeds: [boostEmbed] }).then(embedMessage => {
            embedMessage.react("✅").then(() => embedMessage.react("❌")).then(() => {
                embedMessage.awaitReactions({ filter, max: 1, time: 5000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        console.log("found reaction !");
                        console.log(reaction.emoji.name);
                    })
                    .catch(() => {
                        embedMessage.reply("finished collecting");
                    })
            })

        });
    },
};
