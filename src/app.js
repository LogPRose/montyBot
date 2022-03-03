import tmi from 'tmi.js'
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, BLOCKED_WORDS } from './constants';
import { COMMANDS } from './constants';
import { LAURENTSAI } from './constants';

const options = {
    options: { debug: true },
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}

const client = new tmi.Client(options);

//register message handler
client.on('message', onMessageHandler);

//connect to twitch chat
client.connect().catch(console.error);

client.on('message', (channel, userState, message, self) => {
	if(self) return;
    if(userState.username === BOT_USERNAME. message, self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userState.username}, heya!`);
	}
    //Banned word list
    checkTwitchChat (channel, userState, message, self)
    //!lurk
    lurkMessage (channel, userState, message)
    //!commands
    commandHelp (channel, message)
});

function checkTwitchChat(channel, userState, message, self) {
    message = message.toLowerCase()
    let shouldSendMessage = false
    if (self) return;
    if (userState.mod) return;
//check message
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))

//tell user
//delete message
    if (shouldSendMessage) {
        client.say(channel, `@${userState.username}, sorry! You're being sussy wussy`)
        client.deletemessage(channel, userState.id)
    }
}

function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot
    // Remove whitespace from chat message
    const commandName = msg.trim();

    if (commandName[0] !== '!') { return; }

    // If the command is known, let's execute it
    if (commandName === '!laurentsai') {

      client.say(target, LAURENTSAI[getRandomInt(LAURENTSAI.length)]);
      console.log(`* Executed ${commandName} command`);
    }
    else if (commandName === '!rank') {
      client.say(target, 'diamond1 PepegaAim');
      console.log(`* Executed ${commandName} command`);
    }
    else if (commandName == '!socials') {
        client.say(target, `Twitter: https://twitter.com/m0ntyirl  Youtube: https://www.youtube.com/channel/UCaPhi2nN1pJGZe3mLm-9mHw`);
    }
    else if (commandName === '!cheeeseuwu') {
      client.say(target, `@cheeeseuwu is a genius!`);
    }
    //else if (commandName == '!songrequest') {
    //  let
     // client.say(target, `@${userState.username}, added to queue!`);
  //}
    else {
      console.log(`* Unknown command ${commandName}`);
    }
  }

  function lurkMessage(channel, userState, message) {
      message = message.toLowerCase()
      const commandName = message.trim()
      if (commandName[0] !== '!') { return; }

      if (commandName === '!lurk') {

        client.say(channel, `@${userState.username}, thanks for lurking!`);
        console.log(`* Executed ${commandName} command`);
      }
  }

  function commandHelp (channel, message) {
    message = message.toLowerCase()
    const commandName = message.trim()
    if (commandName[0] !== '!') { return; }

    if (commandName === '!commands') {

      client.say(channel, `!laurentsai, !socials, !lurk, !commands, !cheeeseuwu`);
      console.log(`* Executed ${commandName} command`);
    }
  }

  function getRandomInt(max) {
      return Math.floor(Math.random() * (max - 1))
  }


  //Song Request
  /*function linkParsing(message) {
    message = message.toLowerCase()

  }*/
