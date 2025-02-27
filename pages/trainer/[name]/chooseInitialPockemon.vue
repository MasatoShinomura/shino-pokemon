<script setup>
import GamifyButton from '~/components/GamifyButton.vue';
const initialPokemonList = ['bulbasaur', 'charmander', 'squirtle'];

const route = useRoute();
const router = useRouter();

// ポケモンの一覧を取得
const { data: pokemons, refresh } = await useFetch(
  () =>
    `https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${20}`,
  {
    default: () => [],
    server: false,
  },
);

// ポケモンをつかまえる
const onCatch = async (pokemon) => {
  const response = await $fetch(`/api/trainer/${route.params.name}/pokemon`, {
    baseURL: config.public.backendOrigin,
    method: "POST",
    body: {
      name: pokemon.name,
    },
  }).catch((e) => e);
  if (response instanceof Error) return;
  router.push(`/trainer/${route.params.name}`);
};

const { dialog, onOpen, onClose } = useDialog();

</script>

<template>
  <div>
    <h1>トレーナー：{{ route.params.name }}</h1>
    <img src="/avatar.png" />
    



  </div> 
</template>
  


