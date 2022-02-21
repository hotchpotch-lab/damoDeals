const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Replies help embed'),
  async execute(interaction) {
    const helpEmbed = new MessageEmbed()
      .setColor('#280137')
      .setTitle('Help embed')
      .setAuthor({ name: 'damoDeals', url: 'https://github.com/Damokless' })
      .setDescription('Command that references all the commands executable by the bot')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'help', value: 'Displays the help embed' },
        { name: 'ping', value: 'Reply pong!' },
        { name: 'sync', value: 'Reply pong!' },
      )
      .setFooter({ text: 'Made by Damokles' });
    await interaction.reply({ embeds: [helpEmbed] });
  },
};
