CREATE TABLE Questions (
    question_id int NOT NULL AUTO_INCREMENT,
    question TEXT(500) NOT NULL,
    PRIMARY KEY (question_id)
);

CREATE TABLE Answers (
    answer_id int NOT NULL AUTO_INCREMENT,
    answer VARCHAR(255) NOT NULL,
    PRIMARY KEY (answer_id)
);

CREATE TABLE Categories (
    category_id int NOT NULL AUTO_INCREMENT,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE Groups (
    group_id int NOT NULL AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (group_id)
);

CREATE TABLE Countries (
    country_id int NOT NULL AUTO_INCREMENT,
    country_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (country_id)
);

CREATE TABLE AnswerQuestions (
    answerQuestion_id int NOT NULL AUTO_INCREMENT,
    category_id int NOT NULL,
    question_id int NOT NULL,
    group_id int NOT NULL,
    answer_id int NOT NULL,
    country_id int NOT NULL,
    PRIMARY KEY (answerQuestion_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  	FOREIGN KEY (question_id) REFERENCES Questions(question_id),
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
  	FOREIGN KEY (answer_id) REFERENCES Answers(answer_id),
 	FOREIGN KEY (country_id) REFERENCES Countries(country_id)
);