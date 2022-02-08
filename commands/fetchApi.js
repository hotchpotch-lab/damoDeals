const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('sync')
    .setDescription('sync deals api'),
  async execute(interaction) {
    const response = await fetch('https://www.gamerpower.com/api/giveaways');
    const data = await response.json();
    console.log(data[0]);
    await interaction.reply('I\'m looking for new deals');
    for (let i = 0; i < 2; i++) {
      const givewayEmbed = new MessageEmbed()
        .setColor('#280137')
        .setTitle(data[i].title)
        .setAuthor({ name: 'damoDeals', url: 'https://github.com/Damokless' })
        .setDescription(data[i].description)
        .setImage(data[i].image)
        .setFooter({ text: 'Made by Damokles' });
      interaction.channel.send({ embeds: [givewayEmbed] });
    }
  },
};
