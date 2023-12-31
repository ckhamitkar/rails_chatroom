import consumer from "channels/consumer"

document.addEventListener("turbo:load", ()=>{

const room_id = document.getElementById("room-id").getAttribute('current_room_id')

consumer.subscriptions.subscriptions.forEach((subscription) => {
    consumer.subscriptions.remove(subscription)
});

consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id}, {
    connected() {
    console.log("Connected to room " + room_id )

    // Called when the subscription is ready for use on the server
    },

    disconnected() {
    // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log(data)
      const messageDiv = document.getElementById("messages");
      
      const user_id = document.getElementById("user-id").getAttribute('current_user_id')
      
      console.log(user_id)
      
      if (data.current_user.id == user_id){
          messageDiv.innerHTML += data.mine
          document.getElementById('input-message').value='';
      }
      else{
          messageDiv.innerHTML += data.other
      }
      
      messageDiv.scrollTop = messageDiv.scrollHeight;
      
      }
});  

})