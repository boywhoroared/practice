;; This Goes With That

;; create a map. an associate/mapping data structure. not to be confused with `map` the fn
{"title" "Oliver Twist" "author" "Dickens" "published" 1838} ; {"title" "Oliver Twist", "author" "Dickens", "published" 1838}

;; Can be created with the `hash-map` fn
(hash-map "title" "Oliver Twist"
          "author" "Dickens"
          "published" 1838) ; {"author" "Dickens", "published" 1838, "title" "Oliver Twist"}

(def book {"title" "Oliver Twist" "author" "Dickens" "published" 1838})

;; Getting values from the map
(get book "published") ; 1838

;; You can use the hash-map data structure as a callable with the key as an argument
(book "published") ; 1838

;; Referencing a key that does not exist retuns `nil`
(book "copyright")

;; Not shown here, but you can use anything as a key
{2 "two"}

;; Often, Clojurists will use keywords. Keywords are like strings in that they
;; are a sequence of characters but they are not the same as strings.

;; KEYWORDS

; Clojure has data type for keys called keywords. A keyword is a symbol that begins with ":"

; Keywords and strings are good at different things. If you need a lable to
; represent something in your code, use a keyword.

; Maps underline the contrast between keywords and strings brilliantly: they
; bring together the data - which could be the string "Oliver Twist" - with
; it's programmatic marker, :title.

; A more idiomatic version of our novel would be:
(def book {:title "Oliver Twist", :author "Dickens" :published 1838}) ; #'user/book

(get book :title) ; "Oliver Twist"

(println "Title:" (book :title))
(println "By:" (book :author))
(println "Published:" (book :published))

(book :title) ; "Oliver Twist"

;; You can call the keyword like a function and pass in a map and the keyword will look itself up in the map
;; Apparently this is the most common way to extract a value from a map

(:title book) ; "Oliver Twist"

;; Modifying the map (without changing it)

; Again, data is immutable, so we can't modify the map, but we can create a NEW
; map that is a modified copy of an existing map.

(assoc book :page-count 362)
; {:title "Oliver Twist",
;  :author "Dickens",
;  :published 1838,
;  :page-count 362}

; Using assoc is easy. Give it your original map and a new key value pair and
; it will return a new map like the old one but with the key set to the new
; value.

; You can also supply multiple pairs

(assoc book :page-count 362 :title "War & Peace")
; {:title "War & Peace",
;  :author "Dickens",
;  :published 1838,
;  :page-count 362}

; Removing items 
; You can remove items from the map using `dissoc`

(dissoc book :published) ; {:title "Oliver Twist", :author "Dickens"}

;; You can use multiple keys
(dissoc book :title :author :published)  ; {}

; dissoc quietly ignores keys that are not in the map
(dissoc book :paperback :illustrator :favorite-zoo-animal) ; {:title "Oliver Twist", :author "Dickens", :published 1838}

;; Other Handy Map Functions

;; To get all of the keys in the map
(keys book) ; (:title :author :published)

;; There is no promise about the order of keys returned

;; You can get all of the values out of the map the same way we did with the keys
;; Note that while the order of values returned is arbitrary, they will be returned
;; in the same order that the keys are returned in when using (keys map)

(vals book) ; ("Oliver Twist" "Dickens" 1838)

;; Commas aren't widely used to separate key-value pairs in maps, however use them if they help.

;; Sets
;; Sets syntax is like maps except with #{} rather than {}

(def genres #{:sci-fi :romance :mystery}) ; #'user/genres
(def authors #{"Dickens" "Austen" "King"}) ; #'user/authors

;; Sets are like their mathematical namesakes, they are all about membership (an item is a member of set)
;; A value/item can only be in a set once. If you repeat a value in a set literal, you'll get an error

#{"Dickens" "Austen" "Dickens"} ; (err) syntax error, duplicate key "Dickens"

;; Like maps, sets do not guarantee the order of keys

;; Since sets are all about membership, the main thing you can do with them is
;; check membership: see if this or that value is a part of the set

(contains? authors "Austen") ; true
(contains? genres "Austen")  ; false

;; SET LOOKUP

;; Just like maps and vectors, you can use set like a function 
(authors "Austen")   ; "Austen"

; is :historical a member of the set? No. Returns `nil`
(genres :historical) ; nil

; if you are looking for a keyword in the set, you can switch things around
(:sci-fi genres) ; :sci-fi
(:historical genres) ; nil

; You can add items to the set with `conj`
(def more-authors
  (conj authors "Clarke")) ; #'user/more-authors
; #{"King" "Dickens" "Clarke" "Austen"}

; conjoining the same value to the set (duplicating) won't trigger an error but
; the element will only be in the set once (I suppose this is somewhat of a no-op)
(conj more-authors "Clarke") ; #{"King" "Dickens" "Clarke" "Austen"} <- Clarke only occurs once

; Remove elements with `disj`
(disj more-authors "King")  ; #{"Dickens" "Clarke" "Austen"}

;; IN THE WILD

;; Any time you need to bundle together some related data items into a unified
;; whole, one of your first thoughts should be, hey, I'll use a map.

;; You'll this occurring throughout Clojure (idiomatic?)

;; Example from `clojure.java.jdbc`

(require 'clojure.java.jdbc)
(def db {:dbtype "derby" :dbname "books"}) ; the connection configuration is represented as a map
(clojure.java.jdbc/query db ["select * from books"])

; to connect to a different database, use a different map
(def db {:dbtype "MySQL"
         :dbname "books"
         :user "russ"
         :password "noneofyourbeeswax"})

; clojure.java.jdbc also returns query results in maps
({:id 10
  :title "Oliver Twist"
  :author "Dickens"}
 {:id 20
  :title "Emma"
  :author "Austen"})

; This typical for clojure software: maps go in, maps come out

; A nifty way to use sets is for checks/validation

(def subprotocol "h2")
(#{"derby" "h2" "hsqldb" "sqlite"} subprotocol)

; It make look odd but it's not complicated: it's using the set literal as a
; function which will only return the value if `subprotocol` is a member of the
; set. Otherwise, it will return `nil`

; In this way, you can verify that `subprotocol` is a recognised value.

; Keywords  are one of the most popular data types in Clojure. They are everywhere in Clojure code.

;; STAYING OUT OF TROUBLE

; Be careful depending on map and sets behaviour to deduce whether a key is present such as:
(book :some-key-that-is-clearly-not-there)  ; nil

; While this does give yoiu nil, someone may have written
(def anonymous-book {:title "The Arabian Nights" :author nil})

; The anonymous-book map is a still a two-entry map even if one of the values is nil (nil is a valid value).

(anonymous-book :author) ; nil 
; The :author key does exist, but's value is nil. This is misleading!

; If you need to know if some key exists in a map, use `contains?`
(contains? anonymous-book :author) ; true
(contains? anonymous-book :title) ; true
(contains? anonymous-book :favorite-zoo-animal) ; false

; The same gotcha and solution applies to Sets

(def possible-authors #{"Austen" "Dickens" nil})
(contains? possible-authors "Austen")
(contains? possible-authors "King") ; false
(contains? possible-authors nil) ; true

; Clojure is happy to treat maps as an ordinary sequence of values, such as lists and vectors.
; Functions that operate on sequences, like `first`, `rest` and `count` treat maps as collections of two element vectors (tuples? pairs?)

(def book {:title "Hard Times" :author "Dickens" :published 1838})

; we can't guarantee what these functions will return. a map is not ordered.
(first book) ; [:title "Oliver Twist"]  (in the book, it returned [:published 1838])
(rest book) ; ([:author "Dickens"] [:published 1838])

; This will definitely give 3
(count book) ; 3

;; Clojure makes no promises about the order of maps. Exactly which key/value pair you get from `first` is anybody's guess.
;; However, for any given map, the results of `first` and `rest` will be consistent.
