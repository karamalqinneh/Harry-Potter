DROP TABLE IF EXISTS harryPotterCharacters;

CREATE TABLE IF NOT EXISTS harryPotterCharacters (
    id SERIAL PRIMARY KEY,
    CharacterName VARCHAR(255),
    house VARCHAR(255),
    ancestry VARCHAR(255),
    patronus VARCHAR(255),
    imageURL VARCHAR(10000)
)