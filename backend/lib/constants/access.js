/**
 * USER = Limited Read Only for a Space 
 * SPACE_USER = Unlimited Read Only for a Space
 * SPACE_ADMIN = CRUD for a Space
 */
const USER = "USER"
const SPACE_USER = "SPACE_USER"
const SPACE_ADMIN = "SPACE_ADMIN" 

module.exports = Object.freeze({
        USER: 0, // Can read any public spaces
        SPACE_USER: 1, // Has access to a private space
        SPACE_ADMIN: 2 // Can administer a private space
});