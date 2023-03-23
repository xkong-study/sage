import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

interface CounterState { // 定义初始化状态的类型
    value: string,
    content:string
}
const initialState: CounterState = { // 初始化状态
    value: 'hidden',
    content:'true'
}
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementByAmount: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        incrementByHidden: (state, action: PayloadAction<string>) => {
            state.content = action.payload
        },
    },
})

export const { incrementByAmount, incrementByHidden } = counterSlice.actions // 导出操作state的喊出
export const selectCount = (state: RootState) => state
export default counterSlice.reducer // 导出当前reducer在store/index.ts中记性全局挂载（这种也可以不用挂载到全局）
