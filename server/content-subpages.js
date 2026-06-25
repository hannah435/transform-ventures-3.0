// Editable content models for all subpages. Merged into DEFAULTS/SCHEMA by content-schema.js.
// DEFAULTS mirror the current hardcoded content so server-rendered pages stay identical
// until edited. SCHEMA drives the admin editor. Capabilities/stats use flat fields so they
// fit the admin's form generator.

const hero = (fields) => ({ key: "hero", label: "Page header", fields });
const HERO_FIELDS = [
  { key: "eyebrow", label: "Eyebrow", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "intro", label: "Intro", type: "textarea" },
];
const capFields = (n) =>
  Array.from({ length: n }, (_, i) => [
    { key: `cap${i + 1}t`, label: `Capability ${i + 1} — title`, type: "text" },
    { key: `cap${i + 1}d`, label: `Capability ${i + 1} — description`, type: "textarea" },
  ]).flat();
const statFields = (n) =>
  Array.from({ length: n }, (_, i) => [
    { key: `stat${i + 1}n`, label: `Stat ${i + 1} — number`, type: "text" },
    { key: `stat${i + 1}l`, label: `Stat ${i + 1} — label`, type: "text" },
  ]).flat();

// ---- division detail content (5 pages). caps/stats/book nested under section keys ----
const caps = (a) => ({ cap1t: a[0][0], cap1d: a[0][1], cap2t: a[1][0], cap2d: a[1][1], cap3t: a[2][0], cap3d: a[2][1], cap4t: a[3][0], cap4d: a[3][1] });
const stats = (a) => ({ stat1n: a[0][0], stat1l: a[0][1], stat2n: a[1][0], stat2l: a[1][1], stat3n: a[2][0], stat3l: a[2][1], stat4n: a[3][0], stat4l: a[3][1] });
const DIV = {
  "division-group": {
    hero: { eyebrow: "/ 01 — Communications & PR", title: "The original blockchain PR firm.", intro: "Founded by Michael Terpin in 2013, Transform launched the first-ever token sale (Mastercoin) and powered the exposure of 100+ prominent tokens during the ICO era — including Augur, Bancor, EOS, Ethereum, Golem, Gnosis, Lisk, MaidSafe, Qtum, VideoCoin, and WAX. Additional campaigns include Aeternity, Atari Token, Bittrex, CoinBene, Dash, Factom, ICON Foundation, Kraken, NEM, OKEx, Polymath, Radix, ShapeShift, Telos, and Tether. The only mainstream business and consumer PR firm with deep roots in blockchain." },
    caps: caps([["First-ever token sale", "Launched the first token sale in blockchain history — Mastercoin, 2013. Powering 100+ prominent tokens through the ICO era and beyond."], ["Crypto media leadership", "Regular placements in every leading crypto publication — CoinDesk, Cointelegraph, Decrypt — plus top industry podcasts and YouTube channels."], ["Tier-1 mainstream coverage", "Client stories placed in AP, BBC, Bloomberg, Business Insider, CNBC, Forbes, Fox, The New York Times, Reuters, TechCrunch, USA Today, VentureBeat, Wall Street Journal, and WIRED."], ["Global office network", "San Juan HQ with additional offices in New York, Los Angeles, San Francisco, Las Vegas, and Toronto — the most extensive footprint in crypto PR."]]),
    stats: stats([["100+", "ICO-era Token Launches"], ["300+", "Clients Since 2013"], ["57%", "Alt-Coin Market Cap"], ["2013", "Agency Founded"]]),
  },
  "division-events": {
    hero: { eyebrow: "/ 02 — Tokenize · BitAngels · Tiger Mansion", title: "Where the industry connects.", intro: "Premier blockchain events — Tokenize, BitAngels, Tiger Mansion — connecting founders and investors worldwide through curated conferences and intimate gatherings." },
    caps: caps([["Tokenize conference", "A premier blockchain conference exploring the future of tokenization. Global edition."], ["BitAngels network", "World's first crypto angel investor network. Active since 2013."], ["Tiger Mansion", "Invite-only executive gathering for top-tier crypto investors and founders."], ["CoinAgenda legacy", "Predecessor conference series connecting mainstream investors with blockchain deals."]]),
    stats: stats([["2013", "BitAngels Founded"], ["Global", "Tokenize Reach"], ["Invite Only", "Tiger Mansion"], ["10+", "Years of Events"]]),
  },
  "division-capital": {
    hero: { eyebrow: "/ 03 — Family Office", title: "Michael Terpin's family office.", intro: "Deploying strategic capital into blockchain protocols, DeFi infrastructure, and crypto projects. A Puerto Rico-based crypto family office with deep conviction and a long-term investment horizon." },
    caps: caps([["Strategic investments", "Direct investments into high-potential blockchain protocols, infrastructure, and applications."], ["Long-term conviction", "Patient capital with deep understanding of market cycles and adoption curves."], ["Ecosystem access", "Portfolio companies gain access to the full Transform Ventures ecosystem."], ["Hands-on support", "Active guidance on go-to-market, partnerships, and scaling."]]),
    stats: stats([["10+", "Years in Crypto"], ["Multi", "Strategy Approach"], ["Direct", "Portfolio Access"], ["Global", "Network Reach"]]),
  },
  "division-strategies": {
    hero: { eyebrow: "/ 04 — Advisory & Consulting", title: "Expert advisory for blockchain projects.", intro: "Decades of combined experience in token launch strategy, crypto go-to-market planning, tokenomics design, and investor relations — helping blockchain ventures succeed from seed to scale." },
    caps: caps([["Token launch strategy", "End-to-end advisory on token design, distribution, and launch execution for maximum market impact."], ["Go-to-market planning", "Strategic positioning, messaging, and market entry plans tailored to the blockchain landscape."], ["Ecosystem development", "Building partnerships, community, and network effects for sustainable project growth."], ["Investor relations", "Connecting projects with the right capital partners and managing ongoing investor communications."]]),
    stats: stats([["Seed", "→ Scale"], ["Tokenomics", "Design"], ["GTM", "Planning"], ["IR", "Advisory"]]),
  },
  "division-fund": {
    hero: { eyebrow: "/ 05 — BTC Investment Fund", title: "The first liquid bitcoin-only hedge fund.", intro: "Combining the 'Four Seasons of Bitcoin' cycle model with algorithmic trading and season-specific strategies. Institutional-grade: Coinbase Prime custody, NAV Fund Services administration." },
    caps: caps([["Four Seasons of Bitcoin", "Cycle model mapping BTC to predictable halving-driven phases: spring, summer, fall, winter."], ["Algorithmic trading", "Season-specific strategies executed algorithmically — sell near cycle peaks, buy near bottoms."], ["Bitcoin-only mandate", "100% concentrated in bitcoin — no altcoins, no distractions."], ["Institutional rails", "Coinbase Prime custody. NAV Fund Services administration. Regulated structure."]]),
    stats: stats([["100%", "Bitcoin-Only"], ["Algo", "Trading Engine"], ["4 Seasons", "Cycle Model"], ["2024", "Fund Launch"]]),
    book: { bookTag: "Amazon Best Seller · 2024", bookTitle: "Bitcoin Supercycle", bookImg: "assets/bitcoin-supercycle-book.jpg", bookDesc: "How the crypto calendar can make you rich — by Michael Terpin. The foundational thesis behind the fund's seasonal signal and cycle-driven strategy.", bookAmazon: "https://www.amazon.com/Bitcoin-Supercycle-Crypto-Calendar-Make/dp/151078215X" },
  },
};

const divisionSchema = (label, withBook) => ({
  label,
  sections: [
    hero(HERO_FIELDS),
    { key: "caps", label: "Capabilities", fields: capFields(4) },
    { key: "stats", label: "Stats", fields: statFields(4) },
    ...(withBook ? [{ key: "book", label: "Book", fields: [
      { key: "bookTag", label: "Badge", type: "text" },
      { key: "bookTitle", label: "Title", type: "text" },
      { key: "bookImg", label: "Cover image", type: "image" },
      { key: "bookDesc", label: "Description", type: "textarea" },
      { key: "bookAmazon", label: "Amazon link", type: "url" },
    ] }] : []),
  ],
});

const DEFAULTS = {
  about: {
    hero: { eyebrow: "About Transform Ventures", title: "Three decades of building at the edges of media and money.", intro: "Transform Ventures is the venture platform of Michael Terpin — founder of Marketwire, BitAngels, and Tokenize — operating across five specialized divisions from San Juan, Puerto Rico." },
    story: { eyebrow: "Our Story", heading: "The communications powerhouse behind crypto." },
    timeline: [
      { year: "1994", title: "Marketwire Founded", desc: "First Internet-based newswire. Backed by Sequoia Capital & Hummer Winblad. Sold to NASDAQ for $200M." },
      { year: "2013", title: "BitAngels & Transform Group", desc: "Co-founded the first crypto angel group and launched the original blockchain PR firm. Powered the first-ever token sale (Mastercoin) and 100+ prominent ICO-era tokens including Ethereum, EOS, Augur, Bancor, Golem, Qtum, WAX, and Tether." },
      { year: "2015", title: "Four Seasons of Bitcoin", desc: "Michael Terpin developed the Four Seasons model, mapping bitcoin to predictable four-year cycles driven by the halving." },
      { year: "2018", title: "CoinAgenda → Tokenize", desc: "Created the leading conference series connecting mainstream investors with blockchain and crypto investments." },
      { year: "2021", title: "Transform Ventures", desc: "Consolidated into a full blockchain and AI advisory and venture studio. Five divisions spanning events, capital, strategy, and fund management." },
      { year: "2024", title: "Bitcoin Supercycle Fund", desc: "Launched the first liquid bitcoin-only hedge fund using the Four Seasons model and algorithmic trading." },
    ],
    teamHead: { eyebrow: "Our Team", title: "The people behind Transform." },
    team: [
      { name: "Team Member", role: "Position / Title", bio: "Add a short bio for this team member in the admin panel.", photoImg: "", linkedin: "#", x: "#" },
      { name: "Team Member", role: "Position / Title", bio: "Add a short bio for this team member in the admin panel.", photoImg: "", linkedin: "#", x: "#" },
      { name: "Team Member", role: "Position / Title", bio: "Add a short bio for this team member in the admin panel.", photoImg: "", linkedin: "#", x: "#" },
    ],
  },
  divisions: {
    hero: { eyebrow: "Our Ecosystem", title: "Five divisions. One vision.", intro: "Transform Ventures operates across five specialized divisions — from pioneering crypto PR and blockchain events to venture capital, strategic advisory, and a bitcoin-only hedge fund." },
    blocks: [
      { key: "group", num: "01", badge: "Parent Organization", name: "Transform Group", color: "var(--purple)", desc: "The original blockchain PR firm — launched the first-ever token sale (Mastercoin, 2013) and powered 100+ prominent ICO-era launches including Ethereum, EOS, Augur, and Tether.", cap1t: "First-ever token sale", cap1d: "Launched the first token sale in blockchain history — Mastercoin, 2013. Powered 100+ prominent tokens through the ICO era including Ethereum, EOS, Augur, Bancor, Golem, and WAX.", cap2t: "Crypto media leadership", cap2d: "Regular placements in every leading crypto publication — CoinDesk, Cointelegraph, Decrypt — plus top industry podcasts and YouTube channels.", cap3t: "Tier-1 mainstream coverage", cap3d: "Client stories placed in AP, BBC, Bloomberg, CNBC, Forbes, The New York Times, Reuters, TechCrunch, Wall Street Journal, and WIRED.", cap4t: "Global office network", cap4d: "San Juan HQ with offices in New York, Los Angeles, San Francisco, Las Vegas, and Toronto — the most extensive footprint in crypto PR." },
      { key: "events", num: "02", badge: "Events & Conferences", name: "Transform Events", color: "var(--teal)", desc: "Premier blockchain events connecting founders and investors worldwide through curated gatherings.", cap1t: "Tokenize conference", cap1d: "A premier blockchain conference exploring the future of tokenization. Global edition.", cap2t: "BitAngels network", cap2d: "World's first crypto angel investor network. Active since 2013.", cap3t: "Tiger Mansion", cap3d: "Invite-only executive gathering for top-tier crypto investors and founders.", cap4t: "CoinAgenda legacy", cap4d: "Predecessor conference series connecting mainstream investors with blockchain deals." },
      { key: "capital", num: "03", badge: "Family Office", name: "Transform Capital", color: "#F7931A", desc: "Strategic investments across the digital asset landscape with a long-term investment horizon.", cap1t: "Strategic investments", cap1d: "Direct investments into high-potential blockchain protocols and applications.", cap2t: "Long-term conviction", cap2d: "Patient capital with deep understanding of market cycles and adoption curves.", cap3t: "Ecosystem access", cap3d: "Portfolio companies gain access to the full Transform Ventures ecosystem.", cap4t: "Hands-on support", cap4d: "Active guidance on go-to-market, partnerships, and scaling." },
      { key: "strategies", num: "04", badge: "Advisory", name: "Transform Strategies", color: "var(--purple)", desc: "Go-to-market strategy, tokenomics design, and ecosystem development for blockchain ventures.", cap1t: "Token launch strategy", cap1d: "End-to-end advisory on token design, distribution, and launch execution for maximum market impact.", cap2t: "Go-to-market planning", cap2d: "Strategic positioning, messaging, and market entry plans tailored to the blockchain landscape.", cap3t: "Ecosystem development", cap3d: "Building partnerships, community, and network effects for sustainable project growth.", cap4t: "Investor relations", cap4d: "Connecting projects with the right capital partners and managing ongoing investor communications." },
      { key: "fund", num: "05", badge: "Investment Fund", name: "Bitcoin Supercycle Fund", color: "#F7931A", desc: "The first liquid bitcoin-only hedge fund using the 'Four Seasons of Bitcoin' cycle model and algorithmic trading.", cap1t: "Four Seasons of Bitcoin", cap1d: "Cycle model mapping BTC to predictable halving-driven phases: spring, summer, fall, winter.", cap2t: "Algorithmic trading", cap2d: "Season-specific strategies executed algorithmically — sell near cycle peaks, buy near bottoms.", cap3t: "Bitcoin-only mandate", cap3d: "100% concentrated in bitcoin — no altcoins, no distractions.", cap4t: "Institutional rails", cap4d: "Coinbase Prime custody. NAV Fund Services administration. Regulated structure." },
    ],
  },
  leadership: {
    hero: { eyebrow: "Leadership", title: "Meet the founder.", intro: "One of the most recognized figures in blockchain and cryptocurrency — early bitcoin investor, author, and the entrepreneur CNBC called the 'Godfather of Crypto.'" },
    leader: {
      role: "Founder & CEO · CIO, Bitcoin Supercycle Fund", name: "Michael Terpin", photoImg: "assets/michael-terpin.jpg",
      para1: "Early bitcoin investor, thought leader, and serial entrepreneur — known as the \"Godfather of Crypto\" (CNBC). Chief Investment Officer of the Bitcoin Supercycle Fund and author of Bitcoin Supercycle (Skyhorse Publishing, 2024), which correctly predicted the November 2024 all-time high for bitcoin.",
      para2: "Creator of CoinAgenda (now rebranded as Tokenize), the leading conference series connecting investors with crypto, and co-founder of BitAngels (2013), the first crypto angel group. Previously founded Marketwire, the first Internet-based newswire (backed by Sequoia Capital), sold to NASDAQ for $200M.",
      tags: ["Godfather of Crypto", "Transform Ventures", "Transform Group", "BitAngels Co-Founder", "Tokenize Creator", "Marketwire Founder", "Author", "Puerto Rico"],
    },
    pressHead: { eyebrow: "Press coverage", title: "What the media says." },
    press: [
      { src: "CNBC", quote: "Called Michael Terpin the 'Godfather of Crypto' for his early advocacy and investment across the industry." },
      { src: "Yahoo Finance", quote: "'Veteran investor predicts shocking bitcoin rally by 2033.' — Coverage of Terpin's Four Seasons model." },
      { src: "Skyhorse Publishing", quote: "Author of 'Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich' — 2024 release." },
    ],
  },
  events: {
    hero: { eyebrow: "Transform Events", title: "Where the industry connects.", intro: "Flagship blockchain conferences and crypto networking events bringing together industry leaders, angel investors, and founders for deal-making and knowledge sharing." },
    upcomingHead: { eyebrow: "Upcoming", title: "On the calendar." },
    upcoming: [
      { date: "Sep 2026", city: "Las Vegas", name: "Tokenize Las Vegas", tag: "Flagship Conference", bg: "linear-gradient(135deg, #6D4AFF, #3A1F9E)" },
      { date: "Jun 2026", city: "San Juan, PR", name: "BitAngels Summer Summit", tag: "Angel Network", bg: "linear-gradient(135deg, #F7931A, #B25E00)" },
      { date: "Ongoing", city: "By invitation", name: "Tiger Mansion Dinners", tag: "Invite Only", bg: "linear-gradient(135deg, #0FB5A5, #0A6B63)" },
    ],
    brandsHead: { eyebrow: "Event Brands", title: "Where the industry connects." },
    brands: [
      { name: "Tokenize", tag: "Global Conference", desc: "A premier blockchain conference bringing together industry leaders, investors, and innovators to explore the future of tokenization.", img: "assets/tokenize-vegas.jpg", url: "https://tokenizeconference.com/" },
      { name: "BitAngels", tag: "Since 2013 · Angel Network", desc: "Co-founded by Michael Terpin in 2013. The world's first angel investor network for digital currency startups.", img: "assets/bitangels-group.webp", url: "https://bitangels.network/" },
      { name: "Tiger Mansion", tag: "Invite Only", desc: "An exclusive, invite-only gathering for top-tier crypto investors and founders. Intimate, curated networking.", img: "assets/tigermansion-event.jpg", url: "https://www.tigermansionlv.com/" },
    ],
  },
  media: {
    hero: { eyebrow: "News & Media", title: "In the press.", intro: "Interviews, appearances, and press coverage featuring Michael Terpin and Transform Ventures across leading crypto and financial media." },
    items: [
      { src: "Kitco News", icon: "play", type: "youtube", ytid: "oQkCrnJ8wxk", grad: "", title: "The Debt Trap: Why Gold Pumps First and Bitcoin Follows", desc: "Michael Terpin discusses the macro relationship between gold and bitcoin, the debt cycle, and why bitcoin follows gold's trajectory with a lag.", cta: "Watch on YouTube", url: "https://youtu.be/oQkCrnJ8wxk" },
      { src: "Bonnie Blockchain", icon: "play", type: "youtube", ytid: "mUM4yvlpMW0", grad: "", title: "Bitcoin Market Analysis with Michael Terpin", desc: "The \"Godfather of Crypto\" joins Bonnie Blockchain to discuss bitcoin market cycles, the Four Seasons model, and what's next for the crypto market.", cta: "Watch on YouTube", url: "https://youtu.be/mUM4yvlpMW0" },
      { src: "LinkedIn", icon: "linkedin", type: "social", ytid: "", grad: "linear-gradient(135deg, #0a9488 0%, #2dd4bf 55%, #5eecd5 100%)", title: "Tokenize! LATAM — Featuring the \"Godfather of Crypto\"", desc: "Michael Terpin kicks off Tokenize! LATAM, bringing blockchain and crypto thought leadership to the Latin American market.", cta: "View Post", url: "https://www.linkedin.com/posts/tokenizecon_whos-better-to-kick-off-tokenize-latam-activity-7442774200999821312-CshG" },
      { src: "Yahoo Finance / TheStreet", icon: "news", type: "article", ytid: "", grad: "linear-gradient(135deg, #120840 0%, #2a1570 50%, #6D4AFF 100%)", title: "Veteran Investor Predicts Shocking Bitcoin Rally by 2033", desc: "Michael Terpin outlines his prediction that bitcoin could reach $1 million by 2033 — driven by scarcity from the halving mechanism and growing institutional adoption through spot Bitcoin ETFs.", cta: "Read Article", url: "https://finance.yahoo.com/news/veteran-investor-predicts-shocking-bitcoin-145042798.html" },
      { src: "Benzinga", icon: "news", type: "article", ytid: "", grad: "linear-gradient(135deg, #0a1028 0%, #1a3060 50%, #3b82f6 100%)", title: "Bitcoin To Reach $190,000 This Cycle, Michael Terpin Says", desc: "Transform Ventures CEO Michael Terpin shares his bitcoin price target for the current cycle, explaining the Four Seasons model and why the blow-off top phase typically peaks in Q4 after the halving.", cta: "Read Article", url: "https://www.benzinga.com/markets/cryptocurrency/24/11/42096519/bitcoin-to-reach-190000-this-cycle-michael-terpin-of-transform-group-says" },
      { src: "CoinDesk", icon: "news", type: "article", ytid: "", grad: "linear-gradient(135deg, #3d2a15 0%, #6b4a2a 50%, #f7a72f 100%)", title: "Transform Ventures CEO Says Bitcoin Could See \"One More Point of Pain\"", desc: "Michael Terpin discusses bitcoin's near-term outlook, warning of potential downside before the next major rally, and explains how the Supercycle Fund navigates bear market phases.", cta: "Read Article", url: "https://www.coindesk.com/markets/2026/02/12/transform-ventures-ceo-michael-terpin-says-bitcoin-could-see-one-more-point-of-pain" },
      { src: "London Real", icon: "mic", type: "interview", ytid: "", grad: "linear-gradient(135deg, #1a0d40 0%, #3a1f9e 50%, #6D4AFF 100%)", title: "Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich", desc: "Michael Terpin joins Brian Rose on London Real to explain how to time the bitcoin supercycle using his Four Seasons framework — turning crypto's cyclical patterns into a wealth-building strategy.", cta: "Watch Interview", url: "https://londonreal.tv/michael-terpin-bitcoin-supercycle-how-the-crypto-calendar-can-make-you-rich/" },
      { src: "Supply Shock Podcast", icon: "mic", type: "podcast", ytid: "", grad: "linear-gradient(135deg, #2a0d60 0%, #5b2d99 50%, #9b6dcc 100%)", title: "Bitcoin's Blow-off Top is Coming", desc: "Michael Terpin explains why the four-year bitcoin cycle is still intact, how bitcoin operates in \"seasons\" with predictable post-halving behavior, and why macro forces and ETF inflows may distort short-term sentiment but not the cycle.", cta: "Listen on Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/bitcoins-blow-off-top-is-coming-michael-terpin/id1558223079?i=1000721015026" },
      { src: "Medium", icon: "pen", type: "article", ytid: "", grad: "linear-gradient(135deg, #0a9488 0%, #0FB5A5 50%, #5eecd5 100%)", title: "Bitcoin Summer's Sudden End?", desc: "Michael Terpin analyzes the unexpected shift in bitcoin's seasonal cycle, examining whether the \"summer\" phase ended early and what it means for investors positioning for the next move.", cta: "Read on Medium", url: "https://medium.com/@michaelterpin/bitcoin-summers-sudden-end-3b77cd526608" },
    ],
  },
  blog: {
    hero: { eyebrow: "Blog & Insights", title: "Analysis from the Godfather of Crypto.", intro: "Thought leadership and market commentary on bitcoin cycles, crypto investing, and blockchain technology — from Michael Terpin and the Transform Ventures team." },
    posts: [
      { id: "four-seasons", tag: "Bitcoin Cycles", date: "April 2026", title: "Understanding the Four Seasons of Bitcoin", lede: "Michael Terpin's Four Seasons model maps bitcoin's price to a predictable four-year cycle driven by the halving. This framework has become one of the most widely referenced models for understanding where bitcoin is in its macro trajectory — and more importantly, where it's headed next.", body: ["Spring follows the halving with steady accumulation as smart money enters. This is the phase where experienced investors and institutions begin quietly building positions. Prices rise modestly, but the broader market hasn't yet caught on. The narrative is still cautious, and mainstream media remains skeptical.", "Summer brings the parabolic rally as retail FOMO kicks in. This is the explosive phase that captures headlines. Bitcoin begins making new all-time highs, social media activity surges, and new participants flood into the market. The price acceleration during summer is driven by a feedback loop of rising prices attracting new buyers, which pushes prices even higher.", "Fall marks the blow-off top where the speculative excess peaks. This is the most dangerous phase for uninformed investors. Euphoria reaches its maximum, leverage is at extreme levels, and the market becomes disconnected from fundamentals. The top is often marked by a rapid vertical price spike followed by an equally dramatic reversal.", "Winter is the prolonged bear market where weak hands capitulate. Prices can decline 70–80% from the peak, and the bear market typically lasts 12–18 months. This is when the market separates long-term believers from speculators. For those who understand the cycle, winter represents the ultimate buying opportunity.", "Understanding where we are in the cycle is the foundation of the Supercycle Fund's strategy. Rather than trying to time exact tops and bottoms, the fund adjusts its risk exposure based on which season bitcoin is currently in — increasing allocation during spring and reducing exposure as fall approaches.", "The model has correctly predicted major market turns, including the November 2024 all-time high. By combining this seasonal awareness with algorithmic execution, the Bitcoin Supercycle Fund aims to capture the majority of the upside while avoiding the worst of the drawdowns that define bitcoin's cyclical nature."] },
      { id: "1m-by-2033", tag: "Market Analysis", date: "March 2026", title: "Why Bitcoin Could Reach $1 Million by 2033", lede: "With each halving reducing supply while institutional demand accelerates through spot ETFs, the math points to a dramatically higher bitcoin price over the next two cycles. This isn't wishful thinking — it's the logical conclusion of basic supply and demand economics applied to the most scarce digital asset ever created.", body: ["Michael Terpin's projection of $1M by 2033 isn't based on hype — it's built on scarcity economics, diminishing new supply, and the historical pattern of 10–20x returns per cycle. Each halving cuts the rate of new bitcoin creation in half, effectively doubling the stock-to-flow ratio. This mechanism has reliably driven multi-year bull markets since bitcoin's inception.", "The approval of spot Bitcoin ETFs has opened the floodgates for institutional capital. For the first time, pension funds, endowments, and registered investment advisors can gain bitcoin exposure through familiar, regulated vehicles. The daily inflows into these ETFs have at times exceeded the daily production of new bitcoin by orders of magnitude, creating a structural supply deficit.", "Combined with bitcoin's fixed supply cap of 21 million coins, the supply-demand imbalance grows with every halving. Approximately 19.5 million bitcoin have already been mined, and a significant portion of those are estimated to be permanently lost. The remaining supply will be mined over the next century, with each halving making the new issuance increasingly negligible.", "The path to $1 million doesn't require bitcoin to become the world's reserve currency or replace gold entirely. It simply requires continued adoption at the current trajectory — more institutions allocating a small percentage of their portfolios, more nations considering strategic reserves, and more individuals using bitcoin as a savings technology. The math, when applied across two more halving cycles, makes the case compelling."] },
      { id: "algo-trading", tag: "Fund Strategy", date: "February 2026", title: "How Algorithmic Trading Enhances Bitcoin Cycle Returns", lede: "The Bitcoin Supercycle Fund combines seasonal awareness with algorithmic execution. This dual-layer approach leverages the best of both worlds: macro cycle positioning informed by the Four Seasons model and micro-level trade optimization driven by quantitative signals.", body: ["While the Four Seasons model tells us when to be aggressive and when to be defensive, the algo layer — powered by Tradely Labs' Project Rich Port — executes trades based on real-time sentiment, news flow, and on-chain signals to optimize entry and exit points. This means the fund isn't just positioned correctly for the macro cycle; it's also making tactical adjustments within each phase to maximize returns.", "The algorithmic system processes thousands of data points per day, including social media sentiment scores, whale wallet movements, exchange inflow and outflow patterns, funding rates across derivatives markets, and breaking news events. These signals are synthesized into actionable trading decisions that would be impossible for a human trader to execute consistently.", "The fund's backtested returns show significant outperformance versus simply holding BTC, primarily by reducing drawdowns during the winter phase and accelerating accumulation during spring. In historical simulations, the algorithmic approach captured approximately 80% of bitcoin's upside during bull phases while experiencing only 30–40% of the drawdowns during bear phases.", "This asymmetric risk-reward profile is particularly attractive to institutional investors who need to manage volatility within their portfolios. By combining cycle awareness with algorithmic precision, the Supercycle Fund offers a sophisticated approach to bitcoin investing that goes far beyond simple buy-and-hold strategies."] },
      { id: "bitcoin-only-fund", tag: "Industry", date: "January 2026", title: "The Case for a Bitcoin-Only Hedge Fund", lede: "Most crypto hedge funds diversify across dozens of altcoins, diluting returns and adding complexity. Managing a portfolio of 50 or 100 different tokens requires deep expertise across multiple ecosystems, constant rebalancing, and exposure to projects that may not survive the next bear market. The result is often mediocre performance that fails to justify the fees charged.", body: ["The Supercycle Fund takes a different approach — 100% bitcoin with tactical positioning across the cycle. By focusing exclusively on bitcoin, the fund eliminates the noise of altcoin selection and concentrates on what matters most: timing the macro cycle correctly and executing with precision.", "Bitcoin's dominance as the macro asset, combined with its predictable halving schedule, makes it the ideal vehicle for a cycle-driven strategy. No other cryptocurrency has the same depth of liquidity, institutional adoption, regulatory clarity, and network security. Bitcoin is the only crypto asset that has been classified as a commodity by major regulators, making it the most accessible for institutional capital.", "Unlike altcoins which can go to zero, bitcoin has survived every cycle and emerged stronger. Through multiple 80%+ drawdowns, exchange hacks, regulatory crackdowns, and media death spirals, bitcoin's network has continued to grow. Each cycle brings higher lows and higher highs, reinforcing its position as the foundational layer of the crypto ecosystem.", "For institutional investors seeking crypto exposure with managed risk, a bitcoin-only approach offers the best risk-adjusted returns. The combination of cycle-based positioning, algorithmic execution, and singular asset focus creates a strategy that is both simple to understand and powerful in execution. The Supercycle Fund is built on the conviction that doing one thing exceptionally well beats doing many things adequately."] },
    ],
  },
  contact: {
    hero: { eyebrow: "Contact", title: "Let's build the future together.", intro: "Whether you're raising capital, launching a token, or need strategic guidance — we'd love to hear about your project." },
    info: { heading: "Let's build the future together.", intro: "We'd love to hear about your project, partnership idea, or investment inquiry.", location: "San Juan, Puerto Rico", email: "info@transformventures.io", interests: "Investments · Advisory · Events · Partnerships" },
  },
  ...DIV,
};

const SCHEMA = {
  about: { label: "About", sections: [
    hero(HERO_FIELDS),
    { key: "story", label: "Story heading", fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
    ]},
    { key: "timeline", label: "Timeline", type: "list", itemLabel: "title", fields: [
      { key: "year", label: "Year", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
    ]},
    { key: "teamHead", label: "Team heading", fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ]},
    { key: "team", label: "Team members", type: "list", itemLabel: "name", fields: [
      { key: "photoImg", label: "Photo", type: "image" },
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "bio", label: "Short bio", type: "textarea" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "x", label: "X / Twitter URL", type: "url" },
    ]},
  ]},
  divisions: { label: "Divisions", sections: [
    hero(HERO_FIELDS),
    { key: "blocks", label: "Division blocks", type: "list", itemLabel: "name", fields: [
      { key: "num", label: "Number", type: "text" },
      { key: "badge", label: "Badge", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "color", label: "Accent color (CSS)", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      ...capFields(4),
    ]},
  ]},
  leadership: { label: "Leadership", sections: [
    hero(HERO_FIELDS),
    { key: "leader", label: "Founder bio", fields: [
      { key: "photoImg", label: "Photo", type: "image" },
      { key: "role", label: "Role", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "para1", label: "Bio paragraph 1", type: "textarea" },
      { key: "para2", label: "Bio paragraph 2", type: "textarea" },
      { key: "tags", label: "Tags (one per line)", type: "lines" },
    ]},
    { key: "pressHead", label: "Press heading", fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ]},
    { key: "press", label: "Press quotes", type: "list", itemLabel: "src", fields: [
      { key: "src", label: "Source", type: "text" },
      { key: "quote", label: "Quote", type: "textarea" },
    ]},
  ]},
  events: { label: "Events", sections: [
    hero(HERO_FIELDS),
    { key: "upcomingHead", label: "Upcoming heading", fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ]},
    { key: "upcoming", label: "Upcoming events", type: "list", itemLabel: "name", fields: [
      { key: "date", label: "Date", type: "text" },
      { key: "city", label: "City", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "tag", label: "Tag", type: "text" },
      { key: "bg", label: "Swatch gradient (CSS)", type: "text" },
    ]},
    { key: "brandsHead", label: "Event brands heading", fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ]},
    { key: "brands", label: "Event brands", type: "list", itemLabel: "name", fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "tag", label: "Tag", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "img", label: "Image", type: "image" },
      { key: "url", label: "Link", type: "url" },
    ]},
  ]},
  media: { label: "News & Media", sections: [
    hero(HERO_FIELDS),
    { key: "items", label: "Press items", type: "list", itemLabel: "title", fields: [
      { key: "src", label: "Source", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "cta", label: "Button text", type: "text" },
      { key: "url", label: "Link", type: "url" },
      { key: "type", label: "Type (youtube/article/social/interview/podcast)", type: "text" },
      { key: "icon", label: "Icon (play/news/mic/pen/linkedin)", type: "text" },
      { key: "ytid", label: "YouTube video id (if youtube)", type: "text" },
      { key: "grad", label: "Thumbnail gradient (CSS, if not youtube)", type: "text" },
    ]},
  ]},
  blog: { label: "Blog", sections: [
    hero(HERO_FIELDS),
    { key: "posts", label: "Blog posts", type: "list", itemLabel: "title", fields: [
      { key: "id", label: "Anchor id", type: "text" },
      { key: "tag", label: "Tag", type: "text" },
      { key: "date", label: "Date", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "lede", label: "Lede", type: "textarea" },
      { key: "body", label: "Body paragraphs (one per line)", type: "lines" },
    ]},
  ]},
  contact: { label: "Contact", sections: [
    hero(HERO_FIELDS),
    { key: "info", label: "Contact info", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "location", label: "Location", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "interests", label: "Interests", type: "text" },
    ]},
  ]},
  "division-group": divisionSchema("Division — Transform Group", false),
  "division-events": divisionSchema("Division — Transform Events", false),
  "division-capital": divisionSchema("Division — Transform Capital", false),
  "division-strategies": divisionSchema("Division — Transform Strategies", false),
  "division-fund": divisionSchema("Division — Supercycle Fund", true),
};

module.exports = { DEFAULTS, SCHEMA };
