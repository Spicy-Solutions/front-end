import axios from "axios";

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000';

/**
 * ChatbotApiService
 * Service to handle chatbot API interactions with local FastAPI chatbot
 */
export class ChatbotApiService {
    constructor() {
        // Cliente HTTP específico para el chatbot local
        this.chatbotClient = axios.create({
            baseURL: CHATBOT_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Generate a UUID v4 for conversation tracking
     * @returns {string} - UUID string
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Send a message to the local chatbot and get a response
     * @param {string} message - The message sent by the user
     * @param {string} username - The username of the hotel manager
     * @param {number} income - Weekly income in soles
     * @param {number} expenses - Weekly expenses in soles
     * @param {string} conversationId - UUID for conversation tracking
     * @returns {Promise} - Promise with the chatbot response
     */
    async sendMessage(message, username = 'Usuario', income = 0, expenses = 0, conversationId = null) {
        try {
            const payload = {
                message: message,
                username: username,
                income: income,
                expenses: expenses,
                conversation_id: conversationId
            };
            
            console.log('📤 Enviando mensaje al chatbot local:', payload);
            
            // Endpoint del chatbot local: POST /chat
            const response = await this.chatbotClient.post('/chat', payload);
            
            console.log('✅ Respuesta del chatbot:', response.data);
            
            return response;
        } catch (error) {
            console.error('❌ Error al conectar con el chatbot local:', error);
            
            // Si el chatbot local no está corriendo, mostrar error útil
            if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
                throw new Error('El chatbot no está corriendo. Por favor ejecuta: cd ../chatbot/chatbot-api && uvicorn main:app --reload');
            }
            
            throw error;
        }
    }

    /**
     * Get available models from the chatbot
     * @returns {Promise} - Promise with available models
     */
    async getModels() {
        try {
            const response = await this.chatbotClient.get('/models');
            return response;
        } catch (error) {
            console.error('Error getting chatbot models:', error);
            throw error;
        }
    }
}
