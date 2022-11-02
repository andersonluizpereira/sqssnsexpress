/* eslint-disable no-undef */
const create = jest.fn(() => ({
  get: jest.fn(() => Promise.resolve({ data: { count: 1 } })),
}));

module.exports = { create };
