export type ClanNode = {
   id: string;
   name: string;
   children?: ClanNode[];
};

export type Ethnicity = {
   id: string;
   name: string;
   clans: ClanNode[];
};

export const ETHNICITIES: Ethnicity[] = [
   {
      id: "somali",
      name: "Somali",
      clans: [
         {
            id: "darood",
            name: "Darood",
            children: [
               { id: "yusuf", name: "Yusuf" },
               { id: "kablalah", name: "Kablalah" },
               { id: "cisse", name: "Harti" },
               { id: "sade", name: "Cisse" },
               {
                  id: "tenade",
                  name: "tenade",
                  children: [
                     { id: "green", name: "green" },
                     { id: "yellow", name: "yellow" },
                  ],
               },
            ],
         },
         {
            id: "kablalah",
            name: "Kablalah",
            children: [
               { id: "Absame", name: "Absame" },
               {
                  id: "Kombe",
                  name: "Kombe",
                  children: [
                     { id: "white", name: "white" },
                     { id: "black", name: "black" },
                  ],
               },
               { id: "Harti", name: "Harti" },
            ],
         },
         {
            id: "harti",
            name: "Harti",
            children: [
               { id: "Dhulbahante", name: "Dhulbahante" },
               {
                  id: "Majeerteen",
                  name: "Majeerteen",
                  children: [
                     { id: "pink", name: "pink" },
                     { id: "red", name: "red" },
                  ],
               },
               {
                  id: "Dishiishe",
                  name: "Dishiishe",
                  children: [
                     { id: "orange", name: "orange" },
                     { id: "gold", name: "gold" },
                  ],
               },
               { id: "Warsangali", name: "Warsangali" },
            ],
         },
      ],
   },
   {
      id: "yoruba",
      name: "Yoruba",
      clans: [
         {
            id: "egba",
            name: "Egba",
            children: [
               { id: "abeokuta", name: "Abeokuta" },
               { id: "owu", name: "Owu" },
            ],
         },
         {
            id: "ijesha",
            name: "Ijesha",
            children: [
               { id: "olive", name: "olive" },
               { id: "grimson", name: "black" },
            ],
         },
         { id: "ondo", name: "Ondo" },
      ],
   },
];
