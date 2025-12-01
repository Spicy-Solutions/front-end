<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      default: ''
    }
  }
}
</script>
<template>
    <div class="user-block">
        <div class="user-message">
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<style scoped>

.user-block{
    margin-left: auto;
    max-width: 75%;
    display: flex;
    justify-content: flex-end;
    gap: 0.7em;
}

.user-message {
  background: #1e88ff;
  color: white;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  
  padding: 12px 16px;
  border-radius: 18px 18px 4px 18px;
  box-shadow: 0 2px 4px rgba(30, 136, 255, 0.2);
}

.user-message p {
  margin: 0;
  color: white;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}

</style>
