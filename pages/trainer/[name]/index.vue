<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { data: trainer, refresh } = await useFetch(
  () => `/api/trainer/${route.params.name}`,
  {
    default: () => [],
    server: false,
    baseUrl: config.public.backendOrigin,
  },
);

// 各ダイアログのオブジェクトを定義
const {
  dialog: deleteDialog,
  onOpen: onOpenDelete,
  onClose: onCloseDelete
} = useDialog;
const {
  dialog: nicknameDialog,
  onOpen: onOpenNickname,
  onClose: onCloseNickname
} = useDialog;
const {
  dialog: releaseDialog,
  onOpen: onOpenRelease,
  onClose: onCloseRelease
} = useDialog;

// ポケモンの一覧を取得
const { data: pokemons } = await useFetch(
  () =>
    `https://pokeapi.co/api/v2/pokemon?offset=${9}&limit=${20}`,
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
    <h1>トレーナー情報</h1>
    <div class="trainer-info">
      <img src="/avatar.png" />
      <p>なまえ：{{ trainer.name }}</p>
      <p>トレーナーのポケモン数：{{ trainer.pokemons.length }}</p>
      <p>トレーナーのポケモン：</p>
    </div>


    <GamifyList>
      <GamifyItem v-for="pokemon in trainer.pokemons" :key="pokemon.id">
        <img :src="pokemon.sprites.front_default" />
        <span class="pokemon-name">{{ pokemon.nickname || pokemon.name }}</span>
      </GamifyItem>
    </GamifyList>

    <CatchButton :to="`/trainer/${route.params.name}/catch`">
      ポケモンをつかまえる
    </CatchButton>

    <!-- <GamifyList>
      <GamifyItem v-for="pokemon in pokemons.results" :key="pokemon.url">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}.png`" alt="pokemon.name" />
        <span class="pokemon-name">{{ pokemon.name }}</span>
        <GamifyButton @click="onOpen(pokemon)">つかまえる</GamifyButton>
      </GamifyItem>
    </GamifyList> -->
  </div>

</template>

<style scoped>
h1 {
  font-size: 2rem;
}
</style>




