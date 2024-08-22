# electron-study

I have always been fascinated for desktop apps development. I had this permanent curiosity, but as I have started my developer career as a backend developer with Node.js and Typescript, I did not have too much time to learn and use other native languages for desktop, like C++, C# or Rust. I also want to build some applications for personal use and for my local church.

Then I decided that I could start building simple desktop apps with Electron, using my Node.js skills, and if someday I need to migrate to other more performatic technology, I would do so. But I see Electrion as a great way to build beautiful desktop apps.

This way, I can also practice my frontend again, because I am working as a backend developer for almost two years, and it's always great to understand the frontend as well.

## About the projects

This is my version of the five Electron.js projects offered in a 8-hour video by the YouTube channel AcodebiZ, in which he builds desktop apps while teaches Electron. Big thanks to AcodebiZ for posting this video!

If you want to learn Electron as well, check out [the full 8-hour video on YouTube by AcodebiZ](https://www.youtube.com/watch?v=3hqawL0xVxo).

## My challenges

Some parts of the code that he presents were outdated to the most recent Electron versions, therefore I had to modify some things to make it work, specially when IPC (inter communication process) was required.

Sometimes it is quite difficult to do things on your own, just looking up at the documentation, because they often don't go as expected, and we have to start a process of debugging the problem. But this is also a very important part of learning, right? Spending time with a problem usually will save time in the future when we face this very same problem again.

I am also aware that parts of the code can be refactored to look cleaner or even more organized. But for now I am quite satisfied to make it work first.

## My touch

I have also added some features to the apps that are not present in the course.

For instance, for the first project (text editor), I have added the location where file was saved to be displayed on the window title after being returned from a two-way process communication -- first from process to main, to send the text to be saved, and then from main to process, receiving the location where it was saved. Quite basic, but makes it more notepad-like.

In the second app, the music player, I have improved some aspects of the application. I have distributed the items in the sidebar equally using CSS flexbox. Because of that, some Photon classes were breaking, especially the `toolbar-actions:before` and `toolbar-actions:after`, so I had to override them as well. I also had to solve a lot of bugs (many of them created by me, because I am modifying doing lots of things my way).

The third app was easier to follow, because it was basically the same application developed in the previous step, but now in the system tray. However, I still decided that some improvements could be made. For instance, in the way it was presented in the tutorial, the volume button had a bug that made it non-draggable, and the window was moving when the user tried to change the volume. The solution was quite simple, just add `-webkit-app-region: no-drag;` to the input, but it is an important detail. Other minor fixes like these were done as well.

The two least apps were easier for me in terms of Electron itself, but I had a good time dealing with HTML and frontend Javascript.

I have used a different Radio API for the last project only to change something to add extra challenge.

I will try to add more features in the future, if I have the time and energy to do so.

## Status of the project

Project is currently ongoing. So far I have studied and completed:

 - [x] Text Editor
 - [x] Music Player
 - [x] System tray Music Player (using last project)
 - [x] Top Headlines News Reader
 - [x] Radio Streaming App
 - [ ] Packaging and distribution
