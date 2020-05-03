export default interface StoreState {
    redirect: string | null;
    user: { username: string | null; } | null;
    findUsernameResult: {
        result: string | null;
        valid: boolean;
    },
    findPasswordResult: {
        result: string | null;
        valid: boolean;
    },
    exec: boolean;
    isStore: boolean;
    playlist: object[] | null;
}