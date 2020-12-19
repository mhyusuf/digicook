const fakeState = {
  auth: {
    _id: '5fb64e41e8d419ff602cd0c3',
    googleId: '112538235083508704382',
    name: 'Pretty-cool Userson',
    email: 'cooluser@gmail.com',
    __v: 0,
  },
  collections: {
    collectionList: [
      {
        isPrivate: false,
        _recipes: ['5fb64ed5e8d419ff602cd0c5'],
        _id: '5fb64e5de8d419ff602cd0c4',
        name: 'The best collection',
        _user: {
          _id: '5fb64e41e8d419ff602cd0c3',
          googleId: '112538235083508704382',
          name: 'Pretty-cool Userson',
          email: 'cooluser@gmail.com',
          __v: 0,
        },
        description: 'Check it out!',
        __v: 0,
        image: {
          type: 'Buffer',
          data: [],
        },
      },
    ],
    collectionDetail: {
      isPrivate: false,
      _recipes: ['5fb64ed5e8d419ff602cd0c5'],
      _id: '5fb64e5de8d419ff602cd0c4',
      name: 'The best collection',
      _user: {
        _id: '5fb64e41e8d419ff602cd0c3',
        googleId: '112538235083508704382',
        name: 'Pretty-cool Userson',
        email: 'cooluser@gmail.com',
        __v: 0,
      },
      description: 'Check it out!',
      __v: 0,
      image: {
        type: 'Buffer',
        data: [],
      },
    },
    recipeList: [
      {
        name: 'Recipe 1',
        category: 'cat1',
        image: '',
        ingredients: [
          { name: 'ing11', quantity: '2' },
          { name: 'ing12', quantity: '3' },
          { name: 'ing13', quantity: '4' },
        ],
        instructions: 'Sample instructions 1',
      },
      {
        name: 'Recipe 2',
        category: 'cat2',
        image: '',
        ingredients: [
          { name: 'ing21', quantity: '9' },
          { name: 'ing22', quantity: '8' },
          { name: 'ing23', quantity: '7' },
        ],
        instructions: 'Sample instructions 2',
      },
    ],
    recipe: {
      _id: '5fb64ed5e8d419ff602cd0c5',
      name: "Johan's Birthday Surprise",
      category: 'beef',
      instructions:
        'Search round street corners in South London about 12am on Saturdays and Sundays. When approached, offer them a tenner to appear out of a cake.',
      ingredients: [
        {
          _id: '5fb64ed5e8d419ff602cd0c6',
          name: 'Sex appeal',
          quantity: '100mg',
        },
        {
          _id: '5fb64ed5e8d419ff602cd0c7',
          name: 'Charisma',
          quantity: '50g',
        },
        {
          _id: '5fb64ed5e8d419ff602cd0c8',
          name: 'Coconuts',
          quantity: '6kg',
        },
        {
          _id: '5fb64ed5e8d419ff602cd0c9',
          name: 'Veal',
          quantity: '10kg',
        },
        {
          _id: '5fb64ed5e8d419ff602cd0ca',
          name: 'Toes',
          quantity: '9',
        },
      ],
      _collection: '5fb64e5de8d419ff602cd0c4',
      _user: '5fb64e41e8d419ff602cd0c3',
      createdAt: '2020-11-19T10:54:13.571Z',
      updatedAt: '2020-11-19T10:54:13.678Z',
      __v: 0,
      image: {
        type: 'Buffer',
        data: [],
      },
    },
  },
  menus: false,
};

export default fakeState;
