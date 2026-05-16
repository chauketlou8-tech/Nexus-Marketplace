// function entirely for creating the postgresql tables
const pool = require("../utils/postgreConnection");

const createPools = async () => {
    if (!process.env.POSTGREDB_URI) return;

    try {
        // users table
        await pool.query(`create table if not exists Users(id serial primary key, name text, email text unique not null, password_hash text not null, role text check (role in ('student','admin')) default 'student', year integer, is_verified boolean default false, created_at timestamp default current_timestamp, last_updated timestamp default current_timestamp)`);

        // courses table
        await pool.query(`create table if not exists Courses(id serial primary key, code text unique not null, name text not null)`);

        // user courses table
        await pool.query(`create table if not exists UserCourses(user_id integer references Users(id) on delete cascade, course_id integer references Courses(id) on delete cascade, primary key (user_id, course_id))`);

        // orders table
        await pool.query(`create table if not exists Orders(id serial primary key, buyer_id integer not null references Users(id), seller_id integer not null references Users(id), item_id integer not null, item_type text check (item_type in ('product','service')), amount numeric(10,2) not null, status text check(status in ('pending','paid','completed','cancelled')) default 'pending', created_at timestamp default current_timestamp)`);

        // payments table
        await pool.query(`create table if not exists Payments(id serial primary key, order_id integer not null references Orders(id), amount numeric(10,2) not null, payment_method text not null, status text check(status in ('pending','paid','completed','cancelled')) default 'pending', transaction_reference text not null, created_at timestamp default current_timestamp)`);

        // sessions table
        await pool.query(`create table if not exists Sessions(id serial primary key, user_id integer not null references Users(id), refresh_token text not null, expires_at timestamp not null)`);

        // reviews summary table
        await pool.query(`create table if not exists Reviews(id serial primary key, user_id integer not null references Users(id), avg_rating real check(avg_rating >= 0 and avg_rating <= 5), total_reviews integer default 0)`);

        // trigger for last_updated
        await pool.query(`
            create or replace function update_timestamp()
            returns trigger as $$
            begin
                new.last_updated = current_timestamp;
                return new;
            end;
            $$ language plpgsql;

            drop trigger if exists set_timestamp on Users;
            create trigger set_timestamp
            before update on Users
            for each row
            execute function update_timestamp();
        `);

        console.log("tables created and ready!");
    } catch (err) {
        console.error(err);
    }
};

void createPools();