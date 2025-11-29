<script>
import robotIcon from "../../../assets/organizational-management/chat-bot/robot-white.png";

export default{
  data() {
    return {
      robotIcon: robotIcon,
    };
  },
}
</script>
<template>
    <div class="robot-block">
        <div class="robot-icon">
            <img :src="robotIcon" width="25" height="25"></img>
        </div>
        <div class="robot-message">
            <p>tes13134134341234123413413123t</p>
        </div>
    </div>
</template>
<style scoped>

.robot-block{
    width: 20em;
    display: flex;
    gap: 0.7em;
}

.robot-icon {
  width: 2.5em;
  height: 2.5em;
  background-color: #1e88ff;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1000px;
}

.robot-message {
  background: #F5F5F5;
  max-width: 12em;
  word-wrap: break-word;
  padding: 14px 18px;
  border-radius: 0px 12px 12px 12px;
}

</style>
