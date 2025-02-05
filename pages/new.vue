<script setup>
import GamifyDialog from '~/components/GamifyDialog.vue';
const router = useRouter()
const { dialog, onOpen, onClose } = useDialog();
const trainerName = ref("") // 新しいトレーナーの名前 ★重要：リアクティブ変数
const submitTrainerName = async () => {
  try {
    const response = await fetch("/api/trainer", {
      method: "POST", // POSTリクエストを送信
      headers: {
        "Content-Type": "application/json" // 送信するデータの形式をjsonに指定
      },
      body: JSON.stringify({ 
        name: trainerName.value 
      }) // 送信するデータをJSON形式に変換
    });
    if (!response.ok) {
      throw new Error("Failed to submit trainer name");
    }
    const data = await response.json();
    console.log("Trainer name submitted successfully:", data);
  } catch (error) {
    console.error("Error submitting trainer name:", error);
  }
};

</script>


<template>
  <div>
    <h1>ようこそ！　ポケモンのせかいへ！</h1>
    <p>では　はじめに　きみの　名前を　おしえてもらおう！</p>
    <form @submit.prevent> 
      <div class="item">
      <label for="name">名前</label>
      <!-- <span id="name-description">特定の文字は取り除かれるぞ！</span> -->
      <input
        id="name"
        v-model="trainerName"
        aria-describedby="name-description"
        @keydown.enter="submitTrainerName"
      />
      </div>
      <!-- 決定ボタン -->
      <GamifyButton 
        type="button" 
        @click="onOpen(true)" 
        :disabled="trainerName.length === 0"
      >
        決定
      </GamifyButton>
    </form>
    <GamifyDialog
      v-if="dialog"
      id="confirm-submit"
      title="確認"
      :description="`ふむ・・・　きみは　${trainerName}　と　いうんだな！`"
      @close="onClose"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="submitTrainerName">はい</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onClose">いいえ</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>


  </div>
</template>


<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
