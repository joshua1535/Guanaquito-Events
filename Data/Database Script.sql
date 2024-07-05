create table public.user(
	code uuid not null default gen_random_uuid(),
	email VARCHAR(50) not null,
	password VARCHAR(75) not null,
	profile_picture VARCHAR(250) null,
	date_added timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
	active boolean NOT NULL DEFAULT true,
	constraint user_pk primary key (code)
);

create table public.permit(
	code uuid not null default gen_random_uuid(),
	name VARCHAR(50) not null,
	constraint permit_pk primary key (code)
);

create table public.userxpermit(
	code uuid not null default gen_random_uuid(),
	user_code uuid null,
	permit_code uuid null,
	constraint userxpermit_pk primary key (code)
);

create table public.event(
	code uuid not null default gen_random_uuid(),
	event_title VARCHAR(50) not null,
	involved_people VARCHAR(100) not null,
	event_image VARCHAR(250) not null,
	event_date DATE not null,
	event_time TIME not null,
	duration INT not null,
	sponsors VARCHAR(150) not null,
	active boolean not null,
	category_code VARCHAR(20) null,
	constraint event_pk primary key (code),
	weather varchar(50) NULL,
	temperature DECIMAL NULL,
	event_location_code uuid NULL,
	demo varchar(300) null
);

create table public.userxevent(
	code uuid not null default gen_random_uuid(),
	user_code uuid null,
	event_code uuid null,
	constraint userxevent_pk primary key (code)
);

create table public.category(
	code VARCHAR(20) not null,
	name VARCHAR(50) not null,
	constraint category_pk primary key (code)
);

create table public.tier(
	code uuid not null default gen_random_uuid(),
	price DECIMAL not null,
	capacity INT not null,
	tier_name VARCHAR(50) not null,
	event_code uuid null,
	constraint tier_pk primary key (code)
);

create table public.order(
	code uuid not null default gen_random_uuid(),
	user_buyer_code uuid null,
	purchase_date TIMESTAMP not null,
	constraint order_pk primary key (code)
);

create table public.ticket(
	code uuid not null default gen_random_uuid(),
	order_code uuid null,
	tier_code uuid null,
	user_owner_code uuid null,
	constraint ticket_pk primary key (code)
);

create table public.register(
	code uuid not null default gen_random_uuid(),
	transaction_code VARCHAR(75) null,
	ticket_code uuid null,
	creation_time TIME not null,
	transference_date TIMESTAMP null,
	validation_date TIMESTAMP null,
	constraint register_pk primary key (code)
);

CREATE TABLE public.event_location(
	code uuid not null default gen_random_uuid(),
	geom geometry NOT NULL,
	lat numeric NOT NULL,
	lon	numeric NOT NULL,
	location_name varchar (200) NOT NULL,
	address varchar(500) NOT NULL,
	department_code VARCHAR(20) NULL,
	constraint event_location_pk primary key (code)
);

CREATE TABLE public."token" (
	code uuid NOT NULL DEFAULT gen_random_uuid(),
	"content" varchar NOT NULL,
	active boolean NOT NULL DEFAULT true,
	"timestamp" timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
	user_code uuid NULL,
	CONSTRAINT token_pk PRIMARY KEY (code),
	CONSTRAINT token_fk FOREIGN KEY (user_code) REFERENCES public.user(code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE public.departments(
	code varchar(20) NOT NULL,
	name varchar(100) NOT NULL,
	geom geometry NOT NULL,
	constraint deparments_pk primary key (code)
)


-- Declaracion de Foreign Key's
-- Tabla UserXPermit
alter table public.userxpermit add constraint user_code_fk foreign key (user_code) references public.user(code) on delete set null on update cascade;
alter table public.userxpermit add constraint permit_code_fk foreign key (permit_code) references public.permit(code) on delete set null on update cascade;

-- Tabla Event
alter table public.event add constraint category_code_fk foreign key (category_code) references public.category(code) on delete set null on update cascade;
alter table public.event add constraint event_location_fk foreign key (event_location_code) references public.event_location(code) on delete set null on update cascade;

-- Tabla UserXEvent
alter table public.userxevent add constraint user_code_fk foreign key (user_code) references public.user(code) on delete set null on update cascade;
alter table public.userxevent add constraint event_code_fk foreign key (event_code) references public.event(code) on delete set null on update cascade;

-- Tabla Tier
alter table public.tier add constraint event_code_fk foreign key (event_code) references public.event(code) on delete set null on update cascade;

-- Tabla Order
alter table public.order add constraint user_buyer_code_fk foreign key (user_buyer_code) references public.user(code) on delete set null on update cascade;

-- Tabla Ticket
alter table public.ticket add constraint order_code_fk foreign key (order_code) references public.order(code) on delete set null on update cascade;
alter table public.ticket add constraint tier_code_fk foreign key (tier_code) references public.tier(code) on delete set null on update cascade;
alter table public.ticket add constraint user_owner_code_fk foreign key (user_owner_code) references public.user(code) on delete set null on update cascade;

-- Tabla Register
alter table public.register add constraint ticket_code_fk foreign key (ticket_code) references public.ticket(code) on delete set null on update cascade;

-- Tablar Event_Location
alter table public.event_location add constraint department_code_fk foreign key (department_code) references public.departments(code) on delete set null on update cascade;