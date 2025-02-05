<script setup>
const route = useRoute();
const router = useRouter();
</script>

<template>
  <div>
    <h1>トレーナー：{{ route.params.name }}</h1>
    <p>ここでは　きみの　ポケモンたちを　みることが　できるぞ！</p>
    <p>トレーナー名：{{ route.params.name }}</p>
    <p>トレーナーID：{{ route.params.id }}</p>
    <p>トレーナーのポケモン数：{{ route.params.pokemonCount }}</p>
    <p>トレーナーのポケモン：{{ route.params.pokemons }}</p>
    </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}
</style>




