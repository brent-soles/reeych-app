const meta = [
    {
        belongsTo: 0,
        details: "Meeting at X at Y PM",
        questions: "1. lasjf;laksdf;?\n2.fasdfasdfasf\n\ta.)fasdfasdf?",
        notes: "* LOLOL\n* Hello"
    },
    {
        belongsTo: 2,
        details: "Meeting at A at B PM",
        questions: "1. lasjf;laksdf;?\n2.fasdfasdfasf\n\ta.)fasdfasdf?",
        notes: "* LOLOL\n* Hello"
    }

]


const cards = [
    {
        id: 0,
        belongsTo: 12,
        title: "New",
        author: "Brent",
        description: "desc",
        
        meta: meta[0]
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
        belongsTo: 13,
        title: "New2",
        author: "Brent2",
        description: "desc2",
        meta: meta[1],
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
    spaces,
    meta
}