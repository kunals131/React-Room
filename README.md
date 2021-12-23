
<h1 align="center">
<a href="https://reactroom.netlify.app/"> React Room </a>
</h1>

<p align="center">🌟 Honorable Mention in <a target="_blank" href="https://devpost.com/software/react-room-zy384i">Dolby.io Hackathon</a></p>

<p align="center">
  <a href="https://app.netlify.com/sites/reactroom/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/661a57bc-cff4-4182-b551-aa191297bcc3/deploy-status" alt="Netlify Status" />
  </a>
</p>



# ⚡ Inspiration
 <p>There are so many conferencing applications available, but when it comes to personalization and immersive user experience, the majority of them fall short.</p>


# ❓What it does
 React Room is a web-based audio/video conferencing application that makes use of Dolby's communication APIs to provide a more immersive and personalised experience for the user. It has an adaptive user interface that adjusts to instances like changes in the number of participants. It also has a voice command assistant that responds to voice commands with a variety of actions. React Room also  has a variety of themes that participants can customise to their liking.

# ✅ How I built it
I created the UI with React/Redux Js and used Dolby APIs to set up communication/conferences between participants, Firebase for user authentication, Cloudinary for image and asset storage, Unsplash Api for various room backgrounds, and Netlify for hosting.



# 🏃 Challenges I ran into
One of the most difficult challenges was propagating a change to all participants; for example, if one user shares a screen, the UI of all participants must adapt to it (thought of using firebase's real-time database but found a workaround in react). Another major challenge was creating a voice assistant and comparing voice inputs to existing commands. I attempted to use external text comparison APIs, but it took a significant time. So I created a dataset of the most likely commands for a specific action, as well as some instruction commands for new participants.

# 🥲 Accomplishments that I'm proud of
 Putting together a whole conferencing application with voice assistant.🙂

# 🎯 What I learned
 I learned a lot about web-based communication and Dolby's voxeet SDK. I learned more about React and Redux by resolving numerous bugs and errors.

# ⏭️ What's next for React Room
 I'll add more features to it, such as hostcontrols and past conference records storage.