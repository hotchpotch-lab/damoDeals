const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('deals').setDescription('Sync api and Replies with news infos or nothing if nothing new!'),
  new SlashCommandBuilder().setName('help').setDescription('Replies with list of slash commands!'),
]
  .map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
