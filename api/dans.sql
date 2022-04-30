--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ridwands
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying,
    password character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO ridwands;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ridwands
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ridwands;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ridwands
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ridwands
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ridwands
--

COPY public.users (id, username, password, created_at) FROM stdin;
1	ridwands	$2b$10$PsCkVc8ElJpujjhtuqeMWOKEwfDBt3w9tNaVi6yWxX7hIWneq3jAa	2022-04-30 09:27:34.241422
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ridwands
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: ridwands
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

