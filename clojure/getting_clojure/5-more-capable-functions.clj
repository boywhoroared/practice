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
; Using a List rather than Vector or Map produces an IllegalArgumentException exception because `contains?` 
; in the dispatch method doesn't work on maps (:)

; I suppose we'd have to make the `cond` return `:default` if there aren't any matches?
