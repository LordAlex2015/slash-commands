const {CreateSlashCommand, Interaction} = require("discord-slash-commands");
const {Client} = require("discord.js");

this.authToken = "YOUR SUPER SECRET BOT TOKEN";

const client = new Client();
client.login(this.authToken);

client.on("ready", async () => {
    console.log("Connected!");
    console.log(client.user.tag)
    let command = new CreateSlashCommand(client.token, client.user.id)
    command.setCommandName("say")
    command.setCommandDescription("Say avec le bot")
    command.addOption("text", "Texte", true)
    command.createCommand()
})

client.ws.on("INTERACTION_CREATE", async data => {
    const interaction = new Interaction(data, client.token, client.user.id);
    if (interaction.command.name === "say") {
        await interaction.reply(interaction.command.options[0].value)
    }
})