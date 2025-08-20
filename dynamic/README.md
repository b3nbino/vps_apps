Software Versions:
Windows 11
Node - v18.17.1
Google Chrome (64 Bit) - v128.0.6613.86
Postgres v14.3

Video Installation Instructions:
https://youtu.be/sJdrStaprx0

Before Installation:
Before you begin the steps below you will need to make sure that you have Node, NPM, and Postgres installed. You also need to have a Postgres user named 'postgres', which is the default customarily, and the user must have the password 'postgres'. You can change the password to 'postgres' using this command: 'postgres' using this command 'sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';" '
(without the single quotes at the beggining and end). If you have an existing username and password(NOT NULL) that you would like to use instead, just navigate to the .env file and change the PGUSER and PGPASSWORD to their respective correct login information.

Having a username and password for postgres is required for this application. As per the Postgres documentation "If no password has been set up for a user, the stored password is null and password authentication will always fail for that user." You can also set the password for a user in SQL using "ALTER USER your_username_here PASSWORD 'your_password_here';".

Installation Steps:

1. Begin by unzipping the downloaded file "ls_forum".
2. Using your command line, navigate to the project folder, the one that this file is in,
   this is where all of the following commands should be executed from.
3. Execute the command "npm intall" to install all of the packages needed to run this program
4. Database Setup
   4a. The first step is to create a database, use "createdb forum" in your command line to do so
   4b. Next you want to import the schema and seed data for the forum with the following commands
   -"psql forum < schema.sql"
   -"psql forum < ./lib/users.sql"
   -"psql forum < ./lib/seed-data.sql"
   If you do any of these steps incorrectly or in the wrong order it is reccommended to
   start over just execute the "dropdb forum" command and restart from the beggining of step 4.
5. Next can start the program using the "npm start" command, in your command line.
6. Finally using your browser, navigate to "http://localhost:3000/".

Use:
Use of the forum app from this point on should be pretty straightforward. At first you will probably need to login.
You can use the username: "ls_Staff" and password: "mastery" to login. From the home page you can view the most recent posts,
or scroll through the pages to find the older ones. To look at a specific post and its comments just click on "READ MORE>>".

You can also create posts and add comments. To create a post simply click "CREATE POST>>" from anywhere and enter a title,
tags (These need to be from the list of tags on the bottom right), and a post body. Then click "SUBMIT POST>>" and you'll be
taken to the home page where your new post has taken the spotlight as the first on the page! To add a comment to a post just click "READ MORE>>"
on the post you want to comment on, add your comment's text to the textarea above the "SUBMIT COMMENT>>" button and submit away!

Finally, this forum also allows you to edit and delete your posts and comments. Once again, navigate to a post by clicking "READ MORE>>".
From here you'll see a white edit button, and a black "DELETE>>" button that you can press to accomplish either corresponding goal.

Design Choices:
The most outwardyly obvious design choice that I made was to use a CSS Template provided by w3-Schools at this link: https://www.w3schools.com/w3css/tryw3css_templates_blog.htm.
These templates are free to be used by anyone and since CSS isn't a part of my grade, I wanted to take advantage of that.

In terms of project folder layout, I used a similar layout to our other projects but I inclueded a routes folder as well. The reason that I included a routes folder
was just to make things simpler and more organized.

I also had to make a lot of Forum posts and I decided to make the forum theme "Books" because I thought it would be
easy to understand and make discussion for. These posts are mostly just whatever I could come up and that seem somewhat realistic,
except one is taken from a thread on Slack that I started.

You might also notice that some of the usernames seem familiar. Since the first post I made was taken from slack I thought it would be fun to make up usernames
for the fake users based on people at launch school. I didn't encrypt the passwords for many of the users since I just used them to make seed data.

Overall, I had a lot of things that I wanted to do but I had to reel myself in. For example adding a tag that tells others when a post or comment has been editied,
or letting people create tags, etc... But nonetheless, I am very happy with how the project turned out. Thank you for taking the time to grade it! Cheers! -Ben
