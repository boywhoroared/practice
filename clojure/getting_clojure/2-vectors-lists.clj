;; One Thing After Another

;; A vector is an ordered collection of items. It is one of Clojure's most
;; widely used and useful data structures.

[1 2 3 4] ;; a vector. the equivalent of  clojure script array. faster to add elements at the end.

;; Vectors can have heterogeneous (did I spell that right?), er, mixed (data types) content
[1 "two" 3 "four"]

[true 3 "four" 5] ; This is a pun? "true" sounds "two" ?

;; Vectors can be nested
[true [3 "four" 5] 6]

;; and nested again
[0 [1 [true 3 "four" 5] 6] 7]

;; You can embed any Clojure value into a Vector

;; A TOOLKIT OF FUNCTIONS

;; There's a function for creating Vectors.
;; It's named `vector`. 

(vector true 3 "four" 5) ; returns [true 3 "four" 5]

;; The same as []
(vector) ; []
(= (vector) []) ; true

(def novels ["Emma" "Coma" "War and Peace"]) ; ["Emma" "Coma" "War and Peace"]

;; You can use the `count` function to determine the length of the vector (how many items)
(count novels) ; 3

;; Get the first element, head of the list
(first novels) ; "Emma"

;; Get the tail of the list. Returns a **Sequence** instead of a Vector
;; Sequences are generic collections. Super types of List and Vector
(rest novels) ; ("Coma" "War and Peace")

;; You can keep dropping the first element by repeating calls to rest
(rest (rest novels)) ; ("War and Peace")

;; returns an empty collection
(rest ["Ready Player One"]) ; ()

;; With some effort, you can use a combination of rest and first to get to the Nth item in a collection
(def year-books ["1491", "April 1865", "1984", "2001"])
(def third-book (first (rest (rest year-books)))) ; #'user/third-book "1984"

;; That isn't convenient. We can use nth
(nth year-books 2) ; "1984"

;; Alternatively, you can use the collection itself as a function, supplying the index as the argument
(year-books 2) ; "1984"

;; Remember immutability. 
;; None of these function calls are changing the original vectors.
;; `rest` is returning a NEW shorter vector without changing the original.

;; GROWING YOUR VECTORS

; You can't change an existing Vector but you can make a new slightly longer vector.
; You can use `conj` (short for "conjoin") to add an element to the vector

(conj novels "Carrie") ; ["Emma" "Coma" "War and Peace" "Carrie"]

; To add an item to the front of a vector, use `cons` (from Lisp/Scheme?) 

; Lisp: `cons` stands for "construct" and is used to build pairs of "cons cells"
; which are the building blokcs for creating lists and other linked data
; structures in Lisp
;
; See <https://en.wikipedia.org/wiki/Cons>. In particular, `list` is a convenience fn over `cons`.
; `cons` only ever operates on (constructs) a *pair*. `list` uses cons to create mutiple sequential pairs to ultimately construct a list.

;; Note that `cons` will also return a Sequence not a Vector
(cons "Carrie" novels) ; ("Carrie" "Emma" "Coma" "War and Peace")

;; LISTS

'(1 2 3)

;; The `'` is needed to tell Clojure that this is expressly a data list and not a callable expression
;; The single quote is not needed for empty lists ()

;; And yes, it's hard to tell the difference between a List and a Sequence

;; Like Vectors, Lists are heterogeneous: they can contain elements with different data types.
'(1 2 3 "four" 5 "six")
'(1 2.0 2.9999 "foor" 5.001 "six")
'([1 2 ("a" "list" "inside" "a" "vector")] "inside" "a" "list")

;; As with vectors, there is also a list fn
(list 1 2 3 "four" 5 "six") ; (1 2 3 "four" 5 "six")

;; You can do many of the same things with Lists that you can with a Vector
(def poems '("Iliad" "Odyssey" "Now We Are Six")) ; #'user/poems

(count poems) ; 3
(first poems) ; "Iliad"
(rest poems) ; ("Odyssey" "Now We Are Six")
(nth poems 2) ; "Now We Are Six"

;; Lists vs Vectors

;; These data structures are similar but their implementation is different
;; giving them different characteristics.

;; Vectors are like an array, arranged as a contiguous block of memory.
;; It is more performant to add elements to the end (simply expand the block of memory)
;; rather than try push the element onto the beginning of the memory block
;; and need to resize the block, or find a new block and move elements from one block to another.

;; Lists are implemented as Linked Lists It is more performant to add an
;; element to the beginning of list. Adding an element front is a simple matter
;; of adding a pointer to the current head of the list to the new item. 

;; Adding an element to the end requires traversing the list to find the end
;; and then link it to the last item.

;; Clojure has some performant implementations (like caching the count of list items in each list item)
;; to work around this but these are the generally true stances..
;; For example vectors store their data in chunks and are implemented using a tree data structure.
;; This means when it comes to constructing an almost the same copy of the data structure, 
;; Clojure can mimise storage use by reusing most the chunks in the tree by referencing them

;; These performance differences show up when using `conj`
;; `conj` is aware of the different strengths of the vectors and lists and acts accordingly

;; Using `conj` on a List will add the item to the BEGINNING of the list.
(conj poems "Jabberwocky")  ; ("Jabberwocky" "Iliad" "Odyssey" "Now We Are Six")

;; Using `conj` on a Vector will add the item to the END of the list.
(def vector-poems ["Iliad" "Odyssey" "Now We Are Six"]) ; #'user/vector-poems
(conj vector-poems "Jabberwocky") ; ["Iliad" "Odyssey" "Now We Are Six" "Jabberwocky"]

;; Couldn't I convert a list to vector? Especially since 'poems is immutable?

(vector poems) ; [("Iliad" "Odyssey" "Now We Are Six")]
;; Ah, it makes list with a vector item

;; Perhaps... `vector` takes a variable about of arguments, so I can make a
;; list be interpreted as a separate args?

(apply vector poems)  ; ["Iliad" "Odyssey" "Now We Are Six"]
;; Yes!

;; Now instead of a temporary `vector-items`, we can do this:
(conj (apply vector poems) "Jabberwocky") ; ["Iliad" "Odyssey" "Now We Are Six" "Jabberwocky"]

;; STAYING OUT OF TROUBLE

;; Remember all of these operations are immutable and we're creating new data structures,
;; not modifying them. 
;; We have not changed the value of `poems` at all nor did we persist the changes by defining
;; a new symbol with the changed data.

