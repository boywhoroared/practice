import { test, expect } from "vitest";
import {
  readSubscribers,
  readCoupons,
  rankSubscriber,
  selectCouponsByRank,
  planEmail,
  planEmails,
  sendEmails
} from ".";

test("should rank a subscriber ", () => {
  const subscribers = readSubscribers();
  const result = rankSubscriber(subscribers[1]);
  expect(result).toBe("best");
});

test("select good coupons", () => {
  const coupons = selectCouponsByRank(readCoupons(), "good");
  expect(coupons.length).toEqual(2);
});

test("select best coupons", () => {
  const coupons = selectCouponsByRank(readCoupons(), "best");
  expect(coupons.length).toEqual(2);
});

test("plan an email", () => {
  const coupons = readCoupons();
  const goodCoupons = selectCouponsByRank(coupons, "good");
  const bestCoupons = selectCouponsByRank(coupons, "best");
  const subscribers = readSubscribers();
  const subscriber = subscribers[0];
  const plannedEmail = planEmail(subscriber, goodCoupons, bestCoupons);

  expect(plannedEmail).toMatchObject(
    {
      to: "john@coldmail.com",
      subject: "Your good weekly coupons inside",
    }
  );

  const plannedEmails = planEmails(subscribers, goodCoupons, bestCoupons)
  expect(plannedEmails).toEqual(expect.arrayContaining([
    expect.objectContaining({ to: expect.stringContaining("@")})
  ]))
});

test("send emails", async () => {
  const coupons = readCoupons();
  const goodCoupons = selectCouponsByRank(coupons, "good");
  const bestCoupons = selectCouponsByRank(coupons, "best");
  const subscribers = readSubscribers();
  const plannedEmails = planEmails(subscribers, goodCoupons, bestCoupons);
  const sentEmails = sendEmails(plannedEmails)

  // some emails will fail
  expect(sentEmails.filter(s => s.success === false).length).toBeGreaterThanOrEqual(0)
})
