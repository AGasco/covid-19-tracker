export const TYPE_UPDATED = "TYPE_UPDATED";

export const updateType = (type) => ({
  type: TYPE_UPDATED,
  payload: { type },
});
