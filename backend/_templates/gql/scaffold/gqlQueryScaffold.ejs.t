---
to: <% if( type === 'all' || type === 'query' ) { %>lib/resolvers/Queries/<%= h.changeCase.camelCase(model) %>Queries.js<% } else { %><%= null %><% } %>
unless_exists: true
---

// Query resolvers for model: <%= model %>

/** Returns a single object from <%= model %>
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx) 
 * @param {*} info 
 */
const get<%= h.changeCase.pascalCase(model) %> = async (_, args, ctx, info) => {
    try{
        // Add resolver logic here
        return null;
    } catch(err) {
        console.log(err)
    }
    return null;
}

/** Returns multiple objects from <%= model %>
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx)
 * @param {*} info 
 */
const get<%= h.changeCase.pascalCase(model) %>s = async (_, args, ctx, info) => {
    try {
        // Add resolver logic here
        return null;
    } catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {
    get<%= h.changeCase.pascalCase(model) %>,
    get<%= h.changeCase.pascalCase(model) %>s
}