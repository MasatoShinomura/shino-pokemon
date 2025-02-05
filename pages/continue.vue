<script setup>
const { data: trainers } = await useTrainers();
</script>

<template>
  <div>
    <img src="../docs/okido.jpg" alt="Okido" style="width: 200px; height: auto; display: block; margin: 0 auto;" />
    <h1>おぉ、かえってきたか！</h1>
    <p>はて、きみは　だれだったかね？</p>
    <GamifyList>
      <GamifyItem v-for="trainer in trainers" :key="trainer">
        <NuxtLink :to="`/trainer/${trainer}`">{{ trainer }}</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>

