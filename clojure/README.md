# Clojure

Starting with the Clojure Guides basic language tutorial and using
Clojure CLI
<https://clojure-doc.org/articles/tutorials/getting_started/>


## Tooling
- Clojure CLI (tools.deps) <https://clojure-doc.org/articles/tutorials/getting_started_cli/>



## How To

### Run a Clojure Program

```
clojure -M -m my.proj
```

`-M` indicates to use the *main* function, `clojure.main`, 
`-m` tells `clojure.main`  to load the `my.proj` namespace and run the `-main` function.

```clojure
(ns my.proj)

(defn -main []
  (println "Hello, World!"))
```

## Importing Libraries

```clojure
(require '[clojure.string])

(clojure.string/upper-case "clojure")
```

Using an alias:

```clojure
; Using an alias
(require '[clojure.string :as str])

(str/upper-case "clojure")
```

Only import specific symbols rather than the whole library/namespace:

```clojure
(require '[clojure.string :refer [upper-case]])

(upper-cases "clojure")
```

## REPL

### Query documentation

```clojure
(doc nil?)

(doc if)
```

:warning: Documentation is only available for libs that have been required.

### Examine Source Code

`source`

```clojure
(source some?)
```

### List all the names of variables/symbols in a given namespace

`dir`

```clojure
(dir clojure.string)

;; Why do I use `clojure.string` here  and `'[clojure.string]` in require?
```

### Searching Docs

**apropos**

```clojure
; Search documentation for symbols containing the string "index"
(apropos "index")
```

`apropos` only searchs the var names. You can use `find-doc` to search within the doc strings.

**find-doc**

```clojure
(find-doc "indexed")
```

#### Pretty Print

#### Pretty Print Last Result

```clojure
(require '[clojure.pprint :as pp])

;; do some code here

; print last evaluation result
(pp/pp)
```

### Pretty Print Table

```clojure
(require '[clojure.pprint :as pp])

;; do some code here

; print last evaluation result
(pp/pprint-table (mapv number-summary [6 12 28]))
```

### Adjust Print Level Depth

```clojure
(set! *print-level* 3)
```

Similarly for long collections you can also adjust the print length

```clojure
(set! *print-length* 3)
(repeat 100 (vec (range 100))) 
```


See [Data Visualisation at the REPL](https://clojure.org/guides/repl/data_visualization_at_the_repl)
