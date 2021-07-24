const centra = require("centra");
const { MessageEmbed } = require('discord.js');

class SlashCommand {
    constructor(bot_token, bot_id) {
        this.request = {
            "name": "",
            "description": ""
        };
        this.options = [];
        this.tokenPrefix = ("Bot") + " ";
        this.authToken = bot_token
        this.bot_id = bot_id;
        this.endpoints = {
            ENDPOINT: `https://discord.com/api/v8/applications/${this.bot_id}`,
            GUILD_ONLY: "/guilds/",
            COMMANDS: "/commands"
        }
    }

    /**
     * @param {String} name - Command Name
     * @return {Promise<SlashCommand>}
     */
    async setCommandName(name) {
        return new Promise(async (resolve) => {
            this.request.name = name;
            resolve(this);
        })
    }

    /**
     *
     * @param {String} description - command description
     * @return {Promise<SlashCommand>}
     */
    async setCommandDescription(description) {
        return new Promise(async (resolve) => {
            this.request.description = description;
            resolve(this);
        })
    }

    /**
     *
     * @param {String} name
     * @param {String} description
     * @param {boolean} required
     * @param {Array<Object>} choices
     * @param {String} choices.name
     * @param {String} choices.value
     * @param {int} type
     * @return {Promise<SlashCommand|*>}
     */
    async addOption(name, description, required = true, choices = [], type = 3) {
        return new Promise(async (resolve, reject) => {
            if (name === "") {
                reject("Option Name is undefined!");
            } else if (description === "") {
                reject("Option Description is undefined!")
            }
            this.options.push({
                "name": name,
                "description": description,
                "type": type,
                "required": required,
                "choices": choices
            })
            resolve(this);
        })
    }


}

class CreateSlashCommand extends SlashCommand {
    constructor(bot_token, bot_id) {
        super(bot_token, bot_id)
    }

    async createCommand(guild_id = "") {
        return new Promise(async (resolve, reject) => {
            let url;
            if (guild_id === "") {
                url = this.endpoints.ENDPOINT + this.endpoints.GUILD_ONLY + guild_id + this.endpoints.COMMANDS;
            } else {
                url = this.endpoints.ENDPOINT + this.endpoints.COMMANDS;
            }
            if (this.request.name === "") {
                reject("Command Name is undefined ");
            } else if (this.request.description === "") {
                reject("Command Description is undefined ");
            } else {
                let json;
                if (!this.options[0]) {
                    json = this.request;
                } else {
                    json = {
                        "name": this.request.name,
                        "description": this.request.description,
                        "options": this.options
                    }
                }
                await centra(
                    url,
                    "POST"
                ).body(json, "json")
                    .header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                    .send().then(res => {
                        resolve(verifyRes(res,200))
                    })
            }
        })
    }
}

class UpdateSlashCommand extends SlashCommand {
    constructor(bot_token, bot_id, command_id) {
        super(bot_token, bot_id);
        this.command_id = command_id;
    }

    async updateCommand(guild_id = "") {
        return new Promise(async (resolve, reject) => {
            let url;
            if (guild_id === "") {
                url = this.endpoints.ENDPOINT + this.endpoints.GUILD_ONLY + guild_id + this.endpoints.COMMANDS + "/" + this.command_id;
            } else {
                url = this.endpoints.ENDPOINT + this.endpoints.COMMANDS + "/" + this.command_id;
            }
            if (this.request.name === "") {
                reject("Command Name is undefined ");
            } else if (this.request.description === "") {
                reject("Command Description is undefined ");
            } else {
                let json;
                if (!this.options[0]) {
                    json = this.request;
                } else {
                    json = {
                        "name": this.request.name,
                        "description": this.request.description,
                        "options": this.options
                    }
                }
                await centra(
                    url,
                    "PATCH"
                ).body(json, "json")
                    .header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                    .send().then(res => {
                        resolve(verifyRes(res,200))
                    })
            }
        })
    }
}

class CreateSlashCommandRAW {
    constructor(bot_token, bot_id, command, guild_id= "") {
        return new Promise(async (resolve) => {
            this.tokenPrefix = ("Bot") + " ";
            this.authToken = bot_token
            this.bot_id = bot_id;
            this.endpoints = {
                ENDPOINT: `https://discord.com/api/v8/applications/${this.bot_id}`,
                GUILD_ONLY: "/guilds/",
                COMMANDS: "/commands"
            }
            let url;
            if (guild_id === "") {
                url = this.endpoints.ENDPOINT + this.endpoints.GUILD_ONLY + guild_id + this.endpoints.COMMANDS;
            } else {
                url = this.endpoints.ENDPOINT + this.endpoints.COMMANDS;
            }
            await centra(
                url,
                "POST"
            ).body(command, "json")
                .header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                .send().then(res => {
                    resolve(verifyRes(res, 200))
                })
        })
    }

}

class UpdateSlashCommandRAW {
    constructor(bot_token, bot_id, command, guild_id= "") {
        return new Promise(async (resolve) => {
            this.tokenPrefix = ("Bot") + " ";
            this.authToken = bot_token
            this.bot_id = bot_id;
            this.endpoints = {
                ENDPOINT: `https://discord.com/api/v8/applications/${this.bot_id}`,
                GUILD_ONLY: "/guilds/",
                COMMANDS: "/commands"
            }
            let url;
            if (guild_id === "") {
                url = this.endpoints.ENDPOINT + this.endpoints.GUILD_ONLY + guild_id + this.endpoints.COMMANDS;
            } else {
                url = this.endpoints.ENDPOINT + this.endpoints.COMMANDS;
            }
            await centra(
                url,
                "PATCH"
            ).body(command, "json")
                .header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                .send().then(res => {
                    resolve(verifyRes(res, 200))
                })
        })
    }

}

class DeleteSlashCommand {
    constructor(bot_token, bot_id) {
        this.tokenPrefix = ("Bot") + " ";
        this.authToken = bot_token
        this.bot_id = bot_id;
        this.endpoints = {
            ENDPOINT: `https://discord.com/api/v8/applications/${this.bot_id}`,
            GUILD_ONLY: "/guilds/",
            COMMANDS: "/commands"
        }
    }

    async deleteCommand(command_id, guild_id = "") {
        return new Promise(async (resolve) => {
            let url;
            if (guild_id === "") {
                url = this.endpoints.ENDPOINT + this.endpoints.GUILD_ONLY + guild_id + this.endpoints.COMMANDS + "/" + command_id;
            } else {
                url = this.endpoints.ENDPOINT + this.endpoints.COMMANDS + "/" + command_id;
            }
            await centra(
                url,
                "DELETE"
            ).header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                .send().then(res => {
                    resolve(verifyRes(res,204))
                })

        })
    }
}

class GetAllSlashCommands {
    constructor(bot_token, bot_id, guild_id = "") {
        return new Promise(async resolve => {
            this.tokenPrefix = ("Bot") + " ";
            this.authToken = bot_token
            this.bot_id = bot_id;
            this.endpoints = {
                ENDPOINT: `https://discord.com/api/v8/applications/${this.bot_id}`,
                GUILD_ONLY: "/guilds/",
                COMMANDS: "/commands"
            }
            let url;
            if (guild_id === "") {
                url = this.endpoints.ENDPOINT + this.endpoints.GUILD_ONLY + guild_id + this.endpoints.COMMANDS;
            } else {
                url = this.endpoints.ENDPOINT + this.endpoints.COMMANDS;
            }
                await centra(
                    url,
                    "GET"
                ).header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                    .send().then(res => {
                        resolve(verifyRes(res,200))
                    })
        })
    }
}

class Interaction {
    constructor(data, bot_token, bot_id) {
        this.authToken = bot_token;
        this.tokenPrefix = ("Bot") + " ";
        this.bot_id = bot_id;
        this.endpoints = {
            CALLBACK: `https://discord.com/api/v8/interactions/${data.id}/${data.token}/callback`,
            MESSAGES: `https://discord.com/api/v8/webhooks/${this.bot_id}/${data.token}/messages/@original`,
            FOLLOWUP: `https://discord.com/api/v8/webhooks/${this.bot_id}/${data.token}`
        };
        this.packet = {
            version: data.version,
            type: data.type,
            member: data.member,
            user: data.member.user,
            interaction: {
                id: data.id,
                token: data.token,
                guild_id: data.guild_id,
                channel_id: data.channel_id,
            },
            command: {
                id: data.data.id,
                options: data.data.options,
                name: data.data.name,
                guild_id: data.guild_id,
                channel_id: data.channel_id,
            },
            /**
             * @param {String} content
             * @param {Array<MessageEmbed>} embeds
             * @param {number} type
             * @return {undefined}
             */
            reply: async (content, embeds = [], type = 4) => {
                
                for (var i = 0; i < embeds.length; i++) {
                    embeds[i] = embeds[i].toJSON()
                }
                
                return new Promise(async (resolve, reject) => {
                    if (embeds.length > 10) {
                        reject("Reached Max Amount of Embeds, the Limit is 10 ");
                    }
                    
                    const json = {
                        "type": type,
                        "data": {
                            "content": content,
                            "embeds": embeds,
                        }
                    }
                    await centra(
                        this.endpoints.CALLBACK,
                        "POST"
                    ).body(json, "json")
                        .header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                        .send().then(res => {
                            resolve(verifyRes(res,204))
                        })
                })
            },

            /**
             * @param {String} content
             * @param {Array<MessageEmbed>} embeds
             * @return {Promise<RawMessage>}
             */
            replyEdit: async (content, embeds = []) => {
                
                for (var i = 0; i < embeds.length; i++) {
                    embeds[i] = embeds[i].toJSON()
                }
                
                return new Promise(async (resolve, reject) => {
                    if (embeds.length > 10) {
                        reject("Reached Max Amount of Embeds, the Limit is 10 ");
                    }
                    
                    const json = {
                        "content": content,
                         "embeds": embeds,
                    }
                    await centra(
                        this.endpoints.MESSAGES,
                        "PATCH"
                    ).body(json, "json")
                        .header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                        .send().then(res => {
                            resolve(verifyRes(res,200))
                        })
                })
            },

            replyDelete: async () => {
                return new Promise(async (resolve) => {
                    await centra(
                        this.endpoints.MESSAGES,
                        "DELETE"
                    ).header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                        .send().then(res => {
                            resolve(verifyRes(res,204))
                        })
                })
            },

            /**
             * @param {String} content
             * @return {Promise<RawMessage>}
             */
            followup: async (content) => {
                return new Promise(async (resolve) => {
                    const json = {
                        "content": content,
                    }
                    await centra(
                        this.endpoints.FOLLOWUP,
                        "POST"
                    ).body(json, "json")
                        .header("Authorization", `${this.tokenPrefix}${this.authToken}`)
                        .send().then(res => {
                            resolve(verifyRes(res,200))
                        })
                })
            }
        };
        return this.packet;
    }
}

function verifyRes(res, expected_code) {
    return new Promise(async(resolve) => {
        if(res.statusCode === expected_code) {
            if((new Buffer(res.body)).toString('utf8') === "") {
                resolve(JSON.parse("{}"));
            } else {
                resolve(JSON.parse((new Buffer(res.body)).toString('utf8')))
            }
        } else {
            console.error("Warning Unexpected Status Code!")
            console.log(res.statusCode)
            if((new Buffer(res.body)).toString('utf8') === "") {
                resolve(JSON.parse("{}"));
            } else {
                resolve(JSON.parse((new Buffer(res.body)).toString('utf8')))
            }
        }
    })
}

const ApplicationCommandOptionType = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8
}

module.exports = {
    CreateSlashCommand,
    UpdateSlashCommand,
    DeleteSlashCommand,
    GetAllSlashCommands,
    Interaction,
    ApplicationCommandOptionType
};
