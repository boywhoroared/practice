-- The following uses a 'Test' block and >>> to indicate we want the Haskell Language Server to evaluate these 
-- as if we were at the REPL prompt
-- It's pretty nifty

{-
>>> 2 + 5 
7
>>> 49 * 100 
4900
>>> 1892 - 1472
420
>>> 5 / 2
2.5

-- Precendence rules
>>> (50 * 100) - 4999
1
>>> 50 * 100 - 4999
>>> 50 * (100 - 4999)
1
-244950

-- Be a little careful when using Negative numbers
-- 5 * -3 well make GHCI yell at you. Presumably because `-` is an operator/fn
-- Surrounding negative numbers with parentheses will keep you safe.
>>> 5 * (-3)
-15

-- Booleans
>>> True && False
>>> True && True
>>> False || True
>>> not False
>>> not (True && True)
False
True
True
True
False

-- Testing for Equality
>>> 5 == 5
>>> 1 == 0
True
False
>>> 5 /= 5
>>> 5 /= 4
False
True
>>> "hello" == "hello"
True

-- These should get you an error message because both arguments aren't the same TYPE
-- `+` expects it's arguments to be of the same type.
-- These operators are all actually functions ;)

>>> 5 + "llama"
No instance for (Num String) arising from the literal `5'
In the first argument of `(+)', namely `5'
In the expression: 5 + "llama"
In an equation for `it_axZf': it_axZf = 5 + "llama"

>>> 5 == True
No instance for (Num Bool) arising from the literal `5'
In the first argument of `(==)', namely `5'
In the expression: 5 == True
In an equation for `it_ay1i': it_ay1i = 5 == True
No instance for (Num Bool) arising from the literal `5'
In the first argument of `(==)', namely `5'
In the expression: 5 == True
In an equation for `it_ax8O': it_ax8O = 5 == True
-}
