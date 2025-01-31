// It seems to me that using a TypeScript .d file is a good
// way to practice Eric Normand's "Runnable Spec"

// Data
type EmailMessage = {
  to: string;
  from: string;
  subject: string;
  body: string; // in reality, we might want a function to deal with things like mime boundaries etc.
};

type Emails = EmailMessage[];

type Result<T> =
  | { success: true; value: T }
  | { success: false; error: Error; value: T };

type Subscriber = {
  email: string;
  rec_count: number;
};

type Subscribers = Subscriber[];

type CouponRank = "best" | "good" | "bad";

type Coupon = {
  code: string;
  rank: CouponRank;
};

type Coupons = Coupon[];

type CouponCodes = string[]

type RankedSubscriber = {
  email: string;
  couponRank: CouponRank;
};

// CALCULATIONS
declare function planListOfEmails(options: {
  coupons: Coupons;
  subscribers: Subscribers;
}): Emails;

declare function selectGoodCoupons(coupons: Coupons): CouponCodes;
declare function selectBestCoupons(coupons: Coupons): CouponCodes;
declare function rankSubscriber(subscriber: Subscriber): CouponRank;

declare function planEmail(
  subscriber: Subscriber,
  goodCoupons: Coupons,
  bestCoupons: Coupons
): EmailMessage;

declare function createEmailMessage(message: {
  to: string;
  from: string;
  subject: string;
  message: string;
}): EmailMessage;

// ACTIONS
declare function sendEmail(message: EmailMessage): Result<EmailMessage>;
declare function readSubscribers(): Subscribers;
declare function readCoupons(): Coupons;
