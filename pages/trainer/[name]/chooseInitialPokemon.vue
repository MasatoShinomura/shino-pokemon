<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const initialPokemon = ref({});
const { dialog, onOpen, onClose } = useDialog();

// ポケモンの一覧を取得
const { data: pokemons, refresh } = await useFetch(
  () =>
    `https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${9}`,
  {
    default: () => [],
    server: false,
  },
);

// ポケモンをつかまえる(選択して仲間にする)
const onCatch = async (pokemon) => {
  if (!pokemon || !pokemon.name) {
    console.error("Pokemon is undefined or no name:", pokemon);
    return;
  }

  console.log("Catching pokemon name:", pokemon.name);
  console.log(`/api/trainer/${route.params.name}/pokemon`);

  try {
    const response = await $fetch(`/api/trainer/${route.params.name}/pokemon`, {
    baseURL: config.public.backendOrigin,
    method: "POST",
    body: { name: pokemon.name },
  });

  // トレーナーのページに遷移
  console.log("Pokemon caught successfully:", pokemon);
  router.push(`/trainer/${route.params.name}`);
  
  } catch(e) {
   console.error('Failed to catch Pokemon:', e);
  }
};

</script>

<template>
  <div>
    <h1>{{ route.params.name }}くん！</h1>
    <img src="/avatar.png" />
    <p>ポケモンといえば　さいしょの　ごさんけが　わくわくする　じゃろう？</p>
    <p>さいしょに　つれていく　なかまを　えらぶのじゃ！</p>
    <form @submit.prevent> 
    <GamifyList>
      <GamifyItem 
        v-for="pokemon in [pokemons?.results?.[0], pokemons?.results?.[3], pokemons?.results?.[6]].filter(Boolean)" 
        :key="pokemon?.url"
      >
        <GamifyButton @click="() => { 
          initialPokemon.value = pokemon; 
          console.log('Selected Pokemon:', initialPokemon.value);
          onOpen(true); 
        }">          
          <img 
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}.png`" 
            alt="pokemon.name" 
          />
        </GamifyButton>
      </GamifyItem>
    </GamifyList>
    </form>

    <GamifyDialog
      v-if="dialog"
      id="confirm-submit"
      title=""
      :description="`${initialPokemon.value.name}　で　いいのかね？`"
      @close="onClose"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="onCatch(initialPokemon.value)">はい</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onClose">いいえ</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
    
  </div> 
</template>
  


