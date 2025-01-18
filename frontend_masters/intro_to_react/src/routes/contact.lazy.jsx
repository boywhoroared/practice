import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  // useMutation means you're using mutating method such as PUT, POST, PATCH,
  // DELETE etc

  // I miss TypeScript!

  /**
   * A fn that we're going to use as the mutation fn and form's submit handler.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @returns {Promise}
   */
  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    return postContact(
      formData.get("name"),
      formData.get("email"),
      formData.get("message")
    );
  };

  const mutation = useMutation({
    // We are going to use this fn as an event handler for the form's submit event
    mutationFn: submitHandler, // we can access this later with `mutation.mutate`

    // Cool:
    // You can use `onMutate` callback, that receives same arguments as `mutationFn`,
    // to perform optimistic updates to a resource or component  in hopes the mutation succeeds.
    // For example: if you wanted to change the content of a component assuming the request succeedss
    // It didn't succeed, you can also use the `onError` and `onSettled` functons to roll back
    // those optimistic updates.
  });

  /* This is an uncontrolled form. Note how we haven't bound the form elements to
   * any state. It's not "reactive" */

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          {/* we register the `mutation.mutate` (that is submitHandler), to the submit event handler */}
          <input name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
