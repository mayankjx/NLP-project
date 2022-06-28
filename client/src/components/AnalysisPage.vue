<template>
  <div class="analysisPageContent">
    <div class="headingText">
      <h1>Put your text below for</h1>
      <h1 class="accent">Sentiment analysis</h1>
    </div>
    <div class="toggleBtnGrp">
      <button
        class="txtInputBtn"
        :class="{ active: displayTxt }"
        @click="toggleInput('text')"
      >
        Text
      </button>
      <button
        class="tagInputBtn"
        :class="{ active: displayTag }"
        @click="toggleInput()"
      >
        Tag
      </button>
    </div>
    <div class="inputArea" :class="display">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="inputString"
        ref="textarea"
        :placeholder="placeholder"
      ></textarea>
    </div>
    <Transition name="fade">
      <div v-if="loadingData" class="loadingArea">
        <!-- <h1>Loading...</h1> -->
        <div class="spinner-box">
          <div class="configure-border-1">
            <div class="configure-core"></div>
          </div>
          <div class="configure-border-2">
            <div class="configure-core"></div>
          </div>
        </div>
      </div>
    </Transition>

    <Report :reportData="reportData"></Report>
    <button
      class="formSubmit"
      @click="
        () => {
          if (display === 'textInput') {
            requestAnalysis();
          } else {
            tagAnalysis();
          }
        }
      "
    >
      Analyse
    </button>
  </div>
</template>

<script>
import Report from "./Report.vue";
import { animate } from "motion";

export default {
  components: { Report },
  data() {
    return {
      inputData: {},
      inputString: "",
      reportData: {},
      display: "textInput",
      displayTxt: true,
      displayTag: false,
      placeholder: "Enter your text here",
      loadingData: false,
    };
  },
  methods: {
    toggleInput(data) {
      if (data === "text") {
        this.display = "textInput";
        this.displayTxt = true;
        this.displayTag = false;
        this.placeholder = "Enter your text";
      } else {
        this.display = "tagInput";
        this.displayTxt = false;
        this.displayTag = true;
        this.$refs.textarea.rows = "1";
        this.placeholder = "Enter your tag here";
      }
      this.reportData = {};
      this.inputString = "";
    },

    async requestAnalysis() {
      console.log(`text`);
      // convert input to suitable js object

      this.inputData["content"] = this.inputString;

      // send post request to server
      this.reportData = {};
      this.loadingData = true;
      console.log(this.loadingData);
      const response = await this.$http.post(
        "/api/analysis/text",
        this.inputData
      );
      this.loadingData = false;
      this.reportData = response.data;
    },

    async tagAnalysis() {
      console.log(`tag`);
      // get tag input
      this.inputData["content"] = this.inputString;
      // call the api endpoint
      this.reportData = {};
      this.loadingData = true;
      console.log(this.loadingData);
      const response = await this.$http.post(
        "/api/analysis/tag",
        this.inputData
      );
      // hydrate reportData
      this.loadingData = false;
      this.reportData = response.data;
      console.log(response.data);
    },

    testData() {
      this.$http.get("/api/test").then((response) => {
        this.reportData = response.data;
      });
    },
  },
  mounted() {
    animate(".inputArea", { opacity: 1 }, { duration: 1, easing: "ease-in" });
  },
};
</script>

<style lang="scss">
@import "../assets/variables";

.analysisPageContent {
  height: 100%;
  width: 100%;
  background-color: $primary-color;
  color: $secondary-color;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
}

.headingText {
  grid-column: 2 / -2;
  grid-row: 2 / 3;
  align-self: center;
  text-align: center;
}

.accent {
  color: $accent-color;
}

.active {
  background-color: $accent-color;
  color: $primary-color;
}

.toggleBtnGrp {
  grid-column: 3/6;
  grid-row: 4/5;
  align-self: center;
  // align-self: center;
  // justify-self: center;
  display: flex;
}

.toggleBtnGrp button {
  // border-radius: 15px;
  // background: $secondary-color;
  margin: 0;
  border: none;
  font-size: 25px;
  font-family: "League Spartan", sans-serif;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  padding: 10px 0px;
}

.txtInputBtn {
  flex-grow: 1;
  border-radius: 10px 0px 0px 10px;
}

.tagInputBtn {
  flex-grow: 1;
  border-radius: 0px 10px 10px 0px;
}

.inputArea {
  // grid-column: 2 / 7;
  // grid-row: 4/10;
  background-color: $secondary-black;
  border-radius: 40px;
  opacity: 0;
}

.loadingArea {
  grid-column: 8/12;
  grid-row: 6/11;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  // align-self: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes configure-clockwise {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes configure-xclockwise {
  0% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(-135deg);
  }
  75% {
    transform: rotate(-225deg);
  }
  100% {
    transform: rotate(-315deg);
  }
}

.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;
}

.configure-border-1 {
  width: 55px;
  height: 55px;
  padding: 3px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $accent-color;
  animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
}

.configure-border-2 {
  width: 55px;
  height: 55px;
  padding: 3px;
  left: -55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $secondary-color;
  transform: rotate(45deg);
  animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
}

.configure-core {
  width: 100%;
  height: 100%;
  background-color: $primary-color;
}

.textInput {
  grid-column: 2 / 7;
  grid-row: 6/11;
  border-radius: 40px;
}

.tagInput {
  grid-column: 2 / 7;
  grid-row: 6/8;
  border-radius: 20px;
}

.textInput textarea {
  padding: 35px;
}

.tagInput textarea {
  padding: 20px;
}

.inputArea textarea {
  font-family: "League Spartan", sans-serif;
  margin: 0px;
  height: 100%;
  width: 100%;
  background: none;
  resize: none;
  border: none;
  outline: none;
  overflow: auto;
  color: $secondary-color;
  font-size: 1.25rem;
}

.formSubmit {
  grid-row: 11/-1;
  grid-column: 6/8;
  width: 185px;
  height: 56px;
  align-self: center;
  justify-self: center;
  border-radius: 15px;
  background: #f4be2c;
  font-size: 25px;
  font-family: "League Spartan", sans-serif;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

.formSubmit:focus {
  outline: none;
}
</style>
