;; One Function, Different Parameters
;; We can create overloaded functions


(defn greet
  ([to-whom] (println "Welcome to Blotts Books" to-whom))
  ([message to-whom] (println message to-whom)))

(greet "Dolly") ; Welcomes Dolly to Blotts Books
(greet "Howdy" "Stranger") ;  Prints Howdy Stranger

; The technical term for number of arguments a function takes is arity
; Functions like `greet` are called multi-arity functions

; One problem with `greet` is that the two function bodies are reasonably redundant.
; Both variations print a message and name. This is common in multi-arity functions as
; each arity of the function should be doing more or less the same thing or we probably should
; have written two separate functions
;

; The way to get rid of this redundancy is simple and equally common: just call one arity from the other.

(defn greet
  ([to-whom] (greet "Welcome to Blotts Books" to-whom))
  ([message to-whom] (println message to-whom)))

; The idea/mechanics of this "filling in the defaults" techniquie is that you have one arity - 
; usually the one with the most arguments - that really does something (does the actual work). 
; The other aritiees, the one that take fewer arguments, call that main version, filling in the 
; missing parameters as they go.
;
; (Actually, I'm sure I've seen this as a codified design pattern/refactoring somewhere before)

;;
;; ARGUMENTS WITH WILD ABANDON
;; Functions that deal with a completely arbitrary number of arguments
;; Using `&` in the argument list
(defn print-any-args [& args]
  (println "My arguments are: " args))

(print-any-args "x" "y" "z" "1") ; prints "My arguments are: x y z 1"
(print-any-args 7 true nil) ; prints "My arguments are: 7 true nil"

(defn first-argument [& args]
  (first args)) ; #'user/first-argument

(first-argument 7 true nil) ; 7

; You can have ordinary arguments before the &
; We can rewrite `first-argument` like this:
(defn new-first-argument [x & args] x)

(new-first-argument 7 true nil) ; 7

;; Functions that take advantage of the & are called _varargs_ or _variadic_ functions.
;; The key syntactic difference between variadic and multi-arity functions:
;; multi-arity fns definea a separate function body for each set of arguments while variadic fns 
;; (the ones with &) have a single function body

;; MULTIMETHODS
;; Clojure's polymorphism?

;; Multi-arity and variadic functions are greate those situations where you want to build functions 
;; that are less picky about the number of arguments they will accept.

;; However, sometimes what you want is to be able to *vary your function's behaviour* based on some other
;; aspect of the values that get passed to it.

; Suppose that we had a system that is getting book data from various sources, in different formats:

{:title "War and Peace" :author "Tolstoy"}

; While others come in maps with differen keys
{:book "Emma" :by "Austen"}

; And still, others are encoded in vectors
["1984" "Orwell"]

;; We could handle this by coverting the odd-ball formats into our standard map
(defn normalise-book [book]
  (if (vector? book)
    {:title (first book) :author (second book)} ; convert the vector to a map
    (if (contains? book :title) ; if the book is the map structure we expect...
      book
      {:title (:book book) :author (:by :book)}))) ; else, convert the book from one map structure to ours

;; There is nothing wrong with this approach, but if we had to deal with many book formats, from
;; lists to XML and JSON encoded strings, this simple normalise-book function is likely to get ugly
;; very quickly.

;; Multi methods let you have a single function with multiple implementations.
;; Unlike multi-arity functions, which pick the implementation based on the arguments,
;; multimethods allow you to pick the implementation based on **any** characteristic of 
;; it's arguments

;; Writing a multimethod is an exercising in splitting the problem apart.
;; First, you need a function to do the splitting by categorising the different
;; kinds of arguments.

;; In this example, we need function to distinguish the different formats of book data
(defn dispatch-book-format [book]
  (cond
    (vector? book) :vector-book
    (contains? book :title) :standard-map
    (contains? book :book) :alternative-map))

;; OK, so if you pass a `book` value to `dispatch-book-format` it will tell you
;; kind of format (as a keyword value)

;; Now we declare a multimethod that uses this function to categorise it's arguments

(defmulti normalise-book dispatch-book-format)

;; Then we define the implementations
(defmethod normalise-book :vector-book
  [book] {:title (first book) :author (second book)})

(defmethod normalise-book :standard-map
  [book] book)

(defmethod normalise-book :alternative-map
  [book] {:title (:book book) :author (:by book)})

;; Now we end up with a single argument function called `normalise-book` that will first
;; run it's argument through `dispatch-book-format` and, based on the result, pick an implementation.

;; (It's like registering handlers)

;; Just returns the same (standard book map)
(normalise-book {:title "War an Peace" :author "Tolstoy"}) ; {:title "War an Peace", :author "Tolstoy"}

(normalise-book {:book "Emma" :by "Austen"}) ; {:title "Emma", :author "Austen"}

(normalise-book ["1984", "Orwell"]) ; {:title "1984", :author "Orwell"}

; I suppose you could do the same thing yourself with the cond directly and define mutliple functions yoursel?
; But then I suppose that `defmulti` and `defmethod` is a macro for doing exactly that 

; A careful reader will notice that normalise-book doesn't contain any code to handle bad input.
; The good news is the dispatch function produces a value for which there is no corresponding defmethod,
; Clojure will generate an exception, which is probably what you want.

;; Alternatively,  You can supply a method for the `:default` keyword that will handle 
;; categories/attributes that don't have a corresponding defmethod that will cover 
;; the "everything else" case

(defmethod normalise-book :default [book]
  (throw (ex-info "Unknown book format" {:book book})))

(normalise-book '("Title", "Author"))
; Using a List rather than Vector or Map produces an exception because `contains?` 
; in the dispatch method doesn't work on maps (:)

; I suppose we'd have to make the `cond` return `:default` if there aren't any matches?

;; The cool thing about multimethods is that in writing the dispatch function, you can choose
;; any criteria that you want. For example, in the USA, the copyright period is different 
;; depending on when a book was published.
;;
;; If our book maps include a :published key, then we could write a multimethod that decides what
;; to do based on the year of publication.

(defn dispatch-published [book]
  (cond
    (< (:published book) 1928) :public-domain
    (< (:published book) 1978) :old-copyright
    :else :new-copyright))

(defmulti compute-royalties dispatch-published)

(defmethod compute-royalties :public-domain [book] 0)
(defmethod compute-royalties :old-copyright [book]
  ;; compute royalties based on old copyright law
  1.5)

(defmethod compute-royalties :old-copyright [book]
  ;; compute royalties based on new copyright law
  3)

;; In a sense multimethods are generalisation of the kind of type based 
;; polymorphism found in OO languages

;; Multimethods are more general in the sense that _YOU_ get to decide the
;; criteria to use to pick the function. You can always change the guts of the 
;; dispatch fn to pick you implementation a different way.
;; Or create a different multimethod that categorises its arguments in some other
;; way.

;; There is no requirement that all the bits of a multimethod have to be 
;; defined in the same file or at the same time. You can define the multimethod
;; and define new methods later.

;; This sort of multimethod addition does have to appear in the same file or 
;; be written by the sme programmer as the originals.
;;
;; Multimethods provide a great extension point for your code.

;; Example of "extending". Let's say our books contained a :genre key

(def books
  [{:title "Pride and Prejudice" :author "Austen" :genre :romance}
   {:title "World War Z" :author "Brooks" :genre :zombie}])

;; This uses the :genre keyword as function to do a look up on the map.
;; Remember that keywords can be invoked as a function with a map argument
;; to look up the associated value in the map 

;; So here, the keyword becomes the dispatch function and the result will be theo
;; keyword's associated value (which is also a keyword in this case) and our methods
;; will match on that
(defmulti book-description :genre)

(defmethod book-description :romance [book]
  (str "The heart warming new romance by " (:author book))) ; use the :author keyword to lookup the actual author of the book 

(defmethod book-description :zombie [book]
  (str "The heart consuming new zombie adventure by " (:author book)))

(map book-description books)
; ("The heart warming new romance by Austen"
;  "The heart consuming new zombie adventure by Brooks")

; What if much later someone comes up with a new genre?

(def ppz {:title "Pride and Prejudice  and Zombies"
          :author "Grahame-Smith"
          :genre :zombie-romance})

; No problem, just define a new method 
; This method doesn't have to appear in the same file
(defmethod book-description :zombie-romance [book]
  (str "The heart warming, and consuming, new romance by " (:author book)))

(book-description ppz) ; "The heart warming, and consuming, new romance by Grahame-Smith"

;; Deeply Recursive / Recursion
;; Clojure provides specialised support for writing recursive functions. 
;; (This is likely because this how loops are done?

(def books [{:title "Jaws" :copies-sold 2000000}
            {:title "Emma" :copies-sold 3000000}
            {:title "2001" :copies-sold 4000000}])

; If we want to know the total number of books sold, we could 
; write (albeit naively) a recursive function to run through
; all elements of the vector

(defn sum-copies
  ([books] (sum-copies books 0)) ; multi-arity/overloaded function parameters
  ([books total] (if (empty? books)
                   total ; if there are no books, return the total
                   (sum-copies
                    (rest books) (+ total (:copies-sold (first books)))))))
                    ; else, add the first book's :copis-sold to the total, and recurse with the remaining books
                    ; effectively summing the total one at a time

; In the base case, `sum-copies` is invoked with the vector of books,
; and that invokes `sum-copies` with the vector of books and current total of 0
; It uses the "filling the defaults" trick we looked at earlier with multi-arity functions

; Every time `sum-copies` recursively calls itself, it eats up stack space.
; (Remember, every time we call a function, it goes on the stack and then we unwind the stack)
; This is OK for a modestly sized collection of books but make the books vector too long/large
; and you will run out of stack space: StackOverflowError

; This is where specialised support for recursion comes in. Notice that:
; - The recursive call to `sum-copies` is pretty much the last thing the function does (Is this what tail call is?)
; - The only data flowing from one invocation of the function to the next flows through the function parameters

; Given this, there is no reason to accumulate all those stack frames. 
; We can take advantage of tail call optimisationGiven this, 
; there is no reason to accumulate all those stack frames. 
; We can take advantage of tail call optimisation

;;ACCUMULATOR PATTERN
;; See how we're calculating the total and then passing it to the next invocation?
;; We are accumulating the result and this is key to tail call optimisation.

;; Using `recur`

(defn sum-copies
  ([books] (sum-copies books 0))
  ([books total]
   (if (empty? books)
     total
     (recur
      (rest books)
      (+ total (:copies-sold (first books)))))))

;; Here it seems that `recur` is replacing the explicit recursive call to `sum-copies` 
;; `recur` knows how to take advantage of being the last expression in a function
;; to avoid accumulating all of those stack frames
;; Now this second version of sum-copies will work no matter how many books you are 
;; dealing with

;; recur is the clojure way of writing a completely general purpose loop. It lets you execute
;; the same block of code over and over each time with slightly different data and break out 
;; just when you are ready.

;; One apparent downside of `recur` is we need to build a new function, or new function arity in this example,
;; to use it. This will get old quickly (boilerplate)
;; We can dispense with this function using the `loop` expression.

(defn sum-copies [books] ;; this is also a binding. All bindings in Clojure use the vector form []
  ; sets the intial value of `books` in the loop to `books`, initial value of `total` to `0`
  ; (that is, it sets up the base case)
  (loop [books books total 0] ;; [] is used as the binding form in clojure. Each pair creates a binding of symbol name to value
    ;; `books books` bind 'books' to the value of the argument books
    ;; `total 0` binds 'total' to the value 0 
    (if (empty? books)
      total
      ;; see how recur looks like the original fn call for sum-copies?
      ;; (rest books) is being bound to `books` in the loop, and
      ;; the result of the expr (+ ...), the accumulate result, is being
      ;; bound to `total`
      (recur (rest books) (+ total (:copies-sold (first books)))))))

;; `loop` and `recur` are special forms in clojure to specifically 
;; guarantee tail call optimisation as it is not built in to Java

;; `loop` is a `recur` target.

;; You can think of `loop` as a blend of a phantom function and a call to that function (Something like an IIFE?)
;; (The book suggests this idea of a phantom function, but `loop` is likely a special form/macro that creates the function internally)
;; In the example, the "function" has two parameters `books` and `total` which are intially bound to the original 
;; book collection and 0. 
;;
;; With `books` and `total` bound, we evaluate the expr in the body.  
;; The trick is that loop works with recur. When it hits a recur inside the body of a `loop`, Clojure will reset the values
;; bound to the symbols to values passed into recur and then recursively reevalute the `loop` body.

;; `recur` is a reasonably low level tools. Chances are, there is usually a better and easier way to get your task done.
;; For example, adding up all those book sales, you would probably write
;

(defn sum-copies3 [books] (apply + (map :copies-sold books))) ; #'user/sum-copies3
; (map :copies-sold books) => (2000000 3000000 4000000)
; (apply + (map :copies-sold books)) => (apply + (2000000 3000000 4000000)) => 9000000
; `apply` takes a function as the first param, and applies it to the collection (the second parameter)
; the collection is passed to the function (the function being applied) as it's list of arguments (rather than a single collection)
; So, in this case, `+` variadic fn, it adds all of the numbers in the collection

;; Remember that `:copies-sold` is a keyword and can be invoked as a function.
;; This allows us to pass it to `map` as the function

(sum-copies3 books) ; 9000000

(require '[clojure.pprint :as pp])
(pp/pprint books)

;; DOCSTRINGS

;; The docstring is the provided as the second expression/argument to the `defn` macro

(defn average
  "Return the average of a and b"
  [a b]
  (/ (+ a b) 2.0)) ; #'user/average
(average 5 3)
(doc average)
;; Clojure will store the string along with the function. 
;; Then you can view the docstring with the built-in `doc` macro in the repl
;; (doc average)

;; Docstrings can be used for macros and records that we'll meet later.

(defn multi-average
  "Return the average of 2 or more numbers"
  ([a b]
   (/  (+ a b) 2.0))
  ([a b c]
   (/ (+ a b c) 3.0)))

;; A multi-fn with a docstring.
;; Remember, you don't add a [] parameter list/vector after the name when creating a multi-fn

;; PRE AND POST CONDITIONS

;; Functions provide natural points where you can improve the reliability of your code by
;; checking that the values passed to your function are what you expect

(defn print-book [book] (prn book))
(defn ship-book [_] (prn "Shipping Book"))

;; Publish a book using the (unseen) print-book and ship-book fns
(defn publish-book [book]
  (when-not (contains? book :title) ; Here, we have logic within the function body to check
    (throw (ex-info "Books must contain :title" {:book book})))
  (print-book book)
  (ship-book book))

;; The `when-not` is checking the value of book. Clojure has a *shortcut* for this using 
;; the `:pre` condition

(defn publish-book2 [book]
  {:pre [(:title book)]} ; Here, the pre condition simply evaluates a vector of expressions. If any are falsy, the pre-condition fails and an exception is thrown
  (print-book book)
  (ship-book book))

;; To setup a pre-condition, just add a map after the fn arguments
;; A map with a :pre key. The value should be a vector of expressions.
;; You will get a runtime exception if any of the expressions evalute to 
;; falsy when the fn is called.

;; Post Condition
(defn publish-book3 [book]
  {:pre [(:title book)]
  ;; Adding a post condition to ensure the value returned from the function is Boolean
  ;; % stands in for the return value in the post condition
   :post [(boolean? %)]}
  (print-book book)
  (ship-book book))

;; STAYING OUT OF TROUBLE

;; You can mix and match the variadic & into a multi-arity function if
;; you are careful to avoid over-lapping arguments with other arities

(defn one-two-or-more
  ([a] (println "One arg:" a))
  ([a b] (println "Two args:" a b))
 ;; The arguments provided after `b` will be collected into `more`
  ([a b & more] (println "More than two args:" a b more)))

;; Clojure is sharp enough to check that you don't define a variadic 
;; function that over-laps other arities.

;; This generates a compile error
; (err) Syntax error compiling fn* at (5-more-capable-functions.clj:428:1).
; (err) Can't have fixed arity function with more params than variadic function

; (defn one-two-or-more-will-not-compile
;   ([a] (println "One arg:" a))
;   ([a b] (println "Two args:" a b))
;  ;; This should not get past the clojure compiler according to "Getting Clojure" 
;   ([& more] (println "More than two args:" more)))
;
; The problem is that it's unclear which arity should be evaluated when the fn
; is called with two parameters

; (comment
;   (one-two-or-more-will-not-compile 1 2 3))

;; Be careful not to confuse a function, that has more than one expression in the body, with a multi-arity function
;; The key is to look for the parameters which will tell you which flavour of function you have.

; multiple exp in body
(defn chatty-average
  ([a b]
   (println "chatty-average function called with 2 arguments")
   (println "** first argument:" a)
   (println "** second argument:" b)
   (/ (+ a b) 2.0)))

; multi-arity
(defn chatty-multi-average
  ([a b]
   (println "chatty-average function called with 2 arguments")
   (/ (+ a b) 2.0))
  ([a b c]
   (println "chatty-average function called with 3 arguments")
   (/ (+ a b c) 3.0)))

;; Pay attention to how & is used when defining variadic functions!

;; & is a single symbol that indicates the function will take any number of arguments.
;; It is white space separated from other arguments in the argument list 

(defn print-any-args [& args] ; note the whitespace after `&`
  (println "My arguments are:" args))

(comment
  (print-any-args "1" 2 3 '4 '[5 6 7]))

;; compared to 
; (defn print-any-args1 [&args]
;   (println "My arguments are:" args)) 

;; This will not compile. `args` is an unbound symbol because the symbol we incorrectly defined is `&args`
;; Note the lack of whitespace after the `&` 
;; So (println "My arguments are:" &args)) would compile but
;; &args` is a single argument and the code would not match your intent so this would still be wrong

;; In the Wild

(defn =
  "Equality. Returns true if x equals y, false if not. Same as
 Java x.equals(y) except it also works for nil, and compares
 numbers and collections in a type-independent manner.
 Clojure's immutable data structures define equals()
 (and thus =) as a value, not an identity, comparison."
  ([x] true)
  ([x y] (clojure.lang.Util/equiv x y))
  ([x y & more]
   (if (clojure.lang.Util/equiv x y)
     (if (next more)
       ;; `recur` uses the fn as the recursion point here. `recur` works with `fn` and `loop`.
       ;; As this is a `fn` via `defn`, `recur` here is the same as calling `(= ...)`
       (recur y (first more) (next more))  ;; Same as calling (= y (first more) (next more))
       ;; (next ...) returns the remaining seq of items after the first item
       (clojure.lang.Util/equiv y (first more)))
     false)))
