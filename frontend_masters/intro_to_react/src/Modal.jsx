import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const modalElementRef = useRef(null);
  const elementRef = useRef(null);

  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }
  // after this, elementRef will always point to the same div, the one we created.

  useEffect(() => {
    if (!modalElementRef.current) {
      modalElementRef.current = document.getElementById("modal");
      if (modalElementRef.current == null) {
        console.log("Create the modal element");
        modalElementRef.current = document.createElement("div");
        modalElementRef.current.id = "modal";
      }

      const body = document.getElementsByTagName("body").item(0);
      body.appendChild(modalElementRef.current);
    }

    modalElementRef.current.appendChild(elementRef.current);

    // clean up
    return () => {
      modalElementRef.current.removeChild(elementRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elementRef.current);

  // `createPortal` renders the first argument, `children`, into `domNode`, the second argument.

  // The second parameter we've provided, is a new `div` we've created and made
  // a child of the modal element outside of the react tree

  // So, createPortal will render `children` into a new div that gets put into
  // the modal container outside of the tree.

  // The CSS from the static server takes care of styling the modal and the
  // child div that we're inserting into it.
};

export default Modal;
