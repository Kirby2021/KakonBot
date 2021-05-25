const {
	Collection,
	Client,
	Discord,
	Intents,
	MessageEmbed,
	MessageAttachment
} = require('discord.js');
const fs = require('fs');
const client = new Client({
	disableEveryone: true,
	ws: {
		intents: Intents.ALL
	}
});

module.exports = client;

const config = require('config.json')

const Levels = require('discord-xp')

Levels.setURL(config.mongoDB)

const mongoose = require('mongoose');
mongoose
	.connect(
		config.mongoDB,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
const distube = require('distube')
const player = new distube(client, { leaveOnEmpty: true, leaveOnFinish: true , leaveOnStop: false, searchSongs: true });
let set = new Set()

const prefixSchema = require('./models/prefix');
const path = require('path');
const logSchema = require('./models/modlogs');
const usersMap = new Map()
const autoSchema = require('./models/invites');
const pingSchema = require('./models/ghostping');
const { success , error } = require('./config.json')
const banSchema = require('./models/bans');
const botSchema = require('./models/chatbot')
const blacklistWord = require('./models/n-word')
const whitelistChannel = require('./models/white-list-word')
const altlog = require('./models/alt-logs')
const dmMessage = require('./models/dm')
const replySchema = require('./models/reply')
const ghostSchema = require('./models/ghostlogs')
const levelSchema = require('./models/level')
const kickSchema = require('./models/kicks');
const muteSchema = require('./models/mutes')
const welcomeMessageSchema = require('./models/welcome-message')
const leaveMessageSchema = require('./models/leave-message')
const antiPingSchema = require('./models/anti-ping')
const verifySchema = require('./models/verify');
const moment = require('moment')
const altSchema = require('./models/alt');
const mailSchema = require('./models/modmail')
const JoinSchema = require('./models/join');
const afkSchema = require('./reconDB');
const blacklistSchema = require('./models/blacklist-server');
const LeaveSchema = require('./models/leave');
const schema = require('./models/custom-command');
const onlySchema = require('./models/only');
const RoleSchema = require('./models/autorole');
const Currency = new Collection();
const fetch = require('node-fetch')
const balschema = require('./schema');
const config = require('./config.json');
const warnSchema = require('./models/warns')
const spamSchema = require('./models/spam')
const reactionSchema = require('./models/reaction-roles')
const prefix = config.prefix;
const owner = config.ownerID;
const token = config.token;
const Timeout = new Collection();
const ms = require('ms');
const express = require('express');
const keepAlive = require('./server.js');
const db = require('./models/command');
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
['ommand'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.modlogs = async function({ Member, Action, Color, Reason}, message) {
	const data = await logSchema.findOne({ Guild: message.guild.id });
	if(!data) return;
	
	const channel = await message.guild.channels.cache.get(data.Channel)
	if(!channel) return data.delete()
	const logsEmbed = new MessageEmbed()
		.setColor(Color)
		.setTitle(`Kakon Moderation`)
		.addField(`Information`, [
			`Action: ${Action}`,
			`Member: ${Member.user.tag} (${Member.id})`,
			`Reason: ${Reason}`,
			`Action By: ${message.author.tag} (${message.author.id})`
		])
		.setThumbnail(Member.user.displayAvatarURL({dynamic: true}))
		.setDescription(`Action Channel: ${message.channel} (${message.channel.id})`)
	channel.send(logsEmbed)
}

player
  .on('playSong', (message, queue, song) => {
  message.channel.send(new MessageEmbed().setTitle(`Song Played`).setDescription(`Song: **${song.name}**`).setImage(`${song.thumbnail + `?size=4096`}`).setColor("RANDOM").setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })).addField(`Information`, [
    `[Link (URL)](${song.url})`,
    `Duration: ${song.formattedDuration}`,
    `Views: ${song.views}`,
    `Likes: ${song.likes}`,
    `Dislikes: ${song.dislikes}`,
    `Is Live ? ${song.isLive}`
  ]))
})
  .on("addList", (message, queue, playlist) => {
    message.channel.send(new MessageEmbed().setTitle(`Song Added`).setDescription(`Added **${song.name}** - **${song.formattedDuration}** to playlist`).setColor("RANDOM"))
  })
  .on("empty", (message) => {
    message.channel.send(new MessageEmbed().setTitle(`Voice Channel`).setDescription(`No one in voice channel. Clearing queue and leaving the voice channel...`).setColor("RANDOM"))
  })
  .on('error', (message, error) => {
    message.channel.send(new MessageEmbed().setTitle(`An error occured`).setDescription(`\`\`\`${error}\`\`\``).setColor("RED"))
    message.channel.send(`If the error is: \`song is not define\`, use \`stop\` command and play again. Join the support server for more support`)
  })
  .on("finish", (message) => {
    message.channel.send(`No song in queue. Leaving the voice channel...`)
  })
  .on('noRelated', (message) => {
    message.channel.send(`Queue is empty. No related song found. Leaving the voice channel...`)
  })
  .on("playList", (message, queue, playlist, song) => {
    message.channel.send(
    new MessageEmbed()
      .setTitle(`Playlist`)
      .setDescription(`Playing Playlist **${playlist.name}**\nSongs Size ${playlist.songs.length}\nNow Playing: **${song.name}** - **${song.formattedDuration}**`).setColor("RANDOM").setFooter(`Requested by: ${message.guild.members.cache.get(song.user.id).user.tag}`)
  )})
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(`**Choose a song from below**\n\`\`\`${result.map(song => `${++i} | ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\`\`\`*Enter anything else or wait 60 seconds to cancel*`).then(msg => msg.delete({ timeout: "60000" }))
  })
  .on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 100;
  })
client.player = player;
client.distube = distube;

/**
 * @param {Client} client
 */
client.prefix = async function(message) {
	let custom;

	const data = await prefixSchema.findOne({ Guild: message.guild.id });

	if (data) {
		custom = data.Prefix;
	} else {
		custom = prefix;
	}
	return custom;
};

client.on('ready', () => {
	client.user.setActivity(`${prefix}help | Mention the bot to know the prefix`)
	console.log(`${client.user.username} Yes`);
	keepAlive();
});
client.on('message', async message => {
	await onlySchema.findOne({ Guild: message.guild.id }, async (err, data) => {
		if (!data) {
			commandRun(message)
		} else {
      let channel = message.guild.channels.cache.get(data.Channel)
      if(!channel) { 
        commandRun(message)
        }
        if (channel) {
				if (message.channel.id !== channel.id) return;
				commandRun(message)
		}
    }
}
)
})
client.on('guildMemberAdd', async member => {
	RoleSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;
		if (data) {
			const role = member.guild.roles.cache.find(role => role.id == data.Role);
			if (!role) {
				console.log(
					`Auto Role: ${data.Role} for ${member.guild.id} was deleted`
				);
				return data.delete()
			}
			member.roles.add(role.id);
		}
	});
	JoinSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;
		if (data) {
			const channelD = await member.guild.channels.cache.find(
				channel => channel.id == data.Channel
			);
			if (!channelD) {
				data.delete()
				return console.log(
					`Join Leave Logs Channel: ${data.Channel} for ${
						member.guild.id
					} was deleted , Deleting schema...`
				);
			}
			const embed = new MessageEmbed()
				.setTitle(`${member.user.tag} has joined the server`)
				.setDescription(`**Members: #${member.guild.memberCount}**`)
				.setFooter(`User ID: ${member.user.id}`)
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setTimestamp()
				.setColor('GREEN');
			channelD.send(embed);
		}
	});
	banSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		const banReason = 'Auto Ban Activated';
		if (!data) return;
		if (data) {
			member.ban({
				reason: banReason
			});
			member.send(
				new MessageEmbed()
					.setTitle(`Auto Ban Module Notice`)
					.setDescription(
						`You have banned from **${
							member.guild.name
						}** with reason: **${banReason}**`
					)
					.setColor('RED')
			);
		}
	});
	kickSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		const kickReason = 'Auto Kick Activated';
		if (!data) return;
		if (data) {
			member.kick(kickReason);
			member.send(
				new MessageEmbed()
					.setTitle(`Auto Kick Module Notice`)
					.setDescription(
						`You have kicked from **${
							member.guild.name
						}** with reason: **${kickReason}**`
					)
					.setColor('RED')
			);
		}
	});
	verifySchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;
		if (data) {
			member.send(
				new MessageEmbed()
					.setTitle(`Kakon Verify`)
					.setDescription(
						`**Hey ! ${
							member.guild.name
						} need verify before you can chat and talk with everyone. To verify, go to <#${
							channel.id
						}> . Then type: \`\`${p}verify\`\` . After that, react with :white_check_mark: that confirm you aren't robot !**`
					)
					.setColor('BLUE')
			);
		}
	})
	altSchema.findOne({ Guild: member.guild.id},async(err,data) => {
	  if(!data) return;
	  if(data.Avatar == 'Enabled') {
	    if(member.user.avatar == null) {
        await member.send(new MessageEmbed()
          .setTitle(`Kakon Alt Identifier`)
          .setDescription(`You were kicked from **${member.guild.name}** | **This account is suspected of being alt**`)
          .setColor("RED")
          .setTimestamp()
        ).catch(err => {
          member.kick('This account is suspected of being alt')
        })
	      await member.kick('This account is suspected of being alt')
	    }
    }
    if(data.Days == '0') return;
      let x = Date.now() - member.user.createdAt;
      let created = Math.floor(x / 86400000);
    let AltAge = data.Days
    if(created >= AltAge) return;
    if(created < AltAge) {
      await member.send(new MessageEmbed()
          .setTitle(`Kakon Alt Identifier`)
          .setDescription(`You were kicked from **${member.guild.name}** | **Age Of This Account Is Below Age Requirements**`)
          .setColor("RED")
          .setTimestamp()
        ).catch(err => {
          member.kick(`Age Of This Account Is Below Age Requirements`)
        })
	      await member.kick(`Age Of This Account Is Below Age Requirements`)
    }
      await altlog.findOne({ Guild: member.guild.id }, async(err,data1) => {
          if(!data1) return;
        const channel = await member.guild.channels.cache.get(data1.Channel)
        const embed = new MessageEmbed()
          .setTitle(`Kakon Alt Identifier`)
		  .setDescription(`**Caution: New Alts Found !!**`)
          .addField(`General Information`, [
            `Name: ${member.user.username}`,
            `Discriminator: ${member.user.discriminator}`
          ])
          .addField(`Additional Information`, [
            `Bot: ${member.user.bot}`,
            `Created: ${moment(member.user.createdTimestamp).format(
                    "LT"
                )} ${moment(member.user.createdTimestamp).format(
                    "LL"
                )}  ${moment(member.user.createdTimestamp).fromNow()}`,
            `Joined: ${moment(member.joinedTimestamp).format(
                    "LT"
                )} ${moment(member.joinedTimestamp).format(
                    "LL"
                )}  ${moment(member.joinedTimestamp).fromNow()}`,
            `Avatar: ${member.user.avatar || `No Avatar`}`,
            `Minimum Ages: ${data.Days} days`
          ])
          .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
          .setColor("RED")
          .setFooter(`Kicked That Alts`)
        channel.send(embed)
        })
	  })
    welcomeMessageSchema.findOne({ Guild: member.guild.id }, async(err, data) => {
      if(err) throw err
      if(!data) return;
      const channel = await member.guild.channels.cache.get(data.Channel)
      if(!channel) return data.delete()
      const text = data.Text
      const user = text.replace(/{user}/,`<@${member.user.id}>`).replace(/{server}/,member.guild.name).replace(/{user.tag}/,member.user.tag).replace(/{user.id}/, member.user.id).replace(/{members}/,member.guild.memberCount)
      channel.send(user)
    })
dmMessage.findOne({ Guild: member.guild.id }, async(err, data) => {
      if(err) throw err
      if(!data) return;
      const text = data.Text
      const user = text.replace(/{user}/,`<@${member.user.id}>`).replace(/{server}/,member.guild.name).replace(/{user.tag}/,member.user.tag).replace(/{user.id}/, member.user.id).replace(/{members}/,member.guild.memberCount)
      member.send(user)
    })
})

client.on('guildMemberRemove', async member => {
	LeaveSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;
		if (data) {
			const channelD = await member.guild.channels.cache.find(
				channel => channel.id == data.Channel
			);
			if (!channelD) {
				await JoinSchema.findOneAndDelete({ Guild: member.guild.id });
				return console.log(
					`Join Leave Logs Channel: ${data.Channel} for ${
						member.guild.id
					} was deleted , Deleting schema...`
				);
			}
			const embed = new MessageEmbed()
				.setTitle(`${member.user.tag} has left the server`)
				.setDescription(`**Members: #${member.guild.memberCount}**`)
				.setFooter(`User ID: ${member.user.id}`)
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setTimestamp()
				.setColor('RED');
			channelD.send(embed);
		}
	})
  leaveMessageSchema.findOne({ Guild: member.guild.id }, async(err, data) => {
      if(err) throw err
      if(!data) return;
      const channel = await member.guild.channels.cache.get(data.Channel)
      if(!channel) return data.delete()
      const text = data.Text
      const user = text.replace(/{user}/,`<@${member.user.id}>`).replace(/{server}/,member.guild.name).replace(/{user.tag}/,member.user.tag).replace(/{user.id}/, member.user.id).replace(/{members}/,member.guild.memberCount)
      channel.send(user)
    })
});

client.on('guildDelete', async guild => {
	await prefixSchema.findOneAndDelete({ Guild: guild.id });
	console.log(`Deleted Prefix For ${guild.id}`);
  await onlySchema.findOneAndDelete({ Guild: guild.id })
  console.log(`Deleted Lock Channel Module for ${guild.id}`)
});

client.on('guildBanAdd', async (guild, user) => {
	logSchema.findOne({ Guild: guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: guild.id });
				console.log(`Delete Log For Guild: ${guild.id}`);
			} else {
				log.send(
					new MessageEmbed()
						.setDescription(`**<@${user.id}> was banned**`)
						.setTimestamp()
						.setThumbnail(user.displayAvatarURL({ dynamic: true }))
						.setColor('RED')
				);
			}
		}
	})
});

client.on('guildBanRemove', async (guild, user) => {
	logSchema.findOne({ Guild: guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: guild.id });
				console.log(`Delete Log For Guild: ${guild.id}`);
			} else {
				log.send(
					new MessageEmbed()
						.setDescription(`**<@${user.id}> was unbanned**`)
						.setTimestamp()
						.setThumbnail(user.displayAvatarURL({ dynamic: true }))
						.setColor('GREEN')
				);
			}
		}
	});
});

client.on('messageDelete', async message => {
	logSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await message.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: message.guild.id });
				console.log(`Delete Log For Guild: ${message.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Message Deleted`)
							.setColor('RED')
							.addField(`Content`, message.content)
							.addField(`Author`, message.author)
							.addField(`Channel`, message.channel)
							.setTimestamp()
					)
			}
		}
	});
  pingSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
    if(message.mentions.members.first()) {
      message.channel.send(new MessageEmbed()
        .setTitle(`Ghost Ping Detected`)
        .addField(`Author`, message.author.tag, true)
        .addField(`Content`, message.content, true)
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      )
    }
  })
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
	logSchema.findOne({ Guild: oldMessage.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldMessage.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldMessage.guild.id });
				console.log(`Delete Log For Guild: ${oldMessage.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Message Updated`)
							.setColor('YELLOW')
							.addField(`Old Content`, oldMessage.content)
							.addField(`New Content`, newMessage.content)
							.addField(`Author`, oldMessage.author)
							.addField(`Channel`, oldMessage.channel)
							.setTimestamp()
					)
					.catch(err => {
						message.channel.send(`I cannot send message to logs channel`);
					});
			}
		}
	});
  pingSchema.findOne({ Guild: oldMessage.guild.id }, async(err, data) => {
    if(!data) return;
    if(oldMessage.mentions.members.first()) {
      if(!newMessage.mentions.members.first()) return oldMessage.channel.send(new MessageEmbed()
        .setTitle(`Ghost Ping Detected`)
        .addField(`Author`, oldMessage.author.tag, true)
        .addField(`Old Content`, oldMessage.content, true)
        .addField(`New Content`, newMessage.content, true)
        .setColor("RANDOM")
        .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
      )
    }
  })
});

client.on('channelDelete', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Channel Deleted`)
							.setColor('RED')
							.addField(`Channel`, channel.name)
							.addField(`Position`, channel.position)
							.addField(`Category`, channel.parent ? null : `No Category`)
							.setTimestamp()
					)
					.catch(err => {
						message.channel.send(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('roleCreate', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Role Created`)
							.setColor('GREEN')
							.addField(`Role`, channel)
							.addField(`Position`, channel.position)
							.addField(`ID`, channel.id)
							.setTimestamp()
					)
					.catch(err => {
						message.channel.send(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('roleDelete', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Role Deleted`)
							.setColor('GREEN')
							.addField(`Role`, channel.name)
							.addField(`Position`, channel.position)
							.addField(`ID`, channel.id)
							.setTimestamp()
					)
					.catch(err => {
						message.channel.send(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('inviteCreate', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Invite Created`)
							.setColor('GREEN')
							.addField(`Invite`, channel)
							.setTimestamp()
					)
					.catch(err => {
						message.channel.send(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('inviteDelete', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Invite Deleted`)
							.setColor('RED')
							.addField(`Invite`, channel)
							.setTimestamp()
					)
					.catch(err => {
						message.channel.send(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('channelCreate', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send(
						new MessageEmbed()
							.setTitle(`Channel Created`)
							.setColor('GREEN')
							.addField(`Channel`, channel.name)
							.addField(`Position`, channel.position)
							.addField(`Category`, channel.parent ? null : `No Category`)
							.setTimestamp()
					)
					.catch(err => {
						message.channel.send(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
	logSchema.findOne({ Guild: oldChannel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldChannel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldChannel.guild.id });
				console.log(`Delete Log For Guild: ${oldChannel.guild.id}`);
			} else {
				if (oldChannel.topic !== newChannel.topic) {
					log.send(
						new MessageEmbed()
							.setTitle(`Channel Topic Updated`)
							.addField(`Channel`, oldChannel)
							.addField(`Old Topic`, oldChannel.topic)
							.addField(`New Topic`, newChannel.topic)
							.setColor('YELLOW')
							.setTimestamp()
					);
				} else if (oldChannel.name !== newChannel.name) {
					log.send(
						new MessageEmbed()
							.setTitle(`Channel Name Updated`)
							.addField(`Channel`, oldChannel)
							.addField(`Old Name`, oldChannel.name)
							.addField(`New Name`, newChannel.name)
							.setColor('YELLOW')
							.setTimestamp()
					);
				} else if (oldChannel.parent !== newChannel.parent) {
					log.send(
						new MessageEmbed()
							.setTitle(`Channel Category Updated`)
							.addField(`Channel`, oldChannel)
							.addField(`Old Category`, oldChannel.parent)
							.addField(`New Category`, newChannel.parent)
							.setColor('YELLOW')
							.setTimestamp()
					);
				} else if (
					oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser
				) {
					log.send(
						new MessageEmbed()
							.setTitle(`Channel Slowmode Updated`)
							.addField(`Channel`, oldChannel)
							.addField(
								`Old Slowmode`,
								oldChannel.rateLimitPerUser + ` seconds`
							)
							.addField(
								`New Slowmode`,
								newChannel.rateLimitPerUser + ` seconds`
							)
							.setColor('YELLOW')
							.setTimestamp()
					);
				}
			}
		}
	});
});

client.on('roleUpdate', async (oldRole, newRole) => {
	logSchema.findOne({ Guild: oldRole.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldRole.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldRole.guild.id });
				console.log(`Delete Log For Guild: ${oldRole.guild.id}`);
			} else {
				if (oldRole.name !== newRole.name) {
					log.send(
						new MessageEmbed()
							.setTitle(`Role Name Updated`)
							.addField(`Role`, oldRole)
							.addField(`Old Name`, oldRole.name)
							.addField(`New Name`, newRole.name)
							.setColor('YELLOW')
							.setTimestamp()
					);
				} else if (oldRole.color !== newRole.color) {
					log.send(
						new MessageEmbed()
							.setTitle(`Role Color Updated`)
							.addField(`Role`, oldRole)
							.addField(`Old Color`, oldRole.color)
							.addField(`New Color`, newRole.color)
							.setColor('YELLOW')
							.setTimestamp()
					);
				}
			}
		}
	});
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	logSchema.findOne({ Guild: oldMember.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldMember.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldMember.guild.id });
				console.log(`Delete Log For Guild: ${oldMember.guild.id}`);
			}
			if (oldMember.user.tag !== newMember.user.tag) {
				log.send(
					new MessageEmbed()
						.setTitle(`Member Updated`)
						.addField(`Member`, oldMember)
						.addField(`Old Username`, oldMember.user.tag)
						.addField(`New Username`, newMember.user.tag)
						.setColor('YELLOW')
						.setTimestamp()
				);
			} else if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
				log.send(
					new MessageEmbed()
						.setTitle(`Member Role Changed`)
						.addField(`Member`, oldMember)
						.addField(
							`Before`,
							oldMember.roles.cache.map(role => role.toString()).join(' , ')
						)
						.addField(
							`After`,
							newMember.roles.cache.map(role => role.toString()).join(' , ')
						)
						.setColor('YELLOW')
						.setTimestamp()
				);
			}
		}
	});
});

client.on('guildCreate', async guild => {
  const botOwner = await client.users.cache.get('736636650796351559')
  if(!botOwner) return;
	await botOwner.send(
		new MessageEmbed()
			.setTitle(`Added To New Server`)
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addField(`Guild`, guild.name + ' / ' + guild.id)
			.setColor('GREEN')
			.addField(`Members`, guild.memberCount)
			.addField(`Humans`, guild.members.cache.filter(u => !u.user.bot).size)
			.addField(`Bots`, guild.members.cache.filter(u => u.user.bot).size)
			.addField(`Owner`, guild.owner.user.tag + ' / ' + guild.owner.user.id)
			.addField(
				`Created`,
				new Date(guild.createdTimestamp).toLocaleDateString()
			)
	);
	await afkSchema.set(`currency-${message.guild.id}+${client.user.id}`,`$`)
});

client.on('message', async message => {
  botSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
      if(message.channel.id !== data.Channel) return;
       if(message.author.bot) return
        fetch(
            `http://api.brainshop.ai/get?bid=155789&key=zwmzFPL6wE2pYi0A&uid=0&msg=${encodeURIComponent(message)}` // API For ChatBot
        ).then(response => response.json()).then(d => {
                const response = d.cnt.toLocaleString();
                message.reply(response)
            });
  })
})

client.on('message', async message => {
  if(!message.guild) return;
	const validURL = str => {
		var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
		if (!regex.test(str)) {
			return false;
		} else {
			return true;
		}
	};
	if (validURL(message.content)) {
    if(message.member.hasPermission("ADMINISTRATOR")) return;
		const data = await autoSchema.findOne({ Guild: message.guild.id })
		if(!data) return;
		const reason = "No Links Allowed";
		const member = message.member;
		if(data.Action == 'ban') {
      await message.member.send(new MessageEmbed()
        .setTitle(`Kakon Auto Moderation`)
        .setDescription(`You were banned from **${message.guild.name}** with reason: ${reason}. Message Content: \`${message.content}\`. Duration: Permanently`)
        .setColor("RED")
      ).catch(async err => {
        message.member.ban({
				reason: `[KAKON AUTO MODERATION] - ${reason}`
			})
			await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author.tag} was banned with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
      })
			await message.member.ban({
				reason: reason,
			})
			await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author.tag} was banned with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
		}
			if(data.Action == 'kick') {
			await message.member.send(new MessageEmbed()
        .setTitle(`Kakon Auto Moderation`)
        .setDescription(`You were kicked from **${message.guild.name}** with reason: **${reason}**. Message Content: \`${message.content}\``)
        .setColor("RED")
      ).catch(async err => {
        message.member.kick(`[KAKON AUTO MODERATION] - ${reason}`)
		await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author.tag} was kicked with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
      })
      await message.member.kick(`[KAKON AUTO MODERATION] - ${reason}`)
	  await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author.tag} was kicked with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
		}
			if(data.Action == 'delete') {
			await message.delete()
			await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author} Removed message with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
			.then(msg => msg.delete({ timeout: '5000' }))
		}
			if(data.Action == 'mute') {
			await muteSchema.findOne({ Guild: message.guild.id }, async(err, data2) => {
        if(err) throw err;
        if(!data2) return message.channel.send(`**[KAKON AUTO MODERATION] No Muted Role Set !**`)
        const role = await message.guild.roles.cache.get(data2.Role)
        if(!role) return message.channel.send(`**[KAKON AUTO MODERATION] Muted Role is deleted !**`);
        if(message.member.roles.cache.get(role.id)) return message.channel.send(`**[KAKON AUTO MODERATION] You are muted already**`)
        await message.member.roles.add(role.id,`[KAKON AUTO MODERATION] - ${reason}`)
        await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author.tag} was muted with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
         await message.member.send(new MessageEmbed()
        .setTitle(`Kakon Auto Moderation`)
        .setDescription(`You were muted from **${message.guild.name}** with reason: ${reason}. Message Content: \`${message.content}\``)
        .setColor("RED")
        )
      })
		}
			if(data.Action == 'unmute') {
			await muteSchema.findOne({ Guild: message.guild.id }, async(err, data2) => {
        if(err) throw err;
        if(!data2) return message.channel.send(`**[KAKON AUTO MODERATION] No Muted Role Set**`)
        const role = await message.guild.roles.cache.get(data2.Role)
        if(!role) return message.channel.send(`**[Kakon Auto Moderation] Muted Role is deleted**`);
        if(!message.member.roles.cache.get(role.id)) return message.channel.send(`**[KAKON AUTO MODERATION] You are unmuted already**`)
        await message.member.roles.remove(role.id,`[KAKON AUTO MODERATION] - ${reason}`)
       await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author.tag} was unmuted with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
        await message.member.send(new MessageEmbed()
        .setTitle(`Kakon Auto Moderation`)
        .setDescription(`You were unmuted from **${message.guild.name}** with reason: ${reason}. Message Content: \`${message.content}\``)
        .setColor("RED")
        )
      })
		}
    if(data.Action == 'warn') {
      const user = message.member
      function generateRandomString(length){
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()';
        var random_string = '';
        if(length > 0){
          for(var i=0; i < length; i++){
              random_string += chars.charAt(Math.floor(Math.random() * chars.length));
          }   
}
return random_string  
}
const random = generateRandomString(10)
        warnSchema.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data2) => {
            if(err) throw err;
            if(!data2) {
                data2 = new warnSchema({
                    guildid: message.guild.id,
                    user : user.user.id,

                    content : [
                        {
                            moderator : client.user.id,
                            reason : reason,
                            ID: random,
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator : client.user.id,
                    reason : reason,
                    ID: random,
                }
                data2.content.push(obj)
            }
            data2.save()
        });
		await message.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${message.author.tag} was warned with reason \`${reason}\` | Punishment ID \`${random}\`**`)
        .setColor("GREEN")
        )
    await message.member.send(new MessageEmbed()
        .setTitle(`Kakon Auto Moderation`)
        .setDescription(`You were warned at **${message.guild.name}** with reason: ${reason}. Message Content: \`${message.content}\``)
        .setColor("RED")
        )
    }
	}
})

client.on('message', async message => {
  if(!message.guild) return;
  if(message.author.id == client.user.id) return;
  if(message.content.length == 0) return;
 if(message.member.hasPermission("MANAGE_MESSAGES")) return;
  const spilittedMsg = message.content.split("")
  const reason = "N-Words"
  let deleting = false;
  whitelistChannel.findOne({ Guild: message.guild.id }, async(err,data1) => {
    if(data1) {
      if(data1.Channel.includes(message.channel.id)) return;
      blacklistWord.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
    data.Words.forEach(c => {
      if(message.content.toLowerCase().includes(c)) {
        message.channel.send(new MessageEmbed().setDescription(`**${success} ${message.author} Successfully deleted message ID \`${message.id}\` with reason \`${reason}\`**`).setColor("GREEN"))
        message.delete()
        return
      }
    })
  })
    } else {
      blacklistWord.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
    data.Words.forEach(c => {
      if(message.content.toLowerCase().includes(c)) {
        message.channel.send(new MessageEmbed().setDescription(`**${success} ${message.author} Successfully deleted message ID \`${message.id}\` with reason \`${reason}\`**`).setColor("GREEN"))
        message.delete()
      }
    })
  })
    }
  })
})

client.on('message', async message => {
  if(!message.guild) return;
  if(message.author.id == client.user.id) return;
  if(message.content.length == 0) return;
 if(message.member.hasPermission("MANAGE_MESSAGES")) return;
  const spilittedMsg = message.content.split("")
  const reason = "Anti-Ping"
  let deleting = false;
  antiPingSchema.findOne({ Guild: message.guild.id }, async(err,data1) => {
    if(data1) {
      const member = message.mentions.members.first()
      if(member) {
        if(data1.Member.includes(member.id)) {
          message.channel.send(new MessageEmbed().setDescription(`**${success} You can't ping \`${member.user.tag}\`**`).setColor("ORANGE"))
        message.delete()
        }
      }
    }
  })
})

client.on("messageReactionAdd", async(messageReaction, user) => {
  const { message , emoji } = messageReaction;
  if(client.user.id == user.id) return;
  await reactionSchema.findOne({
    Guild: message.guild.id,
    Channel: message.channel.id,
    Message: message.id,
    Emoji: emoji
  }, async(err, data) => {
    if(!data) return
    const role = await message.guild.roles.cache.get(data.Role)
    if(!role) return data.delete()
    const member = await message.guild.members.cache.get(user.id)
    await member.roles.add(role)
    await member.send(new MessageEmbed().setTitle(`Role Added`).setColor("GREEN").setDescription(`You were given role 
    \`${role.name}\` by reacted ${emoji}`))
  })
})

client.on("messageReactionRemove", async(messageReaction, user) => {
  const { message , emoji } = messageReaction;
  if(client.user.id == user.id) return;
  await reactionSchema.findOne({
    Guild: message.guild.id,
    Channel: message.channel.id,
    Message: message.id,
    Emoji: emoji
  }, async(err, data) => {
    if(!data) return
    const role = await message.guild.roles.cache.get(data.Role)
    if(!role) return data.delete()
    const member = await message.guild.members.cache.get(user.id)
    await member.roles.remove(role)
    await member.send(new MessageEmbed().setTitle(`Role Removed`).setColor("RED").setDescription(`You were lost role 
    \`${role.name}\` by unreacted ${emoji}`))
  })
})

async function commandRun(message) {
  const p = await client.prefix(message)
  if (message.author.bot) return;
			if (await afkSchema.has(`afk-${message.member.id}+${message.guild.id}`)) {
				const info = await afkSchema.get(
					`afk-${message.member.id}+${message.guild.id}`
				);
				await afkSchema.delete(`afk-${message.member.id}+${message.guild.id}`);
				message
					.reply(`**Your AFK is deleted: ${info}**`)
					.then(msg => msg.delete({ timeout: 5000 }));
			}
			if (message.mentions.members.first()) {
				if (
					await afkSchema.has(
						`afk-${message.mentions.members.first().id}+${message.guild.id}`
					)
				) {
					message.reply(
						'**' +
							message.mentions.members.first().user.username +
							' is AFK. Reason: ' +
							(await afkSchema.get(
								`afk-${message.mentions.members.first().id}+${message.guild.id}`
						)) +
							'**'
					);
				}
      if(message.mentions.users.first().id == client.user.id) message.channel.send(
					new MessageEmbed()
						.setTitle(`Hey !`)
						.setDescription(
							`Hmm... My Prefix on this server is **\`\`${p}\`\`** ! Mentions me again if you forget my prefix`
						)
						.setThumbnail(message.guild.iconURL())
						.setColor('RANDOM')
						.setFooter(
							`Requested by ${message.author.tag}`,
							message.author.displayAvatarURL({ dynamic: true })
						)
				);
			}
    await levelSchema.findOne({ Guild: message.guild.id },async(err, data) => {
      if(!data) return;
      const randomAmountOfXp = Math.floor(Math.random() * 99) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`Congrats ! ${message.author}, You just leveled up to **${user.level}** :tada:`);
    }
    })
	if (!message.content.startsWith(p)) return;
			if (!message.member)
				message.member = await message.guild.fetchMember(message);
			await blacklistSchema.findOne(
				{ Guild: message.guild.id, User: message.member.id },
				async (err, data) => {
					if (!data) {
						const args = message.content
							.slice(p.length)
							.trim()
							.split(/ +/g);
						const cmd = args.shift().toLowerCase();
						if (cmd.length == 0) return;
						const data = await schema.findOne({
							Guild: message.guild.id,
							Command: cmd
						});
						if (data) return message.channel.send(data.Response);
						let command = client.commands.get(cmd);
						if (!command)
							command = client.commands.get(client.aliases.get(cmd));
						if (command) {
							const check = await db.findOne({ Guild: message.guild.id });
							if (check) {
								if (check.Cmds.includes(command.name))
									return message.channel.send(
										new MessageEmbed()
											.setTitle(`Error`)
											.setThumbnail(message.guild.iconURL({ dynamic: true }))
											.setDescription(
												`**An error occured ! Administrator || Bot Owner has disabled command \`\`${p}${
													command.name
												}\`\`. So You cannot use it now**`
											)
											.setColor('RED')
											.setFooter(`Not now`)
									);
								if (command.timeout) {
									const tim = command.timeout / 1000
									if (Timeout.has(`${command.name}${message.author.id}`))
										return message.channel.send(
											new MessageEmbed()
												.setTitle(`Error`)
												.setColor('RED')
												.setThumbnail(
													message.author.displayAvatarURL({ dynamic: true })
												)
												.setDescription(
													`You are on cooldown of \`${command.name}\`. Cooldown for this command is \`${tim + " seconds"}\``
										)
										)
									command.run(client, message, args, success, error);
									Timeout.set(
										`${command.name}${message.author.id}`,
										Date.now() + command.timeout
									);
									setTimeout(() => {
										Timeout.delete(`${command.name}${message.author.id}`);
									}, command.timeout);
								} else {
									command.run(client,message,args)
								}
							} else {
								if (command.timeout) {
									const tim = command.timeout / 1000
									if (Timeout.has(`${command.name}${message.author.id}`))
										return message.channel.send(
											new MessageEmbed()
												.setTitle(`Error`)
												.setColor('RED')
												.setThumbnail(
													message.author.displayAvatarURL({ dynamic: true })
												)
												.setDescription(
													`You are on cooldown of \`${command.name}\`. Cooldown for this command is \`${tim + " seconds"}\``
										)
										)
									command.run(client, message, args);
									Timeout.set(
										`${command.name}${message.author.id}`,
										Date.now() + command.timeout
									);
									setTimeout(() => {
										Timeout.delete(`${command.name}${message.author.id}`);
									}, command.timeout);
								} else {
									command.run(client,message,args)
								}
							}
						}
					} else {
						message.channel.send(
							new MessageEmbed()
								.setTitle(`Blacklisted Notice`)
								.setDescription(
									`You have been blacklisted from using Kakon by <@${
										message.guild.ownerID
									}> . Reason: ${data.Reason}`
								)
								.setColor('RED')
						);
					}
				}
			);
}

client.on('message', async (msg) => {
  if(msg.author.bot) return;
  let reason = 'Spamming'
  await spamSchema.findOne({ Guild: msg.guild.id }, async(err,data) => {
    if(!data) return;
    if(data.Messages <= 2) return data.delete();
    if(usersMap.has(msg.author.id)) {
      const userData = usersMap.get(msg.author.id)
      let msgCount = userData.msgCount;
      if(parseInt(msgCount) === data.Messages) {
        if(data.Action == 'ban') {
                if(msg.member.bannable) return msg.channel.send(`**[KAKON AUTO MODERATION] I can't ban ${msg.member}**`)
                msg.guild.members.ban(msg.member, {
                  reason: reason
                })
                msg.channel.send(`Banned ${msg.member} with reason **${reason}**`)
              } else if(data.Action == 'kick') {
                 if(msg.member.kickable) return message.channel.send(`**[KAKON AUTO MODERATION] I can't kick ${msg.member}**`)
                msg.member.kick(reason)
                msg.channel.send(`Kicked ${msg.member} with reason **${reason}**`)
              } else if(data.Action == 'mute') {
			await muteSchema.findOne({ Guild: msg.guild.id }, async(err, data2) => {
        if(err) throw err;
        if(!data2) return msg.channel.send(`**[KAKON AUTO MODERATION] No Muted Role Set !**`)
        const role = await msg.guild.roles.cache.get(data2.Role)
        if(!role) return msg.channel.send(`**[KAKON AUTO MODERATION] Muted Role is deleted !**`);
        if(msg.member.roles.cache.get(role.id)) return msg.channel.send(`**[KAKON AUTO MODERATION] You are muted already**`)
        await msg.member.roles.add(role.id,`[KAKON AUTO MODERATION] - ${reason}`)
        await msg.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${msg.author.tag} was muted with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
         await msg.member.send(new MessageEmbed()
        .setTitle(`Kakon Auto Moderation`)
        .setDescription(`You were muted from **${msg.guild.name}** with reason: ${reason}. Message Content: \`${msg.content}\``)
        .setColor("RED")
        )
      })
		} else if(data.Action == 'unmute') {
			await muteSchema.findOne({ Guild: msg.guild.id }, async(err, data2) => {
        if(err) throw err;
        if(!data2) return msg.channel.send(`**[KAKON AUTO MODERATION] No Muted Role Set**`)
        const role = await msg.guild.roles.cache.get(data2.Role)
        if(!role) return msg.channel.send(`**[Kakon Auto Moderation] Muted Role is deleted**`);
        if(!msg.member.roles.cache.get(role.id)) return msg.channel.send(`**[KAKON AUTO MODERATION] You are unmuted already**`)
        await msg.member.roles.remove(role.id,`[KAKON AUTO MODERATION] - ${reason}`)
       await msg.channel.send(new MessageEmbed()
        	.setDescription(`**${success} ${msg.author.tag} was unmuted with reason \`${reason}\`**`)
        .setColor("GREEN")
        )
        await msg.member.send(new MessageEmbed()
        .setTitle(`Kakon Auto Moderation`)
        .setDescription(`You were unmuted from **${msg.guild.name}** with reason: ${reason}. Message Content: \`${msg.content}\``)
        .setColor("RED")
        )
      })
		} else if(data.Action == 'warn') {
      function generateRandomString(length){
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()';
        var random_string = '';
        if(length > 0){
          for(var i=0; i < length; i++){
              random_string += chars.charAt(Math.floor(Math.random() * chars.length));
          }   
}
return random_string  
}
const random = generateRandomString(10)
        warnSchema.findOne({ guildid: msg.guild.id, user: msg.member.user.id}, async(err, data2) => {
            if(err) throw err;
            if(!data2) {
                data2 = new warnSchema({
                    guildid: msg.guild.id,
                    user : msg.member.user.id,

                    content : [
                        {
                            moderator : client.user.id,
                            reason : reason,
                            ID: random,
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator : client.user.id,
                    reason : reason,
                    ID: random,
                }
                data2.content.push(obj)
            }
            data2.save()
        });
	   msg.channel.send(new MessageEmbed()
        	.setDescription(`**${msg.author.tag} was warned with reason \`${reason}\` | Punishment ID \`${random}\`**`)
        .setColor("GREEN")
        )
    }
      } else {
      msgCount++
      userData.msgCount = msgCount;
      usersMap.set(msg.author.id, userData)
    }
    } else {
      usersMap.set(msg.author.id, {
        msgCount: 1,
        lastMessage: msg,
        timer: null
      })
      setTimeout(() => {
        usersMap.delete(msg.author.id);
        console.log(`${msg.author.id} Removed from map`)
      }, 5000)
    }
  })
})

client.bal = id =>
	new Promise(async ful => {
		const data = await balschema.findOne({ id });
		if (!data) return ful(0);
		ful(data.coins);
	});
client.add = (id, coins) => {
	balschema.findOne({ id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.coins += coins;
		} else {
			data = new balschema({ id, coins });
		}
		data.save();
	});
};
client.rmv = (id, coins) => {
	balschema.findOne({ id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.coins -= coins;
		} else { 
			data = new balschema({ id, coins: -coins });
		}
		data.save();
	});
};

client.login(config.token);
   