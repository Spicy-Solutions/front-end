<script>
import TopBarComponent from "../../shared/components/top-bar.component.vue";
import SearchBar from "../../shared/components/search-bar.component.vue";
import ButtonComponent from "../../shared/components/button.component.vue";
import ModalComponent from "../../shared/components/modal.component.vue";
import MainPageNavigation from "../components/main-page-navigation.component.vue";
import HotelGallery from "../components/hotel-gallery.component.vue";
import ChatbotPopupComponent from "../components/chatbot-popup.component.vue";
import robotIcon from "../../assets/organizational-management/chat-bot/robot.png";

export default {
  name: "MainPage",
  components: {
    ButtonComponent,
    SearchBar,
    TopBarComponent,
    ModalComponent,
    MainPageNavigation,
    HotelGallery,
    ChatbotPopupComponent
  },
  data() {
    return {
      showModal: true,
      showPopUp: false,
      robotIcon: robotIcon
    };
  },
  methods: {
    handleButton() {
      console.log("Hello!");
    },
    onCategoryChanged(category) {
      console.log("Category changed to:", category);
    }
  },
};
</script>

<template>
  <SearchBar />
  <MainPageNavigation @category-changed="onCategoryChanged" />
  <HotelGallery ref="hotelGallery" />

  <div class="chatbot-button" @click="showPopUp = !showPopUp" ref="chatbotButton">
    <img :src="robotIcon" alt="sweetbot" class="chatbot-image" />
  </div>
  <div v-if="showPopUp" class="pop-up-section" ref="popupChatbot">
    <ChatbotPopupComponent @close-chat="showPopUp = false"/>
  </div>
</template>

<style scoped>
.pop-up-section {
  position: absolute;
  right: 3em;
  bottom: 5.5vh;

  width: 22.5em;
  height: 27.5em;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
  border-radius: 16px;
}

.chatbot-button {
  position: absolute;
  right: 2em;
  bottom: 4vh;

  width: 65px;
  height: 65px;

  background-color: #1E88FF;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: transform 0.15s ease-in-out, box-shadow 0.2s;
}

.chatbot-button:hover {
  transform: scale(1.07);
}

.chatbot-image {
  width: 65%;
  height: 65%;
  object-fit: contain;
}
.bottom-button:hover {
  background-color: blue;
}

</style>
