export type TFriend = {
  name: string;
  isFavorite: boolean;
  isSingle: boolean;
};

export type TStop = {
  name: string;
  eta: number;
  offset: number;
};

export type TRoute = {
  id: string;
  stops: TStop[];
};

export function createStore() {
  // note the use of this which refers to observable instance of the store
  return {
    routes: [
      {
        id: "x111",
        stops: [
          {
            name: "a",
            offset: 50
          },
          {
            name: "b",
            offset: 100
          },
          {
            name: "c",
            offset: 150
          }
        ]
      },
      {
        id: "x222",
        stops: [
          {
            name: "x",
            offset: 100
          },
          {
            name: "y",
            offset: 200
          },
          {
            name: "z",
            offset: 300
          }
        ]
      }
    ] as TRoute[]
    // friends: [] as TFriend[],
    // makeFriend(name, isFavorite = false, isSingle = false) {
    //   const oldFriend = this.friends.find(friend => friend.name === name);
    //   if (oldFriend) {
    //     oldFriend.isFavorite = isFavorite;
    //     oldFriend.isSingle = isSingle;
    //   } else {
    //     this.friends.push({ name, isFavorite, isSingle });
    //   }
    // },
    // get singleFriends() {
    //   return this.friends.filter(friend => friend.isSingle);
    // }
  };
}

export type TStore = ReturnType<typeof createStore>;
//
