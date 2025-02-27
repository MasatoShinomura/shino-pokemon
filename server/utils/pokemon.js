import { ProxyAgent } from "proxy-agent";
import { ofetch } from "ofetch";

const agent = new ProxyAgent();
/** ポケモンの取得 */
export const findPokemon = async (name) => {
  console.log('Fetching Pokemon: ${name}');
  try {
    // ポケモンAPIから指定された名前のポケモンを取得する
    const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      agent, // プロキシエージェントを使用してリクエストを送信する
    });
    return pokemon;
  } catch (error) {
    console.error('Failed to fetch Pokemon ${name}', error);
    throw error;
  }
};
