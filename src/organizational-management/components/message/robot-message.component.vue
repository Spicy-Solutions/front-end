<script>
import robotIcon from "../../../assets/organizational-management/chat-bot/robot-white.png";

export default{
  props: {
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      default: ''
    }
  },
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
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<style scoped>

.robot-block{
    max-width: 80%;
    display: flex;
    gap: 10px;
    align-items: flex-start;
}

.robot-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  background-color: #1e88ff;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  flex-shrink: 0;
}

.robot-message {
  background: #F5F5F5;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  padding: 12px 16px;
  border-radius: 4px 18px 18px 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.robot-message p {
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* Estilos para formato de texto enriquecido */
.robot-message :deep(strong) {
  font-weight: 600;
  color: #1e88ff;
}

.robot-message :deep(em) {
  font-style: italic;
  color: #555;
}

.robot-message :deep(code) {
  background: #e8e8e8;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

</style>
