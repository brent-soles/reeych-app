---
to: <% if( type === 'all' || type === 'mutation' ) { %>lib/resolvers/Mutations/<%= model %>Mutations.js<% } else { %><%= null %><% } %>
unless_exists: true
---

// Mutation resolvers for model: <%= model %>

/**
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} => request context (ctx) 
 * @param {*} info 
 */
const create<%= h.changeCase.pascalCase(model) %> = async (_, args, ctx, info) => {
    try{
        // Add resolver logic here
        return null;
    } catch(err){
        throw err;
    }
}


/**
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} => request context (ctx) 
 * @param {*} info 
 */
const update<%= h.changeCase.pascalCase(model) %> = async (_, args, ctx, info) => {
    try {
        // Add resolver logic here
        return null;
    } catch (err) {
        throw err;
    }
}


/**
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} => request context (ctx) 
 * @param {*} info  
 */
const delete<%= h.changeCase.pascalCase(model) %> = async (_, args, ctx, info) => {
    try {
        // Add resolver logic here
        return null;
    } catch(err){
        throw err;
    }
}

module.exports = {
    create<%= h.changeCase.pascalCase(model) %>,
    update<%= h.changeCase.pascalCase(model) %>,
    delete<%= h.changeCase.pascalCase(model) %>
}