export const MODE_1 = 'MODE_1';
export const MODE_2 = 'MODE_2';
export const MODE_3 = 'MODE_3';

export const AddTodoMode2 = (id, value) => ({
  type: MODE_2,
  payload: {
    id,
    value,
  },
});
