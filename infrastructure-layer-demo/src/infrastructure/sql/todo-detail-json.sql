-- The origin_query CTE is replaced with the parameterized AST, never interpolated text.
with origin_query as (select 1 as placeholder), "cte_object_depth_1" as (
        select
            *
            , case
                when "category_id" is null
                and "category_name" is null
                and "category_description" is null
                and "category_color" is null
                and "category_created_at" is null then
                    null
                else
                    jsonb_build_object('category_id', "category_id", 'name', "category_name", 'description', "category_description", 'color', "category_color", 'created_at', "category_created_at")
            end as "category_json"
        from
            "origin_query"
    )
    , "cte_array_depth_1" as (
        select
            "category_json"
            , "todo_id"
            , "title"
            , "description"
            , "status"
            , "priority"
            , "todo_created_at"
            , "todo_updated_at"
            , "category_id"
            , "category_name"
            , "category_description"
            , "category_color"
            , "category_created_at"
            , jsonb_agg(jsonb_build_object('todo_comment_id', "todo_comment_id", 'todo_id', "comment_todo_id", 'content', "comment_content", 'author_name', "comment_author_name", 'created_at', "comment_created_at")) as "comments"
        from
            "cte_object_depth_1"
        group by
            "category_json"
            , "todo_id"
            , "title"
            , "description"
            , "status"
            , "priority"
            , "todo_created_at"
            , "todo_updated_at"
            , "category_id"
            , "category_name"
            , "category_description"
            , "category_color"
            , "category_created_at"
    )
    , "cte_root_todo" as (
        select
            jsonb_build_object('todo_id', "todo_id", 'title', "title", 'description', "description", 'status', "status", 'priority', "priority", 'category_id', "category_id", 'created_at', "todo_created_at", 'updated_at', "todo_updated_at", 'category', "category_json", 'comments', "comments") as "todo"
        from
            "cte_array_depth_1"
    )
select
    "todo"
from
    "cte_root_todo"
limit
    1;
