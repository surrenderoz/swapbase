
import {swapTokens, addLiquidity, removeLiquidity} from "../swapbase/index"
describe('checking the test', () => {
    const token0Address = '0x4200000000000000000000000000000000000006'; //eth token
    const token1Address = '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb'; //dai token
    it('should swap', async () => {
        expect(await swapTokens(token0Address,token1Address, 0.1)).not.toBe(false)
    })
    it('should add liquidity', async () => {
        expect(await addLiquidity(token1Address, 0.1, 1)).not.toBe(false)
    })
    it('should remove liquidity', async () => {
        expect(await removeLiquidity(token1Address, 1)).not.toBe(false)
    })
})