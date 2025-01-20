# Complete Intro to React V9

This is the coursework/project for the Frontend Masters Course Complete Intro
to React v9.

Course Site: <https://react-v9.holt.courses/>

## Why?

I don't think I need the basic of React, but I do want a starter course to
re-expose me to the current React and tools/libraries being used, especially React
Query, that I'll be using more at work because of the new projects.

I'll be doing less work maintain our legacy KnockoutJS

## Notes

### React

Composition. As we progress you'll see that we're replacing things with
components we've made. A composition of components of we've remade. That's what
React is for the most part, just composing comoonents into other components.

### Context

This project uses `Context` to make Shopping Cart information available at an
app level however, in a project of this size, it would almost certainly be
better to keep this state in the `App` component and pass it down to children.

So we would have pulled the `cart` state into `App` and then passed it as a
**prop** down to `Header` and `Order` components. This is "Lifting State Up",
where state is moved to a parent Component higher in the tree.

<https://react.dev/learn/passing-data-deeply-with-context>

### Performance

You should be very performant on your render paths. For example, the `Pizza`
component function body is a very hot path and is run many more times than you
can see.

Try to keep these render paths very performant because when they
update and they're slow, they can cause things like "sticking" or "jank".

You don't want to put very heavy lifting in your render paths. These are things
like side-effects such as IO/Network requests, slow intensive computations.

### Proxy IRL

This project uses Vite to proxy some requests to an API and static assets
server. In actual production, you would/could do the same thing with whatever
you're using for ingress like NGINX.

You would have some routes directed/proxied to a static server or CDN, and other
routes to your app or services.

## Anecodotes

- Vite is pronoucned "veet". Supposed to be French for "quick", or an allusion
  to the french word.

- Vite's default server port is `5173`. In Roman Numberals this looks like the
  word "vite".

- JSX came about because they needed to convince some of the PHP Hack developers
  to use React in the early days.

- The `className` prop actually comes from the DOM Element API. And yes,
  coveniently worksaround the `class` keyword clash.

### Snapshot Testing

> As a side note, one place I saw some use for snapshot tests (as they can track
> any object shape over time, not just React components) was in the backend in API
> response shapes. We'd write a snapshot test that this API response is always
> going to look like this and it should fail the test if it breaks. This makes it
> very intentional every time you modify the API response (since your API clients
> are likely relying on it being a certain shape.) Furthermore, it means the
> frontend devs can use these snapshot files to see what the API response is going
> to look like. Niche, but it was helpful on the one project I worked on that had
> it.

## Tips

- Sometimes including a bit of functionality for testing as a named export can be helpful if you need to do something special with the Component.

  ```js
  export default const Pizza = () => {}
  export const TestPizza = () => {}

  // ---

  import Pizza, { TestPizza } from "./Pizza"
  ```
