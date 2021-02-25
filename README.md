# slash-commands
## By: ArviX

Discord Slash Commands and with interactions!

##Init
`npm install discord-slash-commands`

##Usage
###Create Command
**ONLY when deploying the command, if you do it multiple times, Discord will be bugged**
```js
let command = new CreateSlashCommand(client.token, client.user.id)
    command.setCommandName("say")
    command.setCommandDescription("Say avec le bot")
    command.addOption("text", "Texte", true)
    command.createCommand()
```
###Interact with commands
#### Discord.js
```js
client.ws.on("INTERACTION_CREATE", async data => {
    const interaction = new Interaction(data, client.token, client.user.id);
    if (interaction.command.name === "say") {
        await interaction.reply(interaction.command.options[0].value)
    }
})
```
#### Eris
```js
client.on("rawWS", async(packet) => {
    if (packet.t === "INTERACTION_CREATE") {
        const data = packet.d;
        const interaction = new Interaction(data, client.token, client.user.id);
        if (interaction.command.name === "say") {
            await interaction.reply(interaction.command.options[0].value)
        }
    }
})
```

