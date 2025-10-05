<template>
  <div class="container">
    <div class="title">
      <span class="date">{{ now.getDate() }}</span> / {{ now.getMonth() + 1 }} 每日推荐
    </div>
    <SongList
      :loading="uiProperties.personalized.song30.loading"
      :songs="
        uiProperties.personalized.song30.songs.map((a) => {
          return {
            id: a.id,
            name: a.name,
            artists: a.artists,
            album: a.album,
            duration: a.duration,
            picUrl: a.picUrl,
            hasMv: a.hasMv,
            mvId: a.mvId,
            requireVip: a.requireVip,
          };
        })
      ">
    </SongList>
  </div>
</template>

<script setup lang="ts">
import SongList from '../components/common/SongList.vue';
import { useUIPropertiesStore } from '@/stores/uiProperties';
import { storeToRefs } from 'pinia';
const uiPropertiesStore = useUIPropertiesStore();
const { uiProperties } = storeToRefs(uiPropertiesStore);
const now = new Date();
</script>

<style scoped>
.title {
  font-family: var(--y-font);
  color: var(--y-text);
  font-size: 25px;
  margin-top: 0px;
  margin-bottom: 15px;
}
.date {
  font-size: 40px;
}
</style>
