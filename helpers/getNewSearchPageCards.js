import * as api from "../api/search.js";
import { parse } from "node-html-parser";
export async function getNewSearchPageCards(allActualCards){
    try{
        const data = await api.fetchSearchPage()
        const root = parse(data)
        const list = root.querySelector('#request_list_main')
        const cards = list.querySelectorAll('.request_card')
        const cardsAsObject = cards.map(card => {
            const requestCardHeader = card.querySelector('.request_card_header .time_string')
            const requestCardHeaderLeft = card.querySelector('.request_card_header_left')
            const requestCardRoute = card.querySelector('.request_distance')

            const id = card?.attrs?.['data-request_id']
            const price = card.querySelector('.price_main')
            const goodType = card.querySelector('.request_text')
            const [ date, carType, mass ] = requestCardHeaderLeft.querySelectorAll('.request_data')
            const [ from,,to] = requestCardRoute.querySelectorAll('span')

            if(price && price.querySelector('.price_diff_arrow_block')){
                price.querySelector('.price_diff_arrow_block').remove()
            }

            return {
                id: id,
                time: requestCardHeader?.text?.trim() || 'Время не указано',
                date: date?.text?.trim() || '',
                carType: carType?.text?.trim() || '',
                mass: mass?.text?.trim() || '',
                from: from?.text?.trim() || '',
                to: to?.text?.trim() || '',
                goodType: goodType?.text?.trim() || "Вид товара не указан",
                price: price?.text?.trim() || "Цена не указана"
            }
        })

        const shymkentFilteredCards = cardsAsObject.filter(card => card.from.toLowerCase().includes('шымкент'))

        return {
            status: 'success',
            message: "Успешно отработано",
            result: shymkentFilteredCards.filter((card) => allActualCards.findIndex(actualCard => card.id === actualCard.id) === -1)
        }
    }catch(e){
        return {
            status: 'error',
            message: e?.message || "Случилась ошибка",
            result: []
        }
    }
}