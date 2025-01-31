// TypeScript does not generate code for Enums defined in declaration files.
// export enum CouponRank {
//   BEST = "best",
//   GOOD = "good",
//   BAD = "bad",
// }

export const readSubscribers = (): Subscribers => [
  { email: "john@coldmail.com", rec_count: 2 },
  { email: "sam@pmail.co", rec_count: 16 },
  { email: "linda1989@oal.com", rec_count: 1 },
  { email: "jan1940@ahoy.com", rec_count: 0 },
  { email: "mrbig@pmail.co", rec_count: 25 },
  { email: "lol@lol.lol", rec_count: 0 },
];

export const readCoupons = (): Coupons => [
  { code: "MAYDISCOUNT", rank: "good" },
  { code: "10PERCENT", rank: "bad" },
  { code: "PROMOTON48", rank: "best" },
  { code: "IHEARTYOU", rank: "bad" },
  { code: "GETADEL", rank: "best" },
  { code: "ILIKEDISCOUNTS", rank: "good" },
];

export const rankSubscriber = (subscriber: Subscriber) =>
  subscriber.rec_count >= 10 ? "best" : "good";

// If we wanted to, we could generalise out the filter? I don't suppose it's very useful here though.
// const rankFilter = rank => c => rank === c.rank
// export const selectGoodCoupons = (coupons: Coupons) => coupons.filter(rankFilter(CouponRank.GOOD))
// export const selectBestCoupons = (coupons: Coupons) => coupons.filter(rankFilter(CouponRank.BEST))

// TODO: This loops twice, we could make this more efficient with reduce?
// coupons.filter((c) => rank === c.rank).map(c => c.rank);
export const selectCouponsByRank = (coupons: Coupons, rank: CouponRank) => {
  return coupons.reduce((couponCodes, currentCoupon) => {
    if (currentCoupon.rank === rank) {
      couponCodes.push(currentCoupon.code)
    }

    return couponCodes;
  }, [] as CouponCodes)
}

// Also, I probably should not be using the built-in functional tools

export const planEmail = (
  subscriber: Subscriber,
  goodCoupons: CouponCodes,
  bestCoupons: CouponCodes
): EmailMessage => {
  const rank = rankSubscriber(subscriber);
  const coupons = rank === "best" ? bestCoupons : goodCoupons;
  const content =
    rank === "best"
      ? {
          subject: "Your best weekly coupons inside",
          body: `Here are the best coupons: ${coupons.join(",")}`,
        }
      : {
          subject: "Your good weekly coupons inside",
          body: `Here are the good coupons: ${coupons.join(",")}`,
        };

  return {
    to: subscriber.email,
    from: "newsletters@coupondog.co",
    ...content,
  };
};

// A calculation. We can run this as many times as we want, whenever we want 
export const planEmails = (
  subscribers: Subscribers,
  goodCoupons: CouponCodes,
  bestCoupons: CouponCodes
): EmailMessage[] => {
  return subscribers.map(subscriber => planEmail(subscriber, goodCoupons, bestCoupons))
};

// This is a side-effect where failure is expected (but not desired. We want to send emails 
// successfully but external factors and human errors can cause it to fail)
export const sendEmail = (message: EmailMessage): Result<EmailMessage> => {
  return Math.random() <= 0.5
   ? { success: true, value: message } 
   : { success: false, error: new Error("Couldn't send email"), value: message}
}

// We could invoke this as: sendEmails(planEmails(readSubscribers(), goodCoupons, bestCoupons)))
export const sendEmails = (messages: EmailMessage[]) => {
  return messages.map(email => sendEmail(email))
}
