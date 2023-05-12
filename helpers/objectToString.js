export function objectToString(cards){
    return cards.reduce((text, card) =>{
            text += `
                 Время: ${card.time}
                 Дата: ${card.date}
                 Тип машины: ${card.carType}
                 Масса: ${card.mass}
                 Откуда: ${card.from}
                 Куда: ${card.to}
                 Вид товара: ${card.goodType}
                 Цена: ${card.price}
                 `
        return text
        },
        '')
}