<script>
import robotIcon from "../../assets/organizational-management/chat-bot/robot.png";
import RobotMessageComponent from "./message/robot-message.component.vue";
import UserMessageComponent from "./message/user-message.component.vue";

export default {
  name: "ChatbotPopupComponent",

  components: {
    RobotMessageComponent,
    UserMessageComponent
  },
  data() {
    return {
      robotIcon: robotIcon,
    };
  },
};

</script>
<template>
    <div class="popup-content">
        <div class="popup-header">
          <img class="avatar" :src="robotIcon">
          <div class="title">SweetBot</div>
          <div class="popup-menu">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </div>

        <div class="popup-body">
            <div class="message-section">
                <RobotMessageComponent></RobotMessageComponent>
                <UserMessageComponent></UserMessageComponent>
                <RobotMessageComponent></RobotMessageComponent>
                <UserMessageComponent></UserMessageComponent>
                <RobotMessageComponent></RobotMessageComponent>
                <UserMessageComponent></UserMessageComponent>
            </div>

        </div>
        <div class="popup-footer">
          <div class="message-input-section">
            <span class="plus-icon">+</span>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
            />
          </div>

          <i class="pi pi-send send-button">
          </i>
          
        </div>
      </div>
    
</template>

<style scoped>
.popup-content {

  width: 100%;
  height: 100%;
  
  background-color: white;
  border-radius: 16px;
  
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.popup-header {
  
  background-color: #1e88ff;
  
  color: white;
  padding: 12px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar {
  color: #1e88ff;
  
  width: 38px;
  height: 38px;
  border-radius: 50%;
  
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 20px;
}

.popup-menu:hover{
  background-color: #1565c0;
  border-radius: 999px;
  
}

.title {
  
  flex: 1;
  margin-left: 12px;

  font-size: 18px;
  font-weight: 600;
}

.popup-menu {
  padding: 5px;
  cursor: pointer;
}

.popup-body {
  flex: 1; 
}

.message-section{
    padding: 18px;
    overflow-y: scroll;
    height: 20em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.popup-footer {
  
  border-top: 1px solid #e5e5e5;
  padding: 10px 12px;
  
  display: flex;
  align-items: center;
  gap: 8px;
  
  background-color: #f7f7f7;
}

.message-input-section {
  
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  
  background-color: #ffffff;
  border-radius: 999px;
  
  border: 1px solid #e0e0e0;
  padding: 6px 12px;
}

.message-input-section input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
}

.plus-icon {
  font-size: 18px;
  color: #999999;
}

.send-button {
  background-color: #1e88ff;
  color: white;

  border-radius: 999px;
  
  padding: 14px 14px;
  
  font-size: 13px;
  font-weight: 500;

  cursor: pointer;
}

.send-button:hover {
  background-color: #1565c0;
}
</style>