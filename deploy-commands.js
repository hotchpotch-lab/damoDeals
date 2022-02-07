const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

// Prod command
/* rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error); */

// Dev command
rest.put(Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_SERVER_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
