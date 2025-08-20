INSERT INTO posts (title, content, username) VALUES
('Books & Comics I''ve read this year, so far', '-Vagabond 1-3
-The Count of Monte Cristo
-The Boxer
-Hardcore leveling warrior
-No Longer Human
-The Maze Runner
-The Giver
-The Republic
-The Art of Living a Meaningless Existense: Ideas from Philosophy That Change the Way You Think', 'admin'),
('Author''s vs. their works', 'There are a few books that I''ve read recently that haven''t aged super well  in light of their author''s. One good example is "Ender''s Game".
The core theme presented by the novel is that even though we may be vastly different and human nature is to be afraid of things that it doesn''t understand, we should still empathise with and try to form a connection to such "enigmas".
This is ironic because the author, Orson Scott Card has recently been revealed to have rampantly discriminatory beliefs against multiple groups of people. I would love to hear your guys'' approach to these authors.', 'AllSeeingPete'),
('Which book world would you want to live in?', 'Hey guys how''s it going? So I''ve been re-reading Harry Potter and I''ve always loved the world in it. It just seems like so much fun yknow? Getting to fly around and brew potions, casting spells and getting messages from owls.

Anyways, it got me thinking what kinds of worlds do other people find themselves wanting to be a part of?', 'admin'),
('Neil Gaiman appreciation', 'Man I just saw a reply on Twitter from Neil Gaiman where he agreed to be the OP''s friend, just so that OP could call him "Neil" is his upcoming paper on one of his Books, too funny. I think that he just seems like such a cool guy and he''s given us so much great literature, American Gods, Good Omens, Sandman, you name it.', 'Shuka'),
('Just finished eye of minds, OMG', 'Y''all, I was just reading eye of minds and when I got to THAT PART, O M G what a crazy twist, WHY haven''t more people read this???', 'KananBall'),
('Monthly Book Club Sign Ups', 'Hello Everyone!,

One week from today the book club will begin again, if you''d like to join us for the next six months and read just one book a month, just send me an email at GLee@reallyreal.com.

Thanks -Chris', 'GLee'),
('Why fiction is better than non-fiction in every way:', 'Fiction is great because it lets you escape into new worlds and live different lives, all while connecting with interesting characters. It makes you feel and think in ways that real life sometimes can’t. Plus, fiction is just plain fun—it sparks your imagination and offers stories that can stay with you for a long time. While non-fiction gives you facts, fiction gives you the freedom to dream and explore.', 'VroomVictorVroom'),
('Favorite Books!', 'Hello everyone! Since this is a fairly new club I thought I''d take the initiative and get the "Favorite Books" thread started. I''ll go first! Right now my favorite series is "The Magicians" by Lev Grossman.
It''s kinda like more mature Harry Potter mixed with Narnia.', 'Benbinoh'),
('Hey guys, can annoyone reccomend me a good book?', 'I''m trying to pick out a book for my book report but have been having trouble. It has to be at least 300 pages and can''t have any pictures, except for the cover, thanks!', 'ruler'),
('What books are you guys reading for fun right now?', 'I just started re-reading Journey to the West. It''s one of my favorite classics!', 'Benbinoh'),
('The Book of Disquiet by Fernando Pessoa', 'This book has the most poetic and beautiful writing I have ever personally read. Please everyone do yourself a favor right now, go. read. it. THANKS', 'ClareBear');

UPDATE posts SET popular = 't' WHERE id = 10;
UPDATE posts SET popular = 't' WHERE id = 8;
UPDATE posts SET popular = 't' WHERE id = 6;
UPDATE posts SET popular = 't' WHERE id = 3;
UPDATE posts SET popular = 't' WHERE id = 2;

INSERT INTO comments (post_id, comment_text, username) VALUES
(1, 'OHHHH I remember reading No Longer Human, good book, super depressing though', 'ruler'),
(2, 'Good question. Commenting so other people give their opinion.', 'GLee'),
(2, 'Yeah weird to think about huh? If you flip it and instead the nicest person you know wrote something that promotes extreme ideas and hate towards others but their actual beliefs didn''t align with that what would you do?', 'ruler'),
(2, 'Just buy their books second hand if you can. At least that way you aren''t giving the author any more money and you get to support your local book stores!', 'KananBall'),
(2, 'This is truly a tough question. The way I think about it, the author and their books can have value separate from each other. In some cases like this one of them is bad but it doesn''t cause any detriment to the other.', 'Benbinoh'),
(3, 'I''m definitely going with the hobbit. Imagine getting to sit on your ass and eat all day in the shire lol', 'Benbinoh'),
(3, 'This one might freak some people out but The Giver. I mean yeah its dystopian but im down to just chill and let someone else tell me what to do.', 'ruler'),
(3, 'Dude I don''t think that they have emotions or color in the giver, everything that makes you a person would become suppressed. I don''t think that you want that?', 'admin'),
(6, 'added!', 'VroomVictorVroom'),
(6, 'I''ll see you guys there!', 'AllSeeingPete'),
(7, 'Yeah but as they say truth can be stranger than fiction.', 'KananBall'),
(7, 'Nah dude there is something more compelling about reality. Just knowing that something really happened or had a real impact on the world causes it to have a much greater impact on you.', 'Shuka'),
(8, 'The Count of Monte Cristo, easily. Such an amazing revenge story that will keep you guessing right up until the end.', 'GLee'),
(8, 'I don''t know if it''s my favorite but The Subtle Art of Not Giving a F*ck is worth a read. It''s helped me immensely.', 'admin'),
(8, 'Infinite Jest, big, crazy, funny, and philosophical. It is a bit long but I wouldn''t change anything about it.', 'KananBall'),
(8, 'Dune: Messiah', 'AllSeeingPete'),
(8, 'My fave is called "Where the Storm Crows" it''s just YA fantasy but I love it :)', 'ruler'),
(8, 'Oops *"Where the Storm Throws"', 'ruler'),
(9, 'If you''re looking for something fantasy give "The Eye of the World" by Robert Jordan a go! It is kind of like Lord of the Rings so if you like that kind of thing you''ll love this!', 'VroomVictorVroom'),
(9, 'You should read Dune.', 'AllSeeingPete'),
(9, 'I did a report on the Hunger Games and it went really well. There are plenty of things to talk about too!', 'ClareBear'),
(10, 'I’m reading a sci-fi called Iron Prince by Bryce O’Connor.', 'admin'),
(10, 'Do you like it so far?', 'Benbinoh'),
(10, 'Seveneves by Neal Stephenson. Great hard sci-fi that reminds me a lot of books like The Martian and Project Hail Mary', 'ruler'),
(10, 'I loved Project Hail Mary', 'ClareBear'),
(10, 'Yeah me too, it was a fun read!', 'Benbinoh'),
(10, 'Dark Matter by Blake Crouch. Next up is Recursion', 'AllSeeingPete'),
(10, 'I also enjoyed Dark Matter by Blake Croucher (although I was meant to be reading Dark Matter by Michelle Paver #bookclubmixup)', 'ClareBear'),
(10, 'Oh I read that a few years ago and loved it! It has some really fun concepts to think about', 'Benbinoh'),
(10, 'Is Project Hail Mary hard read? Would I need to read the previous books or is it like a isolated story', 'Shuka'),
(10, 'Project Hail Mary is pretty easy to read, and it''s a stand alone book so no need to worry about reading anything else. It''s really fun if you like learning about science and space stuff', 'Benbinoh'),
(10, 'I haven’t read any others by the same author and found it a very enjoyable read, I absolutely loved it.
When it was recommended to me, I was told not to read anything about it, and not to read the back, so I went in completely cold. As I was reading I understood why and think it’s the best way to read this book.', 'ClareBear'),
(11, '^^^ this', 'Benbinoh');

INSERT INTO tags VALUES
('General'),
('Discussion'),
('Show and tell'),
('Sharing'),
('Non fiction'),
('Historical'),
('Fiction'),
('Scifi'),
('Fantasy'),
('Poetry'),
('Self help'),
('Reccomendations'),
('Mystery');

INSERT INTO posts_tags (post_id, tag_name) VALUES
(1, 'Sharing'),
(2, 'Discussion'),
(3, 'Discussion'),
(3, 'Fiction'),
(4, 'General'),
(5, 'Scifi'),
(5, 'Fiction'),
(6, 'General'),
(7, 'Discussion'),
(7, 'Fiction'),
(8, 'General'),
(8, 'Discussion'),
(9, 'General'),
(9, 'Reccomendations'),
(10, 'General'),
(11, 'Poetry'),
(11, 'Reccomendations');
