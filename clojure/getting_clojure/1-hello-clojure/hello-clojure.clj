;; Do two semicolons add up to a whole colon?
(println "Hello, world!") ; Say Hi

(str "Clo" "jure") ; Returns "Clojure". `str` concatenates any* values into a string

(str "Hello," " " "world" "!") ; Returns the string "Hello, world!"

(str 3 " " 2 " " 1 " Blast off!") ; Fly me to the moon! (See how str is joining different types)

(count "Hello, world") ; Returns 12

(count "Hello") ; Returns 5

(count "") ; Returns 0

; We have predefined constants such as true and false
(println true) ; Prints true..
(println false) ; Prints false

; Clojure has `nil`, the "nothing" value. It's essentially the same as Java's Null 

(println "Nobody's home: ", nil) ; Prints "Nobody's home: nil"

; println will print just about anything you throw at it
(println "We can print many things:" true false nil)

;; Arithmetic

;; Math operations are functions.

; add
(+ 1900 84) ; 1984

; multiply 
(* 16 124) ; Gives you 1984

; subtract
(- 2000 16) ; 1984 again

; divide 
(/ 25793 13)  ; 1984 yet again

;;(Note: Division in Clojure is a little different. Clojure will return a Ratio
;;data type if there is  remainder).

;; Expressions can be nested
(/ (+ 1984 2010) 2) ; incidentally, this does not give 1984

;; Clojure is always (verb argument argument argument...)
;; So while the math operators are not infix operators,
;; it appears it's easier to use operations on multiple arguments 

(+ 1000 500 500 1) ; 

;; We don't have to type '+' a lot. But there's obvious more work to include a
;; subtraction in there

(- 2000 10 4 2) ; Ah, another evaluation to 1984

(/ 8 3) ; Returns 8/3, a `Ratio`.

;; In other languages, this would return 2 (and the remainer is 2). However, clojure will return a the ratio.
;; To get the expected 2, you have to use the `quot` function

(quot 8 3)

; and there is also the usual modulo fn
(mod 8 3)

(/ (+ 1984.0 2010.0) 2.0) ;; Clojure has floating point numbers

;; Not Variable Assignment, but close (Symbols)
(def first-name "Mario") ;; evaluates to the symbol 'user/first-name

;;`def` associates, or binds, the symbol name to the value

(def the-average (/ (+ 20 40.0) 2.0)) ;; Binds "30.0" to 'user/the-average
(println the-average)

;; Clojure doesn't use camelCase or snake_case, it uses kebab-case for symbols,
;; especially function names

;; Symbols can be bound to any expression
;; Symbol names can usually have any character except ones reserved for special meanings in Clojure:
;; [], (), {}, @, and ^

;; Also, the first character of a symbol cannot be a digit (too easily confused with a number)

;; Symbols beginning with ':' are Keywords (another clojure built in data type)

;; Question: is there a way to lazy eval the expr a symbold is bound to? I suppose this would use a fn?

;; A Function of Your Own

(defn hello-world []
  (println "Hello, World!"))

;; defn fn-name [args] s-expr
;; defn is actually a macro that makes using `def` and `fn` easier. The 'real' way to define a function is 
;; (def hello-world (fn [] (println "Hello, world!")))
;; `fn` creates a function
;; `def` binds the function value to the symbol 'hello-world

; Parameters

(defn say-welcome [what] (println "Welcome to" what))
(say-welcome "Clojure") ; prints "Welcome to Clojure"

; Define the fn 'average
(defn average [a b] (/ (+ a b) 2.0))

; Invoke average
(average 5.0 10.0)
;; Note how there are no commas (,) between arguments. 
;; Clojure treates `,` as whitespace, so `,` is not strictly necessary.

; Can I make a better avg fn?

;; `[ & nums ]` creates a variadic argument `nums`. `nums` will be a list of the arg values.
(defn average-n [& nums] (/ (reduce + nums) (count nums)))

(average-n 5.0 10.0)

(defn chatty-average [a b]
  (println "chatty-average function called")
  (println "** first argument:" a)
  (println "** second argument:" b)
  (/ (+ a b) 2.0)) ; the last expression supplies the return value

(chatty-average 10 20) ; returns 15.0 (the 2.0 is a float)

;; No Types
;; There aren't any type declarations, or hints. Clojure uses dynamic typing
;; Clojure does have clojure.spec but this is not the same thing

;; At this part, the book generates a new app using leiningen but I'm not going to use that.
;; Instead, I am using deps-new

;; Install the deps-new Clojure tool
;; $ clojure -Ttools install-latest :lib io.github.seancorfield/deps-new :as new

;; Create the project
;; $ clojure -Tnew app :name blottsbooks

;; The directory will be different, probably, but similar enough



