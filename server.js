import 'dotenv/config'
import  TelegramBot from "node-telegram-bot-api"
import {config} from "./config/index.js";
import { getNewSearchPageCards } from "./helpers/getNewSearchPageCards.js";
import { objectToString } from "./helpers/objectToString.js";
import { sleep } from "./helpers/sleep.js";

const allActualCards = []

const bot = new TelegramBot(config.telegramBotToken, {polling: true});

bot.on('message', async (msg) => {
    const newSearchPageCards = await getNewSearchPageCards(allActualCards)
    allActualCards.push(...newSearchPageCards.result)

    if(newSearchPageCards.status === 'success' && newSearchPageCards.result.length > 0){
        bot.sendMessage(msg.chat.id, objectToString(newSearchPageCards.result))
    }else if(newSearchPageCards.status === 'error'){
        bot.sendMessage(msg.chat.id, objectToString(newSearchPageCards.result))
    }
})

async function initApp(){
    while(true){
        const newSearchPageCards = await getNewSearchPageCards(allActualCards)
        allActualCards.push(...newSearchPageCards.result)
        if(newSearchPageCards.status === 'success' && newSearchPageCards.result.length > 0){
            bot.sendMessage(config.telegramGroupId, objectToString(newSearchPageCards.result))
        }else if(newSearchPageCards.status === 'error'){
            bot.sendMessage(config.telegramGroupId, newSearchPageCards.message)
        }
        await sleep(120000)
    }
}

initApp()