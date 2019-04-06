# Form Card - Design Doc

## Data transmission

### General

```javascript
  // ... other json stuff ...
  "card-5678": {
      id: "card-5678",
      title: "Another mock title",
      author: "Mock Author2",
      date: "2019-04-03",
      time: "1300"
    }
  // ... other json stuff ...
```
In general, a "card" will be stored in a global state object and referenced by it's ID.
Above is a mocked reference, there will be no such card ID as "card-5678". The ID will rather
be a "Short UUID", which is a compressed version of a guid. 

The above card represents the minimum amount of information needed to store a card in the backend.

Before the data is transmittied to the server, it will be wrapped in some information, and a cookie
will be sent along to verify/authorize the user to do so.

