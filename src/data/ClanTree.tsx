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
               {
                  id: "harti",
                  name: "harti",
                  children: [
                     { id: "Majeerteen", name: "Majeerteen" },
                     { id: "Dhulbahnte", name: "Dhulbahnte" },
                     { id: "Warsangeli", name: "Warsangeli" },
                     { id: "Dishiishe", name: "Dishiishe" },
                  ],
               },
               {
                  id: "Absame",
                  name: "Absame",
                  children: [
                     { id: "Ogaden", name: "Ogaden" },
                     { id: "Jidwaq", name: "Jidwaq" },
                     { id: "Bartire", name: "Bartire" },
                     { id: "Yabare", name: "Yabare" },
                     { id: "Geri Koombe", name: "Geri Koombe" },
                     { id: "Aulihan", name: "Aulihan" },
                  ],
               },
               {
                  id: "Saade",
                  name: "Saade",
                  children: [
                     { id: "Marehan", name: "Marehan" },
                     { id: "Reer Xassan", name: "Reer Xassan" },
                     { id: "Reer Ugaas Shermarke", name: "Reer Ugaas Shermarke" },
                  ],
               },
               {
                  id: "Tanaad",
                  name: "Tanaad",
                  children: [
                     { id: "Leelkase", name: "Leelkase" },
                     { id: "Fardood", name: "Fardood" },
                  ],
               },
               {
                  id: "Yusuf",
                  name: "Yusuf",
                  children: [
                     { id: "Awrtable", name: "Awrtable" },
                     { id: "Dabarre", name: "Dabarre" },
                     { id: "Fiqi Cumar", name: "Fiqi Cumar" },
                  ],
               },
               {
                  id: "Ciise",
                  name: "Ciise",
                  children: [
                     {
                        id: "Ciise Maxamud",
                        name: "Ciise Maxamud",
                        children: [
                           { id: "Musse", name: "Musse" },
                           { id: "Maxamed", name: "Maxamed" },
                           { id: "Abokor", name: "Abokor" },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            id: "Hawiye",
            name: "Hawiye",
            children: [
               {
                  id: "Karanle",
                  name: "Karanle",
                  children: [
                     { id: "Wadere", name: "Wadere" },
                     { id: "Kadiir", name: "Kadiir" },
                     { id: "Murusade", name: "Murusade" },
                     { id: "Sahaawle", name: "Sahaawle" },
                  ],
               },
               {
                  id: "Gorgaarte",
                  name: "Gorgaarte",
                  children: [
                     {
                        id: "Duduble",
                        name: "Duduble",
                        children: [
                           { id: "Basin", name: "Basin" },
                           { id: "Celi", name: "Celi" },
                           { id: "Maqlisame", name: "Maqlisame" },
                           { id: "Habar Awradeen", name: "Habar Awradeen" },
                           { id: "Iijecle", name: "Iijecle" },
                           { id: "Aarsade", name: "Aarsade" },
                           { id: "Maxamed Camal", name: "Maxamed Camal" },
                           { id: "Da’uud", name: "Da’uud" },
                           { id: "Qadhoob", name: "Qadhoob" },
                        ],
                     },
                     {
                        id: "Mertiile",
                        name: "Mertiile",
                        children: [
                           { id: "Maxamed Aantin", name: "Maxamed Aantin" },
                           { id: "Wahbiye ", name: "Wahbiye " },
                           { id: "Camateen ", name: "Camateen " },
                           { id: "Fiqi Cumar ", name: "Fiqi Cumar " },
                        ],
                     },
                  ],
               },
               {
                  id: "Gugundhabe",
                  name: "Gugundhabe",
                  children: [
                     {
                        id: "Gaaljecel",
                        name: "Gaaljecel",
                        children: [
                           { id: "Makahiil Cumar", name: "Makahiil Cumar" },
                           { id: "Lahube", name: "Lahube" },
                           { id: "Abtisame", name: "Abtisame" },
                           { id: "Dirissame", name: "Dirissame" },
                           { id: "Aarwaaq", name: "Aarwaaq" },
                           { id: "Sooraanle", name: "Sooraanle" },
                           { id: "Haadow", name: "Haadow" },
                           { id: "Hilowle", name: "Hilowle" },
                           { id: "Qalafow", name: "Qalafow" },
                           { id: "Mugurmal", name: "Mugurmal" },
                           { id: "Barsame", name: "Barsame" },
                           { id: "Jijeele", name: "Jijeele" },
                        ],
                     },
                     {
                        id: "Baadicadde",
                        name: "Baadicadde",
                        children: [
                           { id: "Samaroob", name: "Samaroob" },
                           { id: "Maamiye", name: "Maamiye" },
                           { id: "Ilaabe", name: "Ilaabe" },
                           { id: "Ibraahim", name: "Ibraahim" },
                           { id: "Subeer", name: "Subeer" },
                           { id: "Caryahan", name: "Caryahan" },
                           { id: "Xaamud", name: "Xaamud" },
                           { id: "Afgaab", name: "Afgaab" },
                        ],
                     },
                     {
                        id: "Garre",
                        name: "Garre",
                        children: [
                           { id: "Tuuf", name: "Tuuf" },
                           { id: "Quranyow", name: "Quranyow" },
                        ],
                     },
                     {
                        id: "Degoodi",
                        name: "Degoodi",
                        children: [
                           { id: "Fardanow", name: "Fardanow" },
                           { id: "Midhimaal", name: "Midhimaal" },
                           { id: "Samatar", name: "Samatar" },
                           { id: "Maw", name: "Maw" },
                           { id: "Reer Maxamuud", name: "Reer Maxamuud" },
                           { id: "Fau", name: "Fau" },
                           { id: "Jibra’iil", name: "Jibra’iil" },
                           { id: "Dumaal", name: "Dumaal" },
                           { id: "Gelible", name: "Gelible" },
                        ],
                     },
                     {
                        id: "Masarre",
                        name: "Masarre",
                     },
                     {
                        id: "Ciise",
                        name: "Ciise",
                     },
                  ],
               },
               {
                  id: "Jambeelle",
                  name: "Jambeelle",
                  children: [
                     {
                        id: "Ajuuraan",
                        name: "Ajuuraan",
                        children: [
                           { id: "Gareen", name: "Gareen" },
                           { id: "Gelberis", name: "Gelberis" },
                           { id: "Waqla", name: "Waqla" },
                           { id: "Dulxata", name: "Dulxata" },
                           { id: "Gaashe", name: "Gaashe" },
                           { id: "Yibdalla", name: "Yibdalla" },
                        ],
                     },
                     {
                        id: "Moorshe",
                        name: "Moorshe",
                        children: [
                           { id: "Garure", name: "Garure" },
                           { id: "Olagir", name: "Olagir" },
                           { id: "Hinteere", name: "Hinteere" },
                           { id: "Aruure", name: "Aruure" },
                        ],
                     },
                  ],
               },
               {
                  id: "Xaskul",
                  name: "Xaskul",
                  children: [
                     { id: "Cali", name: "Cali" },
                     { id: "Hara’iid", name: "Hara’iid" },
                     { id: "Awsaan", name: "Awsaan" },
                     { id: "Idde", name: "Idde" },
                  ],
               },
               {
                  id: "Raarane",
                  name: "Raarane",
               },
               {
                  id: "Xawaadle",
                  name: "Xawaadle",
                  children: [
                     {
                        id: "Samatalis",
                        name: "Samatalis",
                        children: [
                           { id: "Dige", name: "Dige" },
                           { id: "Yuusuf (Abdi Yuusuf)", name: "Yuusuf (Abdi Yuusuf)" },
                           { id: "Faramage (Reer Ugaas)", name: "Faramage (Reer Ugaas)" },
                           { id: "Cabdalle", name: "Cabdalle" },
                        ],
                     },
                  ],
               },
               {
                  id: "Hiraab",
                  name: "Hiraab",
                  children: [
                     {
                        id: "Mudulood",
                        name: "Mudulood",
                        children: [
                           {
                              id: "Udeejeen",
                              name: "Udeejeen",
                              children: [
                                 { id: "Maxamed Samatar", name: "Maxamed Samatar" },
                                 { id: "Abaadir", name: "Abaadir" },
                                 { id: "Reer Raage ", name: "Reer Raage " },
                                 { id: "Abokor", name: "Abokor" },
                                 { id: "Macallin", name: "Macallin" },
                                 { id: "Yacquub", name: "Yacquub" },
                              ],
                           },
                           {
                              id: "Wacdaan",
                              name: "Wacdaan",
                              children: [
                                 { id: "Warqab", name: "Warqab" },
                                 { id: "Warqatinle", name: "Warqatinle" },
                                 { id: "Samakaay", name: "Samakaay" },
                                 { id: "Mooldheere", name: "Mooldheere" },
                                 { id: "Maalinle", name: "Maalinle" },
                                 { id: "Yabar", name: "Yabar" },
                              ],
                           },
                           {
                              id: "Abgaal",
                              name: "Abgaal",
                              children: [
                                 { id: "Ceynato", name: "Ceynato" },
                                 { id: "Daymacood", name: "Daymacood" },
                                 { id: "Damuumiye", name: "Damuumiye" },
                                 { id: "Daylacood", name: "Daylacood" },
                                 { id: "Atwaaq", name: "Atwaaq" },
                                 { id: "Jurtub", name: "Jurtub" },
                                 { id: "Waceysle", name: "Waceysle" },
                                 { id: "Wacbudhan", name: "Wacbudhan" },
                                 { id: "Harti (Abgaal)", name: "Harti (Abgaal)" },
                              ],
                           },
                           {
                              id: "Moobleen",
                              name: "Moobleen",
                              children: [
                                 { id: "Magacle", name: "Magacle" },
                                 { id: "Abidig", name: "Abidig" },
                              ],
                           },
                           { id: "Harti", name: "Harti" },
                        ],
                     },
                     {
                        id: "Habar Gidir",
                        name: "Habar Gidir",
                        children: [
                           {
                              id: "Saruur",
                              name: "Saruur",
                              children: [
                                 { id: "Wacdaan", name: "Wacdaan" },
                                 { id: "Nabadwaa", name: "Nabadwaa" },
                              ],
                           },
                           {
                              id: "Sacad",
                              name: "Sacad",
                              children: [
                                 { id: "Cabdalle", name: "Cabdalle" },
                                 { id: "Cawareere", name: "Cawareere" },
                              ],
                           },
                           {
                              id: "Saleebaan",
                              name: "Saleebaan",
                              children: [
                                 { id: "Dashaama", name: "Dashaama" },
                                 { id: "Faarax", name: "Faarax" },
                              ],
                           },
                           {
                              id: "Cayr",
                              name: "Cayr",
                              children: [
                                 { id: "Waace", name: "Waace" },
                                 { id: "Muucle", name: "Muucle" },
                              ],
                           },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            id: "Gardheere",
            name: "Gardheere",
            children: [
               {
                  id: "Garre",
                  name: "Garre",
                  children: [
                     { id: "Tuuf", name: "Tuuf" },
                     { id: "Quranyow", name: "Quranyow" },
                  ],
               },
               {
                  id: "Gaaljecel",
                  name: "Gaaljecel",
                  children: [
                     { id: "Lahube", name: "Lahube" },
                     { id: "Abtisame", name: "Abtisame" },
                     { id: "Dirissame", name: "Dirissame" },
                     { id: "Aarwaaq", name: "Aarwaaq" },
                     { id: "Sooraanle", name: "Sooraanle" },
                     { id: "Haadow", name: "Haadow" },
                     { id: "Hilowle", name: "Hilowle" },
                     { id: "Qalafow", name: "Qalafow" },
                     { id: "Mugurmal", name: "Mugurmal" },
                     { id: "Barsame", name: "Barsame" },
                     { id: "Jijeele", name: "Jijeele" },
                     { id: "Makahiil Cumar", name: "Makahiil Cumar" },
                  ],
               },
               { id: "Clise", name: "Clise" },
               { id: "Masarre", name: "Masarre" },
               {
                  id: "Degoodi",
                  name: "Degoodi",
                  children: [
                     { id: "Fardanow", name: "Fardanow" },
                     { id: "Midhimaal", name: "Midhimaal" },
                     { id: "Samatar", name: "Samatar" },
                     { id: "Maw", name: "Maw" },
                     { id: "Reer Maxamud", name: "Reer Maxamud" },
                     { id: "Faw", name: "Faw" },
                     { id: "Jabra'il", name: "Qalafow" },
                     { id: "Dumaal", name: "Dumaal" },
                     { id: "Gelible", name: "Gelible" },
                  ],
               },
            ],
         },
      ],
   },
   // {
   //    id: "yoruba",
   //    name: "Yoruba",
   //    clans: [
   //       {
   //          id: "egba",
   //          name: "Egba",
   //          children: [
   //             { id: "abeokuta", name: "Abeokuta" },
   //             { id: "owu", name: "Owu" },
   //          ],
   //       },
   //       {
   //          id: "ijesha",
   //          name: "Ijesha",
   //          children: [
   //             { id: "olive", name: "olive" },
   //             { id: "grimson", name: "black" },
   //          ],
   //       },
   //       { id: "ondo", name: "Ondo" },
   //    ],
   // },
];
