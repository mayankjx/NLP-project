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

      const response = await this.$http.post(
        "/api/analysis/text",
        this.inputData
      );
      this.reportData = response.data;
    },

    async tagAnalysis() {
      console.log(`tag`);
      // get tag input
      this.inputData["content"] = this.inputString;
      // call the api endpoint
      const response = await this.$http.post(
        "/api/analysis/tag",
        this.inputData
      );
      // hydrate reportData
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
</style>
