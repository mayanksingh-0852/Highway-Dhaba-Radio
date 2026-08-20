/* =====================================================
   HIGHWAY DHABA RADIO
   SONG COLLECTION
===================================================== */
// <iframe width="913" height="513" src="https://www.youtube.com/embed/D8l3fLJ1Klw" title="Yeh Jo Halka Halka Suroor Hai (Lyric Video) | Nusrat Fateh Ali Khan - OSA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

const songs = [
  {
    title: "Zindagi Ek Safar Hai Suhana",
    artist: "Hema Malini | Rajesh Khanna | Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/GjPGVVebVUc",
    category: "90s",
  },
  {
    title: 'Khaike Paan Banaras Wala',
    artist: "Amitabh Bachchan | Zeenat Aman | Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/jOtn4yVMmLE",
    category: "90s",
  },
  {
    title: 'Mere Samne Wali Khidki Mein',
    artist: "Sunil Dutt | Saira Banu | Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/qwhjCU5WS64",
    category: "90s",
  },
  {
    title: "O Mere Dil Ke Chayan",
    artist: "Lata Mangeshkar | Rajesh Khanna",
    youtubeId: "https://www.youtube.com/embed/gsTWKkxDGos",
    category: "90s",
  },
  {
    title: "Yeh Jo Mohabbat Hai",
    artist: "Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/A6Nh4dE7HNQ",
    category: "90s",
  },
  {
    title: "Musafir Hoon Yaaron",
    artist: "Jeetendra | Kishore Kumar | Gulzar | R.D. Burman",
    youtubeId: "https://www.youtube.com/embed/UM1Ub9QA8fo",
    category: "90s",
  },
  {
    title: "Chukar Mere Man Ko",
    artist: "Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/1MzmICT4w8w",
    category: "90s",
  },
  {
    title: "AGAR TUM NA HOTE",
    artist: "Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/cCaU0MkGqMs",
    category: "90s",
  },
  {
    title: "Humen Tumse Pyar Kitna",
    artist: "Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/xdlZXTf2w34",
    category: "90s",
  },
  {
    title: "Mere Naina Sawan Bhadon",
    artist: "Lata Mangeshkar | Mehbooba | Rajesh Khanna | Hema Malini",
    youtubeId: "https://www.youtube.com/embed/sSOK82TTXoU",
    category: "90s",
  },
  {
    title: 'O Saathi Re',
    artist:'Amitabh Bachchan | Muqaddar ka Sikandar',
    youtubeId: "https://www.youtube.com/embed/9uwQYC_gFuw",
    category: "90s",
  },
  {
    title: 'Chehra Hai Ya Chand Khila Hai',
    artist:'Rishi Kapoor | Dimple Kapadia | R.D.Burman',
    youtubeId: "https://www.youtube.com/embed/8drSZlOo3Uo",
    category: "90s",
  },
  {
    title: 'Gulabi Aankhen jo teri dekhi',
    artist:'Mohammed Rafi | R. D. Burman',
    youtubeId: "https://www.youtube.com/embed/Xsn0QjMN3fM",
    category: "90s",
  },

  {
    title: "Apni To Jaise Taise",

    artist: "Amitabh Bachchan | Kishore Kumar",

    youtubeId: "https://www.youtube.com/embed/SCMtgVo-K_o",
    category: "90s",
  },

  {
    title: "Salame-Ishq Meri Jaan",
    artist: "Amitabh Bachchan | Kishore Kumar",
    youtubeId: "https://www.youtube.com/embed/W7H62yTSZ3U",
    category: "90s",
  },

  {
    title: "Jadu Hai Nasha Hai",
    artist: "Shreya Ghoshal | Shaan | M.M. Kreem",
    youtubeId: "https://www.youtube.com/embed/XBXdbK06i7Y",
    category: "2000s",
  },
  {
    title: "Mera Chand Mujhe Aaya Hai Nazar",
    artist: "Mr. Aashiq | Kumar Sanu | Saif Ali Khan, Twinkle Khanna",
    youtubeId: "https://www.youtube.com/embed/vOKvEUnI0_E",
    category: "2000s",
  },
  {
    title: "Zara Zara",
    artist: "R. Madhavan | Dia Mirza | Bombay Jayashri",
    youtubeId: "https://www.youtube.com/embed/6CXI5ZQgo7A",
    category: "2000s",
  },
  {
    title: "Beech Bajariya",
    artist: " Ansh | Sapna Awasthi | Nadeem-Shravan | Sameer",
    youtubeId: "https://www.youtube.com/embed/5UD8NFc2aTs",
    category: "90s",
  },
  {
    title: "Jooma Chumma De De",
    artist: "Amitabh Bachchan | Sudesh Bhosle | Kavita Krishnamurthy | Anand B",
    youtubeId: "https://www.youtube.com/embed/bVzIHMskZmQ",
    category: "90s",
  },
  {
    title: "Rim Jhim Rim Jhim",
    artist: "Anil Kapoor | Manisha Koirala | Kavita Krishnamurthy | Kumar Sanu",
    youtubeId: "https://www.youtube.com/embed/AMz6mnBo4Kc",
    category: "2000s",
  },
  {
    title: "Bas Ek Sanam Chahiye Aashiqui KeLiye",
    artist: " Power Star Pawan Singh | Shivani Singh ",
    youtubeId: "https://www.youtube.com/embed/eQqGEIaiHKA",
    category: "2000s",
  },
  {
    title: " सड़िया | Sadiya",
    artist: " KumarSanu | Rahul R | Anu Agarwal",
    youtubeId: "https://www.youtube.com/embed/j1PFv7qIPXo",
    category: "Bhojpuri",
   
  },

  {
    title: "Pahin Ke Chali Bikini",
    artist: " Mahua Singh | Purav Jha",
    youtubeId: "https://www.youtube.com/embed/2CnatpIv8qQ",
    category: "Bhojpuri",
    
  },

  {
    title: "Love Ke Tonic Piyal Kara",
    artist: " Arvind Akela (Kalu Ji)",
    youtubeId: "https://www.youtube.com/embed/G2WzjQnhaao",
    category: "Bhojpuri",
   
  },

  {
    title: "Lollypop",
    artist: " Pawan Singh ",
    youtubeId: "https://www.youtube.com/embed/Gbxsf5y-eU0",
    category: "Bhojpuri",
  },

  {
    title: "Saniya Mirja Cut Nathuniya",
    artist: "  Pawan Singh ",
    youtubeId: "https://www.youtube.com/embed/9ohKAreRz-I",
    category: "Bhojpuri",
   
  },

  {
    title: "बबुआन",
    artist: " Pawan Singh | Shilpi Raj | Chandani Singh",
    youtubeId: "https://www.youtube.com/embed/gZQDZVI99qc",
    category: "Bhojpuri",
    //  <iframe width="913" height="513" src="https://www.youtube.com/embed/gZQDZVI99qc" title="#Video | #Pawan Singh | बबुआन | #Shilpi Raj #Chandani Singh | New Bhojpuri #babuan_song #pawansingh" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  },

  // {
  //     title: "Bas Ek Sanam Chahiye Aashiqui KeLiye",
  //     artist: " KumarSanu | Rahul R | Anu Agarwal",
  //     youtubeId: "https://www.youtube.com/embed/eQqGEIaiHKA",
  //     category: "Bhojpuri"
  // },

  // {
  //     title: "Bas Ek Sanam Chahiye Aashiqui KeLiye",
  //     artist: " KumarSanu | Rahul R | Anu Agarwal",
  //     youtubeId: "https://www.youtube.com/embed/eQqGEIaiHKA",
  //     category: "Bhojpuri"
  // },

  // {
  //     title: "Bas Ek Sanam Chahiye Aashiqui KeLiye",
  //     artist: " KumarSanu | Rahul R | Anu Agarwal",
  //     youtubeId: "https://www.youtube.com/embed/eQqGEIaiHKA",
  //     category: "Bhojpuri"
  // },

  // {
  //     title: "Bas Ek Sanam Chahiye Aashiqui KeLiye",
  //     artist: " KumarSanu | Rahul R | Anu Agarwal",
  //     youtubeId: "https://www.youtube.com/embed/eQqGEIaiHKA",
  //     category: "Bhojpuri"
  // },
];
