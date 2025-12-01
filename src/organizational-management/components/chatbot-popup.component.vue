<script>
import robotIcon from "../../assets/organizational-management/chat-bot/robot.png";
import RobotMessageComponent from "./message/robot-message.component.vue";
import UserMessageComponent from "./message/user-message.component.vue";
import { ChatbotApiService } from "../services/chatbot-api.service.js";

export default {
  name: "ChatbotPopupComponent",

  components: {
    RobotMessageComponent,
    UserMessageComponent
  },
  emits: ['close-chat'],
  data() {
    return {
      robotIcon: robotIcon,
      messages: [],
      userInput: '',
      isLoading: false,
      chatbotService: new ChatbotApiService(),
      conversationId: null, // UUID para mantener el contexto de la conversación
      // Datos del usuario para el contexto del chatbot
      username: 'Manager',
      income: 5000,
      expenses: 3000,
    };
  },
  mounted() {
    // Cargar datos del usuario desde localStorage si existen
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.username) {
      this.username = user.username;
    }
    
    // Intentar cargar conversación existente desde localStorage
    const savedConversation = localStorage.getItem('chatbot_conversation');
    if (savedConversation) {
      const { conversationId, messages } = JSON.parse(savedConversation);
      this.conversationId = conversationId;
      this.messages = messages;
      console.log('💬 Conversación restaurada:', this.conversationId);
    } else {
      // Generar nuevo conversation_id para esta sesión usando UUID
      this.conversationId = this.chatbotService.generateUUID();
      console.log('🆔 Conversation ID generado:', this.conversationId);
      
      // Mensaje de bienvenida inicial
      this.addMessage({
        type: 'robot',
        content: `¡Hola ${this.username}! Soy SweetBot, tu asistente financiero para la gestión de tu hotel. Puedo ayudarte con finanzas, toma de decisiones y análisis de gastos. ¿En qué puedo ayudarte hoy?`,
        timestamp: new Date().toISOString()
      });
    }
    
    // TODO: Cargar income y expenses desde la API del hotel
    // Por ahora usamos valores por defecto
    
    this.scrollToBottom();
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = this.userInput.trim();
      this.userInput = '';

      // Agregar mensaje del usuario
      this.addMessage({
        type: 'user',
        content: userMessage,
        timestamp: new Date().toISOString()
      });

      this.isLoading = true;

      try {
        // Enviar mensaje a la API local del chatbot con contexto y conversation_id
        const response = await this.chatbotService.sendMessage(
          userMessage, 
          this.username,
          this.income,
          this.expenses,
          this.conversationId
        );
        
        // Agregar respuesta del bot
        this.addMessage({
          type: 'robot',
          content: response.data.message || 'Lo siento, no pude procesar tu mensaje.',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        
        // Mensaje de error específico
        let errorMessage = 'Lo siento, hubo un error al procesar tu mensaje.';
        
        if (error.message.includes('chatbot no está corriendo')) {
          errorMessage = '⚠️ El chatbot no está activo. Por favor, inicia el servidor del chatbot ejecutando: uvicorn main:app --reload en la carpeta chatbot/chatbot-api';
        }
        
        this.addMessage({
          type: 'robot',
          content: errorMessage,
          timestamp: new Date().toISOString()
        });
      } finally {
        this.isLoading = false;
        this.scrollToBottom();
      }
    },
    addMessage(message) {
      this.messages.push(message);
      // Guardar conversación en localStorage
      this.saveConversation();
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    saveConversation() {
      const conversation = {
        conversationId: this.conversationId,
        messages: this.messages
      };
      localStorage.setItem('chatbot_conversation', JSON.stringify(conversation));
    },
    resetConversation() {
      // Limpiar localStorage
      localStorage.removeItem('chatbot_conversation');
      
      // Generar nuevo conversation_id
      this.conversationId = this.chatbotService.generateUUID();
      console.log('🔄 Nueva conversación iniciada:', this.conversationId);
      
      // Limpiar mensajes y agregar mensaje de bienvenida
      this.messages = [];
      this.addMessage({
        type: 'robot',
        content: `¡Hola ${this.username}! Soy SweetBot, tu asistente financiero para la gestión de tu hotel. Puedo ayudarte con finanzas, toma de decisiones y análisis de gastos. ¿En qué puedo ayudarte hoy?`,
        timestamp: new Date().toISOString()
      });
    },
    closeChat() {
      this.$emit('close-chat');
    },
    scrollToBottom() {
      const messageSection = this.$el.querySelector('.message-section');
      if (messageSection) {
        messageSection.scrollTop = messageSection.scrollHeight;
      }
    },
    handleKeyPress(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    }
  },
};

</script>
<template>
    <div class="popup-content">
        <div class="popup-header">
          <img class="avatar" :src="robotIcon">
          <div class="title">SweetBot</div>
          <div class="header-actions">
            <div class="action-button" @click="resetConversation" title="Nueva conversación">
              <i class="pi pi-refresh"></i>
            </div>
            <div class="action-button" @click="closeChat" title="Cerrar chat">
              <i class="pi pi-times"></i>
            </div>
          </div>
        </div>

        <div class="popup-body">
            <div class="message-section">
                <template v-for="(message, index) in messages" :key="index">
                  <RobotMessageComponent 
                    v-if="message.type === 'robot'"
                    :message="message.content"
                    :timestamp="message.timestamp"
                  />
                  <UserMessageComponent 
                    v-else
                    :message="message.content"
                    :timestamp="message.timestamp"
                  />
                </template>
                
                <!-- Indicador de carga -->
                <div v-if="isLoading" class="loading-indicator">
                  <div class="robot-icon">
                    <img :src="robotIcon" width="25" height="25">
                  </div>
                  <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
            </div>

        </div>
        <div class="popup-footer">
          <div class="message-input-section">
            <span class="plus-icon">+</span>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              v-model="userInput"
              @keypress="handleKeyPress"
              :disabled="isLoading"
            />
          </div>

          <i 
            class="pi pi-send send-button"
            @click="sendMessage"
            :class="{ 'disabled': isLoading || !userInput.trim() }"
          >
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

.header-actions {
  display: flex;
  gap: 6px;
}

.action-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #1565c0;
}

.action-button i {
  font-size: 16px;
}

.title {
  
  flex: 1;
  margin-left: 12px;

  font-size: 18px;
  font-weight: 600;
}



.popup-body {
  flex: 1; 
}

.message-section{
    padding: 20px 18px;
    overflow-y: auto;
    height: 20em;
    display: flex;
    flex-direction: column;
    gap: 16px;
    scroll-behavior: smooth;
}

.message-section::-webkit-scrollbar {
  width: 6px;
}

.message-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.message-section::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.message-section::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
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

.send-button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.7em;
}

.loading-indicator .robot-icon {
  width: 2.5em;
  height: 2.5em;
  background-color: #1e88ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
}

.typing-dots {
  display: flex;
  gap: 4px;
  padding: 14px 18px;
  background: #F5F5F5;
  border-radius: 0px 12px 12px 12px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background-color: #999;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-10px);
  }
}
</style>