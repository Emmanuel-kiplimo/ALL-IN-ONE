export interface Cause {
  id: string;
  title: string;
  description: string;
  fullStory: string;
  target: number;
  raised: number;
  image: string;
  urgent: boolean;
  impact: { [key: number]: string };
}

export const causesData: Cause[] = [
  {
    id: 'israel-iran-war',
    title: 'Israel-Iran War - Humanitarian Crisis Relief',
    description: 'Innocent families trapped in deadly crossfire. Thousands displaced, children injured.',
    fullStory: 'The escalating conflict between Israel and Iran has left a growing humanitarian disaster in its wake. Entire neighborhoods have been flattened, forcing families to flee with nothing but fear in their hearts. Hospitals are overwhelmed, clean water is scarce, and shelters are running out of space. Every day, mothers cradle their children in ruins, praying for safety that never comes. Your donation will provide food packs, medical aid, and emergency shelter to those who need it most — giving them a chance to survive, to heal, and to hold onto hope in the darkest of times.',
    target: 2500000,
    raised: 289486,
    image: '/images/israel iran war.jpg',
    urgent: true,
    impact: {
      25: 'Provides emergency food rations for a family of four',
      50: 'Supplies basic medical aid and hygiene kits for wounded civilians',
      100: 'Covers shelter materials for one displaced family',
      250: 'Funds an emergency trauma kit and clean water systems for a crisis zone'
    }
  },
  {
    id: 'sudan-famine',
    title: 'Sudan Civil War - Famine & Displacement Crisis',
    description: 'Severe starvation in Darfur and Khartoum. Over 10 million displaced, mothers have no food for babies.',
    fullStory: 'The escalating conflict in Sudan has pushed millions to the brink of starvation. In camps in Darfur and across Khartoum, mothers mix dirt with water to feed their children. Over 10 million people have been forced from their homes, making Sudan the largest displacement crisis on Earth. Famine has been declared in multiple regions. Your gift delivers immediate clinical food supplements, clean water, and emergency medical kits to refugees fleeing the violence.',
    target: 1500000,
    raised: 412000,
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    urgent: true,
    impact: {
      25: 'Provides clinical therapeutic food packs to save 2 severely malnourished children for a month',
      50: 'Delivers clean drinking water and hygiene supplies to a refugee family for 6 weeks',
      100: 'Covers medical supplies and emergency first-aid for civilians wounded in conflict zones',
      250: 'Funds a shelter construction kit and survival gear for a displaced Sudanese family'
    }
  },
  {
    id: 'ukraine-winter',
    title: 'Ukraine Winter Emergency - Power & Warmth Relief',
    description: 'Freezing sub-zero temperatures with damaged electricity grids. Families struggle to stay warm in bombed shelters.',
    fullStory: 'As winter temperatures plunge to -20°C, repeated infrastructure strikes have left millions in Ukraine without heat, power, or water. Elderly residents are trapped in frozen high-rise apartments, and children shiver in dark, unheated basements. The cold is a quiet, deadly enemy. We are distributing mobile generators, wood stoves, heavy thermal blankets, and high-energy food parcels to vulnerable communities. Your contribution provides immediate warmth and light to help them survive the winter.',
    target: 2000000,
    raised: 915000,
    image: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    urgent: true,
    impact: {
      25: 'Provides a high-thermal insulated sleeping bag for a child sleeping in a basement shelter',
      50: 'Supplies a heavy winter coat, thermal gloves, and boots for an elderly refugee',
      100: 'Delivers a month of heating fuel and emergency food rations for a family',
      250: 'Covers a shared portable wood-burning stove and firewood to heat a shelter block'
    }
  },
  {
    id: 'drc-health',
    title: 'DR Congo Conflict & Health Emergency',
    description: 'Violent fighting displaces thousands in Goma camps amid a worsening Mpox epidemic. Clinics lack basic gloves and medicines.',
    fullStory: 'In eastern DR Congo, escalating rebel activity around Goma has forced hundreds of thousands into overcrowded, unsanitary displacement camps. To make matters worse, a highly contagious Mpox strain is sweeping through these camps, targeting malnourished children. Local clinics are overwhelmed and lack clean water, gloves, or treatments. Your donation funds isolation tents, clean water delivery, disinfectants, and life-saving medical supplies to contain the outbreak and support displaced families.',
    target: 1200000,
    raised: 284500,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    urgent: true,
    impact: {
      25: 'Provides clinical sanitizers, masks, and protective gloves for a camp medical worker',
      50: 'Supplies clean water treatment kits and soap for 15 displaced families',
      100: 'Delivers medication and supportive treatments for a child infected with Mpox',
      250: 'Funds a quarantine shelter space and clinical supplies to stop the spread of infection'
    }
  },
  {
    id: 'gaza-palestine',
    title: 'Gaza, Palestine - Emergency Shelter',
    description: 'Rebuilding shattered homes after relentless bombings. Families with children are living in tents without electricity or clean water.',
    fullStory: 'The situation in Gaza is desperate. After months of conflict, entire neighborhoods have been reduced to rubble. Families who once had comfortable homes now sleep in makeshift tents with no protection from the elements. Children wake up cold and hungry, with no school to attend and no safe place to play. Your donation will provide emergency shelter materials, clean water systems, and basic necessities to help these families survive and begin rebuilding their lives with dignity.',
    target: 1000000,
    raised: 675900,
    image: '/images/Gaza palestine.jpg',
    urgent: true,
    impact: {
      25: 'Provides emergency blankets and basic supplies for one family',
      50: 'Supplies clean water for 10 families for one week',
      100: 'Builds temporary shelter for one displaced family',
      250: 'Provides comprehensive aid package including food, water, and shelter materials'
    }
  },
  {
    id: 'iran-earthquake',
    title: 'Iran Earthquake Survivors',
    description: 'Thousands left homeless after a devastating quake. Elderly and newborns sleep in open fields.',
    fullStory: 'A magnitude 7.1 earthquake struck western Iran in the early hours of the morning, catching families in their sleep. Within seconds, entire villages were flattened. The death toll continues to rise, but the survivors face an equally grim reality - winter is approaching, and thousands are sleeping outdoors with no shelter. Elderly residents and newborn babies are particularly vulnerable to the harsh conditions.',
    target: 750000,
    raised: 423300,
    image: '/images/iran earthquake.jpg',
    urgent: true,
    impact: {
      25: 'Provides warm blankets and emergency supplies for elderly survivors',
      50: 'Delivers medical supplies and baby formula to families with newborns',
      100: 'Sets up temporary heating shelter for 20 people',
      250: 'Provides comprehensive earthquake relief package for a family'
    }
  },
  {
    id: 'south-sudan-flood',
    title: 'South Sudan Flood Relief',
    description: 'Entire villages submerged. Women carry babies through waist-deep water, desperate for shelter and food.',
    fullStory: 'Months of unprecedented rainfall have led to catastrophic flooding in South Sudan, submerging entire communities. Families have lost their homes, their livestock, and their livelihoods. With contaminated water sources and a lack of sanitation, the risk of waterborne diseases like cholera is dangerously high. Your support can provide life-saving essentials like clean water purification tablets, emergency food supplies, and temporary shelters to protect vulnerable families from the elements and disease.',
    target: 600000,
    raised: 318000,
    image: '/images/south sudan flood.jpg',
    urgent: false,
    impact: {
      25: 'Provides a family with a clean water kit for one month.',
      50: 'Delivers emergency food rations to a family of five.',
      100: 'Supplies a temporary shelter kit for a displaced family.',
      250: 'Funds a mobile health clinic visit to a remote, flooded village.'
    }
  },
  {
    id: 'conflict-relief',
    title: 'Israel-Palestine Conflict Support',
    description: 'Civilians on both sides suffer. We provide cross-border medical supplies and trauma support.',
    fullStory: 'In the heart of the Israel-Palestine conflict, it is the civilians—children, parents, and the elderly—who bear the heaviest burden. Our mission is to provide impartial aid. We work with partners on both sides to deliver critical medical supplies to overwhelmed hospitals, set up trauma support centers for those affected by violence, and ensure that essential humanitarian aid reaches those cut off by the conflict. Your donation transcends politics; it is a direct message of hope and healing to people in desperate need.',
    target: 900000,
    raised: 546700,
    image: '/images/israel palestine.jpg',
    urgent: false,
    impact: {
      25: 'Supplies a first-aid kit to a family.',
      50: 'Provides a session of trauma counseling for a child.',
      100: 'Delivers a shipment of essential medical supplies like bandages and antiseptics.',
      250: 'Funds a day of operations for a mobile medical unit.'
    }
  },
  {
    id: 'afghanistan-winter',
    title: 'Afghanistan Winter Emergency',
    description: 'Children walk barefoot in snow. We\'re providing blankets, food, and heating supplies.',
    fullStory: 'Winter in Afghanistan is a silent killer. For families living in makeshift shelters without proper heating or clothing, the freezing temperatures are a daily battle for survival. Children are especially vulnerable to hypothermia and illness. Hope Charity is on the ground distributing high-thermal blankets, warm winter clothing, nutritious food packs, and safe heating supplies to help families endure the harsh winter. Your contribution can be the warmth that saves a life.',
    target: 800000,
    raised: 480900,
    image: '/images/winter afhaganster.jpg',
    urgent: true,
    impact: {
      25: 'Provides a warm winter blanket for a child.',
      50: 'Supplies a family with a winter clothing kit (hats, gloves, scarves).',
      100: 'Delivers a one-month supply of heating fuel for a family.',
      250: 'Provides a complete winter survival kit for a family, including food, blankets, and fuel.'
    }
  }
];