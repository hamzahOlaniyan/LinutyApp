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
      id: "SO",
      name: "Somali",
      clans: [
         {
            id: "DAR",
            name: "Darood",
            children: [
               {
                  id: "HAR",
                  name: "Harti",
                  children: [
                     {
                        id: "MAJ",
                        name: "Majeerteen",
                        children: [
                           { id: "CLSL", name: "Cali Saleebaan" },
                           {
                              id: "MXSL",
                              name: "Maxamuud Saleebaan",
                              children: [
                                 { id: "CIS", name: "Ciise" },
                                 { id: "CMR", name: "Cumar" },
                                 { id: "CSM", name: "Cisman" },
                              ],
                           },
                           { id: "USL", name: "Ugaar Saleebaan" },
                        ],
                     },
                     {
                        id: "DHU",
                        name: "Dhulbahnte",
                        children: [
                           { id: "MXGR", name: "Maxamuud Garaad" },
                           { id: "FXGR", name: "Faarax Garaad" },
                           { id: "QYD", name: "Qayaad" },
                        ],
                     },
                     {
                        id: "WAR",
                        name: "Warsangeli",
                        children: [
                           { id: "OGL", name: "Ogeyslabe" },
                           { id: "DUB", name: "Dubays" },
                           { id: "CMR", name: "Cumar" },
                           { id: "HJY", name: "Hinjiye" },
                           { id: "WRL", name: "Warlabe" },
                           { id: "QSII", name: "Waqad Siinye" },
                        ],
                     },
                     {
                        id: "DIS",
                        name: "Dishiishe",
                        children: [
                           {
                              id: "MKD",
                              name: "Makadoor",
                              children: [
                                 { id: "CBD", name: "Cabdikariim" },
                                 { id: "ISC", name: "Reer Boqor" },
                              ],
                           },
                           {
                              id: "ISC",
                              name: "Ismaaciil",
                              children: [
                                 { id: "YNS", name: "Yuunis" },
                                 { id: "SIC", name: "Siciid" },
                                 { id: "UGR", name: "Ugar" },
                              ],
                           },
                        ],
                     },
                  ],
               },
               {
                  id: "ABS",
                  name: "Absame",
                  children: [
                     {
                        id: "OGA",
                        name: "Ogaadeen",
                        children: [
                           {
                              id: "MAKB",
                              name: "Makabuul",
                              children: [
                                 { id: "MAKH", name: "Makahill" },
                                 { id: "RRS", name: "Reer Sacad" },
                              ],
                           },
                           {
                              id: "MYWAL",
                              name: "Miyir Waalal",
                              children: [
                                 { id: "TOLM", name: "Tolomogge" },
                                 { id: "BHL", name: "Bahale" },
                              ],
                           },
                        ],
                     },
                     {
                        id: "JIDW",
                        name: "Jidwaaq",
                        children: [
                           { id: "ABSK", name: "Abaskuul" },
                           { id: "YAB", name: "Yabare" },
                           { id: "BRT", name: "Bartire" },
                        ],
                     },
                  ],
               },
               {
                  id: "SDE",
                  name: "Saade",
                  children: [
                     {
                        id: "MARX",
                        name: "Mareexaan",
                        children: [
                           { id: "RSIY", name: "Reer Siyaad" },
                           { id: "RXAS", name: "Reer Xasan" },
                           { id: "RDIN", name: "Reer Diini" },
                        ],
                     },
                     { id: "RUS", name: "Reer Ugaas" },
                  ],
               },
               {
                  id: "TND",
                  name: "Tanaad",
                  children: [
                     {
                        id: "LEK",
                        name: "Leelkase",
                        children: [
                           { id: "MXCA", name: "Maxamuud Cali" },
                           { id: "MUCA", name: "Muuse Cali" },
                        ],
                     },
                     { id: "FRD", name: "Fardood" },
                  ],
               },
               {
                  id: "YUS",
                  name: "Yusuf",
                  children: [
                     { id: "AWT", name: "Awrtable" },
                     { id: "DAB", name: "Dabarre" },
                     { id: "FQC", name: "Fiqi Cumar" },
                  ],
               },
               {
                  id: "CII",
                  name: "Ciise",
                  children: [
                     {
                        id: "CMD Maxamud",
                        name: "Ciise Maxamud",
                        children: [
                           { id: "MUS", name: "Musse" },
                           { id: "MXD", name: "Maxamed" },
                           { id: "ABK", name: "Abokor" },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            id: "HAW",
            name: "Hawiye",
            children: [
               {
                  id: "KAR",
                  name: "Karanle",
                  children: [
                     { id: "WAD", name: "Wadere" },
                     { id: "KDR", name: "Kadiir" },
                     { id: "MRS", name: "Murusade" },
                     { id: "SHW", name: "Sahaawle" },
                  ],
               },
               {
                  id: "GOR",
                  name: "Gorgaarte",
                  children: [
                     {
                        id: "DUB",
                        name: "Duduble",
                        children: [
                           { id: "BSN", name: "Basin" },
                           { id: "CEL", name: "Celi" },
                           { id: "MQL", name: "Maqlisame" },
                           { id: "HAW", name: "Habar Awradeen" },
                           { id: "IJE", name: "Iijecle" },
                           { id: "ASD", name: "Aarsade" },
                           { id: "MXC", name: "Maxamed Camal" },
                           { id: "DUD", name: "Da’uud" },
                           { id: "QDB", name: "Qadhoob" },
                        ],
                     },
                     {
                        id: "MER",
                        name: "Mertiile",
                        children: [
                           { id: "MXA", name: "Maxamed Aantin" },
                           { id: "WHB ", name: "Wahbiye " },
                           { id: "CMT ", name: "Camateen " },
                           { id: "FQC", name: "Fiqi Cumar " },
                        ],
                     },
                  ],
               },
               {
                  id: "GUG",
                  name: "Gugundhabe",
                  children: [
                     {
                        id: "BDI",
                        name: "Baadicadde",
                        children: [
                           { id: "SMR", name: "Samaroob" },
                           { id: "MMY", name: "Maamiye" },
                           { id: "ILA", name: "Ilaabe" },
                           { id: "IBH", name: "Ibraahim" },
                           { id: "SUB", name: "Subeer" },
                           { id: "CYA", name: "Caryahan" },
                           { id: "XMD", name: "Xaamud" },
                           { id: "AFG", name: "Afgaab" },
                           { id: "QRW", name: "Quurwaayle" },
                           { id: "BYD", name: "Baydiisle" },
                        ],
                     },
                  ],
               },
               {
                  id: "JAM",
                  name: "Jambeelle",
                  children: [
                     {
                        id: "AJU",
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
                        id: "MOO",
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
                  id: "XAS",
                  name: "Xaskul",
                  children: [
                     { id: "Cali", name: "Cali" },
                     { id: "Hara’iid", name: "Hara’iid" },
                     { id: "Awsaan", name: "Awsaan" },
                     { id: "Idde", name: "Idde" },
                  ],
               },
               {
                  id: "RAA",
                  name: "Raarane",
               },
               {
                  id: "XAW",
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
                  id: "HIR",
                  name: "Hiraab",
                  children: [
                     {
                        id: "MUD",
                        name: "Mudulood",
                        children: [
                           {
                              id: "UDE",
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
                              id: "WAC",
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
                              id: "ABG",
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
                              id: "MOO",
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
                     { id: "FRD", name: "Fardanow" },
                     { id: "MDH", name: "Midhimaal" },
                     { id: "STR", name: "Samatar" },
                     { id: "MAW", name: "Maw" },
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
