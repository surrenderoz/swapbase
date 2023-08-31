// import ethers from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

import { ethers } from 'ethers';
const FactoryAbi = require("../abis/UniswapV2Factory.json");
const RouterAbi = require("../abis/UniswapV2Router.json");

const provider = new ethers.JsonRpcProvider(process.env.RPCURL);
const privateKey =  process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey || '', provider);


const factoryAddress = '0x04C9f118d21e8B767D2e50C946f0cC9F6C367300';
const routerAddress = '0xaaa3b1F1bd7BCc97fD1917c18ADE665C5D31F066';

const factory = new ethers.Contract(factoryAddress, FactoryAbi, wallet);
const router = new ethers.Contract(routerAddress, RouterAbi, wallet);

// Account address
const accountAddress = wallet.address;

// Swap Tokens
export async function swapTokens(_wethAddress: string, _Token2add: string, amount: number) {
    const amountIn = ethers.parseEther(amount.toString()); // Amount of token0 to swap
    const amountOutMin = 0; // Minimum amount of token1 you want to receive
    const path = [_wethAddress, _Token2add]; // Token0 to Token1
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; 
    try {
        const encodeFuncdata = router.interface.encodeFunctionData('swapExactETHForTokens', [amountOutMin,
            path,
            accountAddress,
            deadline,
            ])
        const gas1 = await provider.estimateGas({
            data:   encodeFuncdata
        })
        // console.log('gas', gas1.toString());
        
        const tx = await router.swapExactETHForTokens(
            amountOutMin,
            path,
            accountAddress,
            deadline,
            {
                value: amountIn
            }
        );
        await tx.wait();
        return tx
    } catch (error) {
        return false
    }
}

// Add Liquidity
export async function addLiquidity(_Token2add: string, amount1: number, amount2: number) {
    const amountToken0 = ethers.parseEther(amount1.toString()); // Amount of token0 to add
    const amountToken1 = ethers.parseEther(amount2.toString()); // Amount of token1 to add
    const amountToken0Min = 0;
    const amountToken1Min = 0;
    const to = accountAddress;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

    try {
        const encodeFuncdata = router.interface.encodeFunctionData('addLiquidityETH', [
            _Token2add,
            amountToken1,
            amountToken0Min,
            amountToken1Min,
            to,
            deadline
            ])
        const gas1 = await provider.estimateGas({
            data: encodeFuncdata
        })
        const tx = await router.addLiquidityETH(
            _Token2add,
            amountToken0,
            amountToken1,
            amountToken0Min,
            amountToken1Min,
            to,
            deadline
        );
        await tx.wait();
        return tx;
    } catch (error) {
        return false
    }
}


// Remove Liquidity
export async function removeLiquidity(_tokneAdd: string, amount: number) {
    const liquidityAmount = ethers.parseEther(amount.toString()); // Amount of liquidity tokens to remove
    const amountToken0Min = 0;
    const amountToken1Min = 0;
    const to = accountAddress;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

    try {
        const encodeFuncdata = router.interface.encodeFunctionData('removeLiquidityETH', [
            _tokneAdd,
            liquidityAmount,
            amountToken0Min,
            amountToken1Min,
            to,
            deadline
            ])
        const gas1 = await provider.estimateGas({
            data: encodeFuncdata
        })
        const tx = await router.removeLiquidityETH(
            _tokneAdd,
            liquidityAmount,
            amountToken0Min,
            amountToken1Min,
            to,
            deadline
        );
        await tx.wait();
        console.log('Liquidity removed successfully!');
    } catch (error) {
        console.log(error);
        
        return false
    }
}


