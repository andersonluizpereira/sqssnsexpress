module.exports = {
  vaccines: async function (event, context) {
    console.log(event);
    return event.data;
  },
};
