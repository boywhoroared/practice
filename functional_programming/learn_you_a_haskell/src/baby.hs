-- Baby's Firsts Functions
doubleMe x = x + x


{-
>>> doubleMe 9
18
-- The math operators are able to work on Integers and Floats. Integers sneakily get turned into floats.
>>> doubleMe 8.3
16.6
-}

doubleUs x y = x*2 + y*2
{-
>>> doubleUs 4 9
>>> doubleUs 2.3 34.2 
26
73.0
>>> doubleUs 28 88 + doubleMe 123
478
-}

-- You can reuse your own fns (duh)
doubleUs2 x y = doubleMe x + doubleMe y
{-
>>> doubleUs2 4 9
26
>>> doubleUs2 2.3 34.2 
>>> doubleUs2 28 88 + doubleMe 123 
73.0
478
-}

-- Functions in Haskell don't have to be defined in any particular order. 
-- So it doesn't mater if you define `doubleMe` first then `doubleUs` or the other way around
-- (It's hoisting like JavaScript? Maybe not, it's probably that lazy evaluation thing? )

doubleSmallNumber x = if x > 100 then x else x*2
-- In Haskell, an `if` must always have an `else`. The `else` is mandatory.
-- This is because `if` is an expression and an expression must always return a value
-- '5' is an expression that returns 5. `4 + 8` is an expression, `x + y` is an expression
-- because it returns the sum of x an y

-- Because `if then else` is an expression, we can use it anywhere we use an expression!
doubleSmallNumberPlusOne x  = (if x > 100 then x else x*2) + 1
-- `if then else` is not a block construct as it is in other languages

{-
>>> doubleSmallNumberPlusOne 10
-} 

-- You can use ' as part of a function name in Haskell. `'` is not 
-- a reserved character.
doubleSmalNumber' x = doubleSmallNumberPlusOne

-- It's Haskell convention to use ' to denote the strict version of 
-- a function (one that isn't lazy) or a slightly modified version of 
-- a function or a variable


-- # Definitions/Names

-- Because ' is allowed, we can do things like
conanO'Brien = "It's a-me, Conan O'Brien!"

-- You'll note that you/we haven't  started that function's name with a capital
-- letter. Nor any of the other functions 
-- This is because functions can't start with a capital letter in Haskell

-- Another thing is that because `conanO'Brien` doesn't take any parameters,
-- we say it's a _definition_ (or a _name_).
-- We can't change things once we've defined them (immutable/constant), so now
-- the name 'conanO'Brien' and the string "It's a-me, Conan O'Brien" can be 
-- used interchangeably


-- # Intro to Lists
lostNumbers = [4,8,15,16,23,42]
{-
>>> lostNumbers
[4,8,15,16,23,42]

>>> [1,2,'a',3,'b','c',4]
No instance for (Num Char) arising from the literal `1'
In the expression: 1
In the expression: [1, 2, 'a', 3, 'b', 'c', 4]
In an equation for `it_a2iGG':
    it_a2iGG = [1, 2, 'a', 3, 'b', 'c', 4]

-}

-- Strings are just syntactic sugar for lists of characters!
{-
>>> "hello" == ['h','e','l','l','o']
-}

-- Joining Lists
{-
>>> [1,2,3,4] ++ [9,10,11,12]  
>>> "hello" ++ " " ++ "world"  
>>> ['w','o'] ++ ['o','t']  
-}

-- NOTE: Be careful using the ++ operator repeatedly to concatenate lists
-- Haskell has to traverse the whole list on the LHS of the ++ 
-- and then join the second list to it. When dealing with lists
-- that aren't too big, it's fine but if you're working with a list 
-- of 50 million entries, Haskell will take a while 
-- This is because Haskell uses linked lists internally

-- However inserting elements at the beginning of a list is 
-- instant. This uses the cons (hey! lisp!) operator ':'


-- JavaScript is different. JS uses a Stack data structure,
-- so Array.push is fast (usually) but Array.unshift (cons)
-- is more expensive.

-- Cons
{-
>>> 'A':" SMALL CAT"  
>>> 5:[1,2,3,4,5]  
"A SMALL CAT"
[5,1,2,3,4,5]
-}

-- [1,2,3] is actually syntactic sugar for 1:2:3:[]

-- Indexing into lists
-- Use the !! operator/function

{-
>>> "Steve Buscemi" !! 6  
>>> [9.4,33.2,96.2,11.2,23.25] !! 1  
-}

-- Lists can contain lists
-- But lists can't contain different types, so a list with a nested list
-- must be all nested list items.

{-
>>> b = [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]   
>>> b
>>> b ++ [[1,1,1,1]]
[[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
[[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3],[1,1,1,1]]
>>> [6,6,6]:b
[[6,6,6],[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
-}

-- Lists can be compared but **LEXICOGRAPHICALLY**
-- Haskell compares each pair of items from the list
-- ONLY if the first pair of elements are equal, then it 
-- continues to compare the second pair

-- See also <https://stackoverflow.com/a/3651214>

{-
>>> [3,2,1] > [2,1,0]  
>>> [3,2,1] > [2,10,100]  
>>> [3,4,2] > [3,4]  
>>> [3,4,2] > [2,4]  
>>> [3,4,2] == [3,4,2]  
True
True
True
True
True
-}

-- [3,2,1] > [2,10,100] results in True because
-- 3 > 2 is True. Haskell stops comparing at this 
-- point because it got a True result. 

-- This will result in false because 3 == 3 
-- So Haskell moves on to evaluate 2 > 10 which is False
-- and the comparison stops because we have a result
-- >>> [3,2,1] > [3,10,100]
-- False


-- List Operations
-- First elment of list
-- >>> head [5,4,3,2,1]

-- Tail - removes head, gives you the tail
-- >>> tail [5,4,3,2,1]

-- Last gives you the actual last element
-- >>> last - gives you the last element

-- init returns everything but the last element (opposite of tail ) 
-- >>> init [5,4,3,2,1]
