export function objectToString(cards){
    return cards.reduce((text, card) =>{
            text +=
            "Время: " + card.time + ",\n" +
            "Дата: " + card.date + ",\n" +
            "Тип машины: " + card.carType + ',\n' +
            "Масса: " + card.mass + ",\n" +
            "Откуда: " + card.from + ",\n" +
            "Куда: " + card.to + ",\n" +
            "Вид товара:" + card.goodType + ",\n" +
            "Цена:" + card.price + ",\n" +
             card.phone + '\n\n'

        return text
        },
        '')
}