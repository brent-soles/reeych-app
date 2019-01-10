
/** Returns a single card
 * 
 * @param {*} _ 
 * @param {*} args 
 * @param {*} ctx 
 * @param {*} info 
 */
const card = async (_, args, { dao }, info) => {
    const { CardsDAO } = dao;
    try{
        const card = await CardsDAO.get(args);
        return card;
    } catch(err) {
        console.log(err)
    }
    return null;
}

const cards = async (_, args, { dao }, info) => {
    const { CardsDAO } = dao;
    
    try {
        // Grabs cards and number of cards for data
        const cards = await CardsDAO.getAll(args);
        return cards;
    } catch(err) {
        console.log(err);
    }

    return null;
}

/** Returns a single space
 * 
 * @param {*} _ 
 * @param {*} args 
 * @param {*} ctx 
 * @param {*} info 
 */
const space = async (_, args, { dao }, info) => {
    const { SpacesDAO } = dao;
    try {
        let space = await SpacesDAO.get(args);
        return space;
    } catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {
    card,
    cards,
    space
}