//function entirely for creating the postgreSQL tables
const pool = require("../utils/postgreConnection");


const createPools = async () => {
    if (!process.env.POSTGREDB_URI) return;
    try{
        //users table
        await pool.query(`create table if not exists Users(id serial primary key, name text, email text unique not null, role text check (role in ('student', 'admin')), createdAt timestamp default current_timestamp, lastUpdated timestamp default current_timestamp)`);

        //orders table
        await pool.query(`create table if not exists Orders(id serial primary key, buyer_id integer not null, seller_id integer not null, item_id integer not null , item_type text not null, amount numeric(10,2) not null, status text check(status in ('pending', 'paid', 'completed', 'cancelled')) default 'pending', createdAt timestamp default current_timestamp, foreign key (buyer_id) references Users(id), foreign key (seller_id) references Users(id))`);

        //payments table
        await pool.query(`create table if not exists Payments(id serial primary key, order_id integer not null, amount numeric(10,2) not null, payment_method text not null, status text check(status in ('pending', 'paid', 'completed', 'cancelled')) default 'pending', transaction_reference integer not null, createdAt timestamp default current_timestamp)`);

        //sessions table
        await pool.query(`create table if not exists Sessions(id serial primary key, user_id integer not null, refresh_token text not null, expires_at text not null)`);

        //reviews summary table
        await pool.query(`create table if not exists Reviews(id serial primary key, user_id integer not null, avg_rating real check(avg_rating >=0 and avg_rating <=5), total_reviews integer default 0)`);

        //trigger for lastUpdated
        await pool.query(`
            create or replace function update_timestamp()
            returns trigger as $$
            begin
                new."lastUpdated" = CURRENT_TIMESTAMP;
                return new;
            end;
            $$ language plpgsql;
        
            drop trigger if exists set_timestamp on Users;
            create trigger set_timestamp
            before update on Users
            for each row
            execute function update_timestamp();
`);

        console.log("tables created and ready!")
    }
    catch(err){
        console.error(err);
    }
}

void createPools();