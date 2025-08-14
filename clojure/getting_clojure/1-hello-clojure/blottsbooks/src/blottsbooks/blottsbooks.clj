(ns blottsbooks.blottsbooks
  (:gen-class))
;; gen-class is a macro used to generate Java `.class` files from Clojure code
;; :gen-class allows you to define a Clojure namespace that is compiled into a 
;; standard Java class for Java interop.

(defn greet
  "Callable entry point to the application."
  [data]
  (println (str "Hello, " (or (:name data) "World") "!")))

(defn say-welcome [what]
  (println "Welcome to" what "!"))

; (defn -main
;   "I don't do a whole lot ... yet."
;   [& args]
;   (greet {:name (first args)}))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (say-welcome "Blotts Books"))

;; How do we actually run this?
;; clojure -M:run-m

;; See README.md and deps.edn
