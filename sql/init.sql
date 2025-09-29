CREATE DATABASE IF NOT EXISTS chat_app;
USE chat_app;

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL DEFAULT 1,
  client_id VARCHAR(100) DEFAULT NULL,
  user_name VARCHAR(100) DEFAULT 'Anonymous',
  anonymous TINYINT(1) DEFAULT 0,
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (group_id, client_id, user_name, anonymous, text)
VALUES
(1, 'seed-a', 'Abhay Shukla', 0, 'We have Surprise For you!!'),
(1, 'seed-b', 'Anonymous', 1, 'Someone order Bornvita!!'),
(1, 'seed-b', 'Anonymous', 1, 'hahahahah!!'),
(1, 'seed-a', 'Abhay Shukla', 0, "I'm Excited For this Event! Ho-Ho"),
(1, 'me', 'You', 0, 'Hi Guysss 👋'),
(1, 'me', 'You', 0, 'Maybe I am not attending this event!');
