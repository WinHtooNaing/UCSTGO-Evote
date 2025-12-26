export interface OnboardItem {
  _id: string;
  title: string;
  description: string;
  img: any; // Lottie JSON → use `any`
}

const data: OnboardItem[] = [
  {
    _id: "1",
    title: "ကြိုဆိုပါ၏ 💙",
    description: "ကွန်ပျူတာတက္ကသိုလ်(တောင်ငူ) မှ နွေးထွေးစွာ ကြိုဆိုပါ၏။",
    img: require("@/assets/animation/Christmas.json"),
  },
  {
    _id: "2",
    title: "Vote အမျိုးအစားများ",
    description:
      "King ၊ Queen ၊ Prince ၊ Princess ၊ Innocent အမျိုးအစား ၅ မျိုး vote ပေးနိုင်ပါသည်။",
    img: require("@/assets/animation/register.json"),
  },
  {
    _id: "3",
    title: "Vote ပေးဖို့ မမေ့နဲ့နော်",
    description: "သင့်ရွေးချယ်မှုက\nအမှတ်တရအချိန်တွေကို ဖန်တီးပေးနိုင်ပါတယ်။💫",
    img: require("@/assets/animation/vote.json"),
  },
];

export default data;
