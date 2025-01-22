import { useFormStatus } from "react-dom";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  // useMutation means you're using mutating method such as PUT, POST, PATCH,
  // DELETE etc


  const formActionHandler = async (formData) => {
    // inject a pause so we make the form take a while 
    // to submit and see the use of the useFormStatus 
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return postContact(
      formData.get("name"),
      formData.get("email"),
      formData.get("message")
    );
  };

  const mutation = useMutation({
    // We are going to use this fn as an event handler for the form's submit event
    mutationFn: formActionHandler, // we can access this later with `mutation.mutate`

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
        <form action={mutation.mutate}>
          {/* we register the `mutation.mutate` (that is submitHandler), to the submit event handler */}
          <ContactInput name="name" placeholder="Name" />
          <ContactInput type="email" name="email" placeholder="Email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

// See <https://react.dev/reference/react-dom/hooks/useFormStatus>
function ContactInput(props) {
  const { pending } = useFormStatus();
  return (
    <input
      disabled={pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

