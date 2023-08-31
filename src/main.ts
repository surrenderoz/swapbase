
import {swapTokens, addLiquidity, removeLiquidity} from "./swapbase/index";

const token0Address = '0x4200000000000000000000000000000000000006'; //eth token
const token1Address = '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb'; //dai token
async function main() {
    let swp = await swapTokens(token0Address, token1Address, 5);
    let liq = await addLiquidity(token1Address, 0.1,1);
    let liqRemove = await removeLiquidity(token1Address, 1);
    console.log(liqRemove);
}
main()