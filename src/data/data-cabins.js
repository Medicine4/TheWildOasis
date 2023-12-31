import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;

export const cabins = [
  {
    name: "001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: imageUrl + "cabin-001.jpg",
    description:
      "在舒适的 001 木屋中探索情侣的终极豪华度假胜地。这间令人惊叹的木屋坐落在风景如画的森林中，提供僻静而私密的休息场所。 在室内，您可以享受现代高品质木质内饰、舒适的休息区、壁炉和设备齐全的厨房。 配有精美床单的豪华特大号床可确保您享受宁静的睡眠。 在水疗式淋浴间放松身心，并在带热水浴缸的私人甲板上放松身心。",
  },
  {
    name: "002",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: imageUrl + "cabin-002.jpg",
    description:
      "逃离宁静的大自然，在我们舒适的 002 小屋中享受奢华。这间小屋非常适合情侣，在风景如画的森林中心提供僻静而私密的休息场所。 在室内，您会发现采用优质木材制成的温馨宜人的内饰、舒适的起居区、壁炉和设备齐全的厨房。 豪华卧室配有豪华特大号床和水疗式淋浴。 在带热水浴缸的私人甲板上放松身心，欣赏大自然的美景。",
  },
  {
    name: "003",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: imageUrl + "cabin-003.jpg",
    description:
      "在我们的中型木屋 003 中体验豪华家庭生活。这间小屋非常适合最多 4 人的家庭，提供舒适温馨的空间，配备所有现代化设施。 在里面，您会发现采用优质木材制成的温馨宜人的内饰、舒适的起居区、壁炉和设备齐全的厨房。 卧室配有豪华床和水疗式浴室。 小屋设有带热水浴缸的私人甲板和户外休息区，非常适合欣赏自然环境。",
  },
  {
    name: "004",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: imageUrl + "cabin-004.jpg",
    description:
      "在这间中型客舱 004 中尽情享受终极豪华的家庭假期。这间客舱专为最多 4 人的家庭而设计，为挑剔的旅客提供奢华的休憩之所。 小屋内部拥有采用最优质木材制成的华丽内饰、舒适的起居区、壁炉和设备齐全的美食厨房。 卧室配有豪华床铺和水疗风格的连接浴室。 走到您的私人甲板上，沉浸在自然环境中，同时在自己的热水浴缸中放松身心。",
  },
  {
    name: "005",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: imageUrl + "cabin-005.jpg",
    description:
      "在我们宽敞的 005 小屋中与您的团体或家人享受舒适温馨的假期。这间小屋最多可容纳 6 人，在大自然的中心提供一处僻静的休息场所。 小屋内部采用优质木材制成的温馨宜人的内饰、带壁炉的起居区以及设备齐全的厨房。 卧室舒适并配有连接浴室。 走到您的私人甲板上，一边欣赏周围的自然风光，一边在自己的热水浴缸中放松身心。",
  },
  {
    name: "006",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: imageUrl + "cabin-006.jpg",
    description:
      "在我们宽敞的 006 木屋中与您的团体或家人一起体验奢华的缩影。这间木屋最多可舒适地容纳 6 人，在大自然的中心提供奢华的休憩之所。 小屋内部采用优质木材制成的华丽内饰、带壁炉的宽敞起居区以及设备齐全的美食厨房。 卧室配有豪华床铺和水疗式连接浴室。 走到您的私人甲板上，沉浸在自然环境中，同时在自己的热水浴缸中放松身心。",
  },
  {
    name: "007",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: imageUrl + "cabin-007.jpg",
    description:
      "宽敞而宏伟的 007 木屋可容纳您的大型团体或多个家庭。这间木屋最多可舒适地容纳 8 人，在美丽的森林和山脉中心提供一处僻静的休息场所。 小屋内部采用优质木材制成的温馨宜人的内饰、多个带壁炉的起居区以及设备齐全的厨房。 卧室舒适并配有连接浴室。 小屋设有带热水浴缸的私人甲板和户外休息区，非常适合欣赏自然环境。",
  },
  {
    name: "008",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: imageUrl + "cabin-008.jpg",
    description:
      "在我们的豪华客舱 008 中与您的大型团体或多个家庭一起体验奢华和宏伟的缩影。这间客舱提供奢华的休息场所，可满足您的所有需求和愿望。 客舱采用华丽的设计，并拥有高端饰面、复杂的细节和最优质的木材。 小屋内部设有多个带壁炉的宽敞起居区、一个正式用餐区以及一个厨师梦想的美食厨房。 卧室专为极致舒适和奢华而设计，配有豪华床铺和水疗风格的套间浴室。 走出去，在您的私人甲板上沉浸在大自然的美景中，这里设有豪华的热水浴缸和宽敞的休息区，让您享受终极的放松和享受。",
  },
  {
    name: "哇偶",
    maxCapacity: 11,
    regularPrice: 1111,
    discount: 0,
    image: imageUrl + "FLAMING MOUNTAIN.jpg",
    description: "丝滑的嘞",
  },
];
