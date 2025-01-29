import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

test("can submit contact form", async () => {
  // "intercepts" all fetch requests and returns this response
  fetchMock.mockResponse(JSON.stringify({ status: "OK" }));

  // ...if we're using multiple API calls, we can get specific by matching
  // different routes with different responses, headers etc

  const domClient = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  );

  const nameInput = domClient.getByPlaceholderText("Name");
  const emailInput = domClient.getByPlaceholderText("Email");
  const messageInput = domClient.getByPlaceholderText("Message");

  const testData = {
    name: "Brian",
    email: "test@example.com",
    message: "This is a message",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageInput.value = testData.message;

  // submit the form as a user in a browser would
  const button = domClient.getByRole("button");
  button.click();

  // test the user is notified the contact form was submitted
  // we use `await` so we can wait for the heading to show up after the request was successful.
  // Remember, our form goes to a loading state first
  const h3 = await domClient.findByRole("heading", { level: 3 });
  expect(h3.innerText).toContain("Submitted");

  // test that we're calling the API correctly
  const requests = fetchMock.requests();
  expect(requests.length).toBe(1); // we should only send 1 request
  expect(requests[0].url).toBe("/api/contact");
  expect(fetchMock).toHaveBeenCalledWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  // Typically, in a larger app, you'd have a library for interfacing with the API
  // and you'd test this there.
});
