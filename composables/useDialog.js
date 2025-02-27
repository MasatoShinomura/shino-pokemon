export default () => {
  const dialog = ref(null); // リアクティブな値
  const onOpen = (value) => {
    dialog.value = value;
  };
  const onClose = () => {
    dialog.value = null;
  };
  return {
    dialog,
    onOpen,
    onClose,
  };
};

// 無名関数を使うことでコンポーネント単位で状態を管理できる！
// 他のコンポーネントと状態が混ざらない。
// 呼び出すたびに新しいデータを作成できる。
