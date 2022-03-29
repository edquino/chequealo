--TABLA ADMINS
CREATE TABLE chq_administrator(
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(500) NOT NULL,
    name VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
	email VARCHAR (255) NOT NULL UNIQUE,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chq_administrator (username, password, name, lastname, email) VALUES('admin', '$2a$10$VjNAbm5bGBIZW1L1uk2hXuN07/wPON5o4dmP8D7CMvIupjbMt9QxG', 'Usuario1', 'Chequealo',  'administrator@chequealo.com');
INSERT INTO chq_administrator (username, password, name, lastname, email) VALUES('user', '$2a$10$VjNAbm5bGBIZW1L1uk2hXuN07/wPON5o4dmP8D7CMvIupjbMt9QxG', 'Usuario01', 'Chequealo',  'user01@chequealo.com');

--CREATE TABLE RECOVER CODES 
CREATE TABLE chq_recover_codes (
    code_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    expiration_date VARCHAR,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chq_users_id_fkey FOREIGN KEY (user_id)
    REFERENCES chq_users (user_id)
);



--CREATE TABLE GENDER
CREATE TABLE chq_gender (
    gender_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chq_gender(gender_id, name) VALUES(0, 'Pendiente');
INSERT INTO chq_gender(name) VALUES( 'Masculino');
INSERT INTO chq_gender(name) VALUES( 'Femenino');

CREATE TABLE chq_countries(
    country_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chq_countries (country_id, name) VALUES (0,'Pendiente');
INSERT INTO chq_countries (country_id, name) VALUES (1,'El SALVADOR');

CREATE TABLE chq_state(
    state_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    country_id INTEGER NOT NULL DEFAULT 1,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chq_countries_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES chq_countries (country_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION

);

INSERT INTO chq_state (state_id, name) VALUES (0, 'Pendiente');
INSERT INTO chq_state (state_id, name) VALUES (1, 'Ahuachapán');
INSERT INTO chq_state (state_id, name) VALUES (2, 'Cabañas');
INSERT INTO chq_state (state_id, name) VALUES (3, 'Chalatenango');
INSERT INTO chq_state (state_id, name) VALUES (4, 'Cuscatlán');
INSERT INTO chq_state (state_id, name) VALUES (5, 'La Libertad');
INSERT INTO chq_state (state_id, name) VALUES (6, 'La Unión');
INSERT INTO chq_state (state_id, name) VALUES (7, 'La Paz');
INSERT INTO chq_state (state_id, name) VALUES (8, 'Morazán');
INSERT INTO chq_state (state_id, name) VALUES (9, 'San Miguel');
INSERT INTO chq_state (state_id, name) VALUES (10, 'San Vicente');
INSERT INTO chq_state (state_id, name) VALUES (11, 'Santa Ana');
INSERT INTO chq_state (state_id, name) VALUES (12, 'San Salvador');
INSERT INTO chq_state (state_id, name) VALUES (13, 'Sonsonate');
INSERT INTO chq_state (state_id, name) VALUES (14, 'Usulután');


CREATE TABLE chq_municipalities(
    municipality_id SERIAL PRIMARY KEY NOT NULL,
    state_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chq_municipalities_state_id_fkey FOREIGN KEY (state_id)
    REFERENCES chq_state (state_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO chq_municipalities (state_id, name) VALUES (0, 'Pendiente');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Ahuachapán');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Apaneca');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Atiquizaya');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Concepción de Ataco');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'El Refugio');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Guaymango');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Jujutla');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'San Francisco Menéndez');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'San Lorenzo');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'San Pedro Puxtla');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Tacuba');
INSERT INTO chq_municipalities (state_id, name) VALUES (1 , 'Turín');

INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Cinquera');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Dolores');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Guacotecti');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Ilobasco');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Jutiapa');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'San Isidro');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Sensuntepeque');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Tejutepeque');
INSERT INTO chq_municipalities (state_id, name) VALUES (2 , 'Victoria');


CREATE TABLE chq_access_levels(
    access_level_id SERIAL PRIMARY KEY NOT NULL,
    access_name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chq_access_levels (access_name, description) VALUES ('Nivel Cero', 'Visita anónima, para mensajería o artículos.');
INSERT INTO chq_access_levels (access_name, description) VALUES ('Nivel Uno', 'Visitante se identificara con código QR.');
INSERT INTO chq_access_levels (access_name, description) VALUES ('Nivel Dos', 'Visítate requiere un perfil en la aplicación con datos generales y un documento de identidad.');
INSERT INTO chq_access_levels (access_name, description) VALUES ('Nivel Tres', 'Visitante deberá tener perfil en la aplicación y haber sido validado al menos una vez en establecimiento.');

CREATE TABLE chq_personal_documents(
    document_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chq_personal_documents (document_id, name, description) VALUES (0,'Pendiente', 'Pendiente');
INSERT INTO chq_personal_documents (document_id, name, description) VALUES (1,'DUI', '.');
INSERT INTO chq_personal_documents (document_id, name, description) VALUES (2,'NIT', '.');

CREATE TABLE chq_users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(1000) NOT NULL,
    fcm_token VARCHAR NOT NULL, 
    name VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    document_id INTEGER NOT NULL,
    document_detail VARCHAR,
    email VARCHAR(250) UNIQUE NOT NULL,
    cellphone VARCHAR(15) UNIQUE NOT NULL,
    workplace VARCHAR(500),
    workload VARCHAR(500),
    picture VARCHAR,
    country_id INTEGER NOT NULL DEFAULT 0,
    state_id INTEGER NOT NULL DEFAULT 0,
    municipality_id INTEGER NOT NULL DEFAULT 0,
    adress VARCHAR(250),
    twitter VARCHAR(100),
    facebook VARCHAR(100),
    document_photo1 VARCHAR(250),
    document_photo2 VARCHAR(250),
    gender_id INTEGER NOT NULL DEFAULT 0,
    otro_genero  VARCHAR(150),
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chq_countries_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES chq_countries (country_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_state_state_id_fkey FOREIGN KEY (state_id)
    REFERENCES chq_state (state_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_municipalities_municipality_id_fkey FOREIGN KEY (municipality_id)
    REFERENCES chq_municipalities (municipality_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_gender_id_fkey FOREIGN KEY (gender_id)
    REFERENCES chq_gender (gender_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_personal_documents_id_fkey FOREIGN KEY (document_id)
    REFERENCES chq_personal_documents (document_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO chq_users(username, password, fcm_token, name, lastname, document_id, email, cellphone, workplace, workload, country_id, state_id, municipality_id, adress, gender_id)
VALUES ('user001', '$2a$10$xIEXhopKFbYvFwWhQz1So.hcJ2z2nWM9D3OY/RqpIWL2dpYmkzH4.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiIyMDciLCJuYW1lIjoiQXJpZWwgR3VlcnJhIEVjaGV2ZXJyw61hIChEZW4pIiwidXNlcl9uYW1lIjoiYWd1ZXJyYSIsImVtYWlsIjoiIiwiY2xhdmUiOiJmY2VhOTIwZjc0MTJiNWRhN2JlMGNmNDJiOGM5Mzc1OSIsImlkX2luc191c3VhcmlvIjoiMjIiLCJpZF9kZXB0b191c3VhcmlvIjoiMTAiLCJpZF9jYXJfdXN1YXJpbyI6IjE4IiwiY29kaWdvIjoiU1MiLCJyb2xlcyI6W3sibmFtZSI6IlRlY25pY28iLCJyb2xlX2lkIjoyfV0sIm1vZHVsZXMiOlt7Im5hbWUiOiJBbGVydGEgVGVtcHJhbmEiLCJtb2R1bGVfaWQiOjF9LHsibmFtZSI6IkF0ZW5jacOzbiBhIENyaXNpcyIsIm1vZHVsZV9pZCI6Mn0seyJuYW1lIjoiRGFzaGJvYXJkIiwibW9kdWxlX2lkIjozfSx7Im5hbWUiOiJUcmFtaXRhY2nDs24gZGUgQ2Fzb3MiLCJtb2R1bGVfaWQiOjd9XX0sImlhdCI6MTY0MjYyODA4NSwiZXhwIjoxNjQ1MzA2NDg1fQ.8cOEVvtpANIVovbci5o40zqlEhH04s5__ZSRAC1GoQs', 'user001', 'test001', 0, 'eaquino@thenestservices.com', '79073013', 'NextServies', 'Programador', 1, 1, 1, 'Pto. La Libertad', 1);

CREATE TABLE chq_manager(
    manager_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(1000) NOT NULL,
    fcm_token VARCHAR NOT NULL, 
    name VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    document_id INTEGER NOT NULL,
    document_detail VARCHAR,
    email VARCHAR(250) UNIQUE NOT NULL,
    cellphone VARCHAR(15) NOT NULL,
    workplace VARCHAR(500),
    workload VARCHAR(500),
    country_id INTEGER NOT NULL DEFAULT 0,
    state_id INTEGER NOT NULL DEFAULT 0,
    municipality_id INTEGER NOT NULL DEFAULT 0,
    adress VARCHAR(250),
    twitter VARCHAR(100),
    facebook VARCHAR(100),
    document_photo1 VARCHAR(250),
    document_photo2 VARCHAR(250),
    gender_id INTEGER NOT NULL DEFAULT 0,
    otro_genero  VARCHAR(150),
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chq_countries_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES chq_countries (country_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_state_state_id_fkey FOREIGN KEY (state_id)
    REFERENCES chq_state (state_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_municipalities_municipality_id_fkey FOREIGN KEY (municipality_id)
    REFERENCES chq_municipalities (municipality_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_gender_id_fkey FOREIGN KEY (gender_id)
    REFERENCES chq_gender (gender_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_personal_documents_id_fkey FOREIGN KEY (document_id)
    REFERENCES chq_personal_documents (document_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO chq_manager (username, password, fcm_token, name, lastname, document_id, email, cellphone, workplace, workload, country_id, state_id, municipality_id, adress, gender_id)
VALUES ('manager001', '$2a$10$xIEXhopKFbYvFwWhQz1So.hcJ2z2nWM9D3OY/RqpIWL2dpYmkzH4.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiIyMDciLCJuYW1lIjoiQXJpZWwgR3VlcnJhIEVjaGV2ZXJyw61hIChEZW4pIiwidXNlcl9uYW1lIjoiYWd1ZXJyYSIsImVtYWlsIjoiIiwiY2xhdmUiOiJmY2VhOTIwZjc0MTJiNWRhN2JlMGNmNDJiOGM5Mzc1OSIsImlkX2luc191c3VhcmlvIjoiMjIiLCJpZF9kZXB0b191c3VhcmlvIjoiMTAiLCJpZF9jYXJfdXN1YXJpbyI6IjE4IiwiY29kaWdvIjoiU1MiLCJyb2xlcyI6W3sibmFtZSI6IlRlY25pY28iLCJyb2xlX2lkIjoyfV0sIm1vZHVsZXMiOlt7Im5hbWUiOiJBbGVydGEgVGVtcHJhbmEiLCJtb2R1bGVfaWQiOjF9LHsibmFtZSI6IkF0ZW5jacOzbiBhIENyaXNpcyIsIm1vZHVsZV9pZCI6Mn0seyJuYW1lIjoiRGFzaGJvYXJkIiwibW9kdWxlX2lkIjozfSx7Im5hbWUiOiJUcmFtaXRhY2nDs24gZGUgQ2Fzb3MiLCJtb2R1bGVfaWQiOjd9XX0sImlhdCI6MTY0MjYyODA4NSwiZXhwIjoxNjQ1MzA2NDg1fQ.8cOEVvtpANIVovbci5o40zqlEhH04s5__ZSRAC1GoQs', 'manger001', 'manager001', 0, 'arojas@thenestservices.com', '79378666', 'NextServies', 'Director Servicios', 1, 1, 1, 'Sta. Tecla', 1);


CREATE TABLE chq_business_type(
    business_type_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chq_business_type (business_type_id, name, description) VALUES (0,'Pendiente', 'Pendiente');
INSERT INTO chq_business_type (business_type_id, name, description) VALUES (1,'Institución Pública', '.');
INSERT INTO chq_business_type (business_type_id, name, description) VALUES (2,'Residencial', '.');
INSERT INTO chq_business_type (business_type_id, name, description) VALUES (3,'Condominio', '.');
INSERT INTO chq_business_type (business_type_id, name, description) VALUES (4,'Empresa', '.');

CREATE TABLE chq_business(
    business_id SERIAL PRIMARY KEY NOT NULL,
    business_type_id INTEGER NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    photo_profile VARCHAR,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chq_business_type_id_fkey FOREIGN KEY (business_type_id)
    REFERENCES chq_business_type (business_type_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO chq_business (business_type_id, name, description) VALUES (4, 'Next Services', '...');

CREATE TABLE chq_branches(
    branche_id SERIAL PRIMARY KEY NOT NULL,
    business_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    name VARCHAR(150) NOT NULL,
    opening_time TIME, 
    closing_time TIME, 
    longitud TEXT,
    latitud TEXT,
    photo_profile VARCHAR,
    description TEXT NOT NULL,
    country_id INTEGER NOT NULL DEFAULT 0,
    state_id INTEGER NOT NULL DEFAULT 0,
    municipality_id INTEGER NOT NULL DEFAULT 0,
    intallation_id INTEGER NOT NULL,
    facility_manager_id NUMERIC NOT NULL,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chq_business_business_id_fkey FOREIGN KEY (business_id)
    REFERENCES chq_business (business_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_countries_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES chq_countries (country_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_state_state_id_fkey FOREIGN KEY (state_id)
    REFERENCES chq_state (state_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_municipalities_municipality_id_fkey FOREIGN KEY (municipality_id)
    REFERENCES chq_municipalities (municipality_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);


CREATE TABLE chq_installation(
    installation_id SERIAL PRIMARY KEY NOT NULL,
    branche_id INTEGER NOT NULL, 
    name VARCHAR(50) NOT NULL,
    person_limit NUMERIC NOT NULL,
    description TEXT,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE chq_audience_detail (
    audience_detail_id SERIAL PRIMARY KEY NOT NULL,
    audience_date date NOT NULL,
    audience_hour time NOT NULL, 
    parking varchar,
    depure_time time NOT NULL,
    type VARCHAR(250),
    description TEXT,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chq_audiences (
    audience_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    branche_id INT NOT NULL,
    installation_id INT NOT NULL,
    audience_detail_id INT NOT NULL, 
    visitor_id INT NOT NULL,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chq_users_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES chq_users (user_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_branches_branche_id_fkey FOREIGN KEY (branche_id)
    REFERENCES chq_branches (branche_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_installation_intallation_id_fkey FOREIGN KEY (intallation_id)
    REFERENCES chq_installation (intallation_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT chq_audience_detail_audience_detail_id_fkey FOREIGN KEY (audience_detail_id)
    REFERENCES chq_audience_detail (audience_detail_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION

);



CREATE TABLE chq_notification (
    notification_id SERIAL PRIMARY KEY NOT NULL,
    audience_id INTEGER NOT NULL, 
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(250),
    description TEXT,
    picture VARCHAR,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



