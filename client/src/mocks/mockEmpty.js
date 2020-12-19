export const emptyCollection = {
  isPrivate: false,
  _recipes: [
    {
      name: '',
      quantity: '',
    },
    {
      name: '',
      quantity: '',
    },
    {
      name: '',
      quantity: '',
    },
  ],
  _id: '',
  name: '',
  _user: {
    _id: '',
    googleId: '',
    name: '',
    email: '',
    __v: 0,
  },
  description: '',
  __v: 0,
  image: {
    type: 'Buffer',
    data: [],
  },
};

export const emptyRecipe = {
  name: '',
  category: '',
  image: '',
  ingredients: [
    {
      name: '',
      quantity: '',
    },
    {
      name: '',
      quantity: '',
    },
    {
      name: '',
      quantity: '',
    },
  ],
  instructions: '',
};

export const emptyUser = {
  _id: '',
  googleId: '',
  name: '',
  email: '',
  __v: 0,
};
