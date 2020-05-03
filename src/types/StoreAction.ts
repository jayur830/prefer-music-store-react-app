export default interface StoreAction {
    type: string;
    username: string | null;
    email: string;
    exec: boolean;
    isStore: boolean;
    playlist: object[] | null;
}