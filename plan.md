# Bookly Plan

**Business:** Barber

## Services

| Name | Duration (min) | Price (cents) |
|---|---|---|
| Haircut | 60 | 5000 |
| Eyebrows | 20 | 1000 |
| Head massage | 15 | 1000 |
| Beard trim | 20 | 1500 |

## Question

What could go wrong if two customers try to book the same slot at the same moment?



My answer: it could push two services, but cause bugs/errors.
so i need to make an await promise, to check if its already entered.