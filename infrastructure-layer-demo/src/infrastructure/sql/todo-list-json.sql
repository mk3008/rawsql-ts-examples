-- The origin_query CTE is replaced with the parameterized AST, never interpolated text.
with origin_query as (select 1 as placeholder), "cte_root_todo" as (
        select
            jsonb_build_object('todo_id', "todo_id", 'title', "title", 'description', "description", 'status', "status", 'priority', "priority", 'createdAt', "todo_created_at", 'updatedAt', "todo_updated_at", 'category_name', "category_name", 'category_color', "category_color") as "todo"
        from
            "origin_query"
    )
select
    jsonb_agg("todo") as "todo_array"
from
    "cte_root_todo";
