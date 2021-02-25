const {CreateSlashCommandRAW, Interaction,  ApplicationCommandOptionType} = require("discord-slash-commands");
const {Client} = require("discord.js");

this.authToken = "YOUR SUPER SECRET BOT TOKEN";

const client = new Client();
client.login(this.authToken);

client.on("ready", async () => {
    console.log("Connected!");
    console.log(client.user.tag)
    await new CreateSlashCommandRAW(client.token, client.user.id, {
        "name": "say-anonim",
        "description": "Say command",
        "options": [{
            "name":"text",
            "value":"text",
            "required": true,
            "type": ApplicationCommandOptionType.STRING
        }]
    })
})

client.ws.on("INTERACTION_CREATE", async data => {
    const interaction = new Interaction(data, client.token, client.user.id);
    if (interaction.command.name === "say-anonim") {
        await interaction.followup(interaction.command.options[0].value)
    }
})