import { setNotification } from './../Notifications';

export const Refill = (obj, name, element, index) => {
    let tempObj = Object.assign([], obj)
    let addedMsg = []
    if (!element && !index) {
        const temp = tempObj.map(item => {
            if (item.stock === 0) {
                item.stock = 5;
                addedMsg.push(`Added ${item.stock} of ${item.name}`)
            } else if (item.stock < 5 && item.stock > 0) {
                let diff = 5 - item.stock;
                item.stock = diff;
                addedMsg.push(`Added ${diff} of ${item.name}`)
            }
            return item
        })
        setNotification(`Refill ${name}`, addedMsg.toString(), 'success')
        return temp;
    } else {
        tempObj[index].stock = 5;
        setNotification(`Refill ${name}`, `Added ${tempObj[index].stock} of ${element.name}`, 'success')
        return tempObj;
    }
};