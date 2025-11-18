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
                        id: "AJUR",
                        name: "Ajuuraan",
                        children: [
                           { id: "GRN", name: "Gareen" },
                           { id: "GLB", name: "Gelberis" },
                           { id: "WQL", name: "Waqla" },
                           { id: "DLX", name: "Dulxata" },
                           { id: "GSH", name: "Gaashe" },
                           { id: "YBDL", name: "Yibdalla" },
                        ],
                     },
                     {
                        id: "MORS",
                        name: "Moorshe",
                        children: [
                           { id: "GRRE", name: "Garure" },
                           { id: "OLGR", name: "Olagir" },
                           { id: "HTER", name: "Hinteere" },
                           { id: "ARU", name: "Aruure" },
                        ],
                     },
                  ],
               },
               {
                  id: "XSK",
                  name: "Xaskul",
                  children: [
                     { id: "CALI", name: "Cali" },
                     { id: "HRID", name: "Hara’iid" },
                     { id: "ASN", name: "Awsaan" },
                     { id: "IDD", name: "Idde" },
                  ],
               },
               {
                  id: "RAA",
                  name: "Raarane",
               },
               {
                  id: "XWD",
                  name: "Xawaadle",
                  children: [
                     {
                        id: "SMTLS",
                        name: "Samatalis",
                        children: [
                           { id: "DIGE", name: "Dige" },
                           { id: "TUABYU", name: "Yuusuf (Abdi Yuusuf)" },
                           { id: "FRUG", name: "Faramage (Reer Ugaas)" },
                           { id: "CBDL", name: "Cabdalle" },
                        ],
                     },
                  ],
               },
               {
                  id: "HIRB",
                  name: "Hiraab",
                  children: [
                     {
                        id: "MUDU",
                        name: "Mudulood",
                        children: [
                           {
                              id: "UDE",
                              name: "Udeejeen",
                              children: [
                                 { id: "MXSMR", name: "Maxamed Samatar" },
                                 { id: "ABDR", name: "Abaadir" },
                                 { id: "RERG ", name: "Reer Raage " },
                                 { id: "ABK", name: "Abokor" },
                                 { id: "MCLN", name: "Macallin" },
                                 { id: "YQB", name: "Yacquub" },
                              ],
                           },
                           {
                              id: "WAC",
                              name: "Wacdaan",
                              children: [
                                 { id: "WQB", name: "Warqab" },
                                 { id: "WGT", name: "Warqatinle" },
                                 { id: "SMK", name: "Samakaay" },
                                 { id: "MODH", name: "Mooldheere" },
                                 { id: "MLIN", name: "Maalinle" },
                                 { id: "YBR", name: "Yabar" },
                              ],
                           },
                           {
                              id: "ABG",
                              name: "Abgaal",
                              children: [
                                 { id: "CYN", name: "Ceynato" },
                                 { id: "DYC", name: "Daymacood" },
                                 { id: "DMU", name: "Damuumiye" },
                                 { id: "DYC", name: "Daylacood" },
                                 { id: "ATQ", name: "Atwaaq" },
                                 { id: "JTB", name: "Jurtub" },
                                 { id: "WCY", name: "Waceysle" },
                                 { id: "WBU", name: "Wacbudhan" },
                                 { id: "HAABG", name: "Harti (Abgaal)" },
                              ],
                           },
                           {
                              id: "MOO",
                              name: "Moobleen",
                              children: [
                                 { id: "MGC", name: "Magacle" },
                                 { id: "ABD", name: "Abidig" },
                              ],
                           },
                           { id: "HAR", name: "Harti" },
                        ],
                     },
                     {
                        id: "HNGD Gidir",
                        name: "Habar Gidir",
                        children: [
                           {
                              id: "SRU",
                              name: "Saruur",
                              children: [
                                 { id: "WDA", name: "Wacdaan" },
                                 { id: "NBD", name: "Nabadwaa" },
                              ],
                           },
                           {
                              id: "SCD",
                              name: "Sacad",
                              children: [
                                 { id: "CDAL", name: "Cabdalle" },
                                 { id: "CWAR", name: "Cawareere" },
                              ],
                           },
                           {
                              id: "SLB",
                              name: "Saleebaan",
                              children: [
                                 { id: "DSH", name: "Dashaama" },
                                 { id: "FRX", name: "Faarax" },
                              ],
                           },
                           {
                              id: "CYR",
                              name: "Cayr",
                              children: [
                                 { id: "WAA", name: "Waace" },
                                 { id: "MUU", name: "Muucle" },
                              ],
                           },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            id: "GRH",
            name: "Gardheere",
            children: [
               {
                  id: "GAR",
                  name: "Garre",
                  children: [
                     { id: "TUF", name: "Tuuf" },
                     { id: "QRNY", name: "Quranyow" },
                  ],
               },
               {
                  id: "GLJ",
                  name: "Gaaljecel",
                  children: [
                     { id: "LHB", name: "Lahube" },
                     { id: "ABS", name: "Abtisame" },
                     { id: "DIRS", name: "Dirissame" },
                     { id: "ARQ", name: "Aarwaaq" },
                     { id: "SRN", name: "Sooraanle" },
                     { id: "HAA", name: "Haadow" },
                     { id: "HWL", name: "Hilowle" },
                     { id: "QLF", name: "Qalafow" },
                     { id: "MGM", name: "Mugurmal" },
                     { id: "BRS", name: "Barsame" },
                     { id: "JJL", name: "Jijeele" },
                     { id: "MKCU Cumar", name: "Makahiil Cumar" },
                  ],
               },
               { id: "CLI", name: "Clise" },
               { id: "MAS", name: "Masarre" },
               {
                  id: "DEGOD",
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
         {
            id: "DIR",
            name: "Dir",
            children: [
               {
                  id: "SMRN",
                  name: "Samaroon",
                  children: [
                     { id: "JBYO", name: "Jibriil Yoonis" },
                     { id: "MKHL", name: "Makaahiil" },
                     { id: "HBCAF", name: "Habar Cafaan" },
                  ],
               },
               {
                  id: "CII",
                  name: "Ciise",
                  children: [
                     { id: "CALI", name: "Cali" },
                     { id: "HRO", name: "Horoone" },
                     { id: "ELY", name: "Eelay" },
                     { id: "MSE", name: "Muuse" },
                     { id: "MKHL", name: "Makahiil" },
                     { id: "WQD", name: "Waqad" },
                     { id: "RNUR", name: "Reer Nuur" },
                     { id: "RGDI", name: "Reer Geedi" },
                  ],
               },
               {
                  id: "SURE",
                  name: "Suree",
                  children: [
                     { id: "QBY", name: "Qubeys" },
                     { id: "ABDL", name: "Abdalle" },
                  ],
               },
               { id: "BYML", name: "Biyomaal" },
               { id: "BJML", name: "Bajimaal" },
               { id: "GRGU", name: "Gurgura" },
               { id: "ASHO", name: "Akisho" },
               { id: "BRSK", name: "Barsuuk" },
            ],
         },
         {
            id: "ISQ",
            name: "Isaaq",
            children: [
               {
                  id: "HBMGD",
                  name: "Habar Magaadle",
                  children: [
                     {
                        id: "HBAW",
                        name: "Habar Awal",
                        children: [
                           {
                              id: "SCMU",
                              name: "Sacad Muuse",
                              children: [
                                 { id: "GDBY", name: "Guri dambays" },
                                 { id: "XSN", name: "Xasan" },
                                 { id: "CBDL", name: "Cabdalle" },
                                 { id: "CARXN", name: "Cabdiraxmaan" },
                              ],
                           },
                           {
                              id: "CIMU",
                              name: "Ciise Muuse",
                              children: [
                                 { id: "ABKR", name: "Abokor" },
                                 { id: "ADN", name: "Aadan" },
                                 { id: "IDS", name: "Idriis" },
                                 { id: "MXMD", name: "Maxamed" },
                              ],
                           },
                        ],
                     },
                     {
                        id: "HBGXJ",
                        name: "Habar Garxajis",
                        children: [
                           {
                              id: "CIIDG",
                              name: "Ciidagale",
                              children: [
                                 { id: "MXDAU", name: "Maxamed Da’uud" },
                                 { id: "ABDAU", name: "Abuubakar Da’uud" },
                                 { id: "MDAU", name: "Muuse Da’uud" },
                              ],
                           },
                           {
                              id: "NBYN",
                              name: "Habar Yoonis",
                              children: [
                                 { id: "RSGU", name: "Reer Sugulle " },
                                 { id: "BHCAY", name: "Baha Caynaanshe" },
                              ],
                           },
                        ],
                     },
                     { id: "CRB", name: "Carab" },
                     { id: "AYB", name: "Ayuub" },
                  ],
               },
               {
                  id: "HHBSH",
                  name: "Habar Habuusheed",
                  children: [
                     {
                        id: "HBJCL",
                        name: "Habar Jeclo",
                        children: [
                           { id: "MXABK", name: "Maxamed Abokor" },
                           { id: "MUABK", name: "Muuse Abokor" },
                           { id: "SMABK", name: "Samaane Abokor" },
                           { id: "RDOOD", name: "Reer Dood" },
                           { id: "CMR", name: "Cumar" },
                        ],
                     },
                     { id: "TJCL", name: "Tol Jecle" },
                     { id: "SBUR", name: "Sanbuur" },
                     { id: "IBR", name: "Ibraan" },
                  ],
               },
            ],
         },
         {
            id: "RXWY",
            name: "Raxanweyn",
            children: [
               {
                  id: "DGL",
                  name: "Digil",
                  children: [
                     {
                        id: "TNI",
                        name: "Tunni",
                     },
                     {
                        id: "GLDI",
                        name: "Geledi",
                     },
                     {
                        id: "JIID",
                        name: "Jiiddu",
                     },
                     {
                        id: "DBAR",
                        name: "Dabarre",
                     },
                  ],
               },
               {
                  id: "MRFL",
                  name: "Mirifle",
                  children: [
                     {
                        id: "HDAM",
                        name: "Hadame",
                     },
                     {
                        id: "HRN",
                        name: "Harin",
                     },
                     {
                        id: "LWY",
                        name: "Luwaay",
                     },
                     {
                        id: "ELY",
                        name: "Eelay",
                     },
                     {
                        id: "JRN",
                        name: "Jiron",
                     },
                     {
                        id: "HBR",
                        name: "Hubeer",
                     },
                     {
                        id: "GSGD",
                        name: "Gasaargude",
                     },
                     {
                        id: "LYSN",
                        name: "Leeysan",
                     },
                  ],
               },
            ],
         },
         {
            id: "SHKL",
            name: "Sheekhal",
            children: [
               { id: "JZRA", name: "Jaziira" },
               {
                  id: "REWQD",
                  name: "Reer Aw Qudub",
                  children: [
                     { id: "AWCLM", name: "Aw Cilmi" },
                     { id: "AWLBN", name: "Aw Liibaan" },
                     { id: "AWFRX", name: "Aw Faarax" },
                     { id: "AWSDQ", name: "Aw Sidiiq" },
                     { id: "AWAHD", name: "Aw Ahmed" },
                     { id: "AWSMR", name: "Aw Samire" },
                     { id: "AWCDNI", name: "Aw Cumar Diini" },
                     { id: "AWCSYD", name: "Aw Cumar Siyaad" },
                     { id: "AWCDLE", name: "Aw Cabdale" },
                  ],
               },
               {
                  id: "LBGE",
                  name: "Looboge",
                  children: [
                     { id: "CBD", name: "Cabdi" },
                     { id: "SCDI", name: "Sacdi" },
                     { id: "CGNE", name: "Caagane" },
                     { id: "TLWY", name: "Tolweyne (mahadalle) " },
                  ],
               },
               { id: "GDER", name: "Gendershe" },
               { id: "GDLE", name: "Guudle" },
               { id: "CASAM", name: "Cabdi Samad" },
               { id: "CASFI", name: "Cabdi Suufi" },
               { id: "CASHKH", name: "Cabdi Sheekh" },
               { id: "CACFF", name: "Cali Cafiif" },
               { id: "ABIB", name: "Abiib" },
               { id: "TDAN", name: "Teedan" },
               { id: "QLU", name: "Qaalu" },
               { id: "ASACD", name: "Aw Saciid " },
               { id: "AAYB", name: "Aw Ayuub" },
               { id: "GMDLE", name: "Gaameedle" },
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
