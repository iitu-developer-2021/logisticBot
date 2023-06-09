import {parse} from "node-html-parser";
import {fetchPhoneNumber} from "../api/search.js";
import { sleep } from "./sleep.js";
export const getNewCardsWithPhone = async (cards) => {
    const newCards = []

    for(let card of cards){
       try{
           const data = await fetchPhoneNumber(card.id)
           console.log(data)
           const root = parse(data.request_info_block)
           const phone = root.querySelectorAll('.request_contacts .contact a')
           const phoneStr = phone.reduce((result, phoneItem, index) => {
               return result  + `Контакт${index + 1}: ${phoneItem.text.trim()},\n`
           }, '') || 'Контакт: Нет номера'

            newCards.push({
                ...card,
                phone: phoneStr
            })
           await sleep(3000)
       }catch(e){
           console.log(e.message, card.id)
           newCards.push({
               ...card,
               phone:  'Контакт: Нет номера'
           })
       }
    }

    return newCards
}