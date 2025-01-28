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

>>> "hello" == ['h','e','l','l','o']
-- strings are just syntactic sugar for lists of characters!
True
-}



