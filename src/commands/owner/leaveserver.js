const { Command } = require('sylphy');
const masterkeys = require('../../../masterkeys.json');

class LeaveServer extends Command {
    constructor(...args) {
        super(...args, {
            name: 'leaveserver',
            group: 'owner',
            cooldown: 5,
            options: { guildsOnly: true },
            usage: [
                { name: 'server', displayName: 'server', type: 'string', optional: false, last: true }
            ]
        })
    }

    handle ({ args, client, msg }, responder) {
        if (msg.author.id === masterkeys.ownerID) {
            const server = args.server; //id of the server

            return client.guilds.get(server).leave.then(() => { return responder.send(' ', {embed: {
                color: 0xea9a94,
                title: `I have successfully left ${server}!`
            }})}).catch(this.logger.error).then((error) => { return responder.send(' ', {embed: {
                color: 0xff4b4b,
                title: `Error leaving ${server}`,
                description: `${error}`
            }})});
        }
    }
}

module.exports = LeaveServer;