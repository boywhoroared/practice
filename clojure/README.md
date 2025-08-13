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

### Running Clojure Tools (via :aliases) 

Using tools via Clojure **aliases** was not completely obvious.

See <https://www.clojure.org/reference/clojure_cli#use_tool>

You can install it as a Clojure tool but then there isn't a record of it
in your `deps.edn`. Installing it as a tool allows you use to invoke the
tool very simply:

```
clojure -Tcljfmt check
```

If we want to invoke it via the alias in our `deps.edn`, we invoke it
as:

```
clojure -T:cljfmt cljfmt.tool/check
```

where we specify the alias **keyword** (`:cljfmt`) and the namespace qualified
function to run. Without the namespace, you will get an error:

> Unqualified function can't be resolved.

How do we know the namespace? __sigh__ You will have to look at the project's
`deps.edn` `:tools/usage {:ns-default}`  value to find out.

In this example, see <https://github.com/weavejester/cljfmt/blob/master/deps.edn>

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
