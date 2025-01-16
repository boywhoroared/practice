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

### Anecodotes

- Vite is pronoucned "veet". Supposed to be French for "quick", or an allusion
  to the french word.

- Vite's default server port is `5173`. In Roman Numberals this looks like the
  word "vite".

- JSX came about because they needed to convince some of the PHP Hack developers
  to use React in the early days.

- The `className` prop actually comes from the DOM Element API. And yes,
  coveniently worksaround the `class` keyword clash.

#### Performance

You should be very performant on your render paths. For example, the `Pizza`
component function body is a very hot path and is run many more times than you
can see.

Try to keep these render paths very performant because when they
update and they're slow, they can cause things like "sticking" or "jank".

You don't want to put very heavy lifting in your render paths. These are things
like side-effects such as IO/Network requests, slow intensive computations.

#### Proxy IRL

This project uses Vite to proxy some requests to an API and static assets
server. In actual production, you would/could do the same thing with whatever
you're using for ingress like NGINX.

You would have some routes directed/proxied to a static server or CDN, and other
routes to your app or services.

### Tips

- Sometimes including a bit of functionality for testing as a named export can be helpful if you need to do something special with the Component.

  ```js
  export default const Pizza = () => {}
  export const TestPizza = () => {}

  // ---

  import Pizza, { TestPizza } from "./Pizza"
  ```
