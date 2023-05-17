import 'dotenv/config'
import  TelegramBot from "node-telegram-bot-api"
import {config} from "./config/index.js";
import { getNewCardsWithPhone } from "./helpers/getNewCardsWithPhone.js"
import { getNewSearchPageCards } from "./helpers/getNewSearchPageCards.js";
import { objectToString } from "./helpers/objectToString.js";
import { sleep } from "./helpers/sleep.js";

const allActualCards = []

const bot = new TelegramBot(config.telegramBotToken, {polling: true});

bot.on('message', async (msg) => {
    const newSearchPageCards = await getNewSearchPageCards(allActualCards, false)
    if(newSearchPageCards.status === 'success' && newSearchPageCards.result.length > 0){
        const cardsWithPhone = await getNewCardsWithPhone(newSearchPageCards.result)
        bot.sendMessage(msg.chat.id, objectToString(cardsWithPhone))
    }else if(newSearchPageCards.status === 'error'){
        bot.sendMessage(msg.chat.id, "Случилась ошибка", newSearchPageCards.message )
    }else{
        bot.sendMessage(msg.chat.id, "Случилась ошибка", "Нет карточек")
    }
})

async function initApp(){
    while(true){
        const newSearchPageCards = await getNewSearchPageCards(allActualCards, true)
        if(newSearchPageCards.status === 'success' && newSearchPageCards.result.length > 0){
            const cardsWithPhone = await getNewCardsWithPhone(newSearchPageCards.result)
            bot.sendMessage(config.telegramGroupId, objectToString(cardsWithPhone))
            allActualCards.push(...cardsWithPhone)
        }else if(newSearchPageCards.status === 'error'){
            bot.sendMessage(config.telegramGroupId, newSearchPageCards.message)
        }
        await sleep(10000)
    }
}

initApp()
