<template>
  <div class="PrivacyPolicy">
    <h3>個資及隱私權保護宣告 (Privacy Policy)</h3>
    <directory :directoryList="directoryList"></directory>
    <contentComponent :directoryList="directoryList"></contentComponent>
  </div>
</template>
<script>
import directory from "./subComponent/directory";
import contentComponent from "./subComponent/content";
import directoryList from "./directory.json";
export default {
  name: "PrivacyPolicy",
  data() {
    return {
      directoryList: directoryList
    };
  },
  components: { directory, contentComponent }
};
</script>