<template>
  <Transition name="slide-fade">
    <div v-if="reportData.status" class="statusBox" :class="reportData.status">
      <p>Status: {{ reportData.status }}</p>
    </div>
  </Transition>
  <Transition name="slide-fade">
    <div v-if="reportData.types" class="abuseBox">
      <p class="activityType" v-for="(type, i) in reportData.types" :key="i">
        {{ type }}
      </p>
      <!-- <p>
      Severity:
      <span :class="reportData.abuse[0].severity">
        {{ reportData.abuse[0].severity }}
      </span>
    </p> -->
      <p class="subject">Subject(s):</p>
      <p class="content" v-for="(target, i) in reportData.targets" :key="i">
        {{ target }}
      </p>
      <div class="tags">
        <p>Tag(s):</p>
        <ul class="tagList">
          <li class="tagListItem" v-for="(tag, i) in reportData.tags" :key="i">
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script>
import { animate } from "motion";

export default {
  props: {
    reportData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    animate(".inputArea", { opacity: 1 }, { duration: 1, easing: "ease-in" });
  },
};
</script>

<style lang="scss">
@import "../assets/variables";

.reportContent {
  background-color: none;
  border: white solid 1px;
  color: $primary-color;
  grid-column: 8/12;
  grid-row: 4 / 10;
  border-radius: 25px;
  padding: 20px;
}

.good {
  background-color: $safe-color;
}

.bad {
  background-color: $danger-color;
}

.extreme {
  color: $danger-color;
}

.high {
  color: $danger-color;
}

.medium {
  color: $medium-color;
}

.low {
  color: $low-color;
}

.statusBox {
  //   background-color: $secondary-color;
  color: $secondary-color;
  grid-column: 8/12;
  grid-row: 6 / 8;
  align-self: start;
  border-radius: 12px;
  padding: 20px;
  font-weight: 600;
  font-size: 1.3rem;
  z-index: 2;
}

.abuseBox {
  background-color: $secondary-color;
  color: $primary-color;
  grid-column: 8/12;
  grid-row: 8 / 10;
  align-self: start;
  border-radius: 12px;
  padding: 20px;
  font-weight: 600;
  font-size: 1.3rem;
  z-index: 3;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.activityType {
  font-size: 1.5rem;
  font-weight: 700;
}

.subject {
  display: inline-block;
  // margin: 10px 20px;
  margin: 10px 10px 10px 20px;
}

.content {
  display: inline-block;
  font-weight: 400;
}

.tags {
  margin: 0px 20px;
}

.tagList {
  margin-top: 6px;
  margin-left: 30px;
}

.tagListItem {
  font-weight: 400;
  font-size: 1.1rem;
}
</style>
