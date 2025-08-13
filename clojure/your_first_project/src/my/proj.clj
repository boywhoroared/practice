(ns my.proj)

;; Start nREPL with 
;; clj -M:repl/conjure

(defn greet
  "Return a greeting for this person."
  [person]
  (str "Hello, " person "!"))
(comment
  ;; This block of expressions should be easily evaluated by 
  ;; and the results shown in line by editors with with REPLs
  (greet "Programmer") ; "Hello, Progammer!"
  (greet nil)) ; "Hello, !"
  ;; This is also called "Rich Comment Forms" because they are a "rich" source of information how the code works 
  ;; but also because Rich Hickey, Clojure's creator, uses this approach quite a lot in his own code.

(defn -main []
  (println "Hello, Local Star System!"))
