const cards = [
    {
        id: 0,
        title: "New",
        author: "Brent",
        description: "desc",
        belongsTo: 12
    },
    {
        id: 3,
        title: "New3",
        author: "Brent3",
        description: "desc3",
        belongsTo: 13
    },
    {
        id: 1,
        title: "New1",
        author: "Brent1",
        description: "desc1",
        belongsTo: 12
    },
    {
        id: 2,
        title: "New2",
        author: "Brent2",
        description: "desc2",
        belongsTo: 13
    }
]

const spaces = [
    {
        id: 12,
        space: "swbible",
        numCards: cards.filter((card) => card.belongsTo === 12 ? card : false).length,
        spaceCards: cards.filter((card) => card.belongsTo === 12 ? card : false)
    },
    {
        id: 13,
        space: "swhills",
        numCards: cards.filter((card) => card.belongsTo === 13 ? card : false).length,
        spaceCards: cards.filter((card) => card.belongsTo === 13 ? card : false)
    }
]


module.exports = {
    cards,
    spaces
}