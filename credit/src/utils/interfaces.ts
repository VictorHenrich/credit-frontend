



export default interface ServiceProps<T>{
    execute: () => Promise<T> | T
}