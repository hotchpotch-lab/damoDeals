const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const todayDate = new Date();
const date = (`0${todayDate.getDate()}`).slice(-2);
const month = (`0${todayDate.getMonth() + 1}`).slice(-2);
const year = todayDate.getFullYear();
const hours = todayDate.getHours();
const minutes = todayDate.getMinutes();
const seconds = todayDate.getSeconds();
let lastSyncDate = '2022-12-21 23:30:00';


function sendData(data, interaction) {
  const givewayEmbed = new MessageEmbed()
    .setColor('#280137')
    .setTitle(data.title)
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

    for (let i = 0; i < Object.keys(data).length; i++) {
      data[i].published_date >= lastSyncDate ? sendData(data[i], interaction) : console.log('deal already sync');
    }
    lastSyncDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    console.log(lastSyncDate);
  },
};
