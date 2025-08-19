;; The fundamental If

(defn print-greeting [preferred-customer]
 (if preferred-customer ; condition
    (println  "Welcome back to Blotts Books") ; then-expr.  if `condition` is true, the `if` fn returns the evaluation of the `then-expr`
) ; if the condition is false, `if` will return `nil` since there is no else-expr, so `else-expr` is `nil` and `if` returns the last expression evaluated in the `if`.

(defn print-greeting [preferred-customer]
  (if preferred-customer
    (println  "Welcome back to Blotts Books") ; then-expr 
    (println  "Welcome to Blotts Books") ; else-expr  likewise, if the condition is false, it returns the evaluation of the `else-expr`
    ))

(defn shipping-charge [preferred-customer order-amount]
  (if preferred-customer
    0.00 ; then-expr prefferred customers don't pay a shipping charge
    (* order-amount <0.10))) ; else-expr all other customers pay a 10% fee)

(if preferred-cusomer
  "So nice to have you back") ; will return the string or nil depending on the value of `preferred-customer`
  ; no else-expr provided, so the else-expr will default to `nil`

;; Actually, short conditionals are usually written on one line, so the previous example usually appears like:
(if preferred-cusomer "So nice to have you back")

;; ASKING QUESTIONS

(= 1 1) ; true

(= 2 (+ 1 1)) ; true

(= "Anna Karenina" "Jane Eyre") ; false

(= "Emma" "Emma") ; true

;; Like the + and - *functions*, `=` will take multiple arguments
(= (+ 2 2) 4 (/ 40 10) (* 2  2) (- 5 1)) ; true
(= 2 2 2 2 3 2 2 2 2) ; false (There's a 3 in there)

;; = is built on the idea of structural equality. Two values are actuall if they have the same value.
;; Under he hood, = is identival to the Java `equals` method

(not= "Anna Karenina" "Jane Eyre") ; true
(not= "Anna Karenina" "Anna Karenina") ; false

;; There are more boolean returning functions - predicates - besides `=`

(def a 10) ; #'user/a
(def b 5) ; #'user/b
(def c 15) ; #'user/c

(if (> a b) (println "a is bigger than b")) ; nil (prints output to console)
(if (> a b) "a is bigger than b") ; "a is bigger than b"
(if (< b c) "b is smaller than c") ; "b is smaller than c"

(>= a b) ; true
(<= b c) ; true

;; There are a variety of "is this a that?" functions
(number? 1984) ; true
(number? "Anna Karenina") ; false
(string? "Anna Karenina") ; true
(keyword? "Anna Karenina") ; false
(keyword? :anna-karenina) ; true
(map? :anna-karenina) ; false
(map? {:title 1984}) ; true
(vector? 1984) ; false
(vector? [1984]) ; true

;; Clojure also has the usual cast of characters for boolean logic

;; `not` function
(not true)
(not false)

;; `and` and `or` for assembling large boolean expressions

;; Charge extra if it's an express order, or oversized, and they are not a preferred-customer

(defn shipping-surcharge?
  [preferred-customer express oversized]
  (and (not preferred-customer) (or express oversized))) ; there is no `if` here. This fn only returns a boolean result

;; `and` and `or` do short circuti evaluation.

;; Truthy and Falsy
;; The language is willing to treat any value as boolean:

(if 1 "I like science fiction!", "I like mysteries!") ; "I like science fiction!"
(if "Hello" "I like science fiction!", "I like mysteries!") ; "I like science fiction!"
(if [1 2 3] "I like science fiction!", "I like mysteries!") ; "I like science fiction!"

; In any boolean statement, only `false` and `nil` are treated as false. Everything else is true.

(if nil true false) ; false
(if false true false) ; false

(if false "I like scifi!", "I like mysteries!") ; "I like mysteries!"
(if nil "I like scifi!", "I like mysteries!") ; "I like mysteries!"

;; Everything really means everything: all strings, all numbers, and all keywords are treated as true. And collections.

(if 0 "yes" "no")  ; "yes"
(if 1 "yes" "no") ; "yes"
(if 1.0 "yes" "no") ; "yes"
(if :mario "yes" "no") ; "yes"
(if "Mario" "yes" "no") ; "yes"

;; String contents do not matter
(if "true" "yes" "no") ; "yes"
(if "false" "yes" "no") ; "yes"
(if "nil" "yes" "no") ; "yes"
(if "" "yes" "no") ; "yes"

;; And collections, even empty ones

(if [] "an empty vector is true!") ; "an empty vector is true!"
(if [1 2 3] "So is a populated vector!") ; "So is a populated vector!"

(if {} "an empty map is true!") ; "an empty map is true!"
(if {:title "Make room! Make room!"} "So is a full map!") ; "So is a full map!"

(if () "an empty list is true!") ; "an empty list is true!"
(if (:full :list) "so is a full list!") ; nil

;; Do and When

; One caveat of the `if` fn is that it only evaluates a single expr for it's then and else branches.
; But suppose you want to perform multiple actions based on the condition?

; `do` is a special form that evaluates several expressions in sequence and returns the last expression's evaluation as it's value.
; It is the idiomatic way to evaluate multiple expressions on an `if`'s then or else branch.

(do
  (println "this is four expressions")
  (println "all grouped together as one")
  (println "that prints some stuff and then evaluates to 44")
  44) ; this is a single expression that evaluates to `44`
; 44

(defn shipping-charge [preferred-customer order-amount]
  (if preferred-customer
    (do
      (println "Preferred customer, free shipping!")
      0.00)
    (do
      (println "Regular customer, charge them for shipping")
      (* order-amount  0.10))))

;; When

;; `when` is a variant that combines `if` and `do` and it does not have an else (or falsy) leg/branch but supports multiple expressions without needing `do`:

(when preferred-customer
  (println "Hello, returning customer!")
  (println "Welcome back to Blotts Books!"))

;; Dealing with Multiple Conditions (`cond`)

; Technically, no matter how complicated the decision you need to make, all you ever need is plain old `if`.
; Choosing between 3 alternatives, just nest a couple of ifs:

(defn shipping-charge [preferred-customer order-amount]
  (if preferred-customer
    0.0
    (if (< order-amount 50.0) ; if not a preferred customer, and the order amount is < 50, $5 shipping charge
      5.0
      (if (< order-amount 100.0) ; if not a preferred customer, and 50 < order-amount < 100, $10 shipping charge
        10.0
        (* 0.1 order-amount))))) ; else, if not a preferred customer and order-amount >= 100, shipping charge is 10% of order-amount

; However nested expressions like this are hard to read and understand for human brains (even if easy for the cpu)

; Clojure has a tool for this, `cond`

(defn shipping-charge [preferred-customer order-amount]
  (cond
    preferred-customer 0.0 ; if preferred-customer, 0 shipping charge
    (< order-amount 50.0) 5.0 ; if order amount < 50, $5 shipping charge
    (< order-amount 100.0) 10.0)) ; if order amount < 100, $10 shipping charge

; NOTE: how we haven't accounted for the case where the value is >= 100?! We have to fix that

;; `cond` takes pairs of expressions, each pair made up of a predicate expression and a value expression
;; In this example, the predicates are: `preferred-customer`, `(< order-amount 50)`, and `(< order-amount 100)`
;;
;; When `cond` is evaluated, it evaluates each predicate in order. If the predicate is falsy - nil or false - it moves on 
;; to the next pair. If the predicate is truthy, then `cond` will evaluate the value expression and return that leaving
;; the remaining pairs unevaluated. 

;; Of course one problem here is we need to handle the last `else` leg that handles the case of order-amount >= 100 
;; Because cond does not have an `else` leg, and only handles a series of predicate-value pairs, we add a pair for this case

(defn shipping-charge [preferred-customer order-amount]
  (cond
    preferred-customer 0.0 ; if preferred-customer, 0 shipping charge
    (< order-amount 50.0) 5.0 ; if order amount < 50, $5 shipping charge
    (< order-amount 100.0) 10.0 ; if order amount < 100, $10 shipping charge
    (>= order-amount 100.0) (* 0.1 order-amount)))

;; While there isn't an `else` part of `cond`, one Clojure convention for cond is to use a catch-all predicate/expression pair.
;; using the keyword `:else` as the predicate

(defn shipping-charge [preferred-customer order-amount]
  (cond
    preferred-customer 0.0 ; if preferred-customer, 0 shipping charge
    (< order-amount 50.0) 5.0 ; if order amount < 50, $5 shipping charge
    (< order-amount 100.0) 10.0 ; if order amount < 100, $10 shipping charge
    :else (* 0.1 order-amount)))

;; :else isn't a special syntax/form here. It's just another expression pair! Remember Clojure's truthy evaluation means that the `:else` keyword
;; evalutes to boolean `true`, so the value expression will be evaluated.
;;
;; You can could use any truthy expression here instead of `:else`: `:default`, true, "whatever".  `"whatever" (* 0.1 order-amount)`

;; Case - Clojure's case-switch
;; matches a value against one of the constants in a series of constant/value expressions
;; evaluating and returning the value expression when a constant matches
;; If nothing matches, the expressions evalutes to the last unpaired expression 

;; WARNING the constants must be exactly that, constants. `case` does not evaluate expressions for the constant

;; The last catch all expression is optional, but if you do leave it out, the case will generate an error if none of the constants match

(defn customer-greeting [status]
  (case status
    :gold "Welcome, welcome, welcome back!!!"
    :preferred "Welcome back!"
    "Welcome to Blotts Books")) ; #'user/customer-greeting

(customer-greeting :gold) ; "Welcome, welcome, welcome back!!!"
(customer-greeting nil) ; "Welcome to Blotts Books"

;; Throwing and Catching

;; Catching Exceptions
(defn publish-book [book]
  (/ 1 0)) ; #'user/publish-book will throw an ArithmeticException for the Division by Zero

(def book {:title "Title" :author "Mario" :published 2025})

(try
  (publish-book book)
  (catch ArithmeticException e (println "Math problem."))
  (catch StackOverflowError e (println "Unabled to publish..")))

;; How to throw an exception

(defn publish-book2 [book]
  (when (not (:title book))
    (throw
     (ex-info "A book needs a title!" {:book book})))
  ;; lots of publishing stuff
  )

;; `ex-info` takes a string describing the problem and a (possibly
;; empty) map containing any other pertinent information.

;; To catch an ex-info exception, you will have to look for exceptions 
;; of type `clojure.lang.ExceptionInfo`

;; Question: Are there ways to create custom exception classes in
;; clojure? Would we do that? What's the idiomatic way to deal with
;; errors in Clojure?

; throws an exception with a mesage
(publish-book2 {:author "Mario" :published 2025})

;; Surprisingly, the "`if`, or `when`, this, then do that" use case of
;; is not all that common in clojure. What you will find instead is
;; `if`, `when` and `cond` used to compute a value. For example, this 
;; code lifted from Leiningen:

;; Data oriented programming?

(if (vector? task) task [task])

;; This doesn't DO anything. It only evaluates to a value: the original
;; task or the task wrapped in a vector

;; We might bind the result to a symbol
(def task-vector (if (vector? task) task [task]))

;; Or embed it in a function
(defn ensure-task-is-a-vector [task]
  (if (vector? task) task [task]))

;; Staying out of trouble

;; `and` can and will evaluate to non-boolean values
;; Remember: Clojure uses truthy and falsy

(and true 1984) ; Evalutes to 1984, which is truthy
(and 2001 "Emma") ; Evaluates to "Emma", which is truthy
(and 2001 nil "Emma") ; Evaluates to nil, which is falsy

;; So you should avoid testing for boolean `true` and `false`
;; explicitly. Not only is it verbose, it's WRONG (1984 is truthy but 1984 does not = true) .

(if (= (some-predicate? some-argument) true) ; if some-predicate returns a "truthy" value but not `true`, this will fail
  (some-other-function))

