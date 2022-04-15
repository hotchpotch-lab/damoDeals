const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const todayDate = new Date();
let lastSyncDate = '2022-04-08 23:30:00';
let dealsCount = 0;


function sendData(data, interaction) {
  dealsCount += 1;
  const givewayEmbed = new MessageEmbed()
    .setColor('#280137')
    .setTitle(data.title)
    .setURL(data.open_giveaway)
    .addFields(
      { name: 'Type', value: data.type },
      { name: 'Platforms', value: data.platforms, inline: true },
      { name: 'Link', value: data.gamerpower_url, inline: true },
    )
    .setAuthor({ name: 'damoDeals', url: 'https://github.com/Damokless' })
    .setDescription(data.description)
    .setImage(data.image)
    .setFooter({ text: 'Made by Damokles' });
  interaction.channel.send({ embeds: [givewayEmbed] });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('search for new deals'),
  async execute(interaction) {
    const response = await fetch('https://www.gamerpower.com/api/giveaways');
    const data = await response.json();

    await interaction.reply('I\'m looking for new deals');

    // eslint-disable-next-line no-restricted-syntax
    for (const deal of data) {
      if (deal.published_date >= lastSyncDate) {
        sendData(deal, interaction);
      }
    }

    if (dealsCount === 0) {
      interaction.channel.send(`No deals for the moment last search ${lastSyncDate}`);
    }
    lastSyncDate = todayDate.toISOString().replace('T', ' ').slice(0, -5);
    console.log(`last search date : ${lastSyncDate}`);
  },
};
