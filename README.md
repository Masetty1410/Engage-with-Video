# Engage-with-Video
Video-Calling Web Application : Microsoft Engage

Working demo of my Web-Application : https://engage-with-video.herokuapp.com/
Youtube demo :

# How to run the app

Incase If you dont have node.js in your computer then install it here  https://nodejs.org/en/download/<br/>
Once its download ,chech the version using <br/>
1)node -v (on your terminal/cmd)<br/>
2)npm -v


1)npm i(for installing all dependencies). <br/>
2)npm run Start.<br/>
3)open localhost:5000 to view the app

#Features in the app


1. Group Video Call , also possible in different network <br/>
2. User authentication <br/>
3. Password Encryption <br/>
4. Chat box <br/>
5. Raise Hand in the chat box<br/>
6. Invite People<br/>
7. Custom Usernames<br/>
8. Video Toggle<br/>
9. Audio Toggle<br/>



# Technologies involoved

1)ejs. <br />
2)express.  <br />
3)peer  <br />
4)peerjs <br />
5)socket.io <br />
5)uuid  <br />
6)webRTC <br />
7)firebase(database and authentication)

# Agile Methodology

Agile software development refers to  software development methodologies centered round the idea of iterative development, where requirements and solutions evolve through collaboration between self-organizing cross-functional teams.
# Sprint
A sprint is a short, time-boxed period when a scrum team works to complete a set amount of work. Sprints are at the very heart of scrum and agile methodologies, and getting sprints right will help your agile team ship better software with fewer headaches.

# Agile methodology Implementation for thisn project

I split-up my work intp 4 sprints each of length 1 week.<br/>

Sprint-1 : <br/>

a)I explored all the technologies which are related for my project and picked few of them<br/>
b)Initially I started connecting 2 nodes using socket.io and webRTC , I had few bugs and I resolved them over the first with help of my mentors and friends.<br/>

Sprint-2 : <br/>

a)In the second week I integrated Mute , Video on and off , End call  and Invite people buttons .<br/>
b)And then explored about database and authentication technologies.<br/>

Sprint-3 : <br/>

a)Initially I made Sign up page and then authentication(through mail)<br/>
b)Then I made a login page and get started page<br/>

Sprint-4 : Here microsoft added an extra feature of chat which we have to adapt .<br/>

a)I made the chat box where 2 people can chat on videocall .<br/>
b)And then included Rise Hand option i.e whenver the user raises his/her hand it get notified in th chat box.<br/>
c)Lastly made few UI changes and then deployed in heroku.







