(ns my.proj
  (:require
   [clojure.inspector :as insp]
   [clojure.java.browse :as browse]
   [clojure.java.io :as io]))

;; Start nREPL with 
;; clj -M:repl/conjure

(defn number-summary
  "Computes a summary of the arithmetic properties of a number, as a data structure."
  [n]
  (let [proper-divisors (into (sorted-set)
                              (filter
                               (fn [d]
                                 (zero? (rem n d)))
                               (range 1 n)))
        divisors-sum (apply + proper-divisors)]
    {:n n
     :proper-divisors proper-divisors
     :even? (even? n)
     :prime? (= proper-divisors #{1})
     :perfect-number? (= divisors-sum n)}))

; Require Pretty Printer
(require '[clojure.pprint :as pp])

; Pretty print the result
(pp/pprint (mapv number-summary [5 6 7 12 28 42]))

; Evaluate this and then...
(mapv number-summary [5 6 7 12 28 42])

; ...Pretty-Print the last result that was evaluated
(pp/pp)

(pp/print-table (mapv number-summary [6  12 28]))

;; Truncate REPL output 
;; When an expression evaluates to a large or deeply
;; nested data structure, reading REPL output can become difficult. When a
;; structure is too deeply nested, you can truncate the output by setting the
;; *print-level* Var:

(set! *print-level* 3)  ; For some reason doesn't seem to work when evaluated/sent to the REPL via Conjure or Calva

{:a {:b [{:c {:d {:e 42}}}]}}  ;; deeply-nested structure. This should show `{:a {:b [#]}}` on the repl
;; However it doesn't seem to work with nvim and Conjure. 
;; It does work via the actual REPL

;; Reset the print level with:
(set! *print-level* nil)

;; Likewise, we can limit the number of items shown in a collection...
(set! *print-length* 3)
(repeat 100 (vec (range 100))) ; a data structure containing a looooong collection

;; Access Recent Results

(print *1) ; access the last evaluated result
(print *2) ; access the one before that
(print *3) ; and the one before that

; You can save results by def-ining them
(def some-name *1)
(mapv number-summary [6 12 28])
(def my-summarised-numbers *1)

;; Investigating Exceptions


(/ 1 0) ; cause a division by zero exception

; By default, the repl prints a two line summary of the Exception

;; Visualise the stacktrace of an exception
(pst *e) ; comes from clojure.repl/pst

;*e ;; at the repl can also provide use visualisation

;; Creating exceptions
(defn divide-verbose
  "Divides two numbers `x` and `y`, but throws more informative Exceptions when it goes wrong.
  Returns a (double-precision) floating-point number."
  [x y]
  (try
    (double (/ x y))
    (catch Throwable cause
      (throw
       (ex-info ;; can set a human readable message on the exception using 'clojure.core/ex-info 
        (str "Failed to divide " (pr-str x) " by " (pr-str y))
        {:numerator x
         :denominator y}
        cause)))))

(defn average
  "Computes the average of a collection of numbers."
  [numbers]
  (try
    (let [sum (apply + numbers)
          cardinality (count numbers)]
      (divide-verbose sum cardinality))
    (catch Throwable cause
      (throw
       (ex-info
        "Failed to compute the average of numbers"
        ;; You can also include additonal data/information. This appears in the `:data` key when visualising the exception
        {:numbers numbers}
        cause)))))


;; Inspect Data with Gui
(require '[clojure.inspector :as insp])
(insp/inspect-table (mapv number-summary [2 5 6 28 42]))

;; Open URLS
(require '[clojure.java.browse :as browse])
(browse/browse-url "www.google.com")


;; Accessing Java Docs
(require '[clojure.java.javadoc :as jdoc])
(jdoc/javadoc #"a+") ;; opens the Javadoc page for java.util.Pattern in a web browser
(jdoc/javadoc java.util.regex.Pattern) ;; equivalent to the above
;; `#"a+" is regex pattern, so that's why it opens the docs page for regex.Pattern


;; See <https://clojure.org/guides/repl/data_visualization_at_the_repl#_dealing_with_mysterious_values_advanced>

;; Assume that you don't know what an IO class is...
(require '[clojure.java.io :as io])

(def v (io/input-stream "https://www.clojure.org"))
'user/v

;; #object[java.io.BufferedInputStream 0x4ee37ca3 "java.io.BufferedInputStream@4ee37ca3"] 


;; You can inspect the type to gain more understanding about it at the REPL
(type v) ; shows the objects type/class

(ancestors (type v)) ; shows the object's class/parent tree (ancestors)
; You can then use Java docs to find out more about these types

(defn -main []
  (println "Number Summary"))


