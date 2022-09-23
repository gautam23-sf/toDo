CREATE TABLE category_list (
    cat_desc VARCHAR(100) NOT NULL,
    cat_id BIGSERIAL NOT NULL PRIMARY KEY
);
create table todo_list (
	todo_id BIGSERIAL NOT NULL PRIMARY KEY,
	todo_desc VARCHAR(200),
    todo_check_status BOOLEAN,
	cat_id BIGINT REFERENCES category_list (cat_id) ON DELETE CASCADE
);
