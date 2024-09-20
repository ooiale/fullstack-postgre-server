CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT DEFAULT 0
);

-- Insert the first blog (author, url, title)
INSERT INTO blogs (author, url, title) VALUES (
  'gymnast86', 
  'https://www.twitch.tv/gymnast86',
  'TPHD 100% Speedruns'
);

-- Insert the second blog (author, url, title, likes)
INSERT INTO blogs (author, url, title, likes) VALUES (
  'ZFG',
  'https://www.youtube.com/watch?v=K6uzvxHv098',
  'Randomizing Every Key but I Still Find Them All',
  708
);
