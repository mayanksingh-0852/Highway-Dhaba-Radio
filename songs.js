/* =====================================================
   HIGHWAY DHABA RADIO
   SONG COLLECTION
===================================================== */
// <iframe width="913" height="513" src="https://www.youtube.com/embed/D8l3fLJ1Klw" title="Yeh Jo Halka Halka Suroor Hai (Lyric Video) | Nusrat Fateh Ali Khan - OSA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

const songs = [
  {
    title: "Pyar Hua Chupke Se",

    artist: "Old Hindi Classics",

    youtubeId: "https://www.youtube.com/embed/goidtvB-O54",
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
    // <iframe width="913" height="513" src="https://www.youtube.com/embed/j1PFv7qIPXo" title="#Video | Power Star #Pawan Singh | सड़िया | Sadiya | #Shivani Singh | Bhojpuri Hit Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  },

  {
    title: "Pahin Ke Chali Bikini",
    artist: " Mahua Singh | Purav Jha",
    youtubeId: "https://www.youtube.com/embed/2CnatpIv8qQ",
    category: "Bhojpuri",
    // <iframe width="913" height="513" src="https://www.youtube.com/embed/2CnatpIv8qQ" title="#Video | #Mahua Singh | Purav Jha | पहिन के चली बिकनी | Pahin Ke Chali Bikini | Bhojpuri Hit Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  },

  {
    title: "Love Ke Tonic Piyal Kara",
    artist: " Arvind Akela (Kalu Ji)",
    youtubeId: "https://www.youtube.com/embed/G2WzjQnhaao",
    category: "Bhojpuri",
    // <iframe width="913" height="513" src="https://www.youtube.com/embed/G2WzjQnhaao" title="लव के टॉनिक पियल करs - Love Ke Tonic Piyal Kara - D J Wali Chhori - Bhojpuri Hit Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  },

  {
    title: "Lollypop",
    artist: " Pawan Singh ",
    youtubeId: "https://www.youtube.com/embed/Gbxsf5y-eU0",
    category: "Bhojpuri",
    // <iframe width="923" height="425" src="https://www.youtube.com/embed/Gbxsf5y-eU0" title="लॉलीपॉप लागेलु | #Pawan Singh (Official Video) Kamriya Kare Lapalap Lollypop Lagelu | Superhit Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  },

  {
    title: "Saniya Mirja Cut Nathuniya",
    artist: "  Pawan Singh ",
    youtubeId: "https://www.youtube.com/embed/9ohKAreRz-I",
    category: "Bhojpuri",
    // <iframe width="913" height="513" src="https://www.youtube.com/embed/9ohKAreRz-I" title="Video | सानिया मिर्जा कट नथुनिया | Pawan Singh | Saniya Mirja Cut Nathuniya | Superhit Bhojpuri Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
