# SQL Monty Python

The Monty Python puzzle in SQL


## SQL vs Datalog

[SQL 3](https://www.iso.org/standard/26197.html) (aka SQL 99) introduced some
new constructs, such as recursive queries, which then made SQL as expressive as
Datalog. There are still some distinct differences though.

- Defining a relation can be done with `CREATE VIEW`, with the arguments being
  columns. However, Datalog (and Prolog) are untyped and rely on pattern
  matching for structural analysis -- a functor can take any type. Sqlite is
  _sort of_ untyped in that it will try to coerce the value if it differs from
  the column type.

- Unifying only certain arguments and ignoring others (`_`) can be done with
  projection. 

- SQL supports aggregation, `GROUP BY`, triggers, and other specific functions.
  Some of this could potentially be implemented in some Datalog
  implementations: ie `SUM` and `AVG` using recursion if arithmetic operators
  are supported. 

  `GROUP BY` wouldn't be possible because counting `DISTINCT` values requires
  the use of all-solutions predicates:

  ```prolog
  distinct(Goal) :-
    findall(Goal, Goal, List),
    list_to_set(List, Set),
    member(Goal, Set).
  ```

- Recursive relations could be implemented with recursive SQL queries. However,
  due to some of the complexities with combining recursion and aggregation, I'm
  not sure if the strict termination allows for recursion with stratified
  negation.

- Datalog syntax is more terse and easier to read for complex queries.

- Performance characteristics differ
  - Tail-call optimization differs from the kind of recursion analysis of SQL.
  - Datalog is guaranteed to terminate.
  - Some datalog implementations are optimized with tabling and/or magic sets.
  - Prolog (not Datalog) systems index at least on the principal functor of the
    first argument of any predicate.
  - Problems that would require a lot of joins in SQL are very easy to compute
    in Datalog (and Prolog). If an argument is unified with a conjunction of X
    predicates, this would require X joins in SQL, which can get very
    expensive.

- Both Datalog (and Prolog) and SQL can describe hypergraphs, but Datalog is
  much more expressive because it lifts the type restrictions on relation
  arguments, relying on pattern matching instead, and allows for any number of
  arities on the functor.

- Different problems work best for SQL vs Datalog. Datalog works best for
problems that might need to unify across many relations, such as expert
systems.

- Prolog is a whole different beast being a general purpose language, and due to
powerful reflection capabilities, and constructs such as DCGs and monotonicity,
has a lot of advantages over traditional languages and SQL.
  - For example: theorem proving, declarative debugging, powerful static analysis
    of programs at _runtime_, meta interpreters, bi-directional parsers, strict
    ("disciplined") macros, symbolic AI, and a much stronger and strict dynamic
    language than almost any others due to it's pure monotonic core.
