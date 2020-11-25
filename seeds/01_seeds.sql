INSERT INTO users (name,email,password) 
VALUES
('Odell Torp','Odell22@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sara Mike','sara.m@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Teddy bear','teddy@toy.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mike Smith','mike.s@index.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lol fun','fun@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,
cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active) 
VALUES
(1,'big mansion','beautiful sea side  mansion', 'http://placeimg.com/100/100/arch','http://placeimg.com/640/480/arch',1000000,10,15,15,'Canada','1 mansion street','vancouver','British Columbia','V1L 3R2',FALSE),
(2,'appartement','spacious delux appartement', 'http://placeimg.com/100/100/arch','http://placeimg.com/640/480/arch',200,3,3,4,'Canada','2 mountain street','banff','Alberta','A1B 1B1',TRUE),
(3,'house','nice house with big garden', 'http://placeimg.com/100/100/arch','http://placeimg.com/640/480/arch',500,2,3,5,'Canada','3 street','ottawa','Ontario','O1W 1T1',FALSE);

INSERT INTO reservations (start_date,end_date,property_id,guest_id) 
VALUES 
('2020-01-01','2020-03-04',1,4),
('2019-05-01','2019-05-03',1,2),
('2016-10-20','2016-10-24',1,5),
('2018-01-01','2018-03-04',2,1),
('2017-01-01','2017-01-04',3,4);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message) 
VALUES 
(4,1,1,5,'nice'),
(2,1,2,3,'average'),
(5,1,3,4,'perfect'),
(1,2,1,4,'nice'),
(4,3,1,4,'nice');
