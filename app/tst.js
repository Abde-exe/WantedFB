const linking = {
  prefixes: ['https://<domain-created-using-firebase-host'],
  config: {
    screens: {
      Root: {
        screens: {
          Tabone: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      Home: 'home',
      Settings: 'settings',
      Modal: 'modal',
      Post: {
        path: 'posts/:id',
        parse: {
          id: (id) => Number(id),
        },
      },
      NotFound: '*',
    },
  },
};
