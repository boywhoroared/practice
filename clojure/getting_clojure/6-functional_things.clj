(require '[clojure.repl :refer [doc dir source apropos]])

(def dracula {:title "Dracula" :author "Stoker" :price 1.99 :genre :horror})

(defn cheap? [book]
  (when (<= (:price book) 9.99) book))

(defn pricey? [book]
  (when (> (:price book) 9.99) book))

(cheap? dracula) ; {:title "Dracula", :author "Stoker", :price 1.99, :genre :horror}
(pricey? dracula) ; nil

(defn horror? [book]
  (when (= (:genre book) :horror) book))

(defn adventure? [book]
  (when (= (:genre book) :adventure) book))

; Combinations of Price and Genre
(defn cheap-horror? [book]
  (when (and (cheap? book) (horror? book)) book))

; We can write functions like this all day. The problem is the *writing*

(cheap-horror? dracula) ; {:title "Dracula", :author "Stoker", :price 1.99, :genre :horror}

; Functions are values
cheap? ; #function[user/cheap?]

; Bind a function to a different name
(def reasonably-priced? cheap?)

; Now we can call `reasonably-priced?`
(reasonably-priced? dracula) ; {:title "Dracula", :author "Stoker", :price 1.99, :genre :horror}

; Pass function  values to other functions
(defn run-with-dracula [f]
  (f dracula))

; Passes `cheap?` to `run-with-dracula` which invokes it as `f`
(run-with-dracula cheap?) ; {:title "Dracula", :author "Stoker", :price 1.99, :genre :horror}

; Using this concept, we can create function that combines the predicates.
; Rather than needing to write a function to every time we wanted to combine
; the predicates, we write a function that combines the given predicates
; instead.

(defn both? [pf1 pf2 book]
  (when (and (pf1 book) (pf2 book)) book))

(both? cheap? horror? dracula) ; {:title "Dracula", :author "Stoker", :price 1.99, :genre :horror}
(both? pricey? adventure? dracula) ; nil

; TODO: Reimplement to pass in a sequence of predicates?
; I can't remember how to deal with lists/sequences, I guess it would be some kind of map

; FUNCTIONS ON THE FLY
; You can use `fn` to create an unnamed/anonymous function

(fn [n] (* 2 n))

((fn [n] (* 2 n)) 10) ; 20

; The difference between `fn` and `defn` is that `fn` does not bind a name to the function value

; You can bind it to a symbol yourself
(def double-it (fn [n] (* 2 n)))
(double-it 20) ; 40

; Producing Functions
; We can write function that produce functions

(defn cheaper-f [max-price]
  (fn [book]
    (when (<= (:price book) max-price) book))) ; (!) Note: This is returning the book OR nil, not False

; This function returns an anonymous predicate function

(def real-cheap? (cheaper-f 1.00))
(def kind-of-cheap? (cheaper-f 1.99))
(def marginally-cheap? (cheaper-f 5.99))

(real-cheap? dracula)
(kind-of-cheap? dracula)
(marginally-cheap? dracula)

;; Note that the function produced by `fn` picks up and remembers
;; the parametes around when the fn was run. In the last example,
;; the function produced when you call `(cheaper-f 1.00)` remembers the value
;; of `max--price` as 1.00

; Manufacture "both" like functions
(defn both-f [predicate-f-1 predicate-f-2]
  (fn [book]
    (when (and (predicate-f-1 book) (predicate-f-2 book)) book))) ; #'user/both-f

; Now we can make a family of book discriminating functions
(def real-cheap-adventure? (both-f real-cheap? adventure?))
(def real-cheap-horrot? (both-f real-cheap? horror?))

(def cheap-horror-possession?
  ;; Uses one of our existing two predicate functions with a new predicate.
  ;; This produces a new fn that checks 3 predicates
  (both-f cheap-horror? (fn [book] (= (:title book) "Possession")))) ; #'user/cheap-horror-possession?

;; The idea of a function grabbing and remembering the bindings that existed when the function was created
;; is called a `closure`. We say the function _closes_ over the scope in which it was defined.

; In Clojure, anonymous functions are also closures.

;; The twin ideas of functions as values and _closure_ are at the heart of wha makes Clojure
;; the programming language is and might explain the name as well.

;; FUNCTIONAL TOOLKIT
;; Clojure provides a fair number of functions for working with functions

;; `apply` invokes a given function with a given collection as the arguments
;; to the function

;; We can invoke the `+` function with variadic args like this
(+ 1 2 3 4)

;; What if we wanted to call some function with some unknown number of args?
(def a-fn +) ; #'user/a-fn
(def args '(1 2 3 4)) ; #'user/args
(apply a-fn args) ; 10
;; This results in
;; (apply + '(1 2 3 4))
;; (+ '(1 2 3 4))

;; We can use apply to dynamically call a fn with some arguments
;; that we don't know until runtime

;; The apply function is particularly useful for converting values
;; from one type to another
(def v ["The number " 2 " best selling " "book."])
(apply str v) ; "The number 2 best selling book."
;; More or less the same as:
;; (str "The number " 2 " best selling " "book.")

(apply list v) ; ("The number " 2 " best selling " "book.")

;; Convert to list and back to vector
(apply vector (apply list v)) ; ["The number " 2 " best selling " "book."]

;; Partial (Currying?)j
;; `partial` partially fills in the arguments of an existing function
;; using the given arguments and produces a function of fewer arguments
;; When the produced function is called, it's called with the given arguments
;; and the other arguments provided to the new function

;; All we are doing is adding 1 to a number `n`
(defn my-inc [n] (+ 1 n)) ; my-inc is filling the first argument of `+` with `1`, which is what `partial` does
(my-inc 1)

;; Implemented using `partial`.
(def my-inc-2 (partial + 1)) ; We partially apply the argument `1` to the function `+`.

;; This produces a function that will invoke `(+ 1 [& args])`
(my-inc-2 1) ; 2 = (+ 1 1)
(my-inc-2 1 2 3) ; 7 (+ 1 1 2 3)
;;

(doc partial)

(defn cheaper-than [max-price book]
  (when (<= (:price book) max-price) book))

;; We can use partial to rework and simplify our discriminating functions

(def real-cheap? (partial cheaper-than 1.00))
(def kind-of-cheap? (partial cheaper-than 1.99))
(def marginally-cheap? (partial cheaper-than 5.99))
;; Each call to partial is returning a new function with the first parameter `max-price` applied
;; Actually, I wonder if `partial` uses `apply` under the hood?
;; Yes, `partial` is using `apply`. See <https://github.com/clojure/clojure/blob/master/src/clj/clojure/core.clj#L2631K>

(comment
  (real-cheap? {:price 2.00})
  (doc partial)
  (source partial))

;; This actually looks like a cleaner impl than `cheaper-f`
;; Even though `partial` is doing what `cheaper-f` does but more generally
;; `cheaper-than` then using `partial` is also much easier to easier to understand

;; Essentially, we don't have to hand-code functions which produce functions, especially if we discriminate by parameter

;; Complement
;; Wraps a given function in `not` to produce a truthy negation of the function

; (defn not-adventure? [book] (not (adventure? book)))
(def not-adventure? (complement adventure?))

;; Another function generating function is `every-pred`
;; It combines predicate functions into one function that `and`s them all together

(def cheap-horror? (every-pred cheap? horror?))

;; `every-pred` is variadic, so you can supply any number of arguments (functions)
(def cheap-horror-possession?
  (every-pred
   cheap?
   horror?
   (fn [book] (= (:title book) "Posession"))))

(comment
  (dir clojure.repl) ; nil
  (doc apply)
  (source apply))

;; Function Literals / Lambdas
;; We can use the reader macro #() for those times when the (fn []) form seems like too much syntactical overhead

;; It's `#` followed by the function **body** in ()
;; There are no **named** arguments, arguments are referred to positionally using %n, like %1 %2 etc.
;; (Like format strings)

#(when (= (:genre %1) :adventure) %1)
;; checks if the book given by %1 has the :genre adventure
;; if yes, return the book, else nil

;; NOTE: Clojure infers the number of arguments the functional
;; literal accepts from the highest numbered argument referenced
;; in the function body.

;; They have a special feature, if you are only using one argument,
;; you can refer to it with % only (no positional number)

#(* % 2)

(comment
  (require 'clojure.string)
  ; map over list with multiply arg by 2;  then join list
  (clojure.string/join "" (map #(* % 2) [1 2 3]))) ; "246"
; "clojure.lang.LazySeq@7c63"

(def book {:title "Emma", :copies 1000})

;; Functions as values are part of the every day programming landscape in Clojure
;; For example, the `update` and `update-in` functions. They take a function as
;; an argument to update a map (and in Clojure, you will be doing this a lot)

;; `update` takes a map, a key, and a function that will take the current
;; value as it's arg and return an updated value.
;; It returns a new map with the key's value containing the updated value.
(def new-book (update book :copies inc))  ;; `inc` increments the value by 1
(prn new-book)

;; For nested maps, we can use the `update-in` function.
;; You can drill own several layers by providing path to the nested key
;; using a vector of keys
(def by-author {:name "Jane Austen"
                :book {:title "Emma" :copies 1000}})

(doc update-in)
(apropos update-in)
(source update-in)

(def new-by-author (update-in by-author [:book :copies] inc)) ;; `[:book :copies]` is the path to the key. Select `:book`, then select `:copies`
(prn new-by-author)

;; To see how much you can do with functional values in the wild, you
;; can look at how the Ring library helps you build web applications.
;; The handlers and middleware are all all using functions as values
;; Middleware functions take in a handler, a function, and return another handler, a function.

;; STAYING OUT OF TROUBLE
;; Try to write pure functions. We don't always know the context in which our functions will be called.
;; Especially because we can pass them around as values! They can be passed around and evaluated in any
;; order and any number of times


